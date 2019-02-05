$(document).ready(function() {
    
    var number = 60;

    var intervalId;
    var isRunning = false;

    
      if (isRunning === false && number > 0) {
        isRunning = true;
        intervalId = setInterval(decrement, 1000);
        console.log("interval start: ", intervalId);
      }
      else {
        console.log("interval already started.");
      }


    function decrement() {

      number--;

      $("#show-number").html("<h2>" +"Seconds remaining: "+ number + "</h2>");

      if (number === 0) {

        stop();

        showResults();
      }
    }
    function stop() {

        //  Clears our intervalId
        //  We just pass the name of the interval
        //  to the clearInterval function.
        clearInterval(intervalId);
      }

   
    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];
      $( "span" ).toggle(false);
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll(".answers");
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = "lightgreen";
        } else {
          // if answer is wrong or blank
          // color the answers red
          answerContainers[questionNumber].style.color = "red";
        }
      });
  
      // show number of correct answers out of total
      stop();
      console.log('numCorrect:', numCorrect,'myQuestions.length: ',myQuestions.length);
      $("span").html('Your Score is '+numCorrect+' out of '+myQuestions.length);
      $( "span" ).toggle(true);
    }
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
   
    const myQuestions = [
      {
        question: "What is the most boxes of cookies sold by a single girl scout in one season?",
        answers: {
          a: "9000",
          b: "18,000",
          c: "25,000",
          d: "50,000"
        },
        correctAnswer: "c"
      },
      {
        question: "what company or companies make the cookies for the Girl Scouts?",
        answers: {
          a: "Little Brownie Bakers & ABC Bakers",
          b: "Little Brownie Bakers",
          c: "Little Brownie Bakers, ABC Bakers, & Keebler",
          d:  "Keebler"
        },
        correctAnswer: "a"
      },
      {
        question: "What cookie is the most popular Girl Scout cookie?",
        answers: {
          a: "Samoas",
          b: "Thin Mints",
          c: "Shortbread",
          d: "S'Mores"
        },
        correctAnswer: "b"
      },
      {
        question: "What year did Girl Scouts start selling cookies",
        answers: {
          a: "1905",
          b: "1953",
          c: "1917",
          d: "1934"
        },
        correctAnswer: "c"
      },
      {
        question: "How much is a box of cookies this year",
        answers: {
          a: "$4.00",
          b: "$6.00",
          c: "$4.50",
          d: "$5.00"
        },
        correctAnswer: "d"
      }
    ];
  
    // display quiz right away
    buildQuiz();
  
    // on submit, show results
    submitButton.addEventListener("click", showResults);

        // setTimeout(startGame,500);

});