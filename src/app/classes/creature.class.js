class Creature {
  constructor(x, y, dna = null) {
    this.x = x;
    this.y = y;

    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.position = createVector(x, y);
    this.r = 4;
    this.maxSpeed = 2;
    this.maxForce = 0.2;
    this.health = 1;

    this.dna = dna || new DNA();
  }

  static healthDecay(health) {
    return health -= 0.001;
  }

  static shouldDie(health) {
    if (health < -1 || health > 5.0) {
      return true;
    }
    
    return false;
  }

  update() {
    if (this.isDead) {
      return;
    }

    this.velocity.add(this.acceleration);

    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    this.acceleration.mult(0);

    this.health = Creature.healthDecay(this.health);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }
  
  seek(target) {
    var desired = p5.Vector.sub(target, this.position);

    desired.setMag(this.maxSpeed);

    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  eat(food) {
    if (this.isDead) {
      return;
    }

    var closest = [{ position: null, distance: Infinity }, { position: null, distance: Infinity }];

    for (var i = food.length - 1; i >= 0; i--) {
      var d = dist(this.position.x, this.position.y, food[i].position.x, food[i].position.y);

      closest[DNA.getFoodAttractionIndex()] = (d < closest[DNA.getFoodAttractionIndex()].distance && food[i].isFood() && d < this.dna.getFoodViewRadius())
        ? { position: food[i].position, distance: d } : closest[DNA.getFoodAttractionIndex()];
      
      closest[DNA.getPoisonAttractionIndex()] = (d < closest[DNA.getPoisonAttractionIndex()].distance && food[i].isPoison() && d < this.dna.getPoisonViewRadius())
        ? { position: food[i].position, distance: d } : closest[DNA.getPoisonAttractionIndex()];

      if (d < 5) {
        this.health += food[i].getNutrition();
        food.splice(i, 1);
      }
    }

    if (closest[DNA.getFoodAttractionIndex()].position !== null) {
      var steer = this.seek(closest[DNA.getFoodAttractionIndex()].position);
      steer.mult(this.dna.getFoodAttraction());
      this.applyForce(steer);
    }

    if (closest[DNA.getPoisonAttractionIndex()].position !== null) {
      var steer = this.seek(closest[DNA.getPoisonAttractionIndex()].position);
      // Let's make every food FOOD even if it's poison.
      // The only way creatures can identify poison is if it's inside their view radius
      steer.mult(closest[DNA.getPoisonAttractionIndex()].distance > this.dna.getPoisonViewRadius() ? 2 : this.dna.getPoisonAttraction());
      this.applyForce(steer);
    }

    // If it's not moving towards nothing
    if (closest[DNA.getFoodAttractionIndex()].position === null && closest[DNA.getPoisonAttractionIndex()].position == null) {
      // Seek some random point inside canvas
      this.randomSeekingPoint = this.randomSeekingPoint && (!this.isNear(this.randomSeekingPoint)) ? this.randomSeekingPoint : createVector(random(width), random(height));
      this.applyForce(this.seek(this.randomSeekingPoint))
    }

    // Check if it's dead
    this.isDead = Creature.shouldDie(this.health);
  }

  isNear(target, nearFactor = 15) {
    return dist(this.position.x, this.position.y, target.x, target.y) < nearFactor;
  }

  draw() {
    if (this.isDead) {
      return;
    }

    // Color based on health
    var green = color(0, 255, 0);
    var red = color(255, 0, 0);
    var col = lerpColor(red, green, this.health)

    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    // Draw the this itself
    fill(col);
    stroke(col);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);

    if (debug) {
      // Show Food Attraction DNA
      stroke(0, 255, 0);
      line(0, -10, this.dna.getFoodAttraction() * 50, 0);

      // Show Poison Attraction DNA
      stroke(255, 0, 0);
      line(0, -10, -this.dna.getPoisonAttraction() * 50, 0);

      // Show Food View Radius
      noFill();
      stroke(0, 255, 0);
      ellipse(0, 0, this.dna.getFoodViewRadius());

      // Show Food View Radius
      stroke(255, 0, 0);
      ellipse(0, 0, this.dna.getPoisonViewRadius());
    }

    pop();
  }

  canClone() {
    // In order to clone the creature must have more than 0.5 health
    // and half of it will be reduced from the parent.
    return this.health >= 2;
  }

  clone() {
    if (this.canClone()) {
      this.health = 0.5;
      var newDNA = new DNA(this.dna.data);
      newDNA.mutate();
      return new Creature(random(width), random(height), newDNA);
    }

    return null;
  }

  static draw(creature) {
    // creature might be a creature object or an array of creature objects
    if (creature instanceof Array) {
      for (var i = creature.length - 1; i >= 0; i--) {
        Creature.draw(creature[i]);
      }
    }
    else {
      if (creature.isDead) {
        return;
      }

      creature.draw();
    }
  }

  static update(creature) {
    if (creature instanceof Array) {
      for (var i = creature.length - 1; i >= 0; i--) {
        Creature.update(creature[i]);
      }
    }
    else {
      if (creature.isDead) {
        return;
      }

      creature.update();
    }
  }

  static eat(creature, food) {
    if (creature instanceof Array) {
      for (var i = creature.length - 1; i >= 0; i--) {
        Creature.eat(creature[i], food);
      }
    }
    else {
      if (creature.isDead) {
        return;
      }

      creature.eat(food);
    }
  }

  static generateRandom(n = 1) {
    var r = [];

    for (var i = 0; i < n; i++) {
      r.push(new Creature(random(width), random(height)));
    }

    if (n === 1) {
      return new Creature(random(width), random(height));
    }
    else {
      return r;
    }
  }
}