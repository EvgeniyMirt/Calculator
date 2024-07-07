import { buttonAC, buttonDelete, buttonRoundBrackets, buttonDot, buttonOperand, buttonOperator } from './buttons.js';

const $buttons = document.querySelector('.buttons').childNodes;
const $result = document.querySelector('.result');
const $output = document.querySelector('.output');
const $input = document.querySelector('.input input');


function processUserInput(e) {
  let userInput;
  const dictionaryNumbers = '0123456789';
  const dictionaryOperators = '÷*-+';

  // Получения значения
  if (e.target === $input) {
    userInput = e.key;
  } else {
    userInput = e.target.textContent;
  }

  // Предотвращаем ввод символов с клавиатуры
  if (
    dictionaryNumbers.includes(userInput) ||
    dictionaryOperators.includes(userInput) ||
    userInput === "."
  ) {
    e.preventDefault();
  } 
  
  /*
  if (
    dictionaryNumbers.includes(userInput) ||
    dictionaryOperators.includes(userInput) ||
    userInput === "." ||
    userInput === "/" ||
    userInput === "Backspace" ||
    userInput === "(" ||
    userInput === ")"
  ) {
    console.log(userInput);
  };
  */
  
  if ($input.value === '0' && dictionaryNumbers.includes(userInput)) {
    $input.value = ''; // убрать ноль
  };

  switch (userInput) {
    case "AC":
      buttonAC($input);
      break;

    case "◁":
      buttonDelete($input);
      break;

    case "()":
      buttonRoundBrackets($input);
      break;

    case ".":
      buttonDot(userInput, $input);
      break;

    default:
      break;
  };

  if (dictionaryOperators.includes(userInput)) {
    buttonOperator(userInput, dictionaryOperators, $input);
  };

  if (dictionaryNumbers.includes(userInput)) {
    buttonOperand(userInput, $input);
  };
};

function calculate() {
  let expression = fixOperator($input.value);
  let result;
  try {
    result = math.evaluate(expression);
    displayResults($result, result);
    indicateResultStatus($result, true);
  } catch (error) {
    indicateResultStatus($result, false, error.message);
  };
};

function fixOperator(value) {
  value = value.replaceAll('÷', '/');
  return value;
};

function indicateResultStatus($resultOutput, isSsuccess, error) {
  if (isSsuccess) {
    $resultOutput.style.color = 'black';
  } else {
    $resultOutput.style.color = 'grey';
    console.log(error);
  };
};

function displayResults($resultOutput, result) {
  $resultOutput.textContent = result;
};

$result.addEventListener('click', () => {
  $input.value = $result.textContent;
});

$input.addEventListener('change', () => {
  if ($input.value.length === 0) {
    $input.value = 0;
    $result.textContent = 0;
  };
});

$buttons.forEach(($button) => {
  $button.addEventListener('click', processUserInput)
  $button.addEventListener('click', calculate)
});

$input.addEventListener('keydown', processUserInput);
$input.addEventListener('keydown', calculate);

$input.addEventListener('input', calculate);