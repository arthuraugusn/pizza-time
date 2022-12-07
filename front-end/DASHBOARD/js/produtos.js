/* 

- OBJETIVO: Arquivo responsável por consumir os produtos cadastrados pela pizzaria
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 07/11/2022
- VERSÃO: 1.0

*/

import {getAllPizzas, getAllBebidas} from "./Api.js"

const pizzas = await getAllPizzas()

const bebidas = await getAllBebidas()

const consumirArray = function (array) {

    const a = document.createElement('a')
    a.classList.add('link_forms')
    a.href = "../index/forms.html"

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

const selectCategoria = function(array){
    const selectCategoria = document.getElementById('categoria')

    const optionPizzaBebida = document.createElement('option')

    if(array.pizzas){
        optionPizzaBebida.textContent = 'Pizzas'
        optionPizzaBebida.classList.add('pizza_filtro')
    }else if(array.bebidas){
        optionPizzaBebida.textContent = 'Bebidas'
        optionPizzaBebida.classList.add('bebida_filtro')
    }

    selectCategoria.appendChild(optionPizzaBebida)

    return selectCategoria
}

selectCategoria(pizzas)
selectCategoria(bebidas)

const pesquisarPizzas = async () => {
    const galeriaPizzas = document.querySelector('.pizzas')
    const tagPizzas = pizzas.pizzas.map(consumirArray)
    galeriaPizzas.replaceChildren(...tagPizzas)
}

const pesquisarBebidas = async () => {
    const galeriaBebidas = document.querySelector('.pizzas')
    const tagBebidas = bebidas.bebidas.map(consumirArray)
    galeriaBebidas.replaceChildren(...tagBebidas)
}

if(document.getElementById('categoria').value.toLowerCase() == 'pizzas'){
    pesquisarPizzas()
}

document.getElementById('categoria').addEventListener('change', async (event)=>{
    if(event.target.value.toLowerCase() == 'bebidas'){
        pesquisarBebidas()
    }
    if(event.target.value.toLowerCase() == 'pizzas'){
        pesquisarPizzas()
    }
})