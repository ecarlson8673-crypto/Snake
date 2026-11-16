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

    // check if bot is dead
    let botOneDied = false;
    let botTwoDied = false;
    let botThreeDied = false;


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
        if (botOneDied == true) {
            showBot(botOneHead, botOnePosition, botOneColor, actualPortX, actualPortY);
            return;
        }
        // move bot straight(S), right(R), left(L)
        let changeDurection = "S";
        let foodVisable = "None";
        // check if food is on the screen
        for (let i = 0; i < foodPosition.length; i++) {
            if (foodPosition[i][0] >= botOneHead[0] - Math.floor(multiFieldWidth / 2) && foodPosition[i][0] <= botOneHead[0] + Math.floor(multiFieldWidth / 2) && foodPosition[i][1] >= botOneHead[1] - Math.floor(multiFieldHeight / 2) && foodPosition[i][1] <= botOneHead[1] + Math.floor(multiFieldHeight / 2)) {
                foodVisable = i;
            }
        }
        // check if bot is going to hit itself going straight
        let straightDie = hitStraight(botOnePosition, botOneHead, botOneDurection, [actualPortX, actualPortY], actualBodyPosition);
        
        // check if turning will kill bot
        let rightDie = hitRight(botOneHead, botOnePosition, botOneDurection, [actualPortX, actualPortY], actualBodyPosition);
        let leftDie = hitLeft(botOneHead, botOnePosition, botOneDurection, [actualPortX, actualPortY], actualBodyPosition);
        
        {
        // avoid walls if needed
        if (botOneHead[0] == totalFieldWidth - 1 && botOneDurection == "R") {
            if (botOneHead[1] == 0) {
                changeDurection = "R";
            } else if (botOneHead[1] == totalFieldHeight - 1) {
                changeDurection = "L";
            } else {
                if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
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
                if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
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
                if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
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
                if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
                    changeDurection = "R";
                } else {
                    changeDurection = "L";
                }
            }
        // avoid self, if true then going to hit self if go forward
        } else if (straightDie == true) {
            straightDie = false;
            for (let i = 0; i < botOnePosition.length; i++) {
                if (botOneDurection == "R") {
                    if (botOnePosition[i][0] == botOneHead[0] && botOnePosition[i][1] == botOneHead[1] - 1) {
                        straightDie = true;
                    }
                } else if (botOneDurection == "L") {
                    if (botOnePosition[i][0] == botOneHead[0] && botOnePosition[i][1] == botOneHead[1] + 1) {
                        straightDie = true;
                    }
                } else if (botOneDurection == "U") {
                    if (botOnePosition[i][0] == botOneHead[0] - 1 && botOnePosition[i][1] == botOneHead[1]) {
                        straightDie = true;
                    }
                } else if (botOneDurection == "D") {
                    if (botOnePosition[i][0] == botOneHead[0] + 1 && botOnePosition[i][1] == botOneHead[1]) {
                        straightDie = true;
                    }
                }
            }
            if (straightDie == false) {
                changeDurection = "L";
            } else {
                changeDurection = "R";
            }
        // go to food
        } else if (foodVisable != "None") {
            if (botOneDurection == "R") {
                if (foodPosition[foodVisable][1] > botOneHead[1] && rightDie == false) {
                    changeDurection = "R";
                } else if (foodPosition[foodVisable][1] < botOneHead[1] && leftDie == false) {
                    changeDurection = "L";
                }
            } else if (botOneDurection == "L") {
                if (foodPosition[foodVisable][1] > botOneHead[1] && leftDie == false) {
                    changeDurection = "L";
                } else if (foodPosition[foodVisable][1] < botOneHead[1] && rightDie == false) {
                    changeDurection = "R";
                }
            } else if (botOneDurection == "U") {
                if (foodPosition[foodVisable][0] > botOneHead[0] && rightDie == false) {
                    changeDurection = "R";
                } else if (foodPosition[foodVisable][0] < botOneHead[0] && leftDie == false) {
                    changeDurection = "L";
                }
            } else if (botOneDurection == "D") {
                if (foodPosition[foodVisable][0] > botOneHead[0] && leftDie == false) {
                    changeDurection = "L";
                } else if (foodPosition[foodVisable][0] < botOneHead[0] && rightDie == false) {
                    changeDurection = "R";
                }
            }
        // randomize durection if does not need to avoid anything
        } else {
            // if random == 0 right, random == 1 left, else straight
            let randomNumber = Math.floor(Math.random() * 10);
            if (randomNumber == 0 && rightDie == false) {
                changeDurection = "R";
            } else if (randomNumber == 1 && leftDie == false) {
                changeDurection = "L";
            } else {
                changeDurection = "S";
            }
        }
        }

        // change durection of bot if needed
        botOneDurection = botChangeDurection(botOneDurection, changeDurection, botOneHead);

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

        // eat food if on it
        if (foodVisable != "None") {
            if (botOneHead[0] == foodPosition[foodVisable][0] && botOneHead[1] == foodPosition[foodVisable][1]) {
                botOnePosition.splice(0, 0, [...botOnePosition[0]]);
                foodPosition[foodVisable][0] = Math.floor(Math.random() * totalFieldWidth);
                foodPosition[foodVisable][1] = Math.floor(Math.random() * totalFieldHeight);
            }
        }

        // die if run into self
        botOneDied = checkDie(botOnePosition, botOneHead, actualBodyPosition, [actualPortX, actualPortY]);

        // show head if on screen
        showBot(botOneHead, botOnePosition, botOneColor, actualPortX, actualPortY);
    }

    function botTypeTwo(actualPortX, actualPortY) {
        if (botTwoDied == true) {
            showBot(botTwoHead, botTwoPosition, botTwoColor, actualPortX, actualPortY);
            return;
        }
        // move bot straight(S), right(R), left(L)
        let changeDurection = "S";
        let foodVisable = "None";
        // check if food is on the screen
        for (let i = 0; i < foodPosition.length; i++) {
            if (foodPosition[i][0] >= botTwoHead[0] - Math.floor(multiFieldWidth / 2) && foodPosition[i][0] <= botTwoHead[0] + Math.floor(multiFieldWidth / 2) && foodPosition[i][1] >= botTwoHead[1] - Math.floor(multiFieldHeight / 2) && foodPosition[i][1] <= botTwoHead[1] + Math.floor(multiFieldHeight / 2)) {
                foodVisable = i;
            }
        }
        // check if bot is going to hit itself going straight
        let straightDie = hitStraight(botTwoPosition, botTwoHead, botTwoDurection, [actualPortX, actualPortY], actualBodyPosition);
        
        // check if turning will kill bot
        let rightDie = hitRight(botTwoHead, botTwoPosition, botTwoDurection, [actualPortX, actualPortY], actualBodyPosition);
        let leftDie = hitLeft(botTwoHead, botTwoPosition, botTwoDurection, [actualPortX, actualPortY], actualBodyPosition);
        
        {
        // avoid walls if needed
        if (botTwoHead[0] == totalFieldWidth - 1 && botTwoDurection == "R") {
            if (botTwoHead[1] == 0) {
                changeDurection = "R";
            } else if (botTwoHead[1] == totalFieldHeight - 1) {
                changeDurection = "L";
            } else {
                if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
                    changeDurection = "R";
                } else {
                    changeDurection = "L";
                }
            }
        } else if (botTwoHead[0] == 0 && botTwoDurection == "L") {
            if (botTwoHead[1] == 0) {
                changeDurection = "L";
            } else if (botTwoHead[1] == totalFieldHeight - 1) {
                changeDurection = "R";
            } else {
                if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
                    changeDurection = "R";
                } else {
                    changeDurection = "L";
                }
            }
        } else if (botTwoHead[1] == 0 && botTwoDurection == "U") {
            if (botTwoHead[0] == 0) {
                changeDurection = "R";
            } else if (botTwoHead[0] == totalFieldWidth - 1) {
                changeDurection = "L";
            } else {
                if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
                    changeDurection = "R";
                } else {
                    changeDurection = "L";
                }
            }
        } else if (botTwoHead[1] == totalFieldHeight - 1 && botTwoDurection == "D") {
            if (botTwoHead[0] == 0) {
                changeDurection = "L";
            } else if (botTwoHead[0] == totalFieldWidth - 1) {
                changeDurection = "R";
            } else {
                if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
                    changeDurection = "R";
                } else {
                    changeDurection = "L";
                }
            }
        // avoid self, if true then going to hit self if go forward
        } else if (straightDie == true) {
            straightDie = false;
            for (let i = 0; i < botTwoPosition.length; i++) {
                if (botTwoDurection == "R") {
                    if (botTwoPosition[i][0] == botTwoHead[0] && botTwoPosition[i][1] == botTwoHead[1] - 1) {
                        straightDie = true;
                    }
                } else if (botTwoDurection == "L") {
                    if (botTwoPosition[i][0] == botTwoHead[0] && botTwoPosition[i][1] == botTwoHead[1] + 1) {
                        straightDie = true;
                    }
                } else if (botTwoDurection == "U") {
                    if (botTwoPosition[i][0] == botTwoHead[0] - 1 && botTwoPosition[i][1] == botTwoHead[1]) {
                        straightDie = true;
                    }
                } else if (botTwoDurection == "D") {
                    if (botTwoPosition[i][0] == botTwoHead[0] + 1 && botTwoPosition[i][1] == botTwoHead[1]) {
                        straightDie = true;
                    }
                }
            }
            if (straightDie == false) {
                changeDurection = "L";
            } else {
                changeDurection = "R";
            }
        // go to food
        } else if (foodVisable != "None") {
            if (botTwoDurection == "R") {
                if (foodPosition[foodVisable][1] > botTwoHead[1] && rightDie == false) {
                    changeDurection = "R";
                } else if (foodPosition[foodVisable][1] < botTwoHead[1] && leftDie == false) {
                    changeDurection = "L";
                }
            } else if (botTwoDurection == "L") {
                if (foodPosition[foodVisable][1] > botTwoHead[1] && leftDie == false) {
                    changeDurection = "L";
                } else if (foodPosition[foodVisable][1] < botTwoHead[1] && rightDie == false) {
                    changeDurection = "R";
                }
            } else if (botTwoDurection == "U") {
                if (foodPosition[foodVisable][0] > botTwoHead[0] && rightDie == false) {
                    changeDurection = "R";
                } else if (foodPosition[foodVisable][0] < botTwoHead[0] && leftDie == false) {
                    changeDurection = "L";
                }
            } else if (botTwoDurection == "D") {
                if (foodPosition[foodVisable][0] > botTwoHead[0] && leftDie == false) {
                    changeDurection = "L";
                } else if (foodPosition[foodVisable][0] < botTwoHead[0] && rightDie == false) {
                    changeDurection = "R";
                }
            }
        // randomize durection if does not need to avoid anything
        } else {
            // if random == 0 right, random == 1 left, else straight
            let randomNumber = Math.floor(Math.random() * 10);
            if (randomNumber == 0 && rightDie == false) {
                changeDurection = "R";
            } else if (randomNumber == 1 && leftDie == false) {
                changeDurection = "L";
            } else {
                changeDurection = "S";
            }
        }
        }

        // change durection of bot if needed
        botTwoDurection = botChangeDurection(botTwoDurection, changeDurection, botTwoHead);

        // move bot
        botTwoPosition.splice(0, 1);
        botTwoPosition[botTwoPosition.length] = [...botTwoHead];
        if (botTwoDurection == "R") {
            botTwoHead[0]++;
        } else if (botTwoDurection == "L") {
            botTwoHead[0]--;
        } else if (botTwoDurection == "U") {
            botTwoHead[1]--;
        } else if (botTwoDurection == "D") {
            botTwoHead[1]++;
        }

        // eat food if on it
        if (foodVisable != "None") {
            if (botTwoHead[0] == foodPosition[foodVisable][0] && botTwoHead[1] == foodPosition[foodVisable][1]) {
                botTwoPosition.splice(0, 0, [...botTwoPosition[0]]);
                foodPosition[foodVisable][0] = Math.floor(Math.random() * totalFieldWidth);
                foodPosition[foodVisable][1] = Math.floor(Math.random() * totalFieldHeight);
            }
        }

        // die if run into self
        botTwoDied = checkDie(botTwoPosition, botTwoHead, actualBodyPosition, [actualPortX, actualPortY]);

        // show head if on screen
        showBot(botTwoHead, botTwoPosition, botTwoColor, actualPortX, actualPortY);
    }

    /*function botTypeThree(actualPortX, actualPortY) {
        // show head if on screen
        showBot(botThreeHead, botThreePosition, botThreeColor, actualPortX, actualPortY);
    }*/


    // show the bots on the screen
    function showBot(head, body, color, actualPortX, actualPortY) {
        // show body if on screen
        for (let i = 0; i < body.length; i++) {
            if (actualPortX <= body[i][0] + Math.floor(multiFieldWidth / 2) && (actualPortX + multiFieldWidth) > body[i][0] + Math.floor(multiFieldWidth / 2) && actualPortY <= body[i][1] + Math.floor(multiFieldHeight / 2) && (actualPortY + multiFieldHeight) > body[i][1] + Math.floor(multiFieldHeight / 2)) {
                let position = (body[i][0] - actualPortX + Math.floor(multiFieldWidth / 2)) + ((body[i][1] - actualPortY + Math.floor(multiFieldHeight / 2)) * multiFieldHeight);
                document.getElementById(`multi${position}`).style.backgroundColor = color[1];
            }
        }

        // show head if on screen
        if (actualPortX <= head[0] + Math.floor(multiFieldWidth / 2) && (actualPortX + multiFieldWidth) > head[0] + Math.floor(multiFieldWidth / 2) && actualPortY <= head[1] + Math.floor(multiFieldHeight / 2) && (actualPortY + multiFieldHeight) > head[1] + Math.floor(multiFieldHeight / 2)) {
            let position = (head[0] - actualPortX + Math.floor(multiFieldWidth / 2)) + ((head[1] - actualPortY + Math.floor(multiFieldHeight / 2)) * multiFieldHeight);
            document.getElementById(`multi${position}`).style.backgroundColor = color[0];
        }
    }

    // check if the bots die
    function checkDie(bodyPosition, headPosition, playerPosition, playerHead) {
        for (let i = 0; i < bodyPosition.length; i++) {
            if (bodyPosition[i][0] == headPosition[0] && bodyPosition[i][1] == headPosition[1]) {
                return true;
            }
        }
        for (let i = 0; i < playerPosition.length; i++) {
            if (playerPosition[i][0] == headPosition[0] && playerPosition[i][1] == headPosition[1]) {
                return true;
            }
        }
        if (playerHead[0] == headPosition[0] && playerHead[1] == headPosition[1]) {
            return true;
        }
        return false;
    }

    // check if bot is going to hit something if goes left
    function hitLeft(headPosition, botPosition, botDurection, playerhead, playerBody) {
        // check if hit left bot
        for (let i = 0; i < botPosition.length; i++) {
            if (botDurection == "R") {
                if (botPosition[i][0] == headPosition[0] && botPosition[i][1] == headPosition[1] - 1) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (botPosition[i][0] == headPosition[0] && botPosition[i][1] == headPosition[1] + 1) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (botPosition[i][0] == headPosition[0] - 1 && botPosition[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (botPosition[i][0] == headPosition[0] + 1 && botPosition[i][1] == headPosition[1]) {
                    return true;
                }
            }
        }

        // check if hit left player
        for (let i = 0; i < playerBody.length; i++) {
            if (botDurection == "R") {
                if (playerBody[i][0] == headPosition[0] && playerBody[i][1] == headPosition[1] - 1) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (playerBody[i][0] == headPosition[0] && playerBody[i][1] == headPosition[1] + 1) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (playerBody[i][0] == headPosition[0] - 1 && playerBody[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (playerBody[i][0] == headPosition[0] + 1 && playerBody[i][1] == headPosition[1]) {
                    return true;
                }
            }
        }
        if (botDurection == "R") {
            if (playerhead[0] == headPosition[0] && playerhead[1] == headPosition[1] - 1) {
                return true;
            }
        } else if (botDurection == "L") {
            if (playerhead[0] == headPosition[0] && playerhead[1] == headPosition[1] + 1) {
                return true;
            }
        } else if (botDurection == "U") {
            if (playerhead[0] == headPosition[0] - 1 && playerhead[1] == headPosition[1]) {
                return true;
            }
        } else if (botDurection == "D") {
            if (playerhead[0] == headPosition[0] + 1 && playerhead[1] == headPosition[1]) {
                return true;
            }
        }
        
        return false;
    }

    // check if bot is going to hit something if goes right
    function hitRight(headPosition, botPosition, botDurection, playerhead, playerBody) {
        for (let i = 0; i < botPosition.length; i++) {
            if (botDurection == "R") {
                if (botPosition[i][0] == headPosition[0] && botPosition[i][1] == headPosition[1] + 1) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (botPosition[i][0] == headPosition[0] && botPosition[i][1] == headPosition[1] - 1) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (botPosition[i][0] == headPosition[0] + 1 && botPosition[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (botPosition[i][0] == headPosition[0] - 1 && botPosition[i][1] == headPosition[1]) {
                    return true;
                }
            }
        }

        for (let i = 0; i < playerBody.length; i++) {
            if (botDurection == "R") {
                if (playerBody[i][0] == headPosition[0] && playerBody[i][1] == headPosition[1] + 1) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (playerBody[i][0] == headPosition[0] && playerBody[i][1] == headPosition[1] - 1) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (playerBody[i][0] == headPosition[0] + 1 && playerBody[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (playerBody[i][0] == headPosition[0] - 1 && playerBody[i][1] == headPosition[1]) {
                    return true;
                }
            }
        }
        if (botDurection == "R") {
            if (playerhead[0] == headPosition[0] && playerhead[1] == headPosition[1] + 1) {
                return true;
            }
        } else if (botDurection == "L") {
            if (playerhead[0] == headPosition[0] && playerhead[1] == headPosition[1] - 1) {
                return true;
            }
        } else if (botDurection == "U") {
            if (playerhead[0] == headPosition[0] + 1 && playerhead[1] == headPosition[1]) {
                return true;
            }
        } else if (botDurection == "D") {
            if (playerhead[0] == headPosition[0] - 1 && playerhead[1] == headPosition[1]) {
                return true;
            }
        }

        return false;
    }

    // check if bot is going to hit something if goes straight
    function hitStraight(botPosition, headPosition, botDurection, playerhead, playerBody) {
        for (let i = 0; i < botPosition.length; i++) {
            if (botDurection == "R") {
                if (botPosition[i][0] == headPosition[0] + 1 && botPosition[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (botPosition[i][0] == headPosition[0] - 1 && botPosition[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (botPosition[i][0] == headPosition[0] && botPosition[i][1] == headPosition[1] - 1) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (botPosition[i][0] == headPosition[0] && botPosition[i][1] == headPosition[1] + 1) {
                    return true;
                }
            }
        }

        for (let i = 0; i < playerBody.length; i++) {
            if (botDurection == "R") {
                if (playerBody[i][0] == headPosition[0] + 1 && playerBody[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (playerBody[i][0] == headPosition[0] - 1 && playerBody[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (playerBody[i][0] == headPosition[0] && playerBody[i][1] == headPosition[1] - 1) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (playerBody[i][0] == headPosition[0] && playerBody[i][1] == headPosition[1] + 1) {
                    return true;
                }
            }
        }
        if (botDurection == "R") {
            if (playerhead[0] == headPosition[0] + 1 && playerhead[1] == headPosition[1]) {
                return true;
            }
        } else if (botDurection == "L") {
            if (playerhead[0] == headPosition[0] - 1 && playerhead[1] == headPosition[1]) {
                return true;
            }
        } else if (botDurection == "U") {
            if (playerhead[0] == headPosition[0] && playerhead[1] == headPosition[1] - 1) {
                return true;
            }
        } else if (botDurection == "D") {
            if (playerhead[0] == headPosition[0] && playerhead[1] == headPosition[1] + 1) {
                return true;
            }
        }

        return false;
    }

    // change durection of bot
    function botChangeDurection(botDurection, changeDurection, botHead) {
        if (botDurection == "R") {
            if (changeDurection == "R" && botHead[1] != totalFieldHeight - 1) {
                return "D";
            } else if (changeDurection == "L" && botHead[1] != 0) {
                return "U";
            } else {
                return botDurection;
            }
        } else if (botDurection == "L") {
            if (changeDurection == "R" && botHead[1] != 0) {
                return "U";
            } else if (changeDurection == "L" && botHead[1] != totalFieldHeight - 1) {
                return "D";
            } else {
                return botDurection;
            }
        } else if (botDurection == "U") {
            if (changeDurection == "R" && botHead[0] != totalFieldWidth - 1) {
                return "R";
            } else if (changeDurection == "L" && botHead[0] != 0) {
                return "L";
            } else {
                return botDurection;
            }
        } else if (botDurection == "D") {
            if (changeDurection == "R" && botHead[0] != 0) {
                return "L";
            } else if (changeDurection == "L" && botHead[0] != totalFieldWidth - 1) {
                return "R";
            } else {
                return botDurection;
            }
        } else {
            return botDurection;
        }
    }
}