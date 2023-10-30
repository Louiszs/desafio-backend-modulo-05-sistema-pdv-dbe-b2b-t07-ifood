const { verifyPassword } = require("../../repositories");

const VerifyLoginEmailPass = (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: 'Preencha os campos obrigatórios: email e senha'
      });
    }

    next();

  } catch (error) {
    return error.message;
  }
};

module.exports = VerifyLoginEmailPass;

