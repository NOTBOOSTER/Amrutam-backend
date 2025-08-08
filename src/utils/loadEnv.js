import "dotenv/config";

const nodeEnv = process.env.NODE_ENV;
const url = process.env.URL;
const port = process.env.PORT;
const mongouri = process.env.MONGO_URI;

export { mongouri, url, port, nodeEnv };
