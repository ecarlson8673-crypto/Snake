// initialization for different games
function initializeOriginal() {
    // clear screen
    clearOptions();

    // create the field
    for (let i = 0; i < originalFieldWidth * originalFieldHeight; i++) {
        let div = document.createElement("div");
        div.classList.add("fieldSquare");
        div.id = `original${i}`;
        if (i % 2 == 0) {
            div.style.backgroundColor = `rgb(${0}, ${200}, ${0})`;
        } else {
            div.style.backgroundColor = `rgb(${0}, ${255}, ${0})`;
        }
        document.getElementById("originalContainer").appendChild(div);
    }

    // set up snake
    document.getElementById(`original${220}`).style.backgroundColor = `rgb(${0}, ${0}, ${175})`;
    // body
    document.getElementById(`original${219}`).style.backgroundColor = `rgb(${0}, ${0}, ${225})`;
    document.getElementById(`original${218}`).style.backgroundColor = `rgb(${0}, ${0}, ${225})`;
    document.getElementById(`original${217}`).style.backgroundColor = `rgb(${0}, ${0}, ${225})`;
    
    // be able to move the snake
    playOriginal();
}

// function to clear screen after user chooses a game
function clearOptions() {
    document.getElementById("titles").style.display = "none";
}