# Registry of node-passport project

###### Obs: Copy node project base of node_base_api from suporteb7web/node_base_api
##### Foi usado o site abaixo para ...:

> 

####  Para ...:

  - Instalando a lib passport
    `npm i passport`

      - Instalando suporte ao typescript para a lib:
        `npm i -D @types/passport`

  - Instalando a lib passport-http
    `npm i passport-http`

      - Instalando suporte ao typescript para a lib
        `npm i -D @types/passport-http`

  - Instalando a lib passport-jwt
    `npm i passport-jwt`

      - Instalando suporte ao typescript para a lib
        `npm i -D @types/passport-jwt`

  - Instalando a lib jsonwebtoken (Para geração do token no login)
    `npm i jsonwebtoken`

      - Instalando suporte ao typescript para a lib
        `npm i -D @types/jsonwebtoken`

####Instruções:

 - Importar lib no server
 - Inicializar ele antes da definição das rotas com:
  `server.use(passport.initialize());`
 - Criar pasta no path src com nome 'config' para fazer a configuração do passport
 - Criar arquivo passport.ts, onde irá conter toda a configuração do passport 