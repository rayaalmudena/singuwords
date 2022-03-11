let secretWord = "SAUNA";
let tries = 1;
var userWord = "";
const allEqual = arr => arr.every(val => val === 1);

function rightOrder(secretWord, insertedWord) {
    let results = [];
    for (let i = 0; i < insertedWord.length; i++) {
        if (insertedWord[i].toUpperCase() == secretWord[i]) {
            results.push(1);
        } else if (secretWord.includes(insertedWord[i].toUpperCase())) {
            results.push(0);
        } else {
            results.push(-1);
        }
    }
    return results;
}

function insertLettersIntoBox(palabra) {
    let squares = document.querySelectorAll(".input" + tries);
    for (let i = 0; i < squares.length; i++) {
        if (palabra[i] != undefined) {
            squares[i].innerHTML = palabra[i];
        } else {
            squares[i].innerHTML = "";
        }
    }
}

function checkCorrect() {
    let checkLetters = rightOrder(secretWord, userWord);
    if (userWord.length != 5) {
        alert("Missing letter/s")
    } else {
        squares = document.querySelectorAll(".input" + tries);
        userWord = "";
        for (let i = 0; i < checkLetters.length; i++) {
            switch (checkLetters[i]) {
                case -1:
                    squares[i].classList.add("incorrect");
                    break;
                case 0:
                    squares[i].classList.add("almost");
                    break;
                case 1:
                    squares[i].classList.add("correct");
                    break;
            }
        }
        tries++;
    }
    endGame(checkLetters);
}

function endGame(results) {
    if (allEqual(results)) {
        document.querySelector("#end-game").innerHTML=("YOU WIN!");        
        document.querySelector("button").style.backgroundColor="green";
        document.removeEventListener('keydown', start);
        document.querySelector("button").removeAttribute("onclick");
    } else if (allEqual(results) == false && tries == 7) {
        document.querySelector("#end-game").innerHTML=("YOU LOSE!");        
        document.querySelector("button").style.backgroundColor="grey";
        document.removeEventListener('keydown', start);
        document.querySelector("button").removeAttribute("onclick");
    }
}


function start(event) {
    if (event.key == "Backspace") {
        userWord = userWord.slice(0, -1);
        insertLettersIntoBox(userWord);
    } else if (event.key == "Enter") {
        checkCorrect();
    } else if((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode==192 ){
        if (userWord.length < 5) {
            userWord += event.key;
            insertLettersIntoBox(userWord);
        }
    }
}

document.addEventListener('keydown', start);