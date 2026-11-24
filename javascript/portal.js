// function to play the portal game
function playPortal() {
    document.addEventListener("keydown", keyDown);
    function keyDown(event) {
        let key = event.key;

        // if arrow key then change durection
        if (key.includes("Arrow")) {
            durection = key;
        }
    }

    // interval where snake is moved
    setInterval(movePortal, time);
    function movePortal() {
        // move snake around field
        moveSnake();
    }

    // move the snake
    function moveSnake() {
        // recolor tile head was on
        document.getElementById(`portal${head[0]}${(head[2] * portalField[head[0]][0]) + head[1]}`).style.backgroundColor = fieldColor[head[0]][head[1]];
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
            if (head[1] < 0) {
                head[0] = 4;
            }
            if (head[2] < 0) {
                head[0] = 2;
            }
            if (head[2] > portalField[head[0]][1]) {
                head[0] = 6;
            }
        } else if (head[0] == 1) {
            if (head[1] < 0) {
                head[0] = 6;
            }
            if (head[1] > portalField[head[0]][0]) {
                head[0] = 3;
            }
            if (head[2] < 0) {
                head[0] = 5;
            }
        } else if (head[0] == 2) {
            if (head[1] < 0) {
                head[0] = 5;
            }
            if (head[2] < 0) {
                head[0] = 6;
            }
            if (head[2] > portalField[head[0]][1]) {
                head[0] = 0;
            }
        } else if (head[0] == 3) {
            if (head[1] < 0) {
                head[0] = 1;
            }
            if (head[1] > portalField[head[0]][0]) {
                head[0] = 0;
            }
            if (head[2] < 0) {
                head[0] = 4;
            }
        } else if (head[0] == 4) {
            if (head[1] > portalField[head[0]][0]) {
                head[0] = 0;
            }
            if (head[2] > portalField[head[0]][1]) {
                head[0] = 3;
            }
        } else if (head[0] == 5) {
            if (head[1] > portalField[head[0]][0]) {
                head[0] = 2;
            }
            if (head[2] > portalField[head[0]][1]) {
                head[0] = 1;
            }
        } else if (head[0] == 6) {
            if (head[2] < 0) {
                head[0] = 0;
            }
            if (head[2] > portalField[head[0]][1]) {
                head[0] = 2;
            }
            if (head[1] < 0) {
                head[0] = 3;
            }
            if (head[1] < portalField[head[0]][0]) {
                head[0] = 1;
            }
        }
    }
}