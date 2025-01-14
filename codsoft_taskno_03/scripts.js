// scripts.js
const display = document.querySelector('#display');
const keys = document.querySelector('.calculator-keys');

keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    } else {
        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '=':
                handleOperator(value);
                break;
            case 'all-clear':
                resetCalculator();
                break;
            case '.':
                inputDecimal(value);
                break;
            default:
                inputNumber(value);
        }
    }
});

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetDisplay = false;

function inputNumber(number) {
    if (shouldResetDisplay) {
        display.textContent = number;
        shouldResetDisplay = false;
    } else {
        display.textContent = display.textContent === '0' ? number : display.textContent + number;
    }
}
function inputDecimal(dot) {
    if (shouldResetDisplay) {
        display.textContent = '0.';
        shouldResetDisplay = true;
        return;
    }

    if (!display.textContent.includes(dot)) {
        display.textContent += dot;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.textContent);

    if (currentOperator && shouldResetDisplay) {
        currentOperator = nextOperator;
        return;
    }

    if (firstOperand === '') {
        firstOperand = inputValue;
    } else if (currentOperator) {
        const result = calculate(firstOperand, inputValue, currentOperator);
        display.textContent = String(result);
        firstOperand = result;
    }

    shouldResetDisplay = true;
    currentOperator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function resetCalculator() {
    display.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    shouldResetDisplay = false;
}
