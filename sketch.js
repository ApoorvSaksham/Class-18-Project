var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var racer2, racer2Animation;
var racer3, racer3Animation;
var racer4, racer4Animation;
var racerA, racerB, racerC;
var racer2Grp;
var racer3Grp;
var racer4Grp;
var bellSound;
var cycleBell, cycleBellImage;
var reset, resetImage;
var gameOver , gameOverImage;
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
 bellSound = loadSound("bell.mp3");
  cycleBellImage = loadImage("cycleBell.png");
  resetImage = loadImage("reset.png");
  gameOverImage = loadImage("gameover.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  racer2Animation = loadAnimation("opponent1.png","opponent2.png");
  racer3Animation = loadAnimation("opponent4.png","opponent5.png");
  racer4Animation = loadAnimation("opponent7.png","opponent8.png");
  racerA = loadAnimation("opponent3.png");
  racerB = loadAnimation("opponent6.png");
  racerC = loadAnimation("opponent9.png");
  
  
}

function setup(){
  
createCanvas(windowWidth, windowHeight);
  
// Moving background
path=createSprite(windowWidth-300,windowHeight-370,windowWidth, windowHeight);
path.addImage(pathImg);
path.scale = 0.5;
path.velocityX = -5;
//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("Cycling",mainRacerImg1);
mainCyclist.scale=0.082;
mainCyclist.debug=false;
mainCyclist.setCollider("rectangle",0,0,1080,1170);
  
reset = createSprite(windowWidth/2,(windowHeight/2)+102,20,20);
reset.addImage("resetImg",resetImage);
reset.scale = 0.27;
reset.visible = false;
  
cycleBell = createSprite((width/2)-160,35,20,20);
cycleBell.addImage("cycle bell", cycleBellImage);
cycleBell.scale = 0.27;

gameOver = createSprite(windowWidth/2,(windowHeight/2)-100,20,20);
gameOver.addImage("gameOverPic",gameOverImage);
gameOver.scale = 0.6;
gameOver.visible = false;
  
  
  racer2Grp = createGroup();
  racer3Grp = createGroup();
  racer4Grp = createGroup();
  
}

function draw() {
  //code to reset the background
  if(path.x<width-1000){
    path.x = width-300;
  }
  
  if(gameState===PLAY){
    
  path.velocityX = -(4 + 2*distance/250)
  mainCyclist.y = World.mouseY;
  distance = distance + Math.round(getFrameRate()/50);
  edges= createEdgeSprites();
  mainCyclist.collide(edges);
  if(mousePressedOver(cycleBell)){
    bellSound.play();
  }
  
   if(frameCount%300===0){
     var select_Cyclist = Math.round(random(1,4));
     if(select_Cyclist===1){
       yellowCR();
     }
     else if(select_Cyclist===3){
       pinkCR();
     }
     else{
       redCR();
     }
   }
   if(racer2Grp.isTouching(mainCyclist)){
     racer2.addAnimation("racer2Anim",racerA);
     racer2.velocityX = 0;
     racer2Grp.setLifetimeEach(-1);
     mainCyclist.addAnimation("Cycling",mainRacerImg2);
     racer3Grp.destroyEach();
     racer4Grp.destroyEach();
     gameState=END;
    }
    if(racer3Grp.isTouching(mainCyclist)){
      racer3.addAnimation("racer3Anim",racerB);
      racer3.velocityX = 0;
      racer3Grp.setLifetimeEach(-1);
      racer2Grp.destroyEach();
      racer4Grp.destroyEach();
      mainCyclist.addAnimation("Cycling",mainRacerImg2);
      gameState=END;
    }
    if(racer4Grp.isTouching(mainCyclist)){
      racer4.addAnimation("racer4Anim",racerC);
      racer4.velocityX = 0;
      racer4Grp.setLifetimeEach(-1);
      racer2Grp.destroyEach();
      racer3Grp.destroyEach();
      
      mainCyclist.addAnimation("Cycling",mainRacerImg2);
      gameState=END;
    }
  }
    else if(gameState===END){
      
      path.velocityX =0;
      path.velocityy = 0;
      distance = distance+0
      reset.visible = true;
      gameOver.visible = true;
      
   if(mousePressedOver(reset)){
   restart();
    }
    
}
  
  drawSprites();

  textSize(30);
  fill("red");
  stroke("blue");
  textFont("Algeria");
  text("Press         to ring the Cycle Bell", (width/2)-266,45);
  
   textSize(25);
  fill("yellow");
  stroke("red");
  textFont("Algeria");
  text("Distance: "+ distance+" m",width-200,30);
  
  if(gameState===END){
  textSize(35);
  fill("cyan");
  stroke("blue");
  textFont("Algeria");
  text("Click               to REPLAY",(width/2)-143,(height/2)+102);
  
  }
}

function  pinkCR(){
racer2 = createSprite(width-10,random(height-600,height-80),20,20);
racer2.addAnimation("racer2Anim",racer2Animation);
racer2.scale = 0.075;
racer2.lifetime = 800;
racer2.velocityX = -(3 + 2*distance/250);
racer2Grp.add(racer2);


}
function  yellowCR(){
  racer3 = createSprite(width-10,random(height-600,height-80),20,20);
  racer3.addAnimation("racer3Anim",racer3Animation);
  racer3.scale = 0.075;
  racer3.lifetime = 800;
  racer3.velocityX = -(3 + 2*distance/250);
 racer3Grp.add(racer3);

}
function  redCR(){
  racer4 = createSprite(width-10,random(height-600,height-80),20,20);
  racer4.addAnimation("racer4Anim",racer4Animation);
  racer4.scale = 0.075;
  racer4.lifetime = 800;
  racer4.velocityX = -(3+ 2*distance/250);
  racer4Grp.add(racer4);

}
function restart(){
    distance = 0;
  gameState = PLAY;
  racer2Grp.destroyEach();
  racer3Grp.destroyEach();
  racer4Grp.destroyEach();
  reset.visible = false;
  gameOver.visible = false;
  mainCyclist.addAnimation("Cycling",mainRacerImg1);
}