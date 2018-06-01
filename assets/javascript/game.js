
$(document).ready(function() {
    let correctAnswerTally = 0;
    let incorrectAnswerTally = 0;
    let unansweredTally = 0;
    let quizCounter = 0;
    let timerValue;
    let timer;
    //Create a function to setup initial quiz screen html and show button that will start the quiz
    function initialScreen() {
        $("body").html(`<div class = "jumbotron text-center"><div class = "Quiz">
        <h1 class = title>State Capitals Trivia Quiz!</h1><br><button id = startButton>Play</button></div>`)
        $("#startButton").on("click", function(){
        $("body").html(`<div class = "jumbotron text-center">
            <div class = "Quiz">
            <h1 class = "title">State Capitals Trivia Quiz!</h1>
            <p>Time Remaining: <span id = "timer">10</span></p>
            <p class = "question"></p>
            <p class = "choices"></p>
            <p class = "answer"></p>
            <p class = "result"></p>
        </div>
    </div>`)
        Quiz.displayQuestion(quizCounter);
        })
    };    
    initialScreen(); 
    //Create a Quiz object containing Timer, Questions, Multiple Choices, Answers, and  method to display all including results at the end of the Quiz
    let Quiz = 
        {
            Q: ["What is my name?", "How old am I?", "What is my favorite type of food?"],
            A: ["Osman","Thirty","Italian"], 
            C: [["Bob","Joe","Osman"],["Fourty","Fifty","Thirty"],["American", "Mexican", "Italian"]],
            displayQuestion: function(){
                //Declare conditions
                if (quizCounter < this.Q.length) {
    
                    timerValue = 10;
                    timer = setInterval(function(){
                        if (timerValue === 0) {
                            clearInterval(timer);
                            loseTimeoutMessage();
                        } else if (timerValue > 0) {
                            $("#timer").html(timerValue--);
                        }
                    },1000);
    
                    //display the question at index of quizCounter
                    $(".question").html(this.Q[quizCounter]);
                    console.log(this.Q[quizCounter]); 
    
                    //loop through the nested array of choices(C) to display the values as buttons
                    for (let i = 0; i < this.C.length; i++) {
                        $(".choices").append("<button class = choicesButton>"+this.C[quizCounter][i]+"</button><br>");
                        console.log(this.C[quizCounter][i]);
                    }
    
                    //on click of a choice button the system checks the value selected 
                        //with the correct A index of counterQuiz
                    $(".choices").on("click","button",function(){
                        let selectedAnswer = $(this).text();
                        //if the selected answer matches with the A index of counterQuiz then
                        if(selectedAnswer == Quiz.A[quizCounter]) {
                            //update correct answer tally
                            
                            console.log("Total Correct Answers: " + correctAnswerTally);
                            clearInterval(timer);
                            //set time out to display function winMessage()
                            winMessage();
                            
                        } else {
                            console.log("Total incorrect Answers: " + incorrectAnswerTally);
                            clearInterval(timer);
                            loseMessage();
                        };
                    });
                } else {
                    displayResults();
                    clearInterval(timer);
                    restartQuiz();
                };
                //if the quizCounter is less than length of Q then 
            },
        };
    
    
    //Create winMessage, loseMessage, and loseTimeoutMessage functions
        //set each message to display for 3 seconds based on the conditions defined in Quiz.displayQuestion(quizCounter);
            //update relavent tally and resetting the timerValue to 30 seconds
            //display next question after 3 seconds
    // ------------------------------------------------------------------------------------------------------------------- //
    let winMessage = function(){
        $("body").html(`<div class = "jumbotron text-center Quiz">
        <h1 class = title>State Capitals Trivia Quiz!</h1>`+"<p class = message>Right! The correct answer was: " + Quiz.A[quizCounter]+"</p>");
        correctAnswerTally++;
        quizCounter++;
        timerValue = 10;
        setTimeout(nextQuestion,3000);
    };
    let loseMessage = function(){
        $("body").html(`<div class = "jumbotron text-center Quiz">
        <h1 class = title>State Capitals Trivia Quiz!</h1>`+"<p class = message>Wrong! The correct answer was:  " + Quiz.A[quizCounter]+"</p>");
        incorrectAnswerTally++;
        quizCounter++;
        timerValue = 10;
        setTimeout(nextQuestion,3000);
        
    };
    let loseTimeoutMessage = function(){
        $("body").html(`<div class = "jumbotron text-center Quiz">
        <h1 class = title>State Capitals Trivia Quiz!</h1>`+"<p class = message>Time's Up! The correct answer was:  " + Quiz.A[quizCounter]+"</p>");
        unansweredTally++;
        quizCounter++;
        timerValue = 10;
        setTimeout(nextQuestion,3000); 
    };
    // ------------------------------------------------------------------------------------------------------------------- //
    
    //Create nextQuestion function to setup html structure and initialize next question function
    let nextQuestion = function(){
        $("body").html(`<div class = "jumbotron text-center">
            <div class = "Quiz">
            <h1 class = "title">State Capitals Trivia Quiz!</h1>
            <p>Time Remaining: <span id = "timer">10</span></p>
            <p class = "question"></p>
            <p class = "choices"></p>
            <p class = "answer"></p>
            <p class = "result"></p>
        </div>
    </div>`)
        Quiz.displayQuestion(quizCounter);
    };
    
    //Create displayResults function to show total score and button to restart the game
    let displayResults = function() {
        $("body").html(`<div class = "jumbotron text-center Quiz">
                    <h1 class = title>State Capitals Trivia Quiz!</h1>`+"<div class = results><h2>You scored: "+parseInt(((Quiz.Q.length-(incorrectAnswerTally+unansweredTally))/Quiz.Q.length)*100)+"%</h2></div>"+"<div class = results> Correct Answers: " + correctAnswerTally + "</div>" + "<div class = results> Incorrect Answers: " + incorrectAnswerTally + "</div>" + "<div class = results> Unanswered: " + unansweredTally + "</div>"+"<div class = reset><button id = resetButton>Start Over?</button></div>"); 
                   }

    //Create a function to restart the quiz screen html and show button that will start the quiz
    let restartQuiz = function() {
        $(".reset").on('click','#resetButton',function(){
        correctAnswerTally = 0;
        incorrectAnswerTally = 0;
        unansweredTally = 0;
        quizCounter = 0;
        $("body").html(`<div class = "jumbotron text-center">
            <div class = "Quiz">
            <h1 class = "title">State Capitals Trivia Quiz!</h1>
            <p>Time Remaining: <span id = "timer">10</span></p>
            <p class = "question"></p>
            <p class = "choices"></p>
            <p class = "answer"></p>
            <p class = "result"></p>
            </div>`)
        Quiz.displayQuestion(quizCounter);
        });
    }
});
