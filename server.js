require('dotenv').config()

const express = require ('express')
const cors = require('cors');
const path = require ('path');
const { error } = require('console');
const app = express ()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/test', express.static('public'));

let port = process.env.PORT
if (port == null || port == "") {
    error('Porta não definida no arquivo .env')
}
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

// Rotas
const apiProdutos = require('./routes/apiProdutos')
app.use ('/api', apiProdutos)
const apiPessoas = require('./routes/apiPessoas')
app.use ('/api', apiPessoas)

TODO: // Criar página 404 e redirecionar para ela
app.use((req, res) => {
    res.status(404).send('404 - Página não encontrada');
});