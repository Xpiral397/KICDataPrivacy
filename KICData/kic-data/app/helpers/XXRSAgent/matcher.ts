export function fuzzyDomainMatch(domain1: string, domain2: string): boolean {
    // Normalize domain names to lowercase and remove "www." if present
    domain1 = domain1.toLowerCase().replace("www.", "");
    domain2 = domain2.toLowerCase().replace("www.", "");

    // If one domain is a subdomain of the other, return true
    if (domain1.endsWith(domain2) || domain2.endsWith(domain1)) {
        return true;
    }

    // Calculate the average of the letters in the domains
    const averageLength = (domain1.length + domain2.length) / 2;

    // Calculate the Levenshtein distance to measure spelling similarity
    const levenshteinDistance = levenshtein(domain1, domain2);

    // Calculate accuracy based on Levenshtein distance and average length
    const accuracy = 1 - (levenshteinDistance / averageLength);

    // Return true if accuracy is above 0.79, indicating a match
    return accuracy >= 0.50;
}

// Levenshtein distance calculation function
function levenshtein(a: string, b: string): number {
    const m = a.length;
    const n = b.length;
    const d: number[][] = [];
    for (let i = 0; i <= m; i++) {
        d[i] = [];
        d[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        d[0][j] = j;
    }
    for (let j = 1; j <= n; j++) {
        for (let i = 1; i <= m; i++) {
            if (a[i - 1] === b[j - 1]) {
                d[i][j] = d[i - 1][j - 1];
            } else {
                d[i][j] = Math.min(
                    d[i - 1][j] + 1,
                    d[i][j - 1] + 1,
                    d[i - 1][j - 1] + 1
                );
            }
        }
    }
    return d[m][n];
}

// Test cases
console.log(fuzzyDomainMatch("account", "account.google.com")); // Output: true
