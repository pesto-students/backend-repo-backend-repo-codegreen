import { logger } from "../services/logger.js";

// Middleware to log every request
const requestLoggerMiddleware = async (req, res, next) => {
  const userEmail = req.token?.email ? req.token.email : "N/A";
  logger.info({
    message: `${req.method} ${req.url}`,
    // method: req.method,
    //url: req.url,
    userEmail,
  });
  next();
};

// Error handling middleware
const errorHandlingMiddleware = async (err, req, res, next) => {
  const userEmail = req.token?.email ? req.token.email : "N/A";
  const errorLoggerObject = {
    message: `Status-${err.status || 500} - Message- ${
      err.message || "Something went wrong please try after sometime."
    }`,
    method: req.method,
    url: req.url,
    userEmail,
  };
  logger.error(errorLoggerObject);
  return res.status(err.status || 500).send({ message: err?.message });
};

export { requestLoggerMiddleware, errorHandlingMiddleware };
