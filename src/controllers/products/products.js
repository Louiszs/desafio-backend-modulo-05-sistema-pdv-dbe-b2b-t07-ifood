const knex = require("../../data/connection");

const insertProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  try {
    const categoryExists = await knex("categorias")
      .where({ id: categoria_id })
      .first();

    if (!categoryExists) {
      return res.status(404).json("A categoria informada não existe.");
    }

    let product = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");

    if (!product) {
      return res.status(400).json("O produto não foi cadastrado.");
    }

    return res.status(201).json(product[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listProducts = async (req, res) => {
  const { categoria_id } = req.query;

  try {
    let products;

    if (categoria_id) {
      const existantCategory = await knex("categorias")
        .where({ id: categoria_id })
        .first();

      if (!existantCategory) {
        return res.status(400).json("A categoria informada não existe.");
      }

      products = await knex("produtos")
        .where({ categoria_id })
        .orderBy("id", "asc");
    } else {
      products = await knex("produtos").select("*").orderBy("id", "asc");
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productExists = await knex("produtos").where({ id }).first();
    if (!productExists) {
      return res.status(400).json("O produto informado não existe");
    }

    const productWithOrder = await knex("pedido_produtos")
      .where({ produto_id: id })
      .first();

    if (productWithOrder) {
      return res.status(400).json({
        mensagem:
          "Não é possível excluir o produto, pois ele está vinculado a um pedido.",
      });
    }

    const excludedProduct = await knex("produtos").where({ id }).del();

    if (!excludedProduct) {
      return res.status(400).json("O produto não foi excluído.");
    }
    return res.status(200).json("O produto foi excluído com sucesso.");
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detailProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const foundedProduct = await knex
      .select("*")
      .from("produtos")
      .where({ id })
      .first();

    if (!foundedProduct) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    return res.status(200).json(foundedProduct);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  const { id } = req.params;
  try {
    const existentProduct = await knex("produtos").where({ id }).first();

    if (!existentProduct) {
      return res.status(400).json("O produto informado não existe");
    }
    const existantCategory = await knex("categorias")
      .where({ id: categoria_id })
      .first();

    if (!existantCategory) {
      return res.status(404).json("A categoria informada não existe.");
    }

    let product = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");

    if (!product) {
      return res.status(400).json("O produto não foi cadastrado.");
    }

    return res.status(201).json(product[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  insertProduct,
  listProducts,
  detailProduct,
  editProduct,
  removeProduct,
};
