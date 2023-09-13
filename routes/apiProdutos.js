const express = require('express')

let apiRouter = express.Router()
const endpoint = '/'

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
    ]
}

// Incluir um produto
TODO: // Lógica de criação de ID automático (AUTO INCREMENT no banco de dados)
apiRouter.post(endpoint + 'produtos', function (req, res) {

    TODO: // Validar lógica de checagem do body
    if (req.body != null) {	
        const produto = req.body
        const idx = lista_produtos.produtos.findIndex(item => item.id == produto.id)
        if (idx != -1) {
            res.status(400).json({ erro: "Produto já cadastrado" })
        }
        else {
            lista_produtos.produtos.push(produto)
            res.status(200).json(produto)
        }
    }
})

// Obter a lista de produtos
apiRouter.get(endpoint + 'produtos', function (req, res) {
    res.status(200).json(lista_produtos)
})

// Obter um produto específico
apiRouter.get(endpoint + 'produtos/:id', function (req, res) {
    const id = req.params.id;
    const idx = lista_produtos.produtos.findIndex(item => item.id == id)
    if (idx == -1) {
        res.status(404).json({ erro: "Produto não encontrado" })
    }
    else {
        res.status(200).json(lista_produtos.produtos[idx])
    }
})

// Alterar um produto
apiRouter.put(endpoint + 'produtos/:id', function (req, res) {
    const id = req.params.id;
    const produto = req.body
    const idx = lista_produtos.produtos.findIndex(item => item.id == id)
    if (idx == -1) {
        res.status(404).json({ erro: "Produto não encontrado, crie o produto antes" })
    }
    else {
        lista_produtos.produtos[idx] = produto
        res.status(200).json(produto)
    }
})


// Excluir um produto
apiRouter.delete(endpoint + 'produtos/:id', function (req, res) {
    const id = req.params.id;
    const idx = lista_produtos.produtos.findIndex(item => item.id == id)
    if (idx == -1) {
        res.status(404).json({ erro: "Produto não encontrado" })
    }
    else {
        lista_produtos.produtos.splice(idx, 1)
        res.status(200).json({ msg: "Produto excluído com sucesso" })
    }
})

module.exports = apiRouter