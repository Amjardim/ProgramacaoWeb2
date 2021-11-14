var genericDeleteButton = "<td><button id='%IDDELETE%'>Delete</button></td>"
var genericEditButton = "<td><button id='%IDEDIT%'>Edit</button></td>"
var userId = 0;

onload = function() {
    var urlParams = window.location.href.split('/')    
    userId = urlParams[urlParams.length-1];
    carregaPaginaInicial(userId);

    // configura botoes adicionar
    document.getElementById('idAdicionar').addEventListener('click', adicionarMoedaNova);
    userId 
    // carrega moedas
    
}

function carregaPaginaInicial(userId) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",
                 "/carteira/"+userId,
                 true);
    xmlhttp.setRequestHeader("X-CSRFToken", csrfcookie());
    xmlhttp.onreadystatechange = function () {
        var resposta= JSON.parse(xmlhttp.responseText);
        if( (resposta.encontrouProblema == false) &&
            (xmlhttp.status == 200) &&
            (xmlhttp.readyState == 4) ) {
            
            document.getElementById('idTituloPaginaInicial').innerHTML = document.getElementById('idTituloPaginaInicial').innerHTML + resposta.username;
            carregaTabelaCarteira(resposta.moedas);
        }
    };
    xmlhttp.send();
}

function carregaTabelaCarteira(moedas) {
    for( moeda in moedas ) {
        moeda = moedas[moeda]
        var dictDataMoeda = {
            'nome' : moeda.nome,
            'qtd'  : moeda.quantidade, 
            'valor':'x BRL',
            'deleteButton' : genericDeleteButton.replace('%IDDELETE%','idDelete'+moeda.nome),
            'editButton' : genericEditButton.replace('%IDEDIT%','idEdit'+moeda.nome)
        };
        adicionaMoedaTabela(dictDataMoeda);
    }
}

function adicionaMoedaTabela(dictMoeda) {
    var table = document.getElementById("idCarteiraMoedas");
    var row = table.insertRow(table.length);
    row.id = dictMoeda.nome;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = dictMoeda.nome;
    cell2.innerHTML = dictMoeda.qtd;
    cell2.id = 'IdQtd' + dictMoeda.nome;
    cell3.innerHTML = dictMoeda.valor;
    cell4.innerHTML = dictMoeda.deleteButton;
    cell5.innerHTML = dictMoeda.editButton;
    configuraBotoesDeletar(dictMoeda);
    configuraBotoesEdit(dictMoeda);
}

function adicionarMoedaNova() {
    var dictDataMoedaNova = getFormDataMoedaNova();
    console.log(dictDataMoedaNova);
    adicionaMoedaTabela(dictDataMoedaNova);
    enviaMoedaParaBanco(dictDataMoedaNova);
}

function getFormDataMoedaNova() {
    var nome = document.getElementById('idMoedaNova').value;
    var moedaNovaDict = {
        'nome' : nome,
        'qtd'  : document.getElementById('idQuantidade').value,
        'valor':'x BRL',
        'deleteButton' : genericDeleteButton.replace('%IDDELETE%','idDelete'+nome),
        'editButton' : genericEditButton.replace('%IDEDIT%','idEdit'+nome)
    };
    return moedaNovaDict;
}

function configuraBotoesDeletar() {
    var table = document.getElementById('idCarteiraMoedas');
    for (var i = 1, row; row = table.rows[i]; i++) {
        var nome = row.innerText.split('\t')[0];
        var botaoDelete = document.getElementById('idDelete'+nome);
        botaoDelete.addEventListener('click',removeMoeda);
    }    
}

function configuraBotoesEdit() {
    var table = document.getElementById('idCarteiraMoedas');
    for (var i = 1, row; row = table.rows[i]; i++) {
        var nome = row.innerText.split('\t')[0];
        var botaoEdit = document.getElementById('idEdit'+nome);
        botaoEdit.addEventListener('click',editaMoeda);
        //botaoEdit.addEventListener('click',confirmaEdicao);
    }    
}

function editaMoeda(botao) {
    //Edita Moeda na Tabela
    botao.target.innerText = 'OK';
    var nome = botao.target.id.replace('idEdit','');
    cell = document.getElementById('IdQtd' + nome);
    valor = cell.innerText;
    cell.innerHTML = '<input type="text" value='+valor+'></input>';
    
}

function confirmaEdicao(){
   //Edita Moeda no Banco
   var nome = botao.target.id.replace('idEdit','');
    var row = document.getElementById(nome);
    cell = row.getElementById('IdQtd' + nome);
    valor = cell.value;
    cell.innerHTML.replace('<input type="text">'+valor+'</input>',valor); 
    //editaMoedaNoBanco(dictDataMoedaRemover); 
}

function getFormDataMoedaRemoverEditar(botao) {

    var nome = botao.target.id.replace('idDelete','');
    var row = document.getElementById(nome);
    var cells = row.getElementsByTagName("td");
    var moedaRemoveDict = {
        'nome' : cells[0].innerHTML,
        'qtd'  : cells[1].innerHTML,
        'valor': cells[2].innerHTML,
        'deleteButton' : genericDeleteButton.replace('%IDDELETE%','idDelete'+nome),
        'editButton' : genericEditButton.replace('%IDEDIT%','idEdit'+nome)
    };
    return moedaRemoveDict;
}

function editaMoedaNoBanco(dictDataMoedaRemover) {
    var formData = new FormData();
    formData.append('userId', userId);
    formData.append('nomeMoeda', dictDataMoedaRemover.nome);
    formData.append('qtdMoeda', dictDataMoedaRemover.qtd);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",
                 "/editamoeda/",
                 true);
    xmlhttp.setRequestHeader("X-CSRFToken", csrfcookie());
    xmlhttp.onreadystatechange = function () {
        var resposta= JSON.parse(xmlhttp.responseText);
    };
    xmlhttp.send(formData);
}

function removeMoeda(botao) {

    var dictDataMoedaRemover = getFormDataMoedaRemoverEditar(botao);
    console.log(dictDataMoedaRemover);
    //Remove Moeda da Tabela
    var nome = botao.target.id.replace('idDelete','');
    var row = document.getElementById(nome);
    row.remove();
    //Remove Moeda do Banco 
    removeMoedaDoBanco(dictDataMoedaRemover);
}

function removeMoedaDoBanco(dictDataMoedaRemover) {
    var formData = new FormData();
    formData.append('userId', userId);
    formData.append('nomeMoeda', dictDataMoedaRemover.nome);
    formData.append('qtdMoeda', dictDataMoedaRemover.qtd);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",
                 "/removemoeda/",
                 true);
    xmlhttp.setRequestHeader("X-CSRFToken", csrfcookie());
    xmlhttp.onreadystatechange = function () {
        var resposta= JSON.parse(xmlhttp.responseText);
    };
    xmlhttp.send(formData);
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
