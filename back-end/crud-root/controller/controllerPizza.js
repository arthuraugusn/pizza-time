/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model de tipos de pizzas
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 01/12/2022
- VERSÃO: 1.0

*/


const {MESSAGE_SUCCESS, MESSAGE_ERROR} = require('../modulos/config.js')

const listarPizzas = async function(){
    let pizzasJSON = {}

    const{selectAllPizzas} = require('../model/dao/pizza.js')

    const pizzas = await selectAllPizzas()

    if(pizzas){

        pizzasJSON.pizzas = pizzas

        return pizzasJSON

    }
    
    else{
        return false
    }
}

const novaPizza = async function(pizza){
    if(pizza.id_tipo_pizza =='' || pizza.id_tipo_pizza == undefined || pizza.id_tamanho_pizza =='' || pizza.id_tamanho_pizza == undefined || pizza.id_produto =='' || pizza.id_produto == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const novaPizza = require('../model/dao/pizza.js')

        if(pizza.favorito =='' || pizza.favorito == undefined || pizza.favorito != 0){
            pizza.favorito = 0

            const rsnovaPizza = await novaPizza.insertPizza(pizza)

            if(rsnovaPizza){
                return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
            }else{
                return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            const rsnovaPizza = await novaPizza.insertPizza(pizza)

            if(rsnovaPizza){
                return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
            }else{
                return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }
    }
}

const deletarPizza = async function(idPizza){
    if(idPizza == '' || idPizza == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletar= require('../model/dao/pizza.js')

        const verificar = await deletar.selectByIdPizza(idPizza)

        if(verificar){
            const rsPizza = await deletar.deletePizza(idPizza)

            if(rsPizza){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaIdPizza = async function(idPizza){
    let pizzaJSON = {}

    if(idPizza == '' || idPizza == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdPizza} = require('../model/dao/pizza.js')

        const pizza = await selectByIdPizza(idPizza)

        if(pizza){
            pizzaJSON.pizza = pizza
            return pizzaJSON
        }else{
            return false
        }
    }
}

const atualizarPizza = async function(pizza){
    if(pizza.id == '' || pizza.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(pizza.id_tipo_pizza =='' || pizza.id_tipo_pizza == undefined || pizza.id_tamanho_pizza =='' || pizza.id_tamanho_pizza == undefined || pizza.id_produto =='' || pizza.id_produto == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const atualizar = require('../model/dao/pizza.js')

        if(pizza.favorito =='' || pizza.favorito == undefined || pizza.favorito != 0){
            pizza.favorito = 0

            const verificar = await atualizar.selectByIdPizza(pizza.id)

            if(verificar){
                const rsTipo = await atualizar.updatePizza(pizza)
    
                if(rsTipo){
                    return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
                } else{
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
            }else{
                return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }
        }
        const verificar = await atualizar.selectByIdTipoPizza(tipoPizza.id)

            if(verificar){
                const rsTipo = await atualizar.updateTipoPizza(tipoPizza)
    
                if(rsTipo){
                    return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
                } else{
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
            }else{
                return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }  
    }
}

module.exports={
    listarPizzas,
    novaPizza,
    deletarPizza,
    buscaIdPizza,
    atualizarPizza
}