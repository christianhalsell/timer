const wrapper = document.getElementById('wrapper');
const time = document.getElementById('time');
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

function checkSavedTime() {
    let saveTime = localStorage.getItem('time');
    saveTime = saveTime ? JSON.parse(saveTime) : {};

    let savedMinutes = saveTime.minutes;
    let savedSeconds = saveTime.seconds;
    let savedWarningMinutes = saveTime.minutesWarning;
    let savedWarningSeconds = saveTime.secondsWarning;

    displayTotalMinutes.value = savedMinutes ? savedMinutes : null;
    displayTotalSeconds.value = savedSeconds ? savedSeconds : null;
    displayWarningMinutes.value = savedWarningMinutes ? savedWarningMinutes : null;
    displayWarningSeconds.value = savedWarningSeconds ? savedWarningSeconds : null;
}

function submitTime() {
    minutes = parseInt(displayTotalMinutes.value || 0);
    seconds = parseInt(displayTotalSeconds.value || 0);
    minutesWarning = parseInt(displayWarningMinutes.value || 0);
    secondsWarning = parseInt(displayWarningSeconds.value || 0);
};

function displayTime() {
    let displaySeconds = ('0' + seconds).slice(-2);
    let displayMinutes = minutes;

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
        pauseBtn.classList.add('hide');
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

    if (isNaN(minutes) || isNaN(seconds) || isNaN(minutesWarning) || isNaN(secondsWarning)) {
        alert('You must enter numbers for time, silly!');
    } else {
        let newTime = {
            'minutes': minutes,
            'seconds': seconds,
            'minutesWarning': minutesWarning,
            'secondsWarning': secondsWarning
        }

        localStorage.setItem('time', JSON.stringify(newTime));

        time.classList.remove('hide');
        displayTime();
        modal.classList.add('hide');
    }
})
pauseBtn.addEventListener('click', pauseCheck);
checkSavedTime();
setInterval(countdown, 1000);