var gamePattern=[];
var userChosenPattern=[]
var buttonColours=["red","blue","green","yellow"];
var level=0;
function nextSequence(){
  level++;
  userChosenPattern=[];
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut().fadeIn();
  document.getElementById("level-title").innerText="Level "+level;
  playSound(randomChosenColour);
  
}
$(".btn").click(function(){
  var userChosenColour=this.id;
  userChosenPattern.push(userChosenColour);
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(userChosenPattern.length-1);
});

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setInterval(() =>{
    $("#"+currentColour).removeClass("pressed");
  },100);

}
$(document).keydown(function(event){
  console.log(event.key);
  nextSequence();
});
function checkAnswer(currentAnswer){
  if(userChosenPattern[currentAnswer]===gamePattern[currentAnswer]){
    console.log("success");
    if(userChosenPattern.length===gamePattern.length){
     setTimeout(() => {
      nextSequence();
     }, 1000);
     
    }
    
  }else{
    console.log("wrong");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
      setInterval(()=>{
        $("body").removeClass("game-over");
      },1000);
    document.getElementById("level-title").innerText="Game Over, Press Any Key to Restart";
    startOver();
  }
  
}
function startOver(){
  gamePattern=[];
  level=0; 
}

