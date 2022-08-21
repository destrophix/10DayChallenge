const endTime = "31 Aug 2022";

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");

function countdown() {
  let endDate = new Date(endTime);
  let currDate = new Date();

  let seconds = (endDate - currDate) / 1000;

  let days = Math.floor(seconds / 3600 / 24);
  let hours = Math.floor((seconds / 3600) % 24);
  let mins = Math.floor((seconds / 60) % 60);
  seconds = Math.floor(seconds % 60);

  daysEl.innerHTML = format(days);
  hoursEl.innerHTML = format(hours);
  minsEl.innerHTML = format(mins);
  secondsEl.innerHTML = format(seconds);
}

function format(time){
    return time < 10 ? `0${time}`: time;
}

countdown();

setInterval(countdown, 1000);
