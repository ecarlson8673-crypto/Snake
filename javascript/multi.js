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
            if (pause == false) {
                clearInterval(multiInterval);
                document.getElementById("message").innerHTML = "Pause";
            } else {
                multiInterval = setInterval(moveMulti, time);
                document.getElementById("message").innerHTML = "";
            }
            pause = !pause;
        }
    }

    // move snakes
    multiInterval = setInterval(moveMulti, time);
    function moveMulti() {
        document.getElementById("ex").innerHTML = viewPortX + " " + viewPortY;
        // change field to simulate moving
        changeField();

        // move the body and head of snake
        moveBody();

        // show food
        //showFood();

        // function to add borders
        borders();
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
            viewPortX = viewPortX + 1;
        } else if (durection == "ArrowLeft") {
            body.splice(0, 1);
            for (let i = 0; i < body.length; i++) {
                body[i] = body[i] + 1;
            }
            body[body.length] = head + 1;
            // change the actual position of snake relative to larger field
            viewPortX = viewPortX - 1;
        } else if (durection == "ArrowUp") {
            body.splice(0, 1);
            for (let i = 0; i < body.length; i++) {
                body[i] = body[i] + multiFieldWidth;
            }
            body[body.length] = head + multiFieldWidth;
            // change the actual position of snake relative to larger field
            viewPortY = viewPortY - 1;
        } else if (durection == "ArrowDown") {
            body.splice(0, 1);
            for (let i = 0; i < body.length; i++) {
                body[i] = body[i] - multiFieldWidth;
            }
            body[body.length] = head - multiFieldWidth;
            // change the actual position of snake relative to larger field
            viewPortY = viewPortY + 1;
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
            if (foodPosition[i][0] > viewPortX && foodPosition[i][0] < viewPortX + totalFieldWidth && foodPosition[i][1] > viewPortY && foodPosition[i][1] < viewPortY + totalFieldHeight) {
                let position = (foodPosition[i][0] - viewPortX) + ((foodPosition[i][1] - viewPortY - 1) * multiFieldWidth);
                document.getElementById(`multi${position}`).style.backgroundColor = `rgb(${255}, ${0}, ${0})`;
            }
        }
    }

    // add borders to field
    function borders() {
        // if view port x is less than 1 then the upper left corner is off field
        if (viewPortX < 1) {
            // the tiles to change color of
            let changeColor = 0;
            for (let i = 0; i < (viewPortX * -1) * multiFieldHeight; i++) {
                document.getElementById(`multi${changeColor}`).style.backgroundColor = `rgb(${200}, ${200}, ${200})`;
                if ((i + 1) % (viewPortX * -1) == 0) {
                    changeColor = changeColor + multiFieldWidth + viewPortX + 1;
                } else {
                    changeColor = changeColor + 1;
                }
            }
        }
        // if view port y if less than 1 then the upper left corner if off field
        if (viewPortY < 1) {
            for (let i = 0; i < (viewPortY * - 1) * multiFieldWidth; i++) {
                document.getElementById(`multi${i}`).style.backgroundColor = `rgb(${200}, ${200}, ${200})`;
            }
        }
        // if the view port x is greater than 33
        if (viewPortX > totalFieldWidth - multiFieldWidth) {
            let changeColor = totalFieldWidth - viewPortX;
            for (let i = 0; i < (multiFieldWidth - (multiFieldWidth - viewPortX)) * multiFieldHeight; i++) {
                document.getElementById(`multi${changeColor}`).style.backgroundColor = `rgb(${200}, ${200}, ${200})`;
                if ((i + 1) % (multiFieldWidth - (totalFieldWidth - viewPortX)) == 0) {
                    changeColor = changeColor + 1 + (totalFieldWidth - viewPortX);
                } else {
                    changeColor = changeColor + 1;
                }
            }
        }
        // if the view port y is greater than 33
        if (viewPortY > totalFieldHeight - multiFieldHeight) {
            for (let i = 0; i < (multiFieldHeight - (multiFieldHeight - viewPortY)) * multiFieldWidth; i++) {
                document.getElementById(`multi${i}`).style.backgroundColor = `rgb(${200}, ${200}, ${200})`;
            }
        }
    }
}