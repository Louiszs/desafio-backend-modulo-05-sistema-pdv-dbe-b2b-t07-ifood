const { handleError } = require("../../error");
const { LoginUserSchema } = require("../../schemas/user");

const VerifyLoginEmailPass = async (req, res, next) => {
  try {
    await LoginUserSchema.validate(req.body);

    next();
  } catch (error) {
    handleError(res, error, 400);
  }
};

module.exports = VerifyLoginEmailPass;
