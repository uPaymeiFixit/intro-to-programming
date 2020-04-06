/**
 * LESSON 1 - Intro, Comments, Logs
 * @author Josh@Gibbs.tk
 */

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
 * possible. Copy other people's code, tweak it here and there. In my opinion
 * that's the best way to learn. So lets get started then.
 *
 * The first thing we'll cover real quick is what this file is and how to test
 * your code. One of the benefits of JavaScript (the language we're using) is
 * that it can be run in the browser without you needing to install anything.
 * I've set up this template so that all you need to do to see your code run is
 * open the index.html file in your browser, which you can usually do by double
 * clicking on it. The HTML (HyperText Markup Language) file often holds the
 * text, images, and overall formatting of a web page. In our case for the next
 * few lessons it holds a some very basic text, links, and a list. It's not as
 * pretty as other web pages you might be used to on the internet, but it only
 * took about five minutes to make! 
 *
 * The file you're in right now is the JavaScript file. JavaScript is often 
 * responsible for more dynamic elements of a web page, like submitting a form
 * or interactive animations such as a game, which is what we're going to move
 * towards creating by the end of this tutorial. Since I've set up the
 * index.html file to automatically link to this JavaScript file, all you need
 * to do to see your saved changes in this file is reload the index.html page in
 * your browser. For example, if you change a variable or change a color from
 * "green" to "blue" in this file and save it, once you refresh the page in your
 * browser you should see the change reflected. 
 * 
 * I learned about computers by taking them apart. I got into programming by
 * using and reading the code for "bots" in the popular game RuneScape. I didn't
 * know how it worked, but I would tweak numbers and eventually tried writing my 
 * own functions. It was, in my opinion, the best way for me to lean about
 * programming. For this reason I'm a strong believer in learning by doing.
 * Don't rely solely on this text to teach you. I highly encourage you to edit
 * the code in this file and in the lessons that follow, and see the results.
 * All of these functions are running and the variables can be changed. Change 
 * things, break things, and try writing your own code, even if it's just a 
 * simple addition to something I've already written here. Get familiar with the
 * undo button. You can always re-download this file if you break it beyond
 * repair.
 */

/**
 * Since we're in a comment, lets talk about them first. Every line of this file
 * will be processed and executed by your computer from top to bottom (with a
 * few exceptions). Even this big block of text you've been reading gets
 * processed, but since it's surrounded by the slash and asterisks you see the
 * computer knows not to try to execute these lines. Comments are useful for
 * lots of reasons, from helping you understand what a block of code does to
 * communicating to other developers such as yourself. There is no such thing as
 * "self-documenting" code, no matter how good it is...Louis.
 */

// You can start a single-line comment with two slashes (//) too, which is more
// common

// Just as in math we might want to define a variable like "a = 10", we do the
// same when programming like this:
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
 * That's the end of lesson1! Initially I wrote lessons 1-5 all at once in the
 * same file, but that proved to be quite the workload. So take a break if you'd
 * like, or better yet try to write your own code, or see what happens when it
 * breaks. At a minimum make sure you understand how to see changes when you
 * make a change in this code. Change any one of the variables or logs above,
 * perhaps change my name to your own, and then make sure you see the reflected
 * change in the console log. If you need help opening the console follow the
 * instructions provided on the index.html page. And if you need any help
 * getting started please don't hesitate to ask.
 * 
 * In the next lessons we're going to tackle a little bit more difficult a 
 * concept: functions. You'll have much more to practice there. To get started
 * open lesson2's index.html in your browser and main.js in the editor you're
 * currently using. See you over there!
 */
