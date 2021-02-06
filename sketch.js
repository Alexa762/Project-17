var PLAY=1;
var END=0;
var gameState=1;
var sword,swordImage;
var monster,monsterImage;
var score;
var fruitGroup,enemyGroup;
var gameOverImage;

function preload(){
swordImage= loadImage("sword.png");
monsterImage= loadImage("alien1.png","alien2.png");
fruit1=loadImage("fruit1.png");
fruit2=loadImage("fruit2.png");
fruit3=loadImage("fruit3.png");
fruit4=loadImage("fruit4.png");
gameOverImage=loadImage("gameover.png");
}

function setup(){
  createCanvas(600,400);
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  fruitGroup=new Group();
  enemyGroup=new Group();
  score=0;
}

function draw(){
  background(180);
  text("score:"+score,500,50);
  
  if(gameState===PLAY){
    sword.x=World.mouseX;
    sword.y=World.mouseY;
  }
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score=score+2;
  }
  if(enemyGroup.isTouching(sword)){
    gameState=END;
     }
  else if(gameState===END){
    sword.addImage(gameOverImage);
    sword.x=200;
    sword.y=200;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityEach(0);
    enemyGroup.setVelocityEach(0);
    }
  
  drawSprites();
  fruits();
  Enemy();
}
function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(600,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    } else if(r==2){
      fruit.addImage(fruit2);
    } else if(r==3){
      fruit.addImage(fruit3);
    } else if(r==4){
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
    }
}
  function Enemy(){
    if(World.frameCount%200===0){
      monster=createSprite(600,200,20,20);
      monster.addAnimation("moving",monsterImage);
      monster.y=Math.round(random(100,300));
      monster.velocityX=-8;
      monster.setLifetime=50;
      
      enemyGroup.add(monster);
     }
}

