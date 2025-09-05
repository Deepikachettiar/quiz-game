//DOM elements
/*
// Access by ID
const title = document.getElementById("mainTitle");

// Access by class name
const items = document.getElementsByClassName("list-item");

// Access by tag name
const paragraphs = document.getElementsByTagName("p");

// Access using CSS selectors
const firstButton = document.querySelector("button");
const allButtons = document.querySelectorAll("button");
*/

const startscreen = document.getElementById('startscreen');
const quizscreen=document.getElementById('quiz-screen');
const resultscreen=document.getElementById('resultsscreen');
const startbutton=document.getElementById('startbtn');
const questiontext=document.getElementById('questions');
const anscontainer=document.getElementById('answers');
const currentquestion= document.getElementById('currentquestion');
const totalquestions=document.getElementById('totalquestions');
const scorespan= document.getElementById('score');
const maxscore=document.getElementById('maxscore');
const finalscore=document.getElementById('finalscore');
const resultmsg=document.getElementById('resultmsg');
const restartbutton=document.getElementById('restartbtn');
const progressbar=document.getElementById('progress');


//array contains the quesrtions and inside the array we have objects as question 
//add answers and inside the answers we have array of objects as text and correct
//and correct is boolean value

const questions=[
{
    question:"what does HTML stand for?",
    answers: [
        {text:"Hyper Text Markup Language",correct:true},
        {text:"Cascading Style Sheets",correct:false},
        {text:"Hyper Tick Market Language",correct:false},
        {text:"Hype Text Makeup Language",correct:false,}
    ],
},
{
    question:"What does CSS stand for?",
    answers: [
        {text:"Cascading Style Sheets",correct:true},
        {text:"Hyper Text Markup Language",correct:false},
        {text:"Creative Style Sheets",correct:false},
        {text:"Computer Style Sheets",correct:false,}
    ],
 },
{
    question :"Which HTML tag is used to define an internal style sheet?",
    answers:[
        {text:"<link>",correct:false},
        {text:"<style>",correct:true},
        {text:"<script>",correct:false},   
        {text:"<css>",correct:false}
    ],
},
{
    question:"why is JavaScript used?",
    answers:[
        {text:"to make the website loom colourfull",correct:false},
        {text:"to add the text to the website",correct:false},
        {text:"to make the website interactive",correct:true},
        {text:"to structure the website",correct:false,}
    ],
},
{
    question:"Which symbol is used for comments in JavaScript?",
    answers: [
        {text:"// for single line and /* */ for multi-line",correct:true},
        {text:"# for single line and ''' ''' for multi-line",correct:false},
        {text:"<!-- --> for single line and /* */ for multi-line",correct:false},
        {text:"// for single line and <!-- --> for multi-line",correct:false,}
    ],
}
];

//quiz state variables
let currentquestionindex=0;
let score=0;
let answersdisabled=false;//this is done for the button to get disabled intil the website gors tot the next page and if clicked twice tthe score does not have to doubleup.
totalquestions.textContent= questions.length; // this assigns the total questions value as the number of quetions increases
maxscore.textContent=questions.length;


//event listeners

startbutton.addEventListener("click",startquiz);
restartbutton.addEventListener("click",restartquiz);

function selectanswer(e)
{
    //optimization
    if(answersdisabled)
        return;

    answersdisabled=true;
    
    const selectedbtn=e.target;
    const iscorrect=selectedbtn.dataset.correct==="true";//dataset is used to access the data attribute of the html element


    //anscontainer.children is not an array we convert it into an array using Array.from
    Array.from(anscontainer.children).forEach((button)=>{
        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");
        }
        else
        {
            button.classList.add("incorrect");
        }
    });

    if(iscorrect)
    {
        score++;
        scorespan.textContent=score;
    }

    //setTimeout is a JavaScript function that runs a piece of code after a certain amount of time (in milliseconds).
    setTimeout(()=>{    //That’s an arrow function in JavaScript.It’s just a shorter way of writing a normal function.
        currentquestionindex++;

        if(currentquestionindex<questions.length)
        {
            showquestion();
        }

        else{
            showresults();
            console.log("quiz ended, showing results");
        }},1000);
}


function showquestion()
{
    //reset variables
    answersdisabled=false;

    const currentques=questions[currentquestionindex];

    currentquestion.textContent=currentquestionindex+1;
    const progresspercent=(currentquestionindex/questions.length)*100;
    progressbar.style.width=progresspercent+"%";
    questiontext.textContent=currentques.question;
    
    //usage of inner html. innerHTML is a property that allows u to change the string inside the html element 
    anscontainer.innerHTML="";// here we are clearing the previous options

    currentques.answers.forEach((answer)=>{
        const button=document.createElement("button");
        button.textContent=answer.text;
        button.classList.add("answerbtn");
    

        anscontainer.appendChild(button); // apendchild is a method that adds a node to the end of the list of children of a specified parent node.

        //dataset is a property that allows us to store extra information on an HTML element without using non-standard attributes.
        button.dataset.correct=answer.correct;
        button.addEventListener("click",selectanswer);

        });
}
function startquiz()
{
    console.log("quiz started");
    //reset variables
    currentquestionindex=0;
    score=0;
    scorespan.textContent=0;

    startscreen.classList.remove('active');
    quizscreen.classList.add('active');

    showquestion();
}




function restartquiz()
{
    console.log("quiz restarted");
    restartquiz();
}

function showresults()
{
    quizscreen.classList.remove('active');
    resultscreen.classList.add("active");

    finalscore.textContent=score;

    const percent=(score/questions.length)*100;

    if(percent==100)
    {
        resultmsg.textContent="Perfect! You're a genius!";

    }
    else if(percent>=80){
        resultmsg.textContent="Excellent work! You really know your stuff.";
    }
    else if(percent>=60){
        resultmsg.textContent="Good job! Keep Learning.";
    }
    else if(percent>=40){
        resultmsg.textContent="Not bad, but there's room for improvement.";
    }
    else
    {
        resultmsg.textContent="Better luck next time. Don't give up!";
    }
}

function restartquiz()
{
    console.log("quuiz restarted");
    resultscreen.classList.remove('active');
    startquiz();
}
