# avaliacao_estags

## Descrição do desafio

Criação de uma API em Node.js capaz de retornar a sequência de números necessária para a digitação de um determinado texto, tal como era feito em aparelhos sem teclado QWERTY embutido, além de poder realizar a operação contrária, criando o texto a partir de uma determinada sequência de números.

O enunciado completo pode ser acessado através deste [link](https://gist.github.com/PauloLuan/2f0a6a878c80b96a088ab52e28d4be14).

## Tecnologias utilizadas

- Node.js
- Docker
- Docker Compose
- MongoDB
- Insomnia

## Requisitos para execução do projeto

- Docker
- Docker Compose
- Insomnia ou qualquer aplicação capaz de realizar requisições do tipo REST

## Como executar

Clone este repositório através do comando:
```
git clone https://github.com/mateuscostaluz/avaliacao_estags.git
```
Após clonar, utilize o comando abaixo para gerar a imagem do Docker com o MongoDB:
```
make up
```
p.s. as configurações podem ser alteradas através do arquivo '.env'.
Após a criação do docker, execute o comando:
```
yarn install
```
p.s. este comando irá realizar a instalação das dependências necessárias para a execução da aplicação.
```
yarn start
```
p.s. este comando fará com que as rotas especificadas no arquivo 'routes.js' fiquem disponíveis através do caminho:
```
localhost:3000
```
No intuito de permitir a associação entre usuários e mensagens, foi criado o modelo de ambos através do MongoDB e, por conta do alto volume de dados, também é permitida a paginação e filtro por data quando consultadas as mensagens através da rota localhost:3000/messages?page=1&limit=10&date=2020-07-20 (basta substituir os argumentos em page, limit e date).

## Teste

Após os passos anteriores, basta utilizar o comando:
```
yarn test
```
