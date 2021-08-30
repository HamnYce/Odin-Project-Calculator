let buttons = document.querySelectorAll('.calc-button')
let operators = document.querySelectorAll('.calc-operator')
let allClearButton = document.querySelector('#allClearButton')
let equalsButton = document.querySelector('#equalsButton')
const display = document.querySelector("#calc-display");


buttons.forEach(button => {
    button.addEventListener('click',textToDisplay)
})
operators.forEach(operator => {
    operator.addEventListener('click',operate)
})

allClearButton.addEventListener('click',allClear)

equalsButton.addEventListener('click',equals)


function add(a,b) {console.log('add');return a+b};
function subtract(a,b) {console.log('subtract');return a-b};
function multiply(a,b) {console.log('mult'); return a*b};
function divide(a,b) {console.log('div');
    if (b == 0) {
        //flag to reset values and avoiding getting NaN
        reset = true;
        return "~zzZZZzZ - Not Allowed~"
    }
    return a/b
};


let firstNumber,currentOperator,secondNumber,total,clearTextFlag,reset;


function operate() {
    if(reset) {
        allClear()
        reset=false;
    }
    //if operator matches, carry out appropriate operation; update total, display total, reset operator.
    //only store second number if there is an operator already present. assumes there is 'x+' present
    if (currentOperator == "+") {
        secondNumber = Number(display.textContent);
        total = add(firstNumber,secondNumber)
        display.textContent = total;
        currentOperator = "";
    }
    else if (currentOperator == "-") {
        secondNumber = Number(display.textContent);
        total = subtract(firstNumber,secondNumber)
        display.textContent = total;
        currentOperator = "";
    }
    else if (currentOperator == "*") {
        secondNumber = Number(display.textContent);
        total = multiply(firstNumber,secondNumber)
        display.textContent = total;
        currentOperator = "";
    }
    else if (currentOperator == "/") {
        secondNumber = Number(display.textContent);
        total = divide(firstNumber,secondNumber)
        display.textContent = total;
        currentOperator = "";
    }
    //store first number (from display or 'total')
    firstNumber = display.textContent == "" ? 0 : Number(display.textContent);
    console.log(`first Number: ${firstNumber}`)
    //store operator
    currentOperator = this.textContent
    console.log(`current OP: ${currentOperator}`)
    console.log(`second Number: ${secondNumber}`)
    clearTextFlag = true;
}

function equals() {
    if (reset) {
        allClear()
        reset = false;
    }
    if (currentOperator == "+") {
        secondNumber = Number(display.textContent);
        total = add(firstNumber,secondNumber)
        display.textContent = total
    }
    else if (currentOperator == "-") {
        secondNumber = Number(display.textContent);
        total = subtract(firstNumber,secondNumber)
        display.textContent = total
    }
    else if (currentOperator == "*") {
        secondNumber = Number(display.textContent);
        total = multiply(firstNumber,secondNumber)
        display.textContent = total
    }
    else if (currentOperator == "/") {
        secondNumber = Number(display.textContent);
        total = divide(firstNumber,secondNumber)
        display.textContent = total
    }
    currentOperator = "";
    clearTextFlag = true;
} 

function allClear() {
    display.textContent = 0;
    firstNumber = 0;
    secondNumber = 0;
    total = 0;
    clearTextFlag = true;
}

function textToDisplay() {
    if (reset) {
        allClear()
        reset = false;
    }
    if (clearTextFlag) {
        display.textContent = "";
        clearTextFlag = false;
    }
    display.textContent += this.textContent;
}