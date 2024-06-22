import bcrypt from "bcrypt";

/** Below function is used to verify the password using bcrypt
 * @param userDBPassword userInputPassword
 * @returns Boolean
 */
const verifyPassword = async (userPassword, inputPassword) => {
  try {
    return await bcrypt.compare(inputPassword, userPassword);
  } catch (error) {
    console.error(error?.message);
    throw error;
  }
};

export { verifyPassword };
