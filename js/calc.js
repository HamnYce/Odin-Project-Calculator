
(function() {
    let buttons = document.querySelectorAll(".calc-input");
    buttons.forEach(button => {
        button.addEventListener('click',textToDisplay)
    })

    let clearButton = document.querySelector("#clearButton");
    clearButton.addEventListener('click',clearDisplay)

    let operateButton = document.querySelector("#operateButton");
    operateButton.addEventListener('click',operate)
}) ()

//immediately executing anonymous function surround in parangethsis 
//and add parenthesis afterwards with args
//(function() {}) ()

function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    if (b==0) {
        return "Math Error - Cannot Divide by Zero"
    }
    return a/b;
}

function operate() {
    let display = document.querySelector("#calc-display");
    let s = display.textContent;
    let reg = new RegExp(/[+]|[-]|[*]|[/]/g);

    let opIndex = s.search(reg)
    let splitS = s.split(reg);

    if (s[opIndex] == "+") {
        display.textContent = add(Number(splitS[0]),Number(splitS[1]));
    }
    else if (s[opIndex] == "-") {
        display.textContent = subtract(Number(splitS[0]),Number(splitS[1]));
    }
    else if (s[opIndex] == "*") {
        display.textContent = multiply(Number(splitS[0]),Number(splitS[1]));
    }
    else if (s[opIndex] == "/") {
        display.textContent = divide(Number(splitS[0]),Number(splitS[1]));
    }
}

function textToDisplay(e) {
    const display = document.querySelector("#calc-display");
    const input = e.target.textContent;
    display.textContent += input
    
    //concatenate this.textContent to Display.textContent
}

function clearDisplay() {
    let display = document.querySelector("#calc-display");
    display.textContent = "";
}


//make it so that everytime an operator is clicked it calculates that step before adding the plus
//check if there is 2 operators present at the same time and if there is operate then add that operator
