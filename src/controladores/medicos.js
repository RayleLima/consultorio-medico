const { consultorio, consultas, consultasFinalizadas } = require('../bancodedados')

const consultasVinculadas = (req, res) => {
    const { identificador_medico } = req.query
    const buscarMedico = consultorio.medicos.find(medico => medico.identificador === Number(identificador_medico))
    const { identificador } = buscarMedico
    const consultasMedico = consultas.filter(consulta => consulta.identificadorMedico === identificador)
    const consultasFinalizadasMedico = consultasFinalizadas.filter(consulta => consulta.identificadorMedico === identificador)
    todasConsultasVinculadas = consultasMedico.concat(consultasFinalizadasMedico)
    res.status(200).json(todasConsultasVinculadas)
}

module.exports = consultasVinculadas