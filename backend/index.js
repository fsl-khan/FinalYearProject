import  express, { json }  from "express";
const app = express();
import cors from 'cors';
import multer from 'multer';

import authRoutes from "./Routes/auth.js"
import userRoutes from "./Routes/users.js"
import postRoutes from "./Routes/posts.js"
import commentRoutes from "./Routes/comments.js"
import likeRoutes from "./Routes/likes.js"
import cookieParser from "cookie-parser";

//middlewares
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(cors({
    origin:"http://localhost:5173",
}));
app.use(express.json())
app.use(cookieParser())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../sukhan/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    },
  });
  
  const upload = multer({ storage: storage });

  app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
  })


app.use("/api/auth" , authRoutes)
app.use("/api/users" , userRoutes)
app.use("/api/posts" , postRoutes)
app.use("/api/comments" , commentRoutes)
app.use("/api/likes" , likeRoutes)

app.post('/', (req, res)=> {
    res.send('post api working');
});

app.listen(8800, ()=> {
    console.log("Server chal Raha hay!")
})