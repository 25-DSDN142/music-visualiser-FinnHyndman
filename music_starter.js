let firstRun = true;
let myImage; 

// canvas centre
let x = 320;
let y = 240;
let maskRadius = 220; 

//traveling
let xMove = 600; //start location
let minSpeed = 10;
let maxSpeed = 35;
let travelingY = 300;

let scale = 100;
let glow = 100;

let travelingActive = false;

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER);
  textSize(24);
  background(0);

  if(firstRun){
    myImage = loadImage('diskteaxture.png');
    firstRun = false;
  }

  diskSetUp();

  pulsingCircleVocal();
  pulsingCircleDrum();
  pulsingCircleBass();

  if (words === "phase") {
    travelingActive = true;  // start animation
  }
  if (words === "Current") {
    travelingActive = false; // stop animation
  }

  if (travelingActive) {
    travellingBall(); 
  }

  grainOverlay();
  diskOverlay();

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

  function pulsingCircleVocal(){
    let shapeRatio = vocal / 100; //scaling vocal values to be between 0 - 1
    let red   = lerp(0, 200, shapeRatio);
    let green = lerp(200, 220, shapeRatio);
    let blue = lerp(255, 255, shapeRatio);
    let vocalScale = map(vocal, 0, 100, 20, 300);

    for (let sizeShape1 = vocalScale; sizeShape1 > 0; sizeShape1 -= 5) {
      let fadeShape = map(sizeShape1, 0, vocalScale, 0, 80); // fade edges
      fill(red, green, blue, fadeShape);              
      noStroke();
      ellipse(320, 20, sizeShape1, sizeShape1);
    }
  }

  function pulsingCircleDrum(){
    let shapeRatio = drum / 100; 
    let red   = lerp(0, 0, shapeRatio);
    let green = lerp(200, 50, shapeRatio);
    let blue  = lerp(255, 150, shapeRatio);
    let vocalScale = map(drum, 0, 100, 20, 300);

    for (let sizeShape1 = vocalScale; sizeShape1 > 0; sizeShape1 -= 5) {
      let fadeShape1 = map(sizeShape1, 0, vocalScale, 0, 80); 
      fill(red, green, blue, fadeShape1);              
      noStroke();
      ellipse(129.47, 350, sizeShape1, sizeShape1);
    }
  }

  function pulsingCircleBass(){
    let shapeRatio = bass / 100; 
    let red   = lerp(0, 0, shapeRatio);
    let green = lerp(200, 120, shapeRatio);
    let blue  = lerp(255, 220, shapeRatio);
    let vocalScale = map(bass, 0, 100, 20, 300);

    for (let sizeShape1 = vocalScale; sizeShape1 > 0; sizeShape1 -= 5) {
      let fadeShape1 = map(sizeShape1, 0, vocalScale, 0, 80); 
      fill(red, green, blue, fadeShape1);              
      noStroke();
      ellipse(510.53, 350, sizeShape1, sizeShape1);
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
  }
}
