const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("./proto/auth.proto", {});
const authPackage = grpc.loadPackageDefinition(packageDefinition).authPackage;

const client = new authPackage.Auth(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);

client.login(
  { email: "wale@test.com", password: "password" },
  (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`From server`, JSON.stringify(response));
    }
  },
);
