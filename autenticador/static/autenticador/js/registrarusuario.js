onload = function() {
    document.getElementById('idRegistrar').addEventListener('click', registrarUsuario);
    document.getElementById('idVoltar').addEventListener('click', voltar);
}


function registrarUsuario(evento) {
    console.log('Registrar Usuario');
    var formData = new FormData();
    formData.append('username',document.getElementById('idUsername').value);
    formData.append('password',document.getElementById('idSenha').value);
    formData.append('passwordConfirmation',document.getElementById('idConfirmadaSenha').value);
    formData.append('firstName',document.getElementById('idPrimeiroNome').value);
    formData.append('lastName',document.getElementById('idSobrenome').value);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",
                 "/registrarusuario/",
                 true);
    xmlhttp.setRequestHeader("X-CSRFToken", csrfcookie());
    xmlhttp.onreadystatechange = function () {
        var resposta= JSON.parse(xmlhttp.responseText);
        if(resposta.encontrouProblema) {
            console.log(resposta.mensagem);
            document.getElementById('idMensagemErro').innerHTML = resposta.mensagem;
        } else {
            var xmlhttpRegistroBemSucedido = new XMLHttpRequest();
            location.assign('http://127.0.0.1:8000/login/'+resposta.username);
        }
    };
    xmlhttp.send(formData);
}

function voltar() {
    location.assign('http://127.0.0.1:8000/login');
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
