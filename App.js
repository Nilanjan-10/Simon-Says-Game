let gameSeq=[];
let userSeq=[];

let btns = ["yellow", "red", "purple" , "green"];


let started = false; //false is in build which mean not happening and not started
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){ // keypress is a event inside addEventListener that sense in the obj that anykey is press or not 
    if (started == false){
        console.log("game is started")
        started = true;  // for that game only started once 
      
        levelUp(); // so when game start then we call the levelUp
    }
});

function gameFlash(btn) { // this funtion does white flash
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  },250); // 1000 is a settime where it time of showing flah (1sec)
}

function userFlash(btn) {  // this funtion does green flash
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  },250); 
}

function levelUp(){//this function meaning what level is happening we ahve to reach another level
  userSeq = []; // when usercall or level up we set this to an empty value because we have to repeat the seq from scratch
    level++;//level up
    h2.innerText = `Level ${level}`; // when level up change the h2 text  for that i already acess h2
    
    let randIdx = Math.floor(Math.random() * 3);// choosing random index from 0 to 3
    let randColor = btns[randIdx];// for the help of random index choose a random color 
    let randBtn = document.querySelector(`.${randColor}`); 
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
  if (userSeq[idx] === gameSeq[idx]){ // checking is gameSeq same as last userSeq
    if (userSeq.length == gameSeq.length){
    setTimeout(levelUp, 1000); // it does level up and update h2 inner and genarate other random color
    }
  } else{
     h2.innerHTML = `Game over! Your score was <b>${level}</b <br> Press any key to start.`;
     document.querySelector("body").style.backgroundColor = "red";
     setTimeout(function(){ //  this is for red color when your guessing is wrong
     document.querySelector("body").style.backgroundColor = "white"; // now to white
     }, 150);
     reset();
  }

}

function btnPress(){
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor); // user last enter color

  checkAns(userSeq.length-1); // it does only print current level and print current level
}

let allBtns = document.querySelectorAll(".btn"); // Acess all btn class 
for (btn of allBtns){ // deploy a loop for all btn 
  btn.addEventListener("click" , btnPress);//here we pass the callback of btnPress when btnPress is click then it run that function and print btn was pressed.for the help of eventListener 
}

function reset(){ // for reset everything
  started = false;
  gameseq = [];
  userSeq = [];
  level = 0;
}