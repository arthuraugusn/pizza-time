/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model de tamanhos das pizzas
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 28/11/2022
- VERSÃO: 1.0

*/

const {MESSAGE_SUCCESS, MESSAGE_ERROR} = require('../modulos/config.js')

const listarTamanhos = async function(){
    let tamanhosJSON = {}

    const{selectAllTamanhos} = require('../model/dao/tamanho_pizzas.js')

    const dadosTamanhos = await selectAllTamanhos()

    if(dadosTamanhos){

        tamanhosJSON.tamanhos_pizzas = dadosTamanhos

        return tamanhosJSON

    }
    
    else{
        return false
    }
}

const novoTamanho = async function(nomeTamanho){
    if(nomeTamanho ==''){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const novoTamanho = require('../model/dao/tamanho_pizzas.js')

        const rsNovoTamanho = await novoTamanho.insertTamanho(nomeTamanho)

        if(rsNovoTamanho){
            return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
        }else{
            return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

module.exports={
    listarTamanhos,
    novoTamanho
}