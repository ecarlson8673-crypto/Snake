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
        if (key.includes("Arrow") == true) {
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
            document.getElementById(`original${head + 1}`).style.backgroundColor = `rgb(${0}, ${0}, ${175})`;
            head = head + 1;
        } else if (durection == "ArrowLeft") {
            document.getElementById(`original${head - 1}`).style.backgroundColor = `rgb(${0}, ${0}, ${175})`;
            head = head - 1;
        } else if (durection == "ArrowUp") {
            document.getElementById(`original${head - originalFieldWidth}`).style.backgroundColor = `rgb(${0}, ${0}, ${175})`;
            head = head - originalFieldWidth;
        } else if (durection == "ArrowDown") {
            document.getElementById(`original${head + originalFieldWidth}`).style.backgroundColor = `rgb(${0}, ${0}, ${175})`;
            head = head + originalFieldWidth;
        }

        // check if snake ate food
        eat();

        // check if snake die
        if (die() == true) {
            document.getElementById("message").innerHTML = "You lost";
            clearInterval(originalInterval);
        }
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
            if (head - 1 % originalFieldWidth == 0) {
                return true;
            }
        } else if (durection == "ArrowLeft") {
            if (head + 1 % originalFieldWidth + 1 == 0) {
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
}