var quiz = [
    {
        question: "What does CSS stand for?",
        options: [
            "a) Cascading Script Style",
            "b) Cascading Style Sheets",
            "c) Computer Style Sheets",
            "d) Creative Styling Solutions"
        ],
        Answer: "b) Cascading Style Sheets"
    },
    {
        question: "How is CSS typically used in web development?",
        options: [
            "a) To define the structure and content of a web page",
            "b) To add interactivity and functionality to a web page",
            "c) To describe the presentation and style of a web page",
            "d) To manage server-side operations of a web page"
        ],
        Answer: "c) To describe the presentation and style of a web page"
    },
    {
        question: "Which HTML attribute is used to apply CSS styles directly to an HTML element?",
        options: [
            "a) style",
            "b) css",
            "c) class",
            "d) id"
        ],
        Answer: "a) style"
    },
    {
        question: "Which CSS property is used to control the size and layout of boxes in CSS?",
        options: [
            "a) color",
            "b) font-family",
            "c) width",
            "d) background-color"
        ],
        Answer: "c) width"
    },
    {
        question: "What is the correct CSS syntax to select an element with a specific class?",
        options: [
            "a) .class",
            "b) #class",
            "c) .class-name",
            "d) class:"
        ],
        Answer: "a) .class"
    }
];

var startButton = document.getElementById("button");
var timerDisplay = document.getElementById("timer");
var questionElement = document.getElementById("question");
var optionsElement = document.getElementById("options");
var nextButton = document.getElementById("next-btn");
var submitButton = document.getElementById("submit");
var currentQuestionIndex = 0;
var score = 0;
var timer;
var timeLeft = 60;

// Function to display the current question
function displayQuestion() {
    var currentQuestion = quiz[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(option => {
        var button = document.createElement("button");
        button.textContent = option;
        button.classList.add("btn");

        if (option === currentQuestion.Answer) {
            button.dataset.correct = true;
        }

        button.addEventListener("click", handleAnswer);
        optionsElement.appendChild(button);
    });
}

// Function to handle user's answer
function handleAnswer(event) {
    var selectedOption = event.target.textContent;
    var currentQuestion = quiz[currentQuestionIndex];

    if (selectedOption === currentQuestion.Answer) {
        score++;
    } else {
        timeLeft -= 10; // Subtract 10 seconds for incorrect answer
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quiz.length) {
        displayQuestion();
    } else {
        endGame();
    }

    Array.from(optionsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Disable the buttons after an option is selected
    });

    nextButton.style.display = "block";
}

// Function to display the final score
function endGame() {
    clearInterval(timer);
    timerDisplay.textContent = "Game Over";
    questionElement.textContent = "Your score: " + score;
    optionsElement.innerHTML = "";

    var initialsInput = document.getElementById("initials-input");
    var submitButton = document.getElementById("submit-btn");
    initialsInput.style.display = "block";
    submitButton.style.display = "block";
}

// Function to update the timer
function updateTimer() {
    timerDisplay.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
        endGame();
    } else {
        timeLeft--;
    }
}

// Event listener for the start button
startButton.addEventListener("click", function () {
    timer = setInterval(updateTimer, 1000); // Start the timer
    startButton.style.display = "none"; // Hide the start button
    displayQuestion();
});

// Event listener for the next button
nextButton.addEventListener("click", function () {
    currentQuestionIndex++;
    displayQuestion();
});

// Event listener for the submit button
submitButton.addEventListener("click", function () {
    var initialsInput = document.getElementById("initials");
    var initials = initialsInput.value;
    // Save initials and score
    displayInitialsElement.textContent = initials;
});

// Display the first question
displayQuestion();