import express from "express";
import { createUser, loginUser, forgotPassword, resetPassword, userProfile } from "../controllers/user.controller.js";
import { protectedAction } from "../middleware/protected.js";


const router = express.Router();

router.post('/register', createUser);
router.post('/login',loginUser);
router.post('/forgot',forgotPassword);
router.post('/reset',resetPassword);
router.get("/profile", protectedAction, userProfile);


export default router;