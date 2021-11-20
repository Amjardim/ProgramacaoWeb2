from django.urls import path
from django.contrib.auth import views as autenticadores_django
from . import views

app_name = 'carteira'

urlpatterns = [
  # path('', autenticadores_django, name = '' ]
  path('carteira/<int:id_usuario>', views.carteira, name='carteira_usuario'),
  path('adicionamoeda/', views.adicionaMoeda, name='adicionaMoeda'),
  path('removemoeda/', views.removeMoeda, name='removeMoeda'),
  path('editamoeda/', views.editaMoeda, name='editaMoeda'),
  path('moedaConversao/', views.alteraMoedaConversao, name='alteraMoedaConversao')
]
