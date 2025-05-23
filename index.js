const http = require("http");

const app = require("./src/app");
const server = http.createServer(app);

server.listen(Number.parseInt(process.env.PORT || 3000, 10), () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

module.exports = server;
