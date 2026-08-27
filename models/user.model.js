import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/authflow")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

let userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
})

let userModel = mongoose.model("user",userSchema);

export default userModel;