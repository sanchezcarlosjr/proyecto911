import "dotenv/config";
import express from "express";

import models, { connectDb } from "./models";
import routes from "./routes";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// routes
app.use("/sessions", routes.session);

// start
const eraseDatabaseOnSync = true;
connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([models.User.deleteMany({})]);
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
