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
import relationshipRoutes from "./Routes/relationships.js";
import risingRoutes from "./Routes/rising.js";
import bookRoutes from "./Routes/books.js";


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
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage }).fields([
  { name: "file", maxCount: 1 }, // For image files
  { name: "pdfFile", maxCount: 1 }, // For PDF files
]);

app.post("/api/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer error occurred
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // Other error occurred
      return res.status(500).json({ error: "An error occurred" });
    }

    const file = req.files.file || req.files.pdfFile;

    if (file) {
      // File uploaded successfully
      return res.status(200).json(file[0].filename);
    }

    // No file uploaded
    return res.status(400).json({ error: "No file uploaded" });
  });
});


app.use("/api/auth" , authRoutes)
app.use("/api/users" , userRoutes)
app.use("/api/posts" , postRoutes)
app.use("/api/comments" , commentRoutes)
app.use("/api/likes" , likeRoutes)
app.use("/api/relationships" , relationshipRoutes)
app.use("/api/rising" , risingRoutes)
app.use("/api/book" , bookRoutes)

app.post('/', (req, res)=> {
    res.send('post api working');
});

app.listen(8800, ()=> {
    console.log("Server chal Raha hay!")
})