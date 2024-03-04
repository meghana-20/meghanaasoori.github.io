function enableButton(id)
{
	document.getElementById(id).disabled = false;
}
function disableButton(id)
{
	document.getElementById(id).disabled = true;
}
function showTurn(ply) // display current player Name in single player
{
	document.getElementById("splayer").innerHTML = ply.playerName + "'s Turn";
}
function MultishowTurn(ply) // display current player name in multiplayer
{
	document.getElementById("mplayer").innerHTML = ply.playerName + "'s Turn";
}
function pplay()
{
	p.roll(random_number);
	p.move();
	if(com.position > 0)
		com.show(com.position);
	showTurn(com);
	if(p.position == 100) // if player wins
	{	
		alert("you win");
		reset();
		setTimeout(enableButton("dicebtn"),500);
		setTimeout(enableButton("reset"),500);
	}
	else setTimeout(bot,1000); // call computer player
}
function play()
{
	disableButton("dicebtn");
    disableButton("reset");
    rand();
	myfun();
	setTimeout(pplay,3000);
}
function complay()
{
	com.roll(random_number);
	com.move();
	if(p.position > 0)
		p.show(p.position);
	if(com.position == 100)
	{	
		alert("you lose");
		reset();
	}
	showTurn(p);
	setTimeout(enableButton("dicebtn"),500);
	setTimeout(enableButton("reset"),500);
}
function bot()
{
    rand();
	myfun();
	setTimeout(complay,3000);
}
function showGame() //display board
{
	document.getElementById("game").style.display = "block";
	document.getElementById("head").style.display = "none";
}
function senable() //display controls of single player
{
	document.getElementById("sbtn").style.display = "block";
}
function menable() //display controls of multiplayer
{
	document.getElementById("mbtn").style.display = "block";
}
function getcolor() // get color in single player
{
	var color = prompt("Enter Color: ","black");
	if(color == "yellow")
	{
		alert("Not available");
		color = prompt("Enter Color: ","black");
	}
	document.getElementById("splayer").innerHTML = color + "'s Turn";
	p = new Player(color);
}
function singleplayer() // setup function for single player
{
	showGame();
	senable();
	getcolor();
	com = new Player("yellow");
	document.getElementById("splayer").innerHTML = yellow;
}
var i=0;
function delayplaymulti()
{
	players[i].roll(random_number);
	players[i].move();
	for(var k = 0; k < nop; k++)
	{
		if(players[k].position > 0)
			players[k].show(players[k].position);
	}
	if(globalpostion <= players[i].position)
		globalpostion = players[i].position;
	if(globalpostion == 100)
	{
		alert(newFunction() + " Wins");
		reset();
	}
	else{
		++i;
		if(i == nop)
		i = 0;
		MultishowTurn(players[i]);
	}
	function newFunction() {
		return players[i].playerName;
	}
}
function playmulti()
{
    rand();
    myfun();
	setTimeout(delayplaymulti,3000);
}
function start()
{
	disableButton("btn1");
	setTimeout(playmulti(),3000);
	setTimeout(enableButton("btn1"),3000);
}
function multiplayer() {
    menable();
    showGame();
    nop = prompt("Enter no of players : ", "2"); // get the number of players
    // Ensure the number of players does not exceed four
    while (nop > 4) {
        alert("The game supports a maximum of four players.");
        nop = prompt("Enter no of players (maximum 4): ", "2");
    }
    for (var i = 0; i < nop; ++i) {
        var playerName = prompt("Enter player " + (i + 1) + " name:"); // get player name
        // check if name is not empty
        while (!playerName.trim()) {
            alert("Player name cannot be empty.");
            playerName = prompt("Enter player " + (i + 1) + " name:");
        }
        var color = prompt("Enter color for " + playerName + ":"); // get color
        // check if color already taken
        for (var k = 0; k < i; ++k) {
            if (color == players[k].color) {
                alert("Color already chosen by another player.");
                color = prompt("Enter color for " + playerName + ":");
                break;
            }
        }
        players[i] = new Player(playerName, color); // player object initialize
    }
    MultishowTurn(players[0]); // start game from the first player
}

