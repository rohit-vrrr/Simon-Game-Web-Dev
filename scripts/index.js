var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["yellow", "blue", "red", "green"];

// Detecting button click
$(".btn").click(function() {
  // retreiving button id to know which color user clicked
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);

  // play sound
  playSound(userChosenColor);
});

// Generating random number 0-3
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // button flash
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  // play sound
  playSound(randomChosenColor);
}

function playSound(colorName) {
  var audio = new Audio("sounds/" + colorName + ".mp3");
  audio.play();
}
