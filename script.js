let display = document.getElementById('displayBox');
display.value = "0";
let buttons = document.querySelectorAll('button');

let operators = ['+', '-', '*', '/', '%'];
function isLastCharOperator(str) {
    return operators.includes(str[str.length - 1]);
}

let string = "0";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;
        if (value === '=') {
            try {
                if (string === "0") {
                    display.value = "0";
                    string = "0";
                    return;
                }
                string = eval(string);
                display.value = string;
            }
            catch (error) {
                string = 'Error';
                display.value = string;
                setTimeout(() => {
                    string = '0';
                    display.value = '0';
                }, 2000);
            }
        }
        else if (value === 'AC') {
            string = "0";
            display.value = string;
        }
        else if (value === 'DEL') {
            if (string.length === 1 || string === "Error") {
                string = "0";
            } else {
                string = string.slice(0, -1);
            }
            display.value = string;
        }
        else if (operators.includes(value) || value === 'x' || value === '÷') {
            // Prevent operator as first input
            if (string === "0" || string === "Error") return;
            let op = value;
            if (value === 'x') op = '*';
            if (value === '÷') op = '/';
            if (isLastCharOperator(string)) {
                string = string.slice(0, -1) + op;
            } else {
                string += op;
            }
            display.value = string;
        }
        else if (!isNaN(value)) {
            // If string is '0' or 'Error', replace with new number
            if (string === "0" || string === "Error") {
                string = value;
            } else {
                string += value;
            }
            display.value = string;
        }
        else if(value === '.'){
            if (string === "0"){
                string += value
            }
            else if (!string.includes('.')) {
                // Only add decimal if the current number doesn't have one
                if (isLastCharOperator(string)) {
                    string += '0';
                }
                string += value;
            }
            display.value = string;
        }
    })
})