// this file has the code for the bots for the multi game
/* Each bot has different code moving it
NOTE: see it means in view port (within 5 field tiles of head)
bot...
    - moves randomly averaging going straight
    - if food can be seen goes to it
*/
{
    // the position of the bots
    let botPosition = [];
    let botHead = [];

    // the color of the bots
    let botColor = [
        [`rgb(${204}, ${51}, ${255})`, `rgb(${230}, ${153}, ${255})`],
        [`rgb(${230}, ${184}, ${0})`, `rgb(${255}, ${204}, ${0})`],
        [`rgb(${0}, ${230}, ${184})`, `rgb(${77}, ${255}, ${219})`],
        [`rgb(${117}, ${117}, ${163})`, `rgb(${82}, ${82}, ${122})`],
        [`rgb(${131}, ${48}, ${89})`, `rgb(${102}, ${0}, ${51})`],
        [`rgb(${255}, ${255}, ${102})`, `rgb(${219}, ${219}, ${87})`]
    ];

    // the durection of the bots
    let botDurection = [];

    // check if the bot is died
    let botDied = [];

    // reset and set bot variables
    function resetBots(resetDied = "none") {
        for (let i = 0; i < botNumber; i++) {
            if (resetDied == "none" || resetDied == i) {
                // set durection of bots
                botDurection[i] = "R";

                // position head
                let x = Math.floor(Math.random() * (totalFieldWidth - 3)) + 3;
                let y = Math.floor(Math.random() * (totalFieldHeight - 3)) + 3;
                botHead[i] = [x, y];

                botPosition[i] = [];
                // position body
                for (let j = 0; j < 3; j++) {
                    botPosition[i][j] = [];

                    botPosition[i][j][0] = botHead[i][0] - 1 - j;
                    botPosition[i][j][1] = botHead[i][1];
                }
                botDied[i] = false;
            }
        }
    }

    // move bots
    function moveBots(actualPortX, actualPortY) {
        for (let i = 0; i < botNumber; i++) {
            if (botDied[i] == true) {
                resetBots(i);
                return;
            }

            // move bot straight(S), right(R), left(L)
            let changeDurection = "S";
            let foodVisable = "None";
            // check if food is on the screen
            for (let j = 0; j < foodPosition.length; j++) {
                if (foodPosition[j][0] >= botHead[i][0] - Math.floor(multiFieldWidth / 2) && foodPosition[j][0] <= botHead[i][0] + Math.floor(multiFieldWidth / 2) && foodPosition[j][1] >= botHead[i][1] - Math.floor(multiFieldHeight / 2) && foodPosition[j][1] <= botHead[i][1] + Math.floor(multiFieldHeight / 2)) {
                    foodVisable = j;
                }
            }
            // check if bot is going to hit itself going straight
            let straightDie = hitStraight(botPosition, botHead,i, botDurection, [actualPortX, actualPortY], actualBodyPosition);

            // check if turning will kill bot
            let rightDie = hitRight(botHead, botPosition, i, botDurection, [actualPortX, actualPortY], actualBodyPosition);
            let leftDie = hitLeft(botHead, botPosition, i, botDurection, [actualPortX, actualPortY], actualBodyPosition);

            {
                // avoid walls if needed
                if (botHead[i][0] == totalFieldWidth - 1 && botDurection[i] == "R") {
                    if (botHead[i][1] == 0) {
                        changeDurection = "R";
                    } else if (botHead[i][1] == totalFieldHeight - 1) {
                        changeDurection = "L";
                    } else {
                        if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
                            changeDurection = "R";
                        } else {
                            changeDurection = "L";
                        }
                    }
                } else if (botHead[i][0] == 0 && botDurection[i] == "L") {
                    if (botHead[i][1] == 0) {
                        changeDurection = "L";
                    } else if (botHead[i][1] == totalFieldHeight - 1) {
                        changeDurection = "R";
                    } else {
                        if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
                            changeDurection = "R";
                        } else {
                            changeDurection = "L";
                        }
                    }
                } else if (botHead[i][1] == 0 && botDurection[i] == "U") {
                    if (botHead[i][0] == 0) {
                        changeDurection = "R";
                    } else if (botHead[i][0] == totalFieldWidth - 1) {
                        changeDurection = "L";
                    } else {
                        if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
                            changeDurection = "R";
                        } else {
                            changeDurection = "L";
                        }
                    }
                } else if (botHead[i][1] == totalFieldHeight - 1 && botDurection[i] == "D") {
                    if (botHead[i][0] == 0) {
                        changeDurection = "L";
                    } else if (botHead[i][0] == totalFieldWidth - 1) {
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
                    for (let j = 0; j < botPosition[i].length; j++) {
                        if (botDurection[i] == "R") {
                            if (botPosition[i][j][0] == botHead[i][0] && botPosition[i][j][1] == botHead[i][1] - 1) {
                                straightDie = true;
                            }
                        } else if (botDurection[i] == "L") {
                            if (botPosition[i][j][0] == botHead[i][0] && botPosition[i][j][1] == botHead[i][1] + 1) {
                                straightDie = true;
                            }
                        } else if (botDurection[i] == "U") {
                            if (botPosition[i][j][0] == botHead[i][0] - 1 && botPosition[i][j][1] == botHead[i][1]) {
                                straightDie = true;
                            }
                        } else if (botDurection[i] == "D") {
                            if (botPosition[i][j][0] == botHead[i][0] + 1 && botPosition[i][j][1] == botHead[i][1]) {
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
                    if (botDurection[i] == "R") {
                        if (foodPosition[foodVisable][1] > botHead[i][1] && rightDie == false) {
                            changeDurection = "R";
                        } else if (foodPosition[foodVisable][1] < botHead[i][1] && leftDie == false) {
                            changeDurection = "L";
                        }
                    } else if (botDurection[i] == "L") {
                        if (foodPosition[foodVisable][1] > botHead[i][1] && leftDie == false) {
                            changeDurection = "L";
                        } else if (foodPosition[foodVisable][1] < botHead[i][1] && rightDie == false) {
                            changeDurection = "R";
                        }
                    } else if (botDurection[i] == "U") {
                        if (foodPosition[foodVisable][0] > botHead[i][0] && rightDie == false) {
                            changeDurection = "R";
                        } else if (foodPosition[foodVisable][0] < botHead[i][0] && leftDie == false) {
                            changeDurection = "L";
                        }
                    } else if (botDurection[i] == "D") {
                        if (foodPosition[foodVisable][0] > botHead[i][0] && leftDie == false) {
                            changeDurection = "L";
                        } else if (foodPosition[foodVisable][0] < botHead[i][0] && rightDie == false) {
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
            botDurection[i] = botChangeDurection(botDurection[i], changeDurection, botHead[i]);

            botDurection[i] = "L";

            // move bot
            botPosition[i].splice(0, 1);
            botPosition[i][botPosition[i].length] = [...botHead[i]];
            if (botDurection[i] == "R") {
                botHead[i][0]++;
            } else if (botDurection[i] == "L") {
                botHead[i][0]--;
            } else if (botDurection[i] == "U") {
                botHead[i][1]--;
            } else if (botDurection[i] == "D") {
                botHead[i][1]++;
            }

            // eat food if on it
            if (foodVisable != "None") {
                if (botHead[i][0] == foodPosition[foodVisable][0] && botHead[i][1] == foodPosition[foodVisable][1]) {
                    botPosition[i].splice(0, 0, [...botPosition[i][0]]);
                    foodPosition[foodVisable][0] = Math.floor(Math.random() * totalFieldWidth);
                    foodPosition[foodVisable][1] = Math.floor(Math.random() * totalFieldHeight);
                }
            }

            // die if run into self
            botDied[i] = checkDie(botPosition, botHead, i, actualBodyPosition, [actualPortX, actualPortY]);

            // show head if on screen
            showBot(botHead[i], botPosition[i], botColor[i], actualPortX, actualPortY);
        }
    }

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
    function checkDie(bodyPosition, headPosition, currentBot, playerPosition, playerHead) {
        for (let i = 0; i < botNumber; i++) {
            // check if hit other bot
            for (let j = 0; j < bodyPosition[i].length; j++) {
                if (bodyPosition[i][j][0] == headPosition[currentBot][0] && bodyPosition[i][j][1] == headPosition[currentBot][1]) {
                    return true;
                }
            }
            if (currentBot != i) {
                if (headPosition[i][0] == headPosition[currentBot][0] && headPosition[i][1] == headPosition[currentBot][1]) {
                    return true;
                }
            }
        }
        // check if hit self
        for (let i = 0; i < bodyPosition[currentBot].length; i++) {
            if (bodyPosition[currentBot][i][0] == headPosition[currentBot][0] && bodyPosition[currentBot][i][1] == headPosition[currentBot][1]) {
                return true;
            }
        }
        // check if hit player
        for (let i = 0; i < playerPosition.length; i++) {
            if (playerPosition[i][0] == headPosition[currentBot][0] && playerPosition[i][1] == headPosition[currentBot][1]) {
                return true;
            }
        }
        if (playerHead[0] == headPosition[currentBot][0] && playerHead[1] == headPosition[currentBot][1]) {
            return true;
        }
        return false;
    }

    // check if bot is going to hit something if goes left
    function hitLeft(headPosition, botPosition, currentBot, botDurection, playerhead, playerBody) {
        for (let i = 0; i < botNumber; i++) {
            // check if hit left bot
            for (let j = 0; j < botPosition[currentBot].length; j++) {
                if (botDurection[currentBot] == "R") {
                    if (botPosition[i][j][0] == headPosition[currentBot][0] && botPosition[i][j][1] == headPosition[currentBot][1] - 1) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "L") {
                    if (botPosition[i][j][0] == headPosition[currentBot][0] && botPosition[i][j][1] == headPosition[currentBot][1] + 1) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "U") {
                    if (botPosition[i][j][0] == headPosition[currentBot][0] - 1 && botPosition[i][j][1] == headPosition[currentBot][1]) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "D") {
                    if (botPosition[i][j][0] == headPosition[currentBot][0] + 1 && botPosition[i][j][1] == headPosition[currentBot][1]) {
                        return true;
                    }
                }
            }
            if (currentBot != i) {
                if (botDurection[currentBot] == "R") {
                    if (headPosition[i][0] == headPosition[currentBot][0] && headPosition[i][1] == headPosition[currentBot][1] - 1) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "L") {
                    if (headPosition[i][0] == headPosition[currentBot][0] && headPosition[i][1] == headPosition[currentBot][1] + 1) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "U") {
                    if (headPosition[i][0] == headPosition[currentBot][0] - 1 && headPosition[i][1] == headPosition[currentBot][1]) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "D") {
                    if (headPosition[i][0] == headPosition[currentBot][0] + 1 && headPosition[i][1] == headPosition[currentBot][1]) {
                        return true;
                    }
                }
            }
        }

        // check if hit left player
        for (let i = 0; i < playerBody.length; i++) {
            if (botDurection[currentBot] == "R") {
                if (playerBody[i][0] == headPosition[currentBot][0] && playerBody[i][1] == headPosition[currentBot][1] - 1) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (playerBody[i][0] == headPosition[currentBot][0] && playerBody[i][1] == headPosition[currentBot][1] + 1) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (playerBody[i][0] == headPosition[currentBot][0] - 1 && playerBody[i][1] == headPosition[currentBot][1]) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (playerBody[i][0] == headPosition[currentBot][0] + 1 && playerBody[i][1] == headPosition[currentBot][1]) {
                    return true;
                }
            }
        }
        if (botDurection[currentBot] == "R") {
            if (playerhead[0] == headPosition[currentBot][0] && playerhead[1] == headPosition[currentBot][1] - 1) {
                return true;
            }
        } else if (botDurection[currentBot] == "L") {
            if (playerhead[0] == headPosition[currentBot][0] && playerhead[1] == headPosition[currentBot][1] + 1) {
                return true;
            }
        } else if (botDurection == "U") {
            if (playerhead[0] == headPosition[currentBot][0] - 1 && playerhead[1] == headPosition[currentBot][1]) {
                return true;
            }
        } else if (botDurection[currentBot] == "D") {
            if (playerhead[0] == headPosition[currentBot][0] + 1 && playerhead[1] == headPosition[currentBot][1]) {
                return true;
            }
        }

        return false;
    }

    // check if bot is going to hit something if goes right
    function hitRight(headPosition, botPosition, currentBot, botDurection, playerhead, playerBody) {
        for (let i = 0; i < botNumber; i++) {
            for (let j = 0; j < botPosition[currentBot].length; j++) {
                if (botDurection[currentBot] == "R") {
                    if (botPosition[i][j][0] == headPosition[currentBot][0] && botPosition[i][j][1] == headPosition[currentBot][1] + 1) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "L") {
                    if (botPosition[i][j][0] == headPosition[currentBot][0] && botPosition[i][j][1] == headPosition[currentBot][1] - 1) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "U") {
                    if (botPosition[i][j][0] == headPosition[currentBot][0] + 1 && botPosition[i][j][1] == headPosition[currentBot][1]) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "D") {
                    if (botPosition[i][j][0] == headPosition[currnetBot][0] - 1 && botPosition[i][j][1] == headPosition[currentBot][1]) {
                        return true;
                    }
                }
            }
            if (currentBot != i) {
                if (botDurection[currentBot] == "R") {
                    if (headPosition[i][0] == headPosition[currentBot][0] && headPosition[i][1] == headPosition[currentBot][1] + 1) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "L") {
                    if (headPosition[i][0] == headPosition[currentBot][0] && headPosition[i][1] == headPosition[currentBot][1] - 1) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "U") {
                    if (headPosition[i][0] == headPosition[currentBot][0] + 1 && headPosition[i][1] == headPosition[currentBot][1]) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "D") {
                    if (headPosition[i][0] == headPosition[currentBot][0] - 1 && headPosition[i][1] == headPosition[currentBot][1]) {
                        return true;
                    }
                }
            }
        }

        for (let i = 0; i < playerBody.length; i++) {
            if (botDurection[currentBot] == "R") {
                if (playerBody[i][0] == headPosition[currentBot][0] && playerBody[i][1] == headPosition[currentBot][1] + 1) {
                    return true;
                }
            } else if (botDurection[currentBot] == "L") {
                if (playerBody[i][0] == headPosition[currentBot][0] && playerBody[i][1] == headPosition[currentBot][1] - 1) {
                    return true;
                }
            } else if (botDurection[currentBot] == "U") {
                if (playerBody[i][0] == headPosition[currentBot][0] + 1 && playerBody[i][1] == headPosition[currentBot][1]) {
                    return true;
                }
            } else if (botDurection[currentBot] == "D") {
                if (playerBody[i][0] == headPosition[currentBot][0] - 1 && playerBody[i][1] == headPosition[currentBot][1]) {
                    return true;
                }
            }
        }
        if (botDurection[currentBot] == "R") {
            if (playerhead[0] == headPosition[currentBot][0] && playerhead[1] == headPosition[currentBot][1] + 1) {
                return true;
            }
        } else if (botDurection[currentBot] == "L") {
            if (playerhead[0] == headPosition[currentBot][0] && playerhead[1] == headPosition[currentBot][1] - 1) {
                return true;
            }
        } else if (botDurection[currentBot] == "U") {
            if (playerhead[0] == headPosition[currentBot][0] + 1 && playerhead[1] == headPosition[currentBot][1]) {
                return true;
            }
        } else if (botDurection[currentBot] == "D") {
            if (playerhead[0] == headPosition[currentBot][0] - 1 && playerhead[1] == headPosition[currentBot][1]) {
                return true;
            }
        }

        return false;
    }

    // check if bot is going to hit something if goes straight
    function hitStraight(botPosition, headPosition, currentBot, botDurection, playerhead, playerBody) {
        for (let i = 0; i < botNumber; i++) {
            for (let j = 0; j < botPosition[currentBot].length; j++) {
                if (botDurection[currentBot] == "R") {
                    if (botPosition[i][j][0] == headPosition[currentBot][0] + 1 && botPosition[i][j][1] == headPosition[currentBot][1]) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "L") {
                    if (botPosition[i][j][0] == headPosition[currentBot][0] - 1 && botPosition[i][j][1] == headPosition[currentBot][1]) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "U") {
                    if (botPosition[i][j][0] == headPosition[currentBot][0] && botPosition[i][j][1] == headPosition[currentBot][1] - 1) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "D") {
                    if (botPosition[i][j][0] == headPosition[currentBot][0] && botPosition[i][j][1] == headPosition[currentBot][1] + 1) {
                        return true;
                    }
                }
            }
            if (currentBot != i) {
                if (botDurection[currentBot] == "R") {
                    if (headPosition[i][0] == headPosition[currentBot][0] + 1 && headPosition[i][1] == headPosition[currentBot][1]) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "L") {
                    if (headPosition[i][0] == headPosition[currentBot][0] - 1 && headPosition[i][1] == headPosition[currentBot][1]) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "U") {
                    if (headPosition[i][0] == headPosition[currentBot][0] && headPosition[i][1] == headPosition[currentBot][1] - 1) {
                        return true;
                    }
                } else if (botDurection[currentBot] == "D") {
                    if (headPosition[i][0] == headPosition[currentBot][0] && headPosition[i][1] == headPosition[currentBot][1] + 1) {
                        return true;
                    }
                }
            }
        }

        for (let i = 0; i < playerBody.length; i++) {
            if (botDurection[currentBot] == "R") {
                if (playerBody[i][0] == headPosition[currentBot][0] + 1 && playerBody[i][1] == headPosition[currentBot][1]) {
                    return true;
                }
            } else if (botDurection[currentBot] == "L") {
                if (playerBody[i][0] == headPosition[currentBot][0] - 1 && playerBody[i][1] == headPosition[currentBot][1]) {
                    return true;
                }
            } else if (botDurection[currentBot] == "U") {
                if (playerBody[i][0] == headPosition[currentBot][0] && playerBody[i][1] == headPosition[currentBot][1] - 1) {
                    return true;
                }
            } else if (botDurection[currentBot] == "D") {
                if (playerBody[i][0] == headPosition[currentBot][0] && playerBody[i][1] == headPosition[currentBot][1] + 1) {
                    return true;
                }
            }
        }
        if (botDurection[currentBot] == "R") {
            if (playerhead[0] == headPosition[currentBot][0] + 1 && playerhead[1] == headPosition[currentBot][1]) {
                return true;
            }
        } else if (botDurection[currentBot] == "L") {
            if (playerhead[0] == headPosition[currentBot][0] - 1 && playerhead[1] == headPosition[currentBot][1]) {
                return true;
            }
        } else if (botDurection[currentBot] == "U") {
            if (playerhead[0] == headPosition[currentBot][0] && playerhead[1] == headPosition[currentBot][1] - 1) {
                return true;
            }
        } else if (botDurection[currentBot] == "D") {
            if (playerhead[0] == headPosition[currentBot][0] && playerhead[1] == headPosition[currentBot][1] + 1) {
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

    // check if player hits bot
    function playerDied(playerHead) {
        // check if player hit bot
        for (let i = 0; i < botNumber; i++) {
            // check if player hit any of the bots
            for (let j = 0; j < botPosition[i].length; j++) {
                if (botPosition[i][j][0] == playerHead[0] && botPosition[i][j][1] == playerHead[1]) {
                    return true;
                }
            }
            if (botHead[i][0] == playerHead[0] && botHead[i][1] == playerHead[1]) {
                return true;
            }
        }

        return false;
    }
}
/*
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
        resetOne();
        resetTwo();
        resetThree();

        botOneDurection = "R";
        botTwoDurection = "R";
        botThreeDurection = "R";

        // bot colors
        let botColorOptions = [
            [`rgb(${204}, ${51}, ${255})`, `rgb(${230}, ${153}, ${255})`],
            [`rgb(${230}, ${184}, ${0})`, `rgb(${255}, ${204}, ${0})`],
            [`rgb(${0}, ${230}, ${184})`, `rgb(${77}, ${255}, ${219})`]
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
    function resetOne() {
        // position head
        let x = Math.floor(Math.random() * ((totalFieldWidth / 3) - 3)) + 3;
        let y = Math.floor(Math.random() * ((2 * totalFieldHeight / 3) - 3)) + 3;
        botOneHead = [x, y];

        botOnePosition = [];
        // position body
        for (let i = 0; i < 3; i++) {
            botOnePosition[i] = [];

            botOnePosition[i][0] = botOneHead[0];
            botOnePosition[i][1] = botOneHead[1];
        }
        botOneDied = false;
    }
    function resetTwo() {
        // position head
        x = Math.floor(Math.random() * ((2 * totalFieldWidth / 3) - 3)) + 3;
        y = Math.floor(Math.random() * (totalFieldHeight / 3)) + Math.floor(2 * totalFieldHeight / 3);
        botTwoHead = [x, y];

        botTwoPosition = [];
        // position body
        for (let i = 0; i < 3; i++) {
            botTwoPosition[i] = [];

            botTwoPosition[i][0] = botTwoHead[0];
            botTwoPosition[i][1] = botTwoHead[1];
        }
        botTwoDied = false;
    }
    function resetThree() {
        // position head
        x = Math.floor(Math.random() * (totalFieldWidth / 3)) + Math.floor(2 * totalFieldWidth / 3);
        y = Math.floor(Math.random() * (totalFieldHeight - 3)) + 3;
        botThreeHead = [x, y];

        botThreePosition = [];
        // position body
        for (let i = 0; i < 3; i++) {
            botThreePosition[i] = [];

            botThreePosition[i][0] = botThreeHead[0];
            botThreePosition[i][1] = botThreeHead[1];
        }
        botThreeDied = false;
    }

    function botTypeOne(actualPortX, actualPortY) {
        if (botOneDied == true) {
            resetOne();
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
        let straightDie = hitStraight(botOnePosition, botOneHead, botTwoHead, botTwoPosition, botThreeHead, botThreePosition, botOneDurection, [actualPortX, actualPortY], actualBodyPosition);
        
        // check if turning will kill bot
        let rightDie = hitRight(botOneHead, botOnePosition, botTwoHead, botTwoPosition, botThreeHead, botThreePosition, botOneDurection, [actualPortX, actualPortY], actualBodyPosition);
        let leftDie = hitLeft(botOneHead, botOnePosition, botTwoHead, botTwoPosition, botThreeHead, botThreePosition, botOneDurection, [actualPortX, actualPortY], actualBodyPosition);
        
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
        botOneDied = checkDie(botOnePosition, botOneHead, botTwoHead, botTwoPosition, botThreeHead, botThreePosition, actualBodyPosition, [actualPortX, actualPortY]);

        // show head if on screen
        showBot(botOneHead, botOnePosition, botOneColor, actualPortX, actualPortY);
    }

    function botTypeTwo(actualPortX, actualPortY) {
        if (botTwoDied == true) {
            resetTwo();
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
        let straightDie = hitStraight(botTwoPosition, botTwoHead, botOneHead, botOnePosition, botThreeHead, botThreePosition, botTwoDurection, [actualPortX, actualPortY], actualBodyPosition);
        
        // check if turning will kill bot
        let rightDie = hitRight(botTwoHead, botTwoPosition, botOneHead, botOnePosition, botThreeHead, botThreePosition, botTwoDurection, [actualPortX, actualPortY], actualBodyPosition);
        let leftDie = hitLeft(botTwoHead, botTwoPosition, botOneHead, botOnePosition, botThreeHead, botThreePosition, botTwoDurection, [actualPortX, actualPortY], actualBodyPosition);
        
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
        botTwoDied = checkDie(botTwoPosition, botTwoHead, botOneHead, botOnePosition, botThreeHead, botThreePosition, actualBodyPosition, [actualPortX, actualPortY]);

        // show head if on screen
        showBot(botTwoHead, botTwoPosition, botTwoColor, actualPortX, actualPortY);
    }

    function botTypeThree(actualPortX, actualPortY) {
        if (botThreeDied == true) {
            resetThree();
            return;
        }
        // move bot straight(S), right(R), left(L)
        let changeDurection = "S";
        let foodVisable = "None";
        // check if food is on the screen
        for (let i = 0; i < foodPosition.length; i++) {
            if (foodPosition[i][0] >= botThreeHead[0] - Math.floor(multiFieldWidth / 2) && foodPosition[i][0] <= botThreeHead[0] + Math.floor(multiFieldWidth / 2) && foodPosition[i][1] >= botThreeHead[1] - Math.floor(multiFieldHeight / 2) && foodPosition[i][1] <= botThreeHead[1] + Math.floor(multiFieldHeight / 2)) {
                foodVisable = i;
            }
        }
        // check if bot is going to hit itself going straight
        let straightDie = hitStraight(botThreePosition, botThreeHead, botOneHead, botOnePosition, botTwoHead, botTwoPosition, botThreeDurection, [actualPortX, actualPortY], actualBodyPosition);
        
        // check if turning will kill bot
        let rightDie = hitRight(botThreeHead, botThreePosition, botOneHead, botOnePosition, botTwoHead, botTwoPosition, botThreeDurection, [actualPortX, actualPortY], actualBodyPosition);
        let leftDie = hitLeft(botThreeHead, botThreePosition, botOneHead, botOnePosition, botTwoHead, botTwoPosition, botThreeDurection, [actualPortX, actualPortY], actualBodyPosition);
        
        {
            // avoid walls if needed
            if (botThreeHead[0] == totalFieldWidth - 1 && botThreeDurection == "R") {
                if (botThreeHead[1] == 0) {
                    changeDurection = "R";
                } else if (botThreeHead[1] == totalFieldHeight - 1) {
                    changeDurection = "L";
                } else {
                    if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
                        changeDurection = "R";
                    } else {
                        changeDurection = "L";
                    }
                }
            } else if (botThreeHead[0] == 0 && botThreeDurection == "L") {
                if (botThreeHead[1] == 0) {
                    changeDurection = "L";
                } else if (botThreeHead[1] == totalFieldHeight - 1) {
                    changeDurection = "R";
                } else {
                    if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
                        changeDurection = "R";
                    } else {
                        changeDurection = "L";
                    }
                }
            } else if (botThreeHead[1] == 0 && botThreeDurection == "U") {
                if (botThreeHead[0] == 0) {
                    changeDurection = "R";
                } else if (botThreeHead[0] == totalFieldWidth - 1) {
                    changeDurection = "L";
                } else {
                    if (Math.round(Math.random()) == 0 && leftDie == true && rightDie == false) {
                        changeDurection = "R";
                    } else {
                        changeDurection = "L";
                    }
                }
            } else if (botThreeHead[1] == totalFieldHeight - 1 && botThreeDurection == "D") {
                if (botThreeHead[0] == 0) {
                    changeDurection = "L";
                } else if (botThreeHead[0] == totalFieldWidth - 1) {
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
                for (let i = 0; i < botThreePosition.length; i++) {
                    if (botThreeDurection == "R") {
                        if (botThreePosition[i][0] == botThreeHead[0] && botThreePosition[i][1] == botThreeHead[1] - 1) {
                            straightDie = true;
                        }
                    } else if (botThreeDurection == "L") {
                        if (botThreePosition[i][0] == botThreeHead[0] && botThreePosition[i][1] == botThreeHead[1] + 1) {
                            straightDie = true;
                        }
                    } else if (botThreeDurection == "U") {
                        if (botThreePosition[i][0] == botThreeHead[0] - 1 && botThreePosition[i][1] == botThreeHead[1]) {
                            straightDie = true;
                        }
                    } else if (botThreeDurection == "D") {
                        if (botThreePosition[i][0] == botThreeHead[0] + 1 && botThreePosition[i][1] == botThreeHead[1]) {
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
                if (botThreeDurection == "R") {
                    if (foodPosition[foodVisable][1] > botThreeHead[1] && rightDie == false) {
                        changeDurection = "R";
                    } else if (foodPosition[foodVisable][1] < botThreeHead[1] && leftDie == false) {
                        changeDurection = "L";
                    }
                } else if (botThreeDurection == "L") {
                    if (foodPosition[foodVisable][1] > botThreeHead[1] && leftDie == false) {
                        changeDurection = "L";
                    } else if (foodPosition[foodVisable][1] < botThreeHead[1] && rightDie == false) {
                        changeDurection = "R";
                    }
                } else if (botThreeDurection == "U") {
                    if (foodPosition[foodVisable][0] > botThreeHead[0] && rightDie == false) {
                        changeDurection = "R";
                    } else if (foodPosition[foodVisable][0] < botThreeHead[0] && leftDie == false) {
                        changeDurection = "L";
                    }
                } else if (botThreeDurection == "D") {
                    if (foodPosition[foodVisable][0] > botThreeHead[0] && leftDie == false) {
                        changeDurection = "L";
                    } else if (foodPosition[foodVisable][0] < botThreeHead[0] && rightDie == false) {
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
        botThreeDurection = botChangeDurection(botThreeDurection, changeDurection, botThreeHead);

        // move bot
        botThreePosition.splice(0, 1);
        botThreePosition[botThreePosition.length] = [...botThreeHead];
        if (botThreeDurection == "R") {
            botThreeHead[0]++;
        } else if (botThreeDurection == "L") {
            botThreeHead[0]--;
        } else if (botThreeDurection == "U") {
            botThreeHead[1]--;
        } else if (botThreeDurection == "D") {
            botThreeHead[1]++;
        }

        // eat food if on it
        if (foodVisable != "None") {
            if (botThreeHead[0] == foodPosition[foodVisable][0] && botThreeHead[1] == foodPosition[foodVisable][1]) {
                botThreePosition.splice(0, 0, [...botThreePosition[0]]);
                foodPosition[foodVisable][0] = Math.floor(Math.random() * totalFieldWidth);
                foodPosition[foodVisable][1] = Math.floor(Math.random() * totalFieldHeight);
            }
        }

        // die if run into self
        botThreeDied = checkDie(botThreePosition, botThreeHead, botOneHead, botOnePosition, botTwoHead, botTwoPosition, actualBodyPosition, [actualPortX, actualPortY]);

        // show head if on screen
        showBot(botThreeHead, botThreePosition, botThreeColor, actualPortX, actualPortY);
    }


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
    function checkDie(bodyPosition, headPosition, bot1head, bot1body, bot2head, bot2body, playerPosition, playerHead) {
        // check if hit self
        for (let i = 0; i < bodyPosition.length; i++) {
            if (bodyPosition[i][0] == headPosition[0] && bodyPosition[i][1] == headPosition[1]) {
                return true;
            }
        }
        // check if hit player
        for (let i = 0; i < playerPosition.length; i++) {
            if (playerPosition[i][0] == headPosition[0] && playerPosition[i][1] == headPosition[1]) {
                return true;
            }
        }
        if (playerHead[0] == headPosition[0] && playerHead[1] == headPosition[1]) {
            return true;
        }
        // check if hit other bot
        for (let i = 0; i < bot1body.length; i++) {
            if (bot1body[i][0] == headPosition[0] && bot1body[i][1] == headPosition[1]) {
                return true;
            }
        }
        if (bot1head[0] == headPosition[0] && bot1head[1] == headPosition[1]) {
            return true;
        }
        // check if hit second bot
        for (let i = 0; i < bot2body.length; i++) {
            if (bot2body[i][0] == headPosition[0] && bot2body[i][1] == headPosition[1]) {
                return true;
            }
        }
        if (bot2head[0] == headPosition[0] && bot2head[1] == headPosition[1]) {
            return true;
        }
        return false;
    }

    // check if bot is going to hit something if goes left
    function hitLeft(headPosition, botPosition, bot1head, bot1body, bot2head, bot2body, botDurection, playerhead, playerBody) {
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
        // check if hit left other bot
        for (let i = 0; i < bot1body.length; i++) {
            if (botDurection == "R") {
                if (bot1body[i][0] == headPosition[0] && bot1body[i][1] == headPosition[1] - 1) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (bot1body[i][0] == headPosition[0] && bot1body[i][1] == headPosition[1] + 1) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (bot1body[i][0] == headPosition[0] - 1 && bot1body[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (bot1body[i][0] == headPosition[0] + 1 && bot1body[i][1] == headPosition[1]) {
                    return true;
                }
            }
        }
        if (botDurection == "R") {
            if (bot1head[0] == headPosition[0] && bot1head[1] == headPosition[1] - 1) {
                return true;
            }
        } else if (botDurection == "L") {
            if (bot1head[0] == headPosition[0] && bot1head[1] == headPosition[1] + 1) {
                return true;
            }
        } else if (botDurection == "U") {
            if (bot1head[0] == headPosition[0] - 1 && bot1head[1] == headPosition[1]) {
                return true;
            }
        } else if (botDurection == "D") {
            if (bot1head[0] == headPosition[0] + 1 && bot1head[1] == headPosition[1]) {
                return true;
            }
        }
        // check if hit left second bot
        for (let i = 0; i < bot2body.length; i++) {
            if (botDurection == "R") {
                if (bot2body[i][0] == headPosition[0] && bot2body[i][1] == headPosition[1] - 1) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (bot2body[i][0] == headPosition[0] && bot2body[i][1] == headPosition[1] + 1) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (bot2body[i][0] == headPosition[0] - 1 && bot2body[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (bot2body[i][0] == headPosition[0] + 1 && bot2body[i][1] == headPosition[1]) {
                    return true;
                }
            }
        }
        if (botDurection == "R") {
            if (bot2head[0] == headPosition[0] && bot2head[1] == headPosition[1] - 1) {
                return true;
            }
        } else if (botDurection == "L") {
            if (bot2head[0] == headPosition[0] && bot2head[1] == headPosition[1] + 1) {
                return true;
            }
        } else if (botDurection == "U") {
            if (bot2head[0] == headPosition[0] - 1 && bot2head[1] == headPosition[1]) {
                return true;
            }
        } else if (botDurection == "D") {
            if (bot2head[0] == headPosition[0] + 1 && bot2head[1] == headPosition[1]) {
                return true;
            }
        }

        return false;
    }

    // check if bot is going to hit something if goes right
    function hitRight(headPosition, botPosition, bot1head, bot1body, bot2head, bot2body, botDurection, playerhead, playerBody) {
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

        for (let i = 0; i < bot1body.length; i++) {
            if (botDurection == "R") {
                if (bot1body[i][0] == headPosition[0] && bot1body[i][1] == headPosition[1] + 1) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (bot1body[i][0] == headPosition[0] && bot1body[i][1] == headPosition[1] - 1) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (bot1body[i][0] == headPosition[0] + 1 && bot1body[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (bot1body[i][0] == headPosition[0] - 1 && bot1body[i][1] == headPosition[1]) {
                    return true;
                }
            }
        }
        if (botDurection == "R") {
            if (bot1head[0] == headPosition[0] && bot1head[1] == headPosition[1] + 1) {
                return true;
            }
        } else if (botDurection == "L") {
            if (bot1head[0] == headPosition[0] && bot1head[1] == headPosition[1] - 1) {
                return true;
            }
        } else if (botDurection == "U") {
            if (bot1head[0] == headPosition[0] + 1 && bot1head[1] == headPosition[1]) {
                return true;
            }
        } else if (botDurection == "D") {
            if (bot1head[0] == headPosition[0] - 1 && bot1head[1] == headPosition[1]) {
                return true;
            }
        }

        for (let i = 0; i < bot2body.length; i++) {
            if (botDurection == "R") {
                if (bot2body[i][0] == headPosition[0] && bot2body[i][1] == headPosition[1] + 1) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (bot2body[i][0] == headPosition[0] && bot2body[i][1] == headPosition[1] - 1) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (bot2body[i][0] == headPosition[0] + 1 && bot2body[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (bot2body[i][0] == headPosition[0] - 1 && bot2body[i][1] == headPosition[1]) {
                    return true;
                }
            }
        }
        if (botDurection == "R") {
            if (bot2head[0] == headPosition[0] && bot2head[1] == headPosition[1] + 1) {
                return true;
            }
        } else if (botDurection == "L") {
            if (bot2head[0] == headPosition[0] && bot2head[1] == headPosition[1] - 1) {
                return true;
            }
        } else if (botDurection == "U") {
            if (bot2head[0] == headPosition[0] + 1 && bot2head[1] == headPosition[1]) {
                return true;
            }
        } else if (botDurection == "D") {
            if (bot2head[0] == headPosition[0] - 1 && bot2head[1] == headPosition[1]) {
                return true;
            }
        }

        return false;
    }

    // check if bot is going to hit something if goes straight
    function hitStraight(botPosition, headPosition, bot1head, bot1body, bot2head, bot2body, botDurection, playerhead, playerBody) {
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

        for (let i = 0; i < bot1body.length; i++) {
            if (botDurection == "R") {
                if (bot1body[i][0] == headPosition[0] + 1 && bot1body[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (bot1body[i][0] == headPosition[0] - 1 && bot1body[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (bot1body[i][0] == headPosition[0] && bot1body[i][1] == headPosition[1] - 1) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (bot1body[i][0] == headPosition[0] && bot1body[i][1] == headPosition[1] + 1) {
                    return true;
                }
            }
        }
        if (botDurection == "R") {
            if (bot1head[0] == headPosition[0] + 1 && bot1head[1] == headPosition[1]) {
                return true;
            }
        } else if (botDurection == "L") {
            if (bot1head[0] == headPosition[0] - 1 && bot1head[1] == headPosition[1]) {
                return true;
            }
        } else if (botDurection == "U") {
            if (bot1head[0] == headPosition[0] && bot1head[1] == headPosition[1] - 1) {
                return true;
            }
        } else if (botDurection == "D") {
            if (bot1head[0] == headPosition[0] && bot1head[1] == headPosition[1] + 1) {
                return true;
            }
        }

        for (let i = 0; i < bot2body.length; i++) {
            if (botDurection == "R") {
                if (bot2body[i][0] == headPosition[0] + 1 && bot2body[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "L") {
                if (bot2body[i][0] == headPosition[0] - 1 && bot2body[i][1] == headPosition[1]) {
                    return true;
                }
            } else if (botDurection == "U") {
                if (bot2body[i][0] == headPosition[0] && bot2body[i][1] == headPosition[1] - 1) {
                    return true;
                }
            } else if (botDurection == "D") {
                if (bot2body[i][0] == headPosition[0] && bot2body[i][1] == headPosition[1] + 1) {
                    return true;
                }
            }
        }
        if (botDurection == "R") {
            if (bot2head[0] == headPosition[0] + 1 && bot2head[1] == headPosition[1]) {
                return true;
            }
        } else if (botDurection == "L") {
            if (bot2head[0] == headPosition[0] - 1 && bot2head[1] == headPosition[1]) {
                return true;
            }
        } else if (botDurection == "U") {
            if (bot2head[0] == headPosition[0] && bot2head[1] == headPosition[1] - 1) {
                return true;
            }
        } else if (botDurection == "D") {
            if (bot2head[0] == headPosition[0] && bot2head[1] == headPosition[1] + 1) {
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

    // check if player hits bot
    function playerDied(playerHead) {
        // check if player hit bot one
        for (let i = 0; i < botOnePosition.length; i++) {
            if (botOnePosition[i][0] == playerHead[0] && botOnePosition[i][1] == playerHead[1]) {
                return true;
            }
        }
        if (botOneHead[0] == playerHead[0] && botOneHead[1] == playerHead[1]) {
            return true;
        }
        // check if player hit bot two
        for (let i = 0; i < botTwoPosition.length; i++) {
            if (botTwoPosition[i][0] == playerHead[0] && botTwoPosition[i][1] == playerHead[1]) {
                return true;
            }
        }
        if (botTwoHead[0] == playerHead[0] && botTwoHead[1] == playerHead[1]) {
            return true;
        }
        // check if player hit bot three
        for (let i = 0; i < botThreePosition.length; i++) {
            if (botThreePosition[i][0] == playerHead[0] && botThreePosition[i][1] == playerHead[1]) {
                return true;
            }
        }
        if (botThreeHead[0] == playerHead[0] && botThreeHead[1] == playerHead[1]) {
            return true;
        }

        return false;
    }
}
*/