# Bender's Javascript Quiz


## https://antieatingactivist.github.io/futurama-quiz/

This is a Javascript Fundamental Quiz, hosted by me, Bender. It can be easily repurposed for other quiz types with the use of an Object holding all of the question and answer combinations. The quiz is timed and deducts 5 seconds when a wrong answer is selected. At the conclusion of the quiz, you will have the opportunity to save your highschool to a persistant locally stored leaderboard.

- The question object

```
var questions = [{

    q: "Which is NOT a data type?",
    choices: ["string","boolean","alert","number"],
    correctAnswer: 2
},{ //......

```

- Local Storage is used for the leaderboard.

```
function retrieveScoreBoard() {
    for (var i = 0; i < 6; i++) {
        var x = window.localStorage.getItem("highscore"+i);
        if (x)  highScoreArray[i] = x.split(":"); //splits : separated string into array
        else highScoreArray[i] = [0,"empty"]; //fills array with "empty" if no high score
    }
}
```

- Even Listeners are utilized for user input on both the keyboard and mouse.

```
        if (e.key == "Backspace") {   
            initials.value = initials.value.slice(0, -1);             
        }
        else if ( (e.key.match(/[a-zA-Z]/) ) && (initials.value.length < 2)) {
            initials.value += e.key.toUpperCase()
        }
        else if ((e.key == "Enter") && (initials.value.length >= 2)) {

            document.removeEventListener('keydown', typeLetter);
            addToHighScore(initials.value);
            initials.value = "";
        }
       
```


![Screen Recording 2021-12-28 at 11 33 57 PM](https://user-images.githubusercontent.com/1414728/147638242-639ec2a5-8e65-4517-ab06-b66291672899.gif)





## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Deployed Link

* [https://antieatingactivist.github.io/futurama-quiz/](https://antieatingactivist.github.io/futurama-quiz/)


## Authors

Garrett Corbin

- [https://antieatingactivist.github.io/futurama-quiz/](https://antieatingactivist.github.io/futurama-quiz/)
- [https://github.com/antieatingactivist/](https://github.com/)
- [https://www.linkedin.com/in/garrett-corbin-7a7777227/](https://www.linkedin.com/)
