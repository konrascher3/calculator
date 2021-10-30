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
let currentDisplayedValue = '';

// Display current Operation
const aValue = document.querySelector('.a-value');
const bValue = document.querySelector('.b-value');
const opValue = document.querySelector('.op-value');


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
    if (total === Infinity) {
        reset();
        display.textContent = 'err0r'
    } else {
        displayValue(total);
        setTotal(total);
    }
    
};

// function addTotal(total) {
//     displayValue.textContent = `${total}`
//     // set b to total
// }

function setTotal(value) {
    // aValue.textContent = ` ${a}`;
    // bValue.textContent = ` ${b}=`;
    // opValue.textContent = `${currOp}`;
    total = value
    a = total;
    b = '';
    console.log('a for next calculation: ' + total)
}

function displayValue(value) {
    if  (String(value).includes('.')) {
        display.textContent = Number(value).toFixed(2)
        if (!b) {
            b = value;
            console.log(b)
        }
    } else {
        display.textContent = Number(value)
    }
    currentDisplayedValue = value;
}

function operate(currOp, a, b) {
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

function reset() {
    a = '';
    b = '';
    display.textContent = 0
    total = '';
    currOp = '';
    nextOp = '';
    currNum = 0;
    currentDisplayedValue = '';
}

console.log(operators);


// operator-keys eventListener
operators.forEach((op) => {
    // Store operator-value
    // If equal was not pressed but another operator, evaluate first with PREVIOUS operator
    op.addEventListener('click', (event) => {
        if (a && b && nextOp) {
            currOp = nextOp;
            operate(currOp, a, b);  
        } else if (a && b && currOp) {
            nextOp = event.target.value;
            operate(currOp, a, b);
        } else if (a && b && total) {
            a = total;
            currOp = event.target.value;
            operate(currOp, a, b);
        } 

        currOp = event.target.value;
        // opValue.textContent = `${currOp}`;

    });

});

// num keys eventListener
keys.forEach((key) => {
    key.addEventListener('click', (event) => {
        // Evaluate for previous operator
        if (!currOp) {
            if (currentDisplayedValue) {
                a = currentDisplayedValue
            }
            a = a.concat(event.target.value)
            console.log('a: ' + a)
            // aValue.textContent = ` ${a}`;
            displayValue(a);
            
        } else if (currOp) {
            displayValue(0)
            if (currentDisplayedValue) {
                b = currentDisplayedValue
            }
            b = b.concat(event.target.value)
            console.log('b: ' + b)

            
            // bValue.textContent = ` ${b}`
            displayValue(b);
            // if (nextOp) {
            //     currOp = nextOp;
            // }
            // console.log(nextOp);
            // console.log('Selected operator: ' + currOp)
            // if (total) {
            //     a = total
            //     console.log('a was set to previous total: ' + total)
            // }
            // b = b.concat(event.target.value)
            // console.log('b-value: ' + b)
            // displayValue(b);
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
    reset();
    // display.textContent = 0;
    // aValue.textContent = ``;
    // bValue.textContent = ``;
    // opValue.textContent = ` `;
})

// Comma-button clicked
const comma = document.querySelector('.com')

comma.addEventListener('click', () => {

    // Add comma to display value
    currentDisplayedValue = currentDisplayedValue + '.';
    displayValue(currentDisplayedValue);
})