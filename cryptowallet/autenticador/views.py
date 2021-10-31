# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages


def login_usuario(request):
    if request.method == "POST": 
        nome_usuario = request.POST['username']
        senha = request.POST['password']
        usuario = authenticate(request, username=nome_usuario, password=senha)
        if usuario is not None:
            #usuario valido
            login(request, usuario)
            return render(request, 'carteira/paginaInicial.html', {})
            
        else:
            #usuario invalido
            messages.success(request, ('Erro de autenticacao. Tente novamente'))
            return render(request, './login/loginInvalido.html', {})
    else:
        return render(request, './login/login.html', {})

def login_nao_autorizado(request):
    return render(request, './login/login.html', {})

def registrar_usuario(request):
    if request.method == "POST":
        username = request.POST['username']
        senha = request.POST['password']
        usuario = authenticate(request, username=username, password=senha)
        
        if usuario is None:
            #Se usuario nao existe
            first_name = request.POST['firstName']
            last_name = request.POST['lastName']
            senhaConfirmacao = request.POST['passwordConfirmation']
            if senha != senhaConfirmacao:
                messages.success(request, ('Senhas não conferem.'))
                return render(request, './login/registrarusuario.html', {})
            else:
                usuario = User.objects.create_user(username, username, senha)
                usuario.first_name = first_name
                usuario.last_name = last_name
                messages.success(request, ('Usuario registrado com sucesso. Faça o login'))
                return render(request, './login/login.html', {})
        else:
            messages.success(request, ('Usuario ja registrado. Tente novamente'))
            return render(request, './login/registrarusuario.html', {})
    else:
        return render(request, './login/registrarusuario.html', {})
