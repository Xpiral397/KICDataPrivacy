export async function checkPasswordStrength(password:string):Promise<string>{
    // Check for at least 8 characters
    if (password.length < 8) {
        return "Password should be at least 8 characters long.";
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return "Password should contain at least one uppercase letter.";
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return "Password should contain at least one lowercase letter.";
    }

    // Check for at least one digit
    if (!/\d/.test(password)) {
        return "Password should contain at least one digit.";
    }

    // Check for at least one special character
    if (!/[!@#$%^&*()-_+=]/.test(password)) {
        return "Password should contain at least one special character (!@#$%^&*()-_+=).";
    }

    // If all checks pass, the password is strong
    return "Password is strong";
}

// Example usage:
