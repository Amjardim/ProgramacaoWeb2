# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages



def login_usuario(request):
    if request.method == "POST": 
        nome_usuario = request.POST['username']
        senha = request.POST['password']
        usuario = authenticate(request, username=nome_usuario, password=senha)
        if usuario is not None:
            #usuario valido
            login(request, usuario)
            
        else:
            #usuario invalido
            #messages.success(request, ('Erro de autenticacao. Tente novamente'))
            return render(request, './login/loginInvalido.html', {})
    else:
        return render(request, './login/login.html', {})

def login_nao_autorizado(request):
    return render(request, './login/login.html', {})
