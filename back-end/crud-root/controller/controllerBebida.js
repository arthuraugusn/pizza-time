/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model de bebidas
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 06/12/2022
- VERSÃO: 1.0

*/


const {MESSAGE_SUCCESS, MESSAGE_ERROR} = require('../modulos/config.js')

const listarBebidas = async function(){
    let bebidasJSON = {}

    const{selectAllBebidas} = require('../model/dao/bebida.js')

    const bebidas = await selectAllBebidas()

    if(bebidas){

        bebidasJSON.bebidas = bebidas

        return bebidasJSON

    }
    
    else{
        return false
    }
}

const novaBebida = async function(bebida){
    if(bebida.id_tipo_bebida =='' || bebida.id_tipo_bebida == undefined || bebida.id_tamanho_bebida =='' || bebida.id_tamanho_bebida == undefined || bebida.id_produto =='' || bebida.id_produto == undefined || bebida.ml == '' || bebida.ml == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const novaBebida = require('../model/dao/bebida.js')

        const rsNovaBebida = await novaBebida.insertBebida(bebida)

        if(rsNovaBebida){
            return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
        }else{
            return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

const deletarBebida = async function(idBebida){
    if(idBebida == '' || idBebida == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletar= require('../model/dao/bebida.js')

        const verificar = await deletar.selectByIdBebida(idBebida)

        if(verificar){
            const rsBebida = await deletar.deleteBebida(idBebida)

            if(rsBebida){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaIdBebida = async function(idBebida){
    let bebidaJSON = {}

    if(idBebida == '' || idBebida == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdBebida} = require('../model/dao/bebida.js')

        const bebida = await selectByIdBebida(idBebida)

        if(bebida){
            bebidaJSON.bebida = bebida
            return bebidaJSON
        }else{
            return false
        }
    }
}

const atualizarBebida = async function(bebida){
    if(bebida.id == '' || bebida.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(bebida.id_tipo_bebida =='' || bebida.id_tipo_bebida == undefined || bebida.id_tamanho_bebida =='' || bebida.id_tamanho_bebida == undefined || bebida.id_produto =='' || bebida.id_produto == undefined || bebida.ml == '' || bebida.ml == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const atualizar = require('../model/dao/bebida.js')

        const verificar = await atualizar.selectByIdBebida(bebida.id)

        if(verificar){
            const rsBebida = await atualizar.updateBebida(bebida)
    
            if(rsBebida){
                return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
            }else{
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }  
    }
}

module.exports={
    listarBebidas,
    novaBebida,
    deletarBebida,
    buscaIdBebida,
    atualizarBebida
}