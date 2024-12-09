import mongoose from "mongoose";
import { MONGODB_URI } from "../config";

export const initMongoDB = () => {
  mongoose
    .connect(MONGODB_URI, {
      directConnection: true, // This is an option to make pretty simple rs mongodb connection
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
};
