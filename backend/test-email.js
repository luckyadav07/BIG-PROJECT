import 'dotenv/config'
import { sendSingleEmail } from './src/services/email.service.js'

(async () => {
    const to = process.env.TEST_RECIPIENT || 'recipient@example.com'
    const subject = 'Test email from project'
    const text = 'This is a plain-text test email.'
    const html = '<p><strong>This is an HTML test email.</strong></p>'

    console.log('Sending test email to', to)
    const res = await sendSingleEmail(to, subject, text, html)
    console.log('Result:', res)

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

})()
