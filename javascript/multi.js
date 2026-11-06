// function for the multi game
function playMulti() {
    let multiInterval;
    // the field that is currently being used
    let whichField = 1;
    // wether paused
    let pause = false;

    // check for key event
    document.addEventListener("keydown", keyEvent);
    function keyEvent(event) {
        let key = event.key;

        // change durection of snake
        if (key.includes("Arrow") == true) {
            if (pastDurection == "ArrowRight" && key != "ArrowLeft" || pastDurection == "ArrowLeft" && key != "ArrowRight" || pastDurection == "ArrowUp" && key != "ArrowDown" || pastDurection == "ArrowDown" && key != "ArrowUp") {
                durection = key;
            }
        }

        // pause
        if (key == " ") {
            if (pause == true) {
                document.getElementById("message").innerHTML = "Pause";
                document.getElementById("settings").style.display = "";
            } else {
                document.getElementById("message").innerHTML = "";
                document.getElementById("settings").style.display = "none";
            }
            pause = !pause;
        }
    }

    // move snakes
    multiInterval = setInterval(moveMulti, time);
    function moveMulti() {
        // change field to simulate moving
        changeField();

        // move the body and head of snake
        moveBody();

        // show food
        showFood();
    }

    // change the field
    function changeField() {
        if (whichField == 1) {
            whichField = 2;
            for (let i = 0; i < multiFieldWidth * multiFieldHeight; i++) {
                document.getElementById(`multi${i}`).style.backgroundColor = field2[i];
            }
        } else {
            whichField = 1;
            for (let i = 0; i < multiFieldWidth * multiFieldHeight; i++) {
                document.getElementById(`multi${i}`).style.backgroundColor = field1[i];
            }
        }
    }

    // move the body
    function moveBody() {
        // recolor head
        document.getElementById(`multi${60}`).style.backgroundColor = `rgb(${0}, ${0}, ${175})`;

        // move body
        if (durection == "ArrowRight") {
            body.splice(0, 1);
            for (let i = 0; i < body.length; i++) {
                body[i] = body[i] - 1;
            }
            body[body.length] = head - 1;
            // change the actual position of snake relative to larger field
            viewPort = viewPort + 1;
        } else if (durection == "ArrowLeft") {
            body.splice(0, 1);
            for (let i = 0; i < body.length; i++) {
                body[i] = body[i] + 1;
            }
            body[body.length] = head + 1;
            // change the actual position of snake relative to larger field
            viewPort = viewPort - 1;
        } else if (durection == "ArrowUp") {
            body.splice(0, 1);
            for (let i = 0; i < body.length; i++) {
                body[i] = body[i] + multiFieldWidth;
            }
            body[body.length] = head + multiFieldWidth;
            // change the actual position of snake relative to larger field
            viewPort = viewPort - totalFieldWidth;
        } else if (durection == "ArrowDown") {
            body.splice(0, 1);
            for (let i = 0; i < body.length; i++) {
                body[i] = body[i] - multiFieldWidth;
            }
            body[body.length] = head - multiFieldWidth;
            // change the actual position of snake relative to larger field
            viewPort = viewPort + totalFieldWidth;
        }

        // recolor body after movement
        for (let i = 0; i < body.length; i++) {
            if (body[i] >= 0 && body[i] < multiFieldWidth * multiFieldHeight) {
                document.getElementById(`multi${body[i]}`).style.backgroundColor = `rgb(${0}, ${0}, ${225})`;
            }
        }

        // change the past durection
        pastDurection = durection;
    }

    // function to display food
    function showFood() {
        for (let i = 0; i < foodNumber; i++) {
            if (foodPosition[i] - viewPort >= 0 || foodPosition[i] - viewPort < multiFieldWidth * multiFieldHeight) {
                document.getElementById(`multi${foodPosition[i]}`).style.backgroundColor = `rgb(${255}, ${0}, ${0})`;
            }
        }
    }
}