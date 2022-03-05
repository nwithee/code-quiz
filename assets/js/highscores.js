//variables

var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var back = document.querySelector("#back");

//Clearing scores code
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});

//Go Back to previous page button
back.addEventListener("click", function(){
    window.location.replace("./index.html")
});


//Pull local storage data
var allScores = localStorage.getItem("allHighScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++){
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}