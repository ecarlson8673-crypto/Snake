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
            rotateX++;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else if (key == "s") {
            rotateX--;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else if (key == "a") {
            rotateY--;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else if (key == "d") {
            rotateY++;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    }
}