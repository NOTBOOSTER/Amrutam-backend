import cors from "cors";
import helmet from "helmet";
import express from "express";
import connectDB from "./src/database/mongo.js";
import { url, port, nodeEnv } from "./src/utils/loadEnv.js";
import affiliateRoutes from "./src/routes/affiliate.js";
import customizationRoutes from "./src/routes/customization.js";
import { requestLogger } from "./src/utils/middleware.js";
import serverless from "serverless-http";


const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

await connectDB();

app.use("/api/affiliate", affiliateRoutes);
app.use("/api/customization", customizationRoutes);


export default serverless(app);