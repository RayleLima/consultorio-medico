const { consultas, consultasFinalizadas } = require('../bancodedados')

const validarDadosFinalizar = (req, res, next) => {
    const { identificadorConsulta, textoMedico } = req.body

    if (!identificadorConsulta || !textoMedico) {
        return res.status(400).json({ "mensagem": "Identificador e Laudo obrigatórios" })
    }

    if (isNaN(Number(identificadorConsulta))) {
        return res.status(400).json({ "mensagem": "identificador inválido!" })
    }

    const consultaFinalizada = consultasFinalizadas.some((consulta) => {
        return consulta.identificador === Number(identificadorConsulta)
    })
    if (consultaFinalizada) {
        return res.status(400).json({ "mensagem": "Consulta já finalizada!" })
    }

    const idEncontrado = consultas.some((consulta) => {
        return consulta.identificador === Number(identificadorConsulta)
    })
    if (!idEncontrado) {
        return res.status(404).json({ "mensagem": "identificador não encontrado!" })
    }

    if (textoMedico.length <= 0 || textoMedico.length > 200) {
        return res.status(400).json({ "mensagem": "O tamanho do textoMedico não está dentro do esperado" })
    }

    next()
}

module.exports = validarDadosFinalizar