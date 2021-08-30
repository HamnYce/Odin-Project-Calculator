const buttons = document.querySelectorAll('.calc-button')
const operators = document.querySelectorAll('.calc-operator')
const allClearButton = document.querySelector('#allClearButton')
const equalsButton = document.querySelector('#equalsButton')
const display = document.querySelector("#calc-display");
const negativeButton = document.querySelector("#negative-button")
let firstNumber,currentOperator,secondNumber,total,clearTextFlag,reset;


buttons.forEach(button => {
    button.addEventListener('click',textToDisplay)
})
operators.forEach(operator => {
    operator.addEventListener('click',operate)
})

allClearButton.addEventListener('click',allClear)

equalsButton.addEventListener('click',equals)

negativeButton.addEventListener('click',negativise)


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
}
//extract if(reset) into function and pass to all functions as function

function negativise() {
    checkReset()
    display.textContent = "-" + display.textContent;
}

function operate() {
    checkReset()
    //if operator matches, carry out appropriate operation; update total, display total, reset operator.
    //only store second number if there is an operator already present. assumes there is 'x+' present
    if (currentOperator == "+") {
        secondNumber = Number(display.textContent);
        total = add(firstNumber,secondNumber)
        display.textContent = total.toString().substring(0,9);
        currentOperator = "";
    }
    else if (currentOperator == "-") {
        secondNumber = Number(display.textContent);
        total = subtract(firstNumber,secondNumber)
        display.textContent = total.toString().substring(0,9);
        currentOperator = "";
    }
    else if (currentOperator == "*") {
        secondNumber = Number(display.textContent);
        total = multiply(firstNumber,secondNumber)
        display.textContent = total.toString().substring(0,9);
        currentOperator = "";
    }
    else if (currentOperator == "/") {
        secondNumber = Number(display.textContent);
        total = divide(firstNumber,secondNumber)
        display.textContent = total.toString().substring(0,9);
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
    checkReset()
    if (currentOperator == "+") {
        secondNumber = Number(display.textContent);
        total = add(firstNumber,secondNumber)
        display.textContent = total.toString().substring(0,9)
    }
    else if (currentOperator == "-") {
        secondNumber = Number(display.textContent);
        total = subtract(firstNumber,secondNumber)
        display.textContent = total.toString().substring(0,9)
    }
    else if (currentOperator == "*") {
        secondNumber = Number(display.textContent);
        total = multiply(firstNumber,secondNumber)
        display.textContent = total.toString().substring(0,9)
    }
    else if (currentOperator == "/") {
        secondNumber = Number(display.textContent);
        total = divide(firstNumber,secondNumber)
        display.textContent = total.toString().substring(0,9)
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
    currentOperator = ""
}

function textToDisplay() {
    checkReset()
    if (clearTextFlag) {
        display.textContent = "";
        clearTextFlag = false;
    }
    display.textContent += this.textContent;
}

function checkReset() {
    if (reset) {
        allClear()
        reset = false;
    }
}