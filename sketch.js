var dog, dogImg, happyDog, database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
  dogImg = loadImage("Dog(1).png");
happyDog = loadImage("happydog(1).png");
}

function setup() {
  database = firebase.database();   
  createCanvas(500, 500);
  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodObj = new Food();
  feed = createButton("Feed The Dog");
  feed.postion(700, 95);
  feed.mousePressed(feedDog);
  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFoof.mousePressed(addFoods);
}


function draw() {  


background(46, 139, 87);
fedTime = database.ref('Feed Time');
feedTime.on("value", function(data){
lastFed = data.val;
})
foodObj.display();
drawSprites();
fill("black");
text("Remaining Food: " + foodS, 200, 120);
textSize(20)
text("Note: Press UP_ARROW Key To Feed Drago Milk", 40, 20)
}

function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<=0){
  x = 0;
  }else{
    x = x - 1;
  }
  database.ref('/').update({
    Food:x
  })
}
function addFood(){
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}
function feedDog(){
  dog.addImage("happyDog(1).png");
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour
  })
}
