var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cactusImage1, cactusImage2,cactusImage3,cactusImage4,cactusImage5,cactusImage6
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jumpSound
var dieSound
var checkPointSound

function preload() 
{
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");

    groundImage = loadImage("ground2.png")
  
    cloudImage = loadImage("nobgcloud.png")
  
    cactusImage1 = loadImage("obstacle1.png")
    cactusImage2 = loadImage("obstacle2.png")
    cactusImage3 = loadImage("obstacle3.png")
    cactusImage4 = loadImage("obstacle4.png")
    cactusImage5 = loadImage("obstacle5.png")
    cactusImage6 = loadImage("obstacle6.png")
    restartImage = loadImage("restart.png")
    gameoverImage = loadImage("gameOver-1.png")
    jumpSound = loadSound("jump.mp3")
    dieSound = loadSound("die.mp3")
    checkPointSound = loadSound("checkPoint.mp3")
  
}

function setup() 
{
    createCanvas(600, 200);

    obstaclesGroup = new Group();
    cloudsGroup = new Group();
  
  
    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("dead", trex_collided);
    trex.scale = 0.5;

    trex.debug = false;
    trex.setCollider("circle",0,0,45)
    //create a ground sprite
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    
    gameOver = createSprite (300,90)
    gameOver.addImage (gameoverImage);
    gameOver.scale = 0.7
    
  
    restartButton = createSprite (300,130)
    restartButton.addImage (restartImage)
    restartButton.scale = 0.5
    
  
    invisibleGround=createSprite(300,205,600,20);
    invisibleGround.visible=false;
}

function draw() 
{
    //console.log(trex.y)
    background("red");
    textSize (14)
    text("Score:" + score,30,30)
    
    //jump when the space button is pressed
    

    trex.velocityY = trex.velocityY + 0.9

      if(gameState === PLAY)
      {
     
      score = frameCount
      if(frameCount % 500 === 0)
      {
        checkPointSound.play()
      }
        
        
        
        
      if (keyDown("space")&& trex.y>170)
    {
      trex.velocityY = -13
      jumpSound.play()
    }
        
        
      if (ground.x < 0) 
    {
      ground.x = ground.width / 2;
    }
        
      spawnClouds();  
      spawnObstacles();
      
      if(trex.isTouching(obstaclesGroup))
      {
        dieSound.play()
        gameState = END;
        //trex.velocityY = -13;
      }
     
      restartButton.visible=false;
      gameOver.visible=false;
      ground.velocityX = -(6 + (frameCount / 50)/2);
}
  
  
  
    else if(gameState === END)
      {
      ground.velocityX = 0;
        
      obstaclesGroup.setVelocityXEach(0)
      cloudsGroup.setVelocityXEach(0)
      cloudsGroup.setLifetimeEach(-1)
      obstaclesGroup.setLifetimeEach(-1)
      
      restartButton.visible=true;
      gameOver.visible=true;
      
      trex.changeAnimation("dead", trex_collided);
        
      if (mousePressedOver(restartButton))
        {
          restart()
        }
        
        
      }
  
  
  
    trex.collide(invisibleGround);
  
  //console.log(frameCount)
    
  drawSprites();
}

function restart()
{
  gameState = PLAY;
  cloudsGroup.destroyEach()
  obstaclesGroup.destroyEach()
  trex.changeAnimation("running", trex_running);
  frameCount = 0;
   ground.velocityX = -6
  
}


function spawnClouds()
{
  if(frameCount%250 === 0)
     {
     cloud = createSprite(600,random(10,85),20,20)
     cloud.velocityX = -0.7;
     cloud.addImage(cloudImage)
     cloud.scale = 0.26
     cloud.lifetime = 900
       trex.depth = cloud.depth +1
       
       cloudsGroup.add(cloud)
     }
}


function spawnObstacles()
{
   if(frameCount % 70 === 0)
     {
       cactus = createSprite (600,165,40,40)
       cactus.velocityX = -(6 + (frameCount / 50)/2)
       num = round(random(1,6))
       cactus.scale = 0.6
       cactus.lifetime = 110
       switch(num)
       {
         case 1 : cactus.addImage(cactusImage1)
          break;
          
         case 2 : cactus.addImage(cactusImage2)
          break;
              
              
         case 3 : cactus.addImage(cactusImage3)
          break;    
              
         case 4 : cactus.addImage(cactusImage4)
          break;  
         
          
         case 5 : cactus.addImage(cactusImage5)
          break;  
          
          
         case 6 : cactus.scale = 0.55; cactus.addImage(cactusImage6)
          break;  
       }
       
       obstaclesGroup.add(cactus);
     }
  
  
  
  
  
  
  
  
}
