const knex = require("../../data/connection");
const { HttpStatusError } = require("../../error");

const getUserPerId = async (id) => {
  const user = await knex("usuarios").where({ id }).first();

  if (!user) {
    throw new HttpStatusError("User not found", 404);
  }

  const { senha: _, ...result } = user

  return result
};

module.exports = getUserPerId;
