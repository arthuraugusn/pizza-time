'use strict'

import {autenticateUser} from "./Api.js"

const jsonLogin = (login,senha)=>{
    const json = {
        "login": login,
        "senha": senha
    }

    return json
}

document.querySelector('.button_link').addEventListener('click', async(event)=>{
    const login = document.querySelector('.campo_usuario').value

    const senha = document.querySelector('.campo_senha').value


    let json = jsonLogin(login, senha)

    let teste = await autenticateUser(json.login, json.senha)

    if(teste[0].id>0){
        window.location = "../index/cadastro.html"
    }else{
        alert('Login ou senha incorretos')
    }
})