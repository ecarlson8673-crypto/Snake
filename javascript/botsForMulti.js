// this file has the code for the bots for the multi game
/* Each bot has different code moving it
NOTE: see it means in view port (within 5 field tiles of head)
bot 1
    - moves randomly averaging going straight
    - if food can be seen goes to it
bot 2
    - goes for the closest food even if can not see it
bot 3
    - Figure out later
*/
var botOneHead = [];
{
    // position of bots actual
    let botOnePosition = [];
    let botTwoPosition = [];
    let botTwoHead = [];
    let botThreePosition = [];
    let botThreeHead = [];


    function resetBots() {
        // position head of bot
        let x = Math.floor(Math.random() * ((totalFieldWidth / 3) - 3)) + 3;
        let y = Math.floor(Math.random() * ((2 * totalFieldHeight / 3) - 3)) + 3;
        botOneHead = [x, y];
        x = Math.floor(Math.random() * ((2 * totalFieldWidth / 3) - 3)) + 3;
        y = Math.floor(Math.random() * (totalFieldHeight / 3)) + Math.floor(2 * totalFieldHeight / 3);
        botTwoHead = [x, y];
        x = Math.floor(Math.random() * (totalFieldWidth / 3)) + Math.floor(2 * totalFieldWidth / 3);
        y = Math.floor(Math.random() * (totalFieldHeight - 3)) + 3;
        botThreeHead = [x, y];

        // position body based on head
        
    }

    function botTypeOne(actualPortX, actualPortY) {
        document.getElementById("message").innerHTML = botOneHead;
        // show head if on screen
        if (actualPortX <= botOneHead[0] + Math.floor(multiFieldWidth / 2) && (actualPortX + multiFieldWidth) > botOneHead[0] + Math.floor(multiFieldWidth / 2) && actualPortY <= botOneHead[1] + Math.floor(multiFieldHeight / 2) && (actualPortY + multiFieldHeight) > botOneHead[1] + Math.floor(multiFieldHeight / 2)) {
            let position = (botOneHead[0] - actualPortX + Math.floor(multiFieldWidth / 2)) + ((botOneHead[1] - actualPortY + Math.floor(multiFieldHeight / 2)) * multiFieldHeight);
            document.getElementById(`multi${position}`).style.backgroundColor = `rgb(${0}, ${0}, ${0})`;
        }
    }

    function botTypeTwo(actualPortX, actualPortY) {

    }

    function botTypeThree(actualPortX, actualPortY) {

    }
}