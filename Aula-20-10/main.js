import { database } from "./firebaseConfig.js";

import {
    ref,
    push,
    set,
    onValue,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";



const mensagem = document.getElementById('mensagem')
const form = document.getElementById('formFav')
const nomeInput = document.getElementById('nome')
const filmeInput = document.getElementById('filme')
const btn = document.getElementById('salvar')
const btnR = document.getElementById('remover')
let idEmEdicao = null;


form.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const nome = nomeInput.value.trim();
    const filme = filmeInput.value.trim();

    if(!nome|| !filme){
        mensagem.textContent = "Preencha os dois campos!";
        return;
    }
    const favoritosRef = ref(database, "favoritos")

    const novoFavoritoRef = push(favoritosRef)

    await set(novoFavoritoRef, {
        nome: nome,
        filme: filme
    });

    mensagem.textContent = "filme favorito cadastrado!"

    form.reset();

    const lista = document.getElementById('listaFavoritos')

    onValue(favoritosRef, (snapshot) => {

        const dados = snapshot.val();

        lista.replaceChildren();

        if(!dados){
            lista.textContent = "Nenhum filme cadastrado"
            return;
        }

        Object.entries(dados).forEach(([id, favorito]) =>{
            
            const linha = document.createElement("div")
            linha.className = "favorito"

            const nomeElemento = document.createElement("span")
            nomeElemento.className = "dado"
            nomeElemento.textContent = favorito.nome

            const filmeElemento = document.createElement("span")
            filmeElemento.className = "dado"
            filmeElemento.textContent = favorito.filme

            lista.append(nomeElemento, filmeElemento);

            lista.appendChild(linha);

            const btnEditar = document.createElement("button");

            btnEditar.textContent = "Editar"

            btnEditar.addEventListener("click", () =>{
                nomeInput.value = favorito.nome
                filmeInput.value = favorito.filme

                idEmEdicao = id;

                mensagem.textContent = "Editando os favoritos"

                document.getElementById("btnSalvar").textContent = "Salvar alterações"

            })
        })
})
});


