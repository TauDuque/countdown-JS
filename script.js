const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dataEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEL = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Definir data minima com o dia atual
const today = new Date().toISOString().split("T")[0]; //toISOS fornece dia e horário internacional, split divide em dois arrais data e hora e o primeiro array e selecionado
dataEl.setAttribute("min", today);

// populate countdown / complete UI
function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log(distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour); // esclarecer o uso desse sinal de percentual
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(days, hours, minutes, seconds);

    // esconde input
    inputContainer.hidden = true;

    //se a contagem acabar, mostrar div complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} terminou em ${countdownDate}`;
      completeEL.hidden = false;
    } else {
      // mostrar a contagem em progresso
      // distribuindo elementos de contagem
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEL.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

// Pega os valores do input form
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  console.log(countdownDate, countdownTitle);
  // checa datas válidas
  if (countdownDate === "") {
    alert("Por favor, insira uma data válida.");
  } else {
    // pega uma versão em números da data atual/atualiza DOM
    countdownValue = new Date(countdownDate).getTime();
    console.log(countdownValue);
    updateDom();
  }
}

// Dá um reset nos valores
function reset() {
  //esconder contagem e mostrar input
  countdownEl.hidden = true;
  completeEL.hidden = true;
  inputContainer.hidden = false;
  // parar contagem
  clearInterval(countdownActive);
  // resetar valores da contagem
  countdownTitle = "";
  countdownDate = "";
}

// Event listener
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);
