const jwt = require("jsonwebtoken");
const redis = require("redis");
const redisClient = redis.createClient();
const redisStart = async () => {
  await redisClient
    .connect()
    .then(() => {
      console.log("redis ready", "||", "sessions.js", "line-", 8);
    })
    .catch(() => {
      console.log("Redis connection error");
      process.exit(0);
    });
};
const createSession = async (user) => {
  const { email, id } = user;
  const token = jwt.sign({ email }, "Secret", { expiresIn: "2 days" });
  await redisClient.set(token, id);
  return { ...user, token };
};

const getUserfromToken = async (req, res, db) => {
  const { authorization } = req.headers;
  const id = await redisClient.get(authorization);
  if (id) {
    const data = await db("users").where("id", "=", id);
    res.json({ ...data[0], success: true });
  }
};

const deleteSession = async (req, res, db) => {
  const token = req.headers.authorization;
  await redisClient.del(token);
};
module.exports = { redisStart, createSession, getUserfromToken, deleteSession };
