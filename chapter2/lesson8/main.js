/**
 * LESSON 8 - Canvas Animations
 * @author Josh@Gibbs.tk
 *
 * Welcome to lesson 8! In my opinion this is where things start to get fun.
 * We're going to start animating things. After this lesson you'll have the
 * tools to be able to create really interesting art. Some of my favorite
 * projects I've created are nothing more than animations:
 *     http://gibbs.tk/portfolio/
 */ 
 
/** 
 * In the next few lessons we'll be relying on many of the same functions we
 * created in previous lessons. I've mostly copied and pasted the functions
 * we'll need below and removed many of the comments from before. I'd encourage
 * you to look over them briefly to make sure you understand how they work.
*/

// Return random number between [min, max)
function random(min, max) {
  let size = max - min;
  let number = Math.random() * size; 
  return number + min;
}

// Draw rectangle on ctx
function drawRectangle(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}
// Draw a circle on ctx
function drawCircle(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  String          rgb(r,g,b) format
 */
function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t++;
      if (t > 1) t--;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
  
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return "rgb(" + r * 255 + "," + g * 255 + "," + b * 255 + ")";
}

// Returns a random color with 100% vibrance
function randomColor() {
  return hslToRgb(Math.random(), 1, 0.5);
}

/**
 * Let's make two more functions. In lesson 7 we had a `makeSquare()` function
 * that we used in the `setup()` function. Because I can see the future, I
 * happen to know that we're going to need the same function for the next couple
 * lessons, but for a circle instead. So lets create that real quick:
 */

// Returns a circle object at a random position, size, and color.
function makeCircle() {
  return {
    x: random(0, window.innerWidth),
    y: random(0, window.innerHeight),
    radius: random(10, 40),
    color: randomColor(),
    // We're going to add two new properties to our circle object, but don't
    // worry about these yet, I'll explain them later.
    vx: random(-2, 2),
    vy: random(-2, 2)
  }
}

/**
 * In lesson 7 we created a simple `drawSquares()` function. We're going to need
 * the same thing but this time for circles:
 */
function drawCircles(circle) {
  for (let i = 0; i < circle.length; i++) {
    drawCircle(circle[i].x, circle[i].y, circle[i].radius, circle[i].color);
  }
}

/**
 * That's the end of the functions we created in previous lessons. Now let's
 * jump into the `setup` function which will be called as soon as the canvas is
 * ready to be drawn on.
 * 
 * Towards the end of lesson 7 we created an array of square-objects and drew
 * them. We're going to jump straight in and do this again, but this time we'll
 * be creating an array of `circle` objects. We're also going to need this array
 * to be in the global scope, because we're going to be using it in another
 * function we won't be able to pass it to directly. So we'll create our empty
 * array right outside `setup()`:
 */
let circles_array = [];
function setup() {
  // Much like lesson 7, we're going to fill that array up with 100 circle
  // objects, which we'll create using the `makeCircle()` function above.
  for (let i = 0; i < 100; i++) {
    circles_array.push(makeCircle());
  }
}

/**
 * Wow, `setup()` was a lot shorter than last time. All we ended up using it for
 * was to set up our `circles_array`. To move our circles around the screen we
 * need a function that gets called more than once, which `setup()` doesn't do.
 * Lucky you I've designed a little function below that will get called 60 times
 * every second. That's once every 16.67 milliseconds. 
 */
function loop() {
  /**
   * Just like a flip book, we're going to start with a blank page, draw our
   * circles, change the x and y position of the circles, then start over. At
   * 60 images per second they will appear to be moving. 
   * 
   * So the first thing we need to do any time we animate something in a loop is
   * start with a blank image. This is done by telling ctx to clear a new
   * blank rectangle the size of the screen for us:
   */
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear screen

  // Now we can draw all of our circles:
  drawCircles(circles_array);

  /** 
   * Our circles have been drawn on the screen. Now we'll move them so that next
   * time we draw them they'll be in a slightly different place. Remember the
   * vx and vy properties I added to the circle object I said I'd explain later?
   * The v stands for velocity. This is the amount we're going to increase the x
   * and y variables by each time we run this function. For example, if our x
   * value was 300 and vx was 2, each frame we're going to increase x by 2,
   * making it 302 the next time we run this function. We need to do this for
   * each circle, so we'll do this in a loop:
   */
  for (let i = 0; i < circles_array.length; i++) {
    circles_array[i].x += circles_array[i].vx;
    circles_array[i].y += circles_array[i].vy;
  }
  // In the future we'll end up breaking this out into its own `moveCircles()`
  // function.

  /**
   * We're almost done. The last problem we have to solve is keeping the circles
   * from floating off the screen. When a circle hits a wall it should bounce
   * off in the other direction. To do this we want to check each circle's
   * position in a loop. If the circle has hit the edge of the screen we're
   * simply going to flip its `vx` or `vy` value:
   */
  for (let i = 0; i < circles_array.length; i++) {
    if (circles_array[i].x <= 0 || circles_array[i].x >= window.innerWidth) {
      circles_array[i].vx = -circles_array[i].vx;
    }
    if (circles_array[i].y <= 0 || circles_array[i].y >= window.innerHeight) {
      circles_array[i].vy = -circles_array[i].vy;
    }
  }
  // In the future we'll end up breaking this into its own `checkBounds()`
  // function.
}

/**
 * You did it! I did a little bit more hand-wavey stuff this time, so hopefully
 * I didn't lose you, but remember you're always welcome to ask questions. For
 * more practice try to do this same thing but with rectangles. 
 * 
 * In lesson 9 we're going to begin creating our first game. See you there!
 */
