const conexao = require('../../conexao');
const senhaCriptografada = require('secure-password');

const pwd = senhaCriptografada();

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const { id } = req.usuario;

    if (!nome || !email || !senha) {
        return res.status(400).json({ "mensagem": "Todos os campos são obrigatórios" });
    }

    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rowCount: usuariosRow } = await conexao.query(query, [email]);

    if (usuariosRow > 0) {
        return res.status(400).json({ "mensagem": "O e-mail informado já está sendo utilizado por outro usuário." });
    }

    try {
        const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');

        const usuarioAtualizado = "UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4";
        await conexao.query(usuarioAtualizado, [nome, email, hash, id]);

        return res.status(204).json();

    } catch (e) {
        return res.status(500).json(e.message);
    }
}

module.exports = {
    atualizarUsuario
}