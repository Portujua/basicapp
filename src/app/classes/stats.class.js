class Stats {
  constructor() {
    this.enabled = false;

    this.deadsByHunger = 0;
    this.deadsByOverweight = 0;
    this.totalClones = 0;
    this.totalFoodEaten = 0;
    this.totalPoisonEaten = 0;
    this.totalBodiesEaten = 0;
    this.totalForceRespawn = 0;

    this.avgFoodVision = null;
    this.avgFoodAttraction = null;
    this.avgPoisonVision = null;
    this.avgPoisonRepultion = null;
    this.avgMaxSpeed = null;
    this.avgMaxForce = null;

    this.maxFoodVision = 0;
    this.maxFoodAttraction = 0;
    this.maxPoisonVision = 0;
    this.maxPoisonRepultion = 0;
    this.maxMaxSpeed = 0;
    this.maxMaxForce = 0;
  }

  draw() {
    textSize(16);
    fill(255, 255, 255);
    noStroke();

    var y = 20;

    text('Totals:', 5, y); y+=15;

    textSize(10);
    text(`Clones: ${this.totalClones}`, 10, y);  y+=10;
    text(`Deads by hunger: ${this.deadsByHunger}`, 10, y);  y+=10;
    text(`Deads by overweight: ${this.deadsByOverweight}`, 10, y);  y+=10;
    text(`Food Eaten: ${this.totalFoodEaten}`, 10, y);  y+=10;
    text(`Poison Eaten: ${this.totalPoisonEaten}`, 10, y);  y+=10;
    text(`Bodies Eaten: ${this.totalBodiesEaten}`, 10, y);  y+=10;
    text(`Extinctions: ${this.totalForceRespawn}`, 10, y);  y+=10;

    y+=20;

    textSize(16);
    text('Averages:', 10, y); y+=15;

    textSize(10);
    text(`Food Vision: ${this.avgFoodVision.toFixed(2)}`, 10, y);  y+=10;
    text(`Food Attraction: ${this.avgFoodAttraction.toFixed(2)}`, 10, y);  y+=10;
    text(`Poison Vision: ${this.avgPoisonVision.toFixed(2)}`, 10, y);  y+=10;
    text(`Poison Repultion: ${-this.avgPoisonRepultion.toFixed(2)}`, 10, y);  y+=10;
    text(`Max Speed: ${this.avgMaxSpeed.toFixed(2)}`, 10, y);  y+=10;
    text(`Max Force: ${this.avgMaxForce.toFixed(2)}`, 10, y);  y+=10;

    y+=20;

    textSize(16);
    text('Records:', 10, y); y+=15;

    textSize(10);
    text(`Max Food Vision: ${this.maxFoodVision.toFixed(2)}`, 10, y);  y+=10;
    text(`Max Food Attraction: ${this.maxFoodAttraction.toFixed(2)}`, 10, y);  y+=10;
    text(`Max Poison Vision: ${this.maxPoisonVision.toFixed(2)}`, 10, y);  y+=10;
    text(`Max Poison Repultion: ${this.maxPoisonRepultion.toFixed(2)}`, 10, y);  y+=10;
    text(`Max Speed: ${this.maxMaxSpeed.toFixed(2)}`, 10, y);  y+=10;
    text(`Max Force: ${this.maxMaxForce.toFixed(2)}`, 10, y);  y+=10;
  }

  addMaxValues(creature) {
    if (!(creature instanceof Creature)) {
      throw 'Parameter {0} must be Creature object';
      return;
    }

    this.maxFoodVision = creature.dna.getFoodViewRadius() > this.maxFoodVision 
      ? creature.dna.getFoodViewRadius() : this.maxFoodVision;

    this.maxFoodAttraction = creature.dna.getFoodAttraction() > this.maxFoodAttraction 
      ? creature.dna.getFoodAttraction() : this.maxFoodAttraction;

    this.maxPoisonVision = creature.dna.getPoisonViewRadius() > this.maxPoisonVision 
      ? creature.dna.getPoisonViewRadius() : this.maxPoisonVision;

    this.maxPoisonRepultion = abs(creature.dna.getPoisonRepultion()) > this.maxPoisonRepultion 
      ? abs(creature.dna.getPoisonRepultion()) : this.maxPoisonRepultion;

    this.maxMaxSpeed = creature.dna.getMaxSpeed() > this.maxMaxSpeed 
      ? creature.dna.getMaxSpeed() : this.maxMaxSpeed;

    this.maxMaxForce = creature.dna.getMaxForce() > this.maxMaxForce 
      ? creature.dna.getMaxForce() : this.maxMaxForce;
  }

  addToAverage(prop, val) {
    if (typeof(this[prop]) == 'undefined') {
      throw `Propery "${prop}" undefined`;
      return;
    }

    this[prop] = (this[prop] + val) / 2;
  }

  getAverage(prop) {
    if (typeof(this[prop]) == 'undefined') {
      throw `Propery "${prop}" undefined`;
      return 0;
    }
    
    return this[prop];
  }
}