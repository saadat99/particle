const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    particlesAmount = Math.floor(window.innerWidth / 10);
    for (let i = 0; i < particlesAmount; i++) {
        particles.push(new Particle);
    }
}

function draw() {
    background(82, 55, 144);
    particles.forEach((particle, index) => {
        particle.draw();
        particle.update();
        particle.connectParticles(particles.slice(index));
    })
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-1, 1), random(-1, +1));
        this.size = 10;
    }

    // Edge detection
    edges() {
        if (this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1;
        }
    }

    // Update movement
    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    draw() {
        noStroke();
        fill('rgba(255,255,255, 0.5)');
        circle(this.pos.x, this.pos.y, this.size);
    }

    connectParticles(particles) {
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            if (d < 120) {
                stroke('rgba(255,255,255,0.1)');
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
        });
    }
}