const dotenv = require('dotenv');
dotenv.config();

const express =require('express');
const cors = require('cors'); // Importa o pacote body-parser para permitir requisições de difrentes origens
const bodyParser = require('body-parser');// Importa o pacote body-parser para analisar o corpo das requisições HTTP

const db = require('./config/db'); //Importa a conexão com o banco de dados
const transactionsRoutes = require('./routes/transactions') // importa as rotas de transações 

//inicializar uma nova aplicação Express
const app = express();

//configurar cors e o body-parser
app.use(cors()); //Habilitar o cors para todas as rotas
app.use(bodyParser.json()); //configura o body-parser para analisar requisições json

// Usar as rotas de transações para todas as requisições que começam com /api/transactions
app.use('/api/transactions', transactionsRoutes);

//Rota inicial para testar o servidor 
app.get('/',(req, res) => {
    res.send('Servidor está rodando'); //Define uma rota inicial para testar o servidor
});

//configurar o servidor para uma porta especifica
const PORT = process.env.PORT || 3000; //Define a porta a partir da variavel de ambiente ou usa aporta 3306 como padrão

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)// Loga uma mensagem informando que o servidor está rodando 
    
});