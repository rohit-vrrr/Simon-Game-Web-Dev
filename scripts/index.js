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
  }
}
