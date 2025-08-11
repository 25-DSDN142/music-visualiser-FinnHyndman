
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);
  
  

   let cirleScale = drum;
   let colourValueA = map (vocal,0,100,0,255)
   let colourValueB = bass
   let colourValueC = other

   //let backgroundColA = 300-colourValueA
   //let backgroundColB = 100-colourValueB
   //let backgroundColC = 100-colourValueC

 //  background(backgroundColA,backgroundColB,backgroundColC)
background(0)

// changes 
fill(colourValueA, colourValueB, colourValueC);
circle (320,240,cirleScale*3)

}