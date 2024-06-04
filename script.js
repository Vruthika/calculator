const buttons = document.querySelectorAll('.button');
const display = document.getElementById('display');
let currentInput = '';
let currentOperator = '';
let previousInput = '';

const handleInput = (value) => {
    if (value === 'C') {
        currentInput = '';
        previousInput = '';
        currentOperator = '';
        display.textContent = '0';
    } else if (value === '=') {
        if (currentOperator && currentInput !== '' && previousInput !== '') {
            currentInput = eval(`${previousInput}${currentOperator}${currentInput}`);
            display.textContent = currentInput;
            previousInput = '';
            currentOperator = '';
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '') {
            previousInput = currentInput;
            currentInput = '';
            currentOperator = value;
        }
    } else {
        currentInput += value;
        display.textContent = currentInput;
    }
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleInput(value);
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === 'Enter' || key === 'Backspace' || key === 'Escape') {
        event.preventDefault(); // Prevent the default action for these keys

        if (key === 'Enter') {
            handleInput('=');
        } else if (key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || '0';
        } else if (key === 'Escape') {
            handleInput('C');
        } else {
            handleInput(key);
        }
    }
});
