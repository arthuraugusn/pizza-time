 /* 
- OBJETIVO: API responsável pela manipulação de dados do Back-End
            /GET, POST, PUT, DELETE
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 28/11/2022
- VERSÃO: 1.0
- AMOTAÇÕES:

            npx prisma ->ve todos os comandos do prisma
            npx prisma generate -> gera novamente a migração
            npx prisma migrate dev -> conclui a migração com banco
            
            Usar no env:
            DATABASE_URL= "mysql://root:12345678@localhost:3306/db_pizza_time"

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

/******************  TAMANHO DAS PIZZAS ***********************/ 

//End-Point para listar todos os tamanhos de pizzas
app.get('/v1/produtos/pizza/tamanhos', cors(), async function(request, response){
    let status
    let message

    const controllerTamanho = require('./controller/controllerTamanhoPizza.js')
    
    const listaTamanhos = await controllerTamanho.listarTamanhosPizzas()

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

//End-Point para listar um tamanho de pizza pelo id
app.get('/v1/produto/pizza/tamanho/:id', cors(), async function(request, response){
    let status
    let message
    let id = request.params.id

    const controllerTamanho = require('./controller/controllerTamanhoPizza.js')

    const tamanhoPizza = await controllerTamanho.buscaTamanhoIdPizza(id)

    if(tamanhoPizza){
        status = 200
        message = tamanhoPizza
    }else{
        status = 400
        message = MESSAGE_ERROR.INTERNAL_ERROR_DB
    }

    response.status(status)
    response.json(message)
})

//End-point para adicionar um tamanho de pizza
app.post('/v1/produto/pizza/tamanho',jsonParser, cors(), async function(request, response){
    let message
    let status
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!='{}'){
            const controllerTamanho = require('./controller/controllerTamanhoPizza.js')

            const rsNovoTamanho = await controllerTamanho.novoTamanhoPizza(dadosBody)

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

//End-Point para deletar o tamanho da pizza
app.delete('/v1/produto/pizza/tamanho/:id', jsonParser, cors(), async function(request, response){
    let status
    let message
    let id = request.params.id

    if(id != '' && id != undefined){
        const controllerTamanho = require('./controller/controllerTamanhoPizza.js')
        const deletarTamanho = await controllerTamanho.deletarTamanhoPizza(id)
    
        status = deletarTamanho.status
        message = deletarTamanho.message
    }else{
    
        status= 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(status)
    response.json(message)

})

//End-Point para atualizar um tamanho de uma pizza
app.put('/v1/produto/pizza/tamanho/:id', jsonParser, cors(), async function(request, response){
    let status
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType== 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!= '{}'){
            let id = request.params.id

            if(id != '' && id != undefined){
                dadosBody.id = id

                const controllerTamanho = require('./controller/controllerTamanhoPizza.js')

                const attTamanho = await controllerTamanho.atualizarTamanhoPizza(dadosBody)

                status = attTamanho.status
                message = attTamanho.message
            }else{
                status = 400
                message= MESSAGE_ERROR.REQUIRED_ID
            }
        }else{
            status = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    }else{
        status = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(status)
    response.json(message)
})

/******************  TAMANHO DAS BEBIDAS ***********************/

//End-Point para listar todos os tamanhos de bebidas
app.get('/v1/produtos/bebida/tamanhos', cors(), async function(request, response){
    let status
    let message

    const controllerTamanho = require('./controller/controllerTamanhoBebida.js')
    
    const listaTamanhos = await controllerTamanho.listarTamanhosBebidas()

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

//End-Point para listar um tamanho de bebida pelo id
app.get('/v1/produto/bebida/tamanho/:id', cors(), async function(request, response){
    let status
    let message
    let id = request.params.id

    const controllerTamanho = require('./controller/controllerTamanhoBebida.js')

    const tamanhoPizza = await controllerTamanho.buscaTamanhoIdBebida(id)

    if(tamanhoPizza){
        status = 200
        message = tamanhoPizza
    }else{
        status = 400
        message = MESSAGE_ERROR.INTERNAL_ERROR_DB
    }

    response.status(status)
    response.json(message)
})

//End-point para adicionar um tamanho de uma bebida
app.post('/v1/produto/bebida/tamanho',jsonParser, cors(), async function(request, response){
    let message
    let status
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!='{}'){
            const controllerTamanho = require('./controller/controllerTamanhoBebida.js')

            const rsNovoTamanho = await controllerTamanho.novoTamanhoBebida(dadosBody)

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

//End-Point para deletar o tamanho da bebida
app.delete('/v1/produto/bebida/tamanho/:id', jsonParser, cors(), async function(request, response){
    let status
    let message
    let id = request.params.id

    if(id != '' && id != undefined){
        const controllerTamanho = require('./controller/controllerTamanhoBebida')
        const deletarTamanho = await controllerTamanho.deletarTamanhoBebida(id)
    
        status = deletarTamanho.status
        message = deletarTamanho.message
    }else{
    
        status= 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(status)
    response.json(message)

})

//End-Point para atualizar um tamanho de uma bebida
app.put('/v1/produto/bebida/tamanho/:id', jsonParser, cors(), async function(request, response){
    let status
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType== 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!= '{}'){
            let id = request.params.id

            if(id != '' && id != undefined){
                dadosBody.id = id

                const controllerTamanho = require('./controller/controllerTamanhoBebida')

                const attTamanho = await controllerTamanho.atualizarTamanhoBebida(dadosBody)

                status = attTamanho.status
                message = attTamanho.message
            }else{
                status = 400
                message= MESSAGE_ERROR.REQUIRED_ID
            }
        }else{
            status = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    }else{
        status = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(status)
    response.json(message)
})

/******************  ENDEREÇO DA PIZZARIA ***********************/

//End-Point para listar o endereço da pizzaria
app.get('/v1/pizzaria/endereco', cors(), async function(request, response){
})

app.listen(8080, function(){
    console.log('Waiting...')
})