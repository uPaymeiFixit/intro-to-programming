/**
 * LESSON 10 - Bonus
 * @author Josh@Gibbs.tk
 *
 * Welcome to lesson 10! To finish chapter 2, this is going to be somewhat of a
 * bonus lesson. I'd encourage you to use this as your playground from here on
 * out. I'm going to write a long, somewhat complicated game and your job is to
 * read through and add your own comments explaining how each function works.
 * If you need any help, please let me know. 
 * 
 * I won't add an outro to this file so I'll say right now, if this has helped
 * you in any way or you have any feedback you feel would make this more useful,
 * please let me know. There are plenty of great resources out there to continue
 * learning to program, many of them are free. But there's no replacement for
 * experience, so whatever you do keep trying to make things, keep tinkering 
 * with code, and keep asking for help (or at least Googling your problems) when 
 * you can't figure something out. 
 */

const _PERCENT_GAIN_ON_WIN = 0.2;
const _CIRCLES = 100;
const _MIN_SIZE = 5;
const _MAX_SIZE = 15;
const _START_OFF_SCREEN = true;
const _COLLISIONS = false;

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

function drawCircle(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

// Returns the unit vector that points from object1 to object2
function calculateUnitVector(from_object, to_object) {
  let theta = Math.atan2(to_object.y - from_object.y, to_object.x - from_object.x);
  return [Math.cos(theta), Math.sin(theta)];
}

// Returns a normalized unit vector from <x, y>
function toUnitVector(x, y) {
  let magnitude = Math.sqrt(x * x + y * y);
  return [x / magnitude, y / magnitude];
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// END UTILITIES ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
let player;
let circle_array = [];
function setup() {
  for (let i = 0; i < _CIRCLES; i++) {
    circle_array.push(makeCircle());
  }
  player = circle_array[0];
  player.ai = false;
  player.x = window.innerWidth / 2;
  player.y = window.innerHeight / 2;
  player.radius = 20;
  player.color = "white";
}

// Return speed as a function of radius
function calculateSpeed(radius) {
  return 0.8 + 10 / (radius + 4);
}

// Generate a circle object
function makeCircle() {
  let x = random(0, window.innerWidth);
  let y = random(0, window.innerHeight);

  if (_START_OFF_SCREEN) {
    let side = Math.floor(random(0, 4));
    if (side === 0) {
      // Top
      x = random(0, window.innerWidth);
      y = random(-500, 0);
    } else if (side === 1) {
      // Bottom
      x = random(0, window.innerWidth);
      y = random(window.innerHeight, window.innerHeight + 500);
    } else if (side === 2) {
      // Left
      x = random(-500, 0);
      y = random(0, window.innerHeight);
    } else {
      // Right
      x = random(window.innerWidth, window.innerWidth + 500);
      y = random(0, window.innerHeight);
    }
  }
  let radius = random(_MIN_SIZE, _MAX_SIZE);
  return {
    x: x,
    y: y,
    radius: radius,
    speed: calculateSpeed(radius),
    ai: true,
    name: (new Date()).getMilliseconds(),
  }
}

function loop() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  
  if (_COLLISIONS) {
    checkCollisions();
  }
  
  findTarget();
  listEnemies();
  calculateGreedVector();
  calculateFearVector();
  calculateCenterVector();
  calculateWeightedMovementVector();
  moveCircles();
  
  drawScore();
  drawCircles();
}

// Check collisions between each object
function checkCollisions() {
  // Loop through circle_array
  for (let i = 0; i < circle_array.length; i++) {
    // Check for collision between other circles
    // We can start at j = i + 1 because we've already checked combinations 
    // before that
    for (let j = i + 1; j < circle_array.length; j++) {
      let distance = calculateDistance(circle_array[i], circle_array[j], true);
      // Since we're using fast-distance above, which returns d², we need to
      // also square the min_distance below:
      let min_distance = Math.pow(circle_array[i].radius + circle_array[j].radius, 2);
      if (distance <= min_distance) {
        if (circle_array[i].radius > circle_array[j].radius) {
          circle_array[i].radius += circle_array[j].radius * _PERCENT_GAIN_ON_WIN;
          circle_array[i].speed = calculateSpeed(circle_array[i].radius);
          // circle_array[j] = makeObstacle();
          circle_array.splice(j, 1);
        } else {
          circle_array[j].radius += circle_array[i].radius * _PERCENT_GAIN_ON_WIN;
          circle_array[j].speed = calculateSpeed(circle_array[j].radius);
          // circle_array[i] = makeObstacle();
          circle_array.splice(i, 1);
        }
        
      }
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

// Calculate whether or not the circle's x and y positions exist on the screen
function circleIsOnScreen(circle) {
  return circle.x > 0 && 
         circle.x < window.innerWidth &&
         circle.y > 0 &&
         circle.y < window.innerHeight;
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

// Calculate greed vector (push towards target)
function calculateGreedVector() {
  // Loop through circles array
  for (let i = 0; i < circle_array.length; i++) {
    // Make sure we have at least a defined vector
    circle_array[i].vx_greed = 0;
    circle_array[i].vy_greed = 0;
    // Make sure we actually have a target
    if (circle_array[i].target !== undefined) {
      // Calculate the unit vector that moves us toward the target
      let v_vector = calculateUnitVector(circle_array[i], circle_array[i].target);
      circle_array[i].vx_greed = v_vector[0];
      circle_array[i].vy_greed = v_vector[1];
    }
  }
}

// Calculate fear vector (push away from enemies, weighted)
function calculateFearVector() {
  for (let i = 0; i < circle_array.length; i++) {
    // Make sure we have at least a defined vector
    circle_array[i].vx_fear = 0;
    circle_array[i].vy_fear = 0;
    // Make sure we actually have enemies
    if (circle_array[i].enemies.length !== 0) {
      let sx = 0; // Sum of x-vector components
      let sy = 0; // Sum of y-vector components
      // Loop through all of our enemies
      for (let j = 0; j < circle_array[i].enemies.length; j++) {
        // Rename this for easier use
        let enemy = circle_array[i].enemies[j];
        // Get distance between us and the enemy
        let distance = calculateDistance(circle_array[i], enemy);
        // Calculate how heavily we'll weigh our fear of this enemy
        let weight = 1 / distance; // It gets exponentially more severe as it gets closer to us
        // Find the unit vector showing us the direction to move away from enemy
        let v_vector = calculateUnitVector(circle_array[i], enemy);
        sx += -v_vector[0] * weight; // multiply vector by severity scalar and
        sy += -v_vector[1] * weight; // add it to our sum of vector components
      }
      let unit_vector = toUnitVector(sx, sy); // Convert <sx, sy> to unit vector
      circle_array[i].vx_fear = unit_vector[0];
      circle_array[i].vy_fear = unit_vector[1];
    }
  }
}

// Calculate center vector (push toward center)
function calculateCenterVector() {
  for (let i = 0; i < circle_array.length; i++) {
    // Make an object with x and y of center of screen because our
    // calculateUnitVector expects an object with x and y properties as parameters
    let center_point = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
    let v_vector = calculateUnitVector(circle_array[i], center_point);
    circle_array[i].vx_center = v_vector[0];
    circle_array[i].vy_center = v_vector[1];
  }
}

// After we've calculated our different vector components we're going to weigh
// and average them 
function calculateWeightedMovementVector() {
  // Loop through circles array
  for (let i = 0; i < circle_array.length; i++) {
    // At first I had a static weight for the center vector, but it's important
    // to keep the circles from being pressed up against the walls by the other
    // vectors, so we're going to make the weight go up as we get closer to the
    // edge of a wall. 
    
    // Make an object with x and y of center of screen because our
    // calculateUnitVector expects an object with x and y properties as parameters
    let center_point = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
    let distance = calculateDistance(circle_array[i], center_point);
    // if the ball is halfway between the wall and the center,
    // `distance_percent` will be 0.5
    let distance_percent_x = distance / (window.innerWidth / 2);
    let distance_percent_y = distance / (window.innerHeight / 2);
    // We're going to make the weight a function of the percentage
    let center_weight_x = Math.pow(distance_percent_x, 10);
    let center_weight_y = Math.pow(distance_percent_y, 10);
    // We're done calculating our dynamic weight for the center vector
    
    // Assign static weights
    let greed_weight = 0.5;
    let fear_weight = 0.5;
    // let center_weight = 0.3 // 10% weight on center 

    // Weigh vectors and add them up
    let vx = circle_array[i].vx_greed * greed_weight + circle_array[i].vx_fear * fear_weight + circle_array[i].vx_center * center_weight_x;
    let vy = circle_array[i].vy_greed * greed_weight + circle_array[i].vy_fear * fear_weight + circle_array[i].vy_center * center_weight_y;
    // Now transform those huge added-up vectors into a unit-vector
    let unit_vector2 = toUnitVector(vx, vy);
    circle_array[i].vx = unit_vector2[0];
    circle_array[i].vy = unit_vector2[1];
  }
}

// Move object
function moveCircles() {
  // Loop through circles
  for (let i = 0; i < circle_array.length; i++) {
    // Only move if it's an AI
    if (circle_array[i].ai) {
      circle_array[i].x += circle_array[i].vx * circle_array[i].speed;
      circle_array[i].y += circle_array[i].vy * circle_array[i].speed;
    }
  }
}

// Draw score
function drawScore() {
  ctx.font = "50px Arial"
  ctx.fillStyle = "gray";
  let score = Math.round(player.radius * 100) - 1000;
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

    ctx.font = "12px Arial"
    ctx.fillStyle = "white";
    ctx.fillText(i.toString(), circle_array[i].x - 3, circle_array[i].y + 3);
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

window.onkeyup = function checkKeyUp(event) {
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
