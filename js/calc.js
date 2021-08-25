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

function operate(s) {

}

function clear() {
    let display = document.querySelector("#calc-display");
    display.textContent = "";
}

//parse the numbers, check which digit is the seprator between them.
//use a RegExp to remove the operator with +||*|| etc etc 