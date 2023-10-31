const { handleError } = require('../../error');
const { getUserAndReturn, sendEmail } = require('../../services');

const detailUser = async (req, res) => {
  try {
    const { authorization } = req.headers;

    const user = await getUserAndReturn(authorization);
    sendEmail

    return res.json(user);
  } catch (error) {
    handleError(res, error, 400);
  }
}

module.exports = detailUser;
