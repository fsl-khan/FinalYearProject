import  express  from "express";
import { rising } from "../controllers/risingStars.js";

const router = express.Router()

router.get("/", rising)

export default router