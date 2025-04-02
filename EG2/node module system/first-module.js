function add(a, b) {
    return a + b
};

function subtract(a, b) {
    return a - b
};

function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero not allowed')
    }
};

module.exports = {
    add,
    subtract,
    divide
};
