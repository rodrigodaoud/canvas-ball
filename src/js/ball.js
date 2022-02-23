import { RADIUS, MASS } from './constants';
import { getCollision, getVelocity, setBoundaries } from './physics';

export const Ball = (context, canvas, position) => {
  return {
    position: {
      x: position.x,
      y: position.y,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    gravity: {
      x: 0,
      y: 1,
    },
    mass: MASS,
    radius: RADIUS,
    draw() {
      context.beginPath();
      context.arc(this.position.x, this.position.y, RADIUS, 0, Math.PI * 2);
      context.stroke();
    },
    update(balls) {
      getVelocity(this);
      setBoundaries(this, canvas);
      getCollision(this, balls);
    },
  };
};
