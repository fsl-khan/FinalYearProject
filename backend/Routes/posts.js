import  Express  from "express";
import { getPosts , addPost, deletePost, getfav } from "../controllers/post.js";

const router = Express.Router()

router.get("/", getPosts )
router.post("/", addPost )
router.get("/fav", getfav )
router.delete("/:id", deletePost )

export default router