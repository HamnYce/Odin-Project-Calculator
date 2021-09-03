const display = document.querySelector("#calc-display");
let firstNumber,currentOperator,secondNumber,total,clearTextFlag = true,reset;

(function() {
    const buttons = document.querySelectorAll('.calc-button')
    const operators = document.querySelectorAll('.calc-operator')
    const allClearButton = document.querySelector('#allClearButton')
    const equalsButton = document.querySelector('#equalsButton')
    const negativeButton = document.querySelector("#negative-button")
    const decimalButton = document.querySelector("#decimal-button")
    const Browser = window
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

    Browser.addEventListener('keydown',keyboardToDisplay)
}) ()


function keyboardToDisplay(e) {
    let charCode = e.keyCode
    let char = e.key

    if (charCode >= 48 && charCode <= 57) {
        textToDisplay(null,e.key)
    }
    else if (charCode == 65 || charCode == 67) {
        allClear()
    }
    else if (charCode == 8) {
        deleteContent()
    }
    //using key instead of keyCode because + and = have same keycode
    else if (char == "+" || char == "-" || char == "*" || char == "/") {
        operate(null,char)
    }
    else if (char == "=" || charCode == 13) {
        equals()
    }
    else if (charCode == 190) {
        addDecimalPoint()
    }
}

function add(a,b) {return a+b};
function subtract(a,b) {return a-b};
function multiply(a,b) {return a*b};
function divide(a,b) {
    if (b == 0) {
        //flag to reset values and avoiding getting NaN
        reset = true;
        return "~zZZZzZ~"
    }
    return a/b
}


function negativise() {
    checkReset()
    if(display.textContent.charAt(0) != "-" && display.textContent.length < 9) {
        display.textContent = "-" + display.textContent;
    }
    else if (display.textContent.indexOf("-") != -1){
        display.textContent = display.textContent.substr(1)
    }
}

function operate(e,o) {
    checkReset()
    //if operator matches, carry out appropriate operation; update total, display total, reset operator.
    //only store second number if there is an operator already present. assumes x+y where y is missing
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
    if (o == undefined) {
        currentOperator = this.textContent
    }
    else {
        currentOperator = o;
    }
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

function textToDisplay(e,s) {
    //division-by-0 string removal
    checkReset()
    if (s == undefined) {
        s = this.textContent;
    }
    //remove numbers after operator has been presed to start 'fresh'
    if (clearTextFlag) {
        display.textContent = "";
        clearTextFlag = false;
    }
    display.textContent += s;
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
        display.textContent = "Size Err";
        reset = true;
    }
}
//should i add an option to remove the decimal point once placed? all it would take is an if statement or 2 like negativise() hmm
function addDecimalPoint() {
    if (checkReset()) {
        clearTextFlag = false;
    }
    if (!display.textContent.match(/[.]/g)) {
        display.textContent += "."
    }
}

function roundNumber(n) {
    //for divison by 0
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

function deleteContent() {
    let s = display.textContent.toString().trim()
    s = s.substring(0,s.length-1)
    display.textContent = s
}