# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse

def login_usuario(request):
    if request.method == "POST":
        nome_usuario = request.POST['username']
        senha = request.POST['password']
        usuario = authenticate(request, username=nome_usuario, password=senha)
        if usuario is not None:
            #usuario valido
            login(request, usuario)
            response_data = {   'mensagem': "autenticado",
                                'username': nome_usuario,
                                'isValid' : True}
            return JsonResponse(response_data, status=200)
                        
        else:
            response_data = {   "mensagem" : "Usuario inválido",
                                "isValid"  : False}
            return JsonResponse(response_data, status=401)
    else:
        if 'username' in request.GET.values():
            print(request.GET['username'] + " - Vim como esse cara aqui")
        return render(request, 'autenticador/login/login.html', {})

def login_nao_autorizado(request):
    return render(request, 'autenticador/login/login.html', {})

def registrar_usuario(request):
    if request.method == "POST":
        username = request.POST['username']
        senha = request.POST['password']
        senhaConfirmacao = request.POST['passwordConfirmation']
        if senha != senhaConfirmacao:
            messages.success(request, ('Senhas não conferem.'))
            return render(request, 'autenticador/registrarUsuario/registrarusuario.html', {})
            
        if User.objects.filter(username=username).exists():
        # Nome de usuario em uso
            messages.success(request, ('Usuario ja registrado.'))
            return render(request, './login/registrarusuario.html', {})
        else:
         #Se usuario nao existe
            first_name = request.POST['firstName']
            last_name = request.POST['lastName']
            usuario = User.objects.create_user(username, username, senha)
            usuario.first_name = first_name
            usuario.last_name = last_name
            usuario.save()
            messages.success(request, ('Usuario registrado com sucesso. Faça o login'))
            return render(request, './login/login.html', {})
    else:
        return render(request, 'autenticador/registrarUsuario/registrarusuario.html', {})
