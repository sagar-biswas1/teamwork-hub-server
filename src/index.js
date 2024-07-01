require("dotenv").config();
const http = require("http");
const { Server:SocketIOServer } = require('socket.io');
const app = require("./app");
const { connectDB } = require("./db/");
const server = http.createServer(app);
const { logger } = require("./utils/logger");
const { setupSocket } = require("./socket");
const appLogger = logger({ label: "index-file" });
const port = process.env.PORT || 4000;

const io = new SocketIOServer(server,{
  cors: {
    origin: [process.env.ClIENT_SIDE_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  },
});


/**
 * Main function to start the server.
 * Connects to the database and then starts the HTTP server.
 *
 * @returns {Promise<void>} Resolves when the server is successfully started.
 */
const main = async () => {
  try {
    await connectDB();
    setupSocket(io);
    server.listen(port, async () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (e) {
    // console.log(e)
    // appLogger.error(JSON.stringify(e));
  }
};

main();

module.exports = app;
