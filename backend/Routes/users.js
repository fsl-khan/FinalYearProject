import  express  from "express";
import { getAllUsers, getRankUser, getUser , searchUser, updateRanking, updateUser } from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userid" , getUser)  
router.put("/" , updateUser)  
router.get("/all" , getAllUsers)  
router.get("/rank" , getRankUser)  
router.post("/search" , searchUser)  
router.post("/rankUser" , updateRanking)  
export default router