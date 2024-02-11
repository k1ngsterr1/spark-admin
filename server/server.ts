const express = require("express");
const dotenv = require("dotenv").config({ path: ".env" });
const bcryptjs = require("bcryptjs");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
