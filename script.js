 document.addEventListener('DOMContentLoaded', function () {
            const faqItems = document.querySelectorAll('.faq-item');

            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', () => {
                    const answer = item.querySelector('.faq-answer');
                    const isActive = item.classList.contains('active');

                    // Fecha todos os itens abertos
                    faqItems.forEach(i => {
                        i.classList.remove('active');
                        i.querySelector('.faq-answer').style.maxHeight = null;
                    });
                    
                    // Abre ou fecha o item clicado
                    if (!isActive) {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    }
                });
            });
        });