let firstRun = true;
let myImage; 

// canvas centre
let x = 320
let y = 240
let maskRadius = 220; 

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);
  background(0)

   if(firstRun){
    myImage = loadImage('diskteaxture.png')
    firstRun = false;
   }

 //disk mask
drawingContext.save();
drawingContext.beginPath();
drawingContext.arc(x, y, maskRadius, 0, 360); // use degrees
drawingContext.clip();

//disk colour 
fill(20)
circle (x,y,440) 


//pulsing circle using vocal
let shapeRatio1 = vocal / 100; //scaling vocal values to be between 0 - 1
let redShape1 = lerp(255, 0, shapeRatio1);   // orange to blue
let greenShape1 = lerp(136, 200, shapeRatio1); // orange to blue
let blueShape1 = lerp(0, 255, shapeRatio1);   // orange to blue
let vocalScale = map(vocal, 0, 100, 20, 300);

for (let sizeShape1 = vocalScale; sizeShape1 > 0; sizeShape1 -= 5) {
  let fadeShape1 = map(sizeShape1, 0, vocalScale, 0, 80); // fade edges
  fill(redShape1, greenShape1, blueShape1, fadeShape1);              // cyan glow
  noStroke();
  ellipse(150, 100, sizeShape1, sizeShape1);
  }

//pulsing oval using drum
let shapeRatio2 = drum/ 100; //scaling vocal values to be between 0 - 1
let redShape2   = lerp(252, 3, shapeRatio2);   // gold to blue
let greenShape2 = lerp(194, 7, shapeRatio2);   // gold to blue
let blueShape2  = lerp(3, 252, shapeRatio2);   // gold to blue
let drumScale = map(drum, 0, 100, 20, 300);

for (let sizeShape2 = drumScale; sizeShape2 > 0; sizeShape2 -= 5) {
  let fadeShape2 = map(sizeShape2, 0, drumScale, 0, 80); // fade edges
  fill(redShape2, greenShape2, blueShape2, fadeShape2);              // cyan glow
  noStroke();
  ellipse(400, 400, sizeShape2, sizeShape2/1.3);
  ellipse(450, 380, sizeShape2, sizeShape2/1.3);
  ellipse(330, 380, sizeShape2, sizeShape2/1.3);


  }

//grain overlay
let grainAmount = map(vocal, 0, 100, 1000, 10000); // scale bass to quantity of cirlce drawn for grain effect.
fill(255, 255, 255, 15); // semi-transparent white
noStroke();

for (let i = 0; i < grainAmount; i++) {
  ellipse(random(width), random(height), 1.5, 1.5);
  }

//disk teaxture
image(myImage,0,0);// 5,2.5

//disk interior circle
fill(0)
circle (x,y,30) 
  }