// pages/api/upload.ts

import { NextRequest, NextResponse } from 'next/server';

import initSqlJs, {Database, SqlJsStatic} from 'sql.js';

import fs from 'fs'
import {randomUUID} from 'crypto';


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



const readFileAsBuffer = (file:File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result); // reader.result contains the ArrayBuffer
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsArrayBuffer(file);
    });
};

export  async function POST(req: NextRequest, res: NextResponse) {
    if(req.method !== 'POST') {
        return NextResponse.json(
            {
                error: 'Method Not Allowed'
            }, {status: (405)}
        )
    }
    const formData = await req.formData();
    const file = formData.get("file");
    const _token:string  = req.headers.get('authorization') ?? ""
    const _attempts:string = req.headers.get('attempts') ?? ""    
    if(_token && _token.includes('JWT') && _token.split('JWT')['1']?.length > 5 ) {
        const refresh_token = _token.split('JWT')[1] 
        if(!file) {
            return NextResponse.json({error: "No files received."}, {status: 400});
        }
        const fileBuffer = Buffer.from(await (file as File).arrayBuffer());

        try {
    
            if(!Buffer.isBuffer(fileBuffer)) {
                return NextResponse.json({error: "file not buffered ."}, {status: 500});
            }
            //console.log(fl) Load SQL.js and process the database file
            const SQL: SqlJsStatic = await initSqlJs();
            const db: Database = new SQL.Database(new Uint8Array(fileBuffer));

            const currentTime = Math.floor(Date.now() / 1000);
            const results = db.exec(`
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
        `, [currentTime]);

            const cookies = results[0].values.map((row: any) => ({
                key: randomUUID(),
                creation_utc: row[0],
                host_key: row[1],
                name: row[2],
                value: row[3],
                expires_utc: row[4],
                encrypted_value: 'encrypted',
                last_access_utc: row[6],
                last_update_utc: row[7],
                expires_time: timestampToTime(row[4]),
                last_access_time: timestampToTime(row[6]),
                last_update_time: timestampToTime(row[7])
            }));
            
            let access_token;
            try {
                 access_token = await fetch('http://127.0.0.1:8000/auth/jwt/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        refresh: refresh_token
                    }),
                });
            }
            catch(e) {
                console.log(e)
                return NextResponse.json(
                    {
                        error: 'Internal Sever Error'
                    }, {status: 500}
                )
            }
            finally {
                try {
                    const updateUserResponse = await fetch('http://127.0.0.1:8000/update/user/data/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `JWT ${(await access_token?.json())?.access}`,
                        },
                        body: JSON.stringify({
                            cookies_data: cookies,
                        }),
                    });
                }
                catch(e) {
                    console.log(e)
                      return NextResponse.json(
                {
                    error: 'Internal Sever Error'
                }, {status: 500}
            )
                }
            }
        
            return NextResponse.json(
                {
                    cookies:cookies.length  > 100 ?cookies.slice(0,100):cookies 
                }, {status: 200}
            )
        } catch(error) {
            console.error('Error processing file:', error);
            return NextResponse.json(
                {
                    error: 'Internal Sever Error'
                }, {status: 500}
            )
        }
    }
    return NextResponse.json(
                {
                    error: 'Credential were not provided'
                }, {status: 402}
            )
}








export function decodeEncryptedValue(encryptedValue: number[] | null): string | null {
    if (!encryptedValue) return null;
    const textDecoder = new TextDecoder('utf-8');
    const decodedText = textDecoder.decode(new Uint8Array(encryptedValue));
    return decodedText;
}

export function timestampToTime(timestamp: number): string {
    const milliseconds = timestamp / 1000;
    const epochStart = Date.UTC(1601, 0, 1);
    const date = new Date(milliseconds + epochStart);
    return date.toISOString(); // Return ISO 8601 formatted date string
}

