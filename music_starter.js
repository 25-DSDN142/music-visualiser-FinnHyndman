let firstRun = true;
let myImage; 

// canvas centre
let x = 320;
let y = 240;
let maskRadius = 220; 
let angle = 0

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
let xMove = 320; //start location
let minSpeed = 10;
let maxSpeed = 35;
let travelingY = 200; //Y axis
let scale = 100;
let glow = 100;
let travelingActive = false;

let rectRed = 255
let rectGreen = 255
let rectBlue = 255
let rectOpacity = 90

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  textFont('sans-serif'); // please use CSS safe fonts
  rectMode(CENTER);
  textSize(24);
  background(0);

  if(firstRun){
    myImage = loadImage('diskteaxture.png');
    firstRun = false;
  }
  let seconds = (counter/60);

  diskSetUp();

 if (travelingActive) {
    travellingBall(); 
  }

  //circle roate control
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
  }
  
//flashing rectangle
if(seconds>75 && seconds<79 || (seconds > 82 && seconds < 86)){
  rectangleflash(random(width),random(height),random(width),random(height),2)


  
//travelling ball control
  if (seconds>=75.5 && seconds <= 89) {
    travelingActive = true; 
  } else {
 travelingActive = false; 
  }

}
  grainOverlay();
  diskOverlay();

  textSize(10);
  textStyle(BOLD);
  fill('white');
  text('Current', 320, 120);
  text('Affairs', 320, 135);
  text('Lorde', 150, 190);
  text('Virgin', 420, 300);


  
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

    let vocalScale = map(drum, 0, 100, 20, 300);

    //circle shift to centre
   if (seconds >= 70.8 && seconds <= 75.5) {
    let progress = map(seconds, 70.8, 75.5, 0, 1); 
    xDrum = lerp(xDrum, targetX, progress);
    yDrum = lerp(yDrum, targetY, progress);
}
    for (let sizeShape1 = vocalScale; sizeShape1 > 0; sizeShape1 -= 5) {
      let fadeShape1 = map(sizeShape1, 0, vocalScale, 0, 80); 
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

    let vocalScale = map(bass, 0, 100, 20, 300);

    //circle shift to centre
    if (seconds >= 68 && seconds <= 75.5) {
    let progress = map(seconds, 68, 75.5, 0, 1); 
    xBass = lerp(xBass, targetX, progress);
    yBass = lerp(yBass, targetY, progress);
  }
    for (let sizeShape1 = vocalScale; sizeShape1 > 0; sizeShape1 -= 5) {
      let fadeShape1 = map(sizeShape1, 0, vocalScale, 0, 80); 
      fill(red, green, blue, fadeShape1);              
      noStroke();
      ellipse(xBass, yBass, sizeShape1, sizeShape1);
    }
  }

  function travellingBall(){
    let xSpeed = map(vocal, 0, 100, minSpeed, maxSpeed);
    xMove = xMove-xSpeed;
    if (xMove < -300){
      xMove = 400;
      xSpeed = xSpeed+3;
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
    let grainAmount = map(vocal, 0, 100, 1000, 10000); 
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

  function rectangleflash(squareX, squareY, squareW, squareH, squareCurve){
  noStroke(); 

  fill(rectRed, rectGreen, rectBlue, rectOpacity);
  rect(squareX, squareY, squareW, squareH, squareCurve);

  fill(rectRed, rectGreen, rectBlue, rectOpacity);
  rect(squareX, squareY, squareW+6, squareH+6, squareCurve+3);

  fill(rectRed, rectGreen, rectBlue, rectOpacity);
  rect(squareX, squareY, squareW+12, squareH+12, squareCurve+6);

  fill(rectRed, rectGreen, rectBlue, rectOpacity);
  rect(squareX, squareY, squareW+18, squareH+18, squareCurve+9);

  fill(rectRed, rectGreen, rectBlue, rectOpacity-5);
  rect(squareX, squareY, squareW+24, squareH+24, squareCurve+12);

  fill(rectRed, rectGreen, rectBlue, rectOpacity-10);
  rect(squareX, squareY, squareW+30, squareH+30, squareCurve+15);

  fill(rectRed, rectGreen, rectBlue, rectOpacity-15);
  rect(squareX, squareY, squareW+36, squareH+36, squareCurve+18);

  fill(rectRed, rectGreen, rectBlue, rectOpacity-20);
  rect(squareX, squareY, squareW+42, squareH+42, squareCurve+21);

  fill(rectRed, rectGreen, rectBlue, rectOpacity-25);
  rect(squareX, squareY, squareW+48, squareH+48, squareCurve+24);

  fill(rectRed, rectGreen, rectBlue, rectOpacity-30);
  rect(squareX, squareY, squareW+54, squareH+54, squareCurve+27);

  fill(rectRed, rectGreen, rectBlue, rectOpacity-40);
  rect(squareX, squareY, squareW+60, squareH+60, squareCurve+30);

  fill(rectRed, rectGreen, rectBlue, rectOpacity-50);
  rect(squareX, squareY, squareW+66, squareH+66, squareCurve+33);
}


