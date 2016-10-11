//For DogeSketch - by Michael Liu
//Run the function when the window Loads
//Each mouse-event explained below
window.onload = function() { 
	var board = document.getElementById('container');
	var dclick = document.querySelector("#doge");
	board.addEventListener('mousedown', chalked);
	board.addEventListener('mousemove', dragChalk);
	board.addEventListener('mouseup', removeChalk);
	board.addEventListener('mouseleave', removeChalkAgain);
	dclick.addEventListener('click', wipeBoard);
	introText();	
	document.addEventListener('keydown',addedKeyPressForAssignment); //added as an afterthought for assignment requirements sorry for the lack of originality
}

/* painting variable is used as a boolean to determine if you are painting/drawing;
 if you have your chalk down/up: 1 = painting/drawing, 0 = chalk lifted up.
 Looking back I probably could have used true/false..
*/
var painting;

//  function chalked is used for mousedown event to "draw" with the chalk. Adjustments were made to the style 
// in the x and y values of the drawing to account for the positioning of the chalkboard
function chalked(ev){
	painting = 1;
	console.log(ev);
	var xCoordinate = ev.pageX;
	var yCoordinate = ev.pageY;
	var el = document.createElement('div')
	el.className ='chalk';
	el.style.top =(yCoordinate -100)+'px'; //can divide by two, etc, subtrac tit. 
	el.style.left =(xCoordinate -110)+'px';
	document.querySelector('#container').appendChild(el);
}

//removeChalk() uses the mouseup event and sets the painting variable value to 0, as if you lifted up the chalk
function removeChalk(ev){
	painting = 0;
	//console.log(ev);
}

/* Here for removeChalkAgain() I tried to use a mouseleave event based on the
 chalkboard/container if you drew out of the page it would stop painting..however there are some bugs
 explained in the dragChalk() function below 
 */
function removeChalkAgain(ev){
	painting = 0;
	//console.log(ev);
}	

//Function dragchalk checks with the painting variable to check if the user is still drawing/ has their mousedown,
//So by using a mousemove event and the user is drawing, it continues to draw, creating a dragging effect.
function dragChalk(ev){
	if (painting == 1){
	var xCoordinate = ev.pageX;
	var yCoordinate = ev.pageY;
	var el = document.createElement('div')
	el.className ='chalk';
	el.style.top =(yCoordinate -100)+'px'; //can divide by two, etc, subtrac tit. 
	el.style.left =(xCoordinate - 110)+'px';

/* Created two if statements to compensate for the offset of the elements. Not entirely sure why
 the mouseleave does not catch when the pointer leaves the chalkboard on the right and bottom 
 but I assume its likely due to my adjustments in the x and y coorinates (-100px & -110px). 
 */
		if(yCoordinate>440){
			painting = 0;
		}
		if(xCoordinate>700){
			painting = 0;
		}
	document.querySelector('#container').appendChild(el);
	}
}

/* wipeBoard selects all the chalk drawn on the board with the chalk class
by returning through a frozen Nodelist and iterating to remove each child...
holy cow this took me a freaking long time to figure out.
*/
function wipeBoard(ev){
	console.log(ev);
	var elList = document.querySelectorAll('.chalk'),i;
	for(i=0; i<elList.length; ++i){
		elList[i].parentNode.removeChild(elList[i]);
	}

	clickCounter += 1;	//this is part of the aesthetics below... EASTER EGG??!
	muchErase(); //this is part of the aesthetics below... EASTER EGG??!
}

/*From this section on is mainly just aesthetics, must make the doge look naice!*/
var clickCounter = 0;
function muchErase(){	
	if (clickCounter ==2){
	generateText();
	fade();
	}
}

/*this fade() function aims change the style of the image
 to make it appear to be "erasing" and eventually appear again with fadein()
 */
function fade(){
	document.querySelector('img').classList.add('fade');
	setTimeout(fadein,2500);	
}

//Function tries to replicate a "fade out of nowhere", by setting the opacity back to 1
function fadein(){
	document.querySelector('img').setAttribute("style", "opacity: 1");
}

/*Essentially generates some text with the doge image to dissapear in sync with the "erasing" of doge
Various timeouts to sync the timing, including to smoothness of the text. 
There must be a simpler way to do this. please teach me sensei. 
*/

function generateText(){
		var el = document.createElement('div');
		el.className= 'text';
		el.textContent = "!!!!!!"; 
		document.querySelector("#doge").appendChild(el);
//Series of setTimeout functions to fadein and fadeout
		setTimeout(function(){
		el.classList.add('fade');
		},600);
		setTimeout(function(){
			el.textContent= "much phew";
		},2600);
		setTimeout(function(){
			el.textContent= "very erase";
		},4000);
		setTimeout(function(){
			el.setAttribute("style", "opacity: 1");
		},2600);
		setTimeout(function(){
			el.remove();
		},6000);
}

//Function introText() provides instructions to the user upon loading the page. 
//The text is faded out and removed from the page.
function introText(){
	var instruct1 = document.createElement('div');
	instruct1.className= 'startupText';
	instruct1.textContent = "Click Here to Draw!";
	document.querySelector("#container").appendChild(instruct1);

	var instruct2 = document.createElement('div');
	instruct2.className= 'startupText2';
	instruct2.textContent = "Click on doge to Erase ->";
 	document.querySelector("#container").appendChild(instruct2);
		
	var instruct3 = document.createElement('div');
	instruct3.className= 'startupText';
	instruct3.style.width = '500px';
	instruct3.style.top= '270px';
	instruct3.style.left= '80px';
	instruct3.style.fontSize = '30px';
	instruct3.textContent = "Use Arrow Keys to change doge";
 	document.querySelector("#container").appendChild(instruct3);

//Series of timeout functions to fadeout each text individually
	setTimeout(function(){
	instruct1.classList.add('fade');
	},500);
	setTimeout(function(){
	instruct2.classList.add('fade');
	},1000);
	setTimeout(function(){
	instruct3.classList.add('fade');
	},1500);

	setTimeout(function(){
		instruct1.remove();
		instruct2.remove();
		instruct3.remove();
	},3000);
}

//This function was added to use the arrow keys to have Keydown/keyboard event. 
//Uses the arrow keys to cycle through doge images. Enjoy. 
function addedKeyPressForAssignment( ev ) {
	var keyNumber =ev.keyCode;
	console.log(keyNumber);
	var direction = String.fromCodePoint(keyNumber);
	var obj =document.querySelector('#dogeface');
	//keyCodes for up,down,left,right arrowkeys
		switch(ev.keyCode){
		case 37: //left
		obj.src="./_media/dwi.png";
		break;
		case 38: //up
		obj.src="./_media/lol.png";
		break;
		case 39://right
		obj.src="./_media/dogeMir.png";
		break;
		case 40: //down
		obj.src="./_media/dogeicon.png";
		break;
	}
}