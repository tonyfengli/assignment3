var wins = 0;
var losses = 0;
var guessesRemaining = 10;
var lettersGuessed = [];
var wordGuess = ["madonna", "lebronjames"]
var wordIndex = 0;
var letters;
var currentWord = [];



function resetCurrentWord () {
    // starts over to the first word again once all words to guess are played
    if(wordIndex >= wordGuess.length) {
        wordIndex = 0;
    }
    currentWord = [];
    for (i=0; i<wordGuess[wordIndex].length; i++) {
        currentWord[i] = "-";
    }
};

resetCurrentWord ();


// prints initial variables on window load
window.onload = function () {
    document.getElementById("current-word").innerHTML = currentWord.join("");
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    document.getElementById("losses").innerHTML = "Losses: " + losses;
    
};

//function to check whether the user won or lost the game, and then resets the game
function resetGame () {
    function printReset () {
        $("#wins").html("Wins: " + wins);
        $("#losses").html("Losses: " + losses);
        $("#guesses-remaining").html("Guesses Remaining: " + guessesRemaining);
        $("#current-word").html(currentWord);
        $("#letters").html(letters);
    }

    function variableReset() {
        guessesRemaining = 10;
        letters = [];
        lettersGuessed = [];
        resetCurrentWord();
    }

    // helper to check currentWord against the word to guess
    currentWord.toString("");

    if (currentWord.join("") === wordGuess[wordIndex]) {
        alert("you win");
        //resets all the variables
        wins++;
        wordIndex++;
        variableReset()
        // prints resetted variables
        printReset();

        
        
    } else if (guessesRemaining === 0) {
        alert("you lose");
        //resets all the variables
        losses++;
        variableReset()
        // prints resetted variables
        printReset();
    };
};


var wordArray = wordGuess[wordIndex].split("");

// eventlistener when user presses a key
document.onkeyup = function (event) {
    //converts word to guess from string to an array
    var wordArray = wordGuess[wordIndex].split("");
    // when cursor is on the new word form, no word will be guessed
    if (event.target.id === "newword") {
        return;
    } else {
        // function to add onto  "Letters Guessed" section
        var addGuess = function () {
            // conditional ensures there are no repeats displayed
            if(lettersGuessed.includes(event.key)) {
                return;
            // conditional ensures only wrong guesses deduct GuessesRemaining    
            } else if (wordArray.includes(event.key)) {
                return;
            } else {
                lettersGuessed.push(event.key);
                guessesRemaining--;
            }

            // prints array to "Letters Guessed" section
            var letters = lettersGuessed.join(" ");
            $("#letters").html(letters);
            // prints remaining guesses to "Guesses Remaining"
            $("#guesses-remaining").html("Guesses Remaining: " + guessesRemaining);
        }();


        //function to check the letter inputted against the word to guess for
        var checkGuess = function () {
            for(i = 0; i < wordGuess[wordIndex].length; i++) {
                //prints letters guessed correctly
                if(event.key === wordGuess[wordIndex].charAt(i)) {
                    currentWord[i] = event.key;
                    $("#current-word").html(currentWord);
                } 
            }
        }();
        
        resetGame();
    }
};



$(document).ready(function() {
    //function to add a word to guess for
    $("#submit").on("click", function() {
        var text = $("#myform").find("#newword").val();
        // event.preventDefault prevents browser from going to new URL
        event.preventDefault();
        //inputted word is added to the end of 'words to guess' queue
        wordGuess.push(text);
    });

    // event.preventDefault doesn't hide word upon submit, this does the trick
    $('#submit').click(function(){
        $('#newword').val("");
      });

    
    // creates an array (i.e. 1,2,3,4,5,6) based on the length of 'Word to Guess'
    var indexArray = [];

    // clicking hint to give you an answer to one random letter in the word
    $("#hint").on("click", function(event) {

        //creates a new array that provides indexes of a characters with "-"
        function getAllIndexes(arr, val) {
            var indexes = [], i = -1;
            while ((i = arr.indexOf(val, i+1)) != -1){
                indexes.push(i);
            }
            return indexes;
        }
    
        var indexArray = getAllIndexes(currentWord, "-");

        //converts word to guess from string to an array
        var wordArray = wordGuess[wordIndex].split("");
        // guesses a number with the 'Word to Guess' length as the max
        var index = Math.floor(Math.random() * indexArray.length);
        index1 = indexArray.splice(index,1);
        currentWord[index1] = wordArray[index1];
        $("#current-word").html(currentWord);

        resetGame();

 
    }); 

});


