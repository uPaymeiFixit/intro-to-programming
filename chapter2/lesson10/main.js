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

function calculateDistance(x1, y1, x2, y2) {
  // √( (x1 - x2)² + (y1 - y2)² )
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
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
  for (let i = 0; i < 100; i++) {
    obstacle.push(makeObstacle());
  }
}


function makeObstacle() {

  return {
    x: random(0, window.innerWidth),
    y: random(0, window.innerHeight),
    radius: random(player.radius * 0.2, player.radius * 1.8),
    color: randomColor(),
    vx: random(-5, 5),
    vy: random(-5, 5)
  }
}

function loop() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  movePlayer();
  moveObstacles();

  // checkPlayerObstacleCollision();
  checkObstacleObstacleCollision();
  
  // drawScore();
  // drawPlayer();
  drawObstacles();
}

function checkObstacleObstacleCollision() {
  for (let i = 0; i < obstacle.length; i++) {
    for (let j = i + 1; j < obstacle.length; j++) {
      let distance = Math.pow(obstacle[i].x - obstacle[j].x, 2) + Math.pow(obstacle[i].y - obstacle[j].y, 2);
      let min_distance = Math.pow(obstacle[i].radius + obstacle[j].radius, 2);
      // let distance = calculateDistance(obstacle[i].x, obstacle[i].y, obstacle[j].x, obstacle[j].y);
      // let min_distance = obstacle[i].radius + obstacle[j].radius;
      if (distance <= min_distance) {
        if (obstacle[i].radius > obstacle[j].radius) {
          obstacle[i].radius += obstacle[j].radius * 0.05;
          obstacle[j] = makeObstacle();
        } else {
          obstacle[j].radius += obstacle[i].radius * 0.05;
          obstacle[i] = makeObstacle();
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
    if (obstacle[i].x <= 0 || obstacle[i].x >= window.innerWidth) {
      obstacle[i].vx *= -1;
    }
    if (obstacle[i].y <= 0 || obstacle[i].y >= window.innerHeight) {
      obstacle[i].vy *= -1;
    }
  }

  for (let i = 0; i < obstacle.length; i++) {
    obstacle[i].x += obstacle[i].vx;
    obstacle[i].y += obstacle[i].vy;
  }
}

function checkPlayerObstacleCollision() {
  for (let i = 0; i < obstacle.length; i++) {
    let distance = calculateDistance(player.x, player.y, obstacle[i].x, obstacle[i].y);
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
    drawCircle(obstacle[i].x, obstacle[i].y, obstacle[i].radius, obstacle[i].color);
    // drawRectangle(obstacle[i].x, obstacle[i].y, obstacle[i].radius, obstacle[i].radius, obstacle[i].color);
  }
}

function checkKeyDown(event) {
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

window.onkeydown = checkKeyDown;

function checkKeyUp(event) {
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

window.onkeyup = checkKeyUp;
