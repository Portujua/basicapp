var creatures = [];
var food = [];
var debug = false;

function setup() {
  createCanvas(800, 600)

  creatures = Creature.generateRandom(5);
  food = Food.generateRandom(5);
}

function draw() {
  background(51);
  fill(127);
  stroke(200);
  strokeWeight(2);

  for (var c = creatures.length - 1; c >= 0; c--) {
    creatures[c].eat(food);
    creatures[c].update();
    creatures[c].draw();

    // Clone if ready
    var newCreature = creatures[c].clone();

    if (newCreature) {
      creatures.push(newCreature);
    }

    // Check if it's dead so we can convert it into food
    if (creatures[c].isDead) {
      var x = creatures[c].position.x;
      var y = creatures[c].position.y;
      creatures.splice(c, 1);
      food.push(new Food(x, y, 1));
    }
  }

  // Keep at least 5 creatures alive
  if (creatures.length === 0) {
    creatures = Creature.generateRandom(5);
  }

  Food.draw(food);
  Food.spawnRandom(food);
}

function keyPressed(e) {
  if (e.code === 'KeyD') {
    debug = !debug;
  }
}