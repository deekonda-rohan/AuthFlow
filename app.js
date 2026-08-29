import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import userModel from "./models/user.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  const { name, age, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await userModel.create({
    name,
    email,
    age,
    password: hashed,
  });

  const token = jwt.sign({ email }, "sahfajghsafhjhajasdfj");
  res.cookie("token", token);

  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.send("Invalid Email");
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    return res.send("Invalid Password");
  }

  const token = jwt.sign({ email }, "sahfajghsafhjhajasdfj");

  res.cookie("token", token);

  res.send("Login Successful");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
