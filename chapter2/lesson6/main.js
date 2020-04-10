/**
 * LESSON 6 - Canvas Basics
 * @author Josh@Gibbs.tk
 *
 * Welcome to chapter 2! Our goal in this chapter will be to practice what we've
 * learned in chapter 1. We may throw in a few new things, but for the most part
 * this will be practice. 
 */ 
 
/** 
 * Lets start by making a few functions that will aid us later on. First we'll
 * create a `random` function, which will return a random number between the two
 * parameters we provide it, min and max. We'll take advantage of the 
 * Math.random() function we learned in lesson2.
*/

// Return random number between [min, max)
function random(min, max) {
  // First we'll calculate the size, or range of the number we want to generate
  // between. For example, if we want to generate numbers between 5 and 15, our
  // size will be 10. 
  let size = max - min;
  // Remember Math.random() produces numbers between 0 and 1. If we multiply
  // this by `size` we'll get a random number between 0 and `size`. In our
  // example with a size of 10, we'll get numbers between 0 and 10.
  let number = Math.random() * size; 
  // Now that we have our number between 0 and 10 (size), we want to make sure
  // we increase that number so that it's not lower than our minimum. To do this
  // we simply add min to the number range we generated like so:
  return number + min;
  // Now our range went from (0 to size) to (min to size + min), or 5 to 15 like
  // we originally wanted! As you can see we also return this number. 
}

// To use the `random` function we just made to generate a random number between
// 5 and 15, we could call it like so.
let my_random_number = random(5, 15);
// And we'll go ahead and print it to the console so you can see how it looks.
console.log("Random number is:", my_random_number);


/**
 * Okay, lets practice another. This one will be more math related. Do you
 * remember the distance formula? Its goal is to calculate the distance between
 * two points in space; (x1, y1) and (x2, y2). The formula to do this is:
 * √( (x1 - x2)² + (y1 - y2)² ) lets create it below.
 */

// Returns distance between point 1 (x1, y1) and point 2 (x2, y2)
function calculateDistance(x1, y1, x2, y2) {
  // There's not much to this function. Make sure you can understand the
  // similarities between the formula below and the code used to produce it. 
  // Keep in mind, Math.pow(n, p) takes two parameters: the first parameter, n,
  // is the number we'll be raising to a power, the second number, p, is the
  // power we'll be raising it to. So if I wanted to calculate 4² I would write
  // Math.pow(4, 2)

  // √( (x1 - x2)² + (y1 - y2)² )
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

/**
 * We're going to do something a little different this time. Remember how we
 * talked about APIs in 21? We're going to discover a new API called 
 * context, or ctx for short. If you've loaded demo.html already you probably
 * saw a bunch of balls bouncing around on a grey background. demo.html is a
 * full web page just like any other page you'd see on the internet, the only
 * difference is I've only added a single element to the page. A `canvas`
 * element. It's not terribly important you understand much about this right
 * now, it's just useful to know this is the `application` our API is coming
 * from. The Canvas`s API allows us to draw on the element, much like a paint 
 * canvas. In the demo.html file I've already created the canvas, the background
 * and defined the canvas's context (ctx) that we'll be using to write on it.
 * All you need to know is whenever you see ctx in this file, we're talking 
 * about the big grey Canvas that fills the browser screen. 
 * 
 * It might be unclear at first, but lets try drawing a rectangle and that might
 * clear things up. We're going to create a function that creates a rectangle at
 * position (x, y) on the screen and has dimensions width by height. We'll
 * also take a `color` parameter for our rectangle.
 */

// Draw rectangle on ctx
function drawRectangle(x, y, width, height, color) {
  // If we were drawing with crayons the first thing we'd do is decide what
  // color we're going to pick up first. Similarly, we need to tell ctx to pick
  // up a `color` before we start drawing. We do this like so:
  ctx.fillStyle = color;

  // Rectangles are particularly easy. It's a single function with pretty
  // self-explanatory parameters:
  ctx.fillRect(x, y, width, height);
  // That's it! A rectangle with the above properties has been drawn on our 
  // canvas! This would be a good time to point out a somewhat weird quirk
  // about computers: the y-axis is flipped. That means the top of our window
  // has a y-position of 0, and it gets more positive the further down we go.
  // This means if we want to move something up, we decrease its y-value.
}

// For reasons I'll explain in a minute, we're going to hold off on testing
// our drawRectangle function, and the next function we're creating: drawCircle

// Draw a circle on ctx
function drawCircle(x, y, radius, color) {
  // Same as with the rectangle, we first tell ctx which color to use:
  ctx.fillStyle = color;
  // Unfortunately that's where the similarities end. Circles are considerably
  // more complicated, but I don't expect you to completely understand why. It's
  // most important that you understand this is how to create a circle, not why.
  
  // The first thing we no is tell ctx to put the crayon down on the paper:
  ctx.beginPath();
  // Now we tell it to start drawing an arc. The first two parameters, x and y,
  // tell ctx where the center of the circle will be. Radius is the radius of
  // our arc, and the next two parameters are start and stop angle. Remember 
  // from trigonometry that circles go from 0 to 2π. Since we want a full
  // circle, we'll always tell it to go from 0 to 2π.
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  // Now that we've finished drawing the circle, we tell ctx to color it all in:
  ctx.fill();
  // Done! We've now drawn a full circle. Why is this so much more complicated
  // than drawing a rectangle you ask? ¯\_(ツ)_/¯
}

/**
  * Lets talk about color. It's not critical you understand this, but it can be
  * very helpful when trying to dynamically change the color of something. In 
  * JavaScript we can represent colors in three ways. The first and easiest way
  * is to simply state the color like this:
  */
 let color1 = "green";
 /**
  * And yes, there are far more options than just the basic red, orange yellow,
  * etc. For a full list of colors visit https://htmlcolorcodes.com/color-names/
  * 
  * The second and probably most common way to do colors is like this:
  */
let color2 = "#00F6FF";
/**
 * This one requires a little bit more explaining. For those of you who already
 * know how color is displayed / created on an LCD / OLED monitor feel free to
 * skim ahead. Each pixel on your display is made up of three sub-pixels. These
 * sub-pixels are no more than a very tiny red, green, and blue light. These
 * colors can be combined in different ratios to create any color, making them
 * the additive-primary colors. If you're asking yourself why red yellow and
 * blue aren't the primary colors, I would highly recommend reading this:
 * https://wtamu.edu/~cbaird/sq/2015/01/22/why-are-red-yellow-and-blue-the-primary-colors-in-painting-but-computer-screens-use-red-green-and-blue/
 * 
 * How does this set of three colors relate to the weird hashtag-string we just
 * created? The numbers following the # symbol tell the computer how bright to
 * make each one of those lights. The first two numbers control the red 
 * subpixel, the middle two control the green subpixel, and the last two control
 * the blue subpixel. So if we break it up, we have red = 00, green = F6, and 
 * blue = FF. You may be asking yourself "but these aren't numbers". Oh but they
 * are, they're just not base 10. We use base 10 because we have 10 fingers, so
 * it's become very common. But this isn't always the best solution.
 * Babylonians used to use a base-60 number system! https://youtu.be/R9m2jck1f90
 * I feel like it's easier to show you a chart of numbers in different bases
 * than trying to explain how it works. Again, this is not essential for you to
 * understand. 
 * base 10:  0 1  2  3   4   5   6   7    8    9   10   11   12   13   14   15    16 ...
 * base  2:  0 1 10 11 100 101 110 111 1000 1001 1010 1011 1100 1101 1110 1111 10000 ...
 * base  3:  0 1  2 10  11  12  20  21   22  100  101  102  110  111  112  120   121 ...
 * base  4:  0 1  2  3  10  11  12  13   20   21   22   23   30   31   32   33   100 ...
 * base  5:  0 1  2  3   4  10  11  12   13   14   20   21   22   23   24   30    31 ...
 * base  6:  0 1  2  3   4   5  10  11   12   13   14   15   20   21   22   23    24 ...
 * base  7:  0 1  2  3   4   5   6  10   11   12   13   14   15   16   20   21    22 ...
 * base  8:  0 1  2  3   4   5   6   7   10   11   12   13   14   15   16   17    20 ...
 * base  9:  0 1  2  3   4   5   6   7    8   10   11   12   13   14   15   16    17 ...
 * base 10:  0 1  2  3   4   5   6   7    8    9   10   11   12   13   14   15    16 ...
 * base 11:  0 1  2  3   4   5   6   7    8    9    A   10   11   12   13   14    15 ...
 * base 12:  0 1  2  3   4   5   6   7    8    9    A    B   10   11   12   13    14 ...
 * base 13:  0 1  2  3   4   5   6   7    8    9    A    B    C   10   11   12    13 ...
 * base 14:  0 1  2  3   4   5   6   7    8    9    A    B    C    D   10   11    12 ...
 * base 15:  0 1  2  3   4   5   6   7    8    9    A    B    C    D    E   10    11 ... 
 * base 16:  0 1  2  3   4   5   6   7    8    9    A    B    C    D    E    F    10 ...
 * 
 * Do you see a pattern? Try to extend some of the bases on your own and use
 * this if you get stuck: https://www.rapidtables.com/convert/number/base-converter.html
 * The important bases we use are 2 (binary), 8 (octal), 10 (decimal: what you
 * use), and 16 (hexadecimal) which is what are colors are represented in! The
 * highest value we can achieve with two characters in hexadecimal is `FF`,
 * which translates to 255 in decimal. That highest value, `FF` tells the pixel
 * to turn on as bright as possible. If we wanted the color white, we would turn
 * on all the sub-pixels to their maximum brightness like so #FFFFFF. Similarly 
 * we can turn all the pixels off to create black: #000000. We can turn blue and
 * green off and set red to 100% to create pure red: #FF0000. A great resource
 * for picking colors and seeing their hex representation is:
 * https://htmlcolorcodes.com/color-picker/
 *
 * 
 * Okay BUT, we're not gonna use that at all... Sorry. I think it's very useful 
 * to know, and hopefully you still learned something, but I'm not a big fan of
 * representing colors that way, at least not when we're assigning something a 
 * dynamic color. For that we'll end up using this representation: 
 */
let color3 = "rgb(0, 255, 0)";
/**
 * I hope this one is a little bit more self-explanatory. Just like above, we're
 * assigning a value to the red, green, and blue sub-pixels. But this time we're
 * doing it in decimal. The values go from 0 (off) to 255 (100% on). The only
 * kind of weird thing here is that, while it looks like we're calling a
 * function, this is actually a string (it's wrapped in quotes). This is just a
 * quirk of JavaScript.
 * 
 * I know that was long, but now you know the three ways colors are represented
 * in JavaScript and HTML! This knowledge can be extended to just about anything
 * computer-color related. AND you covered number bases! How lucky are you?
 */

/**
 * That being said, I hate all three of these. I really like smooth color
 * transitions, and none of these methods allow you to easily ease from red to
 * orange, orange to yellow, yellow to green, etc. What would be useful is to
 * tell the computer what hue we want the color to be: basically how far around
 * the color wheel we want it to be. This is where the HSL (hue, saturation, and
 * lightness) colorspace comes in. If you're not familiar with HSL, or even if
 * you are, check out `Fig. 2a HSL cylinder` on the HSL Wikipedia page:
 * https://en.wikipedia.org/wiki/HSL_and_HSV
 * 
 * Does that clear things up? Lets try to create a function that takes a value
 * for hue, saturation, and lightness, and returns an rgb-based color like the
 * ones we just covered.
 * 
 * Okay, where do we start? 🤷‍♂️ I honestly don't know, that sounds pretty
 * complicated, but it also sounds like something that's extremely useful, so
 * somebody else must have created and published a function like that. Lets take
 * this opportunity to teach you something I don't think I've ever seen taught
 * before: how to google your programming problems. I've just googled "hsl to
 * rgb javascript". If your page looks anything like mine the first result
 * you'll see is "Converting Color Spaces in JavaScript | CSS-Tracks". Here's
 * the link just in case you didn't see it:
 * https://css-tricks.com/converting-color-spaces-in-javascript/ 
 * 
 * Wow, okay this might be useful, it looks like it's focusing a lot on the
 * theory of how to do it though. We can try to come back to this and make
 * something from it if we can't find anything else, but lets go back and try to
 * look for something that we can just copy and paste into our code with as
 * little modification as possible. What about that second link? "HSL to RGB
 * color conversion - Stack Overflow" 
 * https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 * Already that's sounding good to me, because it's from Stack Overflow, which
 * is an incredibly popular forum for programming related questions. I'd say 90%
 * of the questions I Google end up having an answer on Stack Overflow. That top
 * answer by Mohsen looks perfect for us. Here, I'll copy and paste it for you
 * below:
 */

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

/**
 * Wow, look at that function. I haven't even taught you everything in there.
 * Aren't you glad we decided to just Google that? Out of the box it would have 
 * worked pretty well, but I made a few changes to the function, specifically in
 * how it returns data. It used to return an array of three values: 
 *     [red_value, green_value, blue_value]. 
 * I went ahead and changed that so now it will return a value we can instantly
 * use; now it returns values in the format:
 *     "rgb(red_value, green_value, blue_value)"
 * 
 * Now if we wanted to make the color red, we can just do this:
 */
let color4 = hslToRgb(0, 1, 0.5);

// Let's create a function that will give us a random color.
function randomColor() {
  return hslToRgb(Math.random(), 1, 0.5);
}
/** 
 * That was pretty easy! Our first parameter accepts a number from 0 to 1, which
 * is exactly what Math.random() returns, so we can just have that be the first
 * parameter. We've also set the saturation to 100% and the lightness to 50% (in
 * between black and white), so we're always going to get as vibrant a color as
 * possible from this function. We can use the function like this:
 */
let color5 = randomColor();

/** 
 * Lets never talk about color again. That was way too long. We're finally going
 * to get to use those functions we created to draw shapes on the screen! I've
 * created a "setup" function below, which gets called when the canvas is ready
 * to be drawn on. That's why we weren't able to test our drawRectangle and
 * drawCircle functions immediately after we created them; they'll need to be
 * called from within the setup function below. You don't need to worry about
 * calling the setup function yourself. I've programmed the index.html file to
 * automatically call it as soon as the canvas is loaded. 
 */
function setup() {
  // Let's try creating our first rectangle using the function we created before!
  drawRectangle(0, 0, 100, 100, 'black');
  // We should now have a blue square 100x100px in the top left corner

  // Now let's try drawing one on the top right corner
  drawRectangle(window.innerWidth - 100, 0, 100, 100, color1);
  // Notice the only thing that's changed here is our x-position of the square
  // Since (x, y) refers to the top left corner of the rectangle, we need to
  // tell it to start drawing `width` pixels before the very right side of the
  // screen. Since our width is 100px and the width of the screen is
  // `window.innerWidth`, we know the left side of the square should exist at
  // an x position of `window.innerWidth - 100`

  // Let's try drawing a circle in the center of the screen
  let center_x = window.innerWidth / 2;
  let center_y = window.innerHeight / 2;
  drawCircle(center_x, center_y, 100, color2);

  // How about a rectangle at a random place on the screen?
  let random_x = random(0, window.innerWidth);
  let random_y = random(0, window.innerHeight);
  drawRectangle(random_x, random_y, 50, 100, color3);
  // Try changing this so that the width and height are random too

  // What if we wanted to make 10 squares in a row with a 5 pixel gap in
  // between them?
  for (let i = 0; i < 10; i++) {
    let size = 20;
    let x = i * (size + 5); 
    drawRectangle(x, 200, size, size, color4);
  }
  // Try making 50 squares instead of 10, then try making them line up
  // vertically instead of horizontally.

  // Let's make that a little bit more complicated. We'll make a 5x5 grid of
  // circles this time.
  let diameter = 20;
  let offset_x = 30;
  let offset_y = 300;
  for (let i = 0; i < 5; i++) {
    let x = i * (diameter + 5);
    for (let j = 0; j < 5; j++) {
      let y = j * (diameter + 5);
      drawCircle(x + offset_x, y + offset_y, diameter / 2, color5);
    }
  }

}

/**
 * We're finished with lesson 6! As one last exercise, I'd encourage you to try
 * to draw 100 randomly placed and randomly colored squares or circles on the
 * screen. If you can do that you're ready to move onto lesson 7, where we'll
 * be doing much of the same but organizing our data in arrays and objects. See
 * you in lesson 7!
 */
