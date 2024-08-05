import express from "express";
import { authRouter } from "./routes/auth.router.js";
import { usersRouter } from "./routes/users.router.js";
import { productsRouter } from "./routes/products.router.js";
import { postsRouter } from "./routes/posts.router.js";
import {
  adminMiddleware,
  authMiddleware,
} from "./middlewares/auth.middleware.js";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(morgan("common"));
app.use(express.json());
const port = 3000;

app.use("/api/products", authMiddleware, productsRouter);
app.use("/api/users", authMiddleware, adminMiddleware, usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", authMiddleware, postsRouter);

app.listen(3000, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
