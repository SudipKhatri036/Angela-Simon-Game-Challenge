const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let isStarted = false;

$(document).on("keypress", function () {
  if (!isStarted) {
    $("#level-text").text("Level " + level);
    randomSequence();
    isStarted = true;
  }
});

$(".btn").on("click", function () {
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function randomSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  let randomIndex = Math.floor(Math.random() * buttonColors.length);
  let randomItem = buttonColors[randomIndex];
  gamePattern.push(randomItem);
  $("#" + randomItem)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomItem);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        randomSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    resetGame();
  }
}

function playSound(choosenColor) {
  let audio = new Audio(`/sounds/${choosenColor}.mp3`);
  audio.play();
}

function animatePress(choosenColor) {
  $(`#${choosenColor}`).addClass("pressed");

  setTimeout(function () {
    $(`#${choosenColor}`).removeClass("pressed");
  }, 300);
}

function resetGame() {
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  isStarted = false;
}
