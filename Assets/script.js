var quiz = [
    {
        question : "What does CSS stand for?",
        options : ['Cascading Script Style','Cascading Style Sheets', 'Computer Style Sheets','Creative Styling Solutions',],
        answer : 'Cascading Style Sheets'
    },
    {
        question : "How is CSS typically used in web development?",
        options : ['To define the structure and content of a web page','To add interactivity and functionality to a web page', 'To describe the presentation and style of a web page','To manage server-side operations of a web page',],
        answer : 'To describe the presentation and style of a web page'
    },
    {
        question : "Which HTML attribute is used to apply CSS styles directly to an HTML element?",
        options : ['style','css', 'class','id',],
        answer : 'style'
    },
    {
        question : "Which CSS property is used to control the size and layout of boxes in CSS?",
        options : ['color','font-family', 'width','background-color',],
        answer : 'width'
    },
    {
        question : "What is the correct CSS syntax to select an element with a specific class?",
        options : ['.class','#class', '.class-name','class:',],
        answer : '.class'
    }

];
var questionElement= document.getElementById('question');
var optionsElement = document.getElementById('options');
var nextbutton = document.getElementById('next-btn');


var currentQuestionIndex = 0;
var score = 0;
// Function to display the current question
function displayQuestion() {
    currentQuestionIndex = 0
    score = 0;
    nextbutton.innerHTML= "Next"; 
    showQuestion()
}
function showQuestion() {
    resetState();
    var currentQuestion = quiz[currentQuestionIndex];
    var questionnum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionnum + ". " + currentQuestion.question;

    currentQuestion.options.forEach(option=>{
        var button = document.createElement('button');
        button.innerHTML = option;
        button.classList.add('btn')
        optionsElement.appendChild(button);

        if(option.correct){
            button.dataset.correct = answer.correct;
        }
//  an event listener
        button.addEventListener("click", selectAnswer)
    });
}
//  Removes  answers 
function resetState() {
    nextbutton.style.display = "none"
    while(optionsElement.firstChild){ 
    optionsElement.removeChild(optionsElement.firstChild)
};

};
// display for answers
function selectAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "answer";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score ++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(optionsElement.children).forEach(button=>{
        if(options.dataset.correct ==="answer"){
            button.classList.add('correct');
        }
        button.disabled = "answer";
    });
    nextbutton.style.display = "block";
}

function showscore() {
    resetState();
    questionElement.innerHTML = `Your score: ${score}/${quiz.length}!`;
    nextbutton.innerHTML = "Play again";
    nextbutton.style.display = "block"

}

function handleNextButton(){
    currentQuestionIndex ++;
    if(currentQuestionIndex < quiz.length){
        showQuestion();
    }else{
        showscore();
    }
}

nextbutton.addEventListener("click", ()=>{
    if(currentQuestionIndex < quiz.length){
        handleNextButton();
    }else{
        displayQuestion();
    }
})

displayQuestion();