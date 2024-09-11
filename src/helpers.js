// This file is for misc functions to be used around the program

// Input Validators
function validateEmail(email) {
  const emailRegex = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/;
  return emailRegex.test(email);
}

function isPasswordLongEnough(password) {
  // Password must be 7+ characters
  return password.length >= 7;
}

export { validateEmail, isPasswordLongEnough };
