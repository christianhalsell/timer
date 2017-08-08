var display = document.getElementById('display');
var pauseBtn = document.getElementById('pauseBtn');
var paused = false;
var minutes = 0;
var seconds = 10;

function displayTime() {
    var displaySeconds = seconds;
    var displayMinutes = minutes;

    if (seconds <= 9 && seconds >= 0) {
      displaySeconds = ('0' + seconds).toString();
    }

    display.innerHTML = displayMinutes + ':' + displaySeconds;
    console.log(`${displayMinutes}:${displaySeconds}`);
}

function countdown() {
  if (!paused) {
    seconds -= 1;

    if (seconds <= -1) {
      minutes -= 1;
      seconds = 59;
    }

    displayTime();

    if (seconds === 0 && minutes === 0) {
        paused = true;
        console.log('time\s up!');
    }
  };
};

setInterval(countdown, 1000);

pauseBtn.addEventListener('click', function() {
    if (paused === false) {
        console.log('pausing...');
        pauseBtn.innerHTML = 'resume'
        paused = true;
    } else {
        console.log('resuming');
        pauseBtn.innerHTML = 'pause';
        paused = false;
    }
});