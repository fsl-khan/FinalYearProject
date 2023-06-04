import  express  from "express";
import { getAllUsers, getRankUser, getUser , updateUser } from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userid" , getUser)  
router.put("/" , updateUser)  
router.get("/all" , getAllUsers)  
router.get("/rank" , getRankUser)  

export default router