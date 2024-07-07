export function buttonAC($input) {
    $input.value = '0';
};

export function buttonDelete($input) {
    if ($input.value.length > 1) {
        $input.value = $input.value.slice(0, $input.value.length - 1)
    } else {
        $input.value = '0';
    };
};

export function buttonRoundBrackets($input) {
    $input.value = `(${$input.value})`;
};

export function buttonDot(value, $input) {
    $input.value += value;
};

export function buttonOperator(value, dictionaryOperators, $input) {
    let lastInputValue = $input.value.charAt($input.value.length - 1);

    if (lastInputValue != value) {
        $input.value += value;
    };

    if (dictionaryOperators.includes(lastInputValue) && lastInputValue != value) {
        $input.value = $input.value.slice(0, $input.value.length - 2)
        $input.value += value;
    };
};

export function buttonOperand(value, $input) {
    $input.value += value;
};