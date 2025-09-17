import express from "express";
import { isAuth } from "../middlewares/isAuth.middleware.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.route("/send/:id").post(isAuth, sendMessage);
router.route("/all/:id").get(isAuth, getMessage);

export default router;
