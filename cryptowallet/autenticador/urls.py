from django.urls import path
from django.contrib.auth import views as autenticadores_django
from . import views
urlpatterns = [
  # path('', autenticadores_django, name = '' ]
  path('login/', views.login_usuario, name='login'),
  path('login-invalido/', views.login_nao_autorizado, name='login_invalido'),
]
