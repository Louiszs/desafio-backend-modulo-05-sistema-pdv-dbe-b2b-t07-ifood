const { loginUserAndReturn } = require('../../services')
const { handleError } = require('../../error');

const userLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {

    const resposta = await loginUserAndReturn(email, senha)

    // if (!usuario) {
    //   return res.status(404).json({ mensagem: 'Email ou senha inválida' });
    // }
    // if (!senhavalida) {
    //   return res.status(400).json({ mensagem: 'Email ou senha inválida' });
    // }

    return res.json(resposta);
  } catch (error) {
    handleError(res, error, 400);
  }
};

module.exports = userLogin;
