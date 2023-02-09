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
  try {
    const token = jwt.sign({ email }, "Secret", { expiresIn: "2 days" });
    await redisClient.set(token, id);
    return { ...user, token };
  } catch (error) {
    console.log(error.message);
  }
};
const authorize = async (token) => {
  try {
    const id = await redisClient.get(token);
    if (id) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

const getUserfromToken = async (req, res, db) => {
  const { authorization } = req.headers;
  try {
    const id = await redisClient.get(authorization);
    if (id) {
      const data = await db("users").where("id", "=", id);
      res.json({ ...data[0], success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deleteSession = async (req, res, db) => {
  const token = req.headers.authorization;
  try {
    await redisClient.del(token);
    res.send("done");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  redisStart,
  createSession,
  getUserfromToken,
  deleteSession,
  authorize,
};
