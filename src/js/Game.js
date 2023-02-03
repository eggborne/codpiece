import { pause, randomInt } from '../util';
import Character from './Character';

export default class Game {
  constructor() {
    this.currentRegion,
    this.movementOptions = ['north', 'south', 'east', 'west'];
    this.regions = {
      "Starting Area": {
        prompt: 'You wake in a dark forest.',
        enemyChance: 50,
        treasureChance: 50,
        enemies: ['bat', 'frog', 'skeleton'],
      },
      "Graveyard": {
        prompt: 'You enter a graveyard. You hear a clucking in the distance.',
        enemyChance: 75,
        treasureChance: 50,
        enemies: ['bat', 'frog', 'skeleton'],
      },
      "Shopkeeper": {
        prompt: 'You come upon a shopkeeper who offers a variety of wares for sale.',
        enemyChance: 0,
        treasureChance: 0,
        enemies: [],
      },
    };
    this.eventMessages = {
      'treasure': 'You spot a shiny treasure chest!',
      'enemy': 'A slimy enemy is upon you!'
    };
    this.playerCharacter;
    this.classes = {
      warrior: {
        'baseStats': {
          maxHP: 200,
          maxMP: 0,
          strength: 100,
          defense: 100,
          agility: 50,
        }
      },
      archer: {
        'baseStats': {
          maxHP: 150,
          maxMP: 50,
          strength: 75,
          defense: 75,
          agility: 100,
        }
      },
      wizard: {
        'baseStats': {
          maxHP: 100,
          maxMP: 200,
          strength: 100,
          defense: 100,
          agility: 50,
        }
      },
      chicken: {
        'baseStats': {
          maxHP: 50,
          maxMP: 0,
          strength: 10,
          defense: 10,
          agility: 200,
        }
      },
    };

    this.weapons = {
      'Stick': {
        type: 'weapon',
        damage: 10
      },
      'Knife': {
        type: 'weapon',
        damage: 20
      },
    };

    this.armor = {
      'Shirt': {
        type: 'armor',
        defense: 10
      },
      'Cloak': {
        type: 'armor',
        defense: 20
      },
    };

    this.codpieces = {
      'Squirrel Head': {
        type: 'codpiece',
        speed: 50,
        defense: 50,
      },
      'Camel Hair': {
        type: 'codpiece',
        damage: 20,
        defense: 50
      },
    };
  }

  async clearTitleScreen() {
    document.getElementById('character-form').classList.remove('showing');
    document.getElementsByClassName('terminal-title')[0].classList.add('hidden');
    await pause(300);
    document.getElementById('character-form').style.display = 'none';
  }

  async renderOnTerminal(textLine, options) {
    options = options || {
      tag: 'div',
      className: 'terminal-line',
      targetQuery: '#terminal',
      speed: 20,
      prepend: false,
    };
    let screen = document.querySelector(options.targetQuery);
    let letterArray = textLine.split('');
    let newLine = document.createElement(options.tag);
    newLine.classList.add(options.className);
    if (options.prepend) {
      screen.prepend(newLine);
    } else {
      screen.append(newLine);
    }
    for (const char of letterArray) {
      newLine.innerHTML += char;
      await pause(options.speed);
    }
  }

  createCharacter(chosenName, chosenClass) {
    let baseStats = this.classes[chosenClass].baseStats;
    this.player = new Character(chosenName, chosenClass, baseStats);
  }

  getRandomRegion() {
    let regionKeys = Object.keys(this.regions);
    return regionKeys[randomInt(1, regionKeys.length - 1)];
  }

  async rollForEvents() {
    let treasureHere = randomInt(0, 100) < this.currentRegion.treasureChance;
    let enemyHere = false;
    if (treasureHere) {
      await this.renderOnTerminal(this.eventMessages['treasure']);
      let randomTreasureArray = Object.keys(this.weapons)
        .concat(Object.keys(this.armor))
        .concat(Object.keys(this.codpieces));
      let randomPrize = randomTreasureArray[randomInt(0, randomTreasureArray.length - 1)];
      await pause(500);
      await this.renderOnTerminal(`It contains a ${randomPrize}!`);
    }
    if (enemyHere) {
      await this.renderOnTerminal(this.eventMessages['enemy']);
      let randomEnemy = this.currentRegion.enemies[randomInt(0, this.currentRegion.enemies.length - 1)];
      await pause(500);
      await this.renderOnTerminal(`It's a ${randomEnemy}!`);
    }
    if (!treasureHere && !enemyHere) {
      // await this.renderOnTerminal('Nothing seems to be here.')
    }
  }

  async showRegion(regionKey) {
    let region = this.regions[regionKey];
    this.currentRegion = region;
    await this.renderOnTerminal(region.prompt);
    await pause(400);
    await this.rollForEvents();
  }
}


