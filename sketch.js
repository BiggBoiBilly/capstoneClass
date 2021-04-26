var ghost, ghostImg, bg, bgImg ; 
var door, doorImg , obstacleGroup;
var climber , climberImg;
var invis, invis2;

var gameState, play, end ;

play = 1
end = 0;
gameState = play;







function preload(){

    bgImg = loadImage("tower.png");
    ghostImg = loadImage("ghost-standing.png");

    doorImg = loadImage("door.png");
    climberImg = loadImage("climber.png");


}


function setup(){

    

    createCanvas(400, 600);

    ghost = createSprite(200, 400, 10 ,10);
    ghost.addImage("ghost", ghostImg);
    ghost.scale = 0.4;

    bg = createSprite(200, 200, 400 ,600);
    bg.addImage("bg", bgImg);
    bg.scale = 0.7;
    bg.depth = ghost.depth;
    ghost.depth = ghost.depth +1;
    bg.velocityY = 3;


    obstacleGroup = new Group();


}


function draw(){


    background("yellow");


    textSize(40);
    fill("red");
    text("GAME OVER!!", 60, 300);
    


if (gameState === play){
    

    if(bg.y > 400){
        bg.y = 200;
    }


    if(keyDown("left_arrow")) {
        ghost.x = ghost.x -6;
    }

    if(keyDown("right_arrow")) {
        ghost.x = ghost.x + 6;
    }    





    //godown
    if(keyDown("space")){
    ghost.velocityY =  -8;
    }

    ghost.velocityY = ghost.velocityY + 0.8;





    spawnDoor();
   

    if(obstacleGroup.isTouching(ghost)  || 
    ghost.y > 650 ||
    ghost. x > 450||
    ghost.x< -50||
    ghost.y< -50){
        gameState = end;
    }




}


if (gameState === end){
    ghost.destroy();

    obstacleGroup.destroyEach();
}

    drawSprites();
}



function spawnDoor(){
 
    if(frameCount % 100 === 0){
        
        door = createSprite(200, -70 , 10 ,10);
        door.addImage("door", doorImg);
        door.velocityY = 7;
        door.lifetime = 500;
        obstacleGroup.add(door);
     

        climber = createSprite(200, -10 , 10 ,10);
        climber.addImage("climber", climberImg);
        climber.velocityY = 7;
        climber.lifetime = 500;
        obstacleGroup.add(climber);
        

        invis = createSprite(200, 0 , 60  ,5);
       // invis.addImage("climber", climberImg);
        invis.velocityY = 7;
        invis.width = climber.width;
        invis.visible = false;
        invis.lifetime = 500;
        obstacleGroup.add(invis);

        invis2 = createSprite(200, -15 , 60  ,5);
        // invis.addImage("climber", climberImg);
         invis2.velocityY = 7;
         invis2.width = climber.width;
         invis2.lifetime = 500;
         invis2.visible = false;


         door.x = Math.round(random(60 , 340));
        climber.x = door.x;
        invis.x = door.x;

         

    }


}
