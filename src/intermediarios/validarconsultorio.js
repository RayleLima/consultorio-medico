let { consultorio } = require("../bancodedados");

const validarConsultorio = (req, res, next) => {
    const { cnes_consultorio, senha_consultorio } = req.query;

    if (!cnes_consultorio || !senha_consultorio) {
        return res.status(400).json({ "mensagem": "Cnes e senha são obrigatórios!" });
    }
    if (cnes_consultorio !== consultorio.cnes || senha_consultorio !== consultorio.senha) {
        return res.status(401).json({ "mensagem": "Cnes ou senha inválidos!" });
    }
    next();
}


module.exports = validarConsultorio