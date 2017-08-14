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
  }

  draw() {
    textSize(16);
    fill(255, 255, 255);
    noStroke();

    text('Totals:', 5, 20);

    textSize(10);
    text(`Clones: ${this.totalClones}`, 10, 35);
    text(`Deads by hunger: ${this.deadsByHunger}`, 10, 45);
    text(`Deads by overweight: ${this.deadsByOverweight}`, 10, 55);
    text(`Food Eaten: ${this.totalFoodEaten}`, 10, 65);
    text(`Poison Eaten: ${this.totalPoisonEaten}`, 10, 75);
    text(`Bodies Eaten: ${this.totalBodiesEaten}`, 10, 85);
    text(`Extinctions: ${this.totalForceRespawn}`, 10, 95);

    textSize(16);
    text('Averages:', 10, 125);

    textSize(10);
    text(`Food Vision: ${this.avgFoodVision.toFixed(2)}`, 10, 140);
    text(`Food Attraction: ${this.avgFoodAttraction.toFixed(2)}`, 10, 150);
    text(`Poison Vision: ${this.avgPoisonVision.toFixed(2)}`, 10, 160);
    text(`Poison Repultion: ${-this.avgPoisonRepultion.toFixed(2)}`, 10, 170);
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