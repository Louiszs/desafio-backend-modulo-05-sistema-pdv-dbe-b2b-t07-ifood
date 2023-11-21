const knex = require("../../data/connection");
const { uploadImage, deleteImage } = require("../../utils/upload/upload");

const insertProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  let produto_imagem = null;

  if (req.file) {
    const { originalname, mimetype, buffer } = req.file;

    try {
      const categoryExists = await knex("categorias")
        .where({ id: categoria_id })
        .first();

      if (!categoryExists) {
        return res.status(404).json("A categoria informada não existe.");
      }

      if (quantidade_estoque < 0 || valor < 0) {
        return res.status(400).json("Não são permitidos valores negativos.");
      }

      let product = await knex("produtos")
        .insert({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
          produto_imagem,
        })
        .returning("*");

      if (!product) {
        return res.status(400).json("O produto não foi cadastrado.");
      }

      const id = product[0].id;

      const productImage = await uploadImage(
        `produtos/${id}/${originalname}`,
        buffer,
        mimetype
      );

      product = await knex("produtos")
        .update({
          produto_imagem: productImage.url,
        })
        .where({ id })
        .returning("*");

      return res.status(201).json(product[0]);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  } else {
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

    const urlImage = productExists.produto_imagem;

    if (urlImage !== null) {
      await deleteImage(urlImage);
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

  if (req.file) {
    const { originalname, mimetype, buffer } = req.file;

    try {
      const existantProduct = await knex("produtos").where({ id }).first();

      if (!existantProduct) {
        return res.status(400).json("O produto informado não existe");
      }

      const existantCategory = await knex("categorias")
        .where({ id: categoria_id })
        .first();

      if (!existantCategory) {
        return res.status(400).json("A categoria informada não existe.");
      }

      let product = await knex("produtos")
        .update({
          descricao,
          quantidade_estoque,
          valor,
          categoria_id,
        })
        .where({ id });
      if (!product) {
        return res.status(400).json("O produto não foi atualizado.");
      }

      const productImage = await uploadImage(
        `produtos/${id}/${originalname}`,
        buffer,
        mimetype
      );

      product = await knex("produto_imagem")
        .update({
          produto_imagem: productImage.url,
        })
        .where({ id })
        .returning("*");

      console.log(product);
      return res.status(200).json(product[0]);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
  } else {
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

      const product = await knex("produtos")
        .update({
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
  }
};

module.exports = {
  insertProduct,
  listProducts,
  detailProduct,
  editProduct,
  removeProduct,
};
