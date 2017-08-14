var creatures = [];
var food = [];
var debug = false, info = true;
var stats;

function setup() {
  createCanvas(800, 600)

  stats = new Stats();
  creatures = Creature.generateRandom(5);
  food = Food.generateRandom(5);
}

function draw() {
  background(51);
  fill(127);
  stroke(200);
  strokeWeight(2);

  for (var c = creatures.length - 1; c >= 0; c--) {
    stats.addToAverage('avgFoodVision', creatures[c].dna.getFoodViewRadius());
    stats.addToAverage('avgFoodAttraction', creatures[c].dna.getFoodAttraction());
    stats.addToAverage('avgPoisonVision', creatures[c].dna.getPoisonViewRadius());
    stats.addToAverage('avgPoisonRepultion', creatures[c].dna.getPoisonRepultion());
    stats.addToAverage('avgMaxSpeed', creatures[c].dna.getMaxSpeed());
    stats.addToAverage('avgMaxForce', creatures[c].dna.getMaxForce());
    stats.addMaxValues(creatures[c]);

    creatures[c].eat(food);
    creatures[c].update();
    creatures[c].draw();

    // Clone if ready
    var newCreature = creatures[c].clone();

    if (newCreature) {
      stats.totalClones++;
      creatures.push(newCreature);
    }

    // Check if it's dead so we can convert it into food
    if (creatures[c].isDead) {
      if (creatures[c].health > 0) {
        stats.deadsByOverweight++;
      }
      else {
        stats.deadsByHunger++;
      }

      var x = creatures[c].position.x;
      var y = creatures[c].position.y;
      creatures.splice(c, 1);
      food.push(new Food(x, y, 8));
    }
  }

  // Keep at least 5 creatures alive
  if (creatures.length === 0) {
    stats.totalForceRespawn++;
    creatures = Creature.generateRandom(5);
  }

  Food.draw(food);
  Food.spawnRandom(food);

  if (stats.enabled) {
    stats.draw();
  }

  // Draw info
  if (info) {
    textSize(24);
    fill(255, 255, 255);
    noStroke();
    text('Info', width - 115, 30);
    text('___', width - 115, 30);
    textSize(12);
    text(' I - Hide info', width - 115, 50);
    text('S - Show stats', width - 115, 65);
    text('D - Show debug info', width - 115, 80);
  }
}

function keyPressed(e) {
  if (e.code === 'KeyI') {
    info = !info;
  }

  if (e.code === 'KeyD') {
    debug = !debug;
  }

  if (e.code === 'KeyS') {
    stats.enabled = !stats.enabled;
  }
}