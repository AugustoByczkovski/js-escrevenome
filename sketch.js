let corAtual;
let tamanhoBrush;

function setup() { 
  createCanvas(1100, 800); 
  background("white");
  corAtual = "black"; // cor inicial
  tamanhoBrush = 20; // tamanho inicial do brush
} 

function draw() { 
  stroke(corAtual); 
  fill(corAtual); 

  if (mouseIsPressed) { 
    rect(mouseX, mouseY, tamanhoBrush, tamanhoBrush); 
  } 
} 

function keyPressed() {
  if (key === 'b') {
    corAtual = "white";
  } else if (key === 'p') {
    corAtual = "black";
  } else if (keyCode === UP_ARROW) {
    tamanhoBrush += 5;
  } else if (keyCode === DOWN_ARROW) {
    tamanhoBrush -= 5;
    if (tamanhoBrush < 5) {
      tamanhoBrush = 5; // não deixa o tamanho do brush ser menor que 5
    }
  }
}
