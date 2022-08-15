function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]')
// console.log(startBtn)

const stopBtn = document.querySelector('[data-stop]')
// console.log(stopBtn)

const body = document.querySelector('body')
let timerId = null;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    body.style.backgroundColor = `${ getRandomHexColor() }`;
    // console.log('color change')
    return
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  // console.log('color change stopped')

  startBtn.disabled = false;
  stopBtn.disabled = true;
})



