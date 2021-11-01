onload = function() {
    document.getElementById('idFormCadastro').addEventListener('submit', loginUsuario);
    document.getElementById('idRegistrar').addEventListener('click', registrarUsuario);
    
}

function loginUsuario(evento) {
    console.log('Login Usuario');
    var formData = new FormData();
    formData.append('username',document.getElementById('idUsuario');
    formData.append('password',document.getElementById('idSenha');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",
                 "/login/",
                 true);
    xmlhttp.onreadystatechange = function () {
        if(xmlhttp.status== 200 && xmlhttp.readyState== 4) {
            var resposta= JSON.parse(xmlhttp.responseText);
            if(resposta.isValid) {
                campoUsername.style= "border: 1px solid #FF0000";
                document.getElementById('idMensagem').replaceChild(document.createTextNode(resposta.mensagem), document.getElementById('idMensagem').firstChild);
            } else {
                campoUsername.style= "border: 1px solid #00FF00";document.getElementById('idMensagem').replaceChild(document.createTextNode(resposta.mensagem), document.getElementById('idMensagem').firstChild);
            }
        }
    };
    xmlhttp.send(formData);
}
function registrarUsuario(evento) {
    
}
