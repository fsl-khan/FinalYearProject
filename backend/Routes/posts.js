import  Express  from "express";
import { getPosts , addPost, getfav } from "../controllers/post.js";

const router = Express.Router()

router.get("/", getPosts )
router.post("/", addPost )
router.get("/fav", getfav )
export default router