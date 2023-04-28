import  express  from "express";
import { login , register , logout, registerMember } from "../controllers/auth.js";

const router = express.Router()

router.post("/login",login)
router.post("/register/poet",register)
router.post("/register/member",registerMember)
router.post("/logout",logout)

export default router