import express from "express";
import dotenv from "dotenv";
const app = express();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send({
    message: "Hello World"
  }).status(200);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});