const knex = require("../../data/connection");

const getUserPerId = async (id) => {
  const user = await knex("usuarios").where({ id }).first();

  if (!user) {
    throw new Error();
  }

  const { senha: _, ...result } = user

  return result
};

module.exports = getUserPerId;
