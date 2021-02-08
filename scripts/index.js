/* ---Project Flow --
-- Initially waiting for user to key press when "keydown" happens,
the value of "gameStarted" is set to "true" and "nextSequence" function
is called.
-- Within the "nextSequence" function, the "userPattern" is set to an
empty array. The "level" is incremented and a random pattern is generated
and pushed into the "gamePattern" array. A button flash and a sound is added.
**Waiting for user input**
-- When the user clicks a button, the color of that button is identified using
the attributes and that chosen color is pushed into the "userPattern" array.
A button animation and sound effect is added when user clicks.
The "checkAnswer" function is called in order to compare the two arrays,
i.e "userpattern" and "gamePattern".
-- Within "checkAnswer" function, the index element of the arrays are
compared to see if they both are same for each user click depending on the
"currentLevel" value as the index value. Then a 'if' condition checks
the length of the two arrays, if equal then call "nextSequence" function
to proceed to next level.
If the "userPattern" dosen't match "gamePattern", then a wrong sound is played,
red scrren animation is played and gameOver text is displayed in place
of "h1". Then, "startOver" function is called to restart the game.
-- In "startOver" function, the values of gameStarted, level and gamePattern
are reset.
*/

var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

var buttonColors = ["yellow", "blue", "red", "green"];


/* Detecting any key press */
$(document).on("keydown", function(event) {
  if(!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

/* Generating random number 0-3 */
function nextSequence() {
  userClickedPattern = [];
  // incrementing level everytime nextSequence gets called
  level += 1;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // button flash
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // play sound
  playSound(randomChosenColor);
}

/* Detecting button click */
$(".btn").click(function() {
  // retreiving button id to know which color user clicked
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);

  // play sound
  playSound(userChosenColor);
  // animation
  animatePress(userChosenColor);
  // passing index of last answer
  checkAnswer(userClickedPattern.length - 1);
});

/* Checking the answer */
function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    // checking if game and user array lengths are equal
    if(gamePattern.length === userClickedPattern.length) {
      // calling nextSequence()
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("Wrong");
    // play sound
    playSound("wrong");
    // red bg
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over! Press any key to Restart");
    }, 200);
    // calling restart function
    startOver();
  }
}

/* Restarting the game */
function startOver() {
  gameStarted = false;
  level = 0;
  gamePattern = [];
}

/* Playing sound */
function playSound(colorName) {
  var audio = new Audio("sounds/" + colorName + ".mp3");
  audio.play();
}

/* Adding class "pressed" and removing(100ms delay) for animation */
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
