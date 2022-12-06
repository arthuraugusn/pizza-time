/* 

- OBJETIVO: Arquivo responsável pela manipulação de dados das bebidas com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 06/12/2022
- VERSÃO: 1.0

*/

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllBebidas = async function(){
    try {

        let sql = `select tbl_bebida.id as id_bebida, tbl_bebida.ml as mililitros_bebida, tbl_produto.nome as nome_bebida, tbl_produto.preco, tbl_produto.descricao, tbl_tamanho_bebida.tamanho as tamanho_bebida, tbl_tipo_bebida.tipo as tipo_bebida
                    from tbl_bebida
                        inner join tbl_tamanho_bebida on
                            tbl_tamanho_bebida.id = tbl_bebida.id_tamanho_bebida
                        inner join tbl_tipo_bebida on
                            tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida
                        inner join tbl_produto on
                            tbl_produto.id = tbl_bebida.id_produto
                        inner join tbl_pizzaria on
                            tbl_pizzaria.id = tbl_produto.id_pizzaria
                        inner join tbl_endereco_pizzaria on
                            tbl_endereco_pizzaria.id = tbl_pizzaria.id_endereco_pizzaria
                            
                    order by tbl_bebida.id desc`

        const rsBebidas = await prisma.$queryRawUnsafe(sql)

        if(rsBebidas.length > 0){
            return rsBebidas
        }
        
    } catch (error) {
        return false
    }
}

const insertBebida = async function(bebida){
    try {

        let sql = `insert into tbl_bebida(ml, id_produto, id_tamanho_bebida, id_tipo_bebida)
                    values(${bebida.ml}, ${bebida.id_produto}, ${bebida.id_tamanho_bebida}, ${bebida.id_tipo_bebida})`

        const rsBebida = await prisma.$executeRawUnsafe(sql)

        if(rsBebida){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteBebida = async function(id){
    try {

        let sql = `delete from tbl_bebida where id = ${id}`

        const rsBebida =await prisma.$queryRawUnsafe(sql)

        if(rsBebida){
            return true
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectByIdBebida = async function(id){
    try {

        let sql = `select tbl_bebida.id as id_bebida, tbl_bebida.ml as mililitros_bebida, tbl_produto.nome as nome_bebida, tbl_produto.preco, tbl_produto.descricao, tbl_tamanho_bebida.tamanho as tamanho_bebida, tbl_tipo_bebida.tipo as tipo_bebida
        from tbl_bebida
            inner join tbl_tamanho_bebida on
                tbl_tamanho_bebida.id = tbl_bebida.id_tamanho_bebida
            inner join tbl_tipo_bebida on
                tbl_tipo_bebida.id = tbl_bebida.id_tipo_bebida
            inner join tbl_produto on
                tbl_produto.id = tbl_bebida.id_produto
            inner join tbl_pizzaria on
                tbl_pizzaria.id = tbl_produto.id_pizzaria
            inner join tbl_endereco_pizzaria on
                tbl_endereco_pizzaria.id = tbl_pizzaria.id_endereco_pizzaria
            
            where tbl_bebida.id = ${id}    `

            console.log(sql)

        const rsBebida = await prisma.$queryRawUnsafe(sql)

        if(rsBebida.length>0){
            return rsBebida
        }else{
            return false
        }
        
    } catch (error) {
        return false
    }
}

const updateBebida = async function(bebida){
    try {
        let sql = `update tbl_bebida set ml = ${bebida.ml},id_produto = ${bebida.id_produto}, id_tamanho_bebida = ${bebida.id_tamanho_bebida}, id_tipo_bebida = ${bebida.id_tipo_bebida}  where id= ${bebida.id}`

        const rsBebida = await prisma.$executeRawUnsafe(sql)

        if(rsBebida){
            return true
        }else{
            return false
        }
    } catch (error) {
        return false    
    }
}

module.exports={
    selectAllBebidas,
    insertBebida,
    deleteBebida,
    selectByIdBebida,
    updateBebida
}