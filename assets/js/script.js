//Variables
var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#timer");
var startTimer = document.querySelector("#start");
var quizQuestions = document.querySelector("#quiz-wrapper");
var quizBox = document.querySelector("#quiz-box");

//array for question with correct answers
var questions = [
  {
    name: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "Hyperlink Things and Major Language", "House Tops Mango Lady", "Harken To My Llama"] ,
    answer: "Hyper Text Markup Language"

  },
  {
    name: "What is the correct sequence of HTML tags for starting a webpage?",
    choices: ["Head, Title, HTML", "Title, Head, HTML", "HTML, Head, Title", "HTML, HTML, HTML"],
    answer: "HTML, Head, Title"

  },
  {
    name: "Choose the correct HTML tag for the largest heading: ",
    choices: ["h1", "Heading", "h2", "p"],
    answer: "h1"

  },
  {
    name: "To display a simple message to a user via javascript you can use the following bit of code: " ,
    choices: ["window.door", "alert.user", "window.alert", "window.window"] ,
    answer: "window.alert"

  },
  {
    name: "To publish content during development to the console, what bit of code can you add to your javascript file?" ,
    choices: ["log.mystuff", "console.publish", "console.log", "display.bugs"] ,
    answer: "console.log"

  },
]

//More variables
//Sets starting time amount
var timeLeft = 61;
//Sets penalty time for missed question
var penaltyTime = 5;
//Interval Time
var interval = 0;
//Create new question elements
var ulQuestionCreate = document.createElement("ul");
ulQuestionCreate.className = "quiz-list";


//Timer code
startTimer.addEventListener("click", function(){
  if (interval === 0) {
    interval = setInterval (function(){
      timeLeft--;
      currentTime.textContent="Time: " + timeLeft;

      if (timeLeft <= 0) {
        clearInterval(interval);
        quizComplete();
        currentTime.textContent = "Time's Done!";
      }
  }, 1000);
}
  publish(questionIndex);
});

//Code to publish questions to the page
var publish = function(questionIndex){
  //Remove content before publication
  quizQuestions.innerHTML ="";
  ulQuestionCreate.innerHTML = "";

  //Code to loop through questions
  for (var i=0; i < questions.length; i++) {
    var quizQuestion = questions[questionIndex].name;
    var questionChoices = questions[questionIndex].choices;
    quizQuestions.textContent = quizQuestion;
    quizQuestions.className = "quiz-wrapper";
  }
  questionChoices.forEach(function (newThing){
    var listThing =document.createElement("li");
    listThing.textContent = newThing;
    quizQuestions.appendChild(ulQuestionCreate);
    ulQuestionCreate.appendChild(listThing);
    listThing.addEventListener("click", (check));
  })

}

//Code for checking whether an answer is correct
var check = function(event){
  var item = event.target;

  if (item.matches("li")) {
    var createNewDiv = document.createElement("div");
    createNewDiv.setAttribute("id", "createNewDiv");
    
    //Correct Answer
    if (item.textContent == questions[questionIndex].answer) {
      createNewDiv.textContent = "That is Correct!";
      score++;
    }
    //Incorrect Answer
    else {
      createNewDiv.textContent = "Incorrect.  The right answer was: "+ questions[questionIndex].answer;
      timeLeft = timeLeft - penaltyTime;
    }
  }

  //Code to determine which question the user sees
  questionIndex++;

  if (questionIndex >= questions.length ) {
    quizComplete();
    createNewDiv.textContent = ""; 
  }
  else {
    publish(questionIndex);
  }

  quizQuestions.appendChild(createNewDiv);
}

var  quizComplete = function() {
  quizQuestions.innerHTML = "";
  currentTime.innerHTML = "";

  //Completed quiz heading
  var createHeading = document.createElement("h1");
  createHeading.setAttribute("id", createHeading);
  createHeading.textContent ="Your quiz is complete!";

  quizQuestions.appendChild(createHeading);

  //Completed quiz content
  var createContent =document.createElement("p");
  createContent.setAttribute ("id", createContent);

  quizQuestions.appendChild(createContent);

  if (timeLeft >=0) {
    var timeRemaining = timeLeft;
    var createNewContent = document.createElement("p");
    clearInterval(interval);
    createContent.textContent = "Your final score is: " +timeRemaining;

    quizQuestions.appendChild(createNewContent);
  }

  //Input Text
  var createInitials = document.createElement("label")
  createInitials.setAttribute("id", createInitials);
  createInitials.textContent = "Enter your iniitals";

  quizQuestions.appendChild(createInitials);

  //Iniitials Input Box
  var createInitInput = document.createElement("input");
  createInitInput.setAttribute("type", "text");
  createInitInput.setAttribute("id", "initials");
  createInitInput.textContent="Your Initials";

  quizQuestions.appendChild(createInitInput);

  //Iniitials submit button
  var submitButton = document.createElement("button");
  submitButton.setAttribute("type","submit");
  submitButton.setAttribute("id","Submit");
  submitButton.textContent = "Submit";

  quizQuestions.appendChild(submitButton);

  //Code to capture entry into local storage
  submitButton.addEventListener("click", function(){
    var initials = createInitInput.value;

    var finalValues = {
      initials: initials,
      score: timeRemaining
    }
    
    var allHighScores = localStorage.getItem("allHighScores");
    if (allHighScores === null){
      allHighScores = [];
    }
    else {
      allHighScores = JSON.parse(allHighScores);
    }
    allHighScores.push(finalValues);

    var updatedScore = JSON.stringify(allHighScores);
    localStorage.setItem("allHighScores", updatedScore);

    console.log(updatedScore);

    window.location.replace("./highscores.html");
  });

}





