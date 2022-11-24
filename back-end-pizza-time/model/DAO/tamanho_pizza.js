/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados dos tamanhos das pizzas com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 23/11/2022
- VERSÃO: 1.0

*/

const selectAllTamanhosPizzas = async function(){
    try{
        const {PrismaClient} = require('@prisma/client')

        const prisma = new PrismaClient()

        const rsTamanhosPizzas = await prisma.$queryRaw `select id, tamanho from tbl_tamanho_pizza order by id desc`

        console.log(rsTamanhosPizzas)

        if(rsTamanhosPizzas.length > 0){
            return rsTamanhosPizzas
        }else{
            return false
        }

    }catch(error){
        return false
    }
}

const insertTamanhoPizza = async function(tamanhoPizza){
    try {

        const {PrismaClient} = require('@prisma/client')

        const prisma = new PrismaClient()

        const sql = `insert into tbl_tamanho_pizza(tamanho)
                                values('${tamanhoPizza.tamanho}')`

        const rsTamanhoPizza = await prisma.$executeRawUnsafe(sql)


        if(rsTamanhoPizza){
            return true
        }else{
            return false
        }

        
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllTamanhosPizzas,
    insertTamanhoPizza
}