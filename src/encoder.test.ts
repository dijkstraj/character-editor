import {Character} from './character';
import {encode, decode} from './encoder';

const c = {
  sprites: [
    {x: 0, y: 0, sheet: {url: 'https://somewhere.com/sprites.png'}},
    {x: 16, y: 0, sheet: {url: 'https://example.com/sprites.png'}},
    {x: 16, y: 0, sheet: {url: 'https://example.com/sprites.png'}},
    {x: 16, y: 16, sheet: {url: 'https://example.com/sprites.png'}},
    {x: 32, y: 16, sheet: {url: 'https://example.com/sprites.png'}}
  ]
};

test('encoder', () => {
  expect(decode(encode(c))).toStrictEqual(c);
});

test('encoded size', () => {
  expect(encode(c).length).toBeLessThan(200);
});
