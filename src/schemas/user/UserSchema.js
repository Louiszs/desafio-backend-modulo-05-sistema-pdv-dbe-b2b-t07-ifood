const yup = require('yup');

const UserSchema = yup.object({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().min(8).required(),
})

module.exports = UserSchema
