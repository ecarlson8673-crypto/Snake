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
        //document.getElementById(`portal${head[0]}${head[1]}`).style.backgroundColor = fieldColor[head[0]][head[1]];
        // move snake depending on durection
        if (durection == "ArrowRight") {
            head[1]++;
        } else if (durection == "ArrowLeft") {
            head[1]--;
        } else if (durection == "ArrowDown") {
            head[1] = head[1] + portalField[head[0]][0];
        } else if (durection == "ArrowUp") {
            head[1] = head[1] - portalField[head[0]][0];
        }

        // color tile with head on it
        document.getElementById(`portal${head[0]}${head[1]}`).style.backgroundColor = headColor;
    }
}