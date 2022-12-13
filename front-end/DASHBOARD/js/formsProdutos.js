/* 

- OBJETIVO: Arquivo responsável por cadastrar os novos produtos da pizzaria
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 13/12/2022
- VERSÃO: 1.0

*/

let teste= {
    "preco": 5,
    "foto": "https://www.bing.com/th?id=OIP.AAPyR4sX5b7GmjjdRMlTAAHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    "nome": "Suco de uva",
    "descricao": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
}

import {getAllPizzas, getAllBebidas, insertProduto} from "./Api.js"

const pizzas = await getAllPizzas()

/* console.log(await insertProduto(teste.preco, teste.foto, teste.nome, teste.descricao)) */

const selectTipo = function(array){

    const option = document.createElement('option')

    option.textContent = array.tipo_pizza
    option.id = array.id_pizza

    return option
}

const pesquisa = async()=>{
    const g = document.getElementById('tipo')
    const t = pizzas.pizzas.map(selectTipo)
    g.replaceChildren(...t)
}

await pesquisa()

document.getElementById('tipo').addEventListener('change', (item)=>{
    console.log(item.target.value)
})