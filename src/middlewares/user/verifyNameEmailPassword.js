
const verifyNameEmailPassword = (req, res, next) => {
  try {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: 'Preencha os campos obrigatórios: nome, email e senha'
      });
    }
    next()
  } catch (error) {
    return error.message;
  }
}

module.exports = verifyNameEmailPassword;
