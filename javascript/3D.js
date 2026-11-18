// code for 3D snake game
function play3D() {
    // the current rotation on the cube
    let rotateY = 0;
    let rotateX = 0;
    // check if these keys are down
    let w = false;
    let s = false;
    let d = false;
    let a = false;
    let Up = false;
    let Down = false;
    let Left = false;
    let Right = false;

    // check if a key is pressed
    document.addEventListener("keydown", keyDown);
    function keyDown(event) {
        // get the key press
        let key = event.key;

        if (key == "w") {
            w = true;
        } else if (key == "s") {
            s = true;
        } else if (key == "a") {
            a = true;
        } else if (key == "d") {
            d = true;
        }
        if (key == "ArrowRight") {
            Right = true;
        } else if (key == "ArrowLeft") {
            Left = true;
        } else if (key == "ArrowUp") {
            Up = true;
        } else if (key == "ArrowDown") {
            Down = true;
        }
    }
    // check if a key is released
    document.addEventListener("keyup", keyUp);
    function keyUp(event) {
        let key = event.key;

        if (key == "w") {
            w = false;
        } else if (key == "s") {
            s = false;
        } else if (key == "a") {
            a = false;
        } else if (key == "d") {
            d = false;
        }
        if (key == "ArrowRight") {
            Right = false;
        } else if (key == "ArrowLeft") {
            Left = false;
        } else if (key == "ArrowUp") {
            Up = false;
        } else if (key == "ArrowDown") {
            Down = false;
        }
    }
    // move the cube every 10 ms
    setInterval(moveCube, 10);
    function moveCube() {
        if (w == true) {
            rotateX++;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        if (s == true) {
            rotateX--;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        if (a == true) {
            rotateY--;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        if (d == true) {
            rotateY++;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        if (Right == true) {
            snakeRight();
            document.getElementById("message").innerHTML = "right: " + head[0];
        }
        if (Left == true) {
            snakeLeft();
            document.getElementById("message").innerHTML = "left: " + head[0];
        }
        if (Up == true) {

        }
        if (Down == true) {

        }
    }
    function snakeRight() {
        head[0]++;
        for (let i = 0; i < 6; i++) {
            document.getElementsByClassName("head")[i].style.left = `${head[0]}px`;
        }
    }
    function snakeLeft() {
        head[0]--;
        for (let i = 0; i < 6; i++) {
            document.getElementsByClassName("head")[i].style.left = `${head[0]}px`;
        }
    }
    function snakeUp() {

    }
    function snakeDown() {

    }
}