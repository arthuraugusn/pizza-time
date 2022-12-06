'use strict'

const getAllPizza = async()=>{
    const url = 'http://localhost:8080/v1/produto/pizza/3'

    const response = await fetch(url)

    const pizzas = response.json()

    return pizzas
}

export{
    getAllPizza
}