var correct = 0;
var incorrect = 0;
var currentQuestion = 0;

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
    correct = 0;
    incorrect = 0;
    document.getElementById("correct-answers").innerHTML = correct;
    document.getElementById("incorrect-answers").innerHTML = incorrect;
    document.getElementById("game-board").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("game-start").style.display = "flex";
}
function restart() {

    document.getElementById("correct-answers").innerHTML = correct;
    document.getElementById("incorrect-answers").innerHTML = incorrect;
    document.getElementById("game-board").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("game-start").style.display = "flex";
    document.getElementById("game-start").innerHTML = 
        "You got " + correct + "/" + questions.length + " answers correct!" + "<br><span>Another job well done.</span>";
    correct = 0;
    incorrect = 0;
}
function askQuestion(x) {
    document.getElementById("game-start").style.display = "none";
    document.getElementById("question").style.display = "flex";
    document.getElementById("game-board").style.display = "flex";
    document.getElementById("question").innerHTML = "/n/n"; // blanks out string because of bug 
    document.getElementById("question").innerHTML = questions[x].q;
    document.getElementById(0).innerHTML = "A: " + questions[x].choices[0];
    document.getElementById(1).innerHTML = "B: " + questions[x].choices[1];
    document.getElementById(2).innerHTML = "C: " + questions[x].choices[2];
    document.getElementById(3).innerHTML = "D: " + questions[x].choices[3];
}




function test(button) {
    if (button === questions[currentQuestion].correctAnswer) {
        console.log("correct!!!");
        correct++;
        document.getElementById("correct-answers").innerHTML = correct;
    } else {
        console.log("wrong!!!");
        incorrect++;
        document.getElementById("incorrect-answers").innerHTML = incorrect;
    }
    currentQuestion++;
    if (currentQuestion === questions.length) {
        currentQuestion = 0;
        restart();
        
    } else {
        askQuestion(currentQuestion);
    }
    
    
}