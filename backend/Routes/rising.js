import  express  from "express";
import { rating, rising, updateRating } from "../controllers/risingStars.js";

const router = express.Router()

router.get("/", rising)
router.get("/rate", rating)
router.post("/add", updateRating)

export default router