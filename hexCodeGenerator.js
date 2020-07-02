var firstOptionObj = document.getElementById("firstOption");
var secondOptionObj = document.getElementById("secondOption");
var thirdOptionObj = document.getElementById("thirdOption");
var fourthOptionObj = document.getElementById("fourthOption");
var correctHexCodText = document.getElementById("hexCode");

var easyButton = document.getElementById("setDifEasyButton");
var halfButton = document.getElementById("setDifHalfButton");
var hardButton = document.getElementById("setDifHardButton");

var rightCounter = 0;
var wrongCounter = 0;

var gameDificult = "easy";
var numberOfOptions = 2;

easyButton.disabled = true;
easyButton.style.cursor = "not-allowed";

gameRoll();

function restulCleaner() {
	document.getElementById("result").innerHTML = null;
}

function easyDif () {
	gameDificult = "easy";
	numberOfOptions = 2;
	easyButton.disabled = true;
	easyButton.style.cursor = "not-allowed";
	halfButton.disabled = false;
	halfButton.style.cursor = "pointer";
	hardButton.disabled = false;
	hardButton.style.cursor = "pointer";
	restulCleaner();
}

function halfDif () {
	gameDificult = "half";
	numberOfOptions = 3;
	easyButton.disabled = false;
	easyButton.style.cursor = "pointer";
	halfButton.disabled = true;
	halfButton.style.cursor = "not-allowed";
	hardButton.disabled = false;
	hardButton.style.cursor = "pointer";
	restulCleaner();
}

function hardDif () {
	gameDificult = "hard";
	numberOfOptions = 4;
	easyButton.disabled = false;
	easyButton.style.cursor = "pointer";
	halfButton.disabled = false;
	halfButton.style.cursor = "pointer";
	hardButton.disabled = true;
	hardButton.style.cursor = "not-allowed";
	restulCleaner();
}

document.onkeydown = function testeTecla(event) {	
	var x = event.code;
	if (x == "KeyT") {
		gameRoll();
	}
	if (x == "Digit1") {
		pickColor(firstOptionObj.style.backgroundColor);
	} else if (x == "Digit2") {
		pickColor(secondOptionObj.style.backgroundColor);
	} else if ((x == "Digit3")&&((gameDificult == "half")||(gameDificult == "hard"))) {
		pickColor(thirdOptionObj.style.backgroundColor);
	} else if ((x == "Digit4")&&(gameDificult == "hard")) {
		pickColor(fourthOptionObj.style.backgroundColor);
	} else if ((x == "KeyA")&&(gameDificult!="easy")) {
		easyDif();
	} else if ((x == "KeyS")&&(gameDificult!="half")) {
		halfDif();
	} else if ((x == "KeyD")&&(gameDificult!="hard")) {
		hardDif();
	}	
}

function rgbColorGenerator() {
	var rgb = [ Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)];
	var rgbColor = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
	var hexadecimalColor = "";
	for ( i = 0; i < rgb.length; i++) {
		if (rgb[i] < 16) {
			hexadecimalColor = hexadecimalColor + "0" + rgb[i].toString(16);
		} else {
			hexadecimalColor = hexadecimalColor + rgb[i].toString(16)
		}
	}	
	return (rgbColor);
}

function setColors() {	
	var firstColor = rgbColorGenerator();
	var secondColor = rgbColorGenerator();
	var thirdColor = rgbColorGenerator();
	var fourthColor = rgbColorGenerator();
	
	firstOptionObj.style.backgroundColor = firstColor;
	secondOptionObj.style.backgroundColor = secondColor;	
	if ((gameDificult == "half")||(gameDificult == "hard")) {
		thirdOptionObj.style.backgroundColor = thirdColor;		
		if (gameDificult == "hard") {
			fourthOptionObj.style.backgroundColor = fourthColor;
		}
	}
	
	correctColor = Math.floor(Math.random()*numberOfOptions);
	
	switch (correctColor) {
		case 0:
			correctRandomHex = firstColor;
			break;
		case 1:
			correctRandomHex = secondColor;
			break;
		case 2:
			correctRandomHex = thirdColor;
			break;
		case 3:
			correctRandomHex = fourthColor;
			break;
	}
}

function pickColor(theColor) {
	if (theColor == correctRandomHex) {
		document.getElementById("result").innerHTML = "Correta!";
		rightCounter++;
		document.getElementById("rightCounter").innerHTML = rightCounter;
	} else {
		document.getElementById("result").innerHTML = "Incorreta!";
		wrongCounter++;
		document.getElementById("wrongCounter").innerHTML = wrongCounter;
	}	
	gameRoll();
}

function gameRoll() {
		
	setColors();
	
	correctHexCodText.innerHTML = correctRandomHex;
	
}

function startingGame () {
	document.getElementById("setDif").style.display = "none";
	document.getElementById("inGame").style.display = "flex";
	if (gameDificult == "easy") {
		thirdOptionObj.style.display = "none";
		fourthOptionObj.style.display = "none";
	} else if (gameDificult == "half") {
		thirdOptionObj.style.display = "block";
		fourthOptionObj.style.display = "none";		
	} else if (gameDificult == "hard") {
		thirdOptionObj.style.display = "block";
		fourthOptionObj.style.display = "block";
	}
}

function backToStart () {
	document.getElementById("setDif").style.display = "flex";
	document.getElementById("inGame").style.display = "none";
	rightCounter = 0;
	wrongCounter = 0;
	document.getElementById("rightCounter").innerHTML = rightCounter;
	document.getElementById("wrongCounter").innerHTML = wrongCounter;
}