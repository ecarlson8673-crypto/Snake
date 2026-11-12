// change color of snake
function blue() {
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
    headColor = `rgb(${0}, ${150}, ${0})`;
    bodyColor = `rgb(${0}, ${230}, ${0})`;
    resetSnakeColor();
    document.getElementById("green").style.borderWidth = `${8}px`;
}
function resetSnakeColor() {
    document.getElementById("blue").style.borderWidth = `${6}px`;
    document.getElementById("red").style.borderWidth = `${6}px`;
    document.getElementById("green").style.borderWidth = `${6}px`;
}

// change type (color) of food
function cherry() {
    foodColor = `rgb(${255}, ${0}, ${0})`;
    resetFoodColor();
    document.getElementById("cherry").style.borderWidth = `${8}px`;
}
function apple() {
    foodColor = `rgb(${0}, ${255}, ${0})`;
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
    resetSpeed();
    document.getElementById("one").style.borderWidth = `${8}px`;
}
function two() {
    foodNumber = 2;
    resetSpeed();
    document.getElementById("two").style.borderWidth = `${8}px`;
}
function three() {
    foodNumber = 3;
    resetSpeed();
    document.getElementById("three").style.borderWidth = `${8}px`;
}
function five() {
    foodNumber = 5;
    resetSpeed();
    document.getElementById("five").style.borderWidth = `${8}px`;
}
function ten() {
    foodNumber = 10;
    resetSpeed();
    document.getElementById("ten").style.borderWidth = `${8}px`;
}
function resetSpeed() {
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