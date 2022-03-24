
# API SENAC

Api criado do zero para o site da cantina do senac!

# FUNÇÕES DA API

- Cadastrar usuario
- Enviar email para usuario cadastrado
- Enviar relatório de compra pdf no email do usuario
- Login gerando token
- Armazenar compras
- Cadastrar deletar atualizar e pegar produtos e usuarios

# FUNÇÕES FALTANTES

- Tela administrador
- Templates para envio de emails e relatórios

# TECNOLOGIAS

Esse projeto está sendo desenvolvida com nodejs x express e mongodb x mongoose 

# !IMPORTANTE {
    # node i  => para instalar as dependencias
    # npm run dev => para rodar
    # Criar pasta .env com as seguintes variaveis

        - DB_CONNECT_KEY = conectar com banco
        - SALT_KEY = chave
        - EMAIL_CODES = senha email
        - EMAIL= email para enviar
    


# Rotas

## Users 
    # GET
    localhost:3000/users
    # GET BY ID
    localhost:3000/users/:id

    # UPDATE
    localhost:3000/users/update/:id

    # LOGIN & SIGNUP
    localhost:3000/users/signup
    localhost:3000/users/login

    # DELETE
    localhost:3000/users/:id


## Produtos  
    # GET
    localhost:3000/produtos

    # GET BY ID
    localhost:3000/produtos/:id

    # UPDATE
    localhost:3000/produtos/update/:id

    # DELETE
    localhost:3000/produtos/:id


## Compras  
    # GET
    localhost:3000/compras
    
    # Comprar
    localhost:3000/compras


