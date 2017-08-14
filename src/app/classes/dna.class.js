class DNA {
  constructor(dna = [random(), -random(), random(0, 200), random(0, 100)]) {
    this.data = [
      dna[DNA.getFoodAttractionIndex()], 
      dna[DNA.getPoisonAttractionIndex()], 
      dna[DNA.getFoodViewRadiusIndex()], 
      dna[DNA.getPoisonViewRadiusIndex()], 
    ];
  }

  static getFoodAttractionIndex() {
    return 0;
  }

  static getPoisonAttractionIndex() {
    return 1;
  }

  static getFoodViewRadiusIndex() {
    return 2;
  }

  static getPoisonViewRadiusIndex() {
    return 3;
  }

  mutate(chance = 0.1) {
    return [
      this.getFoodAttraction() * (random() < chance ? random() : 1),
      this.getPoisonAttraction() * (random() < chance ? random() : 1),
      this.getFoodViewRadius() * (random() < chance ? random() : 2),
      this.getPoisonViewRadius() * (random() < chance ? random() : 2),
    ]
  }

  getFoodAttraction() {
    return this.data[0]
  }

  getPoisonAttraction() {
    return this.data[1]
  }

  getFoodViewRadius() {
    return this.data[2]
  }

  getPoisonViewRadius() {
    return this.data[3]
  }
}