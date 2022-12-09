/* 

- OBJETIVO: Arquivo responsável pela manipulação de usuários com o Banco de Dados. Insert, Update, Delete e Select
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 05/12/2022
- VERSÃO: 1.0

*/

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllUsuarios = async function(){
    try {

        let sql = `select * from tbl_usuario order by id desc`

        const rsUsuarios = await prisma.$queryRawUnsafe(sql)

        if(rsUsuarios.length > 0){
            return rsUsuarios
        }
        
    } catch (error) {
        return false
    }
}

const insertUsuario = async function(usuario){
    try {

        let sql = `insert into tbl_usuario(nome, login, senha, nivel_permissao, id_pizzaria)
                    values('${usuario.nome}', md5('${usuario.login}'), md5('${usuario.senha}'), ${usuario.nivel_permissao}, 1)`

        const rsUsuario = await prisma.$executeRawUnsafe(sql)

        if(rsUsuario){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}

const deleteUsuario = async function(id){
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

const selectByIdUsuario = async function(id){
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

const updateUsuario = async function(tamanho){
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

const autenticateUserLoginEmail = async function(usuario){
}

module.exports={
    insertUsuario,
    deleteUsuario,
    selectByIdUsuario,
    updateUsuario,
    autenticateUserLoginEmail
}