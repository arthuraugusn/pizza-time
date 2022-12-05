/*

- OBJETIVO: Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre a API e a model dos produtos
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 05/12/2022
- VERSÃO: 1.0

*/


const {MESSAGE_SUCCESS, MESSAGE_ERROR} = require('../modulos/config.js')

const listarPizzaria = async function(){
    let produtosJSON = {}

    const{selectAllInfosProdutos} = require('../model/dao/produto.js')

    const dadosProdutos = await selectAllInfosProdutos()

    if(dadosProdutos){

        produtosJSON.produtos = dadosProdutos

        return produtosJSON

    }
    
    else{
        return false
    }
}

const novoProduto = async function(produto){
    if(produto.preco =='' || produto.preco == undefined || produto.foto =='' || produto.foto == undefined|| produto.nome =='' || produto.nome == undefined ||produto.descricao =='' || produto.descricao == undefined || produto.id_pizzaria =='' || produto.id_pizzaria == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const novoProduto = require('../model/dao/produto.js')

        if(produto.promocao == ''|| produto.promocao == undefined){
            produto.promocao = 0

            const rsProduto = await novoProduto.insertDadosProduto(produto)
    
            if(rsProduto){
                return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
            }else{
                return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            const rsProduto = await novoProduto.insertDadosProduto(produto)
    
            if(rsProduto){
                return {status: 200, message: MESSAGE_SUCCESS.INSERT_ITEM}
            }else{
                return {status:500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }
    }
}

const deletarProduto = async function(idProduto){
    if(idProduto == '' || idProduto == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const deletar = require('../model/dao/produto.js')

        const verificar = await deletar.selectByIdProduto(idProduto)

        if(verificar){
            const rsDadosProduto = await deletar.deleteProduto(idProduto)

            if(rsDadosProduto){
                return {status:200, message: MESSAGE_SUCCESS.DELETE_ITEM}
            }else{
                return {status:400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        }
    }
}

const buscaDadosPizzariaId = async function(idProduto){
    let produtoJSON = {}

    if(idProduto == '' || idProduto == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else{
        const {selectByIdProduto} = require('../model/dao/produto.js')

        const produto = await selectByIdProduto(idProduto)

        if(produto){
            produtoJSON.produto = produto
            return produtoJSON
        }else{
            return false
        }
    }
}

const atualizarProduto = async function(produto){
    if(produto.id == '' || produto.id == undefined){
        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID}
    }else if(produto.preco =='' || produto.preco == undefined || produto.foto =='' || produto.foto == undefined|| produto.nome =='' || produto.nome == undefined ||produto.descricao =='' || produto.descricao == undefined || produto.id_pizzaria =='' || produto.id_pizzaria == undefined){
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELD}
    }else{
        const atualizar = require('../model/dao/produto.js')

        const verificar = await atualizar.selectByIdProduto(produto.id)

        if(produto.promocao == '' || produto.promocao == undefined){
            produto.promocao = 0
            if(verificar){
                const rsProduto = await atualizar.updateProduto(produto)
    
                if(rsProduto){
                    return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
                } else{
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
            }else{
                return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }
        }else{
            if(verificar){
                const rsProduto = await atualizar.updateProduto(produto)
    
                if(rsProduto){
                    return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
                } else{
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
            }else{
                return {status:400, message: MESSAGE_ERROR.NOT_FOUND_DB}
            }
        }        
    }
}

module.exports={
    listarPizzaria,
    novoProduto,
    deletarProduto,
    buscaDadosPizzariaId,
    atualizarProduto
}