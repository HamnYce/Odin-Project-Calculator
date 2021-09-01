const buttons = document.querySelectorAll('.calc-button')
const operators = document.querySelectorAll('.calc-operator')
const allClearButton = document.querySelector('#allClearButton')
const equalsButton = document.querySelector('#equalsButton')
const display = document.querySelector("#calc-display");
const negativeButton = document.querySelector("#negative-button")
const decimalButton = document.querySelector("#decimal-button")

let firstNumber,currentOperator,secondNumber,total,clearTextFlag = true,reset;

(function() {
    buttons.forEach(button => {
        button.addEventListener('click',textToDisplay)
    })
    operators.forEach(operator => {
        operator.addEventListener('click',operate)
    })
    
    allClearButton.addEventListener('click',allClear)
    
    equalsButton.addEventListener('click',equals)
    
    negativeButton.addEventListener('click',negativise)
    
    decimalButton.addEventListener('click',addDecimalPoint)
}) ()



function add(a,b) {;return a+b};
function subtract(a,b) {;return a-b};
function multiply(a,b) {; return a*b};
function divide(a,b) {
    if (b == 0) {
        //flag to reset values and avoiding getting NaN
        reset = true;
        return "~zZZZzZ~"
    }
    return a/b
}
//extract if(reset) into function and pass to all functions as function

function negativise() {
    checkReset()
    if(display.textContent.charAt(0) != "-") {
        display.textContent = "-" + display.textContent;
    }
    else {
        display.textContent = display.textContent.substr(1)
    }
}

function operate() {
    checkReset()
    //if operator matches, carry out appropriate operation; update total, display total, reset operator.
    //only store second number if there is an operator already present. assumes there is 'x+' present
    if (currentOperator == "+") {
        secondNumber = Number(display.textContent);
        total = add(firstNumber,secondNumber)
        display.textContent = roundNumber(total);
        currentOperator = "";
        checkSize()
    }
    else if (currentOperator == "-") {
        secondNumber = Number(display.textContent);
        total = subtract(firstNumber,secondNumber)
        display.textContent = roundNumber(total);
        currentOperator = "";
        checkSize()
    }
    else if (currentOperator == "*") {
        secondNumber = Number(display.textContent);
        total = multiply(firstNumber,secondNumber)
        display.textContent = roundNumber(total);
        currentOperator = "";
        checkSize()
    }
    else if (currentOperator == "/") {
        secondNumber = Number(display.textContent);
        total = divide(firstNumber,secondNumber)
        display.textContent = roundNumber(total);
        currentOperator = "";
        checkSize()
    }
    //store first number (from display or 'total')
    firstNumber = display.textContent == "" ? 0 : Number(display.textContent);
    //store operator
    currentOperator = this.textContent
    clearTextFlag = true;
}

function equals() {
    checkReset()
    if (currentOperator == "+") {
        secondNumber = Number(display.textContent);
        total = add(firstNumber,secondNumber)
        display.textContent = roundNumber(total);
        checkSize()
    }
    else if (currentOperator == "-") {
        secondNumber = Number(display.textContent);
        total = subtract(firstNumber,secondNumber)
        display.textContent = roundNumber(total);
        checkSize()
    }
    else if (currentOperator == "*") {
        secondNumber = Number(display.textContent);
        total = multiply(firstNumber,secondNumber)
        display.textContent = roundNumber(total);
        checkSize()
    }
    else if (currentOperator == "/") {
        secondNumber = Number(display.textContent);
        total = divide(firstNumber,secondNumber)
        display.textContent = roundNumber(total);
        checkSize()
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
    currentOperator = "";
}

function textToDisplay() {
    //division by 0 removal
    checkReset()

    //remove numbers after operator has been presed to start 'fresh'
    if (clearTextFlag) {
        display.textContent = "";
        clearTextFlag = false;
    }
    display.textContent += this.textContent;
    display.textContent = display.textContent.substring(0,9);
}

function checkReset() {
    if (reset) {
        allClear()
        reset = false;
        return true;
    }
    return false;
}

function checkSize() {
    if (display.textContent.trim().length >= 10 ) {
        display.textContent = "Size Error";
        reset = true;
    }
}

function addDecimalPoint() {
    if (checkReset()) {
        clearTextFlag = false;
    }
    if (!display.textContent.match(/[.]/g)) {
        display.textContent += "."
    }
}

function roundNumber(n) {
    if(typeof n == "string") {
        return n
    }
    let s = n.toString()
    let index = s.indexOf(".")

    let power = 8 - ((index == -1) ? 1 : index);
    n = n*(Math.pow(10,power))
    n = Math.round(n)
    n = n/(Math.pow(10,power))


    return n
}

