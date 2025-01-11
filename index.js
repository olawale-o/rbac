const http = require("http");

const app = require("./src/app");
const server = http.createServer(app);

server.listen(parseInt(5000, 10), () => {
  console.log("Server started on port 5000");
});

module.exports = server;
