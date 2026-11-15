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
{
    // position of bots actual
    let botOnePosition = [];
    let botOneHead = [];
    let botTwoPosition = [];
    let botTwoHead = [];
    let botThreePosition = [];
    let botThreeHead = [];

    // color of bots
    let botOneColor;
    let botTwoColor;
    let botThreeColor;

    // durection of bots
    let botOneDurection = "R";
    let botTwoDurection = "R";
    let botThreeDurection = "R";


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
        for (let i = 0; i < 3; i++) {
            botOnePosition[i] = [];
            botTwoPosition[i] = [];
            botThreePosition[i] = [];

            botOnePosition[i][0] = botOneHead[0] - 1 - i;
            botOnePosition[i][1] = botOneHead[1];
            botTwoPosition[i][0] = botTwoHead[0] - 1 - i;
            botTwoPosition[i][1] = botTwoHead[1];
            botThreePosition[i][0] = botThreeHead[0] - 1 - i;
            botThreePosition[i][1] = botThreeHead[1];
        }

        // bot colors
        let botColorOptions = [
            [`rgb(${204}, ${51}, ${255})`, `rgb(${230}, ${153}, ${255})`],
            [`rgb(${230}, ${184}, ${0})`, `rgb(${255}, ${204}, ${0})`],
            [`rgb(${0}, ${230}, ${184})`, `rgb(${77}, ${255}, ${219})`],
        ];

        // randomize bot colors
        for (let i = 0; i < 3; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [botColorOptions[i], botColorOptions[j]] = [botColorOptions[j], botColorOptions[i]];
        }

        // set colors to different bots
        botOneColor = botColorOptions[0];
        botTwoColor = botColorOptions[1];
        botThreeColor = botColorOptions[2];
    }

    function botTypeOne(actualPortX, actualPortY) {
        // move bot straight(S), right(R), left(L)
        let changeDurection = "S";
        // check if snake is going to hit the wall
        /*if (botOneHead[0] == totalFieldWidth - 1 && botOneDurection == "R") {
            if (botOneHead[1] == 0) {
                changeDurection = "R";
            } else if (botOneHead[1] == totalFieldHeight - 1) {
                changeDurection = "L";
            } else {
                if (Math.round(Math.random()) == 0) {
                    changeDurection = "R";
                } else {
                    changeDurection = "L";
                }
            }
        } else if (botOneHead[0] == 0 && botOneDurection == "L") {
            if (botOneHead[1] == 0) {
                changeDurection = "L";
            } else if (botOneHead[1] == totalFieldHeight - 1) {
                changeDurection = "R";
            } else {
                if (Math.round(Math.random()) == 0) {
                    changeDurection = "R";
                } else {
                    changeDurection = "L";
                }
            }
        } else if (botOneHead[1] == 0 && botOneDurection == "U") {
            if (botOneHead[0] == 0) {
                changeDurection = "R";
            } else if (botOneHead[0] == totalFieldWidth - 1) {
                changeDurection = "L";
            } else {
                if (Math.round(Math.random()) == 0) {
                    changeDurection = "R";
                } else {
                    changeDurection = "L";
                }
            }
        } else if (botOneHead[1] == totalFieldHeight - 1 && botOneDurection == "D") {
            if (botOneHead[0] == 0) {
                changeDurection = "L";
            } else if (botOneHead[0] == totalFieldWidth - 1) {
                changeDurection = "R";
            } else {
                if (Math.round(Math.random()) == 0) {
                    changeDurection = "R";
                } else {
                    changeDurection = "L";
                }
            }
        } else */{
            // if random == 0 right, random == 1 left, else straight
            let number = Math.floor(Math.random() * 10);
            if (number == 0) {
                changeDurection = "R";
            } else if (number == 1) {
                changeDurection = "L";
            } else {
                changeDurection = "S";
            }
        }

        // change durection of bot if needed
        if (botOneDurection == "R") {
            if (changeDurection = "R") {
                botOneDurection = "D";
            } else if (changeDurection == "L") {
                botOneDurection = "U";
            } else {}
        } else if (botOneDurection == "L") {
            if (changeDurection = "R") {
                botOneDurection = "U";
            } else if (changeDurection == "L") {
                botOneDurection = "D";
            } else {}
        } else if (botOneDurection == "U") {
            if (changeDurection = "R") {
                botOneDurection = "R";
            } else if (changeDurection == "L") {
                botOneDurection = "L";
            } else {}
        } else if (botOneDurection == "D") {
            if (changeDurection = "R") {
                botOneDurection = "L";
            } else if (changeDurection == "L") {
                botOneDurection = "R";
            } else {}
        }

        // move bot
        botOnePosition.splice(0, 1);
        botOnePosition[botOnePosition.length] = [...botOneHead];
        if (botOneDurection == "R") {
            botOneHead[0]++;
        } else if (botOneDurection == "L") {
            botOneHead[0]--;
        } else if (botOneDurection == "U") {
            botOneHead[1]--;
        } else if (botOneDurection == "D") {
            botOneHead[1]++;
        }

        let first = [...botOneHead];
        let second = [...botOnePosition];
        let third = [...botOneColor];

        // show head if on screen
        showBot(botOneHead, botOnePosition, botOneColor, actualPortX, actualPortY);

        document.getElementById("message").innerHTML = botOnePosition + " " + botOneHead + " " + botOneDurection;
    }

    function botTypeTwo(actualPortX, actualPortY) {
        // show head if on screen
        showBot(botTwoHead, botTwoPosition, botTwoColor, actualPortX, actualPortY);
    }

    function botTypeThree(actualPortX, actualPortY) {
        // show head if on screen
        showBot(botThreeHead, botThreePosition, botThreeColor, actualPortX, actualPortY);
    }


    // show the bots on the screen
    function showBot(head, body, color, actualPortX, actualPortY) {
        // show head if on screen
        if (actualPortX <= head[0] + Math.floor(multiFieldWidth / 2) && (actualPortX + multiFieldWidth) > head[0] + Math.floor(multiFieldWidth / 2) && actualPortY <= head[1] + Math.floor(multiFieldHeight / 2) && (actualPortY + multiFieldHeight) > head[1] + Math.floor(multiFieldHeight / 2)) {
            let position = (head[0] - actualPortX + Math.floor(multiFieldWidth / 2)) + ((head[1] - actualPortY + Math.floor(multiFieldHeight / 2)) * multiFieldHeight);
            document.getElementById(`multi${position}`).style.backgroundColor = color[0];
        }

        // show body if on screen
        for (let i = 0; i < body.length; i++) {
            if (actualPortX <= body[i][0] + Math.floor(multiFieldWidth / 2) && (actualPortX + multiFieldWidth) > body[i][0] + Math.floor(multiFieldWidth / 2) && actualPortY <= body[i][1] + Math.floor(multiFieldHeight / 2) && (actualPortY + multiFieldHeight) > body[i][1] + Math.floor(multiFieldHeight / 2)) {
                let position = (body[i][0] - actualPortX + Math.floor(multiFieldWidth / 2)) + ((body[i][1] - actualPortY + Math.floor(multiFieldHeight / 2)) * multiFieldHeight);
                document.getElementById(`multi${position}`).style.backgroundColor = color[1];
            }
        }
    }

    // check if the bots die
    function checkDie() {

    }
}