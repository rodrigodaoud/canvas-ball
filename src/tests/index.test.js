import { JSDOM } from 'jsdom';
import { Canvas } from '../index';

describe('canvas', () => {
  const dom = new JSDOM(`<!DOCTYPE html><canvas data-testid="canvas />`);

  const canvas = Canvas(dom);

  it('should render', () => {
    expect(canvas).toHaveAttribute('width', window.innerWidth.toString());
  });
});

// Couldn't really make this one work.
