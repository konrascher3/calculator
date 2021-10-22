function add(a, b){
    return a + b;
};

function subtract(a, b){
    return a - b;
};

function multiply(a, b){
    return a * b;
};

function divide(a, b){
    return a / b;
};

function operate(op, a, b) {

}

// init

const displayValue = document.querySelector('.total');
const keys = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.op')
let a = '';
let b = '';

// 


keys.forEach((key) => {
    key.addEventListener('click', (event) => {
        key = event.target.textContent;
        console.log(key);

        // Only append 0 if first number is != 0 !
        if (displayValue.textContent === '0' && key === '0') {
            displayValue.textContent = '0'
            console.log('0 and 0; is skipped!')
        } else {
            displayValue.textContent = '';
            a = a.concat(key);
            console.log(a);
            displayValue.textContent = a;
        }
    })
})

operators.forEach((op) => {
    op.addEventListener('click' , (event) => {
        op = event.target.textContent;
        console.log(op);
    })
})
