/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model do tamanho das pizzas
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 23/11/2022
- VERSÃO: 1.0

*/

const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../config/config.js')

const novoTamanho = async function(tamanho){
    const newTamanho = require('../model/DAO/tamanho_pizza.js')

    const rsTamanho = await newTamanho.insertTamanhoPizza(tamanho)

    if(rsTamanho){
        return {status: 200, message:MESSAGE_SUCCESS.INSERT_ITEM}
    }
}

module.exports={
    novoTamanho
}