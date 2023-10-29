let { consultas } = require("../bancodedados");

const verificarIdentificador = (req, res, next) => {
    const { identificadorConsulta } = req.params
    if (isNaN(Number(identificadorConsulta))) {
        return res.status(400).json({ "mensagem": "identificador inválido!" })
    }

    const idEncontrado = consultas.some((consulta) => {
        return consulta.identificador === Number(identificadorConsulta)
    })
    if (!idEncontrado) {
        return res.status(404).json({ "mensagem": "identificador não encontrado!" })
    }

    next()
}

module.exports = verificarIdentificador