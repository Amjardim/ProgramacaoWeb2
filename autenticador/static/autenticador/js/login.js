onload = function() {
    var nome = temNomeUsuarioUrl();
    if( nome != false ) {
        document.getElementById('idUsuario').value = nome;
    }
    document.getElementById('idLogin').addEventListener('click', loginUsuario);
    document.getElementById('idRegistrar').addEventListener('click', registrarUsuario);
}

function loginUsuario(evento) {
    console.log('Login Usuario');
    var formData = new FormData();
    formData.append('username',document.getElementById('idUsuario').value);
    formData.append('password',document.getElementById('idSenha').value);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",
                 "/login/",
                 true);
    xmlhttp.setRequestHeader("X-CSRFToken", csrfcookie());
    xmlhttp.onreadystatechange = function () {
        var resposta= JSON.parse(xmlhttp.responseText);
        if(resposta.isValid) {
            location.assign('https://cryptowalletweb.herokuapp.com/carteira/'+resposta.id);
        } else {
            alert(resposta.mensagem);
        }
    };
    xmlhttp.send(formData);
}

function registrarUsuario() {
    location.assign('https://cryptowalletweb.herokuapp.com/registrarusuario');
}


function temNomeUsuarioUrl() {
    var urlAtual = window.location.href.toString().split('/');
    var ultimoElemento = urlAtual[urlAtual.length-1];
    console.log(ultimoElemento);
    if( ultimoElemento != 'login' ) {
        return ultimoElemento;
    }
    return false
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
