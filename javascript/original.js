// function for snake game
function playOriginal() {
    // variable to hold move interval
    let originalInterval;
    // wether paused or not
    let pause = false;

    // check if a key is pressed
    document.addEventListener("keydown", keyChange);
    function keyChange(event) {
        // get the key that was pressed
        let key = event.key;

        // set durection for snake to go
        if (key.includes("Arrow") == true && pastDurection != key) {
            durection = key;
        }

        // pause button
        if (key == " ") {
            if (pause == false) {
                clearInterval(originalInterval);
            } else {
                originalInterval = setInterval(moveOriginal, time);
            }
            pause = !pause;
        }
    }

    // move the snake
    originalInterval = setInterval(moveOriginal, time);
    function moveOriginal() {
        // move body
        moveBodyOriginal();

        // move snake head based on arrows
        if (durection == "ArrowRight") {
            if (head + 1 < originalFieldWidth * originalFieldHeight) {
                document.getElementById(`original${head + 1}`).style.backgroundColor = `rgb(${0}, ${0}, ${175})`;
            }
            head = head + 1;
        } else if (durection == "ArrowLeft") {
            if (head - 1 >= 0) {
                document.getElementById(`original${head - 1}`).style.backgroundColor = `rgb(${0}, ${0}, ${175})`;
            }
            head = head - 1;
        } else if (durection == "ArrowUp") {
            if (head - originalFieldWidth >= 0) {
                document.getElementById(`original${head - originalFieldWidth}`).style.backgroundColor = `rgb(${0}, ${0}, ${175})`;
            }
            head = head - originalFieldWidth;
        } else if (durection == "ArrowDown") {
            if (head + originalFieldWidth < originalFieldWidth * originalFieldHeight) {
                document.getElementById(`original${head + originalFieldWidth}`).style.backgroundColor = `rgb(${0}, ${0}, ${175})`;
            }
            head = head + originalFieldWidth;
        }

        // check if snake ate food
        eat();

        // check for win
        if (win() == true) {
            document.getElementById("message").innerHTML = "You won";
        }

        // check if snake die
        if (die() == true) {
            document.getElementById("message").innerHTML = "You lost";
            clearInterval(originalInterval);
        }

        // change the past value of the durection
        pastDurection = durection;
    }

    // move the body of the snake
    function moveBodyOriginal() {
        // if paused do not move
        if (pause == true) {
            return;
        }
        // else move
        document.getElementById(`original${body[0]}`).style.backgroundColor = fieldColor[body[0]];
        body.splice(0, 1);
        body[body.length] = head;
        document.getElementById(`original${body[body.length - 1]}`).style.backgroundColor = `rgb(${0}, ${0}, ${225})`;
    }

    // check if snake has eaten food
    function eat() {
        for (let i = 0; i < foodNumber; i++) {
            if (head == foodPosition[i]) {
                // increase the length of body
                body.splice(0, 0, body[0]);

                // check if food is in body or not
                let foodInBody = false;
                do {
                    foodPosition[i] = Math.floor(Math.random() * ((originalFieldWidth * originalFieldHeight) - 1));
                    foodInBody = false;
                    for (let j = 0; j < body.length; j++) {
                        if (foodPosition[i] == body[j]) {
                            foodInBody = true;
                        }
                    }
                } while (foodInBody == true);
                document.getElementById(`original${foodPosition[i]}`).style.backgroundColor = `rgb(${255}, ${0}, ${0})`;
            }
        }
    }

    // function to check if snake dies
    function die() {
        // check if snake hit itself
        for (let i = 0; i < body.length; i++) {
            if (body[i] == head) {
                // die
                return true;
            }
        }

        // check if snake hit wall
        if (durection == "ArrowRight") {
            if ((head) % originalFieldWidth == 0  && head != 1) {
                return true;
            }
        } else if (durection == "ArrowLeft") {
            if ((head - 1) % (originalFieldWidth) == 0) {
                return true;
            }
        } else if (durection == "ArrowUp") {
            if (head < 0) {
                return true;
            }
        } else if (durection == "ArrowDown") {
            if (head > originalFieldWidth * originalFieldHeight) {
                return true;
            }
        }
        // if did not die return false
        return false;
    }

    // win if snake is as long as big as field
    function win() {
        if (body.length - 1 == originalFieldWidth * originalFieldHeight) {
            return true;
        }
        return false;
    }
}