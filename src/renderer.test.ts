import { Character } from "./character";
import { Renderer } from "./renderer";
import { Sprite } from "./sprite";

function createCharacter(spriteCount: number): Character {
  return {
    sprites: [...new Array<Sprite>(spriteCount)].map((_, i) => ({
      x: i,
      y: i,
      sheet: { url: `http://www.example.com/${i}.png` },
    })),
  };
}

describe("body rendering", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("render should create an element per character", () => {
    const r = new Renderer();
    r.render(createCharacter(17));
    expect(document.body.childElementCount).toBe(1);
  });
});

describe("head rendering", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  test("renderer should only create css once", () => {
    const r = new Renderer();
    r.render(createCharacter(0));
    r.render(createCharacter(0));
    r.render(createCharacter(0));
    expect(document.head.childElementCount).toBe(1);
  });
});

test("render should create an element per sprite", () => {
  const r = new Renderer();
  for (let i = 0; i < 42; i++) {
    expect(r.render(createCharacter(i)).childElementCount).toBe(i);
  }
});

test("renderers should generate unique prefixes", () => {
  const r1 = new Renderer();
  const r2 = new Renderer();
  expect(r1.prefix).not.toEqual(r2.prefix);
});

test('renderer should inline background-position and background-images rules', () => {
  const r = new Renderer();
  expect(r.render(createCharacter(2))).toMatchInlineSnapshot(`
    <div
      class="${r.prefix}-character"
    >
      <div
        style="background-position: -0px -0px; background-image: url(http://www.example.com/0.png);"
      />
      <div
        style="background-position: -1px -1px; background-image: url(http://www.example.com/1.png);"
      />
    </div>
  `);
});
