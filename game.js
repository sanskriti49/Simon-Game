var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

function applyMediaQueryStyles() {
  if (query1.matches) {   //for laptops
    if (!started) {
      $("#level-title").text("Press A Key to Start");
    }
  } 
  else if (query2.matches || query3.matches) {  //for tablets
    if (!started) {
      $("#level-title").text("Click Anywhere To Start");
      $(document).off("touchstart").on("touchstart",function() {
        if (!started) {
          $("#level-title").text("Level " + level);
          nextSequence();
          started = true;
        }
      });
    }
  } 
}
var query1 = window.matchMedia("(min-width: 768px) and (max-width: 1280px)");
var query2 = window.matchMedia("(max-width: 768px)");
var query3 = window.matchMedia("(max-width: 500px)");

applyMediaQueryStyles();

query1.addEventListener("change",applyMediaQueryStyles);
query2.addEventListener("change",applyMediaQueryStyles);
query3.addEventListener("change",applyMediaQueryStyles);


$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

//would work for all screen sizes
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
      }
    } 
    else {
      console.log("wrong");
      playSound("wrong");

      $('body').addClass("game-over");
      setTimeout(function(){
        $('body').removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }

}


function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColor) {
      $("#" + currentColor).addClass("pressed");
      setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}
