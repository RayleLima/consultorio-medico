# API consultório medico

## Requisitos: 
* Nodejs
* git
  
## Como executar?

- [ ] Faça o fork desse repositório para o seu GitHub
- [ ] Clone o seu repositório em sua máquina
- [ ] No terminal use o comando `npm install`
- [ ] Suba o servidor com o comando `npm run dev`

## Resumo da API

Esse é um pojeto **MVP** (Produto Viável Mínimo), ou seja, em um futuro próximo outras funcionalidade surgirão para agragar ainda mais ao projeto, sendo assim os dados do banco (nomePaciente, consultório, etc.) serão imutáveis (estáticos).

RESTful API que permite:

- Criar consulta médica
- Listar consultas médicas
- Atualizar os dados de uma consulta
- Excluir uma consulta médica
- Finalizar uma consulta médica
- Listar o laudo de uma consulta
- Listar as consultas que um médico atendeu

## Persistências dos dados

Os dados serão persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`. **Todas as informações e consultas médicas deverão ser inseridas dentro deste objeto, seguindo a estrutura que já existe.**

### Estrutura do objeto no arquivo `bancodedados.js`

```javascript
{
  consultorio: {
    nome: "Cubos Healthcare",
    identificador: 1,
    cnes: "1001",
    senha: "CubosHealth@2022",
    medicos: [
      {
        identificador: 1,
        nome: "Bill",
        especialidade: "GERAL",
      },
      {
        identificador: 2,
        nome: "Irineu",
        especialidade: "ODONTOLOGIA"
      },
    ]
  },
  consultas: [
    // array de consultas médicas
  ],
  consultasFinalizadas: [
    // array de consultas finalizadas
  ],
  laudos: [
    // array de laudos médicos
  ]
}
```

## Endpoints

### Listar consultas médicas

#### `GET` `/consultas?cnes_consultorio=1001&senha_consultorio=CubosHealth@2022`

Esse end-point deverá listar todas as consultas médicas.

- **Restrições aplicadas**:

  - Verifica se o cnes e a senha do consultório foram informados (passado como query params na url).
  - Valida se o cnes a senha do consultório estão corretos.

- **Requisição** - query params (Siga o padrão de nomenclatura)

  - cnes_consultorio
  - senha_consultorio

- **Resposta**
  - Listagem de todas as consultas.

#### Exemplo de resposta

```javascript
// HTTP Status 200 - Success
// 3 consultas encontradas
[
  {
    identificador: 1,
    tipoConsulta: "GERAL",
    identificadorMedico: 1,
    finalizada: true,
    valorConsulta: 3000,
    paciente: {
      nome: "John Doe",
      cpf: "55132392051",
      dataNascimento: "2022-02-02",
      celular: "11999997777",
      email: "john@doe.com",
      senha: "1234",
    },
  },
  {
    identificador: 3,
    tipoConsulta: "ODONTOLOGIA",
    identificadorMedico: 1,
    finalizada: false,
    valorConsulta: 5000,
    paciente: {
      nome: "John Doe 3",
      cpf: "55132392053",
      dataNascimento: "2022-02-02",
      celular: "11999997777",
      email: "john@doe3.com",
      senha: "1234",
    },
  },
];
```

```javascript
// Nenhuma consulta encontrada
// HTTP Status 204 - No Content
```

```javascript
// Senha do consultorio errada
// HTTP Status 401 - Unauthorized
{
  "mensagem": "Cnes ou senha inválidos!"
}
```

### Criar Consulta médica

#### `POST` `/consulta`

Esse endpoint cria uma consulta médica, onde é gerado um identificador único para identificação da consulta (identicador da consulta).

- **Restrições aplicadas**:

  - Verifica se todos os campos foram informados (todos são obrigatórios)
  - Verifica se o valor da consulta é numérico
  - Verifica se o CPF informado já não está vinculado a nenhuma consulta que não foi finalizada
  - Valida se o tipo da consulta informado consta nas especialidade dos médicos na base
  - Vincula o identificador do médico especializado que irá atender a consulta em questão no momento de criação da consulta
  - Defini _finalizada_ como false
  - Cria uma consulta médica cuja o identificador é único

- **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - tipoConsulta
  - valorConsulta
  - paciente
    - nome
    - cpf
    - dataNascimento
    - celular
    - email
    - senha

- **Resposta**

  Em caso de **sucesso**, não envia conteúdo no corpo (body) da resposta.  
   Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **mensagem** que possui como valor um texto explicando o motivo da falha.

#### Exemplo de Requisição

```javascript
// POST /consulta
{
  "tipoConsulta": "ODONTOLOGIA",
  "valorConsulta": 5000,
  "paciente": {
    "nome": "John Doe 3",
    "cpf": "55132392053",
    "dataNascimento": "2022-02-02",
    "celular": "11999997777",
    "email": "john@doe3.com",
    "senha": "1234"
  }
}
```

#### Exemplo de Resposta

```javascript
// HTTP Status 204 - No Content
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
    "mensagem": "Já existe uma consulta em andamento com o cpf ou e-mail informado!"
}
```

### Atualizar informações da consulta médica

#### `PUT` `/consulta/:identificadorConsulta/paciente`

Esse endpoint atualiza apenas os dados do paciente de uma consulta médica que não esteja finalizada.

- **Restrições aplicadas**:

  - Verifica se foi passado todos os campos no body da requisição
  - Verifica se o identificador da consulta passado como parametro na URL é válido
  - Se o CPF for informado, verifica se já existe outro registro com o mesmo CPF
  - Se o E-mail for informado, verifica se já existe outro registro com o mesmo E-mail
  - Verifica se a consulta não esta finalizada
  - Atualiza os dados do usuário de uma consulta médica

- **Requisição** - O corpo (body) possui um objeto com todas as seguintes propriedades (respeitando estes nomes):

  - nome
  - cpf
  - dataNascimento
  - celular
  - email
  - senha

- **Resposta**

  Em caso de **sucesso**, não é enviado conteúdo no corpo (body) da resposta.
  Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **mensagem** que possui como valor um texto explicando o motivo da falha.

#### Exemplo de Requisição

```javascript
// PUT /consulta/:identificadorConsulta/paciente
{
  "nome": "John Doe",
  "cpf": "55132392051",
  "dataNascimento": "2022-02-02",
  "celular": "11999997777",
  "email": "john@doe.com",
  "senha": "1234"
}
```

#### Exemplo de Resposta

```javascript
// HTTP Status 204 - No Content
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
    "mensagem": "Cpf já consta na base!"
}
```

### Cancelar Consulta

#### `DELETE` `/consulta/:identificadorConsulta`

Esse endpoint cancela uma consulta médica existente, esta consulta não pode estar _finalizada_.

- **Restrições aplicadas**:

  - Verifica se o identificador da consulta médica passado como parametro na URL é válido
  - Permiti excluir uma consulta apenas se _finalizada_ for igual a false
  - Remove a consulta do objeto de persistência de dados

- **Requisição**

  - Identificador da consulta (passado como parâmetro na rota)

- **Resposta**

  Em caso de **sucesso**, não é enviado conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta possui **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **mensagem** que possuir como valor um texto explicando o motivo da falha.

#### Exemplo de Resposta

```javascript
// HTTP Status 204 - No Content
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
  "mensagem": "A consulta só pode ser removida se a mesma não estiver finalizada"
}
```

### Finalizar uma consulta

#### `POST` `/consulta/finalizar`

Esse endpoint finaliza uma consulta com um texto de laudo válido do médico e registrar esse laudo e essa consulta finalizada.

- **Restrições aplicadas**:

  - Verifica se foi passado todos os campos no body da requisição
  - Verifica se o identificador da consulta existe
  - Verifica se a consulta já esta finalizada
  - Verifica se o texto do médico possui um tamanho > 0 e <= 200 carácteres
  - Armazena as informações do laudo na persistência de dados
  - Armazena a consulta médica finalizada na persistência de dados

- **Requisição** - O corpo (body) possui um objeto com as seguintes propriedades (respeitando estes nomes):

  - identificadorConsulta
  - textoMedico

- **Resposta**

  Em caso de **sucesso**, não é enviado conteúdo no corpo (body) da resposta.  
  Em caso de **falha na validação**, a resposta possuir **_status code_** apropriado, e em seu corpo (body) possui um objeto com uma propriedade **mensagem** que possui como valor um texto explicando o motivo da falha.

#### Exemplo de Requisição

```javascript
// POST /consulta/finalizar
{
	"identificadorConsulta": 1,
	"textoMedico": "XPTO"
}
```

#### Exemplo de Resposta

```javascript
// HTTP Status 204 - No Content
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
    "mensagem": "O tamanho do textoMedico não está dentro do esperado"
}
```

#### Exemplo do registro de uma consulta médica finalizada

```javascript
{
  "identificador": 1,
  "tipoConsulta": "GERAL",
  "identificadorMedico": 1,
  "finalizada": true,
  "identificadorLaudo": 1,
  "valorConsulta": 3000,
  "paciente": {
    "nome": "John Doe",
    "cpf": "55132392051",
    "dataNascimento": "2022-02-02",
    "celular": "11999997777",
    "email": "john@doe.com",
    "senha": "1234"
   }
}
```

#### Exemplo do registro de um laudo

```javascript
{
  "identificador": 1,
  "identificadorConsulta": 3,
  "identificadorMedico": 2,
  "textoMedico": "XPTO",
  "paciente": {
     "nome": "John Doe",
     "cpf": "55132392051",
     "dataNascimento": "2022-02-02",
     "celular": "11999997777",
     "email": "john@doe.com",s
  }
}
```

### Laudo

#### `GET` `/consulta/laudo?identificador_consulta=1&senha=1234`

Esse endpointá retornar informações do laudo de uma consulta junto as informações adicionais das entidades relacionadas aquele laudo.

- **Restrições aplicadas**:

  - Verificar se o identificador da consulta e a senha foram informados (passado como query params na url)
  - Verificar se a consulta médica informada existe
  - Verificar se a senha informada é uma senha válida
  - Verificar se existe um laudo para consulta informada
  - Exibir o laudo da consulta médica em questão junto as informações adicionais

- **Requisição** - query params

  - identificador_consulta
  - senha

- **Resposta**

  - Informações do laudo e das entidades relacionadas

#### Exemplo de Resposta

```javascript
// HTTP Status 200 - Success
{
  "identificador":1,
  "identificadorConsulta": 3,
  "identificadorMedico": 2,
  "textoMedico": "XPTO",
  "paciente": {
    "nome": "John Doe",
    "cpf": "55132392051",
    "dataNascimento": "2022-02-02",
    "celular": "11999997777",
    "email": "john@doe.com",
    "senha": "12345"
  }
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
  "mensagem": "Consulta médica não encontrada!"
}
```

### Médico

#### `GET` `/consultas/medico?identificador_medico=1`

Esse endpoint retorna todas as consultas que um profissional **_atendeu_**, ou seja, finalizadas.

- **Restrições aplicadas**:

  - Verifica se o identificador do medico foi informado (passado como query params na url)
  - Verifica se o médico existe
  - Exibi as consultas vinculadas ao médico

- **Requisição** - query params

  - identificador_medico

- **Resposta**

  - Listagem das consultas vinculadas ao médico

#### Exemplo de Resposta

```javascript
// HTTP Status 200 - Success
[
  {
    identificador: 1,
    tipoConsulta: "GERAL",
    identificadorMedico: 1,
    finalizada: true,
    identificadorLaudo: 1,
    valorConsulta: 3000,
    paciente: {
      nome: "John Doe",
      cpf: "55132392051",
      dataNascimento: "2022-02-02",
      celular: "11999997777",
      email: "john@doe.com",
      senha: "1234",
    },
  },
  {
    identificador: 3,
    tipoConsulta: "GERAL",
    identificadorMedico: 1,
    finalizada: true,
    identificadorLaudo: 1,
    valorConsulta: 5000,
    paciente: {
      nome: "John Doe 3",
      cpf: "55132392053",
      dataNascimento: "2022-02-02",
      celular: "11999997777",
      email: "john@doe3.com",
      senha: "1234",
    },
  },
];
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
  "mensagem": "O médico informado não existe na base!"
}
```


###### tags: `back-end` `nodeJS` `API REST`
