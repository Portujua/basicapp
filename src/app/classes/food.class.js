class Food {
  constructor(x, y, type = null) {
    this.x = x;
    this.y = y;
    this.position = createVector(x, y);
    this.createdAt = new Date();

    var poisonProbability = 0.2;

    this.type = type === null
      ? (random() < poisonProbability ? -1 : 1)
      : type;
  }

  getNutrition() {
    return this.isFood() ? this.type * 0.25 : -0.5;
  }

  isFood() {
    return this.type >= 0;
  }

  isPoison() {
    return this.type < 0;
  }

  isBody() {
    return this.type > 1;
  }

  timeAvailable() {
    var now = new Date();

    return now.getTime() - this.createdAt.getTime();
  }

  static maxTimeAvailable() {
    return 10 * 1000;
  }

  static foodIndex() {
    return 0;
  }

  static poisonIndex() {
    return 1;
  }

  static generateRandom(n = 1) {
    var r = [];

    for (var i = 0; i < n; i++) {
      r.push(new Food(random(width), random(height)));
    }

    if (n === 1) {
      return new Food(random(width), random(height));
    }
    else {
      return r;
    }
  }

  static size() {
    return 5;
  }

  static draw(food) {
    // food might be a Food object or an array of Food objects
    if (food instanceof Array) {
      for (var i = food.length - 1; i >= 0; i--) {
        Food.draw(food[i]);
      }
    }
    else {
      // Color based on type
      var green = color(0, 255, 0);
      var red = color(255, 0, 0);
      var col = lerpColor(red, green, food.type)

      fill(col);
      stroke(col);
      ellipse(food.position.x, food.position.y, Food.size(), Food.size())
    }
  }

  static maxAllowed() {
    return 50;
  }

  static spawnRandom(food, interval = 1) {
    var now = new Date();

    if (now.getTime() % interval === 0) {
      if (food.length < Food.maxAllowed()) {
        food.push(Food.generateRandom());
      }
    }
  }
}