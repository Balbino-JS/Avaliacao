document.addEventListener('DOMContentLoaded', () => {
    //Seleciona o container onde as avaliações serão exibidas
    const containerAvaliacoes = document.getElementById('container-avaliacoes');
    //Seleciona o formulário de envio de nova avaliação
    const formNovaAvaliacao = document.getElementById('formulario-avaliacao');

    //Funçao para renderizar as estrelas
    function renderizarEstrelas(numEstrelas) {
        let estrelas ='';
        for (let i = 0; i < 5; i++) {
            if (i < numEstrelas) {
                estrelas += '<span class="estrela preenchida">★</span>';
            } else {
                estrelas += '<span class="estrela vazia">☆</span>'
            }
        }
        return estrelas;
    }
    

    //Função para carregar as avaliações de backend
    async function carregarAvaliacoes() {
        try {
            const response = await fetch('http://localhost:3000/avaliacoes'); //Ajuste a URLse necessário
            const avaliacoes = await response.json(); // Converte JSON da resposta

            containerAvaliacoes.innerHTML = ''; // Limpa o container

            avaliacoes.forEach(avaliacao => {
                const divAvaliacao = document.createElement('div');
                divAvaliacao.classList.add('avaliacao');
                divAvaliacao.innerHTML = `
                    <div class="info-cliente">
                        <span class="nome">${avaliacao.nome}</span>
                        <div class="estrelas">${renderizarEstrelas(avaliacao.estrelas)}</div>
                    </div>
                    <p class="depoimento">${avaliacao.depoimento}</p>
                `;
                containerAvaliacoes.appendChild(divAvaliacao);
            });
        } catch (error) {
            console.error('Erro ao carregar avaliações:', error);
            containerAvaliacoes.innerHTML = '<p>Erro ao carregar as avaliações.</p>';
        }
    }

    //Carregar as avaliações ao carregar a página 
    carregarAvaliacoes();

    //Evento de envio do formulário de nova avaliacao
    formNovaAvaliacao.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o comportamento padrão do form

        // Captura os dados preenchidos
        const nome = document.getElementById('nome').value;
        const depoimento = document.getElementById('depoimento').value;
        const estrelas = parseInt(document.getElementById('estrelas').value);

        if (!nome.trim() || !depoimento.trim() || isNaN(estrelas)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }
        
        const novaAvaliacao = { nome, depoimento, estrelas };

        try {
            const response = await fetch('http://localhost:3000/avaliacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Corrigido cabeçalho
                },
                body: JSON.stringify(novaAvaliacao),
            });

            if (response.ok) {
                alert('Avaliação enviada com sucesso!');
                document.getElementById('nome').value = '';
                document.getElementById('depoimento').value = '';
                document.getElementById('estrelas').value = '5'; // Resetar para a opção padrão
                carregarAvaliacoes(); //Recarrega as avaliações após o envio
            } else {
                alert('Erro ao enviar a avaliação.');
                console.error('Erro ao enviar avaliação:', response.status);
            }
        } catch (error) {
            alert('Erro ao enviar a avaliação.');
            console.error('Erro ao enviar avaliação:', error);  
        }
    });
});