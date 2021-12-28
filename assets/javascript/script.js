const startTime = 100;
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
var bender = document.getElementById("bender");
var initials = document.getElementById("initials").children[1].children[0];
var choiceA = document.getElementById(0);
var choiceB = document.getElementById(1);
var choiceC = document.getElementById(2);
var choiceD = document.getElementById(3);
var timeout; 
var timer;
var timeLeft;
var highScoreArray = [];



var questions = [{

    q: "Which is NOT a data type?",
    choices: ["string","boolean","alert","number"],
    correctAnswer: 2
},{
    q: "How do I declare a Variable in Javascript?",
    choices: ["int myVariable = ...;","$myVariable = ...","uint_8 myVariable = ...;","var myVariable = ...;"],
    correctAnswer: 3
},{
    q: "Javascript is used for...",
    choices: ["it's a dead language","writing operating systems","developing dynamic web pages","programming Microcontrollers"],
    correctAnswer: 2
},{
    q: "The condition in an if/else statement is enclosed within ...",
    choices: ["curly braces {}","square brackets []","quotation marks \"\"","parentheses ()"],
    correctAnswer: 3
},{
    q: "in Javascript, the escape character is ...",
    choices: ["\\","/","&","--"],
    correctAnswer: 0
},{
    q: "in Javascript we can increment a variable by ...",
    choices: ["myVariable = 1;","myVariable++;","myVariable + 1;","myVariable+=myVariable;"],
    correctAnswer: 1
},{
    q: "when being assigned to variables, string values must be enclosed within ...",
    choices: ["tildes ~~","astrisks **","parentheses ()","quotation marks \"\""],
    correctAnswer: 3
},{
    q: "in javascript, to print to the debug console, this is used.",
    choices: ["echo","printf()","console.log()","Serial.println()"],
    correctAnswer: 2
},{
    q: "javascript files have this file extention.",
    choices: [".js",".sh",".jar",".cpp"],
    correctAnswer: 0   
},{
    q: "you can easily comment out lines of code using this...",
    choices: ["/* */","&lt;!-- --&gt;","//","#"],
    correctAnswer: 2   
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
    timeLeft = startTime;
 
    currentQuestion = 0;
    correct = 0;
    incorrect = 0;
    correctAnswers.innerHTML = correct;
    incorrectAnswers.innerHTML = incorrect;
    bender.style.display = "none";
    gameBoard.style.display = "none";
    questionBox.style.display = "none";
    restartBox.style.display = "none";
    highScore.style.display = "none";
    startBox.style.display = "flex";

}

function startCountdown() {
    timerDisplay.textContent = formatTime();
    timer = setInterval(countDown, 1000);
    function countDown() {      ///starts at wrong time!!!!
        timeLeft--;
        timerDisplay.textContent = formatTime();

        if (timeLeft === 0) {
            clearInterval(timer);
            restart();
        }
    }
    function formatTime() {
        var str = "";
        var seconds = timeLeft%60;
        str = Math.floor(timeLeft/60) + ":";
        if (seconds < 10) str += "0" + seconds;
        else  str += seconds;
        return str;

    }
}
function restart() {
    
    clearInterval(timer);
    removeEventListeners();

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

function removeEventListeners() {
    choiceA.removeEventListener('click', buttonPress);
    choiceB.removeEventListener('click', buttonPress);
    choiceC.removeEventListener('click', buttonPress);
    choiceD.removeEventListener('click', buttonPress);
}
function addEventListeners() {
    choiceA.addEventListener('click', buttonPress);
    choiceB.addEventListener('click', buttonPress);
    choiceC.addEventListener('click', buttonPress);
    choiceD.addEventListener('click', buttonPress);
}

function addToHighScore(initials) {
    bender.style.display = "flex";
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
        questionBox.innerHTML = questions[x].q;
        choiceA.innerHTML = "<span id='0'>A: " + questions[x].choices[0]+ "</span>";
        choiceB.innerHTML = "<span id='1'>B: " + questions[x].choices[1]+ "</span>";
        choiceC.innerHTML = "<span id='2'>C: " + questions[x].choices[2]+ "</span>";
        choiceD.innerHTML = "<span id='3'>D: " + questions[x].choices[3]+ "</span>";

        addEventListeners();
    

        for (var i=0; i<4; i++) {
            // document.getElementById(i).style.backgroundColor = "#ffffff00";
            document.getElementById(i).className = "choice frosted";
            // document.getElementById(i).style.color = "#000000";
            }
        }
}
function buttonPress(e) {
    console.log(e);
    select(e.srcElement.id);
    removeEventListeners();
}




function select(input) {


    if (input == questions[currentQuestion].correctAnswer) {
        console.log("correct!!!");
        correct++;
        correctAnswers.innerHTML = correct;
        // document.getElementById(input).style.backgroundColor = "green";
        document.getElementById(input).className = "choice frosted green";
        // document.getElementById(input).style.color = "#ffffff";
        document.getElementById(input).innerHTML += "<span class='correct-incorrect'>CORRECT</span>";

    } else {
        console.log("wrong!!!");
        incorrect++;
        if (timeLeft > 5) {
            timeLeft -= 5;
        
        
            timeWarning.style.transition = "0s";
            timeWarning.style.color = "#ff0000ff";
            timeWarning.style.fontSize = "150px";
            timeout = setTimeout(function() {
                timeWarning.style.transition = "3s";
                timeWarning.style.color = "#ff000000";
                timeWarning.style.fontSize = "10px";
            }, 100);
        }
        incorrectAnswers.innerHTML = incorrect;
        document.getElementById(input).className = "choice frosted red";
        // document.getElementById(input).style.color = "#ffffff";
        document.getElementById(input).innerHTML += "<span class='correct-incorrect'>WRONG!</span>";
        document.getElementById(questions[currentQuestion].correctAnswer).className = "choice frosted green";
    }
    currentQuestion++;
    if (currentQuestion === questions.length) {
       
        timeout = setTimeout(restart, 1000);
        
    } else {
        askQuestion(currentQuestion);
    }

    
    
}


// var questions = [{

//     q: "What color is Fry's hair?",
//     choices: ["Black","Yellow","Orange","He's bald"],
//     correctAnswer: 2
// },{
//     q: "What species is Leela?",
//     choices: ["Alien","Omicronian","Decopodian","Human"],
//     correctAnswer: 3
// },{
//     q: "What planet do Lrrr and Ndnd reside when they aren't invading Earth?",
//     choices: ["Urectum","Decapod 10","Omicron Persei 8","Neutral Planet"],
//     correctAnswer: 2
// },{
//     q: "What did Fry's dad name him after?",
//     choices: ["a Defunct electronics Store","a British Comedian","Fast Food","a Screwdriver"],
//     correctAnswer: 3
// },{
//     q: "Which of these characters is not voiced by Billy West?",
//     choices: ["Hermes","Fry","Professor Farnsworth","a Zap Brannigan"],
//     correctAnswer: 0
// },{
//     q: "What is the name of the DonBot's Joe-Pesci-like henchman?",
//     choices: ["Bender","Clamps","Calculon","PreacherBot"],
//     correctAnswer: 1
// },{
//     q: "Who is the most prominent President of Earth?",
//     choices: ["Mayor Poopinmeyer","Trump's left foot","Ogden Wurnstrom","Richard Nixon's Head"],
//     correctAnswer: 3
// },{
//     q: "What is Fry's favorite somewhat addictive beverage?",
//     choices: ["Mountain Dew","LöBrau","Slurm","Maltese Liquor"],
//     correctAnswer: 2
// },{
//     q: "When Bender became God, who was his prophet?",
//     choices: ["Malakai","Ezekiel","Kif","L. Ron Hubbard"],
//     correctAnswer: 0   
// },{
//     q: "What was the problem with Popplers",
//     choices: ["They were very rare","They caused illness in humans","They were Omicronian babies","They were Hallucinogenic"],
//     correctAnswer: 2   
// },{
//     q: "Why does Mom want the last anchovies in existance?",
//     choices: ["They are great on Pizza","She knows Zoidberg likes them","She wants to resurrect the species","Their existance threatens her robot oil business"],
//     correctAnswer: 3   
// },{
//     q: "What is Elzar's spice of choice?",
//     choices: ["A blast from the Spice Weasel","Dash of Paprika","CBD oil","He prefered bland food"],
//     correctAnswer: 0   
// }
// ];