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
    
    def getMoedasFromCarteira(self):
        moedas_carteira = {}
        for moeda in Moeda.objects.filter(carteira=self):
            moeda_adicionada = {}
            moeda_adicionada['nome'] = moeda.nome
            moeda_adicionada['quantidade'] = moeda.quantidade
            moedas_carteira[moeda.nome] = moeda_adicionada
            
        return moedas_carteira
    
    def adicionaMoedaCarteira(self,nome,qtd):
        moeda = Moeda.objects.create(carteira=self,nome=nome,quantidade=qtd)
        moeda.save()
        return moeda

    def removeMoedaCarteira(self,nome,qtd):
        for moeda in Moeda.objects.filter(carteira=self):
            if moeda.nome == nome:
                moeda.delete()
            
    def criarCarteira(usuario):
        carteira =  Carteira.objects.create(usuario_dono=usuario,moeda_padrao='BRL')
        carteira.save()
        return carteira

class Moeda(models.Model):
    carteira = models.ForeignKey(Carteira,on_delete=models.CASCADE)
    nome = models.CharField(max_length=200)
    quantidade = models.FloatField()
    ultima_atualizacao = models.DateTimeField(auto_now_add=True)
