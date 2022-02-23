import { getDistance, rotate } from '../js/physics';

describe('canvas', () => {
  it('should return expected distance', () => {
    const distance = getDistance(10, 20, 30, 25);

    expect(distance).toEqual(20.615528128088304);
  });

  it('should return expected rotation velocity', () => {
    const rotation = rotate({ x: -1.8756095474377787, y: 8.460432885618957 }, 10);

    expect(rotation).toEqual({ x: 6.176424667958392, y: -6.078537168393192 });
  });
});
