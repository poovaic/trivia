//PSEUDO CODE
//page loads: Don content Loaded:trivia content displayed, buttons are ready, score is at default/changed if its middle of the game
//


//choosing option
//player will select one of 4 lists
//after clicking check answer,that text of list should be checked with correct answer extracted from the api.. var correct answer
//if selected answer ==correct answer then score++
//

//VARIABLE KEY

const startGame = document.querySelector('#start_game')
let checkButton = document.querySelector('#check_answer') //check button
let playAgainButton = document.querySelector('#play_again') //play again button
let questionPara = document.querySelector('#ques')
let answer = document.querySelector('.answer_options')
let currentScore = document.getElementById('score')//current score
let constant = document.getElementById('total-questions')//constant 10
let correctAnswer="";
let score =0;
let correctCount=0; 
let constantScore=10;//total questions
let result = document.querySelector('.result') // result of quiz selection


//Calling the API and loadQuiz function
//startGame.addEventListener('click',callAPI);
async function callAPI(){
    //startGame.disabled=true;
    let response1 = await axios.get('https://opentdb.com/api.php?amount=1')
    console.log(response1)
    result.innerHTML = "";
    loadQuiz(response1.data.results[0])
}

function clicks(){
    checkButton.addEventListener('click', checkAnswer);
    playAgainButton.addEventListener('click', restartGame)
}

document.addEventListener('DOMContentLoaded',function(){
    callAPI()
    clicks()
    constant.textContent = constantScore; //constant of 10
    currentScore.textContent = score; //score will be incremented if selected is equal to correct answer in api call
})


// loads the question,correct and wrong answers

function loadQuiz(apiInput){ 
checkButton.disabled=false;

//extracts correct and wrong answer
correctAnswer = apiInput.correct_answer; // correct answer //regular expression or .replace
console.log(correctAnswer)

let wrongAnswer = apiInput.incorrect_answers;//wrong answer
console.log(wrongAnswer)
let answerList = wrongAnswer


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
//go through array and dynamically add it to li tags. 
//console.log(answer)
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
        result.innerHTML = '<p>You got that right!!!</p>';
        }else{
        result.innerHTML = `<p>Oops!!!Wrong answer :(.Correct Answer is : `+correctAnswer+`</p>`;
        }
        checkCount(); //checks the question number
    }else{
        result.innerHTML = '<p>Please make a selection!</p>'
        checkButton.disabled = false;
    }
}


//FUNCTION TO DECODE HTML ELEMENTS FROM API CALL
  //reference: https://stackoverflow.com/questions/5796718/html-entity-decode

        //   function decodeEntities(encodedString) {
        //   var textArea = document.createElement('textarea');
        //   textArea.innerHTML = encodedString;
        //   return textArea.value;
        // }
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


function checkCount(){
    correctCount++;
    console.log(correctCount)
    //each time question count increases, it changes the score
    //setCount();
    currentScore.textContent = score;

    if(correctCount == 5){
        if(score>=7){
        result.innerHTML += `<p>Your score is ${score}. YOU WIN!!!</p>`;
        //make playagain button available and check button to disappear
        playAgainButton.style.display = "block";
        //hide check my answer button
        checkButton.style.display = "none";}
        else if(score<7){
            result.innerHTML += `<p>Your score is ${score}. YOU LOSE!!!</p>`;

        }

    }else{
        setTimeout(function(){
            callAPI();//used load quiz here but didnt work
        }, 300);
    }
}
//  function setCount(){
//     currentScore.textContent = score;
//  }

function restartGame(){
    score=correctCount=0;
    playAgainButton.style.display = "none";
    checkButton.style.display = "block";
    checkButton.disabled = false;
    startGame.disabled = false;
    startGame.style.display="block";

    //setCount();
    callAPI()
}



//if word includes ~, run a function to change it into a regular stirng, but also updates it
// if u get special char from API, what u actually see is gibberish instead of that special character
//.replace 






/* question and options */
.body{
    display: flex-column;

}
.title{
    text-align:center;
    
}
.container{
    background-color: yellow;
    padding:1.5rem 4rem 3rem 4rem;
    width:600px;
    height:680px;
    border-radius: 1.5rem;
    box-shadow: 5px 5px  rgb(245, 171, 43);
    background-color: rgb(32, 25, 228);




}
.heading{
    text-align: center;
    font-size:2rem;
}
.quiz_container{
    position:absolute;
    top: 25%;
    left: 27%;
    display: flex;
    color: white ;
    background-color: rgb(32, 25, 228);
    height: 300px;
    width: 700px;
    border-radius: 10px;
    box-shadow: 5px 5px  rgb(245, 171, 43);
   
}

.answer_options li{
    margin:1rem,0;
    padding:.5rem,1.5 rem;
    cursor:pointer;
    border-radius:0.5rem;
    border: solid 2px,rgb(24, 24, 21);
    background-color:transparent;
    /* transition:var(--transition); */
    padding: 0px 10px;
    list-style: none;
}
.answer_options li:hover{
background-color: rgb(245, 171, 43);
color:black;
border-color:black;

}

.answer_options li:active{ 
    transform:scale(0.97);

    
}
.selected{
    background-color: rgb(245, 171, 43)!important;/*  if you use the !important rule, it will override ALL previous styling rules for that specific property on that element!*/
    color:black !important;
    border-color:black !important;
}
#play_again{
    display: none;
}
#start_game{
    display:block flex;
    top:30%;
    justify-content: center;
    text-align: center;
    align-self: center;
    
    
}
.result{
    padding: .7rem 0;
    text-align: center;
    font-weight: 600;
    font-size: 1.3rem;
}
.score_question_box{
    text-align:right;
    font-weight:600;
    font-size:1.2rem;
    border: 5px solid;
    margin-bottom:1 rem;
    width:150px;
    height: 50px;
    margin:.5rem auto;
}
.title{
    background
}