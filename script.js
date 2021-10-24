// init
const displayValue = document.querySelector('.total');
const keys = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.op')

let a = '';
let b = '';
let currOp = '';
let currNum = 0;
let total = '';

function add(a, b) {
    let total = a + b;
    console.log('Addition performed')
    addTotal(total);
    returnPrevTotal(total);
};

function subtract(a, b) {
    let total = a - b;
    addTotal(total);
    returnPrevTotal(total);
};

function multiply(a, b) {
    let total = a * b;
    addTotal(total);
    returnPrevTotal(total);
};

function divide(a, b) {
    let total = a / b;
    addTotal(total);
    returnPrevTotal(total);
};

function addTotal(total) {
    displayValue.textContent = `${total}`
    // set b to total
}

function returnPrevTotal(total) {
    let prevTotal = total;
    console.log(prevTotal)
    return prevTotal
}

function operate(currOp, a, b) {
    // If second number is operator; perform operation with same number
    // Transform str to num
    a = Number(a);
    b = Number(b);
    console.log('Operation performed')
    console.log(a)
    console.log(b)
    console.log(currOp)
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
    // If equal was not pressed but another operator, evaluate first
    op.addEventListener('click', (event) => {
        if (a && b && currOp) {
            operate(currOp, a, b);
            console.log('Operator ' + currOp)
        } else {
            currOp  = event.target.value;
            console.log('Operator ' + currOp)
        }
    });
});

// num keys eventListener

keys.forEach((key) => {
    key.addEventListener('click', (event) => {
        key = event.target.textContent;

        // Only append 0 if first number is != 0 !
        if (displayValue.textContent === '0' && key === '0') {
            displayValue.textContent = '0';
        } else {
            displayValue.textContent = '';
            // Make sure a was entered BEFORE operator was clicked.
            // Perform a on b
            // If prevTotal then replace a with prevTotal

            if (currOp && a && b) {
                // a = prevTotal
                // b = key
                // perform operation
                console.log('Operator ' + currOp)
                a = returnPrevTotal();
                b = key;
            } else if (currOp && a) {
                b = b.concat(key);
                displayValue.textContent = b;
                console.log('b-value ' + b);
            } else {
                // Store a-value
                a = a.concat(key);
                displayValue.textContent = a;
                console.log('a-value ' + a);
            }

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
    currOp = '';
    currNum = 0;
    console.log(a);
    console.log(b);
    console.log(currOp);
    console.log(currNum);
    displayValue.textContent = 0;
})

