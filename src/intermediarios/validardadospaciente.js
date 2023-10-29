const validarDadosPaciente = (req, res, next) => {
    const { nome, cpf, dataNascimento, celular, email, senha } = req.body.paciente;

    if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
        return res.status(400).json({ "mensagem": "todos os campos são obrigatórios!" });
    }
    next();
}

module.exports = validarDadosPaciente