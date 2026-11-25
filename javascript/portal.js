// function to play the portal game
function playPortal() {
    // the interval that moves the snake
    let moveInterval;
    // whether game is paused or not
    let pause = false;

    document.addEventListener("keydown", keyDown);
    function keyDown(event) {
        let key = event.key;

        // if arrow key then change durection
        if (key.includes("Arrow")) {
            durection = key;
        }

        // pause the game
        if (key == " ") {
            if (pause == false) {
                clearInterval(moveInterval);
                document.getElementById("message").innerHTML = "";
            } else {
                moveInterval = setInterval(movePortal, time);
                document.getElementById("message").innerHTML = "";
            }
            pause = !pause;
        }
    }

    // interval where snake is moved
    moveInterval = setInterval(movePortal, time);
    function movePortal() {
        // move snake around field
        moveSnake();

        // eat food if on it
        eat();
    }

    // move the snake
    function moveSnake() {
        // recolor tile last body segment was on
        document.getElementById(`portal${body[0][0]}${(body[0][2] * portalField[body[0][0]][0]) + body[0][1]}`).style.backgroundColor = fieldColor[body[0][0]][(body[0][2] * portalField[body[0][0]][0]) + body[0][1]];

        // move body
        body.splice(0, 1);
        body[length] = [...head];

        // move snake depending on durection
        if (durection == "ArrowRight") {
            head[1]++;
        } else if (durection == "ArrowLeft") {
            head[1]--;
        } else if (durection == "ArrowDown") {
            head[2]++
        } else if (durection == "ArrowUp") {
            head[2]--;
        }

        // check if snake goes off field (and goes into portal)
        portaled();

        // color tile with head on it
        document.getElementById(`portal${head[0]}${(head[2] * portalField[head[0]][0]) + head[1]}`).style.backgroundColor = headColor;
    }

    // check if snake goes through portal and move snake to another field if it did
    function portaled() {
        if (head[0] == 0) {
            if (head[1] < 0 && head[2] < 3) {
                head[0] = 4;
                head[1] = 3;
            }
            if (head[2] < 0) {
                head[0] = 2;
                head[2] = 2;
            }
            if (head[2] > (portalField[head[0]][1] - 1)) {
                head[0] = 6;
                head[1] = head[1] + 4;
                head[2] = 0;
            }
        } else if (head[0] == 1) {
            if (head[1] < 0) {
                head[0] = 6;
                head[1] = 8;
            }
            if (head[1] > (portalField[head[0]][0] - 1)) {
                head[0] = 3;
                head[1] = 0;
            }
            if (head[2] < 0) {
                head[0] = 5;
                head[2] = 3;
            }
        } else if (head[0] == 2) {
            if (head[1] < 0) {
                head[0] = 5;
                head[1] = 2;
                head[2] = head[2] + 1;
            }
            if (head[2] < 0) {
                head[0] = 6;
                head[2] = 3;
            }
            if (head[2] > (portalField[head[0]][1] - 1) && head[1] < 5) {
                head[0] = 0;
                head[2] = 0;
            }
        } else if (head[0] == 3) {
            if (head[1] < 0 && head[2] < 3) {
                head[0] = 1;
                head[1] = 2;
            }
            if (head[1] > (portalField[head[0]][0] - 1) && head[2] < 4) {
                head[0] = 6;
                head[1] = 0;
            }
            if (head[2] < 0) {
                head[0] = 4;
                head[2] = 2;
            }
        } else if (head[0] == 4) {
            if (head[1] > (portalField[head[0]][0] - 1)) {
                head[0] = 0;
                head[1] = 0;
            }
            if (head[2] > (portalField[head[0]][1] - 1)) {
                head[0] = 3;
                head[2] = 0;
            }
        } else if (head[0] == 5) {
            if (head[1] > (portalField[head[0]][0] - 1) && head[2] > 0) {
                head[0] = 2;
                head[1] = 0;
                head[2] = head[2] - 1;
            }
            if (head[2] > (portalField[head[0]][1] - 1)) {
                head[0] = 1;
                head[2] = 0;
            }
        } else if (head[0] == 6) {
            if (head[2] < 0 && head[1] > 3) {
                head[0] = 0;
                head[1] = head[1] - 4;
                head[2] = 5;
            }
            if (head[2] > (portalField[head[0]][1] - 1) && head[1] < 3) {
                head[0] = 2;
                head[2] = 0;
            }
            if (head[1] < 0) {
                head[0] = 3;
                head[1] = 3;
            }
            if (head[1] > (portalField[head[0]][0] - 1)) {
                head[0] = 1;
                head[1] = 0;
            }
        }
    }

    // function to eat food
    function eat() {
        if (head[0] == foodPosition[0] && head[1] == foodPosition[1] && head[2] == foodPosition[2]) {

        }
    }
}