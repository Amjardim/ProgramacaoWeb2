import cryptocompare

class ConversorMoedas():
    def convertValorCryptoMoedaParaPapelMoeda(moedas_crypto, moeda_papel):
        ret = moedas_crypto
        for moeda in moedas_crypto:
            nome = moeda
            qtd = moedas_crypto[moeda]['quantidade']
            valor_atual_moeda = cryptocompare.get_price(moeda,moeda_papel)
            valor_convertido = qtd * valor_atual_moeda[moeda][moeda_papel]
            ret[moeda]['valor'] = valor_convertido
        return ret
            
    
