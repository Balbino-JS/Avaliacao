const express = require('express'); // Framework para o servidor
const bodyParser = require('body-parser'); // Middleware para interpretar JSON no corpo da requiseção
const cors = require('cors'); // Middleware para permitir requisições de outras origens (CORS)
const fs = require('fs').promises; // Módulo para manipulação de arquivos com Promises

const app = express();
const port = 3000; // Define a porta do servidor

app.use(cors()); // Habilita o CORS
app.use(bodyParser.json()); // Permite receber JSON nas requisições

const DATA_FILE = 'avaliacoes.json'; // Nome do arquivo onde as avaliaçoes serão salvas

//Função para ler as avaliações do arquivo
async function lerAvaliacoes() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8'); // Lê o conteúdo do arquivo
        return JSON.parse(data); // Converte o conteúdo JSON em objeto JavaScript
    } catch (error) {
         return []; // Se não houver arquivo ou erro, retorna uma lista vazia 
    }
};

//Função para salvar as avaliações no arquivo
async function salvarAvaliacoes(avaliacoes) {
    // Converte os dados para JSON formatada e salva no arquivo
    await fs.writeFile(DATA_FILE, JSON.stringify(avaliacoes, null, 2), 'utf8');
}

//Rota para receber uma nova avaliação
app.post('/avaliacoes', async (req, res) => {
    const novaAvaliacao = req.body; // Obtém os dados enviados no corpo da requisição
    const avaliacoes = await lerAvaliacoes(); // Lê as avaliações já existentes
    avaliacoes.push(novaAvaliacao); // Adiciona a nova avaliação
    await salvarAvaliacoes(avaliacoes); // Salva a lista atualizada
    res.status(201).json({message: 'Avaliação enviada com sucesso!' }); // Retorna resposta de sucesso
});

//Rota para obter todas as valiações
app.get('/avaliacoes', async (req, res) => {
    const avaliacoes = await lerAvaliacoes(); // Lê todas as avaliações do arquivo
    res.json(avaliacoes); // Envia as avaliações como resposta em formato JSON
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`) // Mensagemde confirmação no terminal
});