{
    // change color of snake
    let currentColor = 0;
    let headExample = 3;
    let bodyExample = [0, 1, 2];
    function colorLeft() {
        if (currentColor < 1) {
            currentColor = 2;
        } else {
            currentColor--;
        }
        updateColor();
    }
    function colorRight() {
        if (currentColor > 1) {
            currentColor = 0;
        } else {
            currentColor++;
        }
        updateColor();
    }

    function updateColor() {
        if (currentColor == 0) {
            headColor = `rgb(${0}, ${0}, ${175})`;
            bodyColor = `rgb(${0}, ${0}, ${225})`;
            document.getElementById("colorName").innerHTML = "Blue";
        } else if (currentColor == 1) {
            headColor = `rgb(${175}, ${0}, ${0})`;
            bodyColor = `rgb(${225}, ${0}, ${0})`;
            document.getElementById("colorName").innerHTML = "Red";
        } else if (currentColor == 2) {
            headColor = `rgb(${0}, ${130}, ${0})`;
            bodyColor = `rgb(${0}, ${220}, ${0})`;
            document.getElementById("colorName").innerHTML = "Green";
        }
    }   

    // change type (color) of food
    let currentFood = 0;
    let positionOfFood = 0;
    function foodLeft() {
        if (currentFood < 1) {
            currentFood = 2;
        } else {
            currentFood--;
        }
        updateFood();
    }
    function foodRight() {
        if (currentFood > 1) {
            currentFood = 0;
        } else {
            currentFood++;
        }
        updateFood();
    }
    function updateFood() {
        if (currentFood == 0) {
            foodColor = `rgb(${255}, ${0}, ${0})`;
            document.getElementById("foodName").innerHTML = "Cherry";
        } else if (currentFood == 1) {
            foodColor = `rgb(${0}, ${175}, ${0})`;
            document.getElementById("foodName").innerHTML = "Apple";
        } else if (currentFood == 2) {
            foodColor = `rgb(${0}, ${0}, ${255})`;
            document.getElementById("foodName").innerHTML = "Blue Berry";
        }
    }
    // change number of food
    function numberLeft() {
        if (foodNumber > 1) {
            foodNumber--;
        }
    }
    function numberRight() {
        if (foodNumber < 10) {
            foodNumber++;
        }
    }

    // change speed
    let speedHead = 8;
    let speedBody = [5, 6, 7];
    function speedRight() {
        if (time == 250) {
            time = 150;
            document.getElementById("speedName").innerHTML = "150%";
        } else if (time == 150) {
            time = 100;
            document.getElementById("speedName").innerHTML = "200%";
        } else if (time == 100) {
            time = 350;
            document.getElementById("speedName").innerHTML = "50%";
        } else if (time == 350) {
            time = 250;
            document.getElementById("speedName").innerHTML = "100%";
        }
    }
    function speedLeft() {
        if (time == 250) {
            time = 350;
            document.getElementById("speedName").innerHTML = "50%";
        } else if (time == 350) {
            time = 100;
            document.getElementById("speedName").innerHTML = "200%";
        } else if (time == 100) {
            time = 150;
            document.getElementById("speedName").innerHTML = "150%";
        } else if (time == 150) {
            time = 250;
            document.getElementById("speedName").innerHTML = "100%";
        }
    }

    // interval to display settings in example
    let startTime = new Date().getTime();
    setInterval(examples, 2);
    function examples() {
        // check if time amount of time has passed
        let currentTime = new Date().getTime();
        if (startTime + time < currentTime) {
            startTime = new Date().getTime();

            // for color example
            document.getElementById(`color${bodyExample[0]}`).style.backgroundColor = exampleFieldColor[bodyExample[0]];
            // move color of snake example
            bodyExample.splice(0, 1);
            bodyExample[bodyExample.length] = headExample;
            if (headExample == 4 || headExample == 9) {
                headExample += 5;
            } else if (headExample > 10) {
                headExample--;
            } else if (headExample == 10 || headExample == 5) {
                headExample -= 5;
            } else if (headExample < 4) {
                headExample++;
            }

            // color new snake tiles
            document.getElementById(`color${bodyExample[bodyExample.length - 1]}`).style.backgroundColor = bodyColor;
            document.getElementById(`color${headExample}`).style.backgroundColor = headColor;

            // change Food example
            document.getElementById(`food${positionOfFood}`).style.backgroundColor = exampleFieldColor[positionOfFood];
            positionOfFood = Math.floor(Math.random() * 15);
            document.getElementById(`food${positionOfFood}`).style.backgroundColor = foodColor;

            // food number
            document.getElementById("numberExample").innerHTML = "<b>" + foodNumber + "x</b>";

            // speed multiplier example
            document.getElementById(`speed${speedBody[0]}`).style.backgroundColor = exampleFieldColor[speedBody[0]];
            speedBody.splice(0, 1);
            speedBody[speedBody.length] = speedHead;

            if (speedHead == 9) {
                speedHead = 5;
            } else {
                speedHead++;
            }
            document.getElementById(`speed${speedBody[speedBody.length - 1]}`).style.backgroundColor = bodyColor;
            document.getElementById(`speed${speedHead}`).style.backgroundColor = headColor;
        }
    }
}