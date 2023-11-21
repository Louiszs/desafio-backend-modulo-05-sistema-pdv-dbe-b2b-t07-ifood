const knex = require("../../data/connection");

const insertClient = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const existantEmail = await knex("clientes").where({ email }).first();

    if (existantEmail) {
      return res.status(400).json("O email já está em uso por outro cliente");
    }
    const existantCpf = await knex("clientes").where({ cpf }).first();

    if (existantCpf) {
      return res.status(400).json("Cpf já cadastrado");
    }

    const client = await knex("clientes")
      .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
      .returning("*");

    if (!client) {
      return res.status(400).json("O cliente não foi cadastrado.");
    }

    return res.status(201).json("O cliente foi cadastrado com sucesso!");
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listClients = async (_, res) => {
  try {
    const client = await knex("clientes").orderBy("id", "asc");

    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editClient = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  const id = req.params.id;

  try {
    const existantClient = await knex("clientes").where({ id }).first();
    if (!existantClient) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }
    if (email) {
      const existantEmail = await knex("clientes").where({ email }).first();
      if (existantClient.email !== email && existantEmail) {
        return res.status(400).json("O email já está em uso por outro cliente");
      }
    }
    if (cpf) {
      const existantCpf = await knex("clientes").where({ cpf }).first();

      if (existantClient.cpf !== cpf && existantCpf) {
        return res.status(400).json("Cpf já cadastrado");
      }
    }

    await knex("clientes").where({ id }).update({
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detailClient = async (req, res) => {
  const { id } = req.params;

  try {
    const foundedClient = await knex
      .select("*")
      .from("clientes")
      .where({ id })
      .first();

    if (!foundedClient) {
      return res.status(404).json({ mensagem: "Cliente não localizado" });
    }

    return res.status(200).json(foundedClient);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  detailClient,
  editClient,
  insertClient,
  listClients,
};
