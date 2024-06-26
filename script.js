document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const output = document.getElementById('output');

    // Check for browser support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'ru-RU'; // Устанавливаем язык на русский
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        let isListening = false;

        recognition.onresult = function(event) {
            const speechResult = event.results[0][0].transcript;
            output.textContent = speechResult;
            output.classList.add('success');
            startBtn.textContent = 'Начать говорить';
            isListening = false;
        };

        recognition.onerror = function(event) {
            console.error('Ошибка распознавания речи: ' + event.error);
            output.textContent = 'Произошла ошибка распознавания: ' + event.error;
            output.classList.add('error');
            startBtn.textContent = 'Начать говорить';
            isListening = false;
        };

        recognition.onspeechend = function() {
            recognition.stop();
            startBtn.textContent = 'Начать говорить';
            isListening = false;
        };

        startBtn.addEventListener('click', function() {
            if (isListening) {
                recognition.stop();
                startBtn.textContent = 'Начать говорить';
                isListening = false;
            } else {
                recognition.start();
                output.textContent = 'Слушаю...';
                output.classList.remove('success', 'error');
                startBtn.textContent = 'Говорите...';
                isListening = true;
            }
        });
    } else {
        output.textContent = 'Распознавание речи не поддерживается в этом браузере. Пожалуйста, используйте Chrome или Firefox.';
        startBtn.disabled = true;
        startBtn.classList.add('disabled');
    }
});
