
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);
  background(0)
  colorMode(HSB,100);



stroke(255)
strokeWeight(5)

let vocalMap = map(vocal,0,100,30,90)
let bassMap = map(bass,0,100,30,90)


let circleScale = vocalMap
let circleHue = vocalMap
let circleMove = bassMap


noStroke()
fill(60,circleHue,100)

for(let i=0; i<3; i++){
let circleGap = i*circleMove +50
circle (320,240+circleGap,circleScale)

for(let i=0; i<3; i++){
let circleGap = i*circleMove +50
circle (320,240-circleGap,circleScale)

for(let i=0; i<3; i++){
let circleGap = i*circleMove+50
circle (320-circleGap,240,circleScale)

for(let i=0; i<3; i++){
let circleGap = i*circleMove+50
circle (320+circleGap,240,circleScale)

for(let i=0; i<2; i++){
let circleGap = i*circleMove+55
circle (320+circleGap,240+circleGap,circleScale)

for(let i=0; i<2; i++){
let circleGap = i*circleMove+55
circle (320+circleGap,240-circleGap,circleScale)

for(let i=0; i<2; i++){
let circleGap = i*circleMove+55
circle (320-circleGap,240-circleGap,circleScale)

for(let i=0; i<2; i++){
let circleGap = i*circleMove+55
circle (320-circleGap,240+circleGap,circleScale)


}}}}}}}}}
