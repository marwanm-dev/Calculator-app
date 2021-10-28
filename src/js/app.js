// Variables
const basicButtons = document.querySelectorAll('.basic-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const deleteButton = document.querySelector('.delete-button');
const resetButton = document.querySelector('.reset-button');
const equalButton = document.querySelector('.equal-button');
const displayScreen = document.querySelector('#result');

// Flags
let firstPhase,
  secondPhase,
  firstSection,
  secondSection,
  decimalInFirstPhase,
  decimalInSecondPhase,
  operator,
  result,
  previousAnswer;

// Functions
const clearScreen = () => {
  displayScreen.innerHTML = '';
};
const defaultSetting = () => {
  [firstSection, secondSection] = ['', ''];
  [secondPhase, decimalInFirstPhase, decimalInSecondPhase] = [false];
  firstPhase = true;

  //   firstSection = '';
  //   secondSection = '';
  //   firstPhase = true;
  //   secondPhase = false;
  //   decimalInFirstPhase = false;
  //   decimalInSecondPhase = false;
};
const displayItem = itemToDisplay => {
  clearScreen();
  const h1 = document.createElement('h1');
  h1.textContent = itemToDisplay;
  displayScreen.appendChild(h1);
  if (itemToDisplay == previousAnswer) {
    firstSection = previousAnswer;
    firstPhase = false;
    secondPhase = true;
  }
};

// EventListeners
basicButtons.forEach(basicButton => {
  defaultSetting();
  basicButton.addEventListener('click', event => {
    if (firstPhase && !secondPhase) {
      firstSection += event.currentTarget.dataset.value;
      if (basicButton.classList.contains('decimal-button')) {
        firstSection.includes('.') && decimalInFirstPhase === false
          ? (decimalInFirstPhase = true)
          : firstSection.includes('.') && decimalInFirstPhase === true
          ? (firstSection = firstSection.slice(0, -1))
          : console.log('error');
      }

      displayItem(firstSection);
    } else if (!firstPhase && secondPhase) {
      secondSection += event.currentTarget.dataset.value;
      if (basicButton.classList.contains('decimal-button')) {
        secondSection.includes('.') && decimalInSecondPhase === false
          ? (decimalInSecondPhase = true)
          : secondSection.includes('.') && decimalInSecondPhase === true
          ? (secondSection = secondSection.slice(0, -1))
          : console.log('error');
      }
      displayItem(secondSection);
    }
  });
});
operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener('click', event => {
    operator = event.currentTarget.dataset.value;
    firstPhase = false;
    secondPhase = true;
    if (displayScreen.innerHTML == '') {
      displayItem(operator);
    } else {
      previousAnswer = displayScreen.textContent;
      displayItem(operator);
      displayItem(previousAnswer);
    }
  });
});
equalButton.addEventListener('click', event => {
  try {
    result = eval(firstSection + operator + secondSection);
  } catch {
    result = 'There 1s an err0r';
  }
  if (displayScreen.innerHTML == '') {
    displayItem(result);
  } else {
    defaultSetting();
    displayItem(result);
  }
});
deleteButton.addEventListener('click', () => {
  if (firstPhase && !secondPhase) {
    firstSection = firstSection.slice(0, -1);
    displayItem(firstSection);
  } else if (!firstPhase && secondPhase) {
    secondSection = secondSection.slice(0, -1);
    displayItem(secondSection);
  }
});
resetButton.addEventListener('click', () => {
  clearScreen();
  defaultSetting();
  displayItem('Start!');
});

const allButtons = document.querySelectorAll('#input > *');
allButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    const thisButton = e.currentTarget;
    thisButton.style.filter = 'contrast(1.75)';
    setTimeout(() => {
      thisButton.style.filter = 'contrast(0.25)';
      setTimeout(() => {
        thisButton.style.filter = 'contrast(1)';
      }, 34.375);
    }, 137.5);
  });
});
