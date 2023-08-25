let timer;
let hours;
let minutes;
let seconds;
let paused = false;

function startTimer() {
    if (paused) {
        paused = false;
        resumeTimer();
        return;
    }

    hours = parseInt(document.getElementById("hours").value);
    minutes = parseInt(document.getElementById("minutes").value);
    seconds = parseInt(document.getElementById("seconds").value);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) ||
        hours < 0 || minutes < 0 || seconds < 0) {
        alert("Please enter valid values for hours, minutes, and seconds.");
        return;
    }

    let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    if (totalSeconds <= 0) {
        alert("Please enter a valid duration.");
        return;
    }

    displayTimer(totalSeconds);

    timer = setInterval(function() {
        if (totalSeconds === 0) {
            clearInterval(timer);
            displayPopup();
            return;
        }

        if (!paused) {
            totalSeconds--;
            displayTimer(totalSeconds);
        }
    }, 1000);
}

function pauseTimer() {
    paused = true;
}

function resumeTimer() {
    paused = false;
}

function resetTimer() {
    clearInterval(timer);
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
    document.getElementById("timer").textContent = "00:00:00";
    paused = false;
}

function displayTimer(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    let timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
}

function closePopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "none";
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}
function displayPopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "flex";
    playSound();
}

function playSound() {
    let sound = document.getElementById("timerSound");
    sound.play();
}

function closePopup() {
    let popup = document.getElementById("popup");
    popup.style.display = "none";
    stopSound();
}

function stopSound() {
    let sound = document.getElementById("timerSound");
    sound.pause();
    sound.currentTime = 0;
}

