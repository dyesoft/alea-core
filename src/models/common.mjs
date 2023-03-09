/* anything@anything.anything */
const EMAIL_REGEX = /\S+@\S+\.\S+/;

/* Perform basic validation that a string "looks like" an email address. */
export function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}
