// init
const display = document.querySelector('.total');
const keys = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.op')
console.log('Back to init again!!!')
let a = '';
let b = '';
let total = '';
let currOp = '';
let nextOp = '';

function add(a, b) {
    let total = a + b;
    console.log('Addition performed')
    displayValue(total);
    setTotal(total);
};

function subtract(a, b) {
    let total = a - b;
    displayValue(total);
    setTotal(total);
};

function multiply(a, b) {
    let total = a * b;
    displayValue(total);
    setTotal(total);
};

function divide(a, b) {
    let total = a / b;
    displayValue(total);
    setTotal(total);
};

// function addTotal(total) {
//     displayValue.textContent = `${total}`
//     // set b to total
// }

function setTotal(value) {
    total = value
    b = '';
    console.log('new a total set successfully: ' + total)
}

function displayValue(value) {
    display.textContent = value
}

function operate(currOp, a, b) {
    // If second number is operator; perform operation with same number
    // Transform str to num

    a = Number(a);
    b = Number(b);

    console.log('Operation performed')
    // Call calc functions
    if (currOp === '+') {
        add(a, b);
    } else if (currOp === '-') {
        subtract(a, b);
    } else if (currOp === '*') {
        multiply(a, b);
    } else if (currOp === '/') {
        divide(a, b);
    } 
}

console.log(operators);

// operator-keys eventListener
operators.forEach((op) => {
    // Store operator-value
    // If equal was not pressed but another operator, evaluate first with PREVIOUS operator
    op.addEventListener('click', (event) => {
        if (a && b && currOp) {
            nextOp  = event.target.value;
            operate(currOp, a, b);
        } else {
            currOp  = event.target.value;
            console.log('Operator ' + currOp)
        }

    });
});

// num keys eventListener
keys.forEach((key) => {
    key.addEventListener('click', (event) => {
        // Evaluate for previous operator
        if (nextOp) {
            currOp = nextOp;
        }
        if (!currOp) {
            console.log('No operator yet');
            a = a.concat(event.target.value)
            console.log(a)
            console.log('a-value: ' + a)
            displayValue(a);
            
        } else if (currOp) {
            console.log('Selected operator: ' + currOp)
            if (total) {
                a = total
                console.log('a was set to previous total: ' + total)
            }
            b = b.concat(event.target.value)
            console.log('b-value: ' + b)
            displayValue(b);
        } 
    })
})

// If equal is pressed
const equal = document.querySelector('.eq');

equal.addEventListener('click', () => {
    operate(currOp, a, b);
});

// If AC is pressed
const del = document.querySelector('.delete');

del.addEventListener('click', () => {
    console.log('Reset')
    a = '';
    b = '';
    total = '';
    currOp = '';
    nextOp = '';
    currNum = 0;
    display.textContent = 0;
})

