import { User } from "../models/UserModel.js"
import bcryptjs from "bcryptjs"
import crypto from 'crypto'
import { generateVerificationToken } from "../utiils/generateVerificationCode.js"
import { generateTokenAndSetCookie } from "../utiils/generateTokenAndSetCookie.js"
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetPasswordSuccessEmail } from "../mailtrap/emails.js"


export const signUp = async (req, res) => {
    const { name, email, password } = req.body

    try {

        if (!name || !email || !password) {
            throw new Error("All fields are required")
        }

        const userAlreadyExists = await User.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: `User with email ${email} already exists`
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = generateVerificationToken()
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //24 hours
        })

        await user.save()

        //jwt 
        generateTokenAndSetCookie(res, user._id)

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user,
                password: null
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const verifyEmail = async (req, res) => {

    const { code } = req.body

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code "
            })
        }

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()
        console.log(user)

        await sendWelcomeEmail(user.email, user.name)
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }

        })
    } catch (error) {

        throw new Error("Verification token isn't valid", error)
    }

}


export const logIn = async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    try {

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        generateTokenAndSetCookie(res, user._id)
        user.lastLogin = new Date()
        await user.save()

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user,
                password: undefined
            }
        })

    } catch (error) {
        console.log("Error in login function", error)

    }



}


export const logOut = async (req, res) => {


    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })

}


export const forgotPassword = async (req, res) => {

    const { email } = req.body

    const user = await User.findOne({ email })

    try {

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Email not found"
            })
        }

        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt

        await user.save()

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)

        res.status(200).json({
            success: true,
            message: "Sucessfully sent reset url"
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}


export const resetPassword = async (req, res) => {



    try {
        const { token } = req.params
        const { password } = req.body
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token"
            })
        }

        //update password
        const hashedPassword = await bcryptjs.hash(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined
        await user.save()
        await sendResetPasswordSuccessEmail(user.email)

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message

        })
    }

}