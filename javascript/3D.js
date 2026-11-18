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
            clearKey();
            Right = true;
        } else if (key == "ArrowLeft") {
            clearKey();
            Left = true;
        } else if (key == "ArrowUp") {
            clearKey();
            Up = true;
        } else if (key == "ArrowDown") {
            clearKey();
            Down = true;
        }
    }
    function clearKey() {
        Right = false;
        Left = false;
        Up = false;
        Down = false;
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
    }

    // interval to play game
    setInterval(mainInterval, time);
    function mainInterval() {
        // move the snake on the field
        moveSnake();
    }

    // move and change the color of the field to move snake
    function moveSnake() {
        // reset old head position
        let square = (head[1] * DFieldWidth) + head[0];
        document.getElementById(`D${head[2]}${square}`).style.backgroundColor = fieldColor[head[2]][square];
        
        // move snake variable
        if (Right == true) {
            head[0] += 1;
        }
        if (Left == true) {
            head[0] -= 1;
        }
        if (Up == true) {
            head[1] -= 1;
        }
        if (Down == true) {
            head[1] += 1;
        }

        // check if snake has moved to a different side of cube
        /*
        top    0
        bottom 1
        left   2
        right  3
        back   4
        front  5
        */
        if (head[0] >= DFieldWidth) {
            if (head[2] == 0) {
                head[2] = 3;
                head[0] = 0;
            } else if (head[2] == 1) {
                head[2] = 3;
                head[0] = 0;
            } else if (head[2] == 2) {
                head[2] = 5;
                head[0] = 0;
            } else if (head[2] == 3) {
                head[2] = 4;
                head[0] = 0;
            } else if (head[2] == 4) {
                head[2] = 2;
                head[0] = 0;
            } else if (head[2] == 5) {
                head[2] = 3;
                head[0] = 0;
            }
        }
        if (head[0] < 0) {
            if (head[2] == 0) {
                head[2] = 2;
                head[0] = DFieldWidth - 1;
            } else if (head[2] == 1) {
                head[2] = 2;
                head[0] = DFieldWidth - 1;
            } else if (head[2] == 2) {
                head[2] = 4;
                head[0] = DFieldWidth - 1;
            } else if (head[2] == 3) {
                head[2] = 5;
                head[0] = DFieldWidth - 1;
            } else if (head[2] == 4) {
                head[2] = 3;
                head[0] = DFieldWidth - 1;
            } else if (head[2] == 5) {
                head[2] = 2;
                head[0] = DFieldWidth - 1;
            }
        }
        if (head[1] >= DFieldHeight) {
            if (head[2] == 0) {
                head[2] = 4;
                head[1] = 0;
            } else if (head[2] == 1) {
                head[2] = 5;
                head[1] = 0;
            } else if (head[2] == 2) {
                head[2] = 1;
                head[1] = 0;
            } else if (head[2] == 3) {
                head[2] = 1;
                head[1] = 0;
            } else if (head[2] == 4) {
                head[2] = 1;
                head[1] = 0;
            } else if (head[2] == 5) {
                head[2] = 1;
                head[1] = 0;
            }
        }
        if (head[1] < 0) {
            if (head[2] == 0) {
                head[2] = 5;
                head[1] = DFieldHeight - 1;
            } else if (head[2] == 1) {
                head[2] = 4;
                head[1] = DFieldHeight - 1;
            } else if (head[2] == 2) {
                head[2] = 0;
                head[1] = DFieldHeight - 1;
            } else if (head[2] == 3) {
                head[2] = 0;
                head[1] = DFieldHeight - 1;
            } else if (head[2] == 4) {
                head[2] = 0;
                head[1] = DFieldHeight - 1;
            } else if (head[2] == 5) {
                head[2] = 0;
                head[1] = DFieldHeight - 1;
            }
        }

        square = (head[1] * DFieldWidth) + head[0];

        // color the field to show snake
        document.getElementById(`D${head[2]}${square}`).style.backgroundColor = `rgb(${0}, ${0}, ${0})`;
        document.getElementById("message").innerHTML = "works";
    }
}