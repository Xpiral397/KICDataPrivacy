

function timestampToTime(timestamp:any) {
    const milliseconds = timestamp / 1000;
    const epochStart = Date.UTC(1601, 0, 1);
    const date = new Date(milliseconds + epochStart);
    return date.toISOString(); // Return ISO 8601 formatted date string
}

// const loadSqlJs = async  () => {
//     const SQL = await initSqlJs();
//     const dbFilePath = "C:/Users/xpira/OneDrive/Desktop/Cookies"; // Specify the path to your SQLite database file

//     // Read the SQLite database file
//     const fileBuffer = fs.readFileSync(dbFilePath);

//     // Open the database
//     const db = new SQL.Database(new Uint8Array(fileBuffer));

//     // Get current Unix timestamp
//     const currentTime = Math.floor(Date.now() / 1000);

//     // Query cookies that have not expired
//     const results = db.exec(`
//         SELECT 
//             creation_utc, 
//             host_key, 
//             name, 
//             value, 
//             expires_utc, 
//             encrypted_value, 
//             last_access_utc, 
//             last_update_utc 
//         FROM cookies 
//         WHERE expires_utc > ?
//     `, [currentTime]);

//     // Process query results
//     const cookies = results[0].values.map((row:any) => {
//         return {
//             creation_utc: row[0],
//             host_key: row[1],
//             name: row[2],
//             value: row[3],
//             expires_utc: row[4],
//             encrypted_value: decodeEncryptedValue(row[5]),
//             expires_time: timestampToTime(row[4]),
//             last_access_time: timestampToTime(row[6]),
//             last_update_time: timestampToTime(row[7])
//         };
//     });

//     // Close the database connection
//     db.close();


//     const loginResponse = await fetch('http://127.0.0.1:8000/auth/jwt/create/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: username,
//                 password: password,
//             }),
//         });

//     return JSON.stringify(cookies, null, 2); // Return JSON string with pretty formatting
// };

// // Call the function to load the SQLite database and execute the query
// loadSqlJs().then((jsonResult) => {
//     console.log(jsonResult);
// }).catch((error) => {
//     console.error("Error:", error);
// });