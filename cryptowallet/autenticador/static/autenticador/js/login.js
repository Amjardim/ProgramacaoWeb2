onload = function() {
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
//                 var nextPage = new XMLHttpRequest();
//                 nextPage.open("GET",
//                              "/carteira/",//+resposta.id,
//                              true);
//                nextPage.send();
            location.assign('http://127.0.0.1:8000/carteira/'+resposta.id);
        } else {
            alert(resposta.mensagem);
        }
    };
    xmlhttp.send(formData);
}
function registrarUsuario(evento) {
    
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
