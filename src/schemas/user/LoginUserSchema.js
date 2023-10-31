const UserSchema = require("./UserSchema");

const LoginUserSchema = UserSchema.omit([ "nome" ])

module.exports = LoginUserSchema
