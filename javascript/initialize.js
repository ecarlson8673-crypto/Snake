// initialization for different games
function initializeOriginal() {
    // clear screen
    clearOptions();

    game = "original";

    // create the field
    for (let i = 0; i < originalFieldWidth * originalFieldHeight; i++) {
        let div = document.createElement("div");
        div.classList.add("originalFieldSquare");
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

    game = "multi";

    // set up the field for multi
    for (let i = 0; i < multiFieldWidth * multiFieldHeight; i++) {
        let div = document.createElement("div");
        div.classList.add("multiFieldSquare");
        div.id = `multi${i}`;
        if (i % 2 == 0) {
            div.style.backgroundColor = `rgb(${0}, ${200}, ${0})`;
            field1[i] = `rgb(${0}, ${200}, ${0})`;
            field2[i] = `rgb(${0}, ${255}, ${0})`;
        } else {
            div.style.backgroundColor = `rgb(${0}, ${255}, ${0})`;
            field1[i] = `rgb(${0}, ${255}, ${0})`;
            field2[i] = `rgb(${0}, ${200}, ${0})`;
        }
        document.getElementById("multiContainer").appendChild(div);
    }
    
    resetMulti();

    // warn user game is not done
    document.getElementById("message").innerHTML = "This game is under construction<br>Some functions may not work";
}

// reset the multi game
function resetMulti() {
    // reset to play again
    for (let i = 0; i < multiFieldWidth * multiFieldHeight; i++) {
        document.getElementById(`multi${i}`).style.backgroundColor = field1[i];
    }
    // reset message
    document.getElementById("message").innerHTML = "";
    document.getElementById("again").style.display = "none";
    // reset position
    head = 60;
    body = [57, 58, 59];
    durection = "ArrowRight";

    // change color of field for head and body
    document.getElementById(`multi${60}`).style.backgroundColor = `rgb(${0}, ${0}, ${175})`;

    document.getElementById(`multi${59}`).style.backgroundColor = `rgb(${0}, ${0}, ${225})`;
    document.getElementById(`multi${58}`).style.backgroundColor = `rgb(${0}, ${0}, ${225})`;
    document.getElementById(`multi${57}`).style.backgroundColor = `rgb(${0}, ${0}, ${225})`;
    
    // set position of food relative to larger field
    /*for (let i = 0; i < foodNumber; i++) {
        let position = Math.floor(Math.random() * (totalFieldWidth * totalFieldHeight));
        foodPosition[i] = position;
    }*/
    foodPosition[0] = [13, 13];

    playMulti();
}

// function to play again
function again() {
    if (game == "original") {
        resetOriginal();
    } else if (game == "multi") {
        resetMulti();
    }
}

// function to clear screen after user chooses a game
function clearOptions() {
    document.getElementById("titles").style.display = "none";
    document.getElementById("originalTitle").style.display = "none";
    document.getElementById("multiTitle").style.display = "none";
}