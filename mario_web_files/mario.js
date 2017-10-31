// JavaScript for creating interactive animations on a canvas 
////////////////////////////////////////////////////////////////////
// Create a Mario object which contains all the info about Mario
// Objects are nice because they allow up to keep all the relevant
// info about an item in one place.

var Mario;
////////////////////////////////////////////////////////////////////


window.onload = init; // calls the function named "init"
//window.onload = document.getElementById(marioSound).play();
// declare the background image
var bgImage = new Image();

// Is called when the window loads;
function init() {
	
	// Initialize Mario Object
	// TODO: Put Mario on the ground instead of the cloud
	Mario = {
		x: 100,
		y: 280,
		w: 50,
		h: 80,
		JumpSound: new Audio('jump.wav'),
		Image: (function() {
			var temp = new Image();
			temp.src = "mario1.png";
			return temp;})(),
		moving: "no",
		timer: "",
		timerInterval: 10
	};

	bgImage.src = "marioBG.jpg";
	draw();

	// TODO: (OPTIONAL) set mario_08.wav as background music

}

////////////////////////////////////////////////////////////////////

function draw() {

	// Get Drawing Area
	var ctx = document.getElementById("mario_canvas").getContext("2d");
	
	// If you want to display images on the canvas when it is initially
	// loaded, you must do it this way
	bgImage.onload = function(){
		ctx.drawImage(bgImage, 0, 0);

    }

	/*
	 * TODO: Draw Mario's initial image
	 */
	Mario.Image.src = "mario1.png";

	/////////////////////////////////////////////////////////////////
	var render = function () {
		ctx.drawImage(bgImage, 0, 0); 
		renderMario();
	}

	/*
	 * TODO: Alter the y coordinates so Mario will jump while on the ground
	 */
	function renderMario(){
		if (Mario.y > 200 && Mario.moving == "up") {
			Mario.Image.src = "mario2.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			// Change the y value each time 
			Mario.y -= 5; // move 5 px up
			ctx.drawImage(bgImage, 0, 0);
            ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
            //clearInterval(Mario.timer);
			console.log("First");
		}else if(Mario.y <= 200 && Mario.moving == "up"){
			Mario.moving = "down";
			Mario.y += 5;
            console.log("Second");
		} else if(Mario.y < 615 && Mario.moving == "down"){
			Mario.Image.src = "mario2.png";
            ctx.drawImage(bgImage, 0, 0);
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			Mario.y += 5;
			// move 5 px back down after a jump
			/*if (Mario.y == 615)
			{
				Mario.moving = "no";
			}*/
            console.log("Third");
		}else if(Mario.y == 615 && Mario.moving == "no"){
			Mario.moving = "up";
			Mario.JumpSound.play();
			console.log("HERE");
		}
		else if (Mario.y ==615 && Mario.moving == "down")
		{
			Mario.Image.src = "mario1.png";
            ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
            //Mario.moving = "up";
			console.log("Fourth");
			console.log(Mario.y, Mario.moving);

		}
		else{//*****************Initial jump from clouds***************************************
			Mario.moving = "no";
			Mario.Image.src = "mario1.png";
			Mario.y += 335;
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			clearInterval(Mario.timer); // kills the timer
		}	
	}
	///////////////////////////////////////////////////////////////////


	/* Monitor key strokes for user input:
	 *
	 * If Enter/Return is pressed, then call the render function
	 * which paints the new scene to the canvas.
	 *
	 * TODO: Add code to set Mario image to proper image whether L or R button pressed
	 * TODO: Stop Mario if he runs out of room
	 *
	 */
	document.body.onkeydown = function(e) {  // listen for a key

        e = event || window.event;             // any kind of event
        var keycode = e.charCode || e.keyCode; // any kind of key
        console.log(keycode);
        // The user wants Mario to jump:
        if (keycode === 13 && Mario.moving == "no") {
            Mario.timer = setInterval(renderMario, Mario.timerInterval);
        }

        else if (keycode === 76 && Mario.x >= 10) {
            Mario.Image.src = "left.png";

            //ctx.clearRect(Mario.x, Mario.y + 335, Mario.w, Mario.h);

                Mario.x -= 20;
                ctx.drawImage(bgImage, 0, 0);
                ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
                clearInterval(Mario.timer);
                setTimeout(faceForward, 200);
        }
        else if (keycode === 82 && Mario.x <= 1000) {
            Mario.Image.src = "right.png";

            Mario.x += 20;
            ctx.drawImage(bgImage, 0, 0);
            ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
            clearInterval(Mario.timer);
            setTimeout(faceForward, 200);
    }


    /* TODO:
     * TODO: Capture keycodes for L and R. In each, set a timeout that calls a function
     * TODO: to face Mario forward after 200 ms. HINT: setTimeout(function, timeInMilliSecs)
     */
    document.body.onkeyup = function(e) {  // listen for a key
		/*e = event || window.event;
		var keycode = e.charCode || e.keyCode;
		console.log(keycode);

		if (keycode === 76)
		{
			Mario.Image.src = "left.png";

            ctx.drawImage(Mario.Image, Mario.x, Mario.y + 335, Mario.w, Mario.h);
            clearInterval(Mario.timer);
		}*/
    }


    /*
     * TODO: Face Mario forward. Do not forget to draw the background image first
     */
    function faceForward() {
		Mario.Image.src = "mario1.png";
        ctx.drawImage(bgImage, 0, 0);
        ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
    }
	
}
}// close draw()
