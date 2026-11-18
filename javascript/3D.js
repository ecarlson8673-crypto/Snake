// code for 3D snake game
function play3D() {
    // the current rotation on the cube
    let rotateY = 0;
    let rotateX = 0;
    // check if these keys are down
    let w = false;
    let s = false;
    let d = false;
    let a = false;
    let Up = false;
    let Down = false;
    let Left = false;
    let Right = false;

    // check if a key is pressed
    document.addEventListener("keydown", keyDown);
    function keyDown(event) {
        // get the key press
        let key = event.key;

        if (key == "w") {
            w = true;
        } else if (key == "s") {
            s = true;
        } else if (key == "a") {
            a = true;
        } else if (key == "d") {
            d = true;
        }
    }
    // check if a key is released
    document.addEventListener("keyup", keyUp);
    function keyUp(event) {
        let key = event.key;

        if (key == "w") {
            w = false;
        } else if (key == "s") {
            s = false;
        } else if (key == "a") {
            a = false;
        } else if (key == "d") {
            d = false;
        }
    }
    // move the cube every 10 ms
    setInterval(moveCube, 10);
    function moveCube() {
        if (w == true) {
            rotateX++;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        if (s == true) {
            rotateX--;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        if (a == true) {
            rotateY--;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        if (d == true) {
            rotateY++;
            document.getElementById("DField").style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    }
}