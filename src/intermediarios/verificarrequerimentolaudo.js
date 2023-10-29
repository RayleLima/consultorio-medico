const { consultasFinalizadas, consultas } = require('../bancodedados')
const verificarRequerimentoLoudo = (req, res, next) => {
    const { identificador_consulta, senha } = req.query
    if (!identificador_consulta) {
        return res.status(400).json({ "mensagem": "Identificador_consulta obrigatório!" })
    }
    if (!senha) {
        return res.status(401).json({ "mensagem": "Senha obrigatória!" })
    }
    const consultafinalizada = consultasFinalizadas.find(consulta => consulta.identificador === Number(identificador_consulta))
    if (!consultafinalizada) {
        const buscarEmConsultas = consultas.some(consulta => consulta.identificador === Number(identificador_consulta))
        if (!buscarEmConsultas) {
            return res.status(404).json({ "mensagem": "Consulta médica não encontrada!" })
        } else { return res.status(403).json({ "mensagem": "Consulta ainda não finalizada!" }) }
    }

    if (senha !== consultafinalizada.paciente.senha) {
        return res.status(401).json({ "mensagem": "Senha inválida!" })
    }
    if (!consultafinalizada.identificadorLaudo) {
        return res.status(404).json({ "mensagem": "Laudo inexistente!" })
    }
    next()
}

module.exports = verificarRequerimentoLoudo