//Variables
//Create variables to hold number of correct answers and incorrect answers. Display number of questions user got right when game is over.
var correctAnswersTally = 0;
var incorrectAnswersTally = 0;

//Create variable to hold count that will keep track of the index of the currently displayed trivia question.
var count = 0;

//Create variable to hold the time to answer a question.
var Timer = 15;
var intervalId;

//Create variable to hold the user's choice/answer.
var userChoice;

//Create variable for button so that we can create it using jQuery.
var choiceBtn;

//Create variable to hold all questions and answers in question set.
var questionSet = {
    questionArray: [{

        question: "How many years does it take for plastics to degrade?",
        choices: ["3 years", "4 months", "400 years", "None of the above"],
        answer: "400 years",
        imageCorrect: "assets/images/katya-austin-554633-unsplash.jpg"
    }, {

        question: "How many decades ago did a mass production of plactics begin?",
        choices: ["15 decades", "6 decades", "10 years", "None of the above"],
        answer: "6 decades",
        imageCorrect: "assets/images/katya-austin-554633-unsplash.jpg"
    }, {

        question: "How many tons of plastic does the world produce in a year?",
        choices: ["30 million tons", "6 tons", "50 thousand tons", "None of the above"],
        answer: "30 million tons",
        imageCorrect: "assets/images/katya-austin-554633-unsplash.jpg"
    }, {

        question: "Where does the 8.3 billion metric tons of plastic end up?",
        choices: ["vacant lots", "rivers", "streams", "oceans"],
        answer: "oceans",
        imageCorrect: "assets/images/katya-austin-554633-unsplash.jpg"
    }, {

        question: "What percent of plastic waste is recycled in the US?",
        choices: ["50%", "40%", "25%", "less than 10%"],
        answer: "less than 10%",
        imageCorrect: "assets/images/katya-austin-554633-unsplash.jpg"
    }, {

        question: "How many plastic bags do Americans use per year?",
        choices: ["50 thousand", "8 million", "125 million", "102 billion"],
        answer: "102 billion",
        imageCorrect: "assets/images/katya-austin-554633-unsplash.jpg"
    }]
};

//Start game page with start button. Start button only shows up when user first comes to site or refreshes the browser.
//Start button should not appear when user clicks "Try again?" when user finishes game.
//Append start button
$("#start-div").append("<button id='start-game-button'>" + "Start" + "</button>");
//Add styling to start button.
$("#start-game-button").addClass("btn btn-primary btn-lg btn-block");
//Hide question-div at start of game
$("#question-div").hide();
//Hide correct-answer-div at start of game.
$("#corect-answer-div").hide();
//Hide timer
$("#timer-div").hide();
//When start button is clicked, start game and show "Time remaining".
$("#start-game-button").on("click", function () {
    start();
    $("#timer-div").show();
});

//Functions
function start() {
    //Start timer
    runTimer();
    //Hide the div that contains the start button
    $("#start-div").hide();
    //Hide the div that contains the start image.
    $("#start-image").hide();
    //Hide the div that contains the correct answer
    $("#correct-answer-div").hide();
    //Show the question-div at the start of the game. Display question and choices based on the current count. Count starts at 0.
    $("#question-div").show().html("<h1>" + "Question: " + questionSet.questionArray[count].question + "</h1>");
    //Loop through the number of choices. For each choice that the user can guess...
    for (var i = 0; i < questionSet.questionArray[count].choices.length; i++) {
        //Create a button (choiceBtn).
        var choiceBtn = $("<button>");
        //Add bootstrap styling to the button to make the button look cool.
        choiceBtn.addClass("btn btn-secondary btn-lg btn-block");
        //Give each button a data attribute called data-choice.
        choiceBtn.attr("data-choice", questionSet.questionArray[count].choices[i]);
        //Then give each choiceBtn a text equal to questionSet.questionArray[count].choices[i]
        choiceBtn.text(questionSet.questionArray[count].choices[i]);
        //Append choiceBtn to question-div so that it appears right below the question.
        $("#question-div").show().append(choiceBtn);
        //When user clicks the choiceBtn, checkAnswer. Compare the option that the user selected to the correct answer.
        choiceBtn.click(checkAnswer);
    }

}

function runTimer() {
    //Set timer to decrement every 1 second...
    $("#time-up").hide();
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    //decrement timer by 1.
    Timer--;
    //Tell the user how much time is remaining to answer the current question.
    $("#final-countdown").show().html(Timer);
    //If timer reaches 0, stop timer, and tell the user that time's up.
    if (Timer === 0) {
        stop();
        //Tell user time's up and user took too long to choose an answer.
        $("#time-up").show().html("<h2>" + "Time's up!" + "</h2>").append;
        //When timer reaches 0, hide the question and choices.
        $("#question-div").hide();
        //Show giph of Kevin Ross. (Not working)
        var queryURL = "https://giphy.com/gifs/kevinross-kevin-ross-l2QDT49MQNfZvUHHq";
        $.ajax({ url: queryURL, method: 'GET' })
            .done(function (response) {
                console.log(response);
                $("#time-up").append("<img id='game-over-image' src='" + response.data[6].images.downsized_large.url + "'>");
                $("#game-over-image").addClass("img-fluid");
            })
        //Go to next question...
        nextQuestion();
    }
}

function stop() {
    clearInterval(intervalId);
}

function checkAnswer() {
    //After user guesses/clicks a choiceBtn...
    stop();
    //Set the user's choice to the data-choice attribute of the choiceBtn that was clicked.
    userChoice = $(this).attr("data-choice");
    console.log(userChoice);
    //If the user's choice equals the answer (questionSet.questionArray[count].answer)...
    if (userChoice === questionSet.questionArray[count].answer) {
        //Add 1 to correctAnswersTally
        correctAnswersTally++;
        //Hide question-div to hide question and choices.
        $("#question-div").hide();
        //Tell the user that his/her selection is correct.
        $("#correct-answer-div").show().html("<h2>" + "Correct!" + "</h2>").addClass("text-center").append("<img src=" + questionSet.questionArray[count].imageCorrect + " width='400px'>");
        //Go to the next question.
        nextQuestion();
    }

    else {
        //Add 1 to incorrectAnswersTally
        incorrectAnswersTally++;
        $("#question-div").hide();
        //Tell the user that his/her selection is incorrect and display wrong-answer.png image.
        //Do not display correct answer here. I don't want them to know the answer if they choose to try the game later.
        $("#correct-answer-div").show().html("<h2>" + "Incorrect" + "</h2>").addClass("text-center").append("<img src=" + "assets/images/wrong-answer.png" + " width='400px'>");
        //Go to the next question.
        nextQuestion();
    }
}

function nextQuestion() {
    //Increment the count by 1
    count++
    //If the count is the same as the length of the questionSet.questionArray array, wait a few seconds and then go to game over screen to see score..
    if (count === questionSet.questionArray.length) {
        $("#timer-div").show();
        setTimeout(gameOver, 4000);
    }

    //else, if there are still questions left, wait a few seconds, resetTimer, and go to the next question.
    else {
        setTimeout(resetTimer, 4000);
        $("#timer-div").show();
    }
}

function resetTimer() {
    //After resetting timer, go to start (send to next question).
    Timer = 15;
    $("#final-countdown").show().html(Timer);
    setTimeout(start, 75);
}

function gameOver() {
    //Hide timer.
    $("#timer-div").hide();
    $("#time-up").hide();
    //Hide question-div that contains question and choices.
    $("#question-div").hide();
    //Display to the user the number of questions the user got correct out of total number of questions.
    $("#correct-answer-div").show().html("<h2>" + "You got " + correctAnswersTally + " out of 6 correct." + "</h2>");


    //Append try again button
    $("#correct-answer-div").append("<button id='try-again-button'>" + "Try again?" + "</button>");
    //Add styling to reset button.
    $("#try-again-button").addClass("btn btn-primary btn-lg btn-block");

    //When try-again-button is clicked, reset game. Do not go to start page. User should be taken to first question in trivia game.
    $("#try-again-button").on("click", function () {
        reset();
        //Hide correct-answer-div.
        $("#correct-answer-div").hide();
    });
}

function reset() {
    //When game is reset (user clicks try again button), set count, correctAnswersTally, and incorrectAnswersTally back to 0 before starting game again.
    count = 0;
    correctAnswersTally = 0;
    incorrectAnswersTally = 0;
    Timer = 15;
    $("#timer-div").show();
    $("#final-countdown").show().html(Timer);
    setTimeout(start, 75);
}
