const express = require('express')

const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DB_URL,
        ssl: { require: false, rejectUnauthorized: false }
    }
});


let apiRouter = express.Router()
const endpoint = '/'

// Incluir uma pessoa
apiRouter.post(endpoint + 'pessoas', function (req, res) {
    const pessoa = req.body;

    if (!pessoa.nome || !pessoa.idade || !pessoa.cidade) {
        return res.status(400).json({ error: 'Todos os campos (nome, idade e cidade) são obrigatórios.' });
    }

    if (typeof pessoa.idade !== 'number' || pessoa.idade <= 0) {
        return res.status(400).json({ error: 'A idade deve ser um número inteiro.' });
    }

    knex('pessoas')
        .insert(pessoa)
        .then(ret => {
            res.status(201).json({ success: 'Pessoa inserida com sucesso.' });
        })
        .catch(err => {
            res.status(500).json({ error: 'Ocorreu um erro ao inserir a pessoa.' });
        });
});

// Obter a lista de pessoas
apiRouter.get(endpoint + 'pessoas', function (req, res) {
    knex('pessoas').select().then(ret => {
        res.status(200).json(ret)
    }).catch(err => {
        res.status(400).json(err)
    })
})

// Obter uma pessoa específico
apiRouter.get(endpoint + 'pessoas/:id', function (req, res) {
    const id = req.params.id;
    knex('pessoas')
        .select('nome', 'idade', 'cidade')
        .where('id', id)
        .then(ret => {
            if (ret.length == 0) {
                res.status(404).json({ erro: "Pessoa não encontrado" })
            }
            else {
                res.status(200).json(ret[0])
            }
        }).catch(err => {
            res.status(400).json(err)
        })
})

// Alterar uma pessoa
apiRouter.put(endpoint + 'pessoas/:id', function (req, res) {
    const id = req.params.id;
    const pessoaAtualizada = req.body;

    if (!Object.keys(pessoaAtualizada).length) {
        return res.status(400).json({ erro: "Nenhum campo para atualização foi fornecido" });
    }

    knex('pessoas')
        .where('id', id)
        .update(pessoaAtualizada)
        .then(ret => {
            if (ret == 0) {
                res.status(404).json({ erro: "Pessoa não encontrado" });
            } else {
                res.status(200).json({ msg: "Pessoa alterado com sucesso" });
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


// Excluir uma pessoa
apiRouter.delete(endpoint + 'pessoas/:id', function (req, res) {
    const id = req.params.id;

    knex('pessoas')
        .where('id', id)
        .del()
        .then(ret => {
            if (ret == 0) {
                res.status(404).json({ erro: "Pessoa não encontrado" });
            } else {
                res.status(200).json({ msg: "Pessoa excluída com sucesso" });
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

module.exports = apiRouter