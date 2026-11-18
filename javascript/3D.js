// code for 3D snake game
function play3D() {
    // the current rotation on the cube
    let rotateY = 0;
    let rotateX = 0;

    document.addEventListener("keydown", move);
    function move(event) {
        // get the key press
        let key = event.key;

        if (key == "w") {
            document.getElementById("DField").style.transform = `rotateX(${rotateX + 1}deg)`;
            rotateX++;
        } else if (key == "s") {
            document.getElementById("DField").style.transform = `rotateX(${rotateX - 1}deg)`;
            rotateX--;
        } else if (key == "a") {
            document.getElementById("DField").style.transform = `rotateY(${rotateY - 1}deg)`;
            rotateY--;
        } else if (key == "d") {
            document.getElementById("DField").style.transform = `rotateY(${rotateY - 1}deg)`;
            rotateY++;
        }
    }
}