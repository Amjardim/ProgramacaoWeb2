from django.urls import path
from django.contrib.auth import views as autenticadores_django
from . import views

app_name = 'autenticador'

urlpatterns = [
  # path('', autenticadores_django, name = '' ]
  path('login/', views.login_usuario, name='login'),
  path('login/<str:username>', views.login_usuario, name='login'),
  path('registrarusuario/', views.registrar_usuario, name='regitrar_usuario')
]
