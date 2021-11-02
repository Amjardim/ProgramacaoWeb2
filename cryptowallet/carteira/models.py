from django.db import models
from django.conf import settings
# Create your models here.

class Carteira(models.Model):
    class MoedaLocalDaCarteira(models.TextChoices):
        BRASIL  = 'BRL'
        EUA     = 'USD'
        EUROPA  = 'EUR'

    usuario_dono = models.ForeignKey(settings.AUTH_USER_MODEL,
                                     on_delete=models.CASCADE,
                                     unique=True)
    moeda_padrao = models.CharField(max_length=200,choices=MoedaLocalDaCarteira.choices)
    #configuracao = models... [TODO]
    #para ter configuracoes especificas para cada carteira

class Moeda(models.Model):
    carteira = models.ForeignKey(Carteira,on_delete=models.CASCADE)
    nome = models.CharField(max_length=200)
    quantidade = models.FloatField()
    ultima_atualizacao = models.DateTimeField(auto_now_add=True)
