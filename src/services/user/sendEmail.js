const { getEmailSender } = require('../../utils')


const sendEmail = (email, string, string2) => {
  try {
    getEmailSender.sendMail({
      from: `${process.env.EMAIL_USER}`,
      to: `${email}`,
      subject: `Usuário ${string}`,
      text: `${string2} de usuário`
    })
  } catch (error) {
    return error.message;
  }
}
module.exports = sendEmail
