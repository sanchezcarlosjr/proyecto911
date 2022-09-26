import express from "express";
import routes from "./routes";
import config from "./config/init";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

config.initDb();

// routes
app.use("/sessions", routes.session);
app.use("/users", routes.user);

export default app;
