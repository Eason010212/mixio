/*
 * Name          : joy.js
 * @author       : Roberto D'Amico (Bobboteck)
 * Last modified : 09.06.2020
 * Revision      : 1.1.6
 *
 */
 
/**
 * @desc Principal object that draw a joystick, you only need to initialize the object and suggest the HTML container
 * @costructor
 * @param container {String} - HTML object that contains the Joystick
 * @param parameters (optional) - object with following keys:
 *	title {String} (optional) - The ID of canvas (Default value is 'joystick')
 * 	width {Int} (optional) - The width of canvas, if not specified is setted at width of container object (Default value is the width of container object)
 * 	height {Int} (optional) - The height of canvas, if not specified is setted at height of container object (Default value is the height of container object)
 * 	internalFillColor {String} (optional) - Internal color of Stick (Default value is '#00AA00')
 * 	internalLineWidth {Int} (optional) - Border width of Stick (Default value is 2)
 * 	internalStrokeColor {String}(optional) - Border color of Stick (Default value is '#003300')
 * 	externalLineWidth {Int} (optional) - External reference circonference width (Default value is 2)
 * 	externalStrokeColor {String} (optional) - External reference circonference color (Default value is '#008000')
 * 	autoReturnToCenter {Bool} (optional) - Sets the behavior of the stick, whether or not, it should return to zero position when released (Default value is True and return to zero)
 */
var JoyStick = (function(container, parameters)
{
	parameters = parameters || {};
	var title = (typeof parameters.title === "undefined" ? "joystick" : parameters.title),
		width = (typeof parameters.width === "undefined" ? 0 : parameters.width),
		height = (typeof parameters.height === "undefined" ? 0 : parameters.height),
		internalFillColor = (typeof parameters.internalFillColor === "undefined" ? "#B4DCFF" : parameters.internalFillColor),
		internalLineWidth = (typeof parameters.internalLineWidth === "undefined" ? 2 : parameters.internalLineWidth),
		internalStrokeColor = (typeof parameters.internalStrokeColor === "undefined" ? "#4e73df" : parameters.internalStrokeColor),
		externalLineWidth = (typeof parameters.externalLineWidth === "undefined" ? 8 : parameters.externalLineWidth),
		externalStrokeColor = (typeof parameters.externalStrokeColor ===  "undefined" ? "#4e73df" : parameters.externalStrokeColor),
		autoReturnToCenter = (typeof parameters.autoReturnToCenter === "undefined" ? true : parameters.autoReturnToCenter);
	
	// Create Canvas element and add it in the Container object
	var objContainer = document.getElementById(container);
	var canvas = document.createElement("canvas");
	canvas.id = title;
	if(width === 0) { width = objContainer.clientWidth; }
	if(height === 0) { height = objContainer.clientHeight; }
	canvas.width = width*2;
	canvas.height = height*2;
	canvas.style = "width:"+width+"px;height:"+height+"px;"
	objContainer.appendChild(canvas);
	var context=canvas.getContext("2d");
	
	var pressed = 0; // Bool - 1=Yes - 0=No
    var circumference = 2 * Math.PI;
    var internalRadius = (canvas.width-((canvas.width/2)+30))/2;
	var maxMoveStick = internalRadius + 10;
	var externalRadius = internalRadius + 60;
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var directionHorizontalLimitPos = canvas.width / 10;
	var directionHorizontalLimitNeg = directionHorizontalLimitPos * -1;
	var directionVerticalLimitPos = canvas.height / 10;
	var directionVerticalLimitNeg = directionVerticalLimitPos * -1;
	// Used to save current position of stick
	var movedX=centerX;
	var movedY=centerY;
		
	// Check if the device support the touch or not
	if("ontouchstart" in document.documentElement)
	{
		canvas.addEventListener("touchstart", onTouchStart, false);
		canvas.addEventListener("touchmove", onTouchMove, false);
		canvas.addEventListener("touchend", onTouchEnd, false);
	}
	else
	{
		canvas.addEventListener("mousedown", onMouseDown, false);
		canvas.addEventListener("mousemove", onMouseMove, false);
		canvas.addEventListener("mouseup", onMouseUp, false);
	}
	// Draw the object
	drawExternal();
	drawInternal();

	/******************************************************
	 * Private methods
	 *****************************************************/

	/**
	 * @desc Draw the external circle used as reference position
	 */
	function drawExternal()
	{
		context.beginPath();
		context.arc(centerX, centerY, externalRadius, 0, circumference, false);
		context.lineWidth = externalLineWidth;
		context.strokeStyle = externalStrokeColor;
		context.stroke();
	}

	/**
	 * @desc Draw the internal stick in the current position the user have moved it
	 */
	function drawInternal()
	{
		context.beginPath();
		if(movedX<internalRadius) { movedX=maxMoveStick; }
		if((movedX+internalRadius) > canvas.width) { movedX = canvas.width-(maxMoveStick); }
		if(movedY<internalRadius) { movedY=maxMoveStick; }
		if((movedY+internalRadius) > canvas.height) { movedY = canvas.height-(maxMoveStick); }
		context.arc(movedX, movedY, internalRadius, 0, circumference, false);
		// create radial gradient
		var grd = context.createRadialGradient(centerX, centerY, 5, centerX, centerY, 200);
		// Light color
		grd.addColorStop(0, internalFillColor);
		// Dark color
		grd.addColorStop(1, internalStrokeColor);
		context.fillStyle = grd;
		context.fill();
		context.lineWidth = internalLineWidth;
		context.strokeStyle = internalStrokeColor;
		context.stroke();
	}
	
	/**
	 * @desc Events for manage touch
	 */
	function onTouchStart(event) 
	{
		event.preventDefault();
		pressed = 1;
		event.stopPropagation()
	}

	function onTouchMove(event)
	{
		// Prevent the browser from doing its default thing (scroll, zoom)
		event.preventDefault();
		if(pressed === 1 && event.targetTouches[0].target === canvas)
		{
			movedX = event.targetTouches[0].pageX*2;
			movedY = event.targetTouches[0].pageY*2;
			// Manage offset
			if(canvas.offsetParent.tagName.toUpperCase() === "BODY")
			{
				movedX -= canvas.offsetLeft;
				movedY -= canvas.offsetTop;
			}
			else
			{
				movedX -= $(canvas).offset().left*2;
				movedY -= $(canvas).offset().top*2;
			}
			// Delete canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
			// Redraw object
			drawExternal();
			drawInternal();
		}
	} 

	function onTouchEnd(event) 
	{
		event.preventDefault();
		pressed = 0;
		// If required reset position store variable
		if(autoReturnToCenter)
		{
			movedX = centerX;
			movedY = centerY;
		}
		// Delete canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Redraw object
		drawExternal();
		drawInternal();
		//canvas.unbind('touchmove');
	}

	/**
	 * @desc Events for manage mouse
	 */
	function onMouseDown(event) 
	{
		event.preventDefault();
		pressed = 1;
	}

	function onMouseMove(event) 
	{
		event.preventDefault();
		if(pressed === 1)
		{
			movedX = event.offsetX*2;
			movedY = event.offsetY*2;
			// Manage offset
			if(canvas.offsetParent.tagName.toUpperCase() === "BODY")
			{
				movedX -= canvas.offsetLeft;
				movedY -= canvas.offsetTop;
			}
			else
			{
				movedX -= canvas.offsetParent.offsetLeft/2;
				movedY -= canvas.offsetParent.offsetTop/2;
			}
			// Delete canvas
			context.clearRect(0, 0, canvas.width, canvas.height);
			// Redraw object
			drawExternal();
			drawInternal();
		}
	}

	function onMouseUp(event) 
	{
		event.preventDefault();
		pressed = 0;
		// If required reset position store variable
		if(autoReturnToCenter)
		{
			movedX = centerX;
			movedY = centerY;
		}
		// Delete canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Redraw object
		drawExternal();
		drawInternal();
		//canvas.unbind('mousemove');
	}

	/******************************************************
	 * Public methods
	 *****************************************************/
	
	/**
	 * @desc The width of canvas
	 * @return Number of pixel width 
	 */
	this.GetWidth = function () 
	{
		return canvas.width;
	};
	
	/**
	 * @desc The height of canvas
	 * @return Number of pixel height
	 */
	this.GetHeight = function () 
	{
		return canvas.height;
	};
	
	/**
	 * @desc The X position of the cursor relative to the canvas that contains it and to its dimensions
	 * @return Number that indicate relative position
	 */
	this.GetPosX = function ()
	{
		return movedX;
	};
	
	/**
	 * @desc The Y position of the cursor relative to the canvas that contains it and to its dimensions
	 * @return Number that indicate relative position
	 */
	this.GetPosY = function ()
	{
		return movedY;
	};
	
	/**
	 * @desc Normalizzed value of X move of stick
	 * @return Integer from -100 to +100
	 */
	this.GetX = function ()
	{
		return (100*((movedX - centerX)/maxMoveStick)).toFixed();
	};

	/**
	 * @desc Normalizzed value of Y move of stick
	 * @return Integer from -100 to +100
	 */
	this.GetY = function ()
	{
		return ((100*((movedY - centerY)/maxMoveStick))*-1).toFixed();
	};
	
	/**
	 * @desc Get the direction of the cursor as a string that indicates the cardinal points where this is oriented
	 * @return String of cardinal point N, NE, E, SE, S, SW, W, NW and C when it is placed in the center
	 */
	this.GetDir = function()
	{
		var result = "";
		var orizontal = movedX - centerX;
		var vertical = movedY - centerY;
		
		if(vertical >= directionVerticalLimitNeg && vertical <= directionVerticalLimitPos)
		{
			result = "C";
		}
		if(vertical < directionVerticalLimitNeg)
		{
			result = "N";
		}
		if(vertical > directionVerticalLimitPos)
		{
			result = "S";
		}
		
		if(orizontal < directionHorizontalLimitNeg)
		{
			if(result === "C")
			{ 
				result = "W";
			}
			else
			{
				result += "W";
			}
		}
		if(orizontal > directionHorizontalLimitPos)
		{
			if(result === "C")
			{ 
				result = "E";
			}
			else
			{
				result += "E";
			}
		}
		
		return result;
	};
});
