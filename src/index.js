import { Ball } from './js/ball';
import './style/index.css';

export const Canvas = () => {
  const canvas = document.getElementById('canvas');
  let context;
  let balls = [];

  if (canvas) {
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener('click', (e) => {
      balls.push(Ball(context, canvas, { x: e.clientX, y: e.clientY }));
      console.log(balls);
    });
  }

  const update = () => {
    context && context.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => {
      ball.draw();
      ball.update(balls);
    });

    requestAnimationFrame(update);
  };

  update();
};

Canvas();
