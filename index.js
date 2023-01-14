var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// we start the game by clicking any key on the keyboard
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  // we store the button's id inside the chosen colour variable
  var userChosenColour = $(this).attr("id");

  // we add it to the user clicked-pattern array
  userClickedPattern.push(userChosenColour);
  
  // calling the function that will play the relative sound
  playSound(userChosenColour);
  // as well as the animating function
  animatePress(userChosenColour);

  // checking the answer (-1 bcz arrays start from 0)
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    // checking whether the game pattern and user clicks match
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      // and whether the arrays have both the same length
      if (userClickedPattern.length === gamePattern.length){
        // if true we continue the game
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      // game-over alert
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      // restarting the game
      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  // generating a random number 0-3
  var randomNumber = Math.floor(Math.random() * 4);

  // getting a random colour inside the colours array using the random number as index
  var randomChosenColour = buttonColours[randomNumber];

  // we add the random chosen colour to the pattern-game array
  gamePattern.push(randomChosenColour);

  // animating the colour's button
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  // playing its own sound
  playSound(randomChosenColour);
}

//  pressed animation-function
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// sound function
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// restarting the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
