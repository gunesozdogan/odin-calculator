// Variables
let answer = 0;
let operator = false;
const textAreaUp = document.querySelector(".screen-upper");
const textAreaLow = document.querySelector(".screen-lower");
const numButtons = [...document.querySelectorAll(".number-btn")];
const operatorButtons = [...document.querySelectorAll(".operator-btn")];
const equalButton = document.querySelector(".equal-btn");
const deleteButton = document.querySelector(".del-btn");
const acButton = document.querySelector(".ac-btn");
const decimalButton = document.querySelector(".decimal-btn");

/////////// Calculator Functions /////////////////////////////////
const calculator = (() => {
    const add = function (a, b) {
        return Number(a) + Number(b);
    };

    const subtract = function (a, b) {
        return a - b;
    };

    const multiply = function (a, b) {
        return a * b;
    };

    const divide = function (a, b) {
        if (b === "0") {
            textAreaUp.textContent = "Error";
            setTimeout(() => {
                textAreaUp.textContent = "";
            }, 1000);
        } else {
            return a / b;
        }
    };

    const operate = function (operator, a, b) {
        let operatorFunction;
        switch (operator) {
            case "\u00F7":
                operatorFunction = calculator.divide;
                break;
            case "\u00D7":
                operatorFunction = calculator.multiply;
                break;
            case "-":
                operatorFunction = calculator.subtract;
                break;
            case "\u002B":
                operatorFunction = calculator.add;
                break;
        }
        return operatorFunction(a, b);
    };

    return { add, subtract, multiply, divide, operate };
})();

// Event Functions
const equal = function () {
    const text = textAreaUp.textContent;
    let temp = text.split("");
    let operatorIndex = 0;
    for (let i = 1; i < temp.length; i++) {
        if (isNaN(Number(temp[i])) && temp[i] !== ".") {
            operatorIndex = i;
            break;
        }
    }
    if (operatorIndex) {
        const leftNumber = Number(text.slice(0, operatorIndex));
        const rightNumber = Number(text.slice(operatorIndex + 1));
        const operatorUsed = text[operatorIndex];
        answer = calculator.operate(operatorUsed, leftNumber, rightNumber);
    }
};

const displayNum = function () {
    if (textAreaUp.textContent === "0") {
        textAreaUp.textContent = this.textContent;
    } else {
        textAreaUp.textContent += this.textContent;
    }

    if (!operator) {
        if (textAreaLow.textContent === "0") {
            textAreaLow.textContent = this.textContent;
        } else {
            textAreaLow.textContent += this.textContent;
        }
    } else {
        textAreaLow.textContent = this.textContent;
    }

    equal();
    operator = false;
};

const displayOperator = function () {
    if (!answer) {
        if (
            Number(textAreaUp.textContent.slice(-1)) ||
            Number(textAreaUp.textContent.slice(-1)) === 0
        ) {
            textAreaUp.textContent += this.textContent;
        }
    } else {
        textAreaUp.textContent = Number(answer).toFixed(2) + this.textContent;
    }

    operator = true;
};

const clearDisplay = function () {
    textAreaUp.textContent = "";
    textAreaLow.textContent = "0";
    answer = 0;
};

const calculate = function () {
    equal();
    textAreaLow.textContent = answer.toFixed(2);
    textAreaUp.textContent = "";

    operator = true;
};

const decimal = function () {
    let textUp = textAreaUp.textContent;
    let textLow = textAreaLow.textContent;

    if (textUp === "") {
        textUp = textLow + ".";
        textLow = textUp;
    } else if (!textLow.includes(".")) {
        textLow += ".";
        textUp += ".";
    }
    textAreaUp.textContent = textUp;
    textAreaLow.textContent = textLow;
};

const del = function () {
    const textUp = textAreaUp.textContent.slice(0, -1);
    let textLow = textAreaLow.textContent;
    if (!isNaN(Number(textAreaUp.textContent.slice(-1)))) {
        textLow = textLow.slice(0, -1);
    }

    textAreaUp.textContent = textUp;
    textAreaLow.textContent = textLow;
};
// Event Handlers
numButtons.forEach(btn => btn.addEventListener("click", displayNum));
operatorButtons.forEach(btn => btn.addEventListener("click", displayOperator));
acButton.addEventListener("click", clearDisplay);
equalButton.addEventListener("click", calculate);
decimalButton.addEventListener("click", decimal);
deleteButton.addEventListener("click", del);
