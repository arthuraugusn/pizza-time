/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados dos tamanhos das pizzas com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 28/11/2022
- VERSÃO: 1.0

*/

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllTamanhos = async function(){
    try {

        let sql = `select * from tbl_tamanho_pizza order by id desc`

        const rsTamanhos = await prisma.$queryRawUnsafe(sql)

        if(rsTamanhos.length > 0){
            return rsTamanhos
        }
        
    } catch (error) {
        return false
    }
}

const insertTamanho = async function(nomeTamanho){
    try {

        let sql = `insert into tbl_tamanho_pizza(tamanho)
                                    values('${nomeTamanho.tamanho}')`

        const rsTamanho = await prisma.$executeRawUnsafe(sql)

        if(rsTamanho){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteTamanho = async function(id){
    try {

        let sql = `delete from tbl_tamanho_pizza where id = ${id}`

        const rsTamanho =await prisma.$queryRawUnsafe(sql)

        if(rsTamanho){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectByIdTamanho = async function(id){
    try {

        let sql = `select * from tbl_tamanho_pizza where id = ${id}`

        const rsTamanho = await prisma.$queryRawUnsafe(sql)

        if(rsTamanho.length>0){
            return rsTamanho
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updateTamanhoPizza = async function(tamanho){
    try {
        let sql = `update tbl_tamanho_pizza set tamanho = '${tamanho.tamanho}' where id= ${tamanho.id}`

        const rsTamanho = await prisma.$executeRawUnsafe(sql)

        if(rsTamanho){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false    
    }
}

module.exports={
    selectAllTamanhos,
    insertTamanho,
    deleteTamanho,
    selectByIdTamanho,
    updateTamanhoPizza
}