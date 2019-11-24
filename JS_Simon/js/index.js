let order = [];
let playerOrder = [];
let flash;
let turn;
let click;
let good;
let compTurn;
let intervalId;
let noise = true;

const turnCounter = document.querySelector("#turn");
const clickCounter = document.querySelector("#click");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const indicator = document.querySelector("#indicator");
const dox = document.querySelector("#do");
const re = document.querySelector("#re");
const mi = document.querySelector("#mi");
const fa = document.querySelector("#fa");

turnCounter.innerHTML = "0";
clickCounter.innerHTML = "0";

startButton.addEventListener('click', (event) => {
    play();
});

resetButton.addEventListener('click', (event) => {
  flashColor();
  turnCounter.innerHTML = "RESET";
  clickCounter.innerHTML = "RESET";
  setTimeout(() => {
    turnCounter.innerHTML = turn;
    clickCounter.innerHTML = click;
    clearColor();
    play();
  }, 800);
});

function play() {
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  click = 0;
  turnCounter.innerHTML = 1;
  clickCounter.innerHTML = 0;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
    indicator.style.color = "rgb(255, 41, 162)";
  }

  if (compTurn) {
    clearColor();
    indicator.style.color = "rgba(255, 41, 162, 0.100)";
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
  dox.style.color = "white";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
  re.style.color = "white";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
  mi.style.color = "white";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
  fa.style.color = "white";
}

function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
  dox.style.color = "transparent";
  re.style.color = "transparent";
  mi.style.color = "transparent";
  fa.style.color = "transparent";
}

function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
  dox.style.color = "white";
  re.style.color = "white";
  mi.style.color = "white";
  fa.style.color = "white";
}

topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    click++;
    check();
    one();
    clickCounter.innerHTML = click;
    if (good == true) {
        setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    click++;
    check();
    two();
    clickCounter.innerHTML = click;
    if (good == true) {
        setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    click++;
    check();
    three();
    clickCounter.innerHTML = click;
    if (good == true) {
        setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    click++;
    check();
    four();
    clickCounter.innerHTML = click;
    if (good == true) {
        setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clickCounter.innerHTML = click;
      clearColor();
      play();
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    clickCounter.innerHTML = click;
    intervalId = setInterval(gameTurn, 800);
  }

}






