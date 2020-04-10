/**
 * LESSON 9 - First Game
 * @author Josh@Gibbs.tk
 *
 * Welcome to lesson 9! There's going to be a lot of code in this lesson, but
 * most of it is very similar to things we've done before. If you've already
 * loaded index.html, use the arrow keys to move around and you'll see we have a
 * fully functioning game!
 */ 
 
/** 
 * There are lots of functions we've created before that we're going to end up
 * using here. I'll paste them below (except for the comments we had explaining
 * how they worked). I would recommend taking a brief look over them just to see
 * which functions are available for us to use and make sure you have a basic
 * understanding of how they work.
*/

////////////////////////////////////////////////////////////////////////////////
//////////////////////////// BEGIN HELPER FUNCTIONS ////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Returns distance between two points (x1, y1) and (x2, y2)
function calculateDistance(x1, y1, x2, y2) {
  // √( (x1 - x2)² + (y1 - y2)² )
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

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

////////////////////////////////////////////////////////////////////////////////
///////////////////////////// END HELPER FUNCTIONS /////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// I've excluded this function from the list of previously created functions
// because I wanted you to notice that I slightly changed how it works. Instead
// of generating a random radius and color, we're now going to make all the
// circles have a radius of 3 pixels and they'll be pink. Also, we're going to
// stick with calling them "circle" but if it helps you might think of them as
// "obstacle" or "enemy". 
function makeCircle() {
  return {
    x: random(0, window.innerWidth),
    y: random(0, window.innerHeight),
    radius: 3,
    color: 'pink',
    vx: random(-2, 2),
    vy: random(-2, 2)
  }
}



/**
 * In addition to our global circles_array function from lesson 8, we're going
 * to add a player and goal object, which we'll define in `setup()`
 */
let circles_array = [];
let player;
let goal;
function setup() {
  // We'll spawn our player in the center of the screen and give them a radius
  // of 10 pixels and a color of "cyan". We're also going to add a `speed`
  // property which we'll scale `vx` and `vy` by. 
  player = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    radius: 10,
    color: "cyan",
    vx: 0,
    vy: 0,
    speed: 1
  };
  // Our goal is going to be the circle our player tries to eat, so we'll spawn
  // it in a random place.
  goal = {
    x: random(0, window.innerWidth),
    y: random(0, window.innerHeight),
    radius: 7,
    color: "springgreen"
  };
}

/**
 * Our `loop()` function is where things are going ot really get started. But
 * we're going to do things a little bit differently. We're going to populate
 * `loop()` with functions that describe what we're trying to accomplish. Later
 * we'll create those functions so they actually work. But step by step let's
 * walk through what our high-level goal of the game is:
 */
function loop() {
  // Our first step on each new frame is to create a blank new canvas to draw on
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear screen
  // I would have put this at the bottom, but it looks much better if items can
  // be drawn over top of the score display, so we need to draw it before we 
  // draw other items.
  drawScore();

  // Now we're going to check all of our circles to make sure they're not
  // outside the screen's bounds, and if they are we're going to reverse their
  // direction to make them "bounce" off the walls.
  checkCirclesBounds();
  // After that we simply add each circle's vx to x and vy to y to move them
  moveCircles();
  // Finally we'll draw each of our circles on the canvas
  drawCircles();

  // Here's one we haven't seen before. We need to check if the player has
  // collided with the goal, and if so we should do something about it (we'll
  // worry about that when we write the function)
  checkPlayerGoalCollision();
  // We also need to check if the player has collided with any of the circles,
  // and if so we should tell the player they lost
  checkPlayerCirclesCollision();
  // Of course we also need to move our player, just like moving the circles
  movePlayer();
  // And same as the circles again, we need to draw our player on the screen
  drawPlayer();

  // We'll also draw the goal
  drawGoal();
}

/**
 * Now in the order we listed them above we'll create each one of these nine
 * functions:
 */

// Draw score on the screen
function drawScore() {
  // The first thing we should do is decide how to score our game. I've decided
  // the score will be equal to the number of circles on the screen, which we
  // can do by checking the number of items in the `circles_array`
  let score = circles_array.length;
  // The first step in drawing the score is to tell ctx which font and font size
  // to use:
  ctx.font = "50px Arial"
  // Now we're telling it which color to use
  ctx.fillStyle = "lightgray";
  // Finally we tell ctx to draw the score with positions x = 40 and y = 75
  ctx.fillText('Score: ' + score, 40, 75);
}

// Make circles bounce off walls
function checkCirclesBounds() {
  // Just as we've done in the past, we're going to loop through all of the
  // circles to check if each one has touched or passed a wall
  for (let i = 0; i < circles_array.length; i++) {
    // If they've gone too far to the left or too far to the right, we reverse
    // their x-velocity.
    if (circles_array[i].x <= 0 || circles_array[i].x >= window.innerWidth) {
      circles_array[i].vx = -circles_array[i].vx;
    }
    // If they've gone too far up or too far down, we reverse their y-velocity
    if (circles_array[i].y <= 0 || circles_array[i].y >= window.innerHeight) {
      circles_array[i].vy = -circles_array[i].vy;
    }
  }
}

// Move circles
function moveCircles() {
  // Simply loop through each circle and add vx to x and vy to y
  for (let i = 0; i < circles_array.length; i++) {
    circles_array[i].x += circles_array[i].vx;
    circles_array[i].y += circles_array[i].vy;
  }
}

// Draw circles on ctx
function drawCircles() {
  // Loop through each circle and tell our handy `drawCircle()` function what to
  // draw
  for (let i = 0; i < circles_array.length; i++) {
    drawCircle(circles_array[i].x, circles_array[i].y, circles_array[i].radius, circles_array[i].color);
  }
}

// Check if player and goal have collided, and if so add a new circle
function checkPlayerGoalCollision() {
  // Remember that distance formula we made a long time ago? We're finally going
  // to put it to work to calculate the distance between the center of the
  // player and the center of the goal
  let distance = calculateDistance(player.x, player.y, goal.x, goal.y);
  // But we don't just want to know when the centers of the circles touch, we
  // want to know when the edges touch. The edges will touch when the sum of
  // the radii is greater than the distance between the center of the circles
  let min_distance = player.radius + goal.radius;
  // Lets check if they're touching
  if (distance <= min_distance) {
    // If they are, we'll generate a new x and y coordinate for `goal`
    goal.x = random(0, window.innerWidth);
    goal.y = random(0, window.innerHeight);
    // We're also going to create a new circle (obstacle / enemy) for the player
    // to avoid:
    circles_array.push(makeCircle());
    // But lets also give the player a reward by speeding them up slightly
    player.speed += 0.1;
  }
}

// Check if player has collided with any circles and end the game if they have
function checkPlayerCirclesCollision() {
  // This is going to be extremely similar to checking for collisions with
  // `goal`. The primary difference is we're going to loop through each circle
  // and check if the player has collided with each one, one by one.
  for (let i = 0; i < circles_array.length; i++) {
    // Again, we'll calculate the distance between the current circle and the
    // player
    let distance = calculateDistance(player.x, player.y, circles_array[i].x, circles_array[i].y);
    // And calculate the minimum distance
    let min_distance = player.radius + circles_array[i].radius;
    // And check if the player has collided with that circle
    if (distance <= min_distance) {
      // If the player has collided, we'll give them a pop up alert telling them
      // what their score was:
      window.alert("You lose! Score: " + circles_array.length);
      // We'll also erase all of the circles (and therefore the score) by 
      // re-setting `circles_array` to an empty array:
      circles_array = [];
    }
  }
}

// Move player
function movePlayer() {
  // Simply add player's vx to x and vy to y
  player.x += player.vx;
  player.y += player.vy;
}

// Draw player on ctx
function drawPlayer() {
  drawCircle(player.x, player.y, player.radius, player.color);
}

// Draw goal on ctx
function drawGoal() {
  drawCircle(goal.x, goal.y, goal.radius, goal.color);
}

/**
 * We've written all the functions we used above, but you may have noticed we
 * never modified the player's vx and vy properties. This is the last step we
 * need to take before having a functional game. 
 * 
 * Remember when we used `window.onclick`? This is very similar, except this
 * time we're going to use `window.onkeydown` and `window.onkeyup`. This will
 * call the functions assigned to them every time a key is pressed down or
 * lifted up. These events will also pass a parameter to our functions where we
 * can see details about the event, such as which key was pressed.
 */

// Set vx or vy depending on which key was pressed
window.onkeydown = function checkKeyDown(event) {
  // Just for fun, we'll log the parameter given to us by `onkeydown` so that
  // you can check out which data is given to us
  console.log(event);
  // The piece of data given to us in the parameter (which we've named `event`)
  // is the `key` property, which tells us which key was pressed. We're going to
  // use the standard WASD layout as well as arrow keys. So the first thing
  // we'll do is check if the up arrow, or "w" key was pressed, and if so set
  // our vy to -player.speed (because remember, negative is up in computer 
  // coordinates)
  if (event.key === "ArrowUp" || event.key === "w") {
    player.vy = -player.speed;
  } else if (event.key === "ArrowDown" || event.key === "s") {
    player.vy = player.speed;
  } else if (event.key === "ArrowLeft" || event.key === "a") {
    player.vx = -player.speed;
  } else if (event.key === "ArrowRight" || event.key === "d") {
    player.vx = player.speed;
  }
}

// Unset vx or vy depending on which key was lifted
window.onkeyup = function checkKeyUp(event) {
  // Same as the onkeydown function above, we'll set our vx or vy to 0 depending
  // on which key was lifted.
  if (event.key === "ArrowUp" || event.key === "w") {
    player.vy = 0;
  } else if (event.key === "ArrowDown" || event.key === "s") {
    player.vy = 0;
  } else if (event.key === "ArrowLeft" || event.key === "a") {
    player.vx = 0;
  } else if (event.key === "ArrowRight" || event.key === "d") {
    player.vx = 0;
  }
}


/**
 * Congratulations! You've made your first game. If you're looking for a
 * challenge, instead of adding a single circle every time the player eats the
 * goal, try doubling the number of circles on screen. 2, 4, 8, 16, 32, 64, etc.
 * And if you're up for an even bigger challenge, you can try to fix the bug 
 * where there's a chance a new circle will spawn on top of the player, killing
 * them instantly. 
 * 
 * In lesson 10 we'll be practicing more game design, but in a very different
 * way. See you in lesson 10!
 */
