/* 

- OBJETIVO: Arquivo responsável por consumir a API da pizzaria
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 07/11/2022
- VERSÃO: 1.0

*/

'use strict'

const getAllPizzas = async()=>{

    const url = 'http://localhost:8080/v1/produtos/pizzas'

    const response = await fetch(url)

    const pizzas = response.json()
    
    return pizzas
}

const getAllBebidas = async()=>{

    const url = 'http://localhost:8080/v1/produtos/bebidas'

    const response = await fetch(url)

    const bebidas = response.json()
    
    return bebidas
}

const getAllProdutos = async()=>{

    const url = 'http://localhost:8080/v1/produtos'

    const response = await fetch(url)

    const produtos = response.json()
    
    return produtos
}

const getAllTamanhosPizzas = async()=>{

    const url = 'http://localhost:8080/v1/produtos/pizza/tamanhos'

    const response = await fetch(url)

    const tamanhoPizza = response.json()
    
    return tamanhoPizza
}

const getAllTiposPizzas = async()=>{

    const url = 'http://localhost:8080/v1/produtos/pizza/tipos'

    const response = await fetch(url)

    const tipoPizza = response.json()
    
    return tipoPizza
}

const getAllTamanhosBebidas = async()=>{

    const url = 'http://localhost:8080/v1/produtos/bebida/tamanhos'

    const response = await fetch(url)

    const tamanhoBebida = response.json()
    
    return tamanhoBebida
}

const getAllTiposBebidas = async()=>{

    const url = 'http://localhost:8080/v1/produtos/bebida/tipos'

    const response = await fetch(url)

    const tipoBebida = response.json()
    
    return tipoBebida
}

const insertProduto = async(preco, foto, nome, descricao)=>{
    let status

    const url = `http://localhost:8080/v1/produto`

    const produto = {
        preco: preco,
        foto: foto, 
        nome: nome,
        descricao: descricao
    }

    const init = {
        method: 'POST',
        headers: {
            "content-type": 'application/json',
        },
        body: JSON.stringify(produto)
    }

    const response = await fetch(url, init)

    if(response){
        status = true
    }else{
        status = false
    }

    return status
}

const insertPizza = async(idTipoPizza, idTamanhoPizza)=>{
    let status

    const url = `http://localhost:8080/v1/produto/pizza`

    const pizza = {
        id_tipo_pizza: idTipoPizza,
        id_tamanho_pizza: idTamanhoPizza
    }

    const init = {
        method: 'POST',
        headers: {
            "content-type": 'application/json',
        },
        body: JSON.stringify(pizza)
    }

    const response = await fetch(url, init)

    if(response){
        status = true
    }else{
        status = false
    }

    return status
}

const insertBebida = async(idTipoBebida, idTamanhoBebida, mlBebida)=>{
    let status

    const url = `http://localhost:8080/v1/produto/bebida`

    const bebida = {
        id_tipo_bebida: idTipoBebida,
        id_tamanho_bebida: idTamanhoBebida,
        ml: mlBebida
    }

    const init = {
        method: 'POST',
        headers: {
            "content-type": 'application/json',
        },
        body: JSON.stringify(bebida)
    }

    const response = await fetch(url, init)

    if(response){
        status = true
    }else{
        status = false
    }

    return status
}

const insertUser = async(nome, senha, login, email, nivelPermissao)=>{
    let status

    const url = `http://localhost:8080/v1/pizzaria/admin/usuario`

    const user = {
        nome: nome,
        senha: senha,
        login: login,
        email: email,
        nivel_permissao: nivelPermissao
    }

    const init = {
        method: 'POST',
        headers: {
            "content-type": 'application/json',
        },
        body: JSON.stringify(user)
    }

    const response = await fetch(url, init)

    if(response){
        status = true
    }else{
        status = false
    }

    return status
}

const deletarPizza = async(idPizza)=>{
    const url = `http://localhost:8080/v1/produto/pizza/${idPizza}`

    const init = {
        method: 'DELETE'
    }

    const response = await fetch(url, init)

    const result = response.json()

    return result
}

const deletarBebida = async(idBebida)=>{
    const url = `http://localhost:8080/v1/produto/bebida/${idBebida}`

    const init = {
        method: 'DELETE'
    }

    const response = await fetch(url, init)

    const result = response.json()

    return result
}

const autenticateUser = async(login, senha)=>{
    const url = 'http://localhost:8080/v1/pizzaria/admin/usuario/autentica'

    const user = {
        "login": login,
        "senha": senha
    }

    const init = {
        method: 'POST',
        headers: {
            "content-type": 'application/json',
        },
        body: JSON.stringify(user)
    }

    const response = await fetch(url, init)

    const usuarioAutenticado = response.json()

    return usuarioAutenticado
}

export{
    getAllBebidas,
    getAllPizzas,
    insertProduto,
    insertPizza,
    getAllTamanhosPizzas,
    getAllTiposPizzas,
    insertBebida,
    getAllTamanhosBebidas,
    getAllTiposBebidas,
    deletarPizza,
    deletarBebida,
    autenticateUser,
    insertUser
}