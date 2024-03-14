const sqlite3 = require('sqlite3').verbose();

// Function to convert WebKit timestamp to human-readable time
function dateFromWebkit(webkitTimestamp) {
    return timestampToTime(webkitTimestamp);
}

// Function to convert Unix timestamp or WebKit timestamp to human-readable time
function timestampToTime(timestamp) {
    if (timestamp < 10000000000) {
        // WebKit timestamp (in microseconds)
        return dateFromWebkit(timestamp);
    } else {
        return new Date(timestamp * 1000).toISOString().slice(0, 19).replace('T', ' '); // Convert Unix timestamp to human-readable time
    }
}

const filename = "C:/Users/xpira/OneDrive/Desktop/Cookies"; // EDIT ME
const connection = new sqlite3.Database(filename);

// Get current Unix timestamp
const currentTime = Math.floor(Date.now() / 1000);

// Query cookies that have not expired
connection.all("SELECT host_key, name, value, expires_utc FROM cookies WHERE expires_utc > ?", [currentTime], (err, results) => {
    if (err) {
        console.error("Error querying cookies:", err);
        return;
    }

    results.forEach(r => {
        const site = r.host_key;
        const cookieName = r.name;
        const cookieValue = r.value;
        const expirationTime = r.expires_utc;

        console.log("Website link:", site);
        console.log("Cookie Name:", cookieName);
        console.log("Cookie Value:", cookieValue);
        console.log("Expiration Time (Unix timestamp):", expirationTime);

        // Convert timestamp to human-readable time
        const humanReadableTime = timestampToTime(expirationTime);
        console.log("Expiration Time (Human-readable):", humanReadableTime);
        console.log("-------------------------------------");
    });
});

connection.close();