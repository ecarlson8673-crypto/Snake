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

            botOnePosition[i][0] = botOneHead[0] - 1;
            botOnePosition[i][1] = botOneHead[1];
            botTwoPosition[i][0] = botTwoHead[0] - 1;
            botTwoPosition[i][1] = botTwoHead[1];
            botThreePosition[i][0] = botThreeHead[0] - 1;
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
        // show head if on screen
        /*if (actualPortX <= botOneHead[0] + Math.floor(multiFieldWidth / 2) && (actualPortX + multiFieldWidth) > botOneHead[0] + Math.floor(multiFieldWidth / 2) && actualPortY <= botOneHead[1] + Math.floor(multiFieldHeight / 2) && (actualPortY + multiFieldHeight) > botOneHead[1] + Math.floor(multiFieldHeight / 2)) {
            let position = (botOneHead[0] - actualPortX + Math.floor(multiFieldWidth / 2)) + ((botOneHead[1] - actualPortY + Math.floor(multiFieldHeight / 2)) * multiFieldHeight);
            document.getElementById(`multi${position}`).style.backgroundColor = botOneColor[0];
        }

        // show body if on screen
        for (let i = 0; i < botOnePosition.length; i++) {
            if (actualPortX <= botOnePosition[i][0] + Math.floor(multiFieldWidth / 2) && (actualPortX + multiFieldWidth) > botOnePosition[i][0] + Math.floor(multiFieldWidth / 2) && actualPortY <= botOnePosition[i][1] + Math.floor(multiFieldHeight / 2) && (actualPortY + multiFieldHeight) > botOnePosition[i][1] + Math.floor(multiFieldHeight / 2)) {
                let position = (botOnePosition[i][0] - actualPortX + Math.floor(multiFieldWidth / 2)) + ((botOnePosition[i][1] - actualPortY + Math.floor(multiFieldHeight / 2)) * multiFieldHeight);
                document.getElementById(`multi${position}`).style.backgroundColor = botOneColor[1];
            }
        }*/
        showBot(botOneHead, botOnePosition, botOneColor);
    }

    function botTypeTwo(actualPortX, actualPortY) {
        // show head if on screen
        /*if (actualPortX <= botTwoHead[0] + Math.floor(multiFieldWidth / 2) && (actualPortX + multiFieldWidth) > botTwoHead[0] + Math.floor(multiFieldWidth / 2) && actualPortY <= botTwoHead[1] + Math.floor(multiFieldHeight / 2) && (actualPortY + multiFieldHeight) > botTwoHead[1] + Math.floor(multiFieldHeight / 2)) {
            let position = (botTwoHead[0] - actualPortX + Math.floor(multiFieldWidth / 2)) + ((botTwoHead[1] - actualPortY + Math.floor(multiFieldHeight / 2)) * multiFieldHeight);
            document.getElementById(`multi${position}`).style.backgroundColor = botTwoColor[0];
        }

        // show body if on screen
        for (let i = 0; i < botTwoPosition.length; i++) {
            if (actualPortX <= botTwoPosition[i][0] + Math.floor(multiFieldWidth / 2) && (actualPortX + multiFieldWidth) > botTwoPosition[i][0] + Math.floor(multiFieldWidth / 2) && actualPortY <= botTwoPosition[i][1] + Math.floor(multiFieldHeight / 2) && (actualPortY + multiFieldHeight) > botTwoPosition[i][1] + Math.floor(multiFieldHeight / 2)) {
                let position = (botTwoPosition[i][0] - actualPortX + Math.floor(multiFieldWidth / 2)) + ((botTwoPosition[i][1] - actualPortY + Math.floor(multiFieldHeight / 2)) * multiFieldHeight);
                document.getElementById(`multi${position}`).style.backgroundColor = botTwoColor[1];
            }
        }*/
        showBot(botTwoHead, botTwoPosition, botTwoColor);
    }

    function botTypeThree(actualPortX, actualPortY) {
        // show head if on screen
        /*if (actualPortX <= botThreeHead[0] + Math.floor(multiFieldWidth / 2) && (actualPortX + multiFieldWidth) > botThreeHead[0] + Math.floor(multiFieldWidth / 2) && actualPortY <= botThreeHead[1] + Math.floor(multiFieldHeight / 2) && (actualPortY + multiFieldHeight) > botThreeHead[1] + Math.floor(multiFieldHeight / 2)) {
            let position = (botThreeHead[0] - actualPortX + Math.floor(multiFieldWidth / 2)) + ((botThreeHead[1] - actualPortY + Math.floor(multiFieldHeight / 2)) * multiFieldHeight);
            document.getElementById(`multi${position}`).style.backgroundColor = botThreeColor[0];
        }

        // show body if on screen
        for (let i = 0; i < botThreePosition.length; i++) {
            if (actualPortX <= botThreePosition[i][0] + Math.floor(multiFieldWidth / 2) && (actualPortX + multiFieldWidth) > botThreePosition[i][0] + Math.floor(multiFieldWidth / 2) && actualPortY <= botThreePosition[i][1] + Math.floor(multiFieldHeight / 2) && (actualPortY + multiFieldHeight) > botThreePosition[i][1] + Math.floor(multiFieldHeight / 2)) {
                let position = (botThreePosition[i][0] - actualPortX + Math.floor(multiFieldWidth / 2)) + ((botThreePosition[i][1] - actualPortY + Math.floor(multiFieldHeight / 2)) * multiFieldHeight);
                document.getElementById(`multi${position}`).style.backgroundColor = botThreeColor[1];
            }
        }*/
        showBot(botTwoHead, botTwoPosition, botTwoColor);
    }


    function showBot(head, body, color) {
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
}