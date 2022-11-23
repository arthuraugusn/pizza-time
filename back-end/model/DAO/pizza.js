/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados das pizzas com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 23/11/2022
- VERSÃO: 1.0

*/

const insertPizza = async function(pizza){
    try {

        const {PrismaClient} = require('@prisma/client')

        const prisma = new PrismaClient()

        const sql = `insert into tbl_pizza(id_tipo_pizza, id_tamanho_pizza, id_produto)`
        
    } catch (error) {
        return false
    }
}