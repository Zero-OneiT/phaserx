import 'phaser';
import { PhaserXSetttings } from '../interfaces';
import { getMetadata, setMetadata } from '../helpers/metadata-helper';
import { GAME_SETTINGS_KEY } from '../constants';

export default function GameSettings(name: string, config?: Phaser.Types.Core.GameConfig) {
  return function(target) {
    const gameSettings: PhaserXSetttings = getMetadata(GAME_SETTINGS_KEY, target) || {};

    gameSettings.name = name;
    gameSettings.settings = config;


    setMetadata(GAME_SETTINGS_KEY, gameSettings, target);
  }
}
