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

/******************  TIPO DE PIZZA ***********************/

//End-Point para listar todos os tipos de pizzas
app.get('/v1/produtos/pizza/tipos', cors(), async function(request, response){
    let status
    let message

    const controllerTipo = require('./controller/controllerTipoPizza.js')
    
    const listaTipos = await controllerTipo.listarTiposPizzas()

    if(listaTipos){
        
        status = 200
        message = listaTipos

    }else{
        
        status = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB

    }

    response.status(status)
    response.json(message)
})

//End-Point para listar um tipo de pizza pelo id
app.get('/v1/produto/pizza/tipo/:id', cors(), async function(request, response){
    let status
    let message
    let id = request.params.id

    const controllerTipo = require('./controller/controllerTipoPizza.js')

    const tipoPizza = await controllerTipo.buscaTipoIdPizza(id)

    if(tipoPizza){
        status = 200
        message = tipoPizza
    }else{
        status = 400
        message = MESSAGE_ERROR.INTERNAL_ERROR_DB
    }

    response.status(status)
    response.json(message)
})

//End-point para adicionar um tipo de pizza
app.post('/v1/produto/pizza/tipo',jsonParser, cors(), async function(request, response){
    let message
    let status
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!='{}'){
            const controllerTipo = require('./controller/controllerTipoPizza.js')

            const rsNovoTipo = await controllerTipo.novoTipoPizza(dadosBody)

            if(rsNovoTipo){
                status = rsNovoTipo.status
                message = rsNovoTipo.message
            }else{
                status = 400
                message = rsNovoTipo
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

//End-Point para deletar o tipo da pizza
app.delete('/v1/produto/pizza/tipo/:id', jsonParser, cors(), async function(request, response){
    let status
    let message
    let id = request.params.id

    if(id != '' && id != undefined){
        const controllerTipo = require('./controller/controllerTipoPizza.js')
        const deletarTipo = await controllerTipo.deletarTipoPizza(id)
    
        status = deletarTipo.status
        message = deletarTipo.message
    }else{
    
        status= 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(status)
    response.json(message)

})

//End-Point para atualizar um tipo de pizza
app.put('/v1/produto/pizza/tipo/:id', jsonParser, cors(), async function(request, response){
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

                const controllerTipo = require('./controller/controllerTipoPizza.js')

                const atualizarTipo = await controllerTipo.atualizarTipoPizza(dadosBody)

                status = atualizarTipo.status
                message = atualizarTipo.message
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

/******************  TIPO DE BEBIDA ***********************/

//End-Point para listar todos os tipos de bebidas
app.get('/v1/produtos/bebida/tipos', cors(), async function(request, response){
    let status
    let message

    const controllerTipo = require('./controller/controllerTipoBebida.js')
    
    const listaTipos = await controllerTipo.listarTiposBebidas()

    if(listaTipos){
        
        status = 200
        message = listaTipos

    }else{
        
        status = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB

    }

    response.status(status)
    response.json(message)
})

//End-Point para listar um tipo de bebida pelo id
app.get('/v1/produto/bebida/tipo/:id', cors(), async function(request, response){
    let status
    let message
    let id = request.params.id

    const controllerTipo = require('./controller/controllerTipoBebida.js')

    const tipoPizza = await controllerTipo.buscaTipoIdBebida(id)

    if(tipoPizza){
        status = 200
        message = tipoPizza
    }else{
        status = 400
        message = MESSAGE_ERROR.INTERNAL_ERROR_DB
    }

    response.status(status)
    response.json(message)
})

//End-point para adicionar um tipo de bebida
app.post('/v1/produto/bebida/tipo',jsonParser, cors(), async function(request, response){
    let message
    let status
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!='{}'){
            const controllerTipo = require('./controller/controllerTipoBebida.js')

            const rsNovoTipo = await controllerTipo.novoTipoBebida(dadosBody)

            if(rsNovoTipo){
                status = rsNovoTipo.status
                message = rsNovoTipo.message
            }else{
                status = 400
                message = rsNovoTipo
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

//End-Point para deletar o tipo da bebida
app.delete('/v1/produto/bebida/tipo/:id', jsonParser, cors(), async function(request, response){
    let status
    let message
    let id = request.params.id

    if(id != '' && id != undefined){
        const controllerTipo = require('./controller/controllerTipoBebida.js')
        const deletarTipo = await controllerTipo.deletarTipoBebida(id)
    
        status = deletarTipo.status
        message = deletarTipo.message
    }else{
    
        status= 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(status)
    response.json(message)

})

//End-Point para atualizar um tipo de bebida
app.put('/v1/produto/bebida/tipo/:id', jsonParser, cors(), async function(request, response){
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

                const controllerTipo = require('./controller/controllerTipoBebida.js')

                const atualizarTipo = await controllerTipo.atualizarTipoBebida(dadosBody)

                status = atualizarTipo.status
                message = atualizarTipo.message
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
    let status
    let message

    const controllerPizzaria = require('./controller/controllerEnderecoPizzaria.js')
    
    const listarEndereco = await controllerEndereco.listarEnderecoPizzaria()

    if(listarEndereco){
        
        status = 200
        message = listarEndereco

    }else{
        
        status = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB

    }

    response.status(status)
    response.json(message)
})

//End-Point para listar um endereço pelo id
app.get('/v1/pizzaria/endereco/:id', cors(), async function(request, response){
    let status
    let message
    let id = request.params.id

    const controllerEndereco = require('./controller/controllerEnderecoPizzaria.js')

    const endereco = await controllerEndereco.buscaEnderecoId(id)

    if(endereco){
        status = 200
        message = endereco
    }else{
        status = 400
        message = MESSAGE_ERROR.INTERNAL_ERROR_DB
    }

    response.status(status)
    response.json(message)
})

//End-Point para atualizar o endereço da pizzaria
app.put('/v1/pizzaria/endereco/:id',jsonParser, cors(), async function(request, response){
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

                const controllerEndereco = require('./controller/controllerEnderecoPizzaria.js')

                const atualizarEndereco = await controllerEndereco.atualizarEndereco(dadosBody)

                status = atualizarEndereco.status
                message = atualizarEndereco.message
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

//End-Point para deletar o endereço da pizzaria
app.delete('/v1/pizzaria/endereco/:id', cors(), async function(request, response){let status
    let message
    let id = request.params.id

    if(id != '' && id != undefined){
        const controllerEndereco = require('./controller/controllerEnderecoPizzaria.js')
        const deletarEndereco = await controllerEndereco.deletarEndereco(id)
    
        status = deletarEndereco.status
        message = deletarEndereco.message
    }else{
    
        status= 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(status)
    response.json(message)

})

//End-Point para colocar o endereço da pizzaria
app.post('/v1/pizzaria/endereco',jsonParser, cors(), async function(request, response){
    let message
    let status
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!='{}'){
            const controllerEndereco = require('./controller/controllerEnderecoPizzaria.js')

            const rsPizzaria = await controllerEndereco.novoEndereco(dadosBody)

            if(rsNovoEndereco){
                status = rsNovoEndereco.status
                message = rsNovoEndereco.message
            }else{
                status = 400
                message = rsNovoEndereco
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

/******************  PIZZARIA ***********************/

//End-Point para listar o endereço da pizzaria
app.get('/v1/pizzaria', cors(), async function(request, response){
    let status
    let message

    const controllerPizzaria = require('./controller/controllerPizzaria.js')
    
    const listar = await controllerPizzaria.listarPizzaria()

    if(listar){
        
        status = 200
        message = listar

    }else{
        
        status = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB

    }

    response.status(status)
    response.json(message)
})

//End-Point para listar um endereço pelo id
app.get('/v1/pizzaria/:id', cors(), async function(request, response){
    let status
    let message
    let id = request.params.id

    const controllerPizzaria = require('./controller/controllerPizzaria.js')

    const pizzaria = await controllerPizzaria.buscaDadosPizzariaId(id)

    if(pizzaria){
        status = 200
        message = pizzaria
    }else{
        status = 400
        message = MESSAGE_ERROR.INTERNAL_ERROR_DB
    }

    response.status(status)
    response.json(message)
})

//End-Point para atualizar o endereço da pizzaria
app.put('/v1/pizzaria/:id',jsonParser, cors(), async function(request, response){
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

                const controllerPizzaria = require('./controller/controllerPizzaria.js')

                const atualizarDadosPizzaria = await controllerPizzaria.atualizarDadosPizzaria(dadosBody)

                status = atualizarDadosPizzaria.status
                message = atualizarDadosPizzaria.message
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

//End-Point para deletar o endereço da pizzaria
app.delete('/v1/pizzaria/:id', cors(), async function(request, response){let status
    let message
    let id = request.params.id

    if(id != '' && id != undefined){
        const controllerPizzaria = require('./controller/controllerPizzaria.js')
        const deletar = await controllerPizzaria.deletarDadosPizzaria(id)
    
        status = deletar.status
        message = deletar.message
    }else{
    
        status= 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(status)
    response.json(message)

})

//End-Point para colocar as informações da pizzaria
app.post('/v1/pizzaria',jsonParser, cors(), async function(request, response){
    let message
    let status
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!='{}'){
            const controllerPizzaria = require('./controller/controllerPizzaria.js')

            const rsPizzaria = await controllerPizzaria.novosDadosPizzaria(dadosBody)

            if(rsPizzaria){
                status = rsPizzaria.status
                message = rsPizzaria.message
            }else{
                status = 400
                message = rsPizzaria
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

/******************  PRODUTOS ***********************/

//End-Point para colocar os dados do produto
app.post('/v1/produto',jsonParser, cors(), async function(request, response){
    let message
    let status
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!='{}'){
            const controllerProdutos = require('./controller/controllerProdutos.js')

            const rsProduto = await controllerProdutos.novoProduto(dadosBody)

            if(rsProduto){
                status = rsProduto.status
                message = rsProduto.message
            }else{
                status = 400
                message = rsProduto
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

//End-Point para listar os produtos da pizzaria
app.get('/v1/produtos', cors(), async function(request, response){
    let status
    let message

    const controllerProdutos = require('./controller/controllerProdutos.js')
    
    const listar = await controllerProdutos.listarPizzaria()

    if(listar){
        
        status = 200
        message = listar

    }else{
        
        status = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB

    }

    response.status(status)
    response.json(message)
})

//End-Point para listar um produto pelo id
app.get('/v1/produto/:id', cors(), async function(request, response){
    let status
    let message
    let id = request.params.id

    const controllerProdutos = require('./controller/controllerProdutos.js')

    const produto = await controllerProdutos.buscaDadosPizzariaId(id)

    if(produto){
        status = 200
        message = produto
    }else{
        status = 400
        message = MESSAGE_ERROR.INTERNAL_ERROR_DB
    }

    response.status(status)
    response.json(message)
})

//End-Point para deletar um produto pelo id
app.delete('/v1/produto/:id', cors(), async function(request, response){let status
    let message
    let id = request.params.id

    if(id != '' && id != undefined){
        const controllerProdutos = require('./controller/controllerProdutos.js')
        const deletar = await controllerProdutos.deletarProduto(id)
    
        status = deletar.status
        message = deletar.message
    }else{
    
        status= 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(status)
    response.json(message)

})

//End-Point para atualizar o produto
app.put('/v1/produto/:id',jsonParser, cors(), async function(request, response){
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

                const controllerProdutos = require('./controller/controllerProdutos.js')

                const atualizar = await controllerProdutos.atualizarProduto(dadosBody)

                status = atualizar.status
                message = atualizar.message
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

/****************** PIZZAS ***********************/

//End-Point para listar as pizzas cadastradas
app.get('/v1/produtos/pizzas', cors(), async function(request, response){
    let status
    let message

    const controllerPizza = require('./controller/controllerPizza.js')
    
    const listar = await controllerPizza.listarPizzas()

    if(listar){
        
        status = 200
        message = listar

    }else{
        
        status = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB

    }

    response.status(status)
    response.json(message)
})

//End-Point para listar uma pizza pelo id
app.get('/v1/produto/pizza/:id', cors(), async function(request, response){
    let status
    let message
    let id = request.params.id

    const controllerPizza = require('./controller/controllerPizza.js')

    const pizza = await controllerPizza.buscaIdPizza(id)

    if(pizza){
        status = 200
        message = pizza
    }else{
        status = 400
        message = MESSAGE_ERROR.INTERNAL_ERROR_DB
    }

    response.status(status)
    response.json(message)
})

//End-Point para inserir uma nova pizza
app.post('/v1/produto/pizza',jsonParser, cors(), async function(request, response){
    let message
    let status
    let headerContentType

    headerContentType = request.headers['content-type']

    if(headerContentType == 'application/json'){
        let dadosBody = request.body

        if(JSON.stringify(dadosBody)!='{}'){
            const controllerPizza = require('./controller/controllerPizza.js')

            const rsPizza = await controllerPizza.novaPizza(dadosBody)

            if(rsPizza){
                status = rsPizza.status
                message = rsPizza.message
            }else{
                status = 400
                message = rsPizza
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

//End-Point para deletar uma pizza pelo id
app.delete('/v1/produto/pizza/:id', cors(), async function(request, response){let status
    let message
    let id = request.params.id

    if(id != '' && id != undefined){
        const controllerPizza = require('./controller/controllerPizza.js')
        const deletar = await controllerPizza.deletarPizza(id)
    
        status = deletar.status
        message = deletar.message
    }else{
    
        status= 400
        message = MESSAGE_ERROR.REQUIRED_ID
    
    }

    response.status(status)
    response.json(message)

})

//End-Point para atualizar uma pizza pelo id
app.put('/v1/produto/pizza/:id',jsonParser, cors(), async function(request, response){
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

                const controllerPizza = require('./controller/controllerPizza.js')

                const atualizar = await controllerPizza.atualizarPizza(dadosBody)

                status = atualizar.status
                message = atualizar.message
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

app.listen(8080, function(){
    console.log('Waiting...')
})