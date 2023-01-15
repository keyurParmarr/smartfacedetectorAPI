const http = require("http");
const app = require("./app");
const { redisStart } = require("./sessions");
const server = http.createServer(app);

const startServer = async () => {
  await redisStart();
  server.listen(5000, () => {
    console.log("runnning");
  });
};
startServer();
