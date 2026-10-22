import { database } from "../firebaseConfig.js";

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
let idEmEdicao = null;
let favoritosRef = ref(database, "favoritos")
const lista = document.getElementById('listaFavoritos')



form.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const nome = nomeInput.value.trim();
    const filme = filmeInput.value.trim();

    if (!nome || !filme) {
        mensagem.textContent = "Preencha os dois campos!";
        return;
    }

    try {
        if (idEmEdicao) {
            const favoritoRef = ref(database, `favoritos/${idEmEdicao}`)

            await update(favoritoRef, {
                nome: nome,
                filme: filme
            });

            mensagem.textContent = "Filme atualizado"
            idEmEdicao = null
            btn.textContent = "Salvar"

        }
        else {

            const novoFavoritoRef = push(favoritosRef)

            await set(novoFavoritoRef, {
                nome: nome,
                filme: filme

            });

            mensagem.textContent = "filme favorito cadastrado!"
        }
        

        form.reset();


    } catch (erro) {

        console.error(erro)
        mensagem.textContent = "Erro ao salvar os dados."
    }

})

 onValue(favoritosRef, (snapshot) => {

        const dados = snapshot.val();

        lista.replaceChildren();

        if (!dados) {
            lista.textContent = "Nenhum filme cadastrado"
            return;
        }

        Object.entries(dados).forEach(([id, favorito]) => {

            const linha = document.createElement("div")
            linha.className = "favorito"

            const nomeElemento = document.createElement("span")
            nomeElemento.className = "dado"
            nomeElemento.textContent = favorito.nome

            const filmeElemento = document.createElement("span")
            filmeElemento.className = "dado"
            filmeElemento.textContent = favorito.filme



            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";

            btnEditar.addEventListener("click", () => {
                nomeInput.value = favorito.nome;
                filmeInput.value = favorito.filme;

                idEmEdicao = id;

                mensagem.textContent = "Editando favorito";
                btn.textContent = "Salvar alterações";

                nomeInput.focus();
            });

            const btnExcluir = document.createElement("button");
            btnExcluir.textContent = "Excluir"

            btnExcluir.addEventListener("click", async () => {
                const confirmar = confirm(
                    `Deseja realmente excluir ${favorito.filme}?`
                )
                if (!confirmar) {
                    return
                }

                try {
                    await remove(ref(database, `favoritos/${id}`))

                    if (idEmEdicao === id) {
                        idEmEdicao = null;
                        form.reset();
                        btn.textContent = "Salvar"
                    }

                    mensagem.textContent = "Filme favorito excluído"
                } catch (erro) {

                    console.error(erro);
                    mensagem.textContent = "Erro ao excluir o favorito"
                }
                
             
        })

        
            lista.append(
                nomeElemento,
                filmeElemento,
                btnEditar,
                btnExcluir
            )

            lista.appendChild(linha);
            });


    })
