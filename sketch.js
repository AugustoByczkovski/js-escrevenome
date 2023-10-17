function setup() {
  createCanvas(1100, 800);
  background("white")
}

function draw() {
  stroke("black");
  fill("black");
  
  // console.log(mouseIsPressed)
  
  if (mouseIsPressed) {
    rect(mouseX, mouseY, 20, 35);
  }
}