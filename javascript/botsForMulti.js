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


    function resetBots() {
        // position head of bot
        let x = Math.floor(Math.random() * totalFieldWidth);
        let y = Math.floor(Math.random() * totalFieldHeight);
        botOneHead = [x, y];
        x = Math.floor(Math.random() * totalFieldWidth);
        y = Math.floor(Math.random() * totalFieldHeight);
        botTwoHead = [x, y];
        x = Math.floor(Math.random() * totalFieldWidth);
        y = Math.floor(Math.random() * totalFieldHeight);
        botThreeHead = [x, y];

        // position body based on head
        
    }

    function botTypeOne() {
        
    }
}