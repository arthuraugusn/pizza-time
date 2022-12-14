'use strict'

import {getAllPizza, getAllBebidas} from './testeApi.js'

const pizzas = await getAllPizza()

const bebidas = await getAllBebidas()

const consumirArray = function (array) {

    const a = document.createElement('a')
    a.classList.add('link_forms')

    if(array.id_pizza){
        a.id = array.id_pizza
    }else if(array.id_bebida){
        a.id = array.id_bebida
    }

    const divPizza  =  document.createElement('div')
    divPizza.classList.add('caixa_produto')

    const nome = document.createElement('span')
    nome.classList.add('nome')
    if(array.nome_pizza){
        if(array.tamanho_pizza){
            nome.textContent = `1 ${array.nome_pizza}, ${array.tamanho_pizza}`
        }
    }else if(array.nome_bebida){
        if(array.tamanho_bebida){
            nome.textContent = `1 ${array.nome_bebida}, ${array.tamanho_bebida}`
        }
    }

    const img = document.createElement('img')
    img.classList.add('img-link')
    img.src = array.foto

    const preco = document.createElement('span')
    preco.textContent = `R$ ${array.preco}`
    preco.classList.add('preco')

    divPizza.appendChild(img)
    divPizza.appendChild(preco)
    divPizza.appendChild(nome)

    a.appendChild(divPizza)

    return a
}

const pesquisarPizzas = async () => {
    const galeriaPizzas = document.querySelector('.cardapio_div_pizzas')
    const tagPizzas = pizzas.pizzas.map(consumirArray)
    console.log(tagPizzas)
    galeriaPizzas.replaceChildren(...tagPizzas)
}

await pesquisarPizzas()

const pesquisarBebidas = async () => {
    const galeriaBebidas = document.querySelector('.cardapio_div_bebidas')
    const tagBebidas = bebidas.bebidas.map(consumirArray)
    console.log(tagBebidas)
    galeriaBebidas.replaceChildren(...tagBebidas)
}

await pesquisarBebidas()