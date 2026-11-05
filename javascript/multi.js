// function for the multi game
function playMulti() {
    let multiInterval;
    // the field that is currently being used
    let whichField = 1;

    // check for key event
    document.addEventListener("keydown", keyEvent);
    function keyEvent(event) {
        let key = event.key;

        if (key.includes("Arrow") == true) {
            if (pastDurection == "ArrowRight" && key != "ArrowLeft" || pastDurection == "ArrowLeft" && key != "ArrowRight" || PastDurection == "ArrowUp" && key != "ArrowDown" || pastDurection == "ArrowDown" && key != "ArrowUp") {
                durection = key;
            }
        }
    }

    // move snakes
    multiInterval = setInterval(moveMulti, time);
    function moveMulti() {
        // change field to simulate moving
        changeField();

        // move the body and head of snake
        moveBody();
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

        } else if (durection == "ArrowLeft") {

        } else if (durection == "ArrowUp") {

        } else if (durection == "ArrowDown") {

        }

        // recolor body after movement
        for (let i = 0; i < moveBody.length; i++) {
            document.getElementById(`multi${body[i]}`).style.backgroundColor = `rgb(${0}, ${0}, ${225})`;
        }

        // change the past durection
        pastDurection = durection;

    }
}