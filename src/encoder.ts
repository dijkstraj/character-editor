import {Character} from './character';

type CharacterInterchange = [number, Array<string>, Array<Array<number>>];
type Encoder = (character: Character) => CharacterInterchange;
type Decoder = (interchange: CharacterInterchange) => Character;

const encoders: Record<number, Encoder> = {
  1: (character: Character): CharacterInterchange => {
    let sheets = [...new Set(character.sprites.map(s => s.sheet.url))];
    return [1, sheets, character.sprites.map(s => [s.x, s.y, sheets.indexOf(s.sheet.url)])];
  }
};

const decoders: Record<number, Decoder> = {
  1: function (interchange: CharacterInterchange): Character {
    const sheets = interchange[1];
    const sprites = interchange[2];
    return {
      sprites: sprites.map(s => ({
        x: s[0],
        y: s[1],
        sheet: {
          url: sheets[s[2]]
        }
      }))
    };
  }
};

export function encode(character: Character): string {
  const interchange = encoders[1](character);
  return window.encodeURIComponent(window.btoa(JSON.stringify(interchange)));
}

export function decode(encoded: string): Character {
  const interchange = JSON.parse(window.atob(window.decodeURIComponent(encoded)));
  return decoders[interchange[0]](interchange);
}
