var nemo,nemoImg, shark, sharkImg;
var water, waterImg;
var mask,maskImg;
var bag, bagImg;
var net, netImg;
var score, gameOver, gameOverImg, gameOverSound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
 // loading images and animations
 nemoImg = loadImage("nemoImg.png");
 waterImg = loadImage("water4.jpg");
 sharkImg = loadImage("shark2.png");
 maskImg = loadImage("mask2.png");
 bagImg = loadImage("bag.png");
 netImg = loadImage("net3.png");
 gameOverImg = loadImage("gameOver.png");
 gameOverSound = loadSound("gameOver.wav");
 
}

function setup() {
   createCanvas(windowWidth,windowHeight);
   //createCanvas(windowWidth, windowHeight);

   // creating a background image
   water = createSprite(windowWidth, windowHeight);
   //water = createSprite(width- 320, height - 220);
   water.addImage( waterImg);
   water.velocityX = -6;
   water.scale = 2.9;

    // creating nemo
   nemo = createSprite(100,height/2,10,10);
   //nemo = createSprite(width - 400, height - 50);
   nemo.addImage("nemo", nemoImg);
   nemo.scale = 0.3;
   nemo.debug = false;

   // creating edges
   edges = createEdgeSprites();

   // //creating shark
   // shark = createSprite (110,290,10,10);
   // //shark = createSprite(width - 650, height - 50);
   // shark.addImage("shark",sharkImg);
   // shark.scale = 0.35;

    gameOver = createSprite(width/2, height/2);
    gameOver.addImage("gameOver", gameOverImg);
    gameOver.visible = false;
    gameOver.scale = 0.8;

   //creating a group for obstacles
   obstaclesGroup = createGroup();

   // setting score to zero
   score = 0;
}

function draw() {
    // making background
    background("white");
  
    drawSprites();

    // making scoring system
    if(gameState === PLAY){
    score = score+ Math.round(getFrameRate()/60);

    // AI for the shark
    //shark.y = nemo.y;

    // reseting the backgroung
    if(water.x < 0){
      water.x = width/1.5;
    }

    // if(keyDown("space") && nemo.y >290){
    //   nemo.y = -2;
    // }

    //nemo.velocityY = nemo.velocityY + 0.8

    // controlling nemo through mouse
    nemo.y = World.mouseY;
//     if(keyDown("up")){
//       nemo.y = nemo.y - 3;
//     }
      
//     if(keyDown("down")) {
//       nemo.y = nemo.y + 3;
//     }

    //colliding the sprites with edges
    nemo.collide(edges);
    //shark.collide(edges);

    // spawnMask();
    // spawnNet();
    // spawnBag();

    spawnObstacles();
   
     //if(shark.isTouching)
    
    //xchanging gameState to END
    if(nemo.isTouching(obstaclesGroup)){
     gameState = END;
     gameOverSound.play();
    }
   }
    else if(gameState === END){
     // text for reseting
     fill("white");
     textSize(30)
     text("Press 'R' to Restart...", width/2 - 100, height/2+ 50);
      
      
     
     // stopping water's velocity 
     water.velocityX = 0;
      
     // to make gameOver visible
     gameOver.visible = true;
     
     // destroy obstacles
     obstaclesGroup.destroyEach();
     obstaclesGroup.setVelocityXEach(0);
     
     // killing nemo
     nemo.visible = false;
      
     // setting shark's y position
     //shark.y = 250;

     // moving to reset function
     if(keyDown("r")) {
       reset();
     }
  }  
   // displaying score text and sprites
   
   fill("white");
   textSize(20);
   text("Score:  "+ score, width - 130,25);
}
function spawnObstacles(){
  // randomly spawning obstacles
  if(frameCount% 150 === 0){
  var obstacle = createSprite(windowWidth,300,10,10);
  
  obstacle.y = Math.round(random(nemo.x,windowHeight - 50));
  obstacle.scale = 0.3;
    
  // increasing obstacles' velocity as the game goes on
  obstacle.velocityX = -(2 + frameCount/100);
    
  // stopping nemo from dissapearing before it looks like it is touching the obstacles
  obstacle.debug = false;
  obstacle.setCollider("rectangle", 0,0, 200, 50);
  
  // adding different images to obstacles
  var rand = Math.round(random(1,3))
  switch(rand){
    case 1 : obstacle.addImage( sharkImg);break;
    case 2 : obstacle.addImage( netImg); break;
    case 3 : obstacle.addImage( bagImg); break;
    default : break;
   }
  // destroying obstacles
  obstaclesGroup.lifetime = -1;
    
  // adding obstacles to the group
  obstaclesGroup.add(obstacle);
 } 
}

function reset(){
  // changing gameState to PLAY
  gameState = PLAY;
  
  // setting everything to it's original way
  gameOver.visible = false;
  nemo.visible = true;
  score = 0;
  water.velocityX = -6;
  
}
  
// function spawnMask(){
//   if(frameCount%150 === 0){
//     //var rand = Math.round(random(1,10))
//     mask = createSprite(100,300,10,10);
//     mask.x = Math.round(random(400,600));
//     mask.y = Math.round(random(100,300));
//     mask.addImage("mask", maskImg);
//     mask.scale = 0.3;
//     mask.velocityX = -3;
    
//     mask.depth = nemo.depth;
//     nemo.depth = nemo.depth ++;
//     mask.depth = shark.depth;
//     shark.depth = shark.depth ++;
//   }
// }

// function spawnBag(){
//   if(frameCount%190 === 0){
//     //var rand = Math.round(random(1,10))
//     bag = createSprite(100,300,10,10);
//     bag.x = Math.round(random(400,600));
//     bag.y = Math.round(random(100,300));
//     bag.addImage("bag", bagImg);
//     bag.scale = 0.3;
//     bag.velocityX = -3;
    
//     mask.depth = nemo.depth;
//     nemo.depth = nemo.depth ++;
//     mask.depth = shark.depth;
//     shark.depth = shark.depth ++;
//   }
// }

// function spawnNet(){
//   if(frameCount%250 === 0){
//     //var rand = Math.round(random(1,10))
//     net = createSprite(100,300,10,10);
//     net.x = Math.round(random(400,600));
//     net.y = Math.round(random(100,300));
//     net.addImage("net", netImg);
//     net.scale = 0.5;
//     net.velocityX = -3;
    
//     mask.depth = nemo.depth;
//     nemo.depth = nemo.depth ++;
//     mask.depth = shark.depth;
//     shark.depth = shark.depth ++;
//   }
// }