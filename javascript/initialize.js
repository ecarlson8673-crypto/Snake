// initialization for different games
function initializeSnake() {
    // clear screen
    clearOptions();

    // create the field
    for (let i = 0; i > snakeFieldWidth * snakeFieldHeight; i++) {
        let div = document.createElement("div");
        div.classList.add("fieldSquare");
        div.id = `snake${i}`;
        if (i == 0) {
            div.style.backgroundColor = `rgb(${0}, ${200}, ${0})`;
        } else {
            div.style.backgroundColor = `rgb(${0}, ${255}, ${0})`;
        }
        document.getElementById("snakeContainer").appendChild(div);
    }
}

// function to clear screen after user chooses a game
function clearOptions() {
    document.getElementById("titles").style.display = "none";
}