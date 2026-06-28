const splash = document.getElementById("splash");
const welcome = document.getElementById("welcome");
const language = document.getElementById("language");

setTimeout(() => {
    splash.classList.remove("active");
    welcome.classList.add("active");
}, 3000);

document.getElementById("startBtn").addEventListener("click", () => {

    welcome.classList.remove("active");

    language.classList.add("active");

});

function selectLanguage(lang){

localStorage.setItem("language",lang);

language.classList.remove("active");

document.getElementById("dashboard").classList.add("active");

document.getElementById("selectedLanguage").innerHTML="🌍 "+lang;

}

const words=[

{
word:"Apple 🍎",
meaning:"Manzana",
example:"I eat an apple every day."
},

{
word:"Book 📚",
meaning:"Libro",
example:"She bought a new book."
},

{
word:"Water 💧",
meaning:"Agua",
example:"Drink enough water."
},

{
word:"House 🏠",
meaning:"Casa",
example:"My house is beautiful."
},

{
word:"Friend 😊",
meaning:"Amigo",
example:"My friend is very kind."
}

];

let currentWord=0;

function nextWord(){

currentWord++;

if(currentWord>=words.length){

currentWord=0;

}

document.getElementById("word").innerHTML=words[currentWord].word;

document.getElementById("meaning").innerHTML="Meaning: "+words[currentWord].meaning;

document.getElementById("example").innerHTML="Example: "+words[currentWord].example;

}

function goDashboard(){

document.getElementById("vocabulary").classList.remove("active");

document.getElementById("dashboard").classList.add("active");

}

function openVocabulary(){

document.getElementById("dashboard").classList.remove("active");

document.getElementById("vocabulary").classList.add("active");

}

const flashcards = [

{front:"Apple 🍎",back:"Manzana"},

{front:"Book 📚",back:"Libro"},

{front:"Water 💧",back:"Agua"},

{front:"Friend 😊",back:"Amigo"},

{front:"House 🏠",back:"Casa"}

];

let flashIndex = 0;

function openFlashcards(){

document.getElementById("dashboard").classList.remove("active");

document.getElementById("flashcards").classList.add("active");

updateFlashcard();

}

function flipCard(){

document.getElementById("flashcard").classList.toggle("flip");

}

function updateFlashcard(){

document.getElementById("flashcard").classList.remove("flip");

document.getElementById("frontText").innerHTML=flashcards[flashIndex].front;

document.getElementById("backText").innerHTML=flashcards[flashIndex].back;

}

function nextFlashcard(){

flashIndex++;

if(flashIndex>=flashcards.length){

flashIndex=0;

}

updateFlashcard();

}

function previousCard(){

flashIndex--;

if(flashIndex<0){

flashIndex=flashcards.length-1;

}

updateFlashcard();

}

function backDashboard(){

document.getElementById("flashcards").classList.remove("active");

document.getElementById("dashboard").classList.add("active");

}

const quizData=[

{
question:"What is Apple in Spanish?",
options:["Libro","Casa","Manzana","Agua"],
answer:2
},

{
question:"What is Book in Spanish?",
options:["Libro","Perro","Agua","Casa"],
answer:0
},

{
question:"What is Water in Spanish?",
options:["Casa","Agua","Libro","Amigo"],
answer:1
},

{
question:"What is Friend in Spanish?",
options:["Casa","Perro","Amigo","Libro"],
answer:2
}

];

let quizIndex=0;

let quizScore=0;

function openQuiz(){

document.getElementById("dashboard").classList.remove("active");

document.getElementById("quiz").classList.add("active");

loadQuestion();

}

function loadQuestion(){

const q=quizData[quizIndex];

document.getElementById("question").innerHTML=q.question;

const btns=document.getElementsByClassName("option");

for(let i=0;i<4;i++){

btns[i].innerHTML=q.options[i];

btns[i].classList.remove("correct","wrong");

}

document.getElementById("score").innerHTML="Score : "+quizScore;

}

function checkAnswer(choice){

const btns=document.getElementsByClassName("option");

if(choice==quizData[quizIndex].answer){

btns[choice].classList.add("correct");

quizScore++;

}else{

btns[choice].classList.add("wrong");

btns[quizData[quizIndex].answer].classList.add("correct");

}

document.getElementById("score").innerHTML="Score : "+quizScore;

setTimeout(()=>{

quizIndex++;

if(quizIndex>=quizData.length){

showResult();

goHome();

}else{

loadQuestion();

}

},1000);

}

function goHome(){

document.getElementById("quiz").classList.remove("active");

document.getElementById("dashboard").classList.add("active");

}
function showResult(){

document.getElementById("quiz").classList.remove("active");

document.getElementById("result").classList.add("active");

document.getElementById("finalScore").innerHTML=
"Score : "+quizScore+" / "+quizData.length;

let xp=quizScore*25;
document.getElementById("xpValue").innerHTML=xp;

document.getElementById("earnedXP").innerHTML=
"⭐ XP Earned : "+xp;

let best=localStorage.getItem("bestScore");

if(best==null || quizScore>best){

localStorage.setItem("bestScore",quizScore);

best=quizScore;
if(quizScore==quizData.length){

document.getElementById("badge").innerHTML=

"🥇 Gold Badge";

}

else if(quizScore>=3){

document.getElementById("badge").innerHTML=

"🥈 Silver Badge";

}

else{

document.getElementById("badge").innerHTML=

"🥉 Bronze Badge";
}
}

document.getElementById("bestScore").innerHTML=
"🏆 Best Score : "+best;

}
function backToDashboard(){

document.getElementById("result").classList.remove("active");

document.getElementById("dashboard").classList.add("active");

quizIndex=0;

quizScore=0;

}
function toggleTheme(){

document.body.classList.toggle("dark");

}
function saveFavourite(){

localStorage.setItem("favoriteWord",

document.getElementById("word").innerHTML);

alert("❤️ Saved to Favorites");

}
function showDashboard(){

document.querySelectorAll(".screen").forEach(screen=>{

screen.classList.remove("active");

});

document.getElementById("dashboard").classList.add("active");

}

function openProgress(){

document.querySelectorAll(".screen").forEach(screen=>{

screen.classList.remove("active");

});

document.getElementById("progressScreen").classList.add("active");

}
function resetProgress(){

localStorage.clear();

alert("Progress Reset Successfully!");

location.reload();

}
function openProfile(){

showDashboard();

document.getElementById("dashboard").classList.remove("active");

document.getElementById("profile").classList.add("active");

document.getElementById("profileLanguage").innerHTML =
"🌍 Language : " + localStorage.getItem("language");

document.getElementById("profileXP").innerHTML =
"⭐ XP : " + document.getElementById("xpValue").innerHTML;

document.getElementById("profileFavorite").innerHTML =
"❤️ Favourite : " +
(localStorage.getItem("favoriteWord") || "None");

document.getElementById("profileBest").innerHTML =
"🏆 Best Score : " +
(localStorage.getItem("bestScore") || "0");

}
window.onload=()=>{

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},1500);

}
const today=new Date();

document.getElementById("todayDate").innerHTML=

today.toDateString();
setInterval(()=>{

const now=new Date();

document.getElementById("clock").innerHTML=

now.toLocaleTimeString();

},1000);
const quotes=[

"Learn something new today 🌟",

"Small steps every day 🚀",

"Practice makes perfect 💯",

"Knowledge is power 📚",

"Keep learning, keep growing 🌍"

];

document.getElementById("quote").innerHTML=

quotes[Math.floor(Math.random()*quotes.length)];