# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse,HttpResponse
from django.db import models


from . import models as CryptoWalletModels
# Create your views here.
@login_required
def carteira(request,id_usuario=0,auth=None):
    if request.method == "POST":
        # na real esse bloco tem que ser um método que preenche os componentes
        try:
            response = {}
            usuario = User.objects.get(id=id_usuario)
            response['username'] = usuario.first_name + usuario.last_name
            if CryptoWalletModels.Carteira.objects.filter(usuario_dono=usuario).exists():
                carteira = CryptoWalletModels.Carteira.objects.get(usuario_dono=usuario)
                response['moedas'] = carteira.getMoedasFromCarteira()
            else:
               carteira = CryptoWalletModels.Carteira.criarCarteira(usuario) 
            
            response['moeda_conversao'] = carteira.moeda_padrao
            return render(  request,
                            'carteira/paginaInicial/paginaInicial.html',
                            response)
        except  User.DoesNotExist:
            return HttpResponse(status=404)
        ###################################################
    else:
        try:
            response = {}
            usuario = User.objects.get(id=id_usuario)
            if isUserAuthenticated(request) is False:
                raise Exception('Acesso sem autentificacao')
            else:
                return render(  request,
                                'carteira/paginaInicial/paginaInicial.html',
                                {})            
        except User.DoesNotExist:
            return HttpResponse(status=404)
        except Exception:
            return HttpResponse(status=511)
        
            
def isUserAuthenticated(request):
    print(request.user)
    return  request.user.is_authenticated and request.COOKIES['csrftoken'] is not None and request.user.is_anonymous is False
                      
