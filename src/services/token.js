import { getTokenData, createToken } from "./jwt.js";

/** Below function is used to generate the token
 * @param user data, expirationTime
 * @returns token
 *
 */
const generateToken = (
  userData,
  expiration = process.env.JWT_EXPIRATION_MINUTES
) => {
  try {
    const { firstName, lastName, email, _id } = userData;
    const detailsToAddInToken = {
      id: _id,
      email,
      name: `${firstName} ${lastName}`,
    };
    const token = createToken(expiration, detailsToAddInToken);
    return token;
  } catch (error) {
    console.error(error?.message);
    throw error;
  }
};

/** Below function is used to take the token and fetch the token data and attach it to request
 */
const attachTokenToReq = (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";

    let tokenData = {};
    if (token) {
      tokenData = getTokenData(token);
      tokenData.token = token;
      if (tokenData?.isError)
        return res.status(401).json({ message: "Token expired" });
    }

    req.token = tokenData;
    next();
  } catch (error) {
    console.error(error);
    next(error?.message);
  }
};

export { generateToken, attachTokenToReq };
