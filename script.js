// =========================
// Math Puzzle
// =========================

const boxes = document.querySelectorAll(".box");
const numbersDiv = document.getElementById("numbers");
const targetSpan = document.getElementById("target");
const message = document.getElementById("message");

const deleteBtn = document.getElementById("deleteBtn");
const checkBtn = document.getElementById("checkBtn");

let usedNumbers = [];
let selected = [];

let operators = [];
let target = 0;

// العمليات المتاحة
const allOperators = ["+", "-", "×"];

// --------------------------

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --------------------------

function generateLevel() {

    usedNumbers = [];
    selected = [];

    boxes.forEach(box => box.textContent = "");

    message.textContent = "";
    message.className = "message";

    numbersDiv.innerHTML = "";

    // اختيار 4 أرقام مختلفة
    while (usedNumbers.length < 4) {

        let n = random(1, 9);

        if (!usedNumbers.includes(n))
            usedNumbers.push(n);

    }

    // عمليات عشوائية
    operators = [];

    for (let i = 0; i < 3; i++) {

        operators.push(
            allOperators[random(0, allOperators.length - 1)]
        );

    }

    document.getElementById("op1").textContent = operators[0];
    document.getElementById("op2").textContent = operators[1];
    document.getElementById("op3").textContent = operators[2];

    target = calculate(
        usedNumbers,
        operators
    );

    targetSpan.textContent = target;

    createButtons();

}

// --------------------------

function calculate(nums, ops) {

    let expression =
        nums[0] +
        convert(ops[0]) +
        nums[1] +
        convert(ops[1]) +
        nums[2] +
        convert(ops[2]) +
        nums[3];

    return Math.round(Function("return " + expression)());

}

function convert(op) {

    if (op == "×") return "*";
    return op;

}

// --------------------------

function createButtons() {

    for (let i = 1; i <= 9; i++) {

        let btn = document.createElement("div");

        btn.className = "number";

        btn.textContent = i;

        btn.onclick = () => addNumber(btn, i);

        numbersDiv.appendChild(btn);

    }

}

// --------------------------

function addNumber(button, num) {

    if (selected.includes(num))
        return;

    if (selected.length >= 4)
        return;

    selected.push(num);

    boxes[selected.length - 1].textContent = num;

    button.classList.add("used");

}

// --------------------------

deleteBtn.onclick = () => {

    if (selected.length == 0)
        return;

    let last = selected.pop();

    boxes[selected.length].textContent = "";

    document.querySelectorAll(".number").forEach(btn => {

        if (Number(btn.textContent) == last)
            btn.classList.remove("used");

    });

};

// --------------------------

checkBtn.onclick = () => {

    if (selected.length < 4) {

        message.textContent = "أكمل جميع الخانات";

        message.className = "message error";

        return;

    }

    let result = calculate(selected, operators);

    if (result == target) {

        message.textContent = "🎉 إجابة صحيحة";

        message.className = "message success";

        setTimeout(generateLevel, 1200);

    } else {

        message.textContent = "❌ إجابة خاطئة";

        message.className = "message error";

    }

};

// --------------------------

generateLevel();
