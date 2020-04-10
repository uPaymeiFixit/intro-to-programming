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

const _SPEED_DEPENDS_ON_TARGET_DISTANCE = false;
const _SPEED_DEPENDS_ON_SIZE = true;
const _SPEED_DEPENDS_ON_ENEMY_DISTANCE = false;
const _PERCENT_GAIN_ON_WIN = 0.2;
const _OBSTACLES = 100;
const _MIN_SIZE = 5;
const _MAX_SIZE = 15;
const _TIME_BETWEEN_ENEMY_SEARCH = 100;
const _TIME_BETWEEN_TARGET_SEARCH = 225;
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

function calculateDistance(object1, object2) {
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

let obstacle = [];
let player = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  radius: 10,
  color: "cyan",
  vx: 0,
  vy: 0,
  speed: 1
}
function setup() {
  for (let i = 0; i < _OBSTACLES; i++) {
    obstacle.push(makeObstacle());
  }
  obstacle[0].x = window.innerWidth / 2;
  obstacle[0].y = window.innerHeight / 2;
}


function makeObstacle() {
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


  return {
    x: x,
    y: y,
    radius: random(_MIN_SIZE, _MAX_SIZE),
    // radius: obstacle.length / 2 + 1,
    color: randomColor(),
    speed: random(0.2, 2),
    vx: random(-1, 1),
    vy: random(-1, 1)
  }
}

let last_enemy_time = 0;
let last_target_time = 0;
function loop(ctx, time) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // if (time - last_target_time > _TIME_BETWEEN_TARGET_SEARCH || false) {
    // last_target_time = time;
    findTarget();
  // }

  // if (time - last_enemy_time > _TIME_BETWEEN_ENEMY_SEARCH || false) {
  //   last_enemy_time = time;
  //   findEnemy();
  // }
  listEnemies();

  movePlayer();
  moveObstacles();

  if (_COLLISIONS) {
    // checkPlayerObstacleCollision();
    checkObstacleObstacleCollision();
  }
  
  // drawScore();
  // drawPlayer();
  drawObstacles();
}

// Assign each player a target to run towards
function findTarget() {
  for (let i = 0; i < obstacle.length; i++) {
    let closest;
    let closest_distance = window.innerWidth * window.innerHeight; // big initial
    for (let j = 0; j < obstacle.length; j++) {
      if (i !== j && obstacle[j].radius <= obstacle[i].radius && 
          obstacle[j].x > 0 && 
          obstacle[j].x < window.innerWidth &&
          obstacle[j].y > 0 &&
          obstacle[j].y < window.innerHeight) {
        let distance = calculateDistance(obstacle[i], obstacle[j]);
        if (distance < closest_distance) {
          closest = obstacle[j];
          closest_distance = distance;
        }
      }
    }
    obstacle[i].target = closest;
  }
}

// Returns the unit vector that points from object1 to object2
function findUnitVector(from_object, to_object) {
  let theta = Math.atan2(to_object.y - from_object.y, to_object.x - from_object.x);
  return [Math.cos(theta), Math.sin(theta)];
}

// Returns a normalized unit vector from <x, y>
function toUnitVector(x, y) {
  let magnitude = Math.sqrt(x * x + y * y);
  return [x / magnitude, y / magnitude];
}

function listEnemies() {
  for (let i = 0; i < obstacle.length; i++) {
    // Reset our list of enemies so we can rebuild it
    obstacle[i].enemies = [];
    // Loop through each player to check for enemies
    for (let j = 0; j < obstacle.length; j++) {
      // If player j is bigger than us (and player j is not us), it's an enemy
      if (obstacle[j].radius > obstacle[i].radius && i !== j) {
        // Add them to our list of enemies
        obstacle[i].enemies.push(obstacle[j]);
      }
    }
  }
}

// Assign each player an enemy to run away from
function findEnemy() {
  for (let i = 0; i < obstacle.length; i++) {
    let closest;
    let closest_distance = window.innerWidth * window.innerHeight; // big initial
    for (let j = 0; j < obstacle.length; j++) {
      if (obstacle[j].radius > obstacle[i].radius) {
        let distance = calculateDistance(obstacle[i], obstacle[j]);
        if (distance < closest_distance) {
          closest = obstacle[j];
          closest_distance = distance;
        }
      }
    }
    obstacle[i].enemy = closest;
  }
}

function checkObstacleObstacleCollision() {
  for (let i = 0; i < obstacle.length; i++) {
    for (let j = i + 1; j < obstacle.length; j++) {
      let distance = Math.pow(obstacle[i].x - obstacle[j].x, 2) + Math.pow(obstacle[i].y - obstacle[j].y, 2);
      let min_distance = Math.pow(obstacle[i].radius + obstacle[j].radius, 2);
      // let distance = calculateDistance(obstacle[i], obstacle[j]);
      // let min_distance = obstacle[i].radius + obstacle[j].radius;
      if (distance <= min_distance) {
        if (obstacle[i].radius > obstacle[j].radius) {
          obstacle[i].radius += obstacle[j].radius * _PERCENT_GAIN_ON_WIN;
          // obstacle[j] = makeObstacle();
          obstacle.splice(j, 1);
        } else {
          obstacle[j].radius += obstacle[i].radius * _PERCENT_GAIN_ON_WIN;
          // obstacle[i] = makeObstacle();
          obstacle.splice(i, 1);
        }
        
      }
    }
  }
}

function movePlayer() {
  player.x += player.vx;
  player.y += player.vy;
}

function moveObstacles() {
  for (let i = 0; i < obstacle.length; i++) {
    if (_SPEED_DEPENDS_ON_SIZE) {
      obstacle[i].speed = 0.8 + 10 / (obstacle[i].radius + 4);
    }
    
    // Move player towards target
    // if (obstacle[i].target !== undefined) {
    //   // Make speed a function of distance from target
    //   if (_SPEED_DEPENDS_ON_TARGET_DISTANCE) {
    //     let distance = calculateDistance(obstacle[i], obstacle[i].target) - (obstacle[i].radius + obstacle[i].target.radius);
    //     obstacle[i].speed = distance / (window.innerWidth / 10);
    //   }
    //   let theta = Math.atan2(obstacle[i].target.y - obstacle[i].y, obstacle[i].target.x - obstacle[i].x);
    //   obstacle[i].vx = Math.cos(theta) * obstacle[i].speed;
    //   obstacle[i].vy = Math.sin(theta) * obstacle[i].speed;
    // }

    // Move player away from enemy
    // if (obstacle[i].enemy !== undefined) {
    //   // Make speed a function of distance from target
    //   if (_SPEED_DEPENDS_ON_ENEMY_DISTANCE) {
    //     let distance = calculateDistance(obstacle[i], obstacle[i].enemy) - (obstacle[i].radius + obstacle[i].enemy.radius);
    //     obstacle[i].speed = distance / (window.innerWidth / 10);
    //   }
    //   let theta = Math.atan2(obstacle[i].y - obstacle[i].enemy.y, obstacle[i].x - obstacle[i].enemy.x);
    //   let vx = Math.cos(theta) * obstacle[i].speed;
    //   let vy = Math.sin(theta) * obstacle[i].speed;
    //   obstacle[i].vx = (obstacle[i].vx + vx) / 2;
    //   obstacle[i].vy = (obstacle[i].vy + vy) / 2;
    // }

    // TODO - Move these into their own "calculateGreedVector()"
    // Calculate greed vector (push towards target)
    obstacle[i].vx_greed = 0;
    obstacle[i].vy_greed = 0;
    if (obstacle[i].target !== undefined) {
      let v_vector = findUnitVector(obstacle[i], obstacle[i].target);
      obstacle[i].vx_greed = v_vector[0];
      obstacle[i].vy_greed = v_vector[1];
    }

    // Calculate fear vector (push away from enemies, weighted)
    obstacle[i].vx_fear = 0;
    obstacle[i].vy_fear = 0;
    if (obstacle[i].enemies.length !== 0) {
      let sx = 0;
      let sy = 0;
      for (let j = 0; j < obstacle[i].enemies.length; j++) {
        // Rename this for easier use
        let enemy = obstacle[i].enemies[j];
        let distance = calculateDistance(obstacle[i], enemy);
        // Calculate how heavily we'll weigh our fear of this enemy
        let weight = 1 / distance; // It gets exponentially more severe as it gets closer to us
        // Find the unit vector showing us the direction to move away from enemy
        let v_vector = findUnitVector(obstacle[i], enemy);
        sx += -v_vector[0] * weight; // multiply vector by severity scalar and
        sy += -v_vector[1] * weight; // add it to our sum of vector components
      }
      let unit_vector = toUnitVector(sx, sy); // Convert <sx, sy> to unit vector
      obstacle[i].vx_fear = unit_vector[0];
      obstacle[i].vy_fear = unit_vector[1];
    }


    // Calculate center vector (push toward center)
    let center_point = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
    let v_vector = findUnitVector(obstacle[i], center_point);
    obstacle[i].vx_center = v_vector[0];
    obstacle[i].vy_center = v_vector[1];


    let d = calculateDistance(obstacle[i], center_point);
    let distance_percent_x = d / window.innerWidth * 2;
    let center_weight_x = Math.pow(distance_percent_x, 10);
    let distance_percent_y = d / window.innerHeight * 2;
    let center_weight_y = Math.pow(distance_percent_y, 10);

    // Weigh and combine vectors
    let greed_weight = 0.5; // 40% weight on greed
    let fear_weight = 0.5; // 50% weight on fear
    // let center_weight = 0.3 // 10% weight on center 
    let vx = obstacle[i].vx_greed * greed_weight + obstacle[i].vx_fear * fear_weight + obstacle[i].vx_center * center_weight_x;
    let vy = obstacle[i].vy_greed * greed_weight + obstacle[i].vy_fear * fear_weight + obstacle[i].vy_center * center_weight_y;
    let unit_vector2 = toUnitVector(vx, vy);
    obstacle[i].vx = unit_vector2[0];
    obstacle[i].vy = unit_vector2[1];

    // Bounce off walls
    if (obstacle[i].x <= 0) {
      obstacle[i].vx = Math.abs(obstacle[i].vx);
    }
    if (obstacle[i].x >= window.innerWidth) {
      obstacle[i].vx = -Math.abs(obstacle[i].vx);
    }
    if (obstacle[i].y <= 0) {
      obstacle[i].vy = Math.abs(obstacle[i].vy);
    }
    if (obstacle[i].y >= window.innerHeight) {
      obstacle[i].vy = -Math.abs(obstacle[i].vy);
    }

  }

  // Finally move object
  for (let i = 0; i < obstacle.length; i++) {
    obstacle[i].x += obstacle[i].vx * obstacle[i].speed;
    obstacle[i].y += obstacle[i].vy * obstacle[i].speed;
  }
}

function checkPlayerObstacleCollision() {
  for (let i = 0; i < obstacle.length; i++) {
    let distance = calculateDistance(player, obstacle[i]);
    let min_distance = player.radius + obstacle[i].radius;
    if (distance <= min_distance) {
      if (obstacle[i].radius > player.radius) {
        window.alert("You lose! Score: " + (Math.round(player.radius * 100) - 1000));
        obstacle = [];
        setup();
      } else {
        player.radius += obstacle[i].radius * 0.05;
        for (let j = 0; j < obstacle.length; j++) {
          obstacle[j].radius *= 0.99;
        }
        obstacle[i] = makeObstacle();
      }
    }
  }
}

function drawScore() {
  ctx.font = "50px Arial"
  ctx.fillStyle = "lightgray";
  ctx.fillText('Score: ' + (Math.round(player.radius * 100) - 1000), 40, 75);
}

function drawPlayer() {
  drawCircle(player.x, player.y, player.radius, player.color);
}

function drawObstacles() {
  for (let i = 0; i < obstacle.length; i++) {
    if (obstacle[i].target !== undefined) {
      let distance = calculateDistance(obstacle[i], obstacle[i].target) - (obstacle[i].radius + obstacle[i].target.radius);
      let hue = Math.min(distance / 200, 0.6);
      obstacle[i].color = hslToRgb(hue, 1, 0.5);
    } else {
      obstacle[i].color = hslToRgb(0.6, 1, 0.5);
    }
    drawCircle(obstacle[i].x, obstacle[i].y, obstacle[i].radius, obstacle[i].color);

    ctx.font = "12px Arial"
    ctx.fillStyle = "white";
    ctx.fillText(i.toString(), obstacle[i].x - 3, obstacle[i].y + 3);
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


