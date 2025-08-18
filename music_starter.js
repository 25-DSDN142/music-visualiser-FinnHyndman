let firstRun = true;

let myImage; 

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

// canvas centre
let x = 320
let y = 240
let maskRadius = 220; 

drawingContext.save();
drawingContext.beginPath();
drawingContext.arc(x, y, maskRadius, 0, 360); // use degrees
drawingContext.clip();

//disk colour 
fill(20)
circle (x,y,440) 

//Pulsing Blob
let t = vocal / 100; //scaling vocal values to be between 0 - 1
let red = lerp(255, 0, t);   // orange to blue
let green = lerp(136, 200, t); // orange to blue
let blue = lerp(0, 255, t);   // orange to blue
let vocalScale = map(vocal, 0, 100, 0, 300);

  for (let size = vocalScale; size > 0; size -= 5) {
    let fade = map(size, 0, vocalScale, 0, 80); // fade edges
    fill(red, green, blue, fade);              // cyan glow
    noStroke();
    ellipse(x, y, size, size);
    

  //grain overlay
  let grainAmount = map(bass, 0, 100, 800, 1000); // scale bass to quantity of cirlce drawn for grain effect.
  fill(255, 255, 255, 15); // semi-transparent white
  noStroke();
  for (let i = 0; i < grainAmount; i++) {
    ellipse(random(width), random(height), 1.5, 1.5);
  }

fill(30,30,30,20)
stroke (30)
circle (x,y,140) 

fill(0)
circle (x,y,40) 
  }}