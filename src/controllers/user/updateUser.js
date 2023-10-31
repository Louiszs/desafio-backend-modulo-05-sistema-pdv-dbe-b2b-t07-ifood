const  { handleError } = require('../../error');
const updateUserAndConfirm = require('../../services/user/updateUserAndConfirm');

const updateUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const { authorization } = req.headers;

    await updateUserAndConfirm(nome, email, senha, authorization)

    return res.status(201).json({
      message: "User updated successfully"
    })
  } catch (error) {
    handleError(res, error, 400)
  }
}

module.exports = updateUser
