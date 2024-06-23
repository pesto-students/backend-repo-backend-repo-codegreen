import jwt from "jsonwebtoken";

/** Below function takes token as input and verify the token and returns the decoded data of token
 * @param token
 * @returns decoded data of token
 */
const getTokenData = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return { ...err, isError: true };
  }
};

/** Below function is used to generate token
 * @param expiration in minutes, additionalDetails that needs to include in the token
 * @returns jwt token
 *
 */
const createToken = (
  expiration = process.env.JWT_EXPIRATION_MINUTES,
  additionalDetails = {}
) => {
  try {
    return jwt.sign(additionalDetails, process.env.JWT_SECRET, {
      expiresIn: expiration,
    });
  } catch (error) {
    throw new Error(error?.message);
  }
};

export { getTokenData, createToken };
