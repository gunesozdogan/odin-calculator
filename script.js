// DOM ELEMENTS and VARIABLES
const numberBtns = [...document.querySelectorAll(".number-btn")];
const operatorBtns = [...document.querySelectorAll(".operator-btn")];
const equalBtn = document.querySelector(".equal-btn");
const decimalBtn = document.querySelector(".decimal-btn");
const ansBtn = document.querySelector(".ans-btn");
const deleteBtn = document.querySelector(".del-btn");
const clearAllBtn = document.querySelector(".ac-btn");
const onOffBtn = document.querySelector("#power");
let num1, num2, answer, operator, isOperatorPressed, isEqualPressed;
let isOn = false;

// CALCULATOR IIFE
const calculator = (function () {
    const add = function (num1, num2) {
        return Number(num1) + Number(num2);
    };

    const subtract = function (num1, num2) {
        return Number(num1) - Number(num2);
    };

    const multiply = function (num1, num2) {
        return Number(num1) * Number(num2);
    };

    const divide = function (num1, num2) {
        let answer;
        if (num2 == 0) {
            answer = "Err";
        } else answer = Number(num1) / Number(num2);
        return answer;
    };

    const operate = function (operator, num1, num2) {
        let operatorFunction;
        switch (operator) {
            case "x":
                operatorFunction = this.multiply;
                break;
            case "\u00F7":
                operatorFunction = this.divide;
                break;
            case "+":
                operatorFunction = this.add;
                break;
            case "-":
                operatorFunction = this.subtract;
                break;
        }

        return operatorFunction(num1, num2);
    };

    return { add, subtract, multiply, divide, operate };
})();

// EVENT FUNCTIONS
const displayNum = function () {
    if (isOn) {
        let lowerScreen = document.querySelector(".screen-lower");

        // if operator is not used yet
        if (!isOperatorPressed) {
            if (lowerScreen.textContent === "0") {
                lowerScreen.textContent = this.textContent;
            } else {
                lowerScreen.textContent += this.textContent;
            }
            // if operator used resets the text screen
        } else {
            lowerScreen.textContent = this.textContent;
        }
    }

    isOperatorPressed = false;
};

const displayNumKeyFnc = function (textContent) {
    if (isOn) {
        let lowerScreen = document.querySelector(".screen-lower");

        // if operator is not used yet
        if (!isOperatorPressed) {
            if (lowerScreen.textContent === "0") {
                lowerScreen.textContent = textContent;
            } else {
                lowerScreen.textContent += textContent;
            }
            // if operator used resets the text screen
        } else {
            lowerScreen.textContent = textContent;
        }
    }

    isOperatorPressed = false;
};
const displayOperator = function () {
    if (isOn) {
        // disabling second operator use in a row
        if (!isOperatorPressed || (isEqualPressed && isOperatorPressed)) {
            let lowerScreen = document.querySelector(".screen-lower");
            let upperScreen = document.querySelector(".screen-upper");
            const curOperator = this.textContent;

            // entering another operator after operator is forbidden
            if (!isNaN(Number(lowerScreen.textContent.slice(-1)))) {
                if (
                    upperScreen.textContent === "" ||
                    upperScreen.textContent.includes("=")
                ) {
                    // if only first number is entered yet
                    num1 = lowerScreen.textContent;
                    upperScreen.textContent = num1 + curOperator;
                    operator = curOperator;
                    num2 = null;
                    // answer = null;
                    isOperatorPressed = true;
                    isEqualPressed = false;
                    // if second number is also entered
                } else {
                    num2 = lowerScreen.textContent;
                    answer = calculator.operate(operator, num1, num2);
                    if (answer === "Err") {
                        lowerScreen.textContent = "Err";
                        setTimeout(() => clear(), 500);
                    } else {
                        String(answer).includes(".")
                            ? (answer = answer.toFixed(2))
                            : (answer = answer);
                        upperScreen.textContent = answer + curOperator;
                        lowerScreen.textContent = answer;
                        operator = curOperator;
                        num1 = answer;
                        isOperatorPressed = true;
                        isEqualPressed = false;
                    }
                }
            }
        }
    }
};

const displayOperatorKeyFnc = function (textContent) {
    if (isOn) {
        // disabling second operator use in a row
        if (!isOperatorPressed || (isEqualPressed && isOperatorPressed)) {
            let lowerScreen = document.querySelector(".screen-lower");
            let upperScreen = document.querySelector(".screen-upper");
            let curOperator = textContent;
            if (curOperator === "*") {
                curOperator = "x";
            } else if (curOperator === "/") {
                curOperator = "\u00F7";
            }
            // entering another operator after operator is forbidden
            if (!isNaN(Number(lowerScreen.textContent.slice(-1)))) {
                if (
                    upperScreen.textContent === "" ||
                    upperScreen.textContent.includes("=")
                ) {
                    // if only first number is entered yet
                    num1 = lowerScreen.textContent;
                    upperScreen.textContent = num1 + curOperator;
                    operator = curOperator;
                    num2 = null;
                    // answer = null;
                    isOperatorPressed = true;
                    isEqualPressed = false;
                    // if second number is also entered
                } else {
                    num2 = lowerScreen.textContent;
                    answer = calculator.operate(operator, num1, num2);
                    if (answer === "Err") {
                        lowerScreen.textContent = "Err";
                        setTimeout(() => clear(), 500);
                    } else {
                        String(answer).includes(".")
                            ? (answer = answer.toFixed(2))
                            : (answer = answer);
                        upperScreen.textContent = answer + curOperator;
                        lowerScreen.textContent = answer;
                        operator = curOperator;
                        num1 = answer;
                        isOperatorPressed = true;
                        isEqualPressed = false;
                    }
                }
            }
        }
    }
};
const equalOperator = function () {
    if (isOn) {
        let upperScreen = document.querySelector(".screen-upper");
        let lowerScreen = document.querySelector(".screen-lower");

        // pressing equal button second time in a row does not work
        if (!isEqualPressed) {
            // equal button works if both numbers are entered
            if (num1 && lowerScreen.textContent) {
                if (
                    // forbids doing same calculation again without entering value again
                    num1 !== lowerScreen.textContent ||
                    (num1 === lowerScreen.textContent && !isOperatorPressed)
                ) {
                    num2 = lowerScreen.textContent;
                    answer = calculator.operate(operator, num1, num2);
                    if (String(answer).includes(".")) {
                        answer = answer.toFixed(2);
                    }
                    if (answer === "Err") {
                        lowerScreen.textContent = "Err";
                        setTimeout(() => clear(), 500);
                    } else {
                        upperScreen.textContent += num2 + "=";
                        lowerScreen.textContent = answer;
                        num1 = answer;
                        isOperatorPressed = true;
                        isEqualPressed = true;
                    }
                }
            }
        }
    }
};
const displayDecimal = function () {
    if (isOn) {
        if (!isOperatorPressed) {
            let lowerScreen = document.querySelector(".screen-lower");
            if (
                !lowerScreen.textContent.includes(".") &&
                lowerScreen.textContent !== ""
            ) {
                lowerScreen.textContent += ".";
            }
        }
    }
};

const displayLastAnswer = function () {
    if (isOn) {
        document.querySelector(".screen-lower").textContent = answer;
    }
};

const deleteCharacter = function () {
    if (isOn) {
        let lowerScreen = document.querySelector(".screen-lower");

        if (lowerScreen.textContent.length > 0) {
            lowerScreen.textContent = lowerScreen.textContent.slice(0, -1);
        }
    }
};

// resetting calculator
const clear = function () {
    num1 = null;
    num2 = null;
    answer = null;
    document.querySelector(".screen-upper").textContent = "";
    document.querySelector(".screen-lower").textContent = "0";
    isOperatorPressed = false;
    isEqualPressed = false;
};
// Clear All
const clearAll = function () {
    if (isOn) clear();
};

const onOff = function () {
    isOn = isOn ? false : true;
    // resetting calculator with OFF button
    if (!isOn) {
        clear();
        document.querySelector(".screen-lower").textContent = "";
    } else {
        clear();
    }
};

const callRelatedFunction = function (e) {
    let relatedFunction;
    switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            relatedFunction = displayNum;
            return displayNumKeyFnc(e.key);
        case ".":
            relatedFunction = displayDecimal;
            break;
        case "=":
        case "Enter":
            relatedFunction = equalOperator;
            break;
        case "Backspace":
        case "Delete":
            relatedFunction = deleteCharacter;
            break;
        case "Escape":
            relatedFunction = clearAll;
            break;
        case "*":
        case "x":
        case "/":
        case "-":
        case "+":
            relatedFunction = displayOperator;
            return displayOperatorKeyFnc(e.key);
    }
    if (relatedFunction) {
        return relatedFunction();
    }
};

// EVENT LISTENERS
numberBtns.forEach(btn => btn.addEventListener("click", displayNum));
document.addEventListener("keydown", callRelatedFunction);

operatorBtns.forEach(btn => btn.addEventListener("click", displayOperator));
equalBtn.addEventListener("click", equalOperator);
decimalBtn.addEventListener("click", displayDecimal);
deleteBtn.addEventListener("click", deleteCharacter);
ansBtn.addEventListener("click", displayLastAnswer);
clearAllBtn.addEventListener("click", clearAll);
onOffBtn.addEventListener("click", onOff);
