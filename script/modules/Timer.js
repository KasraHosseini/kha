function Timer(h, m, s, ms, loc) {
  ms = ms + s * 1000 + m * 60000 + h * 3600000;
  setInterval(() => {
    ms = ms - 10;
    setTimer();
  }, 10);
  function setTimer() {
    let t = [h, m, s];
    t[1] = Math.trunc(ms / 3600000);
    t[2] = Math.trunc(ms / 60000 - t[1] * 60);
    t[3] = Math.trunc(ms / 1000 - t[2] * 60 - t[1] * 3600);
    document.querySelector(loc).innerHTML = `<kbd>${lengthN(t[1])}</kbd>:<kbd>${lengthN(t[2])}</kbd>:<kbd>${lengthN(t[3])}</kbd>`;
  }
}

function dateTimer(h, m, loc) {
  setInterval(() => {
    let goalTime = h * 3600000 + m * 60000;
    let date_ = new Date();
    let now = date_.getHours() * 3600000 + date_.getMinutes() * 60000 + date_.getSeconds() * 1000;

    function setDateTimer() {
      let t = [0, 0, 0];
      t[1] = Math.trunc((goalTime - now) / 3600000);
      t[2] = Math.trunc((goalTime - now) / 60000 - t[1] * 60);
      t[3] = Math.trunc((goalTime - now) / 1000 - t[2] * 60 - t[1] * 3600);
      document.querySelector(loc).innerHTML = `<kbd>${lengthN(t[1])}</kbd>:<kbd>${lengthN(t[2])}</kbd>:<kbd>${lengthN(t[3])}</kbd>`;
    }
    setDateTimer();
  }, 1000);
}

function lengthN(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}
export {Timer, dateTimer};
