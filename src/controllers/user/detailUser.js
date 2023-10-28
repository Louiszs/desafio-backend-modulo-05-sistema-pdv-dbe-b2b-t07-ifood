const { handleError } = require('../../error');
const { getUserAndReturn } = require('../../services');

const detailUser = async (req, res) => {
  try {
    const { authorization } = req.headers;

    const user = await getUserAndReturn(authorization);

    return res.json(user);
  } catch (error) {
    handleError(res, error, 400);
  }
}

module.exports = detailUser;
