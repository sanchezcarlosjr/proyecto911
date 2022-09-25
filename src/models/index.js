import mongoose from "mongoose";

import User from "./user";

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User };

export { connectDb };

export default models;
