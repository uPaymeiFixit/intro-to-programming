/**
 * LESSON 3 - If, For
 * @author Josh@Gibbs.tk
 *
 * Welcome back! In lesson 3 we're going to cover If statements and For loops.
 * These are tools that will allow you to write more dynamic exciting code.
 * Make sure you have index.html open in your browser and we'll get started.
 */ 

/**
 * If statements! AKA poor man's artificial intelligence. If statements are no
 * more than a special type of function. You call a function called `if`, and it
 * takes one parameter: a true or false statement. If the statement is true, the
 * code in the curly braces will run, otherwise it will be skipped. Here's a 
 * simple example:
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

// Real quick, lets create some variables and a function to use in our if 
// statements. We've created all of these in previous lessons:
let a = 10;
let user_name = "Josh Gibbs";
function f(x) {
  return 2 * x;
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
 * variable. Most people, including me in this case, named the iterator `i`.
 * Some people will dock points off of your assignments if you use the
 * incredibly common `i` variable name; I'm looking at you, Professor James
 * Hester ;)
 *
 * The second part of the for loop header is the conditional statement. This
 * is similar to the body of a for loop in that it takes a true or false
 * (boolean) statement. If the statement evaluates to true, the loop will
 * continue to run. In most cases this will be `i < N` where `N` is the number of
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
    sequence += ", " + n3;
    // I've got some feedback that the statement above has caused some
    // confusion, so we'll break it down. The first thing to remember is that
    // the `+=` operator takes whatever value is to the right of it, and adds it
    // to the variable on the left. Lets break down how this operation will work
    // on the first iteration of the for loop. If we look under the hood,
    // `sequence` is equal to the string "0, 1" the first time this runs, and
    // `n3` is equal to the number 1. So our raw values look like this:
    //     "0, 1" += ", " + n3
    // Now if we simplify the right hand side (", " + n3), we get ", 1" which
    // we'll show below:
    //     "0, 1" += ", 1"
    // So now if we add "0, 1" and ", 1" we end up with:
    //     "0, 1, 1"
    // On the next iteration when `n3` = 2, the end result will be "0, 1, 1, 2"
  }

  // We'll return the sequence string so we can see all of the first n numbers
  // in the fibonacci sequence.
  return sequence;
}

// Let's calculate the first 5 fibonacci numbers:
console.log("Fibonacci:", fibonacci(5));

/**
 * That's the end of if statements and for loops! If you haven't already, try
 * creating your own bmi calculator function that automatically tells you your
 * bmi category (underweight, normal, etc). To practice for loops, try creating
 * a loop that prints multiples of 5 (5, 10, 15, 20, etc). If you're really up
 * for it, a popular intro to computer science assignment is to print a tree
 * that looks like this:
 * #
 * ##
 * ###
 * ####
 * #####
 * ... etc
 * 
 * And don't worry if you're not 100% comfortable with loops yet, because we're
 * going to get more practice with them in lesson 4. See you there!
 */
