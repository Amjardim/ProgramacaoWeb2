var genericDeleteButton = "<td><button id='%IDDELETE%'>Delete</button></td>"
var genericEditButton = "<td><button id='%IDEDIT%'>Edit</button></td>"
var tituloPaginaInicial = "Crypto Wallet - "

var userId = 0;
var moedaConversaoCarregamento = "";

onload = function() {
    var urlParams = window.location.href.split('/')    
    userId = urlParams[urlParams.length-1];
    carregaPaginaInicial(userId);

    // configura botoes adicionar
    document.getElementById('idLogout').addEventListener('click', logoutUsuario);
    document.getElementById('idAdicionar').addEventListener('click', adicionarMoedaNova);
    document.getElementById('idMoedaConversao').addEventListener('change', recalculaValoresMoedas);
}

function logoutUsuario(evento) {
    var formData = new FormData();
    formData.append('userId',userId);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",
                 "/logout/",
                 true);
    xmlhttp.setRequestHeader("X-CSRFToken", csrfcookie());
    xmlhttp.onreadystatechange = function () {
        var resposta= JSON.parse(xmlhttp.responseText);
        if(resposta.isValid) {
            location.assign('http://127.0.0.1:8000/login/');
        } else {
            alert(resposta.mensagem);
        }
    };
    xmlhttp.send(formData);
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
            moedaConversaoCarregamento = resposta.moeda_conversao;
            document.getElementById('idTituloPaginaInicial').innerHTML = tituloPaginaInicial + resposta.username;
            document.getElementById('idUltimaAtualizacao').innerHTML = resposta.atualizadoEm;
            document.getElementById('idMoedaConversao').value = resposta.moeda_conversao;

            carregaTabelaCarteira(resposta.moedas, resposta.moeda_conversao);
        }
    };
    xmlhttp.send();
}

function carregaTabelaCarteira(moedas, moeda_conversao) {
    for( moeda in moedas ) {
        moeda = moedas[moeda]
        var dictDataMoeda = {
            'nome' : moeda.nome,
            'qtd'  : moeda.quantidade, 
            'valor': moeda.valor + moeda_conversao,
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
    cell1.id = 'idN' + dictMoeda.nome;
    cell2.innerHTML = dictMoeda.qtd;
    cell2.id = 'idQtd' + dictMoeda.nome;
    cell3.innerHTML = dictMoeda.valor;
    cell4.innerHTML = dictMoeda.deleteButton;
    cell5.innerHTML = dictMoeda.editButton;
    configuraBotoesDeletar(dictMoeda);
    configuraBotoesEdit(dictMoeda);
}

function adicionarMoedaNova() {
    var dictDataMoedaNova = getFormDataMoedaNova();
    var moedaElement = document.getElementById('idN'+ dictDataMoedaNova.nome);
    
    if(moedaElement){
        editaMoedaExistente(dictDataMoedaNova);
    } 
    else{
        adicionaMoedaTabela(dictDataMoedaNova);
        enviaMoedaParaBanco(dictDataMoedaNova); 
    }   
}

function editaMoedaExistente(dictDataMoedaEditar) {
        var valor_atual=  parseInt(document.getElementById('idQtd'+ dictDataMoedaEditar.nome).innerText);
        dictDataMoedaEditar.qtd = dictDataMoedaEditar.qtd + valor_atual;
        document.getElementById('idQtd'+ dictDataMoedaEditar.nome).innerText = dictDataMoedaEditar.qtd;
        editaMoedaNoBanco(dictDataMoedaEditar);
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
    }    
}

function getFormDataMoedaNova() {
    var nome = document.getElementById('idMoedaNova').value;
    var moedaNovaDict = {
        'nome' : nome,
        'qtd'  : parseInt(document.getElementById('idQuantidade').value),
        'valor':'x BRL',
        'deleteButton' : genericDeleteButton.replace('%IDDELETE%','idDelete'+nome),
        'editButton' : genericEditButton.replace('%IDEDIT%','idEdit'+nome)
    };
    return moedaNovaDict;
}

function getFormDataMoedaRemover(botao) {

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

function getFormDataMoedaEditar(botao) {
    var nome = botao.target.id.replace('idEdit','');
    var row = document.getElementById(nome);
    var cells = row.getElementsByTagName("td");
    var moedaEditDict = {
        'nome' : cells[0].innerHTML,
        'qtd'  : cells[1].innerHTML,
        'valor': cells[2].innerHTML,
        'deleteButton' : genericDeleteButton.replace('%IDDELETE%','idDelete'+nome),
        'editButton' : genericEditButton.replace('%IDEDIT%','idEdit'+nome)
    };
    return moedaEditDict;
}

function confirmaEdicao(botao){
    //Insere valor editado e edita Moeda no Banco 
    botao.target.innerText = 'Edit';
    var nome = botao.target.id.replace('idEdit','');
    var botaoEdit = document.getElementById('idEdit'+nome);
    var cell = document.getElementById('idQtd' + nome);
    var textEdit = document.getElementById("IdInput");
    valor = textEdit.value;
    cell.innerHTML = valor;
    botaoEdit.removeEventListener('click',confirmaEdicao);
    botaoEdit.addEventListener('click',editaMoeda);
    var dictDataMoedaEditar = getFormDataMoedaEditar(botao)
    editaMoedaNoBanco(dictDataMoedaEditar); 
}

function editaMoeda(botao) {
    //Edita Moeda na Tabela
    botao.target.innerText = 'OK';
    var nome = botao.target.id.replace('idEdit','');
    cell = document.getElementById('idQtd' + nome);
    valor = cell.innerText;
    cell.innerHTML = '<input id="IdInput" type="text" value='+valor+'></input>';
    var botaoEdit = document.getElementById('idEdit'+nome);
    botaoEdit.removeEventListener('click',editaMoeda);
    botaoEdit.addEventListener('click',confirmaEdicao);
}

function removeMoeda(botao) {
    var dictDataMoedaRemover = getFormDataMoedaRemover(botao);
    //Remove Moeda da Tabela
    var nome = botao.target.id.replace('idDelete','');
    var row = document.getElementById(nome);
    row.remove();
    //Remove Moeda do Banco 
    removeMoedaDoBanco(dictDataMoedaRemover);
}

function editaMoedaNoBanco(dictDataMoedaEditar) {
    var formData = new FormData();
    formData.append('userId', userId);
    formData.append('nomeMoeda', dictDataMoedaEditar.nome);
    formData.append('qtdMoeda', dictDataMoedaEditar.qtd);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",
                 "/editamoeda/",
                 true);
    xmlhttp.setRequestHeader("X-CSRFToken", csrfcookie());
    xmlhttp.send(formData);
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
    xmlhttp.send(formData);
}


function recalculaValoresMoedas(dropdown) {
    var moeda = dropdown.target.value;
    if( moeda != moedaConversaoCarregamento ) {
        alteraMoedaConversaoBanco(moeda);
        limpaTabela();
        document.getElementById("idTituloPaginaInicial").innerText = tituloPaginaInicial;
        document.getElementById("idUltimaAtualizacao").innerText = "";
        carregaPaginaInicial(userId);
    }
}

function alteraMoedaConversaoBanco(moeda) {
    var formData = new FormData();
    formData.append('userId', userId);
    formData.append('moedaConversao', moeda);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",
                 "/moedaConversao/",
                 true);
    xmlhttp.setRequestHeader("X-CSRFToken", csrfcookie());
    xmlhttp.send(formData);   
    
}

function limpaTabela() {
    var table = document.getElementById("idCarteiraMoedas");
    var cabecarioTabela = 1;
    var tamanhoTabela = table.rows.length;
    if( tamanhoTabela > cabecarioTabela ) {
        for( var i = tamanhoTabela-1; i > 0; i--) {
            table.deleteRow(i);
        }
    }
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

