# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse,HttpResponse
from django.db import models
from datetime import datetime

from . import conversormoedas
from . import models as CryptoWalletModels

@login_required
def carteira(request,id_usuario=0,auth=None):
    if request.method == "POST":
        try:
            response = {}
            usuario = User.objects.get(id=id_usuario)
            response['username'] = usuario.first_name + usuario.last_name
            if CryptoWalletModels.Carteira.objects.filter(usuario_dono=usuario).exists():
                carteira = CryptoWalletModels.Carteira.objects.get(usuario_dono=usuario)
                moedas = carteira.getMoedasFromCarteira()
                response['moedas'] = conversormoedas.ConversorMoedas.convertValorCryptoMoedaParaPapelMoeda(moedas,carteira.moeda_padrao)
            else:
               carteira = CryptoWalletModels.Carteira.criarCarteira(usuario) 
            
            response['encontrouProblema'] = False;
            response['atualizadoEm'] = datetime.now()
            response['moeda_conversao'] = carteira.moeda_padrao
            return JsonResponse(response, status=200) 
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
    return  request.user.is_authenticated and request.COOKIES['csrftoken'] is not None and request.user.is_anonymous is False

@login_required
def adicionaMoeda(request):
    if request.method == "POST":
        try:
            id_usuario = request.POST['userId']
            nome_moeda = request.POST['nomeMoeda']
            qtd_moeda = request.POST['qtdMoeda']           
            usuario = User.objects.get(id=id_usuario)
            if CryptoWalletModels.Carteira.objects.filter(usuario_dono=usuario).exists():
                carteira = CryptoWalletModels.Carteira.objects.get(usuario_dono=usuario)
                carteira.adicionaMoedaCarteira(nome_moeda,qtd_moeda)
            
            response_data = {   'mensagem': "Inserido com sucesso.",
                                'encontrouProblema' : False}
            return JsonResponse(response_data, status=200) 
        except User.DoesNotExist:
            return HttpResponse(status=404)
        except CryptoWalletModels.Carteira.DoesNotExist:
            return HttpResponse(status=511)

@login_required
def removeMoeda(request):
    if request.method == "POST":
        try:
            id_usuario = request.POST['userId']
            nome_moeda = request.POST['nomeMoeda']
            qtd_moeda = request.POST['qtdMoeda']
            usuario = User.objects.get(id=id_usuario)
            if CryptoWalletModels.Carteira.objects.filter(usuario_dono=usuario).exists():
                carteira = CryptoWalletModels.Carteira.objects.get(usuario_dono=usuario)
                carteira.removeMoedaCarteira(nome_moeda,qtd_moeda)
            
            response_data = {   'mensagem': "Removido com sucesso.",
                                'encontrouProblema' : False}
            return JsonResponse(response_data, status=200) 
        except User.DoesNotExist:
            return HttpResponse(status=404)
        except CryptoWalletModels.Carteira.DoesNotExist:
            return HttpResponse(status=511)

@login_required
def editaMoeda(request):
    if request.method == "POST":
        try:
            id_usuario = request.POST['userId']
            nome_moeda = request.POST['nomeMoeda']
            qtd_moeda = request.POST['qtdMoeda']
            usuario = User.objects.get(id=id_usuario)
            if CryptoWalletModels.Carteira.objects.filter(usuario_dono=usuario).exists():
                carteira = CryptoWalletModels.Carteira.objects.get(usuario_dono=usuario)
                carteira.editaMoedaCarteira(nome_moeda,qtd_moeda)
            
            response_data = {   'mensagem': "Alterado com sucesso.",
                                'encontrouProblema' : False}
            return JsonResponse(response_data, status=200) 
        except User.DoesNotExist:
            return HttpResponse(status=404)
        except CryptoWalletModels.Carteira.DoesNotExist:
            return HttpResponse(status=511)
        except Exception as e:
            response_data = {   'mensagem': e,
                                'encontrouProblema' : False}
            return JsonResponse(response_data, status=511)
@login_required       
def alteraMoedaConversao(request):
    if request.method == "POST":
        try:
            id_usuario = request.POST['userId']
            moeda_conversao = request.POST['moedaConversao']
            usuario = User.objects.get(id=id_usuario)
            if CryptoWalletModels.Carteira.objects.filter(usuario_dono=usuario).exists():
                carteira = CryptoWalletModels.Carteira.objects.get(usuario_dono=usuario)
                carteira.alteraMoedaConversao(moeda_conversao)
            
            response_data = {   'mensagem': "Alterado com sucesso.",
                                'encontrouProblema' : False}
            return JsonResponse(response_data, status=200) 
        except User.DoesNotExist:
            return HttpResponse(status=404)
        except CryptoWalletModels.Carteira.DoesNotExist:
            return HttpResponse(status=511)
        except Exception as e:
            response_data = {   'mensagem': e,
                                'encontrouProblema' : False}
            return JsonResponse(response_data, status=511)
    
