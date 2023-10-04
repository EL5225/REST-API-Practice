import express from "express";
import router from "./routes/v1/index.js";
import "dotenv/config.js";
import { badRequest, errorHandler, notFound } from "./middleware/index.js";

const { PORT } = process.env;

const app = express();
app.use(express.json());

app.use("/api/v1", router);

app.use(badRequest);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
