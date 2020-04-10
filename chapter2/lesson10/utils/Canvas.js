/**
* Canvas r2016-04-03
* @author Josh Gibbs - uPaymeiFixit@gmail.com
*
* Creates a new canvas DOM element to draw on
*
* Usage:
*	var ctx = new Canvas()
*
* Optional object items:
*	x: x position of the canvas (default: 0),
*	y: y position of the canvas (default: 0),
*	width: width of the canvas (default: screen width),
*	heigh: height of the canvas (default: screen height),
*   color: background color of the canvas (default: white)
*   style: object containing CSS properties (backgroundColor: 'black')
*   dblclick_fullscreen: {boolean} Allows fullscreen on double click (default: false)
*
* @param   {Object} [options] - Options
* @returns {Object} HTML Canvas Reference
*/

function Canvas(options) {
    options = options || {};
    options.style = options.style || {};

    // Canvas setup
    var context = document.createElement('canvas').getContext('2d');
    context.canvas.innerHTML = 'Your browser does not fully support HTML5';
    context.canvas.id = document.getElementsByTagName('canvas').length;
    context.canvas.style.position = 'absolute';
    context.canvas.style.left = options.x || 0;
    context.canvas.style.top = options.y || 0;
    context.canvas.style.right = 0;
    context.canvas.style.bottom = 0;
    context.canvas.style.backgroundColor = options.color || 'white';

    for (var i in options) {
        context.canvas.style[i] = options.style[i];
    }

    context.fullscreen = function () {
        console.log('failing to go into full screen because rtard-ed');
        if (context.canvas.requestFullscreen) {
            context.canvas.requestFullscreen();
        } else if (context.canvas.msRequestFullscreen) {
            context.canvas.msRequestFullscreen();
        } else if (context.canvas.mozRequestFullScreen) {
            this.canvas.mozRequestFullScreen();
        } else if (context.canvas.webkitRequestFullscreen) {
            context.canvas.webkitRequestFullscreen();
        }
    };

    if (options.dblclick_fullscreen) {
        context.canvas.ondblclick = context.fullscreen;
    }

    context.resize = function () {
        context.width = options.width || window.innerWidth;
        context.height = options.height || window.innerHeight;
        context.canvas.width = context.width;
        context.canvas.height = context.height;
    };

    context.resize();

    document.body.appendChild(context.canvas);
    window.onresize = context.resize;

    return context;
}
