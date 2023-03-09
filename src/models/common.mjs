/* anything@anything.anything */
const EMAIL_REGEX = /\S+@\S+\.\S+/;

export function validateEmail(email) {
  return EMAIL_REGEX.test(email);
}
