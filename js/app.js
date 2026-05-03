document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 PrizeDraw успешно запущен', 'color: #667eea; font-size: 16px;');

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // Инициализация модулей
    if (typeof initParticipants === 'function') initParticipants();
    if (typeof initPrizes === 'function') initPrizes();
    if (typeof initDraw === 'function') initDraw();
    if (typeof initHistory === 'function') initHistory();

    console.log('✅ Все модули инициализированы');
});