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
            document.getElementById("message").innerHTML = rotateX;
        } else if (key == "s") {

        } else if (key == "a") {

        } else if (key == "d") {

        }
    }
}