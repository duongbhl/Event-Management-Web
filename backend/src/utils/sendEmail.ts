import nodemailer from 'nodemailer'

export const sendEmail =async (to:String, subject:String, text:String)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        },
    })
    await transporter.sendEmail({
        from:process.env.EMAIL_USER,
        to,
        subject,
        text
    })
}