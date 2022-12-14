'use strict'

const getAllPizza = async()=>{
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

export{
    getAllPizza,
    getAllBebidas
}