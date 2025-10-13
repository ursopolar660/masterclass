document.addEventListener('DOMContentLoaded', function () {
    // --- LÓGICA DO FAQ (AJUSTADA) ---
    const faqItems = document.querySelectorAll('.faq .pergunta .item');

    faqItems.forEach(item => {
        // Encontra o parágrafo de resposta que vem logo após o .item e a .div
        const answer = item.nextElementSibling.nextElementSibling;
        const icon = item.querySelector('img');

        // Garante que a resposta exista antes de adicionar o evento
        if (answer && answer.tagName === 'P') {
            // Esconde a resposta inicialmente
            answer.style.maxHeight = null;
            answer.style.display = 'none';

            item.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Fecha todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.nextElementSibling.nextElementSibling;
                        const otherIcon = otherItem.querySelector('img');
                        if (otherAnswer && otherAnswer.tagName === 'P') {
                            otherAnswer.style.maxHeight = null;
                            otherAnswer.style.display = 'none';
                            otherIcon.src = 'assets/plus.webp';
                        }
                    }
                });

                // Abre ou fecha o item clicado
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.display = 'block';
                    answer.style.maxHeight = answer.scrollHeight + "px";
                    icon.src = 'assets/x.webp'; // Assumindo que você tenha um ícone de 'fechar'/'x'
                } else {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                    answer.style.display = 'none';
                    icon.src = 'assets/plus.webp';
                }
            });
        }
    });


    // --- LÓGICA DO MODAL E FORMULÁRIO ---
    const modal = document.getElementById('lead-modal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    const leadForm = document.getElementById('lead-form');
    const submitBtn = document.getElementById('form-submit-btn');

    // URLs - SUBSTITUA PELA SUA URL DE IMPLANTAÇÃO CORRETA
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxg90D9igdGeqhK-w2mhWJjtWL3t_Shz58KTYT_42xcbUtpoBRR2JYW_zhWRKx5TsnZ0w/exec'; // <<<=========== ATENÇÃO AQUI!
    const SALES_PAGE_URL = 'https://pay.kiwify.com.br/v2JM9eB';

    const openModal = () => {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('visible'), 10); // Pequeno delay para a transição funcionar
    };

    const closeModal = () => {
        modal.classList.remove('visible');
        setTimeout(() => modal.style.display = 'none', 300); // Espera a transição de opacidade terminar
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o link de navegar
            openModal();
        });
    });

    closeModalBtn.addEventListener('click', closeModal);

    // Fecha o modal se clicar fora da caixa de conteúdo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'ENVIANDO...';

    const formData = new FormData(leadForm);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone')
    };
    
    fetch(SCRIPT_URL, {
        method: 'POST',
        // Redireciona o fetch para seguir o redirecionamento 302 do Google
        redirect: "follow", 
        // Define o corpo da requisição como uma string JSON
        body: JSON.stringify(data), 
        headers: {
            'Content-Type': 'text/plain;charset=utf-8', // Usamos text/plain para evitar um "preflight" de CORS
        },
    })
    .finally(() => {
        console.log('Submissão finalizada. Abrindo página de vendas em nova aba...');
        window.open(SALES_PAGE_URL, '_blank');
        closeModal();
        submitBtn.disabled = false;
        submitBtn.textContent = 'QUERO MEU ACESSO AGORA!';
    });
})});