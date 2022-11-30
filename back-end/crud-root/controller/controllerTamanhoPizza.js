/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model de tamanhos das pizzas
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 28/11/2022
- VERSÃO: 1.0

*/


const {MESSAGE_SUCCESS, MESSAGE_ERROR} = require('../modulos/config.js')

const listarTamanhosPizzas = async function(){
    let tamanhosJSON = {}

    const{selectAllTamanhosPizzas} = require('../model/dao/tamanho_pizzas.js')

    const dadosTamanhos = await selectAllTamanhosPizzas()

    if(dadosTamanhos){

        tamanhosJSON.tamanhos_pizzas = dadosTamanhos

        return tamanhosJSON

    }
    
    else{
        return false
    }
}

const novoTamanhoPizza = async function(nomeTamanho){
    if(nomeTamanho =='' || nomeTamanho == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const novoTamanho = require('../model/dao/tamanho_pizzas.js')

        const rsNovoTamanho = await novoTamanho.insertTamanhoPizza(nomeTamanho)

        if(rsNovoTamanho){
            return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
        }else{
            return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const deletarTamanhoPizza = async function(idTamanho){
    if(idTamanho == '' || idTamanho == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletarTamanho = require('../model/dao/tamanho_pizzas.js')

        const verificar = await deletarTamanho.selectByIdTamanhoPizza(idTamanho)

        if(verificar){
            const rsTamanho = await deletarTamanho.deleteTamanhoPizza(idTamanho)

            if(rsTamanho){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaTamanhoIdPizza = async function(idTamanho){
    let tamanhoJSON = {}

    if(idTamanho == '' || idTamanho == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdTamanhoPizza} = require('../model/dao/tamanho_pizzas.js')

        const tamanho = await selectByIdTamanhoPizza(idTamanho)

        if(tamanho){
            tamanhoJSON.tamanho = tamanho
            return tamanhoJSON
        }else{
            return false
        }
    }
}

const atualizarTamanhoPizza = async function(tamanho){
    if(tamanho.id == '' || tamanho.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(tamanho.tamanho == '' || tamanho.tamanho ==  undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const attTamanho = require('../model/dao/tamanho_pizzas.js')

        const verificar = await attTamanho.selectByIdTamanhoPizza(tamanho.id)

        if(verificar){
            const rsTamanho = await attTamanho.updateTamanhoPizza(tamanho)

            if(rsTamanho){
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
    listarTamanhosPizzas,
    novoTamanhoPizza,
    deletarTamanhoPizza,
    buscaTamanhoIdPizza,
    atualizarTamanhoPizza
}