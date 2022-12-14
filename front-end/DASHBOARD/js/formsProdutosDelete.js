/* 

- OBJETIVO: Arquivo responsável por deletar os produtos da pizzaria
- AUTOR: Arthur Augusto da Silva Nunes, Milena Araújo
- DATA DE CRIAÇÃO: 13/12/2022
- VERSÃO: 1.0

*/

'use strict'

import {deletarPizza, deletarBebida} from "./Api.js"

const idPizza = localStorage.getItem("idPizza")

const idBebida = localStorage.getItem("idBebida")

document.querySelector('.button_delete').addEventListener('click', async()=>{
    if(idPizza){
        await deletarPizza(idPizza)
        localStorage.clear()
    }else if(idBebida){
        await deletarBebida(idBebida)
        localStorage.clear()
    }
})