const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        ButtonAction(button);
    })
});

const calculator = document.querySelector('.calculator');
const togglerIcon = document.querySelector('.toggler-icon');
const themeButton = document.querySelector('#theme-button');
let isDark = true;

themeButton.addEventListener('click', () => {
    calculator.classList.toggle('dark');
    themeButton.classList.toggle('dark');
    isDark = !isDark;
})


function ButtonAction(button) {
    if(!(checkIfLastLetterIsOperator(button) && checkIfIsOperatorClass(button)) || button.id == "backspace"){
        if (button.id == 'clear') {
            display.innerText = '';
        } else if (button.id == 'backspace') {
            removeLastLetter();
        } else if (display.innerText != '' && button.id == 'equal') {
            if(checkIfLastLetterIsOperator(button)) {
                removeLastLetter();
            }
             let value = eval(display.innerText);
             let valueFloat = parseFloat(value);    
             if(!Number.isInteger(valueFloat)){
                display.innerText = valueFloat.toFixed(2).toString();
             }else{
                display.innerText = valueFloat.toString();
             }
             
        } else if (display.innerText == '' && button.id == 'equal') {
            if(checkIfLastLetterIsOperator(button)) {
                removeLastLetter();
            }
            display.innerText = 'Empty!';
            setTimeout(() => (display.innerText = ''), 2000);
        } else {
            display.innerText += button.id;
        }
    }
}

function removeLastLetter(){
    let string = display.innerText.toString();
    display.innerText = string.substr(0, string.length - 1);
}

function checkIfLastLetterIsOperator(button){
    let operatorList = ['/', '*', '-', '+', '(', ')'];
    let displayText = display.innerText.toString();
    return operatorList.includes(displayText[displayText.length - 1]);
}

function checkIfIsOperatorClass(button){
    return button.classList[0] == "btn-operator";
}