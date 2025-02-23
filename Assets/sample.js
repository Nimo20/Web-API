const startButton = document.getElementById("button");
const timerElement = document.querySelector(".timer");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit");
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;


const quiz = [
    {
        question: "What does HTML stand for?",
        options: [
            "a) Hyper Text Markup Language",
            "b) High-Level Text Machine Learning",
            "c) Hyperlink and Text Management Language",
            "d) Home Tool Markup Language"
        ],
        answer: "a) Hyper Text Markup Language"
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: [
            "a) <link>",
            "b) <a>",
            "c) <href>",
            "d) <hyper>"
        ],
        answer: "b) <a>"
    },
    {
        question: "Which property is used to change the text color in CSS?",
        options: [
            "a) background-color",
            "b) text-style",
            "c) color",
            "d) font-color"
        ],
        answer: "c) color"
    },
    {
        question: "What is the default position value of an HTML element in CSS?",
        options: [
            "a) fixed",
            "b) absolute",
            "c) relative",
            "d) static"
        ],
        answer: "d) static"
    },
    {
        question: "Which JavaScript keyword is used to declare a constant variable?",
        options: [
            "a) let",
            "b) const",
            "c) var",
            "d) static"
        ],
        answer: "b) const"
    },
    {
        question: "Which function is used to print something to the console in JavaScript?",
        options: [
            "a) print()",
            "b) console.print()",
            "c) console.log()",
            "d) log.console()"
        ],
        answer: "c) console.log()"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "a) // for single-line, /* */ for multi-line",
            "b) <!-- -->",
            "c) #",
            "d) **"
        ],
        answer: "a) // for single-line, /* */ for multi-line"
    },
    {
        question: "Which CSS unit is relative to the font size of the root element?",
        options: [
            "a) em",
            "b) px",
            "c) rem",
            "d) %"
        ],
        answer: "c) rem"
    },
    {
        question: "Which HTML tag is used to define a table row?",
        options: [
            "a) <table>",
            "b) <td>",
            "c) <tr>",
            "d) <th>"
        ],
        answer: "c) <tr>"
    },
    {
        question: "What does the 'this' keyword refer to in JavaScript?",
        options: [
            "a) The global object",
            "b) The current function",
            "c) The object that calls the function",
            "d) The previous function"
        ],
        answer: "c) The object that calls the function"
    },
    {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        options: [
            "a) shift()",
            "b) pop()",
            "c) remove()",
            "d) splice()"
        ],
        answer: "b) pop()"
    },
    {
        question: "Which HTML element is used to embed JavaScript code?",
        options: [
            "a) <script>",
            "b) <js>",
            "c) <javascript>",
            "d) <code>"
        ],
        answer: "a) <script>"
    },
    {
        question: "What is the correct way to link an external CSS file to an HTML document?",
        options: [
            "a) <link href='styles.css' rel='stylesheet'>",
            "b) <css>styles.css</css>",
            "c) <style>styles.css</style>",
            "d) <stylesheet>styles.css</stylesheet>"
        ],
        answer: "a) <link href='styles.css' rel='stylesheet'>"
    },
    {
        question: "Which JavaScript array method adds an element to the end of an array?",
        options: [
            "a) push()",
            "b) unshift()",
            "c) append()",
            "d) insert()"
        ],
        answer: "a) push()"
    },
    {
        question: "Which CSS property is used to make text bold?",
        options: [
            "a) font-style",
            "b) font-weight",
            "c) text-decoration",
            "d) font-bold"
        ],
        answer: "b) font-weight"
    },
    {
        question: "Which event is triggered when a user clicks on an HTML element?",
        options: [
            "a) onchange",
            "b) onhover",
            "c) onclick",
            "d) onpress"
        ],
        answer: "c) onclick"
    },
    {
        question: "How do you declare a function in JavaScript?",
        options: [
            "a) function myFunction() {}",
            "b) def myFunction() {}",
            "c) create myFunction() {}",
            "d) new function myFunction() {}"
        ],
        answer: "a) function myFunction() {}"
    },
    {
        question: "Which CSS property controls the space between elements?",
        options: [
            "a) spacing",
            "b) margin",
            "c) padding",
            "d) border-spacing"
        ],
        answer: "b) margin"
    },
    {
        question: "Which tag is used to define a list item in HTML?",
        options: [
            "a) <li>",
            "b) <ul>",
            "c) <ol>",
            "d) <list>"
        ],
        answer: "a) <li>"
    },
    {
        question: "Which method is used to combine two arrays in JavaScript?",
        options: [
            "a) join()",
            "b) concat()",
            "c) merge()",
            "d) combine()"
        ],
        answer: "b) concat()"
    }
];


function startInterview() {
    startButton.style.display = "none"
    nextButton.style.display = "inline-block"
    submitButton.style.display = "inline-block";

    document.querySelector("h1").style.display = "none";
    document.querySelector("p").style.display = "none";

    questionElement.style.display = "block";
    optionsElement.style.display = "block";

    startTimer();
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    optionsElement.style.display = "block";
    const currentQuestion = quiz[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(option => {

        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("options-btn");

        button.addEventListener("click", () => selectAnswer(option, currentQuestion.answer));
        optionsElement.appendChild(button);
    })
    nextButton.style.display = "none";
}

function selectAnswer(selectedOption, correctAnswer) {
    const optionButtons = document.querySelectorAll(".options-btn");
    optionButtons.forEach(button => {
        button.disabled = true;
        if (button.innerText === correctAnswer) {
            button.style.backgroundColor = "green";
        } else if (button.innerText === selectedOption) {
            button.style.backgroundColor = "red";
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
    }

    nextButton.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    questionElement.innerText = `Quiz Complete! Your score is ${score} out of ${quiz.length}`;
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
    submitButton.style.display = "none";

    document.querySelector("#footer").style.display = "flex";



}

startButton.addEventListener("click", startInterview);
nextButton.addEventListener("click", nextQuestion);

submitButton.addEventListener("click", () => {
    const initials = document.getElementById("initials-input").value.trim();
    console.log("Initials entered:", initials);
    if (initials) {
        localStorage.setItem("userInitials", initials);
        localStorage.setItem("userScore", score);
        alert(`Thanks for playing! Your initials: ${initials}, Score: ${score}`);
    } else {
        alert("Please enter your initials!");
    }
});