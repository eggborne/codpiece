
export default class Character {
  constructor(chosenName, chosenClass, baseStats) {
    this.name = chosenName;
    this.class = chosenClass;
    this.maxHP = baseStats.maxHP;
    this.maxMP = baseStats.maxMP;
    this.strength = baseStats.strength;
    this.resilience = baseStats.defense;
    this.agility = baseStats.agility;
    this.hp = this.maxHP;
    this.mp = this.maxMP;
    this.xp = 0;
    this.codpieces = [];
    this.weapon;
    this.armor;
    this.gold = 0;
  }
}