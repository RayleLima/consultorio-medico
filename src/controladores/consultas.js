let { consultorio, consultas, consultasFinalizadas, numeroid } = require("../bancodedados");
const { adicionarLaudo } = require('./laudo')

const listarConsultas = (req, res) => {
    const totalconsultas = consultas.concat(consultasFinalizadas)

    if (totalconsultas.length === 0) {
        return res.status(204).send()
    }

    return res.json(totalconsultas)
};
const identificadorNovaConsulta = (consultas) => {
    let ultimaConsulta = consultas.length

    if (ultimaConsulta === 0) {
        ultimaConsulta = 1
    } else {
        ultimaConsulta = consultas[consultas.length - 1].identificador + 1
    }
    return ultimaConsulta
}
const criarConsulta = (req, res) => {
    const { tipoConsulta, valorConsulta } = req.body;
    const { nome, cpf, dataNascimento, celular, email, senha } = req.body.paciente;
    const identificador = identificadorNovaConsulta(consultas)
    const medicos = consultorio.medicos.find((medico) => {
        return medico.especialidade === tipoConsulta
    });

    const novaConsulta = {
        identificador,
        tipoConsulta,
        identificadorMedico: medicos.identificador,
        finalizada: false,
        valorConsulta,
        paciente: {
            nome,
            cpf,
            dataNascimento,
            celular,
            email,
            senha
        }
    }
    consultas.push(novaConsulta);
    return res.status(201).send()
}

const atualizarConsulta = (req, res) => {
    const { identificadorConsulta } = req.params
    const { nome, cpf, dataNascimento, celular, email, senha } = req.body

    const consultaEncontrada = consultas.find(consulta => Number(identificadorConsulta) === consulta.identificador)
    consultaEncontrada.paciente.nome = nome
    consultaEncontrada.paciente.cpf = cpf
    consultaEncontrada.paciente.dataNascimento = dataNascimento
    consultaEncontrada.paciente.celular = celular
    consultaEncontrada.paciente.email = email
    consultaEncontrada.paciente.senha = senha

    return res.status(204).send()
}

const cancelarConsulta = (req, res) => {
    const { identificadorConsulta } = req.params

    const consultaEncontrada = consultas.findIndex((consulta) => {
        return consulta.identificador === Number(identificadorConsulta)
    })
    consultas.splice(consultaEncontrada, consultaEncontrada + 1)
    res.status(204).send()
}

const finalizarConsulta = (req, res) => {
    const { identificadorConsulta, textoMedico } = req.body
    const consultaEncontrada = consultas.find(consulta => Number(identificadorConsulta) === consulta.identificador)
    const { identificador, tipoConsulta, identificadorMedico, finalizada, valorConsulta, paciente } = consultaEncontrada
    const laudo = adicionarLaudo(consultaEncontrada, textoMedico)
    const consultaFinalizada = {
        identificador,
        tipoConsulta,
        identificadorMedico,
        finalizada: true,
        identificadorLaudo: laudo.identificador,
        valorConsulta,
        paciente
    }
    consultasFinalizadas.push(consultaFinalizada)
    const excluirconsultaFinalizada = consultas.findIndex(consulta => Number(identificadorConsulta) === consulta.identificador)
    consultas.splice(excluirconsultaFinalizada, excluirconsultaFinalizada + 1)
    return res.status(204).json()
}

module.exports = {
    listarConsultas,
    criarConsulta,
    atualizarConsulta,
    cancelarConsulta,
    finalizarConsulta
}