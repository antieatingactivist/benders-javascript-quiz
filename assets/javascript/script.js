var correct = 0;
var incorrect = 0;
var currentQuestion = 0;
var gameBoard = document.getElementById("game-board");
var questionBox = document.getElementById("question");
var startBox = document.getElementById("game-start");
var restartBox = document.getElementById("game-restart");
var highScore = document.getElementById("high-score");
var correctAnswers = document.getElementById("correct-answers");
var incorrectAnswers = document.getElementById("incorrect-answers");
var endgameDialog = document.getElementById("endgame-dialog");
var timerDisplay = document.getElementById("time-clock");
var timeWarning = document.getElementById("time-warning");
var initials = document.getElementById("initials").children[1];
var choiceA = document.getElementById(0);
var choiceB = document.getElementById(1);
var choiceC = document.getElementById(2);
var choiceD = document.getElementById(3);
var timeout; 
var timer;
var timeLeft;
var highScoreArray = [];
// var highScoreArray = [
//     window.localStorage.getItem("highscore0").split(":"),
//     window.localStorage.getItem("highscore1").split(":"),
//     window.localStorage.getItem("highscore2").split(":"),
//     window.localStorage.getItem("highscore3").split(":"),
//     window.localStorage.getItem("highscore4").split(":"),
//     window.localStorage.getItem("highscore5").split(":"),

// ];


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
    // populates leaderboard with stored values and fills in empty spots.
    for (var i = 0; i < 6; i++) {
        var x = window.localStorage.getItem("highscore"+i);
        if (x)  highScoreArray[i] = x.split(":");
        else highScoreArray[i] = [0,"empty"];
    }

    console.log(highScoreArray);
    timeLeft = 300;
    timer = setInterval(countDown, 1000);

    correct = 0;
    incorrect = 0;
    correctAnswers.innerHTML = correct;
    incorrectAnswers.innerHTML = incorrect;
    gameBoard.style.display = "none";
    questionBox.style.display = "none";
    restartBox.style.display = "none";
    highScore.style.display = "none";
    startBox.style.display = "flex";
    function countDown() {      ///starts at wrong time!!!!
        timeLeft--;
        var seconds = timeLeft%60;
        timerDisplay.textContent = Math.floor(timeLeft/60) + ":";
        if (seconds < 10) timerDisplay.textContent += "0" + seconds;
        else  timerDisplay.textContent += seconds;
        if (timeLeft === 0) {
            clearInterval(timer);
            restart();
        }
    }
}
function restart() {
    
    clearInterval(timer);

    correctAnswers.innerHTML = correct;
    incorrectAnswers.innerHTML = incorrect;
    endgameDialog.textContent = "You got " +correct+ "/" +questions.length+ " answers correct!";
    gameBoard.style.display = "none";
    questionBox.style.display = "none";
    restartBox.style.display = "flex";
    highScore.style.display = "none";
    startBox.style.display = "none";

    document.addEventListener('keydown', typeLetter);
    function typeLetter(e) {

        if (e.keyCode == 8) {
            initials.textContent = initials.textContent.slice(0, -1);
           
        }
        else if ( (e.keyCode >= 65) && (e.keyCode <= 90) && (initials.textContent.length < 2)) {
            initials.textContent += e.key.toUpperCase();
        }
        else if ((e.keyCode == 13) && (initials.textContent.length >= 2)) {
            
            document.removeEventListener('keydown', typeLetter);

            addToHighScore(initials.textContent);
            initials.textContent = "";
        }
      
    }

    
    // correct = 0;
    // incorrect = 0;

}

function addToHighScore(initials) {
    restartBox.style.display = "none";
    startBox.style.display = "none";
    highScore.style.display = "flex";
    highScoreArray.sort((a,b) => b[0] - a[0]); //sorts high scores highest first;
    for (i in highScoreArray) { //checks if score is the same as any highscore, then puts your score above it.
        if (correct == highScoreArray[i][0]) {
            console.log(correct);
            highScoreArray.splice(i, 0, [correct, initials]);
            break;
        }
    }
    if (highScoreArray.length === 6) { // if no tie score, inserts your score above next highest.
        console.log(correct);
        highScoreArray.push([correct, initials]);
        highScoreArray.sort((a,b) => b[0] - a[0]);
    }
   

    highScoreArray.splice(6); //shortens array to 6



    for (var i = 0; i < 6; i++) {
        if (highScoreArray[i][1] == "empty") {
            highScore.children[1].children[0].children[i].textContent = "highScore["+i+"] = null;";
        } else {
            highScore.children[1].children[0].children[i].textContent = "player."+ highScoreArray[i][1] +".score = " + highScoreArray[i][0] + " / " + questions.length + ";"; 
        }
       var key = "highscore" + i;
       window.localStorage.setItem(key, (highScoreArray[i][0] + ":" + highScoreArray[i][1]));

       
    }
    document.addEventListener('keydown', function(e) {
        if (e.keyCode == 13) {
                
            document.removeEventListener('keydown', this);
            begin();
        
        }
    });
    


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

        choiceA.addEventListener('click', buttonPress);
        choiceB.addEventListener('click', buttonPress);
        choiceC.addEventListener('click', buttonPress);
        choiceD.addEventListener('click', buttonPress);
    
        function buttonPress(e) {
            select(e.srcElement.id);
            choiceA.removeEventListener('click', buttonPress);
            choiceB.removeEventListener('click', buttonPress);
            choiceC.removeEventListener('click', buttonPress);
            choiceD.removeEventListener('click', buttonPress);
        }

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
        timeout = setTimeout(restart, 1000);
        
    } else {
        askQuestion(currentQuestion);
    }

    
    
}


