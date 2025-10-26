let blooms = [];
const BLOOMS_PER_CLICK = 5;
const JITTER = 18;

let TITLE_A = "Weather";
let TITLE_B = " in ";
let TITLE_C = "Hayward";
let SUBTITLE = "click the screen, C to restart";

function randomizer(range) {
  return random(-range, range);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  textFont("Helvetica");
}

function draw() {
  background(0, 0, 0);
  drawHeader();

  for (let i = 0; i < blooms.length; i++) {
    let b = blooms[i];

    if (abs(b.rTarget - b.r) < 0.3) b.r = b.rTarget;
    else b.r += 0.15 * (b.rTarget - b.r);

    noStroke();
    for (let k = 14; k >= 0; k--) {
      let rr = b.r + k * 6;
      let a = map(k, 14, 0, 0.05, 0.22);
      fill(b.hue, 70, 95, a);
      circle(b.x, b.y, rr * 2);
    }
    fill(b.hue, 80, 95, 0.9);
    circle(b.x, b.y, b.r * 2);

    fill(0, 0, 100, 0.95);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(constrain(b.r * 0.33, 10, 26));
    text(b.tempF + "°F", b.x, b.y);
  }
}

function mousePressed() {
  addCluster(mouseX, mouseY);
}

function addCluster(x, y) {
  for (let i = 0; i < BLOOMS_PER_CLICK; i++) {
    let tempC = random(10, 30);
    let tempF = Math.round((tempC * 9) / 5 + 32);
    let hue = map(tempC, 10, 30, 200, 0);
    let rT = map(tempC, 10, 30, 24, 140);

    blooms.push({
      x: x + randomizer(JITTER),
      y: y + randomizer(JITTER),
      r: 6,
      rTarget: rT,
      hue: hue,
      tempF: tempF,
    });
  }
}

function keyPressed() {
  if (key === "C" || key === "c") blooms = [];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawHeader() {
  const fs = constrain(width * 0.08, 28, 90);
  const subFs = max(14, fs * 0.33);
  const yMain = fs + 20;

  textAlign(LEFT, BASELINE);
  fill(0, 0, 100);

  textSize(fs);
  textStyle(BOLD);
  const wA = textWidth(TITLE_A);
  textStyle(NORMAL);
  const wB = textWidth(TITLE_B);
  textStyle(ITALIC);
  const wC = textWidth(TITLE_C);
  const x0 = width / 2 - (wA + wB + wC) / 2;

  textSize(fs);
  textStyle(BOLD);
  text(TITLE_A, x0, yMain);
  textStyle(NORMAL);
  text(TITLE_B, x0 + wA, yMain);
  textStyle(ITALIC);
  text(TITLE_C, x0 + wA + wB, yMain);

  textStyle(NORMAL);
  textAlign(CENTER, BASELINE);
  textSize(subFs);
  text(SUBTITLE, width / 2, yMain + subFs + 8);
}
