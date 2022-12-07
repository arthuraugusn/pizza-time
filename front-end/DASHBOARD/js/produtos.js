/* 

- OBJETIVO: Arquivo responsável por consumir os produtos cadastrados pela pizzaria
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 07/11/2022
- VERSÃO: 1.0

*/

import {getAllPizzas} from "./Api.js"

const pizzas = await getAllPizzas()

const consumirArrayCharacters = function (arrayPizzas) {

    const divPizza  =  document.createElement('div')
    divPizza.classList.add('caixa_pizza')

    const nome = document.createElement('span')
    nome.textContent = arrayPizzas.nome_pizza

    const img = document.createElement('img')
    img.src = arrayPizzas.foto

    const preco = document.createElement('span')
    preco.textContent = arrayPizzas.preco

    const tamanho = document.createElement('span')
    tamanho.textContent = arrayPizzas.tamanho_pizza

    divPizza.appendChild(img)
    divPizza.appendChild(nome)
    divPizza.appendChild(preco)
    divPizza.appendChild(tamanho)

    return divPizza
}

const pesquisar = async () => {
    const galeria = document.querySelector('.pizza')
    const tagImg = pizzas.pizzas.map(consumirArrayCharacters)
    galeria.replaceChildren(...tagImg)
}

pesquisar()