//user starts the game by clicking on the "start" button
$("button").on("click", function() {
    $("#start").fadeOut();
    //Game starts

    //Create timer value holder
    let timer = 10;
    //Create reset timer function to reset the value to 30
    let resetTimer = function() {
        timer = 30;
        $("#timer").html(timer);
    }
    //Create clock count down interval starts at 30 seconds
    let startInterval = setInterval(function(){
            $("#timer").html(timer--);
        },1000)
    //Create correctly, incorrectly, and unanswered variables to hold the value
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unAnswered = 0;

    //Create quiz object containing questions, answers, correct choices and methods
    let Quiz = 
        {
            question1: "What is my Name?",
            answer1: ["Osman","Bob","Chris"],
            correctAnswer1: "Osman",
            userPick: [],
        };
        $("#question").html(Quiz.question1);
        for (let i = 0; i<Quiz.answer1.length; i++){
            $("#answer").append("<button>" + Quiz.answer1[i] + "</button><br>");
        }


    //A question is generated and displayed

    //Answer choices are displayed for user to choose
    //If the clock is at zero and the answerchoice is not made then
        //correct answer is displayed
        //unanswered counter gets updated
    //else if the clock is greater than or equal to zero then
        //if the correct answer choice is made then
            //correct answered is displayed with 'You are right!'    
            //correctanswer counter gets updated
        //else if the wronganswer choice is made then
            //correct answered is displayed with 'Unfortunately, You guessed wrong!'
            //wronganswer counter gets updated
    //Next question is generated and displayed
    //Answer choices are displayed for user to choose


})





