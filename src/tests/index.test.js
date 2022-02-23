describe('canvas', () => {
  let canvas, ctx;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  it('should render', () => {
    expect(canvas).toHaveAttribute('width', window.innerWidth.toString());
    expect(canvas).toHaveAttribute('height', window.innerHeight.toString());
  });
});
