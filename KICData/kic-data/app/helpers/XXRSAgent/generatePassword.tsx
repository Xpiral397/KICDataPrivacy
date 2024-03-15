function generateComplexPassword(length: number = 12): string {
  const lowercaseChars: string = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numericChars: string = "0123456789";
  const specialChars: string = "!@#$%^&*()-_+=<>?";

  const allChars: string =
    lowercaseChars + uppercaseChars + numericChars + specialChars;

  let password: string = "";

  // Ensure at least one of each character type
  password += randomChar(lowercaseChars);
  password += randomChar(uppercaseChars);
  password += randomChar(numericChars);
  password += randomChar(specialChars);

  // Generate the rest of the password
  for (let i: number = 0; i < length - 4; i++) {
    password += randomChar(allChars);
  }

  // Shuffle the password characters
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
}

function randomChar(characters: string): string {
  return characters.charAt(Math.floor(Math.random() * characters.length));
}
