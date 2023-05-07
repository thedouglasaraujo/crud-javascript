contador = 0
var botao = document.getElementById("alterar");
var search = document.querySelector('#busca');
nomes = ["Douglas Araújo Silva"]

function cadastrar() {
    nome = document.getElementById('nome').value;
    curso = document.getElementById('curso').value;
    periodo = document.getElementById('periodo').value;
    if (nome == "" || curso == "" || periodo == "") {
        alert("Preencha todos os campos!");
        return;
    }
    contador++;
    document.querySelector('#lista-nomes').innerHTML += `
    <tr id="cliente_${contador}">
        <td id="nome_aluno">${nome}</td>    
        <td id="curso_aluno">${curso}</td>
        <td id="periodo_aluno">${periodo}</td>
        <td> <button id="alterar" onclick=alterar(${contador})><img src="images/editar.png"></button> </td>
        <td> <button id="excluir" onclick=excluir(${contador})><img src="images/excluir.png"></button> </td>
    </tr>`
    nomes.push(nome)
}

function excluir(id) {
    document.querySelector(`#cliente_${id}`).innerHTML = ''
}

function alterar(id) {
    document.querySelector('.formulario_alteracao').innerHTML = `<div class="formulario">
    <label for="nome">Nome:</label>
    <input type="text" id="nome_alteracao" placeholder="Digite o seu nome" required value="${nomes[id]}"> <br><br>
    <label for="nome">Curso:</label>
    <input type="text" id="curso_alteracao" placeholder="Digite o seu curso" required> <br><br>
    <label for="nome">Período:</label>
    <input type="text" id="periodo_alteracao" placeholder="Digite o seu período" required> <br><br>
    </div>
    <button class="cadastrar" onclick=alteracao(${id})>Confirmar a alteração</button>`
}

function alteracao(id) {
    nome_novo = document.getElementById('nome_alteracao').value;
    curso_novo = document.getElementById('curso_alteracao').value;
    periodo_novo = document.getElementById('periodo_alteracao').value;
    console.log(nome_novo)
    document.querySelector(`#cliente_${id}`).innerHTML = `
    <tr id="cliente_${id}">
        <td>${nome_novo}</td>    
        <td>${curso_novo}</td>
        <td>${periodo_novo}</td>
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
      for (var i = 0; i <= nomes.length; i++) {
          if (termoDeBusca == nomes[i+1].slice(0, termoDeBusca.length)) {
              console.log("SIm")
              let elemento = document.getElementById(`cliente_${i+1}`);
              elemento.style.display = '';
          } else {
              let elemento = document.getElementById(`cliente_${i+1}`);
              elemento.style.display = 'none';
          }
        }
    } else { 
      for (var i = 0; i < nomes.length; i++) {
          let elemento = document.getElementById(`cliente_${i+1}`);
              elemento.style.display = '';
      }
    }
  });

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
});