const knex = require("../../data/connection")
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: 'Preencha os campos obrigatórios: nome, email e senha'
            });
        }
        const usuarioEncontrado = await knex('usuarios').where({ email }).first();

        if (usuarioEncontrado) {
            return res.status(409).json({
                mensagem: 'E-mail informado está vinculado a outro usuário.'
            });
        }
        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const usuarioCriado = await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCriptografada
        }).returning(['id', 'nome', 'email']);
        console.log(usuarioCriado)

        return res.status(201).json(usuarioCriado[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = createUser
