import express, { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
config();
import { connect } from "./utils/db";
import UsersRoutes from "./routes/users";
import AuthRoutes from "./routes/auth";
import FaqRoutes from "./routes/faq";
import TermsRoutes from "./routes/terms";
const app = express();

console.log("Setting up middlewares...");
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());

console.log("connecting to database...");
connect();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

console.log("Setting up routes...");
app.use("/api/v1/users", UsersRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/faq", FaqRoutes);
app.use("/api/v1/term", TermsRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal server error";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

console.log("Starting server...");
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
