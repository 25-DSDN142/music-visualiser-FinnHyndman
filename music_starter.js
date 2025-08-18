

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);
  background(0)

// canvas centre
let x = 320
let y = 240

let t = vocal / 100; //scaling vocal values to be between 0 - 1
//lerp each color channel
let red = lerp(255, 0, t);   // orange to blue
let green = lerp(136, 200, t); // orange to blue
let blue = lerp(0, 255, t);   // orange to blue

//scaling to make vocals scale to circle size
let vocalScale = map(vocal, 0, 100, 0, 300);

 // blob with fading edges using a for loop
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


  fill(255)
  circle (x,y,420)

  
  }}