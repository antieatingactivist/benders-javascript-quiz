var correct = 0;
var incorrect = 0;
var currentQuestion = 0;

var questions = [{

    q: "What color is fry's hair?",
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
    choices: ["a Defunct electronic's Store","a British Comedian","Fast Food","a Screwdriver"],
    correctAnswer: 3
},{
    q: "Which of these characters is not voiced by Billy West?",
    choices: ["Hermes","Fry","Professor Farnsworth","a Zap Brannigan"],
    correctAnswer: 0
},{
    q: "What is the name of the DonBot's Joe-Pesci-like henchman?",
    choices: ["Bender","Clamps","Calculon","PreacherBot"],
    correctAnswer: 1
}
];

function askQuestion(x) {
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
    askQuestion(currentQuestion);
    
}