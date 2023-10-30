const { handleError } = require('../../error');
const { createUserAndReturn } = require('../../services/');
const createUser = async (req, res) => {
  try {

    const { nome, email, senha } = req.body;

    const resposta = await createUserAndReturn(nome, email, senha)

    return res.status(201).json(resposta)

  } catch (error) {
    handleError(res, error, 400);
  }
};

module.exports = createUser
