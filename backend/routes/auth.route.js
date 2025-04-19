import express from 'express'
import { logOut, signUp, logIn, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/authController.js'
import { verifyToken } from '../middleware/verifyToken.js'
const router = express.Router()


router.get("/check-auth", verifyToken, checkAuth)

router.post("/signup", signUp)
router.post("/login", logIn)
router.post("/logout", logOut)
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)

export default router;