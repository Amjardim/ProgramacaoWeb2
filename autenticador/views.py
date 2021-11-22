# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse

def login_usuario(request,username=None):
    if request.method == "POST":
        nome_usuario = request.POST['username']
        senha = request.POST['password']
        usuario = authenticate(request, username=nome_usuario, password=senha)
        if usuario is not None:
            #usuario valido
            login(request, usuario)
            response_data = {   'mensagem': "autenticado",
                                'username': nome_usuario,
                                'id'      : usuario.id,
                                'isValid' : True}
            return JsonResponse(response_data, status=200)
                        
        else:
            response_data = {   "mensagem" : "Usuario inválido",
                                "isValid"  : False}
            return JsonResponse(response_data, status=401)
    else:
        return render(request, 'autenticador/login/login.html', {'username':username})

def registrar_usuario(request, username=None):
    if request.method == "POST":
        username = request.POST['username']
        senha = request.POST['password']
        senhaConfirmacao = request.POST['passwordConfirmation']
        if senha != senhaConfirmacao:
            response_data = {   'mensagem': "Senhas não conferem.",
                                'encontrouProblema' : True}
            return JsonResponse(response_data, status=400)            
        if User.objects.filter(username=username).exists():
        # Nome de usuario em uso
            response_data = {   'mensagem': 'Usuario ja registrado.',
                                'encontrouProblema' : True}
            return JsonResponse(response_data, status=400)  
        else:
         #Se usuario nao existe
            first_name = request.POST['firstName']
            last_name = request.POST['lastName']
            usuario = User.objects.create_user(username, username, senha)
            usuario.first_name = first_name
            usuario.last_name = last_name
            usuario.save()
            response_data = {   'mensagem': 'Usuario registrado com sucesso. Faça o login.',
                                'username': username,
                                'encontrouProblema' : False}
            return JsonResponse(response_data, status=200) 
    else:
        return render(request, 'autenticador/registrarUsuario/registrarusuario.html', {})

def logout_usuario(request,username=None):
    if request.method == "POST":
        try:
            user_id = request.POST['userId']
            user = User.objects.get(id=user_id)
            if user.is_authenticated:
                #usuario logado
                logout(request)
                response_data = {   'mensagem': "Logout Efetuado",
                                'isValid' : True}
                return JsonResponse(response_data, status=200)
            else:
                response_data = {'mensagem': "Usuario nao esta Logado",
                                'isValid' : False}
                return JsonResponse(response_data,status=401)
        except  User.DoesNotExist:
            response_data = {   "mensagem" : "Usuario nao existe",
                                "isValid"  : False}
            return JsonResponse(response_data, status=401)