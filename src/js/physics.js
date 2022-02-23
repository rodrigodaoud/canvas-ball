import { BOUNCE_FACTOR } from './constants';

export const getDistance = (x1, y1, x2, y2) => {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

export const setBoundaries = (ball, canvas) => {
  const { position, radius, velocity, gravity } = ball;
  const ground = canvas.height - radius;

  if (position.y >= ground) {
    position.y = ground - (position.y - ground);
    velocity.y = -Math.abs(velocity.y) * BOUNCE_FACTOR;

    if (velocity.y >= -gravity.y) {
      velocity.y = 0;
      position.y = ground - gravity.y;
    }
  }
};

export const getVelocity = (ball) => {
  const { position, velocity, gravity } = ball;

  velocity.x += gravity.x;
  velocity.y += gravity.y;
  position.x += velocity.x;
  position.y += velocity.y;
};

export const getCollision = (currentBall, balls) => {
  for (let i = 0; i < balls.length; i++) {
    if (currentBall === balls[i]) continue;

    if (
      getDistance(
        currentBall.position.x,
        currentBall.position.y,
        balls[i].position.x,
        balls[i].position.y,
      ) -
        currentBall.radius * 2 <
      0
    ) {
      resolveCollision(currentBall, balls[i]);
    }
  }
};

// credits to https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc

export const rotate = (velocity, angle) => {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
};

export const resolveCollision = (particle, otherParticle) => {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.position.x - particle.position.x;
  const yDist = otherParticle.position.y - particle.position.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.position.y - particle.position.y,
      otherParticle.position.x - particle.position.x,
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
};
