const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateBtn = document.getElementById("generate");
const pw = document.getElementById("pw");
const copyBtn = document.getElementById("copy");


let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercase = "abcdefghijklmnopqrstuvwxyz";
let number = "0123456789"
let symbol = "@#%&*()+-";

function getUppercase(){
    return uppercase[Math.floor(Math.random() * uppercase.length)]
}
function getLowercase(){
    return lowercase[Math.floor(Math.random() * lowercase.length)]
}
function getNumber(){
    return number[Math.floor(Math.random() * number.length)]
}
function getSymbol(){
    return symbol[Math.floor(Math.random() * symbol.length)]
}

function getChar(){
    let x = [];
    if(upperEl.checked){
        x.push(getUppercase());
    }

    if(lowerEl.checked){
        x.push(getLowercase());
    }

    if(numberEl.checked){
        x.push(getNumber());
    }

    if(symbolEl.checked){
        x.push(getSymbol());
    }

    if(x.length==0) return '';

    return x[Math.floor(Math.random()*x.length)]
}

function generatePassword(){
    let password='';
    let length = lenEl.value;

    if(upperEl.checked){
        password += getUppercase();
    }

    if(lowerEl.checked){
        password += getLowercase();
    }

    if(numberEl.checked){
        password += getNumber();
    }

    if(symbolEl.checked){
        password += getSymbol();
    }

    password = password.split('').sort(function(){return 0.5-Math.random()}).join('');
    
    for(let i = password.length; i< length; i++){
        let ch = getChar();
        password += ch;
    }

    pw.innerText = password;
}

copy.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = pw.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard");
});

generateBtn.addEventListener('click',generatePassword);
