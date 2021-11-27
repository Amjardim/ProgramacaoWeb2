# Programação para Web - Trabalho 2 - Implementação de Website com Django:

Autores: Antonio Jardim(1610422) & Felipe Metson(1520302)	

## Escopo do Site
O site é uma carteira digital de criptoativos, no qual cada usuário pode interagir com a sua carteira adicionando, editando ou deletando as moedas possuídas por ele. Além disso, o site fornece a cotação atual da moeda para que o usuário possa converter os valores para moeda desejada.

## Desenvolvimento
### Construção
Projeto foi escrito com o framework DJANGO, tendo o servidor e os endpoints implementados com a linguagem Python. O front, por sua vez, escrito em Javascript lida com as interações dos usuários e se comunica com o servidor, através da tecnologia AJAX, abastecendo os componentes das paginas com informações exclusívas dos usuários.

### Publicação
Site foi publicado na plaforma Heroku e possui acesso através do link https://cryptowalletweb.herokuapp.com/login/

### CRUD
Como explicado no escopo, o site dá ao usuário a possibilidade de visualizar, inserir, apagar e modificar as moedas exclusivas dele. Essas operações consolidam o CRUD de nosso trabalho.

### Cotação Atual
A cotação atual das moedas é forneceda através da biblioteca *cryptocompare*. Essa biblioteca, que precisa ser instalada para a execução local do servidor, fornece os valores atualizados de uma moeda, dado uma moeda de conversão.

### Banco de Dados
O banco de dados utilizado é o `db.sqlite3`. Nele armazenamos os usuários, as carteiras e as moedas. 

- Os usuários são registrados através do modelo já fornecido pelo Django , o model `django.contrib.auth.models.User`.
- A carteira possuí um único dono e uma `moeda_padrao` que é utilizada para converter os valores das cryptos. A tabela carteira, por sua vez, foi um modelo criado para esse projeto e está especificada no arquivo `carteira/models.py`.
- Uma moeda pode pertencer a uma única carteira, porém uma carteira por pode possuir N moedas. Essas moedas, também criadas no arquivo `carteira/models.py`, possuem um campo para indicar a carteira que à possui, um campo para o `nome`, um campo para `quantidade` e um campo para indicar a `ultima_atualização`.

## Manual do Usuario
O site pode ser acessado através do link na seção "Publicação". Lá, o usuário possuí duas opções, caso:
- Já tenha uma conta, pode fazer o Login
- Seja o primeiro acesso, pode registrar-se

Ao se registrar, o usuário é redirecionado para uma página, na qual pode inserir seus dados de identificação(usuario e senha) e suas informações pessoais(nome e sobrenome) para criação de um acesso. Com o Registro validado e concluído, o usuário é redirecionado para a tela de login.

Ao fazer o Login com usuário e senha presentes em nossa base de usuários, o usuário é enviado para o que chamamos de "Pagina Inicial", aonde é possível interagir com a carteira com as seguintes funcionalidades: 
- Visualização: Na página da carteira, o usuário pode, no lado esquerdo, visualizar suas moedas atuais. Essas moedas estão em uma tabela que é gerada no momento que a página é carregada e consistem de uma visualização exclusíva para esse usuário.
- Adição: No lado direito, é possivel adicionar moedas para a sua carteira. Essa operação envia a moeda adicionada(nome e quantidade) para a base de dados da aplicação e a incrementa no final da tabela de visualização da carteira.
- Remoção: Na tabela da carteira, o usuário pode deletar uma linha(moeda) clicando em 'Delete'. Ao clicar, a moeda é excluída também da base, então não clique sem ter certeza que quer remove-la.
- Edição: O botão 'Edit' na tabela permite alterar a quantidade de uma moeda. Quando terminar a edição, o usuário deve confirmar a alteração da informação clicando em 'OK'.
- Visualizar Cotação Atual: Em um *dropdown* no canto superior esquerdo da tela, o usuário pode escolher entre REAL, DOLAR OU EURO para converter o valor das cryptomoedas da carteira. O campo "Valor" na carteira(tabela) terá o valor atualizado de acordo com a moeda(BRL, USD ou EUR) escolhida. O instante da última atualização(fuso horário do servidor) é indicado abaixo da tabela.
- Logout: Abaixo da tabela, existe um botão de 'Logout' que desfaz o acesso do usuário na pagina.
