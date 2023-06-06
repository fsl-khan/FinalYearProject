import  express  from "express";
import { UpdateType, getAllUsers, getPoets, getRankUser, getSample, getUser , searchPost, searchUser, updateRanking, updateUser } from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userid" , getUser)  
router.put("/" , updateUser)  
router.get("/all" , getAllUsers)  
router.get("/rank" , getRankUser)  
router.post("/search" , searchUser)  
router.post("/rankUser" , updateRanking)  
router.post("/searchpost" , searchPost)  
router.post("/update" , UpdateType)  
router.post("/sample" , getSample)  
router.get("/poets" , getPoets)  

export default router