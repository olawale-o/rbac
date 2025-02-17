const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("./proto/auth.proto", {});
const authPackage = grpc.loadPackageDefinition(packageDefinition).authPackage;

const server = new grpc.Server();

server.addService(authPackage.Auth.service, {
  login: login,
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Server running at http://localhost:50051");
    // server.start();
  },
);

function login(call, callback) {
  const { email, password } = call.request;
  const userObject = {
    user: { email, password },
  };
  console.log(userObject);
  callback(null, { token: "token" });
}
