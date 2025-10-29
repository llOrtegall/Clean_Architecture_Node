import { userMongoRoute } from "@presentation/routes/user.mongo.routes";
import { mysqlConn } from "@infrastructure/persistence/connection";
import { userRouter } from "@/presentation/routes/user.routes";
import mongoose from "mongoose";
import express from "express";

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);
app.use("/api/v1", userMongoRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Verify Connections DBs
mysqlConn
  .authenticate()
  .then(() =>
    console.log("Mysql Database connection has been established successfully."),
  )
  .catch((err) => console.error("Unable to connect to the database:", err));

mongoose
  .connect(MONGO_URL, { tls: false, dbName: "company_db" })
  .then(() => console.log("Mongo Database connection has been ok"))
  .catch((err) => console.log(err));
