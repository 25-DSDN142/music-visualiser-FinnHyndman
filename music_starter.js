let firstRun = true;
let myImage; 

// canvas centre
let x = 320;
let y = 240;
let maskRadius = 220; 
let angle = 0

//noise 
let grainAmount = 9000

//pulsing circles start points
let xVocal = 0
let yVocal = -220
let xBass = 190.53
let yBass = 110
let xDrum = -190.53
let yDrum = 110
let targetX = 0; // center point
let targetY = 0; // center point

//traveling ball
let xSpeed = 30 //ball x speed
let xMove = 320; //start location
let minSpeed = 10;
let maxSpeed = 35;
let travelingY = 240; //Y axis
let scale = 100;
let glow = 100;

let rectRed = 255
let rectGreen = 255
let rectBlue = 255
let rectOpacity = 90

let ellipseRed = 25
let ellipseGreen = 90
let ellipseBlue = 255
let ellipseOpacity = 90

let ReelImages = [];
let filmIndex = 0;     // frame we're on
let filmSpeed = 2;     // how many draw frames before advancing


let tailLength = 40;   // how many ellipses in the tail
let spacingX = 3;     // horizontal spacing between ellipses
let spacingY = 3;     // vertical spacing between ellipses
let tailW = 15;       // width of each tail ellipse
let tailH = 15;       // height of each tail ellipse



// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  textFont('sans-serif'); // please use CSS safe fonts
  rectMode(CENTER);
  textSize(24);
  background(0);

  if(firstRun){
    
    myImage = loadImage('diskteaxture.png');

    for (let i = 1; i <= 10; i++){
    ReelImages.push(loadImage('STATIC9'+i+'.png'));
    }

    firstRun = false;
  }
  let seconds = (counter/60);

  diskSetUp();

  if ((seconds > 0.8 && seconds < 79) || (seconds > 83 && seconds < 86.9)) {
  Reel()
}

if (!((seconds >= 75.8 && seconds <= 79) || (seconds >= 83 && seconds <= 86.9))) {
    
  //circle roate between 45.7 & 75.5
    if (seconds >=45.7 && seconds <= 75.5) { 
    rotating = true;
   } else {
    rotating = false;
    }

  push();
  translate(x, y);
  rotate(angle);
  pulsingCircleVocal();
  pulsingCircleBass();
  pulsingCircleDrum();
  pop();
  
  // only move if rotating is true
  if (rotating) {
    angle += 0.6; // adjust rotate speed
  }}
  
  //chrous circle
if(seconds>75.8 && seconds<79 || (seconds > 83 && seconds < 86.9)){
    chorusCirclePulse()
}

//flashing rectangle
if ((seconds > 75.8 && seconds < 79) || (seconds > 83 && seconds < 86.9)) {

  // only updates randoms every 5 frames
  if (frameCount % 10 === 0) {
    squareX = random(width);
    squareY = random(height);
    squareW = random(width);
    squareH = random(height);
  
  rectangleFlash(squareX, squareY, squareW, squareH, 2);
 }
}
 
 //flashing ellipse
 if ((seconds > 75.8 && seconds < 79) || (seconds > 83 && seconds < 86.9)) {
  // only updates randoms every 5 frames
  if (frameCount % 15 === 0) {
    ellipseX = random(width);
    ellipseY = random(height);
    ellipseW = random(width);
    ellipseH = random(height);
  
  ellipseFlash(ellipseX, ellipseY, ellipseW, ellipseH);
 }

}

//travelling ball control
/*
if(seconds>75.8 && seconds<79 || (seconds > 83 && seconds < 86.9)){
  travellingBall()
  }
  */
  
  
  grainOverlay();
  diskOverlay();

  textSize(10);
  textStyle(BOLD);
  fill('white');
  text('Current', 320, 120);
  text('Affairs', 320, 135);
  text('Lorde', 150, 190);
  text('Virgin', 420, 300);


function Reel(){
  if (frameCount % filmSpeed === 10){ // advance every 'filmSpeed' frames
    filmIndex++;
    if (filmIndex >= ReelImages.length){
      filmIndex = 0; // loop back to first image
    }
  }

  image(ReelImages[filmIndex], 0, 0);
}


  
  function diskSetUp(){
    //disk mask
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.arc(x, y, maskRadius, 0, 360); // use degrees
    drawingContext.clip();

    //disk colour 
    fill(20);
    circle(x, y, 440);
  } 

  function pulsingCircleVocal() {
  let shapeRatio = vocal / 100; 
  let red, green, blue; 

 if (seconds < 45.7) {
    // orange to gold
    red   = lerp(255, 255, shapeRatio);
    green = lerp(165, 215, shapeRatio);
    blue  = lerp(0, 0, shapeRatio);
  } else {
    // blue to white 
    red   = lerp(0, 200, shapeRatio);
    green = lerp(190, 240, shapeRatio);
    blue  = lerp(255, 255, shapeRatio);
  }

  let vocalScale = map(vocal, 0, 100, 20, 300);

  // Circle shift to centre
  if (seconds >= 60.5 && seconds <= 75.5) {
    let progress = map(seconds, 60.5 , 75.5, 0, 1); 
    xVocal = lerp(xVocal, targetX, progress);
    yVocal = lerp(yVocal, targetY, progress);
  }

  // Draw pulsing circle
  for (let sizeShape1 = vocalScale; sizeShape1 > 0; sizeShape1 -= 5) {
    let fadeShape = map(sizeShape1, 0, vocalScale, 0, 80); // fade edges
    fill(red, green, blue, fadeShape);              
    noStroke();
    ellipse(xVocal, yVocal, sizeShape1, sizeShape1);
  }
  }

  function pulsingCircleDrum(){
    let shapeRatio = drum / 100; 
    let red, green, blue; 

 if (seconds < 45.7) {
    // orange to gold
    red   = lerp(240, 230, shapeRatio);
    green = lerp(20, 100, shapeRatio);
    blue  = lerp(0, 40, shapeRatio);
  } else {
    red = lerp(0, 0, shapeRatio);
    green = lerp(200, 50, shapeRatio);
    blue = lerp(255, 150, shapeRatio);
  }

 let drumScale;
  if (seconds > 70.8){
    // smaller mapping range
    drumScale = map(drum, 0, 100, 20, 275); 
  } else {
    drumScale = map(drum, 0, 100, 20, 300);
  }

    //circle shift to centre
   if (seconds >= 70.8 && seconds <= 75.5) {
    let progress = map(seconds, 70.8, 75.5, 0, 1);
    xDrum = lerp(xDrum, targetX, progress);
    yDrum = lerp(yDrum, targetY, progress);
}
    for (let sizeShape1 = drumScale; sizeShape1 > 0; sizeShape1 -= 5) {
      let fadeShape1 = map(sizeShape1, 0, drumScale, 0, 80); 
      fill(red, green, blue, fadeShape1);
      noStroke();
      ellipse(xDrum, yDrum, sizeShape1, sizeShape1);
    }
  }

  function pulsingCircleBass(){
    let shapeRatio = bass / 100; 
    let red, green, blue; 

    if (seconds < 45.7) {
    // orange to gold
    red   = lerp(240, 255, shapeRatio);
    green = lerp(80, 140, shapeRatio);
    blue  = lerp(0, 20, shapeRatio);
  } else {
    //blue
     red = lerp(0, 0, shapeRatio);
     green = lerp(200, 120, shapeRatio);
     blue = lerp(255, 220, shapeRatio);
  }

let bassScale;
  if (seconds > 70.8) {
    // smaller mapping range
    bassScale = map(drum, 0, 100, 20, 275); // was 20–300 before
  } else {
    bassScale = map(drum, 0, 100, 20, 300);
  }


    //circle shift to centre
    if (seconds >= 68 && seconds <= 75.5) {
    let progress = map(seconds, 68, 75.5, 0, 1); 
    xBass = lerp(xBass, targetX, progress);
    yBass = lerp(yBass, targetY, progress);
  }
    for (let sizeShape1 = bassScale; sizeShape1 > 0; sizeShape1 -= 5) {
      let fadeShape1 = map(sizeShape1, 0, bassScale, 0, 80); 
      fill(red, green, blue, fadeShape1);              
      noStroke();
      ellipse(xBass, yBass, sizeShape1, sizeShape1);
    }
  }

  function chorusCirclePulse() {
  let shapeRatio = drum / 100; 
    // blue to white 
    red   = lerp(0, 200, shapeRatio);
    green = lerp(190, 240, shapeRatio);
    blue  = lerp(255, 255, shapeRatio);
  
  let chorusScale = map(drum, 0, 100, 20, 300);

  // Draw pulsing circle
  for (let sizeShape2 = chorusScale; sizeShape2 > 0; sizeShape2 -= 5) {
    let fadeShape = map(sizeShape2, 0, chorusScale, 0, 80); // fade edges
    fill(red, green, blue, fadeShape);              
    noStroke();
    ellipse(x, y, sizeShape2, sizeShape2);
  }}

  function travellingBall(){


    xMove = xMove-xSpeed;
    if (xMove < -300){
      xMove = 200;
      xSpeed = xSpeed+1;
    }

    noStroke();
    fill(0,200,255,glow);
    ellipse(xMove-5, travelingY, scale, scale);
    fill(0,200,255,glow);
    ellipse(xMove+5, travelingY, scale, scale);
    fill(0,200,255,glow-10);
    ellipse(xMove+10, travelingY, scale, scale);

    for (let i =0; i<200; i++){
      let shiftX = i*2;
      let glowX = glow-i;
      let scaleW = 100-i/1.5;
      fill(0,200,255,glowX/5);
      ellipse(xMove+shiftX, travelingY, scaleW, scaleW);


    }
  }

  function grainOverlay(){
    fill(255, 255, 255, 15); 
    noStroke();

    for (let i = 0; i < grainAmount; i++) {
      ellipse(random(width), random(height), 1.5, 1.5);
    }
  }

  function diskOverlay(){
    image(myImage,0,0);
    fill(0);
    circle(x, y, 30); 
  }}

function rectangleFlash(squareX, squareY, squareW, squareH, squareCurve){
  noStroke(); 

  for (let i = 0; i < 12; i++) {
  fill(rectRed, rectGreen, rectBlue, rectOpacity - i*5); 
  rect(squareX, squareY, squareW + i * 6, squareH + i * 6, squareCurve + i * 3);
  }
}

function ellipseFlash(ellipseX, ellipseY, ellipseW, ellipseH){
  noStroke(); 
for (let i = 0; i < 50; i+=5) {
fill(ellipseRed, ellipseGreen, ellipseBlue, ellipseOpacity - i*5);
ellipse(ellipseX, ellipseY, ellipseW+i, ellipseH+i);
}

}

