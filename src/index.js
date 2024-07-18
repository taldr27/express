import express from "express";
import { productsRouter } from "./routes/products.router.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.use("/api/products", authMiddleware, productsRouter);

app.listen(3000, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
