import winston from "winston";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create custom filter functions
const infoFilter = winston.format((info, opts) => {
  return info.level === "info" ? info : false;
});

const errorFilter = winston.format((info, opts) => {
  return info.level === "error" ? info : false;
});

/** creating the logger for request and error information
 */
const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new DailyRotateFile({
      filename: path.join(__dirname, "..", "logs", "requestInfo-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "info",
      format: winston.format.combine(infoFilter()),
    }),
    new DailyRotateFile({
      filename: path.join(__dirname, "..", "logs", "errors-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      level: "error",
      format: winston.format.combine(errorFilter()),
    }),
  ],
});

export { logger };
