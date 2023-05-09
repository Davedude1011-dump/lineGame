
		// function to initialize drawing canvas
		function initCanvas(canvas) {
			// set the canvas width and height to match the CSS styling
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;

			// get the 2D drawing context for the canvas
			var context = canvas.getContext('2d');

			// set the initial drawing style
			context.lineWidth = 4;
			context.lineCap = 'round';
			context.strokeStyle = '#000000';

			// set up some variables to track the mouse position and whether it's currently being clicked
			var isDrawing = false;
			var lastX, lastY;

			// listen for mouse events on the canvas
			canvas.addEventListener('mousedown', function(event) {
				// check if the user left-clicked on the canvas
				if (event.button === 0) {
					// start drawing
					isDrawing = true;
					lastX = event.clientX - canvas.offsetLeft;
					lastY = event.clientY - canvas.offsetTop;

					// draw a dot at the initial click position
					context.beginPath();
					context.arc(lastX, lastY, context.lineWidth/2, 0, Math.PI*2);
					context.fill();
					context.closePath();
				}
			});

			canvas.addEventListener('contextmenu', function(event) {
				// prevent the default context menu behavior
				event.preventDefault();

				// clear the canvas
				context.clearRect(0, 0, canvas.width, canvas.height);
			});

			canvas.addEventListener('mousemove', function(event) {
				if (isDrawing) {
					var x = event.clientX - canvas.offsetLeft;
					var y = event.clientY - canvas.offsetTop;

					context.beginPath();
					context.moveTo(lastX, lastY);
					context.lineTo(x, y);
					context.stroke();

					lastX = x;
					lastY = y;
				}
			});

			canvas.addEventListener('mouseup', function(event) {
				isDrawing = false;
			});
		}

		// get the canvas elements by their ID and initialize them
		var canvas1 = document.getElementById('canvas1');
		initCanvas(canvas1);

		var canvas2 = document.getElementById('canvas2');
		initCanvas(canvas2);

		// toggle the display of the canvases when "1" and "2" keys are pressed respectively
		document.addEventListener('keydown', function(event) {
			if (event.key === '[') {
				if (document.getElementById("canvas1").style.display === "none") {
					document.getElementById("canvas1").style.display = "block";
					document.getElementById("canvas2").style.display = "none";
				}
				else {
					document.getElementById("canvas1").style.display = "none";
				}
			}
			else if (event.key === ']') {
				if (document.getElementById("canvas2").style.display === "none") {
					document.getElementById("canvas2").style.display = "block";
					document.getElementById("canvas1").style.display = "none";
				}
				else {
					document.getElementById("canvas2").style.display = "none";
				}
			}
		});
		document.getElementById("canvas1").style.display = "none";
		document.getElementById("canvas2").style.display = "none";