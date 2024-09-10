const db = require('../config/db');

//Função para obter todas as transações
const getAllTransactions = (req, res) => {
    db.query('SELECT * FROM transactions', (err, results) =>{
        if(err){
            console.error('Erro ao obter transações');
            res.status(500).send('Erro ao obter transações');
            return;
        }
        res.json(results);
    });
};

// Função para adicionar uma nova transação
const addTransaction = (req, res) => {
    const {date, amount, description, category, account, user_id} = req.body;

// Verificar se a transação já existe 
db.query(
    'SELECT * FROM transactions WHERE date = ? AND amount = ? AND description = ? AND category = ? AND account = ? AND user_id = ?',
    [date, amount, descript, category, account, user_id],
    (err, results) => {
        if(err){
            console.error('Erro ao verificar transação:', err);
            res.status(500).send('Eeeo ao verificar transação');
            return;
        }

        if(results.length > 0){
            // Se a transação já existe
            res.status(400).send('Transação duplicada');
            return;
        }

        db.query(
            'INSERT INTO transactions(date, amount, description, category, account, user_id) VALUES (?, ?, ?, ?, ?, ?)',
            [date, amount, description, category, account, user_id],
            (err, results) =>{
                if(err){
                    console.error('Erro ao adicionar transação');
                    res.status(500).send('Erro ao adicionar transação');
                    return;
                }
                res.status(201).send('Transação adiconada com sucesso');
                }
         );
     }
                //a verificar
    )
   
};


// Função para atualizar uma transação existente (substituição completa) 
const updateTransactionPut = (req,res) =>{
    const{id} = req.params;
    const {date, amount, description, category, account, user_id} = req.body;
    db.query(
        'UPDATE transactions SET date = ?, amount = ?, description = ?, category = ?, account = ?, user_id = ? where id =?',
        [date, amount, description, category, account, user_id, id],
        (err, results) =>{
            if(err){
                console.error('Erro ao atualizar transação:', err);
                res.status(500).send('Erro ao atualizar transação');
                return;
            }
            res.send('Transação atualizada com sucesso');
        }
    );
};

// Função para atualizar uma transação existente (atualização parcial)
const updateTransactionPatch = (req, res) =>{
    const{id} = req.params;
    const fields = req.body;
    const query = [];
    const values = [];

    for(const[key, value] of Object.entries(fields)){
        query.push(`${key} = ?`);
        values.push(value);
    }
    values.push(id);

    db.query(
        `UPDATE transactions SET ${query.join(',')} WHERE id=?`,
        values,
        (err, results) =>{
            if(err){
                console.error('Erro ao atualizar transação:', err);
                res.status(500).send('Erro ao atualizar transação');
                return;
            }
            res.send('Transação atualizada com sucesso');
        }
    );
};

// Função para deletar uma transação existente 
const deleteTransaction = (req, res) =>{
    const{id} = req.params;
    db.query('DELETE FROM transactions WHERE id = ?',[id],(err,results) =>{
        if(err){
            console.error('Erro ao deletar transação:', err);
            res.status(500).send('Erro ao deletar transação');
            return;
        }
        res.send('Transação deletada com sucesso');
    });
};

module.exports = {
    getAllTransactions,
    addTransaction,
    updateTransactionPut,
    updateTransactionPatch,
    deleteTransaction
};

