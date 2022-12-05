/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados das pizzas com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 05/12/2022
- VERSÃO: 1.0

*/

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllPizzas = async function(){
    try {

        let sql = `select tbl_pizza.id as id_pizza,tbl_pizza.favorito as qntde_favorito, tbl_produto.nome as nome_pizza,tbl_produto.foto, tbl_produto.preco, tbl_tipo_pizza.tipo as tipo_pizza, tbl_tamanho_pizza.tamanho as tamanho_pizza
        from tbl_pizza
            inner join tbl_tamanho_pizza on
                tbl_tamanho_pizza.id = tbl_pizza.id_tamanho_pizza
            inner join tbl_tipo_pizza on
                tbl_tipo_pizza.id = tbl_pizza.id_tipo_pizza
            inner join tbl_produto on
                tbl_produto.id = tbl_pizza.id_produto
            inner join tbl_pizzaria on
                tbl_pizzaria.id = tbl_produto.id_pizzaria
            inner join tbl_endereco_pizzaria on
                tbl_endereco_pizzaria.id = tbl_pizzaria.id_endereco_pizzaria 
                
        order by tbl_pizza.id desc`

        const rsPizzas = await prisma.$queryRawUnsafe(sql)

        if(rsPizzas.length > 0){
            return rsPizzas
        }
        
    } catch (error) {
        return false
    }
}

const insertPizza = async function(pizza){
    try {

        let sql = `insert into tbl_pizza(id_tipo_pizza, id_tamanho_pizza, id_produto, favorito)
                    values(${pizza.id_tipo_pizza}, ${pizza.id_tamanho_pizza}, ${pizza.id_produto}, ${pizza.favorito})`

        const rsPizza = await prisma.$executeRawUnsafe(sql)

        if(rsPizza){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deletePizza = async function(id){
    try {

        let sql = `delete from tbl_pizza where id = ${id}`

        const rsPizza =await prisma.$queryRawUnsafe(sql)

        if(rsPizza){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectByIdPizza = async function(id){
    try {

        let sql = `select tbl_pizza.id as id_pizza,tbl_pizza.favorito as qntde_favorito, tbl_produto.nome as nome_pizza, tbl_produto.preco, tbl_tipo_pizza.tipo as tipo_pizza, tbl_tamanho_pizza.tamanho as tamanho_pizza
        from tbl_pizza
            inner join tbl_tamanho_pizza on
                tbl_tamanho_pizza.id = tbl_pizza.id_tamanho_pizza
            inner join tbl_tipo_pizza on
                tbl_tipo_pizza.id = tbl_pizza.id_tipo_pizza
            inner join tbl_produto on
                tbl_produto.id = tbl_pizza.id_produto
            inner join tbl_pizzaria on
                tbl_pizzaria.id = tbl_produto.id_pizzaria
            inner join tbl_endereco_pizzaria on
                tbl_endereco_pizzaria.id = tbl_pizzaria.id_endereco_pizzaria 
        
        where tbl_pizza.id = ${id}        `

        const rsPizza = await prisma.$queryRawUnsafe(sql)

        if(rsPizza.length>0){
            return rsPizza
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updatePizza = async function(pizza){
    try {
        let sql = `update tbl_pizza set id_tipo_pizza = ${pizza.id_tipo_pizza}, id_tamanho_pizza = ${pizza.id_tamanho_pizza},id_produto = ${pizza.id_produto}, favorito = ${pizza.favorito}  where id= ${pizza.id}`

        const rsPizza = await prisma.$executeRawUnsafe(sql)

        if(rsPizza){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false    
    }
}

module.exports={
    selectAllPizzas,
    insertPizza,
    deletePizza,
    selectByIdPizza,
    updatePizza
}