const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let previousElement = "";
let previousColor = "";
let totalClicks = 0;
let numberOfMatches = 0;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // This is the counter
  var count = document.createElement("h3");
  count.setAttribute("id", "count");
  let clicked = event.target;
  if (totalClicks == 0) {
      totalClicks++;
      count.innerText = totalClicks;
      clicked.parentElement.append(count);
  } else if (totalClicks > 0) {
      totalClicks++;
      document.querySelector("#count").innerText = totalClicks;
  }


  // This is the game logic
  clicked.style.backgroundColor = event.srcElement.className;
  if (previousColor == "") {
      previousColor = event.srcElement.className;
      previousElement = event.target;
  } else if (previousColor != event.srcElement.className) {
    setTimeout(function() {
        clicked.style.backgroundColor = "white";
        previousColor = "";
        previousElement.style.backgroundColor = "white";
    }, 1000)
  } else if (previousColor == event.srcElement.className && previousElement != event.target) {
      previousColor = "";
      previousElement = "";
      numberOfMatches++;
      if (numberOfMatches == 1) {
        let matches = document.createElement('h3');
        matches.setAttribute('id', 'matches');
        matches.innerText = numberOfMatches;
        clicked.parentElement.append(matches);
      } else if (numberOfMatches > 1) {
        document.querySelector("#matches").innerText = numberOfMatches;
      }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
