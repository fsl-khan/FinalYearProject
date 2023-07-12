import  Express  from "express";
import { getPosts , addPost, deletePost, getfav, claimPost, getClaims, deleteClaimPost } from "../controllers/post.js";

const router = Express.Router()

router.get("/", getPosts )
router.post("/", addPost )
router.get("/fav", getfav )
router.delete("/:id", deletePost )
router.delete("/claim/:id", deleteClaimPost )
router.post("/claim", claimPost )
router.get("/claimPost" , getClaims)  


export default router