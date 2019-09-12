> Login API

Api para simular signup, signin e busca de usuário

# Instalação
Baixe o projeto, use `npm install`

# Utilização
Use `npm run start`, o projeto já está usando um banco em nuvem
automaticamente.

# API
O projeto consiste em 3 rotas:

- /api/v1/signup

    rota que cria um usuário e retorna o usuário já autenticado. Caso já
    tenha um usuário com o mesmo email, retornará um erro.

- /api/v1/signin

    Autentica um usuário já existente. Se não existir o usuário, retorna erro
    
- /api/v1/:userId

    Busca um usuário com o id passado no path. Essa rota é autenticada, ou seja,
    ou seja, precisa dos tokens de autenticação das rotas anteriores.
    Caso o id do usuário que está no token não for igual ao id que está no path, retornará erro
    
Mais informações de tipos de envio e retorno, acesso a rota `/swagger` do projeto
