

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".reponse-indicateur");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//pose les question dans availableQuestions 
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for (let i=0 ; i<totalQuestion ; i++){
        availableQuestions.push(quiz[i]);
    }
}
//Mettre les numéros des questions et les option
function getNewQuestion(){
    //Mettre des numéros aux questions
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " sur " + quiz.length;

    //Poser les questions
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //Prendre la position de questionIndex avec availableQuestions
    const index1 = availableQuestions.indexOf(questionIndex);
    //Effacer le questionIndex avec availableQuestions, pour que les questions ne se répètent pas
    availableQuestions.splice(index1,1);
    // les options de réponses
    //prendre le nombre d'option
    const optionLen = currentQuestion.options.length;
    // Mettre les options dans availableQuestions
    for (let i=0 ; i<optionLen ; i++){
        availableOptions.push(i);
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.2;
    //Créer des options 
    for (let i=0 ; i<optionLen ; i++){
        //random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //Prendre la position de optionIndex depuis availableoptions
        const index2 = availableOptions.indexOf(optonIndex);
        //Effacer les optionIndex depuis availableoptions
        availableOptions.splice(index2,1); 
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
    }
    questionCounter++
}

//Prendre le résultat
function getResult(element){
    const id = element.id;
    //Conparer les id pour avoir la reponse
    if (id == currentQuestion.reponse){
        //Mettre la reponse correct en vert
        element.classList.add("correct");
        //Indicateur de reponse correct
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else {
        //Mettre la reponse incorrect en rouge
        element.classList.add("incorrect"); 
        //Indicateur de reponse incorrect
        updateAnswerIndicator("incorrect");
        //Si la reponse est incorrect on montre la vraie reponse en vert
        const optionLen = optionContainer.children.length;
        for(let i=0 ; i<optionLen ; i++){
            if (parseInt(optionContainer.children[i].id)== currentQuestion.reponse){
                optionContainer.children[i].classList.add("correct");
            } 
        }  
    }
    attempt++;
    unclickableOption();
}
//Rendre inclickable les autres options
function unclickableOption(){
    const optionLen = optionContainer.children.length;
    for(let i=0 ; i<optionLen ; i++){
        optionContainer.children[i].classList.add("deja-choisi");
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for (let i=0 ; i<totalQuestion ; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}


function next(){
    if (questionCounter == quiz.length){
        quizOver();
    }
    else {
        getNewQuestion();
    }
}

function quizOver(){
    //Cacher le custom box
    quizBox.classList.add("hide");
    //Montrer le resultBox
    resultBox.classList.remove("hide");
    quizResult();
}
//Complèter le quizResult
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML= attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt-correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed() + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers +" / "+quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function reessayer(){
    //Cacher le resultBox
    resultBox.classList.add("hide");
    //Montrer le quizbox
    quizBox.classList.remove("hide");
    resetQuiz();
    commencer();
}

function menu(){
    //Cacher resultBox
    resultBox.classList.add("hide");
    //Montrer homebox
    homeBox.classList.remove("hide");
    resetQuiz();
}

//### POINT DE DEPART ###

function commencer(){

    //Cacher le homeBox
    homeBox.classList.add("hide");
    //Montrer le quizBox
    quizBox.classList.remove("hide");

    //Nous allons d'abord mettre tous les questions dans availableQuestions
    setAvailableQuestions();
    //Puis nous allons appeler la fonction getNewQuestion
    getNewQuestion();
    //Créer une indicateur de réponse
    answersIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}