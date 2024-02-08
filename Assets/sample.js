var quiz = [
    {
        question: " What does CSS stand for?",
        options: [" a) Cascading Script Style",
            "b) Cascading Style Sheets",
            "c) Computer Style Sheets",
            "d) Creative Styling Solutions"],
        Answer: " b) Cascading Style Sheets"
    },
    {
        question: " How is CSS typically used in web development?",
        options: ["a) To define the structure and content of a web page",
            "b) To add interactivity and functionality to a web page",
            "c) To describe the presentation and style of a web page",
            "d) To manage server - side operations of a web page"],
        Answer: " c) To describe the presentation and style of a web page."
    },
    {
        question: "Which HTML attribute is used to apply CSS styles directly to an HTML element ?",
        options: [" a) style",
            "b) css",
            "c) class",
            "d) id"],
        Answer: "a) style"
    },
    {
        question: "Which CSS property is used to control the size and layout of boxes in CSS ?",
        options: ["a) color",
            "b) font - family",
            "c) width",
            "d) background - color"],
        Answer: " c) width"
    },
    {
        question: "What is the correct CSS syntax to select an element with a specific class?",
        options: ["a) .class",
            "b) #class",
            " c) .class-name",
            "d) class:"],
        Answer: "a) .class}"
    }

];

var currentQuestion = 0;
var score = 0;

// Function to display the current question
function displayQuestion() {
    var questionElement = document.getElementById("question");
    var optionsElement = document.getElementById("options");

    questionElement.textContent = quiz[currentQuestion].question;

    optionsElement.innerHTML = "";

    quiz[currentQuestion].options.forEach(option => {
        var button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", handleAnswer);
        optionsElement.appendChild(button);
    });
}

// Function to handle user's answer
function handleAnswer(event) {
    var selectedOption = event.target.textContent;
    var correctAnswer = quiz[currentQuestion].answer;

    if (selectedOption === correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quiz.length) {
        displayQuestion();
    } else {
        displayScore();
    }
}

// Function to display the final score
function displayScore() {
    var scoreElement = document.getElementById("score");
    scoreElement.textContent = `Your score: ${score}/${quiz.length}`;
}

// Display the first question
displayQuestion();