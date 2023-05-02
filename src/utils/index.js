// Lower or uppercase letter then 3 to 23 letters, numbers, dashes, or underscores
export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/

// Lower or uppercase letter, number, special character, 8 to 24 characters
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
