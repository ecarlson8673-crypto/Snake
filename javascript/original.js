// function for snake game
function playOriginal() {
    // check if a key is pressed
    document.addEventListener("keydown", keyChange);
    function keyChange(event) {
        // get the key that was pressed
        let key = event.key;

        // set durection for snake to go
        durection = key;
    }

    // move the snake
    setInterval(moveOriginal, time);
    function moveOriginal() {
        // move snake based on arrows
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
    }
}