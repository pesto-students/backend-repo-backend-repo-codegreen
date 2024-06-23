import { getSingleUser, createNewUser, updateUser } from "../services/user.js";
import { generateToken } from "../services/token.js";
import { verifyPassword } from "../services/bcrypt.js";

/** Below function will handle the user SignUp  */
const handleUserSignUp = async (req, res, next) => {
  try {
    const body = req?.body ?? {};
    const isUserAlreadyPresent = await getSingleUser({ email: body.email });

    // throw error if user already present
    if (isUserAlreadyPresent) {
      const error = new Error(
        "User already exist please signUp with different Email."
      );
      error.status = 409;
      throw error;
    }

    // create new user
    const createdUser = await createNewUser(req?.body);
    const token = generateToken(createdUser);
    return res.status(200).send({ user: createdUser, token });
  } catch (error) {
    next({
      message: error?.message || "Internal server error",
      status: error.status || 500,
    });
  }
};

/** Below function will handle the user login  */
const handleUserLogin = async (req, res, next) => {
  try {
    let { email, password } = req?.body ?? {};
    const user = await getSingleUser({ email });
    if (user) {
      const rightPassword = await verifyPassword(user.password, password);
      if (!rightPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      /** create and send login token */
      const token = generateToken(user, process.env.JWT_EXPIRATION_MINUTES);
      return res.status(200).json({ user, token });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next({
      message: error?.message || "Internal server error",
      status: error.status || 500,
    });
  }
};

/** Below function is used to update the user details */
const editUser = async (req, res, next) => {
  try {
    const { id } = req?.token ?? {};
    const { reduceUserPoints } = req?.query ?? {};
    const editData = req?.body ?? {};
    if (!id) {
      const error = new Error("User Id or token is invalid.");
      error.status = 400;
      throw error;
    }
    if (!editData || !Object.keys(editData)?.length) {
      const error = new Error("Edit Data is invalid.");
      error.status = 400;
      throw error;
    }

    if (editData?.points) {
      if (reduceUserPoints === "false")
        editData.$inc = { points: editData?.points };
      else if (reduceUserPoints === "true")
        editData.$inc = { points: -editData?.points };
      delete editData.points;
    }

    const editedUserDetails = await updateUser(id, editData);
    return res.status(200).send(editedUserDetails);
  } catch (error) {
    next({
      message: error?.message || "Internal server error",
      status: error.status || 500,
    });
  }
};

export { handleUserSignUp, handleUserLogin, editUser };
