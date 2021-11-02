# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse
# Create your views here.
def carteira(request,id_usuario=0):
    if request.method == "POST":
        return HttpResponse(status=404)
    else:
        return render(request, 'carteira/paginaInicial/paginaInicial.html', {})
