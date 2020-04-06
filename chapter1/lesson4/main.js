/**
 * LESSON 4 - Arrays, Objects
 * @author Josh@Gibbs.tk
 *
 * Welcome to data structures! (wow, juts typing that gave me chills. That was
 * not my favorite class.) In lesson 4 we're going to cover two ways to organize
 * collections of data: arrays and objects.
 * Make sure you have index.html open in your browser and we'll get started.
 */ 

/**
 * An array is a data structure (a way data is organized) where some number
 * (sometimes an undefined number) of variables are are held in a sort of 
 * "collection" and referenced by their position. Imagine we're putting the top
 * row of letters on your keyboard in an array. We would define that array like
 * this:
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
  name: 'Josh',
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
 * Okay class, (*class starts putting books away*) that's it for today. Your
 * homework assignment is to create an array of objects. Each object must
 * contain at least one property assigned a random value. Use a loop to find the
 * average of those numbers For example, I may have an array of users that have
 * an age property, your goal is to find the average user's age. It's difficult
 * but I think you can do it! And if not, don't worry. Try something you might
 * feel more comfortable with, maybe just finding the sum of numbers in an
 * array, or copying an object. The good news is you've learned most all of the
 * tools I was going to teach you, the bad news is in lesson 5 we'll be teaching
 * our first programming concept. But don't let that scare you! That's the only
 * thing we'll be doing in lesson 5. See you there!
 */
