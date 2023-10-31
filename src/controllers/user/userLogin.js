const { loginUserAndReturn } = require('../../services')
const { handleError } = require('../../error');

const userLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {

    const resposta = await loginUserAndReturn(email, senha)
    return res.status(200).json(resposta);

  } catch (error) {
    handleError(res, error, 400);
  }
};

module.exports = userLogin;
