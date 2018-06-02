
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
            Q: ["What is the capital of Alabama ?","What is the capital of Alaska ?","What is the capital of Arizona ?","What is the capital of Arkansas ?","What is the capital of California ?","What is the capital of Colorado ?","What is the capital of Connecticut ?","What is the capital of Delaware ?","What is the capital of Florida ?","What is the capital of Georgia ?","What is the capital of Hawaii ?","What is the capital of Idaho ?","What is the capital of Illinois ?","What is the capital of Indiana ?","What is the capital of Iowa ?","What is the capital of Kansas ?","What is the capital of Kentucky ?","What is the capital of Louisiana ?","What is the capital of Maine ?","What is the capital of Maryland ?","What is the capital of Massachusetts ?","What is the capital of Michigan ?","What is the capital of Minnesota ?","What is the capital of Mississippi ?","What is the capital of Missouri ?","What is the capital of Montana ?","What is the capital of Nebraska ?","What is the capital of Nevada ?","What is the capital of New Hampshire ?","What is the capital of New Jersey ?","What is the capital of New Mexico ?","What is the capital of New York ?","What is the capital of North Carolina ?","What is the capital of North Dakota ?","What is the capital of Ohio ?","What is the capital of Oklahoma ?","What is the capital of Oregon ?","What is the capital of Pennsylvania ?","What is the capital of Rhode Island ?","What is the capital of South Carolina ?","What is the capital of South Dakota ?","What is the capital of Tennessee ?","What is the capital of Texas ?","What is the capital of Utah ?","What is the capital of Vermont ?","What is the capital of Virginia ?","What is the capital of Washington ?","What is the capital of West Virginia ?","What is the capital of Wisconsin ?","What is the capital of Wyoming ?"],
            A: [" Montgomery"," Juneau"," Phoenix"," Little Rock"," Sacramento"," Denver"," Hartford"," Dover"," Tallahassee"," Atlanta"," Honolulu"," Boise"," Springfield"," Indianapolis"," Des Moines"," Topeka"," Frankfort"," Baton Rouge"," Augusta"," Annapolis"," Boston"," Lansing"," St. Paul"," Jackson"," Jefferson City"," Helena"," Lincoln"," Carson City"," Concord"," Trenton"," Santa Fe"," Albany"," Raleigh"," Bismarck"," Columbus"," Oklahoma City"," Salem"," Harrisburg"," Providence"," Columbia"," Pierre"," Nashville"," Austin"," Salt Lake City"," Montpelier"," Richmond"," Olympia"," Charleston"," Madison"," Cheyenne",], 
            C: [[" Montgomery"," Hartford"," Little Rock"," Atlanta"],[" Sacramento","Denver"," Juneau"," Hartford"],[" Phoenix"," Dover"," Madison"," Little Rock"],[" Phoenix"," Denver","Austin"," Little Rock"],[" Sacramento"," Indianapolis"," Phoenix"," Phoenix"],[" Phoenix"," Des Moines"," Denver"," Tallahassee"],[" Hartford"," Springfield"," Juneau"," Little Rock"],[" Hartford"," Atlanta"," Madison"," Dover"],[" Denver"," Richmond"," Hartford"," Tallahassee"],[" Little Rock"," Honolulu"," Atlanta"," Sacramento"],[" Denver"," Bismarck"," Madison"," Honolulu"],[" Boise"," Indianapolis"," Tallahassee"," Little Rock"],[" Phoenix"," Baton Rouge"," Springfield"," Denver"],[" Indianapolis"," Topeka"," Little Rock"," Sacramento"],[" Tallahassee"," St. Paul"," Des Moines"," Atlanta"],[" Topeka"," Lansing"," Hartford"," Little Rock"],[" Atlanta"," Jackson"," Little Rock"," Frankfort"],[" Baton Rouge"," Helena"," Sacramento"," Little Rock"],[" Tallahassee"," Boston"," Augusta"," Sacramento"],[" Annapolis"," Jackson"," Madison"," Juneau"],[" Dover"," Lansing"," Little Rock"," Boston"],[" Dover"," Carson City"," Lansing"," Phoenix"],[" St. Paul"," Helena"," Dover"," Boston"],[" Juneau"," Albany"," Madison"," Jackson"],[" Little Rock"," Raleigh"," Jefferson City"," Juneau"],[" Helena","Denver"," Atlanta"," Phoenix"],[" Madison"," Raleigh"," Juneau"," Lincoln"],[" Carson City"," Montpelier"," Little Rock"," Denver"],[" Concord"," Bismarck"," Denver"," Boston"],[" Dover"," Santa Fe"," Trenton"," Madison"],[" Santa Fe"," Harrisburg"," Tallahassee"," Little Rock"],[" Albany"," Columbus"," Tallahassee"," Little Rock"],[" Hartford"," Oklahoma City"," Boston"," Raleigh"],[" Bismarck"," Carson City","Austin"," Juneau"],[" Columbus"," Providence","Albany"," Madison"],[" Atlanta"," Salt Lake City"," Oklahoma City"," Phoenix"],[" Salem"," Austin"," Little Rock"," Tallahassee"],["Austin"," Baton Rouge"," Harrisburg"," Sacramento"],[" Dover"," Montpelier"," Providence"," Little Rock"],[" Columbia"," Juneau"," Denver"," Dover"],[" Juneau"," Denver"," Atlanta"," Pierre"],[" Nashville"," Little Rock"," Tallahassee"," Denver"],[" Little Rock"," Tallahassee"," Austin"," Denver"],[" Salt Lake City"," Madison"," Hartford"," Tallahassee"],[" Sacramento"," Dover"," Hartford"," Montpelier"],[" Richmond"," Tallahassee"," Sacramento"," Atlanta"],["Dover"," Juneau"," Olympia"," Little Rock"],[" Charleston"," Juneau"," Little Rock"," Madison"],[" Denver"," Phoenix"," Madison"," Atlanta"],[" Cheyenne"," Boston"," Phoenix"," Hartford"]],
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
                    for (let i = 0; i < this.C[quizCounter].length; i++) {
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
