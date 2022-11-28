 /* 
- OBJETIVO: API responsável pela manipulação de dados do Back-End
            /GET, POST, PUT, DELETE
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 28/11/2022
- VERSÃO: 1.0

*/

const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const {MESSAGE_SUCCESS, MESSAGE_ERROR} = require('./modulos/config.js')
const { json } = require('body-parser')
const e = require('express')

const app = express()

app.use((request, response, next)=>{
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    app.use(cors())
    next()
})

const jsonParser = bodyParser.json()

//End-Point para listar todos os tamanhos de pizzas
app.get('/v1/produtos/pizza/tamanhos', cors(), async function(request, response){
    let status
    let message

    const controllerTamanho = require('./controller/controllerTamanhoPizza.js')
    
    const listaTamanhos = await controllerTamanho.listarTamanhos()

    if(listaTamanhos){
        
        status = 200
        message = listaTamanhos

    }else{
        
        status = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB

    }

    response.status(status)
    response.json(message)
})

//End-point para adicionar um tamanho de pizza
app.post('/v1/produtos/pizza/tamanho', cors(), async function(request, response){
    let message
    let status
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!='{}'){
            const controllerTamanho = require('./controller/controllerTamanhoPizza.js')

            const rsNovoTamanho = await controllerTamanho.novoTamanho(dadosBody)

            if(rsNovoTamanho){
                status = rsNovoTamanho.status
                message = rsNovoTamanho.message
            }else{
                status = 400
                message = rsNovoTamanho
            }
        }else{
            status = 400
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }else{
        status = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(status)
    response.json(message)

})


app.listen(8080, function(){
    console.log('Waiting...')
})