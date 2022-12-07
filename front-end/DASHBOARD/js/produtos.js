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

    const divPizza  =  document.createElement('div')
    divPizza.classList.add('caixa_produto')

    const nome = document.createElement('span')
    if(array.nome_pizza){
        nome.textContent = array.nome_pizza
    }else if(array.nome_bebida){
        nome.textContent = array.nome_bebida
    }

    const img = document.createElement('img')
    img.src = array.foto

    const preco = document.createElement('span')
    preco.textContent = `R$ ${array.preco}`

    const tamanho = document.createElement('span')
    if(array.tamanho_pizza){
        tamanho.textContent = `Tamanho: ${array.tamanho_pizza}`
    }else if (array.tamanho_bebida){
        tamanho.textContent = `Tamanho: ${array.tamanho_bebida}`
    }
    divPizza.appendChild(img)
    divPizza.appendChild(preco)
    divPizza.appendChild(nome)
    divPizza.appendChild(tamanho)

    return divPizza
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

const selectTipoProduto = function(array){

    const optionPizzaBebida = document.createElement('option')

    if(array.tipo_pizza){
        optionPizzaBebida.textContent = array.tipo_pizza
    }else if(array.tipo_bebida){
        optionPizzaBebida.textContent = array.tipo_bebida
    }

    return optionPizzaBebida
}

selectCategoria(pizzas)
selectCategoria(bebidas)

const teste = async () => {
    const galeriaPizzas = document.getElementById('produto')
    const tagPizzas = pizzas.pizzas.map(selectTipoProduto)
    galeriaPizzas.replaceChildren(...tagPizzas)

    const galeriaBebidas = document.getElementById('produto')
    const tagBebidas = bebidas.bebidas.map(selectTipoProduto)
    galeriaBebidas.replaceChildren(...tagBebidas)
}

teste()

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

const pesquisar = async () => {
    const galeriaPizzas = document.querySelector('.pizzas')
    const tagPizzas = pizzas.pizzas.map(consumirArray)
    galeriaPizzas.replaceChildren(...tagPizzas)

    const galeriaBebidas = document.querySelector('.bebidas')
    const tagBebidas = bebidas.bebidas.map(consumirArray)
    galeriaBebidas.replaceChildren(...tagBebidas)
}

if(document.getElementById('categoria').value.toLowerCase() == 'pizzas' || document.getElementById('categoria').value.toLowerCase() == 'bebidas'){
    pesquisar()
}

document.getElementById('categoria').addEventListener('change', async (event)=>{
    if(event.target.value.toLowerCase() == 'pizzas'){
        await pesquisarPizzas()
        if(document.querySelector('.bebidas').classList.contains('bebidas')){
            document.querySelector('.bebidas').innerHTML = ''
        }
    }else if(event.target.value.toLowerCase() == 'bebidas'){
        await pesquisarBebidas()
    }
})