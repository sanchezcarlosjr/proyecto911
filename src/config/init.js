import mongoose from "mongoose";
import { databaseURL } from "./index";

export default {
  initDb: async () => {
    const eraseDatabaseOnSync = true;
    mongoose.connect(databaseURL).then(async () => {
      if (eraseDatabaseOnSync) {
        await Promise.all([models.User.deleteMany({})]);
      }
    });
  },
};
