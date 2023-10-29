let { consultas } = require("../bancodedados");

const consultaFinalizada = (req, res, next) => {
    const { identificadorConsulta } = req.params
    const consultaEncontrada = consultas.find(consulta => Number(identificadorConsulta) === consulta.identificador)
    if (consultaEncontrada.finalizada) {
        return res.status(400).json({ "mensagem": "Consulta já finalizada!" })
    }
    next()
}

module.exports = consultaFinalizada