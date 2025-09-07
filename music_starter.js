let firstRun = true;
let myImage; 

//centre points
let x = 320;
let y = 240;
let maskRadius = 220; 

// rotation controls
let angle = 0
let diskAngle = 0
let diskSpeed = 0.6;

//noise controls
let grainAmount = 9000

//pulsing circles start points
let xVocal = 0
let yVocal = -220
let xBass = 190.53
let yBass = 110
let xDrum = -190.53
let yDrum = 110
let targetX = 0 // center point
let targetY = 0 // center point

//traveling ball controls
let xSpeed = 30 //ball x speed
let xMove = 320 //start location
let minSpeed = 10
let maxSpeed = 35
let travelingY = 240; //Y axis
let scale = 100
let glow = 100

//flashing sqaure controls 
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
let filmSpeed = 2;     // how many draw frames before advancings

//roaming circle 1
let circleX1 = 320;
let circleY1 = 240
let circleVelocityX1 = -2
let circleVelocityY1 = -2
let circleDiameter1

//roaming circle 2
let circleX2 = 320
let circleY2 = 240
let circleVelocityX2 = -3
let circleVelocityY2 = 2
let circleDiameter2

//roaming circle 3
let circleX3 = 320
let circleY3 = 240
let circleVelocityX3 = 3
let circleVelocityY3 = -3
let circleDiameter3

//roaming circle 4
let circleX4 = 5
let circleY4 = 400
let circleVelocityX4 = 1
let circleVelocityY4 = -2
let circleDiameter4

//roaming circle 5
let circleX5 = 600
let circleY5 = 400
let circleVelocityX5 = 3
let circleVelocityY5 = 2
let circleDiameter5

//roaming circle 6
let circleX6 = 600
let circleY6 = 10
let circleVelocityX6 = -1
let circleVelocityY6 = 3
let circleDiameter6

//roaming circle 7
let circleX7 = 600
let circleY7 = 10
let circleVelocityX7 = -2
let circleVelocityY7 = 3
let circleDiameter7

//roaming circle 8
let circleX8 = 600
let circleY8 = 400
let circleVelocityX8 = 1
let circleVelocityY8 = 3
let circleDiameter8

//roaming circle 4
let circleX9 = 5
let circleY9 = 400
let circleVelocityX9 = 2
let circleVelocityY9 = -1
let circleDiameter9

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  textFont('sans-serif'); // please use CSS safe fonts
  rectMode(CENTER);
  textSize(24);
  background(0);

  if(firstRun){
    
    myImage = loadImage('diskteaxture.png');

    for (let i = 1; i <= 94; i++){
    ReelImages.push(loadImage('142STATIC/STATIC9'+i+'.png'));
    }

    firstRun = false;
  }

let seconds = (counter/60);


diskSetUp();

if(seconds > 86.9 && seconds < 150.8){
roamingCircle1(vocal,seconds)
roamingCircle2(bass,seconds)
roamingCircle3(drum,seconds)
roamingCircle4(bass,seconds)
roamingCircle5(drum,seconds)
roamingCircle6(vocal,seconds)
roamingCircle7(vocal,seconds)
roamingCircle8(drum,seconds)
roamingCircle9(bass,seconds)
}

if ((seconds > 75.8 && seconds < 79) || (seconds > 83 && seconds < 86.9)| (seconds > 165.5 && seconds < 177.9)) {
Reel()
}

if (!((seconds >= 75.8 && seconds <= 79) || (seconds >= 83))) {
    
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
    angle -= 0.6; // adjust rotate speed
}}
  
  //chrous circle
if(seconds>75.8 && seconds<79 || (seconds > 83 && seconds < 86.9)){
    //chorusCirclePulse()
}

//flashing rectangles
if ((seconds > 75.8 && seconds < 79) || (seconds > 83 && seconds < 86.9) || (seconds > 165.5 && seconds < 177.9)) {

  // only updates randoms every 5 frames
  if (frameCount % 10 === 0) {
    squareX1 = random(width);
    squareY1 = random(height);
    squareW1 = random(width);
    squareH1 = random(height);
      rectangleFlash(squareX1, squareY1, squareW1, squareH1, 2);
}
    
    if (frameCount % 15 === 0) {
    squareX2 = random(width);
    squareY2 = random(height);
    squareW2 = random(width);
    squareH2 = random(height);
    
    rectangleFlash(squareX2, squareY2, squareW2, squareH2, 2);
}}
 
  grainOverlay();

  //roatating disk
  push();
  translate(x, y);
  rotate(diskAngle);
  diskOverlay();
  textSize(10);
  textStyle(BOLD);
  fill('white');
  text('Current', 0, -120);   
  text('Affairs', 0, -105);   
  text('Lorde', -170, -50);
  text('Virgin', 100, 60); 
  pop()
  
  //speed up rotation on chrous.
let targetSpeed = 0.6; 
if ((seconds > 74.8  && seconds < 79) || (seconds > 82 && seconds < 86.9)) {
  targetSpeed = 10;
}
diskSpeed = lerp(diskSpeed, targetSpeed, 0.05);
diskAngle += diskSpeed;

function Reel(){
  if (frameCount % filmSpeed === 1){ // advance every 'filmSpeed' frames
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

function grainOverlay(){
    fill(255, 255, 255, 15); 
    noStroke();

    for (let i = 0; i < grainAmount; i++) {
      ellipse(random(width), random(height), 1.5, 1.5);
    }
}

function diskOverlay(){
    image(myImage,-320,-240);
    fill(0);
    circle(targetX, targetY, 30); 
}

function rectangleFlash(squareX, squareY, squareW, squareH, squareCurve){
  noStroke(); 

  for (let i = 0; i < 12; i++) {
  fill(rectRed, rectGreen, rectBlue, rectOpacity - i*5); 
  rect(squareX, squareY, squareW + i * 6, squareH + i * 6, squareCurve + i * 3);    
  }
}

function roamingCircle1(vocal,seconds) {
   
circleDiameter = map(vocal, 0, 100, 40, 240);
colorRatio = map(vocal, 0, 100, 0, 1);

//base colour blue
  let baseR = lerp(0, 200, colorRatio);
  let baseG = lerp(190, 204, colorRatio);
  let baseB = lerp(255, 255, colorRatio);

//fire pulse colour
  let orangeR = lerp(140, 200, colorRatio)
  let orangeG = lerp(40, 80, colorRatio)
  let orangeB = lerp(0, 10, colorRatio)


  let transitionAmount = 0;

  // //pulse 1
  if (seconds >= 121 && seconds <= 121.4) {
  transitionAmount = map(seconds, 121, 121.4, 0, 1); // Fade in
} else if (seconds > 121.4 && seconds <= 122.3) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 122.3 && seconds <= 122.9) {
  transitionAmount = map(seconds, 122.3, 122.9, 1, 0); // Fade out
}

 //pulse 2
  else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
  
//pulse 3
   else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }

//pulse 4
  else if (seconds >= 132.4 && seconds <= 133.0) {
  transitionAmount = map(seconds, 132.4, 133.0, 0, 1); // Fade in (0.6s)
} else if (seconds > 133.0 && seconds <= 137.2) {
  transitionAmount = 1; // Full orange hold (4.2s)
} else if (seconds > 137.2 && seconds <= 137.8) {
  transitionAmount = map(seconds, 137.2, 137.8, 1, 0); // Fade out (0.6s)
}

//pulse 5
  else if (seconds >= 129.7 && seconds <= 130.0) {
  transitionAmount = map(seconds, 129.7, 130.0, 0, 1); // Fade in
} else if (seconds > 130.0 && seconds <= 130.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 130.5 && seconds <= 130.8) {
  transitionAmount = map(seconds, 130.5, 130.8, 1, 0); // Fade out
}
//pulse 6
else if (seconds >= 140.6 && seconds <= 141.0) {
  transitionAmount = map(seconds, 140.6, 141.0, 0, 1); // Fade in
} else if (seconds > 141.0 && seconds <= 141.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 141.5 && seconds <= 142.5) {
  transitionAmount = map(seconds, 141.5, 142.5, 1, 0); // Fade out
}

  //final colour lerp. lerp blue pulse to orange pulse.
  let red = lerp(baseR, orangeR, transitionAmount);
  let green = lerp(baseG, orangeG, transitionAmount);
  let blue = lerp(baseB, orangeB, transitionAmount);
  
if(seconds > 91.8){
  circleX1 = circleX1 + circleVelocityX1;
  circleY1 = circleY1 + circleVelocityY1;
}
  // Bounce off edges
  if (circleX1 < 100 || circleX1 > 540) {
    circleVelocityX1 = -circleVelocityX1;
  }
  if (circleY1 < 20 || circleY1 > 460) {
    circleVelocityY1 = -circleVelocityY1;
  }

  fill(red, green, blue, 100);
  noStroke();   

for (let i = 0; i <= 20; i += 5) {
  ellipse(circleX1, circleY1, circleDiameter - i);
}
}

function roamingCircle2(bass,seconds) {

circleDiameter = map(bass, 0, 100, 50, 80);
colorRatio = map(bass, 0, 100, 0, 1);

//base colour blue
let baseR = lerp(0, 0, colorRatio);
let baseG = lerp(200, 50, colorRatio);
let baseB = lerp(255, 150, colorRatio);

//fire pulse colour
let orangeR = lerp(220, 250, colorRatio); 
let orangeG = lerp(170, 230, colorRatio); 
let orangeB = lerp(60, 90, colorRatio);   



  let transitionAmount = 0;

  // //pulse 1
  if (seconds >= 121 && seconds <= 121.4) {
  transitionAmount = map(seconds, 121, 121.4, 0, 1); // Fade in
} else if (seconds > 121.4 && seconds <= 122.3) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 122.3 && seconds <= 122.9) {
  transitionAmount = map(seconds, 122.3, 122.9, 1, 0); // Fade out
}

 //pulse 2
  else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
  
//pulse 3
   else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }

  //pulse 4
  else if (seconds >= 132.4 && seconds <= 133.0) {
  transitionAmount = map(seconds, 132.4, 133.0, 0, 1); // Fade in (0.6s)
} else if (seconds > 133.0 && seconds <= 137.2) {
  transitionAmount = 1; // Full orange hold (4.2s)
} else if (seconds > 137.2 && seconds <= 137.8) {
  transitionAmount = map(seconds, 137.2, 137.8, 1, 0); // Fade out (0.6s)
}

//pulse 5
  else if (seconds >= 129.7 && seconds <= 130.0) {
  transitionAmount = map(seconds, 129.7, 130.0, 0, 1); // Fade in
} else if (seconds > 130.0 && seconds <= 130.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 130.5 && seconds <= 130.8) {
  transitionAmount = map(seconds, 130.5, 130.8, 1, 0); // Fade out
}
//pulse 6
else if (seconds >= 140.6 && seconds <= 141.0) {
  transitionAmount = map(seconds, 140.6, 141.0, 0, 1); // Fade in
} else if (seconds > 141.0 && seconds <= 141.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 141.5 && seconds <= 142.5) {
  transitionAmount = map(seconds, 141.5, 142.5, 1, 0); // Fade out
}

  //final colour lerp. lerp blue pulse to orange pulse.
  let red = lerp(baseR, orangeR, transitionAmount);
  let green = lerp(baseG, orangeG, transitionAmount);
  let blue = lerp(baseB, orangeB, transitionAmount);

if(seconds > 91.32){
circleX2 = circleX2 + circleVelocityX2;
circleY2 = circleY2 + circleVelocityY2;
}

// Bounce off edges
if (circleX2 < 100 || circleX2 > 540) {
  circleVelocityX2 = -circleVelocityX2;
}
if (circleY2 < 20 || circleY2 > 460) {
    circleVelocityY2 = -circleVelocityY2;
}

fill(red, green, blue, 100);
noStroke();              
 for (let i = 0; i <= 20; i += 5) {
  ellipse(circleX2, circleY2, circleDiameter - i);
}
}

function roamingCircle3(drum,seconds) {

circleDiameter = map(drum, 0, 100, 50, 100);
colorRatio = map(drum, 0, 100, 0, 1);

//base colour blue
let baseR = lerp(0, 0, colorRatio)
let baseG = lerp(200, 120, colorRatio)
let baseB = lerp(255, 220, colorRatio)

  //fire pulse colour
let orangeR = lerp(255, 255, colorRatio)
let orangeG = lerp(150, 220, colorRatio)
let orangeB = lerp(30, 60, colorRatio)


let transitionAmount = 0;

 // //pulse 1
  if (seconds >= 121 && seconds <= 121.4) {
  transitionAmount = map(seconds, 121, 121.4, 0, 1); // Fade in
} else if (seconds > 121.4 && seconds <= 122.3) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 122.3 && seconds <= 122.9) {
  transitionAmount = map(seconds, 122.3, 122.9, 1, 0); // Fade out
}

 //pulse 2
  else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
  
//pulse 3
   else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
//pulse 4
  else if (seconds >= 132.4 && seconds <= 133.0) {
  transitionAmount = map(seconds, 132.4, 133.0, 0, 1); // Fade in (0.6s)
} else if (seconds > 133.0 && seconds <= 137.2) {
  transitionAmount = 1; // Full orange hold (4.2s)
} else if (seconds > 137.2 && seconds <= 137.8) {
  transitionAmount = map(seconds, 137.2, 137.8, 1, 0); // Fade out (0.6s)
}

//pulse 5
  else if (seconds >= 129.7 && seconds <= 130.0) {
  transitionAmount = map(seconds, 129.7, 130.0, 0, 1); // Fade in
} else if (seconds > 130.0 && seconds <= 130.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 130.5 && seconds <= 130.8) {
  transitionAmount = map(seconds, 130.5, 130.8, 1, 0); // Fade out
}
//pulse 6
else if (seconds >= 140.6 && seconds <= 141.0) {
  transitionAmount = map(seconds, 140.6, 141.0, 0, 1); // Fade in
} else if (seconds > 141.0 && seconds <= 141.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 141.5 && seconds <= 142.0) {
  transitionAmount = map(seconds, 141.5, 142.0, 1, 0); // Fade out
}

  //final colour lerp. lerp blue pulse to orange pulse.
  let red = lerp(baseR, orangeR, transitionAmount)
  let green = lerp(baseG, orangeG, transitionAmount)
  let blue = lerp(baseB, orangeB, transitionAmount)

if(seconds > 90.8){
circleX3 = circleX3 + circleVelocityX3;
circleY3 = circleY3 + circleVelocityY3;
}

// Bounce off edges
if (circleX3 < 100 || circleX3 > 540) {
  circleVelocityX3 = -circleVelocityX3;
}
if (circleY3 < 20 || circleY3 > 460) {
  circleVelocityY3 = -circleVelocityY3;
}

fill(red, green, blue, 100);
noStroke();  

for (let i = 0; i <= 20; i += 5) {
  ellipse(circleX3, circleY3, circleDiameter - i);
}
}

function roamingCircle4(bass,seconds) {

circleDiameter = map(bass, 0, 100, 50, 170);
colorRatio = map(bass, 0, 100, 0, 1);

//base colour blue
let baseR = lerp(0, 80, colorRatio)
let baseG = lerp(100, 200, colorRatio)
let baseB = lerp(255, 255, colorRatio)

//fire pulse colour
let orangeR = lerp(240, 255, colorRatio)
let orangeG = lerp(190, 220, colorRatio)
let orangeB = lerp(20, 40, colorRatio)


  let transitionAmount = 0;

 // //pulse 1
  if (seconds >= 121 && seconds <= 121.4) {
  transitionAmount = map(seconds, 121, 121.4, 0, 1); // Fade in
} else if (seconds > 121.4 && seconds <= 122.3) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 122.3 && seconds <= 122.9) {
  transitionAmount = map(seconds, 122.3, 122.9, 1, 0); // Fade out
}

 //pulse 2
  else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
  
//pulse 3
   else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
//pulse 4
  else if (seconds >= 132.4 && seconds <= 133.0) {
  transitionAmount = map(seconds, 132.4, 133.0, 0, 1); // Fade in (0.6s)
} else if (seconds > 133.0 && seconds <= 137.2) {
  transitionAmount = 1; // Full orange hold (4.2s)
} else if (seconds > 137.2 && seconds <= 137.8) {
  transitionAmount = map(seconds, 137.2, 137.8, 1, 0); // Fade out (0.6s)
}

//pulse 5
  else if (seconds >= 129.7 && seconds <= 130.0) {
  transitionAmount = map(seconds, 129.7, 130.0, 0, 1); // Fade in
} else if (seconds > 130.0 && seconds <= 130.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 130.5 && seconds <= 130.8) {
  transitionAmount = map(seconds, 130.5, 130.8, 1, 0); // Fade out
}
//pulse 6
else if (seconds >= 140.6 && seconds <= 141.0) {
  transitionAmount = map(seconds, 140.6, 141.0, 0, 1); // Fade in
} else if (seconds > 141.0 && seconds <= 141.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 141.5 && seconds <= 142.5) {
  transitionAmount = map(seconds, 141.5, 142.5, 1, 0); // Fade out
}

  //final colour lerp. lerp blue pulse to orange pulse.
  let red = lerp(baseR, orangeR, transitionAmount);
  let green = lerp(baseG, orangeG, transitionAmount);
  let blue = lerp(baseB, orangeB, transitionAmount);


if(seconds > 106.32){
  circleX4 = circleX4 + circleVelocityX4;
  circleY4 = circleY4 + circleVelocityY4;
}

// Bounce off edges
if (circleX4 < 0 || circleX4 > 640) {
  circleVelocityX4 = -circleVelocityX4;
}
if (circleY4 < 0 || circleY4 > 480) {
  circleVelocityY4 = -circleVelocityY4;
}

fill(red, green, blue, 100);
noStroke();  

for (let i = 0; i <= 20; i += 5) {
  ellipse(circleX4, circleY4, circleDiameter - i);
}
}

function roamingCircle5(drum,seconds) {

circleDiameter = map(drum, 0, 100, 60, 140);
colorRatio = map(drum, 0, 100, 0, 1);

//base colour blue
  let baseR = lerp(10, 30, colorRatio);
  let baseG = lerp(50, 100, colorRatio);
  let baseB = lerp(120, 255, colorRatio);

  //fire pulse colour
  let orangeR = lerp(180, 255, colorRatio)
  let orangeG = lerp(70, 100, colorRatio)
  let orangeB = lerp(0, 15, colorRatio)


  let transitionAmount = 0;

 // //pulse 1
  if (seconds >= 121 && seconds <= 121.4) {
  transitionAmount = map(seconds, 121, 121.4, 0, 1); // Fade in
} else if (seconds > 121.4 && seconds <= 122.3) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 122.3 && seconds <= 122.9) {
  transitionAmount = map(seconds, 122.3, 122.9, 1, 0); // Fade out
}

 //pulse 2
  else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
  
//pulse 3
   else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }

//pulse 4
  else if (seconds >= 132.4 && seconds <= 133.0) {
  transitionAmount = map(seconds, 132.4, 133.0, 0, 1); // Fade in (0.6s)
} else if (seconds > 133.0 && seconds <= 137.2) {
  transitionAmount = 1; // Full orange hold (4.2s)
} else if (seconds > 137.2 && seconds <= 137.8) {
  transitionAmount = map(seconds, 137.2, 137.8, 1, 0); // Fade out (0.6s)
}

//pulse 5
  else if (seconds >= 129.7 && seconds <= 130.0) {
  transitionAmount = map(seconds, 129.7, 130.0, 0, 1); // Fade in
} else if (seconds > 130.0 && seconds <= 130.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 130.5 && seconds <= 130.8) {
  transitionAmount = map(seconds, 130.5, 130.8, 1, 0); // Fade out
}

//pulse 6
else if (seconds >= 140.6 && seconds <= 141.0) {
  transitionAmount = map(seconds, 140.6, 141.0, 0, 1); // Fade in
} else if (seconds > 141.0 && seconds <= 141.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 141.5 && seconds <= 142.5) {
  transitionAmount = map(seconds, 141.5, 142.5, 1, 0); // Fade out
}

  //final colour lerp. lerp blue pulse to orange pulse.
  let red = lerp(baseR, orangeR, transitionAmount);
  let green = lerp(baseG, orangeG, transitionAmount);
  let blue = lerp(baseB, orangeB, transitionAmount);

if(seconds > 106.32){
  circleX5 = circleX5 + circleVelocityX5
  circleY5 = circleY5 + circleVelocityY5
}

// Bounce off edges
if (circleX5 < 0 || circleX5 > 640) {
  circleVelocityX5 = -circleVelocityX5
}
if (circleY5 < 0 || circleY5 > 480) {
  circleVelocityY5 = -circleVelocityY5
}

fill(red, green, blue, 100);
noStroke();  

for (let i = 0; i <= 20; i += 5) {
  ellipse(circleX5, circleY5, circleDiameter - i);
}
}

function roamingCircle6(vocal, seconds) {
  circleDiameter = map(vocal, 0, 100, 40, 240);
  colorRatio = map(vocal, 0, 100, 0, 1);

  // Base colour
  let baseR = lerp(180, 200, colorRatio);
  let baseG = lerp(210, 240, colorRatio);
  let baseB = lerp(255, 255, colorRatio);

  // Fire pulse colour 
  let orangeR = lerp(255, 255, colorRatio);
  let orangeG = lerp(100, 180, colorRatio);
  let orangeB = lerp(0, 40, colorRatio);

  // Transition amount for blending
  let transitionAmount = 0;

  // //pulse 1
  if (seconds >= 121 && seconds <= 121.4) {
  transitionAmount = map(seconds, 121, 121.4, 0, 1); // Fade in
} else if (seconds > 121.4 && seconds <= 122.3) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 122.3 && seconds <= 122.9) {
  transitionAmount = map(seconds, 122.3, 122.9, 1, 0); // Fade out
}

 //pulse 2
  else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
  
//pulse 3
   else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
//pulse 4
  else if (seconds >= 132.4 && seconds <= 133.0) {
  transitionAmount = map(seconds, 132.4, 133.0, 0, 1); // Fade in (0.6s)
} else if (seconds > 133.0 && seconds <= 137.2) {
  transitionAmount = 1; // Full orange hold (4.2s)
} else if (seconds > 137.2 && seconds <= 137.8) {
  transitionAmount = map(seconds, 137.2, 137.8, 1, 0); // Fade out (0.6s)
}

//pulse 5
  else if (seconds >= 129.7 && seconds <= 130.0) {
  transitionAmount = map(seconds, 129.7, 130.0, 0, 1); // Fade in
} else if (seconds > 130.0 && seconds <= 130.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 130.5 && seconds <= 130.8) {
  transitionAmount = map(seconds, 130.5, 130.8, 1, 0); // Fade out
}
//pulse 6
else if (seconds >= 140.6 && seconds <= 141.0) {
  transitionAmount = map(seconds, 140.6, 141.0, 0, 1); // Fade in
} else if (seconds > 141.0 && seconds <= 141.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 141.5 && seconds <= 142.5) {
  transitionAmount = map(seconds, 141.5, 142.5, 1, 0); // Fade out
}

  // final colour lerp
  let red = lerp(baseR, orangeR, transitionAmount);
  let green = lerp(baseG, orangeG, transitionAmount);
  let blue = lerp(baseB, orangeB, transitionAmount);


if(seconds > 106.32){
  circleX6 = circleX6 + circleVelocityX6
  circleY6 = circleY6 + circleVelocityY6
}

  // Bounce off edges
  if (circleX6 < 0 || circleX6 > 640) circleVelocityX6 *= -1;
  if (circleY6 < 0 || circleY6 > 480) circleVelocityY6 *= -1;

  //draw circle
  fill(red, green, blue, 100);
  noStroke();
  for (let i = 0; i <= 20; i += 5) {
    ellipse(circleX6, circleY6, circleDiameter - i);
  }
}

function roamingCircle7(vocal, seconds) {
  circleDiameter = map(vocal, 0, 100, 30, 200);
  colorRatio = map(vocal, 0, 100, 0, 1);

  // Base colour
  let baseR = lerp(180, 200, colorRatio);
  let baseG = lerp(210, 240, colorRatio);
  let baseB = lerp(255, 255, colorRatio);

  // Fire pulse colour 
  let orangeR = lerp(255, 255, colorRatio);
  let orangeG = lerp(100, 180, colorRatio);
  let orangeB = lerp(0, 40, colorRatio);

  // Transition amount for blending
  let transitionAmount = 0;

  // //pulse 1
  if (seconds >= 121 && seconds <= 121.4) {
  transitionAmount = map(seconds, 121, 121.4, 0, 1); // Fade in
} else if (seconds > 121.4 && seconds <= 122.3) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 122.3 && seconds <= 122.9) {
  transitionAmount = map(seconds, 122.3, 122.9, 1, 0); // Fade out
}

 //pulse 2
  else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
  
//pulse 3
   else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
//pulse 4
  else if (seconds >= 132.4 && seconds <= 133.0) {
  transitionAmount = map(seconds, 132.4, 133.0, 0, 1); // Fade in (0.6s)
} else if (seconds > 133.0 && seconds <= 137.2) {
  transitionAmount = 1; // Full orange hold (4.2s)
} else if (seconds > 137.2 && seconds <= 137.8) {
  transitionAmount = map(seconds, 137.2, 137.8, 1, 0); // Fade out (0.6s)
}

//pulse 5
  else if (seconds >= 129.7 && seconds <= 130.0) {
  transitionAmount = map(seconds, 129.7, 130.0, 0, 1); // Fade in
} else if (seconds > 130.0 && seconds <= 130.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 130.5 && seconds <= 130.8) {
  transitionAmount = map(seconds, 130.5, 130.8, 1, 0); // Fade out
}
//pulse 6
else if (seconds >= 140.6 && seconds <= 141.0) {
  transitionAmount = map(seconds, 140.6, 141.0, 0, 1); // Fade in
} else if (seconds > 141.0 && seconds <= 141.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 141.5 && seconds <= 142.5) {
  transitionAmount = map(seconds, 141.5, 142.5, 1, 0); // Fade out
}

  // final colour lerp
  let red = lerp(baseR, orangeR, transitionAmount);
  let green = lerp(baseG, orangeG, transitionAmount);
  let blue = lerp(baseB, orangeB, transitionAmount);


if(seconds > 110.32){
  circleX7 = circleX7 + circleVelocityX7
  circleY7 = circleY7 + circleVelocityY7
}

  // Bounce off edges
  if (circleX7 < 0 || circleX7 > 640) circleVelocityX7 *= -1;
  if (circleY7 < 0 || circleY7 > 480) circleVelocityY7 *= -1;

  //draw circle
  fill(red, green, blue, 100);
  noStroke();
  for (let i = 0; i <= 20; i += 5) {
    ellipse(circleX7, circleY7, circleDiameter - i);
  }
}

function roamingCircle8(drum, seconds) {
  circleDiameter = map(drum, 0, 100, 50, 230);
  colorRatio = map(drum, 0, 100, 0, 1);

  // Base colour
  let baseR = lerp(180, 200, colorRatio);
  let baseG = lerp(210, 240, colorRatio);
  let baseB = lerp(255, 255, colorRatio);

  // Fire pulse colour 
  let orangeR = lerp(255, 255, colorRatio);
  let orangeG = lerp(100, 180, colorRatio);
  let orangeB = lerp(0, 40, colorRatio);

  // Transition amount for blending
  let transitionAmount = 0;

  // //pulse 1
  if (seconds >= 121 && seconds <= 121.4) {
  transitionAmount = map(seconds, 121, 121.4, 0, 1); // Fade in
} else if (seconds > 121.4 && seconds <= 122.3) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 122.3 && seconds <= 122.9) {
  transitionAmount = map(seconds, 122.3, 122.9, 1, 0); // Fade out
}

 //pulse 2
  else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
  
//pulse 3
   else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
//pulse 4
  else if (seconds >= 132.4 && seconds <= 133.0) {
  transitionAmount = map(seconds, 132.4, 133.0, 0, 1); // Fade in (0.6s)
} else if (seconds > 133.0 && seconds <= 137.2) {
  transitionAmount = 1; // Full orange hold (4.2s)
} else if (seconds > 137.2 && seconds <= 137.8) {
  transitionAmount = map(seconds, 137.2, 137.8, 1, 0); // Fade out (0.6s)
}

//pulse 5
  else if (seconds >= 129.7 && seconds <= 130.0) {
  transitionAmount = map(seconds, 129.7, 130.0, 0, 1); // Fade in
} else if (seconds > 130.0 && seconds <= 130.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 130.5 && seconds <= 130.8) {
  transitionAmount = map(seconds, 130.5, 130.8, 1, 0); // Fade out
}
//pulse 6
else if (seconds >= 140.6 && seconds <= 141.0) {
  transitionAmount = map(seconds, 140.6, 141.0, 0, 1); // Fade in
} else if (seconds > 141.0 && seconds <= 141.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 141.5 && seconds <= 142.5) {
  transitionAmount = map(seconds, 141.5, 142.5, 1, 0); // Fade out
}

  // final colour lerp
  let red = lerp(baseR, orangeR, transitionAmount);
  let green = lerp(baseG, orangeG, transitionAmount);
  let blue = lerp(baseB, orangeB, transitionAmount);


if(seconds > 110.32){
  circleX8 = circleX8 + circleVelocityX8
  circleY8 = circleY8 + circleVelocityY8
}

  // Bounce off edges
  if (circleX8 < 0 || circleX8 > 640) circleVelocityX8 *= -1;
  if (circleY8 < 0 || circleY8 > 480) circleVelocityY8 *= -1;

  //draw circle
  fill(red, green, blue, 100);
  noStroke();
  for (let i = 0; i <= 20; i += 5) {
    ellipse(circleX8, circleY8, circleDiameter - i);
  }
}

function roamingCircle9(bass,seconds) {

circleDiameter = map(bass, 0, 100, 20, 190);
colorRatio = map(bass, 0, 100, 0, 1);

//base colour blue
let baseR = lerp(0, 80, colorRatio)
let baseG = lerp(100, 200, colorRatio)
let baseB = lerp(255, 255, colorRatio)

//fire pulse colour
let orangeR = lerp(240, 255, colorRatio)
let orangeG = lerp(190, 220, colorRatio)
let orangeB = lerp(20, 40, colorRatio)


let transitionAmount = 0;

 // //pulse 1
  if (seconds >= 121 && seconds <= 121.4) {
  transitionAmount = map(seconds, 121, 121.4, 0, 1); // Fade in
} else if (seconds > 121.4 && seconds <= 122.3) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 122.3 && seconds <= 122.9) {
  transitionAmount = map(seconds, 122.3, 122.9, 1, 0); // Fade out
}

 //pulse 2
  else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
  
//pulse 3
   else if (seconds >= 124.7 && seconds <= 125.2) {
    transitionAmount = map(seconds, 124.7, 125.2, 0, 1); // Fade in
  } else if (seconds > 125.2 && seconds <= 125.8) {
    transitionAmount = 1; //full orange
  } else if (seconds > 125.8 && seconds <= 126.32) {
    transitionAmount = map(seconds, 125.8, 126.32, 1, 0); // Fade out
  }
//pulse 4
  else if (seconds >= 132.4 && seconds <= 133.0) {
  transitionAmount = map(seconds, 132.4, 133.0, 0, 1); // Fade in (0.6s)
} else if (seconds > 133.0 && seconds <= 137.2) {
  transitionAmount = 1; // Full orange hold (4.2s)
} else if (seconds > 137.2 && seconds <= 137.8) {
  transitionAmount = map(seconds, 137.2, 137.8, 1, 0); // Fade out (0.6s)
}

//pulse 5
  else if (seconds >= 129.7 && seconds <= 130.0) {
  transitionAmount = map(seconds, 129.7, 130.0, 0, 1); // Fade in
} else if (seconds > 130.0 && seconds <= 130.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 130.5 && seconds <= 130.8) {
  transitionAmount = map(seconds, 130.5, 130.8, 1, 0); // Fade out
}
//pulse 6
else if (seconds >= 140.6 && seconds <= 141.0) {
  transitionAmount = map(seconds, 140.6, 141.0, 0, 1); // Fade in
} else if (seconds > 141.0 && seconds <= 141.5) {
  transitionAmount = 1; // Full orange hold
} else if (seconds > 141.5 && seconds <= 142.5) {
  transitionAmount = map(seconds, 141.5, 142.5, 1, 0); // Fade out
}

  //final colour lerp. lerp blue pulse to orange pulse.
  let red = lerp(baseR, orangeR, transitionAmount);
  let green = lerp(baseG, orangeG, transitionAmount);
  let blue = lerp(baseB, orangeB, transitionAmount);


if(seconds > 106.32){
  circleX9 = circleX9 + circleVelocityX9;
  circleY9 = circleY9 + circleVelocityY9;
}

// Bounce off edges
if (circleX9 < 0 || circleX9 > 640) {
  circleVelocityX9 = -circleVelocityX9;
}
if (circleY9 < 0 || circleY9 > 480) {
  circleVelocityY9 = -circleVelocityY9;
}

fill(red, green, blue, 100);
noStroke();  

for (let i = 0; i <= 20; i += 5) {
  ellipse(circleX9, circleY9, circleDiameter - i);
}
}}