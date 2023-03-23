const terminalContent = document.getElementById('terminalContent');
const terminalInput = document.getElementById('terminalInput');
const timerDisplay = document.getElementById('timer');

let timer = 108 * 60;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;

        updateTimerDisplay();

        if (timer <= 0) {
            clearInterval(timerInterval);
            appendMessage('System: Timer expired. Catastrophic event triggered.');
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function resetTimer() {
    timer = 108 * 60;
}

function appendMessage(message) {
    const newLine = document.createElement('div');
    newLine.textContent = message;
    terminalContent.appendChild(newLine);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

function processCommand(command) {
    const cleanCommand = command.replace('>:', '');
    if (cleanCommand === '4 8 15 16 23 42' || cleanCommand === '4815162342') {
        appendMessage('System: The timer has been reset. Good job!');
        resetTimer();
    } else {
        appendMessage('System: Invalid input. Enter the correct numbers.');
    }
}

terminalInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();
        processCommand(terminalInput.value);
        terminalInput.value = '>:';
    }
});

terminalInput.value = '>:';
startTimer();
updateTimerDisplay();
