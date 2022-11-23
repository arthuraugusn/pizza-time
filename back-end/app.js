 /*
  
- OBJETIVO: API responsável pela manipulação de dados do Back-End
            /GET, POST, PUT, DELETE
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 23/11/2022
- VERSÃO: 1.0

*/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { response } = require('express')
const app = express()

app.use((request, response, next)=>{
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    app.use(cors())
    next()
})

const jsonParser = bodyParser.json()

app.post('/v1/produto', cors(), jsonParser , async function(request, response){
    const controllerTamanhoPizza = require('./controller/controllerTamanhoPizza.js')

    let dadosBody = request.body


    const novoTamanho = await controllerTamanhoPizza.novoTamanho(dadosBody)

    response.status(novoTamanho.status)
    response.json(novoTamanho.message)
})

app.listen(3030, function(){
    console.log('waiting')
})