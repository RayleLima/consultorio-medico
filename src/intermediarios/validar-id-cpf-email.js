const { consultas } = require('../bancodedados')

const validarIdCpfEmail = (req, res, next) => {
    const { identificadorConsulta } = req.params
    const { cpf, email } = req.body

    const cpfEcontrado = consultas.some((consulta) => {
        return consulta.paciente.cpf === cpf && consulta.identificador !== Number(identificadorConsulta)
    })
    const emailEcontrado = consultas.some((consulta) => {
        return consulta.paciente.email === email && consulta.identificador !== Number(identificadorConsulta)
    })

    if (cpfEcontrado || emailEcontrado) {
        return res.status(403).json({ "mensagem": "Cpf ou Email inválido!" })
    }
    next()
}

module.exports = validarIdCpfEmail
