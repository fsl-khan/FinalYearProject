import  Express  from "express";
import { postLikes } from "../controllers/like.js";

const router = Express.Router()

router.get("/", postLikes)

export default router