import { mailtrapClient, sender } from "./mailtrapConfig.js"
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailtemplates.js"

export const sendVerificationEmail = async (email, verificationToken) => {

    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification"
        })

        console.log("Email sent successfully", response)
    } catch (error) {
        console.error("Error sending verification email", error)
        throw new Error("Error sending verification email", error)


    }

}

export const sendWelcomeEmail = async (email, name) => {

    const recipient = [{ email }]

    try {

        await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "1a21ee3f-748b-4e5a-bea7-06449e0d6d3a",
            template_variables: {
                "company_info_name": "MacroAI",
                "name": name
            }

        })
    } catch (error) {

        console.error('Error sending email', error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })

    }

}


export const sendPasswordResetEmail = async (email, resetUrl) => {

    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Password Reset"
        })



    } catch (error) {

        console.log("Error resetting password", error)
        throw new Error("Error resetting password", error)


    }

}

export const sendResetPasswordSuccessEmail = async (email) => {

    const recipient = [{ email }]

    try {

        await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Reset password successful ',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset Sucessful"
        })


    } catch (error) {
        throw new Error("Error sending password reset success email", error)
    }

}