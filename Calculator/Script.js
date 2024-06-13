let input = document.getElementById('inputBox');
let button = document.querySelectorAll('button');

let string = "";
let arr = Array.from(button);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML);
    });
});

input.setAttribute('readonly',true);   //set input as only viewable

document.addEventListener('keydown', (e) => {
    const key = e.key;
    const allowedKeys = /^[0-9+\-*/.=,]$/; // Regular expression to allow numbers and symbols

    if (key.match(allowedKeys)) {
        e.preventDefault(); // Prevent the default behavior of the key
        handleInput(key);
    }
    else if (key === 'Enter') {
        e.preventDefault();
        handleInput('=');
    }
    else if (key === 'Delete') {
        e.preventDefault();
        handleInput('AC');
    } else if (key === 'Backspace') {
        e.preventDefault();
        handleInput('DEL');
    }
});
function handleInput(inputValue) {
    if (inputValue == '=') {
        string = eval(string);
        input.value = string;
    }
    else if (inputValue == 'AC') {
        string = "";
        input.value = string;
    }
    else if (inputValue == 'DEL') {
        string = string.substring(0, string.length - 1);
        input.value = string;
    }
    else if (inputValue == '%') {

        string = (parseFloat(string) / 100).toString();
        input.value = string;
    }

    else {
        string += inputValue;
        input.value = string;
    }
    input.scrollLeft = input.scrollWidth // scroll to left to see prviouse add string
}
