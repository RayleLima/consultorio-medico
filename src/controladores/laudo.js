let { laudos, consultasFinalizadas } = require('../bancodedados')

const identificadorLaudo = (laudos) => {
    let ultimoLaudo = laudos.length

    if (ultimoLaudo === 0) {
        ultimoLaudo = 1
    } else {
        ultimoLaudo = laudos[laudos.length - 1].identificador + 1
    }
    return ultimoLaudo
}

const adicionarLaudo = (consulta, laudo) => {
    const identificador = identificadorLaudo(laudos)
    const { identificadorConsulta, identificadorMedico, paciente } = consulta

    const novoLaudo = {
        identificador,
        identificadorConsulta,
        identificadorMedico,
        textoMedico: laudo,
        paciente
    }
    laudos.push(novoLaudo)
    return novoLaudo
}

const exibirLaudo = (req, res) => {
    const { identificador_consulta } = req.query
    const consultafinalizada = consultasFinalizadas.find(consulta => consulta.identificador === Number(identificador_consulta))
    const laudo = laudos.find(laudo => laudo.identificador === consultafinalizada.identificadorLaudo)
    return res.json(laudo)
}

module.exports = {
    adicionarLaudo,
    exibirLaudo
}