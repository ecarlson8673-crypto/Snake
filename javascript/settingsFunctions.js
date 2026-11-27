{
    // change color of snake
    let currentColor = 1;
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
        } else if (currentColor == 1) {
            headColor = `rgb(${175}, ${0}, ${0})`;
            bodyColor = `rgb(${225}, ${0}, ${0})`;
        } else if (currentColor == 2) {
            headColor = `rgb(${0}, ${130}, ${0})`;
            bodyColor = `rgb(${0}, ${220}, ${0})`;
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
        } else if (currentFood == 1) {
            foodColor = `rgb(${0}, ${175}, ${0})`;
        } else if (currentFood == 2) {
            foodColor = `rgb(${0}, ${0}, ${255})`;
        }
    }
    // change number of food

    // change speed

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
        }
    }
}