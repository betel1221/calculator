document.addEventListener("DOMContentLoaded", () => {
  const valueDisplay = document.querySelector(".value");
  let currentValue = "0";
  let previousValue = null;
  let operator = null;

  function updateDisplay() {
    valueDisplay.textContent = currentValue;
  }

  function calculate() {
    if (previousValue === null || operator === null) return;
    const a = parseFloat(previousValue);
    const b = parseFloat(currentValue);
    switch (operator) {
      case "+": currentValue = (a + b).toString(); break;
      case "−": currentValue = (a - b).toString(); break;
      case "×": currentValue = (a * b).toString(); break;
      case "÷": currentValue = b !== 0 ? (a / b).toString() : "Error"; break;
    }
    operator = null;
    previousValue = null;
  }

  function playClick() {
    const clickSound = new Audio("./sounds/click.mp3");
    clickSound.currentTime = 0;
    clickSound.play();
  }

  document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("click", () => {
      playClick();
      const classList = button.classList;
      const text = button.textContent.trim();

      if (classList.contains("ac")) {
        currentValue = "0";
        previousValue = null;
        operator = null;
      } else if (classList.contains("pm")) {
        currentValue = (parseFloat(currentValue) * -1).toString();
      } else if (classList.contains("percent")) {
        currentValue = (parseFloat(currentValue) / 100).toString();
      } else if (classList.contains("decimal")) {
        if (!currentValue.includes(".")) currentValue += ".";
      } else if (classList.contains("equal")) {
        calculate();
      } else if (classList.contains("operator")) {
        handleOperator(text);
      } else {
        handleNumber(text);
      }
      updateDisplay();
    });
  });

  function handleNumber(num) {
    if (currentValue === "0" || currentValue === "Error") {
      currentValue = num;
    } else {
      currentValue += num;
    }
  }

  function handleOperator(op) {
    if (operator && previousValue !== null) {
      calculate();
    }
    operator = op;
    previousValue = currentValue;
    currentValue = "0";
  }

  function updateClock() {
    const hour = document.querySelector(".hour");
    const minute = document.querySelector(".minute");
    const now = new Date();
    hour.textContent = now.getHours().toString().padStart(2, "0");
    minute.textContent = now.getMinutes().toString().padStart(2, "0");
  }

  setInterval(updateClock, 1000);
  updateClock();
});
