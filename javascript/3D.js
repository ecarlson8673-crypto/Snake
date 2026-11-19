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
    // if cube is turned keep up always up
    let durectionOffSet = 0;

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
        // durection value
        if (key == "ArrowRight") {
            durection = 1;
        } else if (key == "ArrowLeft") {
            durection = 3;
        } else if (key == "ArrowUp") {
            durection = 0;
        } else if (key == "ArrowDown") {
            durection = 2;
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
            rotateY++;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        if (d == true) {
            rotateY--;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        if (rotateX >= 360) {
            rotateX = 0;
        } else if (rotateX < 0) {
            rotateX = 360;
        }
        if (rotateY >= 360) {
            rotateY = 0;
        } else if (rotateY < 0) {
            rotateY = 360;
        }
        document.getElementById("message").innerHTML = "rotate Y: " + rotateY;
    }

    // interval to play game
    setInterval(mainInterval, time);
    function mainInterval() {
        // move the snake on the field
        moveSnake();
    }

    // move and change the color of the field to move snake
    function moveSnake() {
        // reset durection off set
        durectionOffSet = 0;
        // reset old head position
        let square = (head[1] * DFieldWidth) + head[0];
        document.getElementById(`D${head[2]}${square}`).style.backgroundColor = fieldColor[head[2]][square];
        
        // move snake variable
        if (durection == 1) {
            head[0] += 1;
        }
        if (durection == 3) {
            head[0] -= 1;
        }
        if (durection == 0) {
            head[1] -= 1;
        }
        if (durection == 2) {
            head[1] += 1;
        }
        
        // check if snake has moved to a different side of cube
        // GOING TO BOTTOM NEEDS WORK
        // This if works after here (untested)
        // goes off 'right' of side
        if (head[0] >= DFieldWidth) {
            if (head[2] == 0) {
                head[2] = 3;
                head[0] = (DFieldWidth - 1) - head[1];
                head[1] = 0;
            } else if (head[2] == 1) {
                durectionOffSet = 3;
                head[2] = 3;
                head[0] = head[1];
                head[1] = DFieldHeight - 1;
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
        // This if works after here (untested)
        // goes off 'left' of side
        if (head[0] < 0) {
            if (head[2] == 0) {
                durectionOffSet = 3;
                head[2] = 2;
                head[0] = head[1];
                head[1] = 0;
            } else if (head[2] == 1) {
                durectionOffSet = 1;
                head[2] = 2;
                head[0] = head[1];
                head[1] = DFieldWidth - 1;
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
        /*
        top    0
        bottom 1
        left   2
        right  3
        back   4
        front  5
        */
        // This if works after here (untested)
        // goes off 'bottom' of side
        if (head[1] >= DFieldHeight) {
            if (head[2] == 0) {
                head[2] = 5;
                head[1] = 0;
            } else if (head[2] == 1) {
                durectionOffSet = 2;
                head[2] = 4;
                head[1] = DFieldHeight - 1;
                head[0] = (DFieldWidth - 1) - head[0];
            } else if (head[2] == 2) {
                durectionOffSet = 3;
                head[2] = 1;
                head[1] = (DFieldHeight - 1) - head[0];
                head[0] = 0;
            } else if (head[2] == 3) {
                durectionOffSet = 1;
                head[2] = 1;
                head[1] = head[0];
                head[0] = DFieldWidth - 1;
            } else if (head[2] == 4) {
                durectionOffSet = 2;
                head[2] = 1;
                head[0] = (DFieldWidth - 1) - head[0];
                head[1] = (DFieldHeight - 1);
            } else if (head[2] == 5) {
                head[2] = 1;
                head[1] = 0;
                head[0] = head[0];
            }
        }
        // This if works after here (untested)
        // goes off 'top' of side
        if (head[1] < 0) {
            if (head[2] == 0) {
                durectionOffSet = 2;
                head[2] = 4;
                head[0] = (DFieldWidth - 1) - head[0];
                head[1] = 0;
            } else if (head[2] == 1) {
                head[2] = 5;
                head[1] = DFieldHeight - 1;
            } else if (head[2] == 2) {
                durectionOffSet = 1;
                head[2] = 0;
                head[1] = head[0];
                head[0] = 0;
            } else if (head[2] == 3) {
                durectionOffSet = 3;
                head[2] = 0;
                head[1] = (DFieldHeight - 1) - head[0];
                head[0] = DFieldWidth - 1;
            } else if (head[2] == 4) {
                durectionOffSet = 2;
                head[2] = 0;
                head[0] = (DFieldWidth - 1) - head[0];
                head[1] = 0;
            } else if (head[2] == 5) {
                head[2] = 0;
                head[1] = DFieldHeight - 1;
            }
        }


        // change durection of move
        durection = durection + durectionOffSet;
        while (durection > 3) {
            durection = durection - 4;
        }

        square = (head[1] * DFieldWidth) + head[0];

        // color the field to show snake
        document.getElementById(`D${head[2]}${square}`).style.backgroundColor = `rgb(${0}, ${0}, ${0})`;
    }
}