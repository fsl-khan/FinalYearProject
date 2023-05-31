import  Express  from "express";
import { getLike , addLike , deleteLike } from "../controllers/like.js";

const router = Express.Router()

router.get("/", getLike)
router.post("/", addLike)
router.delete("/", deleteLike)

export default router