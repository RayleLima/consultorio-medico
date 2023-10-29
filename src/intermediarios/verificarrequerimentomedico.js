const { consultorio } = require('../bancodedados')

const verificarRequerimentoMedico = (req, res, next) => {
    const { identificador_medico } = req.query
    if (!identificador_medico) {
        return res.status(400).json({ "mensagem": "identificador_medico obrigatório!" })
    }
    const buscarMedico = consultorio.medicos.find(medico => medico.identificador === Number(identificador_medico))
    if (!buscarMedico) {
        return res.status(404).json({ "mensagem": "O médico informado não existe na base!" })
    }
    next()
}
module.exports = verificarRequerimentoMedico