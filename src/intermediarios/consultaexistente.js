let { consultas } = require("../bancodedados");

const consultaExistente = (req, res, next) => {
    const { cpf, email } = req.body.paciente
    const buscarConsulta = consultas.some((consulta) => {
        return consulta.paciente.cpf === cpf || consulta.paciente.email === email
    })
    if (buscarConsulta) {
        return res.status(403).json({ "mensagem": "Já existe uma consulta em andamento com o cpf ou e-mail informado!" })
    }
    next()
}
module.exports = consultaExistente