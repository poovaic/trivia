//VARIABLE KEY

const startGame = document.querySelector('#start_game')
let checkButton = document.querySelector('#check_answer') //check button
let playAgainButton = document.querySelector('#play_again') //play again button
let questionPara = document.querySelector('#ques')
let answer = document.querySelector('.answer_options')
let currentScore = document.getElementById('score')//current score
let constant = document.getElementById('total-questions')//constant 10
let correctAnswer="";
let wrongAnswer="";
let score =0; //initial score
let correctCount=0; //question number/count
let constantScore=10;//total questions
let result = document.querySelector('.result') // result of quiz selection
let winLose = document.querySelector('.win_lose')//result of the game
let skip = document.querySelector('#skip')
let fiftyFifty=document.querySelector('#fifty_fifty')
let audiencePoll=document.querySelector('#audience')
let currentQuestion= document.querySelector('#q_number');//select span of question number
let questionNumber=0;


//FUNCTION TO HAVE ELEMENTS READY WHEN THE DOM HAS LOADED
document.addEventListener('DOMContentLoaded',function(){
    clicks()
    constant.textContent = constantScore; //constant of 10
    currentScore.textContent = score; //score will be incremented if selected is equal to correct answer in api call
    currentQuestion.textContent = questionNumber;
})



//STARTGAME
//Called by-StartGame button. Used to call API

function gameStart(){
startGame.disabled = true;
startGame.style.display = "none";
callAPI()
}


//FUNCTION TO DECODE HTML ELEMENTS FROM API CALL
  
var decodeEntities = (function() {
    //this prevents any overhead from creating the object each time
    var element = document.createElement('div');
    function decodeHTMLEntities (str) {
      if(str && typeof str === 'string') {
        //strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }
  
      return str;
    }
  
    return decodeHTMLEntities;
  })();


//SKIP
//LIFELINE 1:WILL SKIP A QUESTION AND SCORE++
function skipQuestion(){
skip.disabled = 'true';
skip.style.visibility = 'hidden';
score++;
checkCount()
console.log(correctCount)
}

//EVENTLISTENERS FOR 4 BUTTONS
function clicks(){
    startGame.addEventListener('click',gameStart);
    checkButton.addEventListener('click', checkAnswer);
    playAgainButton.addEventListener('click', restartGame);
    skip.addEventListener('click',skipQuestion);
    //fiftyFifty.addEventListener('click', fifFifty);
}


//CALL API
async function callAPI(){
    result.style.visibility = 'hidden';
    winLose.style.visibility = 'hidden';
    //startGame.disabled=true;
    let response1 = await axios.get('https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple')
    console.log(response1)
    result.innerHTML = "";
    winLose.innerHTML = "";
    loadQuiz(response1.data.results[0]);  
  
}



//LOAD THE QUIZ - Called by callAPI().Loads the question,correct and wrong answers
function loadQuiz(apiInput){ 
questionNumber++;
currentQuestion.textContent = questionNumber;
checkButton.disabled=false; 

//extracts correct and wrong answer
correctAnswer = apiInput.correct_answer; // correct answer 
console.log(correctAnswer)

let wrongAnswer = apiInput.incorrect_answers;//wrong answer
console.log(wrongAnswer)
let answerList = wrongAnswer
// const questionLoading = new Audio('./questionLoading.mp3');
//       questionLoading.play();




//inserts correct and wrong answer in ul:answer_otpions
// tried putting this is a separate variable and mapping. but didnt work.
answerList.splice((Math.random()*(wrongAnswer.length+1)),0,correctAnswer) //splice(select random index, replace 0 element, correctAnswer to the list)
//console.log(answer)



//DISPLAY question in #ques
let questionPara = document.querySelector('#ques')
questionPara.innerHTML = apiInput.question;

//DISPLAY LIST OF OPTIONS UL .answer_options
// reference:https://gomakethings.com/using-array.map-to-create-markup-from-an-array-with-vanilla-js/

answer.innerHTML =`${answerList.map((option) =>
 `<li><span>`+option+`</span></li>`).join('')}`
 //`<li> ${i+1}.<span>${option}</span></li>`).join('')}`
//interpolation helps to go through array and dynamically add it to li tags. 
//console.log(answer)

//LIFELINE 2: EVENT LISTENER FOR FIFTY-FIFTY
fiftyFifty.addEventListener('click', function(){
    fiftyFifty.disabled='true';
    fiftyFifty.style.visibility = 'hidden';
    let x = 0
   for (i=0;i<3;i++)
   {
        // console.log(x)
        // console.log(i)
        if(answer.querySelectorAll('li')[i].textContent == decodeEntities(correctAnswer))
        {
            //console.log(answer.querySelectorAll('li')[i].textContent)
            //answer.querySelectorAll('li')[i].textContent
        }
        else if(answer.querySelectorAll('li')[i].textContent == decodeEntities(wrongAnswer[0]) ||answer.querySelectorAll('li')[i].textContent == decodeEntities(wrongAnswer[1]) || answer.querySelectorAll('li')[i].textContent == decodeEntities(wrongAnswer[2]))
        {
             x++;
             if(x>2)
            {
            break;
            }
            // console.log('x++'+x)
            // console.log("Hello")
            answer.querySelectorAll('li')[i].innerHTML = ""
            
        }
    
    }
    
})


//LIFELINE 3 : AUDIENCE POLL
audiencePoll.addEventListener('click', function(){
    audiencePoll.disabled='true';
    audiencePoll.style.visibility = 'hidden';
    
    for(j=0;j<4;j++){
        // if(decodeEntities(wrongAnswer[j]) !== decodeEntities(correctAnswer)){
        //     result.style.backgroundColor = "orange"
            
        //     a = answer.querySelectorAll('li')[j].textContent + `= 55%`
        //     result.style.visibility = 'visible';

        //     result.innerHTML += `<p>${a}</p>`;
        //     console.log(a)
        // }
        if(answer.querySelectorAll('li')[j].textContent == decodeEntities(correctAnswer)){
            result.style.backgroundColor = "green"
            
            a = answer.querySelectorAll('li')[j].textContent + `= 55%`
            result.style.visibility = 'visible';

            result.innerHTML = `<p>${a}</p>`;
            console.log("a"+a)
        }
        else if(answer.querySelectorAll('li')[j].textContent == decodeEntities(wrongAnswer[0]) ||answer.querySelectorAll('li')[j].textContent == decodeEntities(wrongAnswer[1]) || answer.querySelectorAll('li')[j].textContent == decodeEntities(wrongAnswer[2])|| answer.querySelectorAll('li')[j].textContent == decodeEntities(wrongAnswer[3]) ){
        winLose.style.backgroundColor = "orange"
        b = `${answer.querySelectorAll('li')[j].textContent} = 15%`
        console.log("b"+b)
        winLose.style.visibility = 'visible';
        winLose.innerHTML += `<p>${b}</p>`;
        }
      
    }
})


chooseAnswer();
}


// CHOOSE ANSWER what happens when i click an answer
//create a class which highlights chosen answer and add it to the list item that was selected
//reference https://bobbyhadz.com/blog/javascript-add-event-listener-to-all-elements-with-class

function chooseAnswer(){
    answer.querySelectorAll('li').forEach((option)=> { //selecting list items for unordered lists,iterate
    option.addEventListener('click',()=>{
        //reference https://stackoverflow.com/questions/52973660/how-to-highlight-selected-li-item-only
        //https://stackoverflow.com/questions/58019176/on-click-highlight-div
        //option.setAttribute('style', 'background-color:yellow;')=> this didnt work. it selected everything i clicked
        //toggle didnt work.
        
        //below if condition checks for answer elements with selected class. And if it is true then it removes the class of that element.//to remove previous clicks
        
        if(answer.querySelector('.selected')){
            //remove selected class from the whole list 
            answer.querySelector('.selected').classList.remove('selected');
            //activeAnswer.classList.remove('selected') 
        }else
        //add the classlist to the clicked option
        option.classList.add('selected')
})

})
}

//AFTER CLICKING, DISABLE CHECK BUTTON,TAKE IN USER INPUT AND CHECK IF ANSWER IS RIGHT OR WRONG AND INCREMENT SCORE
function checkAnswer(){
checkButton.disabled =true;
if(answer.querySelector('.selected')){
    let selectedAnswer = answer.querySelector('.selected span').textContent; //parse through a string and check for certain types. you still have to check for other symbols.regex might have option to select every symbol.includes
    if(selectedAnswer == decodeEntities(correctAnswer)){
        score++;
        console.log(score)
        result.style.visibility = 'visible';
        result.style.background = "green";
        result.innerHTML = '<p>You got that right!!!</p>';
        const correct = new Audio('./correct answer.mp3');
        correct.play();
    }   else{
        result.style.visibility = 'visible';
        result.style.background = "red";
        result.innerHTML += `<p>Wrong Answer!!!! <br> Correct Answer is : `+correctAnswer+`</p>`;
        const wrong = new Audio('./wrong answer.mp3');
        wrong.play();
        }
        checkCount(); //checks the question number
}       else{
        
        result.style.visibility = 'visible';
        result.style.backgroundColor = 'yellow';
        result.innerHTML = '<p>Please make a selection!</p>'
        checkButton.disabled = false;
        }
}





function checkCount(){
    correctCount++;
    console.log(correctCount)
    //each time question count increases, it changes the score
    //setCount();
    currentScore.textContent = score;

    if(correctCount == 10){
        if(score>=7){
        winLose.style.backgroundColor = "green"
        winLose.style.visibility = 'visible';
        winLose.innerHTML += `<p>Your score is ${score}. YOU WIN!!!</p>`;
        setTimeout(function(){
        const winning = new Audio('./clapping.mp3');
        winning.play();
       },2000);
       
        //make playagain button available and check button to disappear
        playAgainButton.style.display = "block";
        //hide check my answer button
        checkButton.style.display = "none";}
        else if(score<7){
            result.innerHTML += `<p>Your score is ${score}. </p>`;
            winLose.style.visibility = 'visible';
            winLose.style.backgroundColor = "red";
            winLose.innerHTML += '<p>YOU LOST.TRY AGAIN!!!</p>'
            playAgainButton.style.display = "block";


        }

    }else{
        setTimeout(function(){
            callAPI();
        }, 2000);
    }
}

// function setCount(){
//     currentScore.textContent = score;
//  }

function restartGame(){
    score=0;
    correctCount=0;
    questionNumber=0;
    currentScore.textContent = score;
    playAgainButton.style.display = "none";
    checkButton.style.display = "block";
    checkButton.disabled = false;
    startGame.disabled = false;
    startGame.style.display="none";
    winLose.textContent = '';
    result.textContent = '';
    fiftyFifty.disabled='false';
    fiftyFifty.style.visibility = 'visible'
    audiencePoll.disabled='false';
    audiencePoll.style.visibility = 'visible';
    skip.style.visibility = 'visible'
    

    //setCount();
    callAPI()
}


//NOTES:
// DECODING ISSUE
//if word includes ~, run a function to change it into a regular stirng, but also updates it
// if u get special char from API, what u actually see is gibberish instead of that special character
//.replace

//reference: https://stackoverflow.com/questions/5796718/html-entity-decode

        //   function decodeEntities(encodedString) {
        //   var textArea = document.createElement('textarea');
        //   textArea.innerHTML = encodedString;
        //   return textArea.value;
        // }

