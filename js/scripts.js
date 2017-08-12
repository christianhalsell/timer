const wrapper = document.getElementById('wrapper');
const display = document.getElementById('display');
const pauseBtn = document.getElementById('pauseBtn');
const submitBtn = document.getElementById('submitTime');
const modal = document.getElementById('modal');
const displayTotalMinutes = document.getElementById('displayTotalMinutes');
const displayTotalSeconds = document.getElementById('displayTotalSeconds');
const displayWarningMinutes = document.getElementById('displayWarningMinutes');
const displayWarningSeconds = document.getElementById('displayWarningSeconds');

let paused = true;
let minutes = 0;
let seconds = 0;
let minutesWarning = 0;
let secondsWarning = 0;

function submitTime() {
    minutes = parseInt(displayTotalMinutes.value);
    seconds = parseInt(displayTotalSeconds.value);
    minutesWarning = parseInt(displayWarningMinutes.value);
    secondsWarning = parseInt(displayWarningSeconds.value);
};

function displayTime() {
    let displaySeconds = seconds;
    let displayMinutes = minutes;

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
        wrapper.className = 'red';
        console.log('time\'s up!');
    } else if (seconds <= secondsWarning && minutes <= minutesWarning) {
        wrapper.className = 'yellow';
    }
  };
};

function pauseCheck() {
    if (paused === false) {
        console.log('pausing...');
        pauseBtn.innerHTML = 'resume'
        paused = true;
    } else {
        console.log('resuming');
        pauseBtn.innerHTML = 'pause';
        paused = false;
    }
};

submitBtn.addEventListener('click', function () {
    submitTime();
    displayTime();
    modal.classList.add('hide');
})
pauseBtn.addEventListener('click', pauseCheck);

// displayTime();
setInterval(countdown, 1000);