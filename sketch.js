//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  //database
  database = firebase.database();
  //dog
  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.25;
  //foodstock
  foodStock = database.ref("food");
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg)
  }
  drawSprites();
  //add styles here
  fill("white");
  textSize(15);
  text("Note: Press UP_ARROW to feed Drago milk!", 100, 20);
  text("Food Remaining: "+foodS, 170, 40)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    food: x
  })
}


