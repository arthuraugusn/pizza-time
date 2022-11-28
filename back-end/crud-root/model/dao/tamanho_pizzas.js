/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados dos tamanhos das pizzas com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 28/11/2022
- VERSÃO: 1.0

*/

const selectAllTamanhos = async function(){
    try {

        const{PrismaClient} = require('@prisma/client')
        const prisma = new PrismaClient()

        const sql = `select * from tbl_tamanho_pizza`

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

        const {PrismaClient} = require('@prisma/client')

        const prisma = new PrismaClient()

        const sql = `insert into tbl_tamanho_pizza(tamanho)
                                    values('${nomeTamanho.tamanho}')`

        console.log(sql)

        const rsTamanho = prisma.$executeRawUnsafe(sql)

        if(rsTamanho){
            return rsTamanho
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

module.exports={
    selectAllTamanhos,
    insertTamanho
}