/* 

- OBJETIVO: Arquivo responsável por cadastrar os novos produtos da pizzaria
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 13/12/2022
- VERSÃO: 1.0

*/

'use strict'

import {getAllPizzas, getAllBebidas, insertProduto, insertPizza,insertBebida, getAllTiposPizzas, getAllTamanhosPizzas, getAllTamanhosBebidas, getAllTiposBebidas} from "./Api.js"

const pizzas = await getAllPizzas()
const bebidas = await getAllBebidas()
const tipoP = await getAllTiposPizzas()
const tipoB = await getAllTiposBebidas()
const tamanhoP = await getAllTamanhosPizzas()
const tamanhoB = await getAllTamanhosBebidas()

const selectTipoBebidaPizza =async function(array){
    const option = document.createElement('option')

    const select = document.getElementById('tipo-pizza-bebida')

    if(array.pizzas){
        option.textContent = 'Pizzas'
    }else if(array.bebidas){
        option.textContent = 'Bebidas'
    }

    select.appendChild(option)

    return select
}

selectTipoBebidaPizza(pizzas)
selectTipoBebidaPizza(bebidas)

const selectTamanho = function(array){

    const option = document.createElement('option')
    option.classList.add('option_tipo')
    option.id = array.id

    option.textContent = array.tamanho

    return option
}

const pesquisaTamanhoBebidas = async()=>{
    const options = document.getElementById('tamanho')
    const tamanhos = tamanhoB.tamanhos_bebidas.map(selectTamanho)
    options.replaceChildren(...tamanhos)
}

const pesquisaTamanhoPizzas = async()=>{
    const options = document.getElementById('tamanho')
    const tamanhos = tamanhoP.tamanhos_pizzas.map(selectTamanho)
    options.replaceChildren(...tamanhos)
}

const selectTipo = function(array){

    const option = document.createElement('option')
    option.classList.add('option_tipo')
    option.id = array.id

    option.textContent = array.tipo

    return option
}

const pesquisaTiposPizzas = async()=>{
    const options = document.getElementById('tipo')
    const tipos = tipoP.tipos_pizzas.map(selectTipo)
    options.replaceChildren(...tipos)
}

const pesquisaTiposBebidas = async()=>{
    const options = document.getElementById('tipo')
    const tipos = tipoB.tipos_bebidas.map(selectTipo)
    options.replaceChildren(...tipos)
}

await pesquisaTamanhoPizzas()
await pesquisaTiposPizzas()

document.getElementById('tipo-pizza-bebida').addEventListener('change', async(event)=>{
    if(event.target.value == 'Pizzas'){
        await pesquisaTamanhoPizzas()
        await pesquisaTiposPizzas()
    }else if(event.target.value == 'Bebidas'){
        await pesquisaTamanhoBebidas()
        await pesquisaTiposBebidas()
    }
})


const saveJson=(preco, foto, nome, descricao)=>{
    let json = {
        "preco": preco,
        "foto": foto,
        "nome": nome,
        "descricao": descricao
    }

    return json
}

const saveJsonPizza = (idTipo, idTamanho)=>{
    let json={
        "id_tipo_pizza": idTipo,
        "id_tamanho_pizza": idTamanho
    }
    return json
}

const saveJsonBebida = (idTipo, idTamanho, ml)=>{
    let json={
        "id_tipo_bebida": idTipo,
        "id_tamanho_bebida": idTamanho,
        "ml": ml
    }
    return json
}

document.querySelector('.button_save').addEventListener('click', async ()=>{
    if(document.getElementById('tipo-pizza-bebida').value == 'Pizzas'){
        const tipoOption = document.getElementById('tipo')
        const idTipoPizza = tipoOption.options[tipoOption.selectedIndex].id

        const tamanhoOption = document.getElementById('tamanho')
        const idTamanhoPizza = tamanhoOption.options[tamanhoOption.selectedIndex].id


        let jsonProduto = saveJson(document.querySelector('.campo_preco').value,"https://www.bing.com/th?id=OIP.AAPyR4sX5b7GmjjdRMlTAAHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2", document.querySelector('.campo_nome').value,  document.querySelector('.campo_descricao').value)
        await insertProduto(jsonProduto.preco, jsonProduto.foto, jsonProduto.nome, jsonProduto.descricao)

        let jsonPizza = saveJsonPizza(idTipoPizza, idTamanhoPizza)
        await insertPizza(jsonPizza.id_tipo_pizza, jsonPizza.id_tamanho_pizza)

        window.location = "./produtos.html"
    }else if(document.getElementById('tipo-pizza-bebida').value == 'Bebidas'){
        const tipoOption = document.getElementById('tipo')
        const idTipoBebida = tipoOption.options[tipoOption.selectedIndex].id

        const tamanhoOption = document.getElementById('tamanho')
        const idTamanhoBebida = tamanhoOption.options[tamanhoOption.selectedIndex].id

        let jsonProduto = saveJson(document.querySelector('.campo_preco').value,"https://www.bing.com/th?id=OIP.AAPyR4sX5b7GmjjdRMlTAAHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2", document.querySelector('.campo_nome').value,  document.querySelector('.campo_descricao').value)
        await insertProduto(jsonProduto.preco, jsonProduto.foto, jsonProduto.nome, jsonProduto.descricao)

        let jsonBebida = saveJsonBebida(idTipoBebida, idTamanhoBebida, 500)
        await insertBebida(jsonBebida.id_tipo_bebida, jsonBebida.id_tamanho_bebida, jsonBebida.ml)

        window.location = "./produtos.html"
    }
})