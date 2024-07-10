const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let resetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const { number, operation, action } = button.dataset;
        if (number !== undefined) {
            appendNumber(number);
        } else if (operation !== undefined) {
            appendOperation(operation);
        } else if (action !== undefined) {
            if (action === 'clear') {
                clearDisplay();
            } else if (action === 'delete') {
                deleteLast();
            } else if (action === 'calculate') {
                calculate();
            }
        }
    });
});

function appendNumber(number) {
    if (resetDisplay) {
        currentInput = '';
        resetDisplay = false;
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay(currentInput);
}

function appendOperation(op) {
    if (currentInput === '' && op !== '-') return;
    currentInput += ` ${op} `;
    updateDisplay(currentInput);
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
        updateDisplay(currentInput);
        resetDisplay = true;
    } catch (error) {
        updateDisplay('Error');
    }
}

function clearDisplay() {
    currentInput = '';
    updateDisplay('0');
}

function deleteLast() {
    currentInput = currentInput.trim();
    if (currentInput.endsWith(' ')) {
        currentInput = currentInput.slice(0, -3);
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    if (currentInput === '') {
        updateDisplay('0');
    } else {
        updateDisplay(currentInput);
    }
}

function updateDisplay(value) {
    display.innerText = value;
}

updateDisplay('0');
