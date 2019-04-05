
// Settings:
var npcAmmount = 11; var started = false; var gameActive = false; var hit = false; var gameActive = false;
var gameData = {
    livePos: '0,1', liveNPCTbl: {}
}
function genNPCs(){
    let doSplit = gameData.livePos.split(',');
    for (i = 1; i < npcAmmount;){
        let xCor =  Math.floor((Math.random() * 8) + 1 + doSplit[0]);  
        let yCor = Math.floor((Math.random() * 3));
        let cordString = (xCor + ',' + yCor);
        // jQuery is used here to check for the existence of an element in an arbitrary array. 
        // It was obtained from: https://jquery.com/download/
        // The direct link to download is: https://code.jquery.com/jquery-3.3.1.slim.min.js
        if ($.inArray(cordString,gameData.liveNPCTbl) > -1){
        } else {
            gameData.liveNPCTbl[i] = (cordString); i++;
        }
    }
}
function renderNPCs(){
    let aSplit = gameData.livePos.split(',');
    for (i in gameData.liveNPCTbl){
        if (gameData.liveNPCTbl[i] == ''){
        } else {
            document.getElementById(gameData.liveNPCTbl[i]).innerHTML = '<img src=images/oppPlayer.png></img>';
        }
    }
}
function handleNPCs(){
    let aSplit = gameData.livePos.split(',');
    for (i in gameData.liveNPCTbl){
        let doSplit = gameData.liveNPCTbl[i].split(',')
        if (doSplit[0] >= aSplit[0] && doSplit[0] > 0){
            doSplit[0]--; let unSplit = doSplit.toString('');
            document.getElementById(gameData.liveNPCTbl[i]).innerHTML = '';
            gameData.liveNPCTbl[i] = unSplit;
            document.getElementById(gameData.liveNPCTbl[i]).innerHTML = '<img src=images/oppPlayer.png></img>';
        }
        document.getElementById(gameData.livePos).innerHTML = '<img src=images/player.png></img>';
    }
}
function movePlr(direction){
    let doSplit = gameData.livePos.split(',');
    switch(direction){
        case 1: // right arrow
            if (doSplit[0] < 9){
                doSplit[0]++; let updated = doSplit.toString(',');
                document.getElementById(gameData.livePos).innerHTML = '';
                document.getElementById(updated).innerHTML = '<img src=images/player.png></img>';
                gameData.livePos = updated; checkHit(); 
                if (hit == false){
                    handleNPCs();
                } else {
                    hit = false; 
                }
                hit = false;
                checkHit(); renderNPCs();
            } else {
                alert('Touchdown! You win.');
                window.location.reload(false); 
            }
        break;
        case 2: // up arrow
            if (doSplit[1] < 2){
                doSplit[1]++; let updated = doSplit.toString(',');
                document.getElementById(gameData.livePos).innerHTML = '';
                document.getElementById(updated).innerHTML = '<img src=images/player.png></img>';
                gameData.livePos = updated; hit = false; checkHit(); hit = false; renderNPCs();
            } else {
                break;
            }
        break;
        case 3: // down arrow
            if (doSplit[1] > 0){
                doSplit[1]--; let updated = doSplit.toString(',');
                document.getElementById(gameData.livePos).innerHTML = '';
                document.getElementById(updated).innerHTML = '<img src=images/player.png></img>';
                gameData.livePos = updated; hit = false; checkHit(); hit = false; renderNPCs();
            } else {
                break;
            }
        break;
    }
}
function loadData(cName){
    try {
        let tmpData = document.cookie.match(new RegExp(cName + '=([^;]+)')); 
        tmpData = JSON.parse(tmpData[1]); gameData = tmpData;
        renderNPCs(gameData.liveNPCTbl); gameActive = true;
        document.getElementById(gameData.livePos).innerHTML = '<img src=images/player.png></img>';
    } catch (error) {
        console.log(error); alert("No saved data found!")
    }
}
function saveData(cName){
    let tmpJSON = JSON.stringify(gameData);
    let localCookie  = (cName + "=" + tmpJSON + ";path=/");
    document.cookie = localCookie;
}
function checkHit(){
    hit = false;
    for (i in gameData.liveNPCTbl){
        if (gameData.livePos == gameData.liveNPCTbl[i]){
            gameActive = false; hit = true; gameData.liveNPCTbl[i] = '';
            document.getElementById(gameData.livePos).innerHTML = '<img src=images/player.png></img>';
        }
    }
    if (hit == true){
        document.getElementById(gameData.livePos).innerHTML = '<img src=images/player.png></img>';
        alert('You were tackled. Click OK to continue.');
        gameActive = true;
        document.getElementById(gameData.livePos).innerHTML = '<img src=images/player.png></img>';
    }
}
function startGame(){
    if (started == false){
        started = true; gameActive = true;
        document.getElementById(gameData.livePos).innerHTML = '<img src=images/player.png></img>';
        genNPCs(); renderNPCs();
    } 
}
// jQuery is used here to make the arrow keys work with the game. 
// It was obtained from: https://jquery.com/download/
// The direct link to download is: https://code.jquery.com/jquery-3.3.1.slim.min.js
$(document).keydown(function(key){
    if (gameActive){
        switch(key.which) {
            case 38: // up
            movePlr(2); break;
            case 39: // right
            movePlr(1); break;
            case 40: // down
            movePlr(3);break;
            default: return;
        }
        key.preventDefault();
    } 
});
