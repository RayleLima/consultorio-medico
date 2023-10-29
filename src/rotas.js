const express = require("express");
const rotas = express();

const validarConsultorio = require('./intermediarios/validarconsultorio')
const validarDadosConsulta = require('./intermediarios/validardadosconsulta')
const validarDadosPaciente = require('./intermediarios/validardadospaciente')
const consultaExistente = require('./intermediarios/consultaexistente')
const consultaFinalizada = require('./intermediarios/consultafinalizada')
const verificarIdentificador = require('./intermediarios/verficaridentificador')
const validarIdCpfEmail = require('./intermediarios/validar-id-cpf-email')
const validarDadosAtualizacao = require('./intermediarios/validardadosatualizacao')
const validarDadosFinalizar = require('./intermediarios/validardadosfinalizar')
const verificarRequerimentoLoudo = require("./intermediarios/verificarrequerimentolaudo");
const verificarRequerimentoMedico = require("./intermediarios/verificarrequerimentomedico");

const { listarConsultas, criarConsulta, atualizarConsulta, cancelarConsulta, finalizarConsulta } = require("./controladores/consultas.js");
const { exibirLaudo } = require("./controladores/laudo");
const consultasVinculadas = require("./controladores/medicos");


rotas.get(
    "/consultas",
    validarConsultorio,
    listarConsultas
)

rotas.post(
    "/consulta",
    validarDadosConsulta,
    validarDadosPaciente,
    consultaExistente,
    criarConsulta
)

rotas.put(
    "/consulta/:identificadorConsulta/paciente",
    verificarIdentificador,
    validarDadosAtualizacao,
    validarIdCpfEmail,
    consultaFinalizada,
    atualizarConsulta
)

rotas.delete(
    "/consulta/:identificadorConsulta",
    verificarIdentificador,
    consultaFinalizada,
    cancelarConsulta
)

rotas.post(
    "/consulta/finalizar",
    validarDadosFinalizar,
    finalizarConsulta,
)

rotas.get(
    "/consulta/laudo",
    verificarRequerimentoLoudo,
    exibirLaudo
)

rotas.get(
    "/consultas/medico",
    verificarRequerimentoMedico,
    consultasVinculadas
)

module.exports = rotas;