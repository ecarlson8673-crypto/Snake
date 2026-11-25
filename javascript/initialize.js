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
    // reset score
    score = 0;

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
    document.getElementById(`original${220}`).style.backgroundColor = headColor;
    // body
    document.getElementById(`original${219}`).style.backgroundColor = bodyColor;
    document.getElementById(`original${218}`).style.backgroundColor = bodyColor;
    document.getElementById(`original${217}`).style.backgroundColor = bodyColor;

    // the position of the food to start
    for (let i = 0; i < foodNumber; i++) {
        let position = Math.floor(Math.random() * 200);
        foodPosition[i] = position;
        document.getElementById(`original${position}`).style.backgroundColor = foodColor;
    }
    
    // be able to move the snake
    playOriginal();
}

// start the multi game
function initializeMulti() {
    // clear screen
    clearOptions();

    game = "multi";

    foodNumber = foodNumber * 3;

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
}

// reset the multi game
function resetMulti() {
    // reset score
    score = 0;
    // reset to play again
    for (let i = 0; i < multiFieldWidth * multiFieldHeight; i++) {
        document.getElementById(`multi${i}`).style.backgroundColor = field1[i];
    }
    // reset view port
    viewPortX = 12;
    viewPortY = 12;
    // reset message
    document.getElementById("message").innerHTML = "";
    document.getElementById("again").style.display = "none";
    // reset position
    head = 60;
    body = [57, 58, 59];
    // set actual body position
    actualBodyPosition = [];
    for (let i = 0; i < 3; i++) {
        actualBodyPosition[i] = [];
        actualBodyPosition[i][0] = (Math.floor(totalFieldWidth / 2) - 1);
        actualBodyPosition[i][1] = Math.ceil(totalFieldHeight / 2);
    }
    durection = "ArrowRight";

    // change color of field for head and body
    document.getElementById(`multi${60}`).style.backgroundColor = headColor;

    document.getElementById(`multi${59}`).style.backgroundColor = bodyColor;
    document.getElementById(`multi${58}`).style.backgroundColor = bodyColor;
    document.getElementById(`multi${57}`).style.backgroundColor = bodyColor;
    
    // set position of food relative to larger field
    for (let i = 0; i < foodNumber; i++) {
        let x = Math.floor(Math.random() * totalFieldWidth);
        let y = Math.floor(Math.random() * totalFieldHeight);
        foodPosition[i] = [x, y];
    }


    resetBots();

    playMulti();
}

// initialize 3D
function initialize3D() {
    clearOptions();

    // set which game is being played
    game = "3D";

    for (let i = 0; i < 6; i++) {
        let face = document.getElementsByClassName("cubeFace")[i];
        fieldColor[i] = [];
        for (let j = 0; j < DFieldWidth * DFieldHeight; j++) {
            let div = document.createElement("div");
            div.classList.add("DFieldTile");
            div.id = `D${i}${j}`;
            if (j % 2 == 0) {
                div.style.backgroundColor = `rgba(${0}, ${255}, ${0}, ${0.85})`;
                fieldColor[i][j] = `rgba(${0}, ${255}, ${0}, ${0.85})`;
            } else {
                div.style.backgroundColor = `rgba(${0}, ${200}, ${0}, ${0.85})`;
                fieldColor[i][j] = `rgba(${0}, ${200}, ${0}, ${0.85})`;
            }
            face.appendChild(div);
        }
    }
    reset3D();
}

// reset 3D game
function reset3D() {
    // reset durection
    durection = 1;
    passedDurection = 1;

    // reset position of head of snake 0 = x, 1 = y, 2 = which side (0 - 5)
    head = [3, 3, 5];
    document.getElementById(`D${head[2]}${(head[1] * DFieldWidth) + head[0]}`).style.backgroundColor = headColor;
    
    // reset field tiles
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < DFieldWidth * DFieldHeight; j++) {
            document.getElementById(`D${i}${j}`).style.backgroundColor = fieldColor[i][j];
        }
    }

    // position body
    body = [
        [0, 3, 5],
        [1, 3, 5],
        [2, 3, 5]
    ];
    for (let i = 0; i < 3; i++) {
        document.getElementById(`D${body[i][2]}${(body[i][1] * DFieldWidth) + body[i][0]}`).style.backgroundColor = bodyColor;
    }

    // reset the orientation of the cube
    document.getElementById("DField").style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;

    // clear interval for cube
    clearInterval(cubeInterval);

    // reset score
    score = 0;

    // reset message and play again button
    document.getElementById("message").innerHTML = "";
    document.getElementById("again").style.display = "none";
    
    // place food on the field to start
    for (let i = 0; i < foodNumber; i++) {
        let side = Math.floor(Math.random() * 4);
        let x = Math.floor(Math.random() * DFieldWidth);
        let y = Math.floor(Math.random() * DFieldHeight);

        // set position of food to variable
        foodPosition[i] = [x, y, side];

        // show food
        let square = (foodPosition[i][1] * DFieldWidth) + foodPosition[i][0];
        document.getElementById(`D${foodPosition[i][2]}${square}`).style.backgroundColor = foodColor;
    }
 
    play3D();
}

// initialize portal
function initializePortal() {
    clearOptions();
    //TEMPORARY
    document.getElementById("portalContainer").style.display = "";

    // set the game
    game = "portal";
    document.getElementById("message").innerHTML = "Coming Soon";

    // create field
    for (let i = 0; i < portalField.length; i++) {
        // color of field tile to start with if odd number across
        let start = 1;
        fieldColor[i] = [];
        for (let j = 0; j < portalField[i][0] * portalField[i][1]; j++) {
            let div = document.createElement("div");
            div.classList.add("portalSquare");
            div.id = `portal${i}${j}`;
            // check if field size is odd or even to color tiles
            if (portalField[i][0] % 2 == 0) {
                if (j % portalField[i][0] == 0) {
                    if (start == 0) {
                        start = 1;
                    } else {
                        start = 0;
                    }
                }
                if ((j + start) % 2 == 0) {
                    div.style.backgroundColor = `rgb(${0}, ${200}, ${0})`;
                    fieldColor[i][j] = `rgb(${0}, ${200}, ${0})`;
                } else {
                    div.style.backgroundColor = `rgb(${0}, ${255}, ${0})`;
                    fieldColor[i][j] = `rgb(${0}, ${255}, ${0})`;
                }
            } else {
                if (j % 2 == 0) {
                    div.style.backgroundColor = `rgb(${0}, ${200}, ${0})`;
                    fieldColor[i][j] = `rgb(${0}, ${200}, ${0})`;
                } else {
                    div.style.backgroundColor = `rgb(${0}, ${255}, ${0})`;
                    fieldColor[i][j] = `rgb(${0}, ${255}, ${0})`;
                }
            }
            document.getElementsByClassName("portal")[i].appendChild(div);
        }
    }

    resetPortal();
}

function resetPortal() {
    // position head
    head = [6, 4, 2];
    document.getElementById(`portal${head[0]}${(head[2] * portalField[head[0]][0]) + head[1]}`).style.backgroundColor = headColor;

    // position food
    for (let i = 0; i < foodNumber; i++) {
        // randomize position
        let field = Math.floor(Math.random() * 6);
        let x = Math.floor(Math.random() * portalField[field][0]);
        let y = Math.floor(Math.random() * portalField[field][1]);
        foodPosition[i] = [field, x, y];

        // show food
        document.getElementById(`portal${foodPosition[0]}${(foodPosition[2] * portalField[0]) + foodPosition[1]}`).style.backgroundColor = foodColor;
    }

    playPortal();
}

// function to play again
function again() {
    if (game == "original") {
        resetOriginal();
    } else if (game == "multi") {
        resetMulti();
    } else if (game == "3D") {
        reset3D();
    } else if (game == "portal") {
        resetPortal();
    }
}

// function to clear screen after user chooses a game
function clearOptions() {
    document.getElementById("titles").style.display = "none";
    document.getElementById("originalTitle").style.display = "none";
    document.getElementById("multiTitle").style.display = "none";
    document.getElementById("3DTitle").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("settingsOptions").style.display = "none";
    document.getElementById("portalTitle").style.display = "none";
}