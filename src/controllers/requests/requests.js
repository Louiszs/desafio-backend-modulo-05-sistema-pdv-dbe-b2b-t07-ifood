const knex = require("../../data/connection");
const getEmailSender = require("../../utils/email/getEmailSender");
const compiladorHtml = require("../../utils/htmlCompilator");

const requestRegister = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const clientExists = await knex("clientes").where({ id: cliente_id });
    if (!clientExists) {
      return res.status(404).json("O cliente informado não existe.");
    }
    let totalValue = 0;
    for (let i = 0; i < pedido_produtos.length; i++) {
      let productId = pedido_produtos[i].produto_id;

      const productExists = await knex("produtos")
        .where({
          id: productId,
        })
        .first();

      if (!productExists) {
        return res.status(404).json("O produto informado não existe.");
      }

      const solicitedQuanty = pedido_produtos[i].quantidade_produto;

      const stock = productExists.quantidade_estoque;

      if (stock < solicitedQuanty) {
        return res
          .status(400)
          .json(
            "A quantidade de produtos requisitada não está disponível no estoque"
          );
      }

      const produtcPrice = productExists.valor;
      totalValue += produtcPrice * solicitedQuanty;
    }
    const request = await knex("pedidos")
      .insert({
        cliente_id,
        observacao,
        valor_total: totalValue,
      })
      .returning("*");

    for (let i = 0; i < pedido_produtos.length; i++) {
      const productId = pedido_produtos[i].produto_id;
      const productExists = await knex("produtos").where({
        id: productId,
      });
      const solicitedQuanty = pedido_produtos[i].quantidade_produto;
      const produtcPrice = productExists[0].valor;
      const attStock = productExists[0].quantidade_estoque - solicitedQuanty;

      await knex("produtos")
        .where({ id: productId })
        .update({ quantidade_estoque: attStock });

      await knex("pedido_produtos")
        .insert({
          pedido_id: request[0].id,
          produto_id: productId,
          quantidade_produto: solicitedQuanty,
          valor_produto: produtcPrice,
        })
        .returning("*");
    }

    const { nome, email } = clientExists;

    const emailRequest = await compiladorHtml(
      "./src/utils/email/request.html",

      {
        cliente: nome,
        pedido: request[0].id,
        valor: request[0].valor_total / 100,
      }
    );

    getEmailSender.sendMail({
      from: process.env.EMAIL_FROM,
      to: `${nome} <${email}>`,
      subject: "Pedido dos mano",
      html: emailRequest,
    });

    return res.status(200).json(request);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const requestsList = async (req, res) => {
  const { cliente_id } = req.query;

  try {
    if (cliente_id) {
      const findClient = await knex("clientes").where("id", cliente_id);

      if (findClient) {
        const clientRequest = await knex("pedidos").where(
          "cliente_id",
          cliente_id
        );

        const allRequestsArray = [];

        for (let request of clientRequest) {
          const request_products = await knex("pedido_produtos").where(
            "pedido_id",
            request.id
          );

          allRequestsArray.push({ request, request_products });
        }

        return res.status(200).json(allRequestsArray);
      } else {
        return res.status(404).json({ mensagem: "Cliente não encontrado" });
      }
    }

    const allRequests = await knex("pedidos");

    const allRequestsArray = [];

    for (let request of allRequests) {
      const request_product = await knex("pedido_produtos").where(
        "pedido_id",
        request.id
      );

      allRequestsArray.push({ request, request_product });
    }

    return res.status(200).json(allRequestsArray);
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro ao listar todos os pedidos" });
  }
};

module.exports = {
  requestsList,
  requestRegister,
};
