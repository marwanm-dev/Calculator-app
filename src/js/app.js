//? Variables
// -outputs
const output = document.querySelector('.output');
const liveResult = output.querySelector('h3');
const result = output.querySelector('h1');

// -inputs
const input = document.querySelector('.input');
const buttons = input.querySelectorAll('button.btn');
const operatorButtons = input.querySelectorAll('.operator-button');
const decimalButton = input.querySelector('.decimal-button');

//? Flags
let [isAfterReset, operatorPressed, decimalPressed] = [false];

//? Functions
const resetInputs = () => {
  result.textContent = 0;
  liveResult.textContent = 0;
  isAfterReset = true;
};
//! const PointerEventsDecimal = state => eval(`decimalButton.classList.${state}('disabled')`);
//! const pointerEventsOperator = state =>{
//!   eval(`operatorButtons.forEach(button => button.classList.${state}('disabled'))`)}
const displayNum = (value, operator = false, decimal = false) => {
  let resultValue = value;
  if (operator) {
    //! pointerEventsOperator('add');
    operatorPressed = true;
    resultValue = ` ${value} `;
    result.textContent = 0;
  } else {
    //! pointerEventsOperator('remove');
    operatorPressed = false;
  }
  if (decimal) {
    //! PointerEventsDecimal('add');
    decimalPressed = true;
  }
  if (isAfterReset) {
    liveResult.textContent = resultValue;
    isAfterReset = false;
  } else {
    liveResult.textContent += resultValue;
  }
  if (eval(value) !== undefined) displayResult(liveResult.textContent);
};
const displayResult = value => {
  result.textContent = eval(value);
};
const deleteNum = () => {
  let sliceChars = -1;
  const lastChar = liveResult.textContent.slice(-1);
  if (lastChar === ' ') sliceChars = -3;
  if (liveResult.textContent.length > 1)
    liveResult.textContent = liveResult.textContent.slice(0, sliceChars);
  else {
    resetInputs();
  }
  displayResult(liveResult.textContent);
};

// ? EventListeners
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('basic-button')) {
      //* for basic buttons
      let decimalCondition = button.classList.contains('decimal-button') ? true : false;
      if (decimalCondition) {
        displayNum(button.dataset.value, false, true);
      } else {
        displayNum(button.dataset.value);
      }
    }
    if (button.classList.contains('operator-button')) {
      //* for operator buttons
      decimalPressed = false;
      //! PointerEventsDecimal('remove');

      if (operatorPressed === false) {
        displayNum(button.dataset.value, true);
      }
      operatorPressed = true;
    }
    if (button.classList.contains('special-button')) {
      //* for special buttons
      if (button.classList.contains('delete-button')) {
        deleteNum();
      }
      if (button.classList.contains('reset-button')) {
        decimalPressed = false;
        //! PointerEventsDecimal('remove');
        resetInputs();
      }
    }
    if (button.classList.contains('equal-button')) {
      //* for equal button
      decimalPressed = false;
      //! PointerEventsDecimal('remove');
      liveResult.textContent = result.textContent;
    }
  });
});

resetInputs();
