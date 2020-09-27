import 'phaser';
import { PhaserXSetttings } from '@root/interfaces';
import { getClass, getMetadata, setMetadata } from '@root/helpers/metadata-helper';
import { GAME_CONTEXT_KEY, GAME_SETTINGS_KEY } from '@root/constants';

export default abstract class Game {
  readonly game: Phaser.Game;
  readonly name: string;

  constructor() {
    const config: PhaserXSetttings = getMetadata(GAME_SETTINGS_KEY, getClass(this));

    this.game = new Phaser.Game(config.settings);
    this.name = config.name;

    setMetadata(GAME_CONTEXT_KEY, this.game, getClass(this));
  }

  static of<T>(clazz: (new() => T) | T): Phaser.Game {
    const C = getClass(clazz);

    if (!Game.isPrototypeOf(C)) {
      throw new Error('Is not an instance of PhaserX class');
    }

    return getMetadata(GAME_CONTEXT_KEY, C);
  }
}
