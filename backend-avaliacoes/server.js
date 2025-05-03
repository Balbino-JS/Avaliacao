const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = 'avaliacoes.json';

//Função para ler as avaliações do arquivo
async function lerAvaliacoes() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data); 
    } catch (error) {
         return [];
    }
};

//Função para salvar as avaliações no arquivo
async function salvarAvaliacoes(avaliacoes) {
    await fs.writeFile(DATA_FILE, JSON.stringify(avaliacoes, null, 2), 'utf8');
}

//Rota para receber uma nova avaliação
app.post('/avaliacoes', async (req, res) => {
    const novaAvaliacao = req.body;
    const avaliacoes = await lerAvaliacoes();
    avaliacoes.push(novaAvaliacao);
    await salvarAvaliacoes(avaliacoes);
    res.status(201).json({message: 'Avaliação enviada com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});