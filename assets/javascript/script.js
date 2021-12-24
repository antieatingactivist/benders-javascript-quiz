var correct = 0;
var incorrect = 0;
var currentQuestion = 0;
var gameBoard = document.getElementById("game-board");
var questionBox = document.getElementById("question");
var startBox = document.getElementById("game-start");
var restartBox = document.getElementById("game-restart");
var correctAnswers = document.getElementById("correct-answers");
var incorrectAnswers = document.getElementById("incorrect-answers");
var timerDisplay = document.getElementById("time-clock");
var timeWarning = document.getElementById("time-warning");
var choiceA = document.getElementById(0);
var choiceB = document.getElementById(1);
var choiceC = document.getElementById(2);
var choiceD = document.getElementById(3);
var timeout; 
var timer;
var timeLeft = 300;


var questions = [{

    q: "What color is Fry's hair?",
    choices: ["Black","Yellow","Orange","He's bald"],
    correctAnswer: 2
},{
    q: "What species is Leela?",
    choices: ["Alien","Omicronian","Decopodian","Human"],
    correctAnswer: 3
},{
    q: "What planet do Lrrr and Ndnd reside when they aren't invading Earth?",
    choices: ["Urectum","Decapod 10","Omicron Persei 8","Neutral Planet"],
    correctAnswer: 2
},{
    q: "What did Fry's dad name him after?",
    choices: ["a Defunct electronics Store","a British Comedian","Fast Food","a Screwdriver"],
    correctAnswer: 3
},{
    q: "Which of these characters is not voiced by Billy West?",
    choices: ["Hermes","Fry","Professor Farnsworth","a Zap Brannigan"],
    correctAnswer: 0
},{
    q: "What is the name of the DonBot's Joe-Pesci-like henchman?",
    choices: ["Bender","Clamps","Calculon","PreacherBot"],
    correctAnswer: 1
},{
    q: "Who is the most prominent President of Earth?",
    choices: ["Mayor Poopinmeyer","Trump's left foot","Ogden Wurnstrom","Richard Nixon's Head"],
    correctAnswer: 3
},{
    q: "What is Fry's favorite somewhat addictive beverage?",
    choices: ["Mountain Dew","LöBrau","Slurm","Maltese Liquor"],
    correctAnswer: 2
},{
    q: "When Bender became God, who was his prophet?",
    choices: ["Malakai","Ezekiel","Kif","L. Ron Hubbard"],
    correctAnswer: 0   
},{
    q: "What was the problem with Popplers",
    choices: ["They were very rare","They caused illness in humans","They were Omicronian babies","They were Hallucinogenic"],
    correctAnswer: 2   
},{
    q: "Why does Mom want the last anchovies in existance?",
    choices: ["They are great on Pizza","She knows Zoidberg likes them","She wants to resurrect the species","Their existance threatens her robot oil business"],
    correctAnswer: 3   
},{
    q: "What is Elzar's spice of choice?",
    choices: ["A blast from the Spice Weasel","Dash of Paprika","CBD oil","He prefered bland food"],
    correctAnswer: 0   
}
];
function begin() {
    timer = setInterval(countDown, 1000);

    correct = 0;
    incorrect = 0;
    correctAnswers.innerHTML = correct;
    incorrectAnswers.innerHTML = incorrect;
    gameBoard.style.display = "none";
    questionBox.style.display = "none";
    startBox.style.display = "flex";
    function countDown() {
        timeLeft--;
        var seconds = timeLeft%60;
        timerDisplay.textContent = Math.floor(timeLeft/60) + ":";
        if (seconds < 10) timerDisplay.textContent += "0" + seconds;
        else  timerDisplay.textContent += seconds;
        if (timeLeft === 0) clearInterval(timer);
    }
}
function restart() {

    correctAnswers.innerHTML = correct;
    incorrectAnswers.innerHTML = incorrect;
    gameBoard.style.display = "none";
    questionBox.style.display = "none";
    restartBox.style.display = "flex";
    startBox.style.display = "none";

    
    correct = 0;
    incorrect = 0;
}
function askQuestion(x) {
    if (x == 0) drawQuestions();
    else timeout = setTimeout(drawQuestions, 1000);
     
    function drawQuestions() {
        
        startBox.style.display = "none";
        restartBox.style.display = "none";
        questionBox.style.display = "flex";
        gameBoard.style.display = "flex";
        // questionBox.innerHTML = "/n/n"; // blanks out string because of bug 
        questionBox.innerHTML = questions[x].q;
        choiceA.innerHTML = "A: " + questions[x].choices[0];
        choiceB.innerHTML = "B: " + questions[x].choices[1];
        choiceC.innerHTML = "C: " + questions[x].choices[2];
        choiceD.innerHTML = "D: " + questions[x].choices[3];
        for (var i=0; i<4; i++) {
            document.getElementById(i).style.backgroundColor = "#ffffff60";
            }
        }
}




function select(button) {
    
    if (button === questions[currentQuestion].correctAnswer) {
        console.log("correct!!!");
        correct++;
        correctAnswers.innerHTML = correct;
        document.getElementById(button).style.backgroundColor = "green";

    } else {
        console.log("wrong!!!");
        incorrect++;
        timeLeft -= 5;
        timeWarning.style.transition = "0s";
        timeWarning.style.color = "#ff0000ff";
        timeWarning.style.fontSize = "100px";
        timeout = setTimeout(function() {
            timeWarning.style.transition = "3s";
            timeWarning.style.color = "#ff000000";
            timeWarning.style.fontSize = "10px";
        }, 100);
        incorrectAnswers.innerHTML = incorrect;
        document.getElementById(button).style.backgroundColor = "red";
        document.getElementById(questions[currentQuestion].correctAnswer).style.backgroundColor = "green";
    }
    currentQuestion++;
    if (currentQuestion === questions.length) {
        currentQuestion = 0;
        restart();
        
    } else {
        askQuestion(currentQuestion);
    }
    
    
}


