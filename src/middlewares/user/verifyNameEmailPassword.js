const { handleError } = require("../../error");
const { UserSchema } = require("../../schemas");

const verifyNameEmailPassword = async (req, res, next) => {
  try {
    await UserSchema.validate(req.body);

    next()
  } catch (error) {
    handleError(res, error, 400)
  }
}

module.exports = verifyNameEmailPassword;
