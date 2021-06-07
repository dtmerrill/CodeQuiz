// Table of Contents 
// 1: variables
// 2: start button listener
// 3: randomizer for questions array
// 4: quiz timer
// 5: start button/hide elements/run quiz pt.1
// 6: question progression/run quiz pt.2
// 7: validates and counts answers/provides feedback
// 8: ends the quiz/shows and stores score
// 9: score saver
// 10: quiz restart
// 11: clear/save/show scores
// 12: questions/answers

// 1: variables
var scores = document.getElementById('score');
var clock = document.getElementById('timer');
var userScore = document.getElementById('user-score');
var leaderboard = document.getElementById('leaderboard');
var clearScores = document.getElementById('clear');
var startButton = document.getElementById('start-btn');
var description = document.getElementById('description');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var submit = document.getElementById('submit');
var userInitials = document.getElementById('initials');
var tryAgain = document.getElementById('play-again');
var allScoresList = document.getElementById('leaders');
var leaderBoardButton = document.getElementById('high-scores');
var currentQuestionIndex;
var sec = 60;
var score = 0;

// 2: start button listener
startButton.addEventListener('click', startGame);

// 3: randomizer for questions array
function shuffleArray(passedArray) {
    for (var i = 0; i < passedArray.length; i++) {
        var rand = Math.floor(Math.random() * passedArray.length);
        var temp = passedArray[i];
        passedArray[i] = passedArray[rand];
        passedArray[rand] = temp;
    }
    return passedArray;
}

// 4: quiz timer
function timer() {
    var timer = setInterval(function () {
        document.getElementById('timer').textContent = 'Time: ' + sec;
        if (sec <= 0) {
            clearInterval(timer);
            endQuiz()
        }
        sec--;
    }, 1000);
}

var shuffled = [];

// 5: start button/hide elements/run quiz pt.1
function startGame() {
    timer();
    startButton.classList.add('hide');
    description.classList.add('hide');
    leaderBoardButton.classList.add('hide');
    shuffled = shuffleArray(questionArray);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    initializeQuestion(shuffled);
}

// randomized question listing
function initializeQuestion(shuffledQuestions) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// answer clearing
function clearoptions() {
    answerButtonsEl.innerHTML = "";
}

// 6: question progression/run quiz pt.2
function showQuestion(currentQuestionObject) {
    questionEl.textContent = currentQuestionObject.title;
    clearoptions();
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[0].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.options[0].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[1].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.options[1].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[2].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.options[2].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[3].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function () {
        selectAnswer(currentQuestionObject.options[3].correct);
    })
}

// 7: validates and counts answers/provides feedback
function selectAnswer(isCorrect) {
    if (isCorrect == true) {
        score += 10;
        alert('Correct');
    } else {
        sec -= 10;
        alert('Incorrect! Time Deducted');
    }
    currentQuestionIndex++;
    if (currentQuestionIndex == shuffled.length) {
        alert("That's All the Questions! Lets see how you did!");
        endQuiz();
    } else {
        showQuestion(shuffled[currentQuestionIndex]);
    }
}

// 8: ends the quiz/shows and stores score
function endQuiz() {
    sec = 0;
    questionContainerEl.classList.add('hide');
    scores.classList.remove('hide');
    leaderBoardButton.classList.remove('hide');
    userScore.textContent = 'Your total was ' + score + ' out of 100!';
}

var namesToKeep = "";
var scoresToKeep = [];

// 9: score saver
submit.addEventListener('click', function (event) {
    event.preventDefault();
    showScoresHistory();
})

function addScores(initials, score) {
    var newScore = {
        initials: initials,
        score: score
    }
    scoresToKeep.push(newScore);
    localStorage.setItem('scoresToKeep', JSON.stringify(scoresToKeep));
}

// 10: quiz restart
function startAgain() {
    sec = 60;
    score = 0;
    leaderboard.classList.add('hide');
    startGame();
}

// "try again" listener
tryAgain.addEventListener('click', function () {
    startAgain();
})

// 11: clear/save/show scores
function clearScoresHistory() {
    localStorage.clear();
    allScoresList.innerHTML = "";
}
clearScores.addEventListener('click',clearScoresHistory)
    
function showScoresHistory() {
    namesToKeep = userInitials.value;
    addScores(namesToKeep, score);
    scores.classList.add('hide');
    leaderboard.classList.remove('hide');
    allScoresList.innerHTML = "";
    var displayScores = JSON.parse(localStorage.getItem("scoresToKeep"));
    for (i = 0; i < displayScores.length; i++) {
        var newLeader = document.createElement("li");
        newLeader.setAttribute("class", "listOfLeaders");
        newLeader.append(document.createTextNode(`${displayScores[i].initials} ----- ${displayScores[i].score}`));
        allScoresList.append(newLeader);
    }
}

leaderBoardButton.addEventListener('click', function () {
    startButton.classList.add('hide');
    description.classList.add('hide');
    questionContainerEl.classList.add('hide');
    scores.classList.add('hide');
    showScoresHistory();
});
console.log(scoresToKeep)
console.log(scores)

// 12: questions/answers
var questionArray = [

    {
        title: 'JavaScript only runs if it is stored in its own .js file.',
        options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true },            
        ],
    }, {
        title: 'One might say JavaScript is in the code as the',
        options: [
            { text: 'Content Layer', correct: false },
            { text: 'Behavior Layer', correct: true },
            { text: 'Annoying Layer', correct: false },
            { text: 'Presentation Layer', correct: false },
        ],
    }, {
        title: 'To use JavaScript, a browser needs',
        options: [
            { text: 'Nothing Special (No One of Consequence)', correct: false },
            { text: 'A Passport (License)', correct: false },
            { text: 'An Interpreter (Scripting Engine)', correct: true },
            { text: 'A Primary Key (Identifier)', correct: false },
        ],
    }, {
        title: 'When running, JavaScript directly modifies HTML code.',
        options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true },            
        ],
    }, {
        title: 'Each instruction or step in JavaScript is a',
        options: [
            { text: 'Statement', correct: true },
            { text: 'Comment', correct: false },
            { text: 'Parameter', correct: false },
            { text: 'Lucky Guess', correct: false },
        ],
    }, {
        title: 'Bits of information stored for use in a script that might change every time it is run are',
        options: [
            { text: 'Constants', correct: false },
            { text: 'Vectors', correct: false },
            { text: 'Bytes', correct: false },
            { text: 'Variables', correct: true },
        ],
    }, {
        title: 'To use information in a script, each "bit" must be ______ and had a value ______.',
        options: [
            { text: 'Updated/Applied', correct: false },
            { text: 'Identified/Calculated', correct: false },
            { text: 'Addressed/Strummed', correct: false },
            { text: 'Declared/Assigned', correct: true },
        ]
    }, {
        title: 'JavaScript data types include: Arrays, Objects, Undefined, Null,',
        options: [
            { text: 'Prime, Useful, Pointed', correct: false },
            { text: 'Numeric, Strings, Boolean', correct: true },
            { text: 'Assigned, Aligned, Refined', correct: false },
            { text: 'Sugar, Salt, Fat', correct: false },
        ]
    }, {
        title: 'Values in an array are accessed by the script as if they are in a numbered list.',
        options: [
            { text: 'True', correct: true },
            { text: 'False', correct: false },
        ]
    }, {
        title: 'An expression evaluates to a single ______ and relies on ______.',
        options: [
            { text: 'Smile/Teeth', correct: false },
            { text: 'Result/Evaluators', correct: false },
            { text: 'Page/Comparison', correct: false },
            { text: 'Value/Operators', correct: true },
        ]
    }

    
  ];