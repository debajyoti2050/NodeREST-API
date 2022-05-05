const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute=require("./routes/users")
const authRoute=require("./routes/auth")

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
   if(err){
       console.log(err)
   }
   else{
    console.log("Connected to MongoDB");
   }
}
);

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/",(req,res)=>{
    res.send("welcome to express");
})
app.get("/users",(req,res)=>{
    res.send("welcome to user");
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(5000, () =>{
    console.log("Backend Server Running");
});