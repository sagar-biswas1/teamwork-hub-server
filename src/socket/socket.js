const { setSessionInRedis, cacheDocument,getMycacheDocument } = require("../redis/redisUtils");

const lodash = require("lodash");
const contentService = require("../lib/content");

const userSocketMap = {};
const rooms = {};


/**
 * Get the socket ID for a given user ID.
 * @param {string} receiverId - The ID of the receiver.
 * @returns {string} The socket ID of the receiver.
 */
const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

/**
 * Sets up the Socket.IO server and handles socket events.
 * @param {Object} io - The Socket.IO server instance.
 */
function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("getDocumentId", async (documentId) => {
      //setting session in redis
      setSessionInRedis(documentId);

      let contentDoc;
      contentDoc = await getMycacheDocument(documentId);
      if (!contentDoc) {
        contentDoc = await contentService.findById(documentId);
        cacheDocument(documentId, contentDoc);
      }
      socket.join(documentId);
      socket.emit("loadDocument", contentDoc);

      // -----end  redis--

      // const data = await contentService.findById(documentId);
      // console.log(data)
      // socket.join(documentId);
      // socket.emit("loadDocument", data);

      const userId = socket.handshake.query.userId;
      console.log("userId", userId);

      if (!rooms[documentId]) {
        rooms[documentId] = new Set();
      }
      rooms[documentId].add(userId);
      io.to(documentId).emit("room data", {
        room: documentId,
        users: Array.from(rooms[documentId]),
        size: rooms[documentId].size,
      });
      // socket for chating messages
      socket.on("deliverMessage", ({ chatRoomId, message }) => {
        io.to(chatRoomId).emit("receiveMessage", {
          chatRoomId,
          message,
        });
      });

      // Handle user disconnect
      socket.on("disconnect", () => {
        handleUserDisconnect(socket, documentId, userId, io);
      });

      // Create a debounced version of the documentEdited handler
      const debouncedDocumentEdited = lodash.debounce(
        async ({ projectId, code, collaborators }) => {
          await handleDocumentEdited(
            socket,
            documentId,
            // projectId,
            code,
            collaborators
          );
        },
        700 // Adjust the debounce delay (in milliseconds) as needed
      );

      socket.on("documentEdited", debouncedDocumentEdited);
    });
  });
}

/**
 * Handles user disconnection and updates room data.
 * @param {Object} socket - The socket instance.
 * @param {string} documentId - The ID of the document (room).
 * @param {string} userId - The ID of the user.
 * @param {Object} io - The Socket.IO server instance.
 */
function handleUserDisconnect(socket, documentId, userId, io) {
  console.log("user disconnected", userId);
  socket.leave(documentId);

  if (rooms[documentId]) {
    rooms[documentId].delete(userId);
    if (rooms[documentId].size === 0) {
      delete rooms[documentId];
    } else {
      io.to(documentId).emit("room data", {
        room: documentId,
        users: Array.from(rooms[documentId]),
        size: rooms[documentId].size,
      });
    }
  }
}

/**
 * Handles the document edited event and broadcasts updates to the room.
 * @param {Object} socket - The socket instance.
 * @param {string} documentId - The ID of the document (room).
 * @param {string} projectId - The ID of the project.
 * @param {string} code - The updated document code.
 * @param {Array} collaborators - The list of collaborators.
 */
async function handleDocumentEdited(
  socket,
  documentId,
  // projectId,
  code,
  collaborators
) {
  console.log({ documentId });
  let contentDoc;
  contentDoc = await getMycacheDocument(documentId);
  if (!contentDoc) {
    contentDoc = await contentService.findById(documentId);
    cacheDocument(documentId, contentDoc);
  }

  const updatedContent = await contentService.updateById(documentId, {
    body: code,
    collaborators,
  });

  socket.broadcast.to(documentId).emit("documentUpdated", {
    projectId: documentId,
    code,
    // collaborators: updatedContent.collaborators,
  });
}

module.exports = { setupSocket };
