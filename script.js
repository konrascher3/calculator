// init
let dis1Num = '';  // num 1
let dis2Num = '';  // num 2
let result = null;  // result
let lastOperation = '';  // last operator
let isDecimal = false; 

const numbers = document.querySelectorAll('.num');  // Number buttons
const operators = document.querySelectorAll('.op')  // Operator buttons
const equal = document.querySelector('.eq');  //  Equal button
const comma = document.querySelector('.com')  // Comma button
const clearEntry = document.querySelector('.clear-entry'); //  CE 
const backspace = document.querySelector('.backspace'); // Backspace button
const allClear = document.querySelector('.all-clear');  // All-clear button

const percent = document.querySelector('.percent')  // Percent button

// Display previous operation
const display1 = document.querySelector('.display-1');

// Display current Operation
const display2 = document.querySelector('.display-2')

// Calc helper-functions

// function add(a, b) {
//     let total = a + b;
//     console.log('Addition performed')
//     displayValue(total);
//     setTotal(total);
// };

// function subtract(a, b) {
//     let total = a - b;
//     displayValue(total);
//     setTotal(total);
// };

// function multiply(a, b) {
//     let total = a * b;
//     displayValue(total);
//     setTotal(total);
// };

// function divide(a, b) {
//     let total = a / b;
//     if (total === Infinity) {
//         reset();
//         display.textContent = 'err0r'
//     } else {
//         displayValue(total);
//         setTotal(total);
//     }
    
// };

function setTotal(value) {

    total = value
    a = total;
    b = '';
    console.log('a for next calculation: ' + total)
    display.textContent = total
}

function operate() {

    console.log('Operation performed')
    console.log(lastOperation)
    console.log(result)
    console.log(dis2Num)
    // Call calc functions
    if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(dis2Num);
        return result;
    } else if (lastOperation === '–') {
        result = parseFloat(result) - parseFloat(dis2Num);
        return result;
    } else if (lastOperation === '×') {
        result = parseFloat(result) * parseFloat(dis2Num);
        return result;
    } else if (lastOperation ===    '/') {
        result = parseFloat(result) / parseFloat(dis2Num);
        return result;
    } else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(dis2Num);
        return result;
    }
}

function reset() {
    dis1Num = '';
    dis2Num = '';
    result = null;
    lastOperation = '';
    isDecimal = false; 
    display1.textContent = '...';
    display2.textContent = 0;

}

function clear (name = '') {
    dis1Num += `${dis2Num} ${name} `;
    display1.textContent = dis1Num;
    display2.textContent = result;
    dis2Num = '';
}

// num keys eventListener
numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        // Check for comma in number; don't add another one if already pressed
        if (event.target.innerText === '.' && !isDecimal) {
            isDecimal = true;
        } else if (event.target.innerText === '.' && isDecimal) {
            return;
        }
        
        dis2Num += event.target.value;
        display2.textContent = dis2Num; 
    })
})

// operator-keys eventListener
operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {

        if (!dis2Num) return;
        isDecimal = false;
        const operatorName = event.target.innerText;

        // Perform calc if operands and operator is defined
        if (dis1Num && dis2Num && lastOperation){
            operate();
        } else {
            result = parseFloat(dis2Num);
        }

        // Move result to history and zero display2 for next number
        clear(operatorName);  
        lastOperation = operatorName;
        // if (a && b && nextOp) {
        //     currOp = nextOp;
        //     operate(currOp, a, b);  
        // } else if (a && b && currOp) {
        //     nextOp = event.target.value;
        //     operate(currOp, a, b);
        // } else if (a && b && total) {
        //     a = total;
        //     currOp = event.target.value;
        //     operate(currOp, a, b);
        // } 

        // currOp = event.target.value;
        // // opValue.textContent = `${currOp}`;

    });

});

// Equal button

equal.addEventListener('click', () => {
    // Only evaluate if operands and operator is defined
    if (!dis1Num || !dis2Num) return;
    isDecimal = false;
    operate();
    clear();
    display2.textContent = result;
    dis2Num = result;
    dis1Num = '';
});

// AC is pressed

allClear.addEventListener('click', () => {
    console.log('All-clear')
    reset();
})

// CE Button

clearEntry.addEventListener('click', () => {
    display2.textContent = '0';
    dis2Num = '';
})

// DEL Button

backspace.addEventListener('click', () => {
    // Only delete last decimal if length of number is greater 1;
    // If delete is pressed for number length less than 1, return 0; 
    let strNum = display2.textContent
    if (strNum.length > 1) {
        display2.textContent = strNum.substring(0, strNum.length - 1);
        dis2Num = parseFloat(display2.textContent);
    } else {
        return;
    }
})