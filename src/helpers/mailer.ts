import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs"

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        // console.log(hashedToken)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
            // console.log(await User.findById(userId));
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        // create transporter
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "8adef3b78274e8",
                pass: "bf00a4a0652234"
            }
        });
        // console.log("transporter created")

        const mailOptions = {
            from: 'mainak@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
            to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            <br>
            or copy paste the link below :
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }
        // console.log("mail options created");

        const mailresponse = await transport.sendMail(mailOptions);
        // console.log("mail sent : ", mailresponse);

        return mailresponse;

    } catch (error: any) {
        console.log("failed to send email")
        throw new Error(error.message);

    }
}