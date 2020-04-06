/**
 * STOP! It's very important that you have a text editor that supports
 * syntax highlighting while reading and editing this document. If all of this
 * text is simply black and white I highly recommend you download and use
 * Sublime Text (https://www.sublimetext.com/) to read and edit this document.
 */

/**
 * Welcome! I've had a few people ask me how to program lately, and felt like
 * this would be a decent way to start learning. I'd love to improve this as
 * much as possible so if you have any feedback or there was anything unclear
 * please let me know. You can email me at josh@gibbs.tk or make an issue on
 * Github. Also if you're just confused about this or you want something
 * explained that I didn't cover in this guide, please don't hesitate to ask.
 * This is my passion; it's the equivalent of asking a car guy about his car:
 * he's not gonna turn you down. Even if you don't know me, the only thing you
 * should be concerned about regarding asking me a question is how to get me to
 * shut up. So good luck with the guide, and I'll expect to hear from you soon!
 * 
 * My goal with this template will be to just provide the very basics of
 * programming. I'm not going to try to introduce any complex programming
 * paradigms or APIs or anything super language specific. We'll just cover the
 * very basics, and we'll do that by having you read and modify my own code.
 * There is no cheating. Your job as a programmer is to Google as much as
 * possible. Copy other people's code, tweak it here and there; in my opinion
 * that's the best way to learn. So lets get started then.
 *
 * The first thing we'll cover real quick is what this file is and how to test
 * your code. One of the benefits of JavaScript (the language we're using) is
 * that it can be run in the browser without you needing to install anything.
 * I've set up this template so that all you need to do to see your code run is
 * open the index.html file in your browser, which you can usually do by double
 * clicking on it. The HTML (HyperText Markup Language) file often holds the
 * text, images, and overall formatting of a web page. In our case it holds a
 * simple grey "canvas" element, which we will draw on. It's a full web page
 * just like any other website you would visit, the only difference is we only
 * have one big element. 
 *
 * The file you're in right now is the JavaScript file.
 * JavaScript is often responsible for more dynamic elements of a web page, like
 * submitting a form or interactive animations, which is what we're going to
 * focus on. Since I've set up the index.html file to automatically link to this
 * JavaScript file, all you need to do to see your saved changes in this file is
 * reload the index.html page in your browser. If you change a color from "green"
 * to "blue" in this file and save it, once you refresh the page in your browser
 * you should see the change reflected. And I would encourage you to mess with
 * as much as possible. Break it and fix it. Get familiar with the undo button.
 * Don't rely solely on this text to teach you; learn by doing.
 *
 * Since we're in a comment, lets talk about them first. Every line of this file
 * will be processed and executed by your computer from top to bottom (with a
 * few exceptions). Even this big block of text you've been reading gets
 * processed, but since it's surrounded by the slash and asterisks you see the
 * computer knows not to try to execute these lines. Comments are useful for a
 * ton of reasons, from helping you understand what a block of code does to
 * communicating to other developers such as yourself. There is no such thing as
 * "self-documenting" code, no matter how good it is...Louis.
 */

// You can start a comment with two slashes (//) too, which is more common

/**
 * Just as in math we might want to define a variable like "a = 10", we do the same
 * when programming like this:
 */
let a = 10;
/**
 * The `let` portion of this line, which is called the declaration, tells the
 * language interpreter (the browser runtime) that we will be declaring a
 * variable. It's also useful to know, even though we won't use them in this
 * file, that there are alternative declarations to `let` such as `const`.
 *
 * After the declaration we specify the variable name. I chose `a` to be my
 * variable name, but we could have chosen anything that doesn't contain spaces
 * or some symbols, or starts with a number. For example I could also define
 * the following variable:
 */
let Much_longer_variable_name1337 = 42;
/**
 * We set that variable name equal to (=) whatever value we want it to be. This
 * section could be very long, but in order to keep it short we'll briefly
 * mention that JavaScript lets us assign almost anything to a variable, not
 * just numbers, but we won't worry as much about that. For this we'll focus on
 * numbers and text (strings). I could set my name to a variable by surrounding
 * it with quotes like this:
 */
let user_name = "Josh Gibbs";
/**
 * The last thing you may have noticed is the semicolon at the end of the line.
 * This tells the JavaScript interpreter that it has reached the end of the
 * line. Not all languages (python) use semicolons to end a line, but most do.
 * Your JavaScript interpreter will likely be forgiving if you forget this, but
 * it's best to include it. JavaScript is very forgiving...
 */

/**
 * Now let's learn about logging. Sometimes it's helpful to see what the output
 * of a function or the value of a variable is while the code is running. We do
 * this by calling the built-in `console.log()` function. This can be helpful
 * if you're trying to debug your code, or if you just want to see the output
 * of a function to make sure you programmed it correctly. The console is
 * nothing more than a tool for developers and serves no real purpose in a well
 * written program; you'll likely end up removing all of your console logs after
 * you finish writing your program. Here are a few examples of how you can log 
 * information to the console:
 */
console.log("This is a string.");
console.log(a);
console.log("The value of a =", a);
console.log("The answer was " + Much_longer_variable_name1337);
console.log("Hello,", user_name);
/**
 * You can see the output of all of these by right clicking on the web page in
 * the browser, clicking "Inspect", and then switching to the "Console" tab
 * towards the bottom of the page. You should see the output in that window. 
 * We'll be using the console a lot to test our functions and calculations.
 */

/**
 * The next concept gets a little more complicated: functions. Just like in
 * math, functions take an input, process the data, and produce an output. I'll
 * show you an example of a function that simply doubles a number: x, and then
 * explain how it works:
 */

function f(x) {
  return x + x; // Yes, `2 * x` would have worked too
}
/**
 * We declare a function using the `function` keyword. There are other ways to
 * declare a function, and this isn't the same for every language, but it's
 * what we'll focus on for now. After the declaration we name our function. I
 * named it `f`, but you could have named it anything that follows the same rules
 * as naming a variable. After that we'll specify the parameters the function
 * accepts. Parameters are just like variables. Here, we chose `x` as the name
 * but we could have named it anything like a variable. 
 *
 * Then we surround our code in curly braces { } to tell the interpreter that 
 * all of the code in between the curly braces belongs to that function. We also
 * returned a value in this function, we'll go over how this works in more detail 
 * later, but in short, it allows us to get information out of the function, or 
 * another way to think about it is assigning the function a dynamic value.
 *
 * We can call this function like this:
 */
f(4);
/**
 * We called it! It assigned the value we passed in, 4, to x and then returned
 * 4 + 4. Fascinating but useless, because we didn't do anything with that
 * data. Let's do it again, but this time let's assign it to a variable and then
 * print the value of that variable:
 */
let doubled_number = f(4);
console.log("The output of f(4) =", doubled_number);
/**
 * We should see 8 printed in the console now. We could have also called f(4)
 * in line with the same result like this:
 */
console.log("The output of f(4) =", f(4));
/**
 * Both of these are functionally the same.
 *
 *
 * Let's look at a much more complicated example, incorporating everything we've
 * learned so far. I feel like I've over-explained everything so far, so I'm
 * going to possibly under-explain here. This is where feedback would be useful
 * for me if it's confusing.
 */

// This function calculates BMI
function bmi(name, weight_in_pounds, partial_height_feet, partial_height_inches) {
  // The formula for BMI is weight (kg) / height^2 (m^2)
  // We need to convert pounds to kg first. 1lb = 0.453592kg
  let weight_in_kg = weight_in_pounds * 0.453592;

  // Now let's combine our height measurements into inches
  let height_in_inches = partial_height_feet * 12 + partial_height_inches;
  // Convert into meters. 1in = 0.0254m
  let height_in_meters = height_in_inches * 0.0254;

  // We can use our converted data to calculate BMI
  let bmi_value = weight_in_kg / (height_in_meters * height_in_meters);
  console.log(name + "'s BMI is", bmi_value);
}

/**
bmi(user_name, 175, 5, 11);
 * Phew, that was a lot. Hopefully it all made sense. Something that may catch
 * people off guard is the return statement on the last line. In our `f(x)`
 * function we immediately returned x + x, so saying `let a = f(x)` is
 * equivalent to `let a = x + x`. However in our bmi function, we
 * used several lines to calculate our `bmi_value` that we end up returning on
 * the last line. This tells the function to run all the above code, and then
 * return `bmi_value` to whatever called it. You don't
 * always need to return a value in your function, and that's okay! The return
 * statement is completely optional, so if you see a function without it don't
 * worry. It just means nothing is depending on that function to return a value.
 * 
 * Lets try running our bmi function below with my weight and height: 
 */

// For fun, try replacing the numbers with your information and refreshing 
// your browser to see the new number.

/**
 * Moving on with functions, we'll briefly touch on Application Programming
 * Interfaces (APIs). For the most part, APIs are a collection of functions
 * aimed at getting information from or providing information to an application.
 * In our case the application will be the browser. Let's look at some functions
 * provided by our browser, which you may think of as the browser's API. The
 * first and probably most useful set of functions belong to the `Math` object.
 */
console.log("The square root of 49 is",       Math.sqrt(49)    ); // 7
console.log("5.45 gets rounded to",           Math.round(5.45) ); // 5
console.log("We can round 3.1 up to",         Math.ceil(3.1)   ); // 4
console.log("We can round 3.9 down to",       Math.floor(3.9)  ); // 3
console.log("2^5 is",                         Math.pow(2, 5)   ); // 32
console.log("Random number between 0 and 1:", Math.random()    ); // ??

/**
 * For more details on the Math object and the many more functions it contains
 * visit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 *
 * Those are most of the Math functions that will be useful to us, so now let's
 * look at a few `window` functions and variables. These usually relate to the
 * actual window that you have open.
 */

 // innerWidth and innerHeight are variables that change with the window size
console.log("The width of this window is", window.innerWidth);
console.log("The height of the window is", window.innerHeight);
// onclick is to be assigned a function which will be called when we click
// anywhere on the webpage
window.onclick = function showAlert() {
  // `alert` will pop up a message
  window.alert("This alert pops up when you click on the page");
}
// Go ahead and test it! Click on the page and watch the alert pop up.

/**
 * Hopefully these API functions / variables make sense. Just know that these
 * exist and we can and will take advantage of them later.
 */

/**
 * We'll move onto another topic: if statements! AKA poor man's artificial
 * intelligence. if statements are no more than a special type of function. You
 * call a function called `if`, and it takes one parameter: a true or false
 * statement. If the statement is true, the code in the curly braces will run,
 * otherwise it will be skipped. Here's a simple example:
 */
if (true) {
  console.log("What do you know, true evaluates to true!");
}

if (false) {
  console.log("This line will never be executed");
}

if (10 > 1) {
  // true
}

// When comparing if two numbers are equal, we use 3 equal signs (===)
if (5 === 5) {
  // true
}

// We can check multiple statements by using &&
if ((a === 10) && (f(a) >= 20)) {
  console.log("You probably haven't modified any code.");
}

// We can check one or the other (or both) statements using ||
if ((user_name === "Josh Gibbs") || false) {
  console.log("Name is still set to Josh Gibbs");
}

// We can check if something is not equal by using !==
if (10 !== 5) {
  console.log("Correct! 10 does not equal 5!");
}

/**
 * Now we'll introduce else if and else statements. These can be added onto an
 * if statement if we want to run different blocks of code for different
 * scenarios.
 */
if (false) {
  // not going to run
} else if (false) {
  // not going to run
} else {
  // going to run
}

// Let's try a practical example
let my_bmi = 24.4;
/**
 * For a fun exercise modify the bmi function we wrote earlier so that we can
 * write the line above like this:
 * let my_bmi = bmi(user_name, 175, 5, 11);
 * HINT: we'll need to add a return statement to the end of the bmi function
 */
if (my_bmi < 18.5) {
  console.log("Underweight");
} else if (my_bmi < 25) {
  console.log("Normal weight");
} else if (my_bmi < 30) {
  console.log("Overweight");
} else {
  console.log("Obese");
}

/**
 * For another fun exercise, try to re-write the bmi function to tell us what
 * our BMI category is instead of the raw BMI value.
 */

/**
 * I hope you're not as tired of reading this as I am of writing it. We're gonna
 * cover for loops in as much detail as I can muster now.
 *
 * Often times we need to process lots of things. Maybe its fields in a PDF or
 * pixels in a picture, or enemies or bullets in a game. There are several types
 * of loops, and many ways to write a for loop, but we'll go over the classic
 * for loop which is largely the same in most languages. Here's an example of a
 * simple for loop:
 */
for (let i = 0; i < 10; i = i + 1) {
  console.log(i);
}
/**
 * There's a lot going on here, so let's do our best to break it down. A for loop
 * has three parts in its header. The first part can do whatever you like, or
 * nothing at all. In 99% of cases it will be used to define our iterator
 * variable. Most people, including me in this case, named the iterator i.
 * Some people will dock points off of your assignments if you use the
 * incredibly common `i` variable name; I'm looking at you, Professor James
 * Hester ;)
 *
 * The second part of the for loop header is the conditional statement. This
 * is similar to the body of a for loop in that it takes a true or false
 * (boolean) statement. If the statement evaluates to true, the loop will
 * continue to run. In most cases this will be `i < N` where N is the number of
 * times the loop should run. Our loop above runs 10 times, from 0 to 9.
 *
 * The last part of the loop header can also be used for anything you want, but
 * in most cases it's used to increment the iterator. We're adding `1` to `i` every
 * time the loop runs in our case.
 * As a result, we're logging numbers 0 through 9 with the above loop.
 */

/**
 * There's something we should mention, and I can't find a better place to
 * interject it than here. There is shorthand we'll be using ahead of here:
 */
a += 5; // This adds 5 to the variable `a`. Equivalent to `a = a + 5`
a++; // Increments `a` by 1. Equivalent to `a = a + 1`
a--; // Decrements `a` by 1. Equivalent to `a = a - 1`;
// In the for loop above we could have replaced `i = i + 1` with `i++`

/**
 * Remember the fibonacci sequence? 0 1 1 2 3 4 5 ... We get the next number
 * by adding the two previous numbers.
 * 0 + 1 = 1
 *     1 + 1 = 2
 *         1 + 2 = 3
 *             2 + 3 = 5
 *                 3 + 5 = 8
 * We could use a for loop to calculate the first `n` fibonacci numbers like so:
 */

// Calculates first `n` fibonacci numbers
function fibonacci(n) {
  // Define first two fibonacci numbers manually, 0 and 1
  let n1 = 0;
  let n2 = 1;
  // We'll also keep a record of these numbers in a string
  let sequence = n1 + ", " + n2; // Right now this is equivalent to "0, 1"
  // Now we'll define our loop, which will simply run the code `n` times. Note
  // we never even end up using the `i` variable other than in the header.
  for (let i = 0; i < n; i++) {
    // The "current" fibonacci number, n3, is calculated by adding the previous
    // two numbers, n1 and n2.
    let n3 = n1 + n2;
    // Now we need to shift all the numbers down since we only care about the
    // current and previous number.
    n1 = n2;
    n2 = n3;
    // We're going to add our new n2 (which is equal to n3) to the string
    // On the first iteration it will look like this "0, 1, 1"
    sequence += ", " + n2;
  }

  // We'll return the sequence string so we can see all of the first n numbers
  // in the fibonacci sequence.
  return sequence;
}

// Let's calculate the first 5 fibonacci numbers:
console.log("Fibonacci:", fibonacci(5));

/**
 * Lets take a quick break from for loops, because we're going to get more
 * practice with them in a minute. The next topic is arrays. An array is a data
 * structure (a way data is organized) where some number (sometimes an
 * undefined number) of variables are are held in a sort of "collection" and
 * referenced by their position. Imagine we're putting the top row of letters on
 * your keyboard in an array. We would define that array like this:
 */
let keyboard_array = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i'];
// We can access the Nth element in the array like this:
console.log("The fifth letter on the keyboard is" , keyboard_array[5]);
/**
 * You should see 'y' in the browser's console. No, you didn't count wrong,
 * arrays in JavaScript (and many other languages) start at an index of 0. So
 * 'q' is the 0th element, and 'y' is the 5th.
 *
 * We could add elements to the array like so:
 */
keyboard_array[8] = 'o';
/**
 * Arrays also come with LOTS of helper functions. You can read about many of
 * them here if you'd like https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * but for now we'll focus on only a few. The first, Array.push(), adds an
 * element to the end of the array, like so:
 */
keyboard_array.push('p');
/**
 * Another useful Array function is Array.splice(i, n). We use this to remove
 * `n` elements from the array starting at position "i". For example, if we
 * wanted to remove 'r' from our keyboard_array, we would do the following:
 */
keyboard_array.splice(3, 1);

// We can print our arrays just like any other variable:
console.log(keyboard_array);

/**
 * Arrays can hold any type of data. Numbers, characters, strings, even other
 * arrays and functions. Lets look over another example just for some practice:
 */
let demo_array = [1, 2, 3];
demo_array.push(4); // Added 4 to the end of our array.

// Now lets use a for loop to add all of these numbers up
let sum = 0;
for (let i = 0; i < 4; i++) {
  sum += demo_array[i];
}
/**
 * If we break this loop down step by step it looks like this:
 * sum += demo_array[0] -> 0 += 1
 * sum += demo_array[1] -> 1 += 2
 * sum += demo_array[2] -> 3 += 3
 * sum += demo_array[3] -> 6 += 4
 */
console.log("Sum of numbers =", sum); // 10
/**
 * Another useful Array feature we should talk about is Array.length. This is
 * simply the number of items in an array. For example:
 */
console.log("Our demo_array has", demo_array.length, "elements.");
/**
 * In our for loop header above we could have replaced 'i < 4' with
 * 'i < demo_array.length'. This would help prevent errors in the case that
 * we add or remove numbers from the array.
 */



// The Fibonacci sequence is a little easier to calculate when we use arrays:
function fibonacci2(n) {
  // Define first two fibonacci numbers manually, 0 and 1
  // This will also hold a record of all the fibonacci numbers
  let fibonacci_array = [0, 1];
  // Now we'll define our loop, which will simply run the code `n` times. Note
  // we never even end up using the `i` variable other than in the header.
  for (let i = 0; i < n; i++) {
    // We push the "current" fibonacci number onto the array by adding
    // the previous two numbers, fibonacci_array[i] and fibonacci_array[i + 1]
    fibonacci_array.push(fibonacci_array[i] + fibonacci_array[i + 1]);
  }

  // We'll return the array so we can see all of the first n numbers in the
  //fibonacci sequence.
  return fibonacci_array;
}

// Lets calculate the first 5 fibonacci numbers using our new method:
console.log("Fibonacci:", fibonacci2(5));

/**
 * There is an important thing to know about arrays (and Objects which we'll
 * cover in a minute) that may save you hours of debugging: array and object
 * variables are simply a reference to the array or object. What does this mean?
 * It means the `keyboard_array` variable actually just stores an address of
 * your memory (RAM), not the actual data. You don't need to understand that,
 * but you need to know that the reason matters is that if you try to copy an
 * array or object by setting one object equal to another, they will both
 * reference the same array or object. For example, lets say I want to make a
 * new array named `keyboard_array2` and I'm only going to add some characters,
 * so I want to copy `keyboard_array`. I would normally do:
 */
let keyboard_array2 = keyboard_array;
/**
 * But this will have some unexpected consequences. Both of the variables are
 * now set to an address of a chunk of memory, not the actual array. So when I
 * add keyboard_array2.push('a'), I'll actually be adding `a` to the original
 * `keyboard_array` too.
 *
 * The proper way to copy the array would be a little JavaScript trick:
 */
let keyboard_array3 = [...keyboard_array];

/**
 * To finish up arrays, see if you can figure out how this function works. It's
 * functionally identical to fibonacci1 and fibonacci2, but it looks weird.
 */
function fibonacci3(n) {
  for (
    array = [0, 1];
    array.length <= n + 1;
    array.push(array[array.length - 2] + array[array.length - 1])
  ) {}
  return array;
}

/**
 * Lets finish up this lesson / chapter / whatever this has turned into with
 * Objects. Objects are simply a collection of data. For example, we may want
 * to collect and store information about a player in a game. We can define
 * an object like so:
 */
let player = {
  name: user_name,
  age: 25,
  x_position: Math.random() * 1000,
  y_position: Math.random() * window.innerHeight,
  color: 'blue'
};
/**
 * We now have a player object with a `name` property set to "Josh Gibbs", an
 * `age` property set to 25, an `x_position` set to a random number between
 * 0 and 1000, a `y_position` set to a random number between 0 and the height of
 * the browser window (in pixels), and a `color` of blue.
 *
 * We can access pieces of data like this:
 */
console.log(player.name, "is", player.age, "years old.");

// We can add new elements to an object like this:
player.username = "uPaymeiFixit";

/**
 * For the most part that's the extent of how you'll interact with arrays.
 * Before we finish lets review how objects and arrays are passed by reference,
 not value. This means if you try to copy an object by setting one object equal
 * to another, they will both reference the same object. For  example, lets say
 * I want to make a new object named `player2` and I'm only going to change the
 * name, so I want to copy `player`. I would normally do:
 */
let player2 = player;
/**
 * This has the same pitfall of copying arrays this way: both of them are now
 * set to an address of a chunk of memory, not the actual object. So when I
 * change player2.name = "Bob Dylan", I'll actually be changing `player`'s name
 * too.
 *
 * There are several ways to copy objects, all have their pros and cons, but
 * we'll be using this way:
 */
let player3 = {...player};


/**
 * Congratulations! You now have a basic understanding of programming and
 * JavaScript! With everything you've learned here, you can create just about
 * anything. There are always more efficient ways to do things, like shorthand
 * functions: `() => {}` or for in loops in JavaScript, the idea of singletons,
 * but you can accomplish everything using these tools while you learn the rest.
 *
 * Take a break, maybe even a day to process and play around with this code, and
 * then open the `lesson2 folder where we'll start creating a game.
 */
