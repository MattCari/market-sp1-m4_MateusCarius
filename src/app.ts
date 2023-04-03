import express, { Application, json } from "express";
import {
  createProduct,
  deleteProduct,
  readProduct,
  updateProduct,
} from "./logic";
import { alreadyRegisteredProduct, verifyID } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/products", alreadyRegisteredProduct, createProduct);

app.get("/products", readProduct);

app.get("/products/:id", verifyID, readProduct);

app.patch("/products/:id",verifyID, updateProduct);

app.delete("/products/:id",verifyID, deleteProduct);

const PORT = 3000;
const runningMsg = `Server is running on http://localhost:${PORT}`;

app.listen(PORT, () => console.log(runningMsg));
