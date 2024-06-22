import expressServer from "./config/express.js";
import connectToDB from "./config/DB/config.js";

import { config } from "dotenv";

// Initialize .env config
config();

const port = process.env.PORT || 4007;

// Start the Express.js server and listen for incoming connections on the specified port
expressServer.listen(port, () => {
  // connect to DB
  connectToDB();
  console.log(`Server started at ${port}`);
});
