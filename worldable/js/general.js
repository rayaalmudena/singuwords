let palabraSecreta = "SAUNA";
let intento = 1;
var palabrasIntroducida = "";
const allEqual = arr => arr.every(val => val === 1);

function rightOrder(palabraSecreta, palabraIntroducida) {
    let resultados = [];
    for (let i = 0; i < palabraIntroducida.length; i++) {
        if (palabraIntroducida[i].toUpperCase() == palabraSecreta[i]) {
            resultados.push(1);
        } else if (palabraSecreta.includes(palabraIntroducida[i].toUpperCase())) {
            resultados.push(0);
        } else {
            resultados.push(-1);
        }
    }
    return resultados;
}

function insertLettersIntoBox(palabra) {
    let cuadrados = document.querySelectorAll(".input" + intento);
    for (let i = 0; i < cuadrados.length; i++) {
        if (palabra[i] != undefined) {
            cuadrados[i].innerHTML = palabra[i];
        } else {
            cuadrados[i].innerHTML = "";
        }
    }
}

function comprobar() {
    let check = rightOrder(palabraSecreta, palabrasIntroducida);
    if (palabrasIntroducida.length != 5) {
        alert("Error falta/n letra/s")
    } else {
        cuadrados = document.querySelectorAll(".input" + intento);
        palabrasIntroducida = "";
        for (let i = 0; i < check.length; i++) {
            switch (check[i]) {
                case -1:
                    cuadrados[i].classList.add("incorrect");
                    break;
                case 0:
                    cuadrados[i].classList.add("almost");
                    break;
                case 1:
                    cuadrados[i].classList.add("correct");
                    break;
            }
        }
        intento++;
    }
    endGame(check);
}

function endGame(results) {
    if (allEqual(results)) {
        alert("YOU WIN!")
        document.removeEventListener('keydown', start);
        document.querySelector("button").removeAttribute("onclick");
    } else if (allEqual(results) == false && intento == 7) {
        alert("YOU LOSE!")
        document.removeEventListener('keydown', start);
        document.querySelector("button").removeAttribute("onclick");
    }
}


function start(event) {
    if (event.key == "Backspace") {
        palabrasIntroducida = palabrasIntroducida.slice(0, -1);
        insertLettersIntoBox(palabrasIntroducida);
    } else if (event.key == "Enter") {
        comprobar();
    } else if((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode==192 ){
        if (palabrasIntroducida.length < 5) {
            palabrasIntroducida += event.key;
            insertLettersIntoBox(palabrasIntroducida);
        }
    }
}

document.addEventListener('keydown', start);