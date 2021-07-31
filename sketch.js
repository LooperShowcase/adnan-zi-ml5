let player;
let bgImage;
let playerImage;
let obstacleImage;
let obstcles = [];
let wordclassifier;

function preload() {
  bgImage = loadImage("back.png");
  playerImage = loadImage("player.png");
  obstacleImage = loadImage("obstcle.png");

  let options = {
    probabilityThreshold: 0.85,
  };
  wordclassifier = ml5.soundClassifier("SpeechCommands18w", options);
}

function setup() {
  createCanvas(800, 400);
  player = new Player();
  wordclassifier.classify(hearWord);
}

function hearWord(error, results) {
  if (results[0].label === "up") player.jump();
}

function keyPressed() {
  if (key === " ") {
    player.jump();
  }
}

function draw() {
  if (random(1) < 0.01) {
    obstcles.push(new Obstcle());
  }

  background(bgImage);
  player.show();
  player.move();

  for (let obs of obstcles) {
    obs.show();
    obs.move();
    if (player.collided(obs)) {
      console.log("Game-Over");
      noLoop();
    }
  }
}
