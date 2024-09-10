const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');


// Definindo uma rota para obter todas as transações
router.get('/', transactionsController.getAllTransactions);

//definindo uma nova rota: para adiconar uma nova transação
router.post('/', transactionsController.addTransaction);

//Definindo uma rota para atualizar uma transação existente (substituição completa) 
router.put('/:id', transactionsController.updateTransactionPut);

//Definindo uma rota para atualizar uma transação existente (atualização parcial)
router.patch('/:id', transactionsController.updateTransactionPatch);

//Definindo uma rota para deletar uma transação existente
router.delete('/:id', transactionsController.deleteTransaction);

module.exports = router;