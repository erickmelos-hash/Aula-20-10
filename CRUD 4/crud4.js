import { database as db} from "../firebaseConfig.js";

import {
    ref,
    push,
    set,
    onValue,
    update,
    remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const tarefasRef = ref(db, "tarefas")

const form = document.getElementById('form')
const inputTitulo = document.getElementById('tarefa')
const btnSalvar = document.getElementById('btnSalvar')
const lista = document.getElementById('lista')

let editandoId = null


async function criar(titulo) {
    const novaRef = push(tarefasRef)

    await set(novaRef, {
        titulo: titulo,
        concluida: false,
        criadaEm: Date.now()
    })
}

onValue(tarefasRef, (snapshot) => {
    lista.innerHTML = '';

    if(!snapshot.exists()) return

    snapshot.forEach((filho) => {
        const id = filho.key
        const tarefa = filho.val();

        const li = document.createElement('li');

        const texto = document.createElement('span');

        texto.textContent = tarefa.titulo;

        if(tarefa.concluida){
            texto.style.textDecoration = 'line-through';
        }

        const btnConcluir = document.createElement('button');
        btnConcluir.textContent = tarefa.concluida ? "Desfazer" : "Concluir"
        btnConcluir.onclick = () => alternarConcluida(id, tarefa.concluida)

        const btnEditar = document.createElement('button')
        btnEditar.textContent = "Editar"
        btnEditar.onclick = () => iniciarEdicao(id, tarefa.titulo)

        const btnExcluir = document.createElement('button')
        btnExcluir.textContent = "Excluir";
        btnExcluir.onclick = () => excluir(id);

        li.append(texto, btnConcluir, btnEditar, btnExcluir)

        lista.appendChild(li)
    })
})

function iniciarEdicao(id, tituloAtual){
    inputTitulo.value = tituloAtual
    editandoId = id;
    btnSalvar.textContent = "Salvar"
    inputTitulo.focus();
}

async function atualizar(id, novoTitulo) {
    await update(ref(db, `tarefas/${id}`), {titulo: novoTitulo})
}

async function alternarConcluida(id, concluidaAtual) {
    await update(ref(db, `tarefas/${id}`), {concluida: concluidaAtual})
    concluida: !concluidaAtual
}

async function excluir(id) {
    await remove(ref(db, `tarefas/${id}`))
}

form.addEventListener("submit", async (evento) =>{
    evento.preventDefault()

    const titulo = inputTitulo.value.trim()

    if(!titulo) return
    
    if(editandoId===null){
        await criar (titulo)
    } else{
        await atualizar(editandoId, titulo)
    }

})

