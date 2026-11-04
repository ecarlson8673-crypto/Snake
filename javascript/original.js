// function for snake game
function playOriginal() {
    document.addEventListener("keydown", moveSnake);
    function moveSnake(event) {
        let key = event.key;
        document.getElementById("ex").innerHTML = key;
    }
}