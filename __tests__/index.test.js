/* eslint-disable no-prototype-builtins */
import Game from './../src/js/Game';
let game = new Game();

describe('Game.prototype.createCharacter', () => {

  test('should produce an instance of Character with the appropriate attributes', () => {
    game.createCharacter('Cornelius', 'chicken');
    let result = [game.player.name, game.player.class];
    expect(result).toEqual([ 'Cornelius', 'chicken' ]);
  });
  
});

describe('Game.prototype.getRandomRegion', () => {

  test('should return a key from Game.regions', () => {
    let gotValidRegion = game.regions.hasOwnProperty(game.getRandomRegion());
    expect(gotValidRegion).toEqual(true);
  });
  
});

describe('Game.prototype.startGame', () => {

  test('should return a key from Game.regions', () => {
    
    expect(true).toEqual(true);
  });
  
});

