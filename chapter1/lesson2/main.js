/**
 * LESSON 2 - Functions, APIs
 * @author Josh@Gibbs.tk
 *
 * Welcome back! In lesson 2 we're going to cover functions and APIs. Make sure
 * you have index.html open in your browser and we'll get started.
 */ 
 
/**
 * Functions are a little bit more complicated than what we did in lesson 1, but
 * as long as you're practicing along the way you'll pick it up quickly. Just
 * like in math, functions take an input, process the data, and produce an 
 * output. I'll show you an example of a function that simply doubles a number: 
 * x, and then explain how it works:
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
 * We can call / run the function like this:
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
function bmi(weight_in_pounds, partial_height_feet, partial_height_inches) {
  // The formula for BMI is weight (kg) / height^2 (m^2)
  // We need to convert pounds to kg first. 1lb = 0.453592kg
  let weight_in_kg = weight_in_pounds * 0.453592;

  // Now let's combine our height measurements into inches
  let height_in_inches = partial_height_feet * 12 + partial_height_inches;
  // Convert into meters. 1in = 0.0254m
  let height_in_meters = height_in_inches * 0.0254;

  // We can use our converted data to calculate BMI
  let bmi_value = weight_in_kg / (height_in_meters * height_in_meters);
  return bmi_value;
}
/**
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
let josh_bmi = bmi(175, 5, 11);

// You can see above we not only ran the bmi function with my height and weight,
// but we also assigned the value it returned to a new variable named `josh_bmi`.
// Let's log that variable below to see what my BMI is in the console. 
console.log("Josh's BMI is", josh_bmi);
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
 * That's it for lesson 2! If you haven't done so already, try calling the bmi
 * function and give it your own information. Try creating a function that
 * squares a number and returns the result. If you're really feeling up for the
 * challenge, try creating a function that gives the user a random number when
 * they click on the screen. See you in lesson 3!
 */
