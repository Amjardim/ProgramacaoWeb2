onload = function() {
    document.getElementById('idFormCadastro').addEventListener('submit', validaForm);
    document.getElementById('idNome').addEventListener('blur',validaCampoNome);
    document.getElementById('idEmail').addEventListener('blur',validaCampoEmail);

    document.getElementById('idNome').addEventListener('focus',exibeAjuda);
    document.getElementById('idEmail').addEventListener('focus',exibeAjuda);
    document.getElementById('idCPF').addEventListener('focus',exibeAjuda);
    document.getElementById('idDtNasc').addEventListener('focus',exibeAjuda);
}

function validaForm(evento) {
    console.log('Formulario nao enviado');
    if(!(validaCampoNome()&&validaCampoEmail())){
        evento.preventDefault();
    }
}

function validaCampoEmail(evento) {
    console.log('Validando email');
    var campo = document.getElementById('idEmail');
    var email = campo.value;
    //email corretoo <username>@<servidor>.<dominio>
    var regExp = /^([a-zA-Z0-9\-]+)@([a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+)$/;
    if(regExp.test(email)){
        console.log('Email deve estar certo');
        var componentes = regExp.exec(email);
        console.log('Email:',componentes[0]);
        console.log('username:',componentes[1]);
        console.log('dominio completo:',componentes[2]);
        campo.className = 'campoCerto';
        document.getElementById('idErrorEmail').innerHTML = '&nbsp;';
        return true;

    } else {
        console.log('Email certamente errado');
        campo.className = 'campoErrado';
        document.getElementById('idErrorEmail').innerHTML = 'Informe email completo com usuario e domino';
        return false;
    }

}

function validaCampoNome(evento) {
    console.log('Validando o campo nome');
    var msg = document.getElementById('idMensagem');
    msg.innerHTML = '&nbsp;';
    //Validação do campo
    var campo = document.getElementById('idNome');
    var nome = campo.value;
    var regExp = /^[A-Z][a-zA-Z\- ']+ [A-Z][a-zA-Z\- ']+$/;
    if(regExp.test(nome)){
        console.log('nome certo');
        campo.className = 'campoCerto';
        document.getElementById('idErrorNome').innerHTML = '&nbsp;';
        return true;
    } else {
        console.log('nome errado');
        campo.className = 'campoErrado';
        document.getElementById('idErrorNome').innerHTML = 'O campo com o seu nome esta errado';
        return false;
    }
}

function exibeAjuda(evento) {
    console.log('Exibe mensagem de ajuda');
    console.log('o evento foi em ', evento.target.id);
    var msg = document.getElementById('idMensagem');
    switch(evento.target.id){
        case 'idNome':
            //console.log('Mensagem sobre nome');
            msg.innerHTML = 'Nome tem apenas letras, tracos e espaco em branco';
            break;
        case 'idEmail':
            //console.log('Mensagem sobre email');
            msg.innerHTML = 'Entre com o seu email';
            break;
        case 'idCPF':
            //console.log('Mensagem sobre CPF');
            msg.innerHTML = 'Entre com o CPF com apenas numeros';
            break;
        case 'idDtNasc':
            //console.log('Mensagem sobre data nascimento');
            msg.innerHTML = 'Entre com a data de nascimento no formato DD/MM/AAAA';
            break;
        case 'idNDepend':
            //console.log('Mensagem sobre numero dependentes');
            msg.innerHTML = 'Informe o numero de dependentes';
            break;
        case 'idSalario':
            //console.log('Mensagem sobre numero dependentes');
            msg.innerHTML = 'Informe o Salario';
            break;
    }
}