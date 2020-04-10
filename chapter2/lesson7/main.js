/**
 * LESSON 7 - Data Structures & Loop Practice
 * @author Josh@Gibbs.tk
 *
 * Welcome to lesson 7! We're going to be doing much of the same as we did in
 * lesson 6, but this time we're going to organize our data using arrays and
 * objects.
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
 * That's the end of the functions we created in previous lessons. Now let's
 * jump into the `setup` function which will be called as soon as the canvas is
 * ready to be drawn on.
 */
function setup() {
  /**
   * In lesson 6 we created multiple balls and objects on the fly. But if we
   * wanted to keep track of these shapes so that we could maybe move them, or
   * change the color of them later on, we'd need a way to store them. If we had
   * 100 circles, each with an x and y, coordinate, a radius, and a color, we
   * could create 400 different variables by hand. Before I learned about loops
   * and arrays I did exactly this, and let me tell you it's not fun. A better
   * way to store our data would be to use an array. 
   * 
   * Below we're going to create four arrays, one for each property of a circle,
   * and then we're going to use a loop to fill those arrays.
   */

  // First we'll create the empty arrays so that we can push values into them
  let x_array = []; // x-coordinate of circles
  let y_array = []; // y-coordinate of circles
  let radius_array = []; // radius of circles
  let color_array = []; // color of circles

  // Now we'll loop through 100 times and each time we'll generate random values
  // to fill the arrays with
  for (let i = 0; i < 100; i++) {
    // For the sake of a future experiment lets keep the circles on the left hal
    // half of the screen. That means the x-coordinate can be anywhere between
    // 0 and half of the screen width:
    x_array.push(random(0, window.innerWidth / 2));
    // The y-coordinate we can pick anywhere from the top to bottom of the
    // screen:
    y_array.push(random(0, window.innerHeight));
    // Let's make the radius of our circles a random value somewhere between 5
    // and 20 pixels
    radius_array.push(random(5, 20));
    // Instead of just generating a random color again, let's generate a color
    // whose hue is only halfway around the color wheel. This means the hue
    // we'll be generating needs to be a random number from 0 to 0.5. That
    // should give us colors from red to green-blue.
    color_array.push(hslToRgb(random(0, 0.5), 1, 0.5));
  }

  // Now that we've filled up our array with 100 random circles, lets loop
  // through those arrays and draw each one:
  for (let i = 0; i < x_array.length; i++) {
    drawCircle(x_array[i], y_array[i], radius_array[i], color_array[i]);
  }

  /**
   * That's it! We should have 100 randomly colored, sized, and positioned
   * circles on the left half of our screen. 
   * 
   * But having four separate arrays still seems a little inefficient. Remember
   * how objects work? We could create a circle object that contains all the 
   * properties of a circle. Let's do that, and have it placed in the very
   * center of the screen:
   */
  let circle = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    radius: 100,
    color: 'white'
  }
  // Now we can draw our circle object like so:
  drawCircle(circle.x, circle.y, circle.radius, circle.color);

  /**
   * Now let's combine our idea to store lots of items in an array, and organize
   * the properties in an object; lets create an array of objects. This time
   * we'll create an array of squares.
   */

  // To start we'll create an empty array that we can fill.
  let square_array = [];
  /**
   * In a minute we're going to create a function to generate a square-object,
   * but for now lets just pretend makeSquare() returns an object very similar
   * to the one we created above for the `circle` variable. If it helps, you can
   * jump down to where we create the `makeSquare()` function then come back
   * here after you're done. So assuming `makeSquare()` returns our square
   * object, we could add a square object to the array like this:
   */
  square_array.push(makeSquare());

  // One square is kind of a waste of an array though. Lets add 100 more:
  for (let i = 0; i < 100; i++) {
    square_array.push(makeSquare());
  }

  /**
   * Now we need to draw all 101 squares. Just for practice, we're going to
   * break this out into its own function which we'll call `drawSquares()`. 
   * We'll pass it our `square_array` and call it like so:
   */
  drawSquares(square_array);
}

/**
 * Real quick, let's write that `makeSquare()` function we used in the `setup()`
 * function above. All it needs to do is return an object filled with random
 * values for a square. 
 */
function makeSquare() {
  return {
    // This time lets put the squares on the right half of the screen:
    x: random(window.innerWidth / 2, window.innerWidth),
    y: random(0, window.innerHeight),
    // Since this is a square, lets use a single random "size" property instead 
    // of a width and height.
    size: random(10, 40),
    // Remember how we made our circles a random color on the first half of the
    // color wheel? Let's generate colors on the other half of the color wheel
    // this time.
    color: hslToRgb(random(0.5, 1), 1, 0.5)
  }

  // And that's it! We're immediately returning the object without giving it a
  // name or anything, because we really don't need to. This function's sole
  // purpose is to generate and return a single item. 
}

/**
 * Okay now for that `drawSquares()` method we used in `setup()` above. All it
 * needs to do is iterate through an array of squares and draw each one. Since
 * we already have a function to draw a single rectangle, this is trivial.
 */
function drawSquares(square) {
  for (let i = 0; i < square.length; i++) {
    drawRectangle(square[i].x, square[i].y, square[i].size, square[i].size, square[i].color);
  }
}

/**
 * We're done! If you'd like, it may be helpful to try creating an array of
 * circle objects and drawing those all over the screen. Possibly play around
 * with colors by using the hslToRgb function. Make hue a function of
 * an object's x-position, which will produce a rainbow effect. 
 * 
 * In lesson 8 we'll animate these objects and have them bounce around the
 * screen. See you there!
 */
