var genericDeleteButton = "<td><button id='%IDNAME%'>Delete</button></td>"
var userId = 0;

onload = function() {
    var urlParams = window.location.href.split('/')    
    userId = urlParams[urlParams.length-1];

    // configura botoes adicionar
    document.getElementById('idAdicionar').addEventListener('click', adicionarMoeda);
    userId 
    // carrega moedas
    
    // configura botoes de deletar
    configuraBotoesDeletar();
}

function adicionarMoeda() {
    var table = document.getElementById("idCarteiraMoedas");
    var dictDataMoedaNova = getFormDataMoedaNova();
    var row = table.insertRow(table.length);
    row.id = dictDataMoedaNova.nome;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = dictDataMoedaNova.nome;
    cell2.innerHTML = dictDataMoedaNova.qtd;
    cell3.innerHTML = dictDataMoedaNova.valor;
    cell4.innerHTML = dictDataMoedaNova.deleteButton;
    configuraBotoesDeletar(dictDataMoedaNova);
    
    enviaMoedaParaBanco(dictDataMoedaNova);
}

function getFormDataMoedaNova() {
    var nome = document.getElementById('idMoedaNova').value;
    var moedaNovaDict = {
        'nome' : nome,
        'qtd'  : document.getElementById('idQuantidade').value,
        'valor':'x BRL',
        'deleteButton' : genericDeleteButton.replace('%IDNAME%','idDelete'+nome)
    };
    return moedaNovaDict;
}

function configuraBotoesDeletar() {
    var table = document.getElementById('idCarteiraMoedas');
    for (var i = 1, row; row = table.rows[i]; i++) {
        var nome = row.innerText.split('\t')[0];
        var botaoDelete = document.getElementById('idDelete'+nome);
        console.log(nome);
        botaoDelete.addEventListener('click',removeMoeda);
    }    
}

function removeMoeda(botao) {
    var nome = botao.target.id.replace('idDelete','');
    var table = document.getElementById('idCarteiraMoedas');
    var row = document.getElementById(nome);
    row.remove();
}

function enviaMoedaParaBanco(dictDataMoedaNova) {
    var formData = new FormData();
    formData.append('userId', userId);
    formData.append('nomeMoeda', dictDataMoedaNova.nome);
    formData.append('qtdMoeda', dictDataMoedaNova.qtd);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",
                 "/adicionamoeda/",
                 true);
    xmlhttp.setRequestHeader("X-CSRFToken", csrfcookie());
    xmlhttp.onreadystatechange = function () {
        var resposta= JSON.parse(xmlhttp.responseText);
        console.log(resposta);
    };
    xmlhttp.send(formData);
}

function csrfcookie() {
    var cookieValue = null,
        name = 'csrftoken';
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};
