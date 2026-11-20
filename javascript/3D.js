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
    let directionOffSet = 0;
    // interval that move the cube
    let moveSnakeInterval;
    // check if game is paused
    let pause = false;
    // check if died
    let dead = false;

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
        // change durection values so up is always up for top
        if (head[2] == 0) {
            if (rotateY > 45 && rotateY < 135) {
                directionOffSet = 1;
            } else if (rotateY >= 135 && rotateY < 225) {
                directionOffSet = 2;
            } else if (rotateY >= 225 && rotateY < 315) {
                directionOffSet = 3;
            } else {
                directionOffSet = 0;
            }
        }
        // change durection value so up is always up for bottom
        if (head[2] == 1) {
            if (rotateY > 45 && rotateY < 135) {
                directionOffSet = 3;
            } else if (rotateY >= 135 && rotateY < 225) {
                directionOffSet = 2;
            } else if (rotateY >= 225 && rotateY < 315) {
                directionOffSet = 1;
            } else {
                directionOffSet = 0;
            }
        }
        // change durection value of sides so up is always up
        if (head[2] == 2 || head[2] == 3 || head[2] == 4 || head[2] == 5) {
           if (rotateX > 90 && rotateX < 270) {
                directionOffSet = 2;
           }
        }
        // durection value
        let initialDurection = durection;
        if (key == "ArrowRight") {
            durection = 1 + directionOffSet;
        } else if (key == "ArrowLeft") {
            durection = 3 + directionOffSet;
        } else if (key == "ArrowUp") {
            durection = 0 + directionOffSet;
        } else if (key == "ArrowDown") {
            durection = 2 + directionOffSet;
        }
        // make sure that durection is always between 0 and 3
        while (durection > 3) {
            durection = durection - 4;
        }
        if (passedDurection == 0 && durection == 2) {
            durection = initialDurection;
        } else if (passedDurection == 1 && durection == 3) {
            durection = initialDurection;
        } else if (passedDurection == 2 && durection == 0) {
            durection = initialDurection;
        } else if (passedDurection == 3 && durection == 1) {
            durection = initialDurection;
        }

        // check for pause
        if (key == " " && dead == false) {
            if (pause == false) {
                clearInterval(moveSnakeInterval);
                document.getElementById("message").innerHTML = "Pause";
            } else if (dead == false) {
                moveSnakeInterval = setInterval(mainInterval, time);
                document.getElementById("message").innerHTML = "";
            }
            pause = !pause;
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
            rotateY--;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        if (d == true) {
            rotateY++;
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
    }

    // interval to play game
    moveSnakeInterval = setInterval(mainInterval, time);
    function mainInterval() {
        // move the snake on the field
        moveSnake();

        // add food
        food();

        // Check die
        if (die() == true) {
            clearInterval(moveSnakeInterval);
            document.getElementById("message").innerHTML = "You Lose, Score: " + score;
            dead = true;
        }
    }

    // move and change the color of the field to move snake
    function moveSnake() {
        // reset end body position
        let square = (body[0][1] * DFieldHeight) + body[0][0];
        document.getElementById(`D${body[0][2]}${square}`).style.backgroundColor = fieldColor[body[0][2]][square];

        // move body
        body.splice(0, 1);

        // add next body segment
        body[body.length] = [...head];
        document.getElementById(`D${body[body.length - 1][2]}${(body[body.length - 1][1] * DFieldHeight) + body[body.length - 1][0]}`).style.backgroundColor = bodyColor;

        // reset durection off set
        directionOffSet = 0;
        
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
        /*
        top    0
        bottom 1
        left   2
        right  3
        back   4
        front  5
        */
        // This if works after here (untested)
        // goes off 'right' of side
        if (head[0] >= DFieldWidth) {
            if (head[2] == 0) {
                directionOffSet = 1;
                head[2] = 3;
                head[0] = (DFieldWidth - 1) - head[1];
                head[1] = 0;
            } else if (head[2] == 1) {
                directionOffSet = 3;
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
                directionOffSet = 3;
                head[2] = 2;
                head[0] = head[1];
                head[1] = 0;
            } else if (head[2] == 1) {
                directionOffSet = 1;
                head[2] = 2;
                head[0] = (DFieldWidth - 1) - head[1];
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
        // This if works after here (untested)
        // goes off 'bottom' of side
        if (head[1] >= DFieldHeight) {
            if (head[2] == 0) {
                head[2] = 5;
                head[1] = 0;
            } else if (head[2] == 1) {
                directionOffSet = 2;
                head[2] = 4;
                head[1] = DFieldHeight - 1;
                head[0] = (DFieldWidth - 1) - head[0];
            } else if (head[2] == 2) {
                directionOffSet = 3;
                head[2] = 1;
                head[1] = (DFieldHeight - 1) - head[0];
                head[0] = 0;
            } else if (head[2] == 3) {
                directionOffSet = 1;
                head[2] = 1;
                head[1] = head[0];
                head[0] = DFieldWidth - 1;
            } else if (head[2] == 4) {
                directionOffSet = 2;
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
                directionOffSet = 2;
                head[2] = 4;
                head[0] = (DFieldWidth - 1) - head[0];
                head[1] = 0;
            } else if (head[2] == 1) {
                head[2] = 5;
                head[1] = DFieldHeight - 1;
            } else if (head[2] == 2) {
                directionOffSet = 1;
                head[2] = 0;
                head[1] = head[0];
                head[0] = 0;
            } else if (head[2] == 3) {
                directionOffSet = 3;
                head[2] = 0;
                head[1] = (DFieldHeight - 1) - head[0];
                head[0] = DFieldWidth - 1;
            } else if (head[2] == 4) {
                directionOffSet = 2;
                head[2] = 0;
                head[0] = (DFieldWidth - 1) - head[0];
                head[1] = 0;
            } else if (head[2] == 5) {
                head[2] = 0;
                head[1] = DFieldHeight - 1;
            }
        }


        // change durection of move
        durection = durection + directionOffSet;
        while (durection > 3) {
            durection = durection - 4;
        }
        // set passed direction
        passedDurection = durection;

        square = (head[1] * DFieldWidth) + head[0];

        // color the field to show snake
        document.getElementById(`D${head[2]}${square}`).style.backgroundColor = headColor;
    }

    // place food on the field
    function food() {
        for (let i = 0; i < foodNumber; i++) {
            if (foodPosition[i][0] == head[0] && foodPosition[i][1] == head[1] && foodPosition[i][2] == head[2]) {
                // increase snake length
                body.splice(0, 0, [...body[0]]);

                // reposition food
                let x = Math.floor(Math.random() * DFieldWidth);
                let y = Math.floor(Math.random() * DFieldHeight);
                let side = Math.floor(Math.random() * 6);

                foodPosition[i] = [x, y, side];

                // increase score
                score++;
            }
        }
        // make the food show up
        for (let i = 0; i < foodNumber; i++) {
            let square = (foodPosition[i][1] * DFieldHeight) + foodPosition[i][0];
            document.getElementById(`D${foodPosition[i][2]}${square}`).style.backgroundColor = foodColor;
        }
    }

    // check if snaked died
    function die() {
        for (let i = 0; i < body.length; i++) {
            if (body[i][0] == head[0] && body[i][1] == head[1] && body[i][2] == head[2]) {
                return true;
            }
        }

        return false;
    }
}