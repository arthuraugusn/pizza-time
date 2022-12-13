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

const getAllTamanhosBebidas = async()=>{

    const url = 'http://localhost:8080/v1/produtos/bebida/tamanhos'

    const response = await fetch(url)

    const tamanhoBebida = response.json()
    
    return tamanhoBebida
}

const getAllTiposPizzas = async()=>{

    const url = 'http://localhost:8080/v1/produto/pizza/tipo'

    const response = await fetch(url)

    const tipoPizza = response.json()
    
    return tipoPizza
}

const getAllTiposBebidas = async()=>{

    const url = 'http://localhost:8080/v1/produto/bebida/tipo'

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

export{
    getAllBebidas,
    getAllPizzas,
    insertProduto
}