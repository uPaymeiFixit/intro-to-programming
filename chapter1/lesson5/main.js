/**
 * LESSON 5 - Scopes
 * @author Josh@Gibbs.tk
 *
 * Welcome to lesson 5! Up until this point we've only talked about the syntax 
 * of writing code, as well as introducing tools. For the first time we're going
 * to discuss a concept that describes the way our code is read by the computer:
 * scope. 
 * Make sure you have index.html open in your browser and we'll get started.
 */ 

/**
 * Scope simply describes which functions, loops, statements, etc have access to
 * a certain variable. A `scope` is a portion of code where a variable can still
 * be accessed. Scope is often layered in that you can have a scope contained in
 * another scope. 
 * 
 * I could spend quite a while trying to describe in a very detailed and 
 * confusing way how scope works, but instead I'm going to try to show you as
 * many examples as I can. As you're reading through these examples remember to
 * tweak them, break them, and test them yourself. Also remember this rule
 * (which there are exceptions to, but I won't be using them): A scope is
 * usually anything inside curly braces {}. Any variable declared inside these
 * braces cannot be accessed outside the braces. I know this is probably 
 * confusing, hopefully these examples will help:
 */

function my_function() /* BEGIN my_function SCOPE */ {
  // We can reference this variable, a, anywhere within these brackets
  let a = 10;

  if (true) /* BEGIN if SCOPE */ {
    // We can reference b inside this if statement, but not outside it
    let b = 20;

    // As you probably expected, if we try to access b (by logging it below) we
    // don't have any problem because it was declared in the same scope we're 
    // accessing it in.
    console.log("We can access b:", b);

    // What if we try to log a? It will log successfully because even though 
    // we're in the `if` scope where a was not declared, we're still inside the
    // `my_function` scope where a was declared.
    console.log("We can also access a:", a);
  } /* END if SCOPE */

  // If we try to log the variable we declared in the `if` scope, `b`, we'll get
  // an error message that b is not declared, because we've already left the
  // scope so we cannot access the variable.
  console.log("Expect an error message in the console below:");
  console.log("We can't access b:", b); 

  // However if we try to log `a` again, it will work because we haven't left
  // the scope it was originally declared in.

} /* END my_function SCOPE */


// Don't mind this, we just need to call the function so that you can see
// all of the output it produces in the console log.
my_function();
// Since my_function() will throw errors, which you should see in the console,
// the program will stop throwing new errors. You need to either fix the errors
// it throws or simply comment out or delete the call to my_function() above,
// then the rest of the code will run below.

console.log("Would variables a and b be accessible on the line below?");
console.log(a, b);
// Nope! We've left the function and with it the function's scope. The variables
// have essentially disappeared.
// Okay now to continue comment out that last line where we try to print a and
// b, because it's throwing an error and we can't continue otherwise. 


// What if we declare a variable right here, not inside any brackets?
let c = 30;
// Lets create a new scope again and try to access it to see what happens.
function f() {
  console.log("c:", c);
  // It works! That's because this document has its own scope, which we call the
  // global scope. You can imagine this document being surrounded by {]
}

f(); // Don't worry about this again, just running the f() function for you.


// Sometimes we need to share a variable between multiple parallel scopes. This
// is easily achieved by declaring the variable in a scope that encloses both
// scopes, such as the global scope. But what if we need to define a variable
// in one scope, but use it in another parallel scope? We can do it like this:

// So first we'll declare our variable. We haven't assigned it a value or
// anything because we're going to pretend we need to calculate its value 
// in a function we'll define, g.
let d;
function g() {
  // We declared our variable, so now let's "calculate" a value for it and
  // assign it.
  d = 4 * 10;
  // Also, something somewhat unrelated but good practice:
  // note that this function doesn't return a value. We're only using the 
  // function to "calculate" and assign a value for d, so we don't really need
  // to be returning anything. 
}

g(); // call g() so that we define our variable

// Now lets define a function in a parallel scope.
function h() {
  // Now we can access the variable we declared and defined!
  console.log("d:", d);
}

h(); // calling h()


// How does this work with overlapping variable names? Let's see.
// First we'll define a variable, e, in the global scope
let e = 50;
function k() {
  // But what if we define another variable, e, inside this scope?
  let e = 51;
  console.log("e inside scope:", e);
  // As we can see from the console's output in our browser, we seem to have
  // overwritten `e`. If we change e, or do anything else with it, the variable
  // in the scope closest to us will be the one references.
}
k(); // calling k()

// But if we step outside the scope, we see that our original e is still in
// tact!
console.log("e:", e);

// Lets look at one last example just to make sure you understand what defines
// a scope. Specifically we're going to make sure you understand scopes aren't
// limited to functions, but to if statements and for loops as well.

// I won't do as much explaining other than telling you which variables are 
// available where
function my_function2() {
  let x = 80;
  // Here we can reference: x
  // also, it should go without saying we can access any of the variables in the
  // global scope we defined previously. That means we can also call any of the
  // above functions from here. Like this:
  h();

  for (let i = 0; i < 10; i++) {
    // Here we can reference: x, i
    let y = 90;
    // Here we can reference x, i, y
    if (true) {
      // Here we can reference x, i, y
      let z = 100;
      // Here we can reference x, i, y, z
    }
    // Here we can reference x, i, y
  }
  // Here we can reference x
}
// Here we can't reference any of those variables (but we can still reference
// the global variables and functions)

/**
 * I hope that wasn't too confusing. Scope is a complicated topic and it just
 * takes practice to get used to. Just be aware  when you see an error talking 
 * about an undefined variable, sometimes its because your variable is in the
 * wrong scope.
 */

/*
 * Congratulations! You've finished the first chapter. And congratulations to me
 * because I just finished writing the first chapter, and to be honest it's
 * getting a little old... 🙃 
 * 
 * With everything you've learned in chapter 1, you now have a basic
 * understanding of programming in JavaScript! With everything you've learned
 * here, you can create just about anything. There are always more efficient
 * ways to do things, like shorthand functions: `() => {}`, `for–in` loops, 
 * the idea of singletons, but you can accomplish everything using these tools
 * while you learn the rest.
 *
 * In chapter 2 we'll begin drawing shapes on the screen and eventually 
 * animating them into our own game. An important note: in chapter 2 you won't
 * see instructions to open the console in index.html, but it's still just as
 * important as ever that you have the console open, as we'll still be using it.
 * See you in chapter 2!
 */
