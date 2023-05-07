let contador = 0
let botao = document.getElementById("alterar");
let search = document.querySelector('#busca');
nomes = ["Douglas Araújo Silva"]

function cadastrar() {
    let nome = document.getElementById('nome').value;
    let curso = document.getElementById('curso').value;
    let periodo = document.getElementById('periodo').value;
    let faltas = document.getElementById('faltas').value;
    let notaum = document.getElementById('notaum').value;
    let notadois = document.getElementById('notadois').value;
    let media = (parseInt(notaum) + parseInt(notadois))/2;
    if (nome == "" || curso == "" || periodo == "" || faltas == "" || notaum == "" || notadois == "") {
        alert("Preencha todos os campos!");
        return;
    }
    contador++;
    document.querySelector('#lista-nomes').innerHTML += `
    <tr id="cliente_${contador}">
        <td id="nome_aluno">${nome}</td>    
        <td id="curso_aluno">${curso}</td>
        <td id="periodo_aluno">${periodo}º Período</td>
        <td id="faltas_aluno">${faltas}</td>
        <td id="notaum_aluno">${notaum}</td>
        <td id="notadois_aluno">${notadois}</td>
        <td id="media_aluno">${media}</td>
        <td id="situacao_aluno">${situacao(faltas, media)}</td>
        <td> <button id="alterar" onclick=alterar(${contador})><img src="images/editar.png"></button> </td>
        <td> <button id="excluir" onclick=excluir(${contador})><img src="images/excluir.png"></button> </td>
    </tr>`
    nomes.push(nome);
    limpar_inputs();
}

function excluir(id) {
    document.querySelector(`#cliente_${id}`).innerHTML = ''
}

function alterar(id) {
    document.querySelector('.formulario_alteracao').innerHTML = `<div class="formulario">
    <label for="nome">Nome:</label>
    <input type="text" id="nome_alteracao" placeholder="Digite o seu nome" required value="${nomes[id]}"> <br><br>
    <label for="nome">Curso:</label>
    <select name="curso" id="curso_alteracao">
        <option value="Sistemas de Informação">Sistemas de Informação</option>
        <option value="Ciência da Computação">Ciência da Computação</option>
        <option value="Engenharia da Computação">Engenharia da Computação</option>
    </select>
    <div class="colocar_periodo">
        <label for="nome">Período:</label>
        <input id="periodo_alteracao" type="number" required max="10" min="1" />
    </div>
    <div class="colocar_notas">
        <label for="nome">1º Nota:</label>
        <input id="notaum_alteracao" type="number" required max="10" min="0" />
        <label for="nome">2º Nota:</label>
        <input id="notadois_alteracao" type="number" required max="10" min="0" />
        <label for="nome">Faltas:</label>
        <input id="faltas_alteracao" type="number" required max="72" min="0" />
    </div>
    <div class="botton-cad">
        <button class="cadastrar" onclick=alteracao(${id})>Confirmar a alteração</button>
    </div>
    </div>`
}

function alteracao(id) {
    nome_novo = document.getElementById('nome_alteracao').value;
    curso_novo = document.getElementById('curso_alteracao').value;
    periodo_novo = document.getElementById('periodo_alteracao').value;
    notaum_nova = document.getElementById('notaum_alteracao').value;
    notadois_nova = document.getElementById('notadois_alteracao').value;
    faltas_nova = document.getElementById('faltas_alteracao').value;
    media_nova = (parseInt(notaum_nova) + parseInt(notadois_nova))/2;
    document.querySelector(`#cliente_${id}`).innerHTML = `
    <tr id="cliente_${id}">
        <td>${nome_novo}</td>    
        <td>${curso_novo}</td>
        <td>${periodo_novo}º Período</td>
        <td id="faltas_aluno">${faltas_nova}</td>
        <td id="notaum_aluno">${notaum_nova}</td>
        <td id="notadois_aluno">${notadois_nova}</td>
        <td id="media_aluno">${media_nova}</td>
        <td id="situacao_aluno">${situacao(faltas_nova, media_nova)}</td>
        <td> <button id="alterar" onclick=alterar(${id})><img src="images/editar.png"></button> </td>
        <td> <button id="excluir" onclick=excluir(${id})><img src="images/excluir.png"></button> </td>
    </tr>`
    nomes[id] = nome_novo
    console.log(nomes)
    document.querySelector('.formulario_alteracao').innerHTML = ''
}

search.addEventListener('input', () => {
    const termoDeBusca = search.value;
    console.log(termoDeBusca)
    if (termoDeBusca.length > 0) {
      for (var i = -1; i <= nomes.length; i++) {
          if (termoDeBusca == nomes[i+1].slice(0, termoDeBusca.length)) {
              let elemento = document.getElementById(`cliente_${i+1}`);
              elemento.style.display = '';
          } else {
              let elemento = document.getElementById(`cliente_${i+1}`);
              elemento.style.display = 'none';
          }
        }
    } else { 
      for (var i = -1; i < nomes.length; i++) {
          let elemento = document.getElementById(`cliente_${i+1}`);
              elemento.style.display = '';
      }
    }
  });

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
});

function limpar_inputs() {
    document.getElementById('nome').value = '';
    document.getElementById('curso').value = '';
    document.getElementById('periodo').value = '';
}

function situacao(faltas, media) {
    if (faltas > 18) {
        return 'Reprovado por falta'
    } else if (media < 7) {
        return 'Recuperação final'
    } else {
        return 'Aprovado por média'
    }
}