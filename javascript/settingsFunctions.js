{
    // change color of snake
    let currentColor = 1;
    function colorLeft() {
        if (currentColor < 1) {
            currentColor = 2;
        } else {
            currentColor--;
        }
    }
    function colorRight() {
        if (currentColor > 1) {
            currentColor = 0;
        } else {
            currentColor++;
        }
    }
    function updateColor() {
        if (currentColor == 0) {
            
        } else if (currentColor == 1) {

        } else if (currentColor == 2) {

        }
    }
    /*function blue() {
        headColor = `rgb(${0}, ${0}, ${175})`;
        bodyColor = `rgb(${0}, ${0}, ${225})`;
        resetSnakeColor();
        document.getElementById("blue").style.borderWidth = `${8}px`;
    }
    function red() {
        headColor = `rgb(${175}, ${0}, ${0})`;
        bodyColor = `rgb(${225}, ${0}, ${0})`;
        resetSnakeColor();
        document.getElementById("red").style.borderWidth = `${8}px`;
    }
    function green() {
        headColor = `rgb(${0}, ${130}, ${0})`;
        bodyColor = `rgb(${0}, ${220}, ${0})`;
        resetSnakeColor();
        document.getElementById("green").style.borderWidth = `${8}px`;
    }
    function resetSnakeColor() {
        document.getElementById("blue").style.borderWidth = `${6}px`;
        document.getElementById("red").style.borderWidth = `${6}px`;
        document.getElementById("green").style.borderWidth = `${6}px`;
    }
    */

    // change type (color) of food
    function cherry() {
        foodColor = `rgb(${255}, ${0}, ${0})`;
        resetFoodColor();
        document.getElementById("cherry").style.borderWidth = `${8}px`;
    }
    function apple() {
        foodColor = `rgb(${0}, ${175}, ${0})`;
        resetFoodColor();
        document.getElementById("apple").style.borderWidth = `${8}px`;
    }
    function orange() {
        foodColor = `rgb(${0}, ${0}, ${255})`;
        resetFoodColor();
        document.getElementById("orange").style.borderWidth = `${8}px`;
    }
    function resetFoodColor() {
        document.getElementById("cherry").style.borderWidth = `${6}px`;
        document.getElementById("apple").style.borderWidth = `${6}px`;
        document.getElementById("orange").style.borderWidth = `${6}px`;
    }

    // change number of food
    function one() {
        foodNumber = 1;
        resetNumber();
        document.getElementById("one").style.borderWidth = `${8}px`;
    }
    function two() {
        foodNumber = 2;
        resetNumber();
        document.getElementById("two").style.borderWidth = `${8}px`;
    }
    function three() {
        foodNumber = 3;
        resetNumber();
        document.getElementById("three").style.borderWidth = `${8}px`;
    }
    function five() {
        foodNumber = 5;
        resetNumber();
        document.getElementById("five").style.borderWidth = `${8}px`;
    }
    function ten() {
        foodNumber = 10;
        resetNumber();
        document.getElementById("ten").style.borderWidth = `${8}px`;
    }
    function resetNumber() {
        document.getElementById("one").style.borderWidth = `${6}px`;
        document.getElementById("two").style.borderWidth = `${6}px`;
        document.getElementById("three").style.borderWidth = `${6}px`;
        document.getElementById("five").style.borderWidth = `${6}px`;
        document.getElementById("ten").style.borderWidth = `${6}px`;
    }

    // change speed
    function slow() {
        time = 350;
        resetSpeed()
        document.getElementById("slow").style.borderWidth = `${8}px`;
    }
    function normal() {
        time = 250;
        resetSpeed()
        document.getElementById("normal").style.borderWidth = `${8}px`;
    }
    function fast() {
        time = 150;
        resetSpeed()
        document.getElementById("fast").style.borderWidth = `${8}px`;
    }
    function resetSpeed() {
        document.getElementById("slow").style.borderWidth = `${6}px`;
        document.getElementById("normal").style.borderWidth = `${6}px`;
        document.getElementById("fast").style.borderWidth = `${6}px`;
    }
}