'use strict'

import {insertUser} from "./Api.js"

const jsonUser = (nome, email, login, senha)=>{
    const json={
        "nome": nome,
        "email": email,
        "login": login,
        "senha": senha,
        "nivel_permissao": 1
    }

    return json
}

const postUser = ()=>{
    const nome = document.querySelector('.campo_nome').value

    const email = document.querySelector('.campo_email').value

    const login = document.querySelector('.campo_usuario').value

    const senha = document.querySelector('.campo_senha').value

    return jsonUser(nome, email, login, senha)
}

document.getElementById('button').addEventListener('click', async()=>{
    console.log('aa')
    await insertUser(postUser().nome, postUser().senha, postUser().login, postUser().email, postUser().nivel_permissao)
})