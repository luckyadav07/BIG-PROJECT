import nodemailer from "nodemailer"

// transporter sets up the connection to Gmail to send emails
// EMAIL_USER and EMAIL_PASS come from .env (EMAIL_PASS must be an app password, not your real gmail password)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

// sends one email to one person
// called in a loop from campaign controller to send bulk emails

export const sendSingleEmail = async (to, subject, text, html) => {

    try {
        const mailOptions = {

            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text,
            html: html,

        }

        const info = await transporter.sendMail(mailOptions)
        console.log(`Email sent successfully to ${to}. Message ID: ${info.messageId}`)

        return { success: true, messageId: info.messageId }

    } catch (error) {
        console.error(`Failed to send email to ${to}:`, error.message)
        return { success: false, error: error.message }
    }
    
}
