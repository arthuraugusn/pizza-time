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

export{
    getAllPizzas
}