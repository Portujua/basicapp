class DNA {
  constructor(dna = [random(), -random(0, 0.5), random(0, 200), random(0, 100), random(0.5, 5), random(0.1, 0.6)]) {
    this.data = [
      dna[DNA.getFoodAttractionIndex()], 
      dna[DNA.getPoisonRepultionIndex()], 
      dna[DNA.getFoodViewRadiusIndex()], 
      dna[DNA.getPoisonViewRadiusIndex()], 
      dna[DNA.getMaxSpeedIndex()],
      dna[DNA.getMaxForceIndex()],
    ];
  }

  static getFoodAttractionIndex() {
    return 0;
  }

  static getPoisonRepultionIndex() {
    return 1;
  }

  static getFoodViewRadiusIndex() {
    return 2;
  }

  static getPoisonViewRadiusIndex() {
    return 3;
  }

  static getMaxSpeedIndex() {
    return 4;
  }

  static getMaxForceIndex() {
    return 5;
  }

  mutate(chance = 0.1) {
    return [
      this.getFoodAttraction() * (random() < chance ? random(0.8, 1.2) : 1),
      this.getPoisonRepultion() * (random() < chance ? random(0.8, 1.2) : 1),
      this.getFoodViewRadius() * (random() < chance ? random(0.8, 1.1) : 1),
      this.getPoisonViewRadius() * (random() < chance ? random(0.8, 1.2) : 1),
      this.getMaxSpeed() * (random() < chance ? random(-0.1, 0.1) : 1),
      this.getMaxForce() * (random() < chance ? random(-0.1, 0.1) : 1),
    ]
  }

  getFoodAttraction() {
    return this.data[DNA.getFoodAttractionIndex()]
  }

  getPoisonRepultion() {
    return this.data[DNA.getPoisonRepultionIndex()]
  }

  getFoodViewRadius() {
    return this.data[DNA.getFoodViewRadiusIndex()]
  }

  getPoisonViewRadius() {
    return this.data[DNA.getPoisonViewRadiusIndex()]
  }

  getMaxSpeed() {
    return this.data[DNA.getMaxSpeedIndex()]
  }

  getMaxForce() {
    return this.data[DNA.getMaxForceIndex()]
  }
}