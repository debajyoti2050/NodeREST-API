const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");
const multer = require("multer");

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

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, "public/images");
    },
    filename:(req,file,cb)=>{
        cb (null, req.body.name)
    },
});

const upload = multer({storage});
app.post("api/upload", upload.single("file"), (req,res)=>{
    try{
        return res.status(200).json("file uploaded successfully")

    }catch(e){
        console.log(e)
    }
})

// app.get("/",(req,res)=>{
//     res.send("welcome to express");
// })
// app.get("/users",(req,res)=>{
//     res.send("welcome to user");
// })

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts",postRoute);



app.listen(5000, () =>{
    console.log("Express Server Running");
});


