/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados dos produtos com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 05/12/2022
- VERSÃO: 1.0

*/

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllInfosProdutos = async function(){
    try {

        let sql = `select * from tbl_produto order by id desc`

        const rsProdutos = await prisma.$queryRawUnsafe(sql)

        if(rsProdutos.length > 0){
            return rsProdutos
        }
        
    } catch (error) {
        return false
    }
}

const insertDadosProduto = async function(produto){
    try {

        let sql = `insert into tbl_produto(preco, foto, nome, promocao, descricao, id_pizzaria)
                    values(${produto.preco}, '${produto.foto}', '${produto.nome}', ${produto.promocao}, '${produto.descricao}', ${produto.id_pizzaria})`

        const rsProdutos = await prisma.$executeRawUnsafe(sql)

        if(rsProdutos){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteProduto = async function(id){
    try {

        let sql = `delete from tbl_produto where id = ${id}`

        const rsProdutos =await prisma.$queryRawUnsafe(sql)

        if(rsProdutos){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectByIdProduto = async function(id){
    try {

        let sql = `select * from tbl_produto
                    where tbl_produto.id = ${id}`

        const rsProdutos = await prisma.$queryRawUnsafe(sql)

        if(rsProdutos.length>0){
            return rsProdutos
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updateProduto = async function(produto){
    try {
        let sql = `update tbl_produto set preco = ${produto.preco}, foto = '${produto.foto}', promocao = ${produto.promocao}, descricao = '${produto.descricao}', id_pizzaria = ${produto.id_pizzaria}
                    where id= ${produto.id}`

        const rsProdutos = await prisma.$executeRawUnsafe(sql)

        if(rsProdutos){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false    
    }
}

module.exports={
    selectAllInfosProdutos,
    insertDadosProduto,
    selectByIdProduto,
    deleteProduto,
    updateProduto
}