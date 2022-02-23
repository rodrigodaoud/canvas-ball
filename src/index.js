import { Ball } from './js/ball';
import './style/index.css';

(() => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let balls = [];

  canvas.addEventListener('click', (e) => {
    balls.push(Ball(context, canvas, { x: e.clientX - rect.left, y: e.clientY - rect.y }));
  });

  const update = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => {
      ball.draw();
      ball.update(balls);
    });

    requestAnimationFrame(update);
  };

  update();
})();
