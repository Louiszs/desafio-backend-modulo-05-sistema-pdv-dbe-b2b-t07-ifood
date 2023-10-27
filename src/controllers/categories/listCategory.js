const knex = require("../../data/connection")
const listCategory = async (req, res) => {
  try {
      const categorias = await knex('categorias').select('*');
      res.status(200).json(categorias);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = listCategory
