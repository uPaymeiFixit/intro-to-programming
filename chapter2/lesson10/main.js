/**
 * LESSON 10 - Bonus
 * @author Josh@Gibbs.tk
 *
 * Welcome to lesson 10! To finish chapter 2, this is going to be somewhat of a
 * bonus lesson. I'd encourage you to use this as your playground from here on
 * out. I'm going to write a long, somewhat complicated game and your job is to
 * read through and understand as much as possible. I'll have comments, but
 * they'll be far less detailed than in previous lessons. If you need any help,
 * please let me know. 
 * 
 * I won't add an outro to this file so I'll say right now, if this has helped
 * you in any way or you have any feedback you feel would make this more useful,
 * please let me know. There are plenty of great resources out there to continue
 * learning to program, many of them are free. But there's no replacement for
 * experience, so whatever you do keep trying to make things, keep tinkering 
 * with code, and keep asking for help (or at least Googling your problems) when 
 * you can't figure something out. 
 */

// Sometimes we add constants to the top. This will be one of the only new
// concepts you'll run across in this file. A constant variable is just one that
// cannot be changed later on. You can think of it as settings for the game. Go
// ahead and change them and see how the game changes. 
const _PERCENT_GAIN_ON_WIN = 0.2; // Percent of radius player gains by eating another
const _CIRCLES = 200; // Number of initial circles
const _MIN_SIZE = 5; // Minimum initial size
const _MAX_SIZE = 15; // Maximum initial size
const _COLLISIONS = false; // Detect collisions (and eating) between objects
const _DEBUG = false; // Draw vectors and indices
const _ADD_CIRCLE_WHEN_EATEN = true; // Keep creating new objects when ones get eaten
const _PLAYER = false; // Enable the user-controllable player

// Generates random number between min and max
function random(min, max) {
  let size = max - min;
  let number = Math.random() * size; 
  return number + min;
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

// Return distance between two objects. Objects must have x and y properties
function calculateDistance(object1, object2, fast) {
  // √( (x1 - x2)² + (y1 - y2)² )
  return Math.sqrt(Math.pow(object1.x - object2.x, 2) + Math.pow(object1.y - object2.y, 2));
}

// Draw rectangle on ctx
function drawRectangle(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// Draw circle on ctx
function drawCircle(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

// Draw line on ctx
function drawLine(x1, y1, x2, y2, color, line_width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = line_width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Returns the unit vector that points from object1 to object2
// A unit vector is a vector whose magnitude is 1, for more info visit
// https://mathworld.wolfram.com/UnitVector.html
function calculateUnitVector(from_object, to_object) {
  let theta = Math.atan2(to_object.y - from_object.y, to_object.x - from_object.x);
  return [Math.cos(theta), Math.sin(theta)];
}

// Returns a normalized unit vector from <x, y>
function normalizeVector(x, y) {
  let magnitude = Math.sqrt(x * x + y * y);
  return [x / magnitude, y / magnitude];
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// END UTILITIES ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Global variables
let player;
let circle_array;

// Initial setup
function setup() {
  // Fill our circle_array with circles
  circle_array = [];
  for (let i = 0; i < _CIRCLES; i++) {
    circle_array.push(makeCircle());
  }

  if (_PLAYER) {
    // Make first circle user-controllable
    player = circle_array[0];
    player.ai = false;
    player.x = window.innerWidth / 2;
    player.y = window.innerHeight / 2;
    player.radius = (_MIN_SIZE + _MAX_SIZE) / 2; // Player's radius will be average of min and max 
    player.color = "white";
  }
}

// Return speed as a function of radius
// Graphs: https://www.desmos.com/calculator/deee403wzi
function calculateSpeed(radius) {
  return 1 + 10 / (radius + 4);
}

// Generate coordinates as far as `offset` pixels off screen
function generateOffScreenCoordinates(offset) {
  // Declare variables outside of if-scope
  let x;
  let y;
  // Generate random integer, 1, 2, 3, 4 which will correspond to the side
  // of the screen we're going to generate our (x, y) on
  let side = Math.floor(random(0, 4));
  if (side === 0) {
    // Top
    x = random(0, window.innerWidth);
    y = random(-offset, 0);
  } else if (side === 1) {
    // Bottom
    x = random(0, window.innerWidth);
    y = random(window.innerHeight, window.innerHeight + offset);
  } else if (side === 2) {
    // Left
    x = random(-offset, 0);
    y = random(0, window.innerHeight);
  } else {
    // Right
    x = random(window.innerWidth, window.innerWidth + offset);
    y = random(0, window.innerHeight);
  }
  // Return a 2-item array of our x and y coordinates
  return [x, y];
}

// Generate a circle object
function makeCircle() {
  let position = generateOffScreenCoordinates(500);
  let radius = random(_MIN_SIZE, _MAX_SIZE);
  return {
    x: position[0],
    y: position[1],
    radius: radius,
    speed: calculateSpeed(radius),
    // By default circles will be ai, not human
    ai: true,
    // We'll use these later
    vectors: [],
    vx: 0,
    vy: 0
  }
}

// Main loop
function loop() {
  // Clear the screen each frame
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  if (_COLLISIONS) {
    // Check if circles have bumped into each other and eat them if they have
    checkCollisions();
  }
  
  // Assign each circle a target to chase
  findTarget();
  // Assign each circle a list of enemies to run from
  listEnemies();

  // Here's how this is going to work, we're going to have an array of vectors
  // and weights assigned to those vectors. Most of the vectors are going to be 
  // to run away from enemies, with weights that get exponentially larger as the
  // enemy gets closer to us. We're also going to have a vector that points us 
  // toward our target with a constant weight, and one that pushes us toward the
  // center with its weight growing as we get further from the center.

  // First we'll set all the vectors to empty
  resetVectors();
  // Now we'll add the vectors that point toward our target
  addGreedVector();
  // Now we add vectors that points us away from the walls
  addWallsVector();
  // Now we add vectors that point us away from enemies
  addFearVectors();
  // Finally calculate our vx and vy (with which we'll move) from all of the 
  // vectors we just added
  calculateVectorsSum();

  // Change circles' (x, y) by (vx, vy)
  moveCircles();
  
  if (_PLAYER) {
    // Draw score in the top left
    drawScore();
  }
  // Draw each circle
  drawCircles();

  if (_DEBUG) {
    // If we don't like the way the AI works, it might be helpful to see where
    // each vector is pointing, so we draw each circle's vectors
    drawVectors();
    // Also draw the circle's index in the array so its easier to identify and
    // access from the console
    drawNames();
  }
}

// Draw vectors overtop of circles
function drawVectors() {
  // Loop through each circle
  // This is a different type of for loop, you really don't need to understand
  // how it works right now as this is the only place I'll be using it, but in
  // case you're curious, it's the shorthand to loop through an array. Instead
  // of accessing each element by writing something like `circle_array[i]' it
  // simply names the currently accessed element `circle` (or whatever name
  // you've chosen). So you can't access an array's indices (i, j, etc) but the
  // code is much cleaner
  for (let circle of circle_array) {
    // Loop through each circle's vectors
    for (let vector of circle.vectors) {
      let color;
      let line_width;
      // Assign different colors to different types of vectors
      // Assign different line weights too in case they overlap
      if (vector.name === "greed") {
        color = "#00FF00";
        line_width = 0.5;
      } else if (vector.name === "center") {
        color = "#0040FF";
        line_width = 0.8;
      } else if (vector.name === "fear") {
        color = "#FF0000";
        line_width = 1.1;
      }
      let scale = 100;
      drawLine(circle.x, circle.y, circle.x + vector.vx * vector.weight * scale, circle.y + vector.vy * vector.weight * scale, color, line_width);
    }
  }
}

// Draw names over characters
function drawNames() {
  for (let i = 0; i < circle_array.length; i++) {
    ctx.font = "12px Arial"
    ctx.fillStyle = "white";
    ctx.fillText(i, circle_array[i].x - 3, circle_array[i].y + 3);
  }
}

// Check collisions between each object
function checkCollisions() {
  // Loop through circle_array
  for (let i = 0; i < circle_array.length; i++) {
    // Only bother checking this if the circles are on the screen
    if (circleIsOnScreen(circle_array[i])) {
      // Check for collision between other circles
      // We can start at j = i + 1 because we've already checked combinations 
      // before that
      for (let j = i + 1; j < circle_array.length; j++) {
        let distance = calculateDistance(circle_array[i], circle_array[j]);
        let min_distance = circle_array[i].radius + circle_array[j].radius;
        if (distance <= min_distance) {
          // if i's radius is bigger than j's, i eats j
          if (circle_array[i].radius > circle_array[j].radius) {
            eat(i, j);
          } else {
            eat(j, i);
          }
        }
      }
    }
  }
}

// Calculate whether or not the circle's x and y positions exist on the screen
function circleIsOnScreen(circle) {
  return circle.x > 0 && 
         circle.x < window.innerWidth &&
         circle.y > 0 &&
         circle.y < window.innerHeight;
}

// Perform actions for winner eating loser, where winner and loser are indices
// of `circle_array` because we need to be able to remove them from the array
function eat(winner, loser) {
  // If the loser is the player, restart the game
  if (!circle_array[loser].ai) {
    let score = Math.round((player.radius - (_MIN_SIZE + _MAX_SIZE) / 2) * 100);
    window.alert("You lost! Score: " + score);
    setup();
  } else {
    // Grow i's radius
    circle_array[winner].radius += circle_array[loser].radius * _PERCENT_GAIN_ON_WIN;
    // If a circle is pretty much as big as the screen, they won
    if (circle_array[winner].radius > window.innerHeight / 2) {
      // Score is calculated such that the initial score is 0, and then it grows
      // based on the radius
      let score = Math.round((player.radius - (_MIN_SIZE + _MAX_SIZE) / 2) * 100);
      window.alert("Maximum size reached! Your score: " + score)
      // Re-setup the game to start over
      setup();
      // Get out of this function, we don't need to be here anymore
      return;
    }
    // Recalculate i's speed
    circle_array[winner].speed = calculateSpeed(circle_array[winner].radius);
    // Remove j from the array
    if (_ADD_CIRCLE_WHEN_EATEN) {
      circle_array[loser] = makeCircle();
    } else {
      circle_array.splice(loser, 1);
    }
  }
}

// Assign each player a target to run towards
function findTarget() {
  // Loop through all circles
  for (let i = 0; i < circle_array.length; i++) {
    let closest_target;
    let closest_distance;
    // Loop through circles again to compare against first loop
    // Our goal is to find the target closest to us
    for (let j = 0; j < circle_array.length; j++) {
      // Three conditions must be met for the circle we're comparing against to
      // be considered a target:
      //   1) it must be smaller than us
      //   2) it must be on screen
      //   3) it must not be us
      if (circle_array[j].radius <= circle_array[i].radius &&
          circleIsOnScreen(circle_array[i]) && i !== j) {
        let distance = calculateDistance(circle_array[i], circle_array[j]);
        // If this distance is closer than any other distance we've seen, store
        // the distance and the circle that we calculated it from
        if (distance < closest_distance || closest_distance === undefined) {
          closest_target = circle_array[j];
          closest_distance = distance;
        }
      }
    }
    circle_array[i].target = closest_target;
  }
}

// Compile a list of enemies for each circle
function listEnemies() {
  // Loop through each circle
  for (let i = 0; i < circle_array.length; i++) {
    // Reset our list of enemies so we can rebuild it
    circle_array[i].enemies = [];
    // Loop through each player to check for enemies
    for (let j = 0; j < circle_array.length; j++) {
      // If player j is bigger than us (and player j is not us), it's an enemy
      if (circle_array[j].radius > circle_array[i].radius && i !== j) {
        // Add them to our list of enemies
        circle_array[i].enemies.push(circle_array[j]);
      }
    }
  }
}

// Reset vectors for all circles
function resetVectors() {
  for (let i = 0; i < circle_array.length; i++) {
    circle_array[i].vectors = [];
  }
}

// Add weighted vectors that point us toward our target
function addGreedVector() {
  // Loop through circles array
  for (let i = 0; i < circle_array.length; i++) {
    // Make sure we actually have a target to chase
    if (circle_array[i].target !== undefined) {
      // Calculate the unit vector that moves us toward the target
      let vector = calculateUnitVector(circle_array[i], circle_array[i].target);
      // Unlike our other vectors, we're going to weight this one a constant 0.5
      let weight = 0.5;
      // Add our new weighted vector to the circle's list of vectors
      circle_array[i].vectors.push({
        name: "greed", // Add a name just in case we need to debug later
        weight: weight,
        vx: vector[0],
        vy: vector[1]
      });
    }
  }
}

// Add weighted vectors that point us away from enemies
function addFearVectors() {
  // Loop through each circle
  for (let i = 0; i < circle_array.length; i++) {
    // Loop through each enemy of circle `i`
    for (let j = 0; j < circle_array[i].enemies.length; j++) {
      // Rename enemy for easier use
      let enemy = circle_array[i].enemies[j];
      // Calculate distance between circle and enemy
      let d = calculateDistance(circle_array[i], enemy) - (circle_array[i].radius + enemy.radius);
      // This sigmoid function starts at 1 and decreases until distance is
      // is around 110 pixels. So when they're really close, our weight will be
      // almost 1
      // Graph: https://www.desmos.com/calculator/deee403wzi
      let weight = 1 / (1 + Math.pow(1.08, d - 60));
      // Find unit vector that points us toward the enemy (we'll reverse it in
      // a minute)
      let vector = calculateUnitVector(circle_array[i], enemy);
      // Add our new weighted vector to the circle's list of vectors
      circle_array[i].vectors.push({
        name: "fear",
        weight: weight,
        vx: -vector[0], // note that we're reversing the magnitude to run away
        vy: -vector[1] // // note that we're reversing the magnitude to run away
      });
    }
  }
}

// Add vector to push us away from walls
function addWallsVector() {
  // Loop through circles array
  for (let i = 0; i < circle_array.length; i++) {
    // This on is going to be a little different. We're going to come up with a
    // vx and vy that depend on our proximity to a wall. That vx and vy will
    // be the constant. To see the equation used in all of our functions, be
    // sure to look at the Desmos graphs: 
    // https://www.desmos.com/calculator/deee403wzi

    // Through the magic of algebra, this formula gives us the percentage of our
    // circle's x position from the center to the wall. For example, if the 
    // screen is 200 pixels wide and the circle's x position is 25, it would
    // come out to |1-2x/w| = |1-2*25/200| = 75% of the way from the center to
    // the wall
    let percent_to_wall_x = 1 - 2 * circle_array[i].x / window.innerWidth;
    let percent_to_wall_y = 1 - 2 * circle_array[i].y / window.innerHeight;
    // Calculate vx and vy based on our equation
    let vx = Math.pow(percent_to_wall_x / 1.05, 3);
    let vy = Math.pow(percent_to_wall_y / 1.05, 3);
    // Normalize the vector
    let vector = normalizeVector(vx, vy);
    // Our weight should be whichever is higher, vx or vy, but cap it at 1.2
    let weight = Math.min(Math.max(Math.abs(vx), Math.abs(vy)), 1.2);
    // Add vector to the list
    circle_array[i].vectors.push({
      name: "center",
      weight: weight,
      vx: vector[0],
      vy: vector[1]
    });
  }
}

// Calculate final vx and vy for each circle
function calculateVectorsSum() {
  // Loop through circle array
  for (let i = 0; i < circle_array.length; i++) {
    // Only calculate vx and vy if this is an ai, user fends for themselves
    if (circle_array[i].ai) {
      let sx = 0; // Sum of weighted vx's
      let sy = 0; // Sum of weighted vy's
      // Loop through each vector on our circle
      for (let j = 0; j < circle_array[i].vectors.length; j++) {
        // Rename for easier use
        let vector = circle_array[i].vectors[j];
        // Sum our weighted vectors up
        sx += vector.vx * vector.weight;
        sy += vector.vy * vector.weight;
      }
      // Convert it to a unit vector
      let unit_vector = normalizeVector(sx, sy);
      circle_array[i].vx = unit_vector[0]; // Add to our official vx
      circle_array[i].vy = unit_vector[1]; // Add to our official vy
    }
  }
}

// Move object
function moveCircles() {
  // Loop through circles
  for (let i = 0; i < circle_array.length; i++) {
    circle_array[i].x += circle_array[i].vx * circle_array[i].speed;
    circle_array[i].y += circle_array[i].vy * circle_array[i].speed;
  }
}

// Draw score
function drawScore() {
  ctx.font = "50px Arial"
  ctx.fillStyle = "gray";
  let score = Math.round((player.radius - (_MIN_SIZE + _MAX_SIZE) / 2) * 100);
  ctx.fillText('Score: ' + score, 40, 75);
}

// Draw each circle
function drawCircles() {
  // Loop through each circle
  for (let i = 0; i < circle_array.length; i++) {
    // Don't assign color to human players
    if (circle_array[i].ai) {
      calculateColor(circle_array[i]);
    }
    // Actually draw the circle
    drawCircle(circle_array[i].x, circle_array[i].y, circle_array[i].radius, circle_array[i].color);
  }
}

// Specify color based on proximity to color
function calculateColor(circle) {
  if (circle.target !== undefined) {
    let distance = calculateDistance(circle, circle.target) - (circle.radius + circle.target.radius);
    let hue = Math.min(distance / 200, 0.6);
    circle.color = hslToRgb(hue, 1, 0.5);
  } else {
    // Default color is blue
    circle.color = hslToRgb(0.6, 1, 0.5);
  }
}

window.onkeydown = function checkKeyDown(event) {
  if (_PLAYER) {
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
}

window.onkeyup = function checkKeyUp(event) {
  if (_PLAYER) {
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
}
