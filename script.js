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

function operate() {

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
    // TODO: Stop history from overflowing
    dis1Num += `${dis2Num} ${name} `;
    
    display1.textContent = dis1Num;

    // TODO: If results exceeds 15 characters, shorten number
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
        
        // Don't concat if first num is only 0
        if (display2.textContent === '0' && event.target.innerText === '0') {
            return;
        } else {
            // Put 0 in front of decimal-point if no number
            if (display2.textContent === '0' && event.target.innerText === '.') {
                dis2Num = 0;
            }
            dis2Num += event.target.value;
        }
        
        // TODO: If number exceeds 15 characters, shorten number
        display2.textContent = dis2Num; 

        // Error message

        if (display2.textContent == Infinity) {
            display2.textContent = 'Uh oh, you broke the calculator :('
        }
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

// Keyboard-binds

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    if (
        event.key === '0' ||   
        event.key === '1' ||     
        event.key === '2' ||
        event.key === '3' ||
        event.key === '4' ||
        event.key === '5' ||
        event.key === '6' ||
        event.key === '7' ||
        event.key === '8' ||
        event.key === '9' ||
        event.key === '.' 
        ) {
            keyboardNum(event.key);
    } else if (
        event.key === '+' ||
        event.key === '/' ||
        event.key === '%' 
        ) {
            operateKey(event.key);
    } else if (event.key === '*') {
        operateKey('×');
    } else if (event.key === '-' || event.key === '–') {
        operateKey('–');
    } else if (event.key === 'Enter') {
        if (!dis1Num || !dis2Num) return;
        isDecimal = false;
        operate();
        clear();
        display2.textContent = result;
        dis2Num = result;
        dis1Num = '';
    } else if (event.key === 'Backspace') {
        let strNum = display2.textContent
        if (strNum.length > 1) {
            display2.textContent = strNum.substring(0, strNum.length - 1);
            dis2Num = parseFloat(display2.textContent);
        } else {
            display2.textContent = 0;
            dis2Num = '';
        }
    }
});

function keyboardNum(key) {
    numbers.forEach(button => {
        if (button.textContent === key) {
            button.click();
        }
    })
};

function operateKey(key) {
    operators.forEach(button => {
        if (button.textContent === key) {
            button.click();
        }
    })
};



