const DELAY = 1000;
let timeoutId = null;
const refs = {
  startBt: document.querySelector('[data-start]'),
  stopBt: document.querySelector('[data-stop]'),
};

refs.startBt.addEventListener('click', onStartBtnClick);
refs.stopBt.addEventListener('click', onStopBtnClick);
disabledStopBtn();

function onStartBtnClick() {
  refs.startBt.setAttribute('disabled', true);

  activeStopBtn();

  timeoutId = setInterval(() => {
    let randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, DELAY);
}

function onStopBtnClick() {
  refs.startBt.removeAttribute('disabled');
  disabledStopBtn();
  clearInterval(timeoutId);
}

function disabledStopBtn() {
  refs.stopBt.setAttribute('disabled', true);
}
function activeStopBtn() {
  refs.stopBt.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
