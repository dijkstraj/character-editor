import { Character } from "./character";

export class Renderer {
  private initialized = false;
  readonly prefix: string = 'p' + ('' + Math.random()).substring(2);

  private init() {
    if (this.initialized) {
      return;
    }

    const sheet = document.createElement('style');
    sheet.innerHTML = `
      .${this.prefix}-character {
        position: absolute;
        transform: scale(4);
        image-rendering: pixelated;
      }
      .${this.prefix}-character > div {
        position: absolute;
        width: 16px;
        height: 16px;
      }
      @-moz-document url-prefix() {
        .${this.prefix}-character {
          image-rendering: crisp-edges;
        }
      }
    `;
    document.head.appendChild(sheet);
    this.initialized = true;
  }

  render(character: Character): HTMLDivElement {
    this.init();

    const c = document.createElement('div');
    c.className = `${this.prefix}-character`;
    document.body.appendChild(c);
  
    character.sprites.forEach(sprite => {
      const p = document.createElement('div');
      p.setAttribute('style', `background-position: -${sprite.x}px -${sprite.y}px; background-image: url(${sprite.sheet.url});`);
      c.appendChild(p);
    });
  
    return c;
  }
}
