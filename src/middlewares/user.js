import validator from "validator";

/** Below function is used to validate the signUp fields
 */
const validateSignupFields = (req, res, next) => {
  const { firstName, lastName, password } = req.body ?? {};
  let { email } = req?.body ?? {};
  const errors = {};

  // Validate firstName
  if (!validator.isLength(firstName.trim(), { min: 2 })) {
    errors.firstName = "First name must contain at least 2 letters";
  }

  // Validate lastName if it exists
  if (lastName && !validator.isLength(lastName.trim(), { min: 2 })) {
    errors.lastName = "Last name must contain at least 2 letters";
  }

  // Validate email
  if (!validator.isEmail(email.trim())) {
    errors.email = "Invalid email address";
  }
  // Lowercase email
  else req.body.email = email.toLowerCase();

  // Validate password
  if (!validator.isLength(password.trim(), { min: 1 })) {
    errors.password = "Password is required";
  }

  // Check if there are any errors
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // If no errors, move to the next middleware
  next();
};

/** Below function is used to validate the signIn fields */
const validateSignInFields = (req, res, next) => {
  const { password } = req.body ?? {};
  let { email } = req?.body ?? {};
  const errors = {};

  // Validate email
  if (!validator.isEmail(email.trim())) {
    errors.email = "Invalid email address";
  }
  // Lowercase email
  else req.body.email = email.toLowerCase();

  // Validate password
  if (!validator.isLength(password.trim(), { min: 1 })) {
    errors.password = "Password is required";
  }

  // Check if there are any errors
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  // If no errors, move to the next middleware
  next();
};
export { validateSignupFields, validateSignInFields };
