import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import testRoutes from "./routes/test.routes.js";
import urlRoutes from "./routes/url.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

const app = express();

app.use(express.json());

app.use(requestLogger);

app.get("/health", (_, res) => {
  res.status(200).json({
    status: "OK",
  });
});

app.use("/api/test", testRoutes);

app.use("/api/urls", urlRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use(errorHandler);

export default app;
