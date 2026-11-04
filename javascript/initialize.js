// initialization for different games
function initializeOriginal() {
    // clear screen
    clearOptions();

    game = "Original";

    // create the field
    for (let i = 0; i < originalFieldWidth * originalFieldHeight; i++) {
        let div = document.createElement("div");
        div.classList.add("fieldSquare");
        div.id = `original${i}`;
        if (i % 2 == 0) {
            div.style.backgroundColor = `rgb(${0}, ${200}, ${0})`;
            fieldColor[i] = `rgb(${0}, ${200}, ${0})`;
        } else {
            div.style.backgroundColor = `rgb(${0}, ${255}, ${0})`;
            fieldColor[i] = `rgb(${0}, ${255}, ${0})`;
        }
        document.getElementById("originalContainer").appendChild(div);
    }

    // finish set up
    resetOriginal();
}

function resetOriginal() {
    // clear screen if already have played
    for (let i = 0; i < originalFieldWidth * originalFieldHeight; i++) {
        document.getElementById(`original${i}`).style.backgroundColor = fieldColor[i];
    }
    // reset message and play again button
    document.getElementById("message").innerHTML = "";
    document.getElementById("again").style.display = "none";
    // reset position variables
    head = 220;
    body = [217, 218, 219];
    durection = "ArrowRight";

    // set up snake
    document.getElementById(`original${220}`).style.backgroundColor = `rgb(${0}, ${0}, ${175})`;
    // body
    document.getElementById(`original${219}`).style.backgroundColor = `rgb(${0}, ${0}, ${225})`;
    document.getElementById(`original${218}`).style.backgroundColor = `rgb(${0}, ${0}, ${225})`;
    document.getElementById(`original${217}`).style.backgroundColor = `rgb(${0}, ${0}, ${225})`;

    // the position of the food to start
    for (let i = 0; i < foodNumber; i++) {
        let position = Math.floor(Math.random() * 200);
        foodPosition[i] = position;
        document.getElementById(`original${position}`).style.backgroundColor = `rgb(${255}, ${0}, ${0})`;
    }
    
    // be able to move the snake
    playOriginal();
}




function initializeMulti() {
    // clear screen
    clearOptions();

    document.getElementById("message").innerHTML = "This game is under construction";
}

function again() {
    if (game == "original") {
        resetOriginal();
    }
}

// function to clear screen after user chooses a game
function clearOptions() {
    document.getElementById("titles").style.display = "none";
}