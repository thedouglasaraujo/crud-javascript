let contador = 0;
let botao = document.getElementById("alterar");
let search = document.querySelector('#busca');
nomes = ["Douglas Araújo Silva"];

function cadastrar(comando, id) {
    let nome = document.getElementById('nome').value;
    let curso = document.getElementById('curso').value;
    let periodo = document.getElementById('periodo').value;
    let faltas = document.getElementById('faltas').value;
    let notaum = document.getElementById('notaum').value;
    let notadois = document.getElementById('notadois').value;
    let media = (parseInt(notaum) + parseInt(notadois)) / 2;

    if (nome == "" || curso == "" || periodo == "" || faltas == "" || notaum == "" || notadois == "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (comando == "cadastro") {
        contador++;
        document.querySelector(`#lista-nomes`).innerHTML += `<tr id="cliente_${contador}">
        </tr>`
        id = contador;
        nomes.push(nome);
    }

    if (comando == "alterar") {
        document.querySelector('#botton-cad').innerHTML = `<button id="cadastrar_st" onclick='cadastrar("cadastro")'>Cadastrar</button> <br><br>`;
        let elemento = document.getElementById('sombra');
        elemento.style.boxShadow = '';
        nomes[id] = nome;
    }

    document.querySelector(`#cliente_${id}`).innerHTML = `
        <td id="nome_aluno">${nome}</td>    
        <td id="curso_aluno">${curso}</td>
        <td id="periodo_aluno">${periodo}º Período</td>
        <td id="faltas_aluno">${faltas}</td>
        <td id="notaum_aluno">${notaum}</td>
        <td id="notadois_aluno">${notadois}</td>
        <td id="media_aluno">${media}</td>
        <td id="situacao_aluno">${situacao(faltas, media)}</td>
        <td> <button id="alterar" onclick='formulario_alteracao(${id}, ${JSON.stringify(nome)})'><img src="images/editar.png"></button> </td>
        <td> <button id="excluir" onclick=excluir(${id})><img src="images/excluir.png"></button> </td>`

    limpar_inputs();
};

function formulario_alteracao(id, nome) {
    let elemento = document.getElementById('sombra');
    elemento.style.boxShadow = '0px 0px 26px #990202';
    document.getElementById('nome').value = nome;
    document.querySelector('#botton-cad').innerHTML = `<button id="alterar_st" onclick='cadastrar("alterar", ${id})'>Alterar</button>`;
};

function excluir(id) {
    document.querySelector(`#cliente_${id}`).innerHTML = ''
};

search.addEventListener('input', () => {
    const termoDeBusca = search.value;
    if (termoDeBusca.length > 0) {
        for (var i = -1; i <= nomes.length; i++) {
            if (termoDeBusca == nomes[i + 1].slice(0, termoDeBusca.length)) {
                let elemento = document.getElementById(`cliente_${i + 1}`);
                elemento.style.display = '';
            } else {
                let elemento = document.getElementById(`cliente_${i + 1}`);
                elemento.style.display = 'none';
            }
        }
    } else {
        for (var i = -1; i < nomes.length; i++) {
            let elemento = document.getElementById(`cliente_${i + 1}`);
            elemento.style.display = '';
        }
    }
});

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
});

function limpar_inputs() {
    document.getElementById('nome').value = '';
    document.getElementById('curso').value = '';
    document.getElementById('periodo').value = '';
    document.getElementById('notaum').value = '';
    document.getElementById('notadois').value = '';
    document.getElementById('faltas').value = '';
};

function situacao(faltas, media) {
    if (faltas > 18) {
        return 'Reprovado por falta';
    } else if (media < 7 && media > 3) {
        return 'Recuperação final';
    } else if (media < 3) {
        return 'Reprovado';
    } else {
        return 'Aprovado por média';
    }
};
