/*
  Constructor Functions and Prototypes
*/






function GameObject(attributes) {
  this.createdAt = attributes.createdAt
  this.dimensions = attributes.dimensions
}

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game`;
}

function Pokemon(attributeSet) {
  GameObject.call(this, attributeSet)
  this.name = attributeSet.name
  this.lvl = attributeSet.lvl
  this.moveSet = attributeSet.moveSet
  this.type = attributeSet.type
}

Pokemon.prototype = Object.create(GameObject.prototype);

Pokemon.prototype.battle = function(target, move) {
  let attackPoints = (this.moveSet[move] + this.attack) - (target.defense);
  let crit = Math.floor(Math.random() * 99)

  if( crit >= 70) {
    console.log(`${this.name} used ${move}!`)
    console.log('It was a criticlal hit!')
    attackPoints += (Math.ceil(attackPoints/2))
    target.hp -= attackPoints;
    return `${this.name} did ${attackPoints} damage!`;
  }

  console.log(`${this.name} used ${move}!`)
  target.hp -= attackPoints;
  return `${this.name} did ${attackPoints} damage!`;
}

function PokeStats(stats) {
  Pokemon.call(this, stats);
  this.hp = stats.hp
  this.attack = stats.attack
  this.defense = stats.defense
  this.speed = stats.speed
}

PokeStats.prototype = Object.create(Pokemon.prototype)


/*
  Pokemon Objects
*/


const bulbasaur = new PokeStats({
  name: 'Bulbasaur',
  lvl: 5,
  moveSet: {Tackle: 5, RazorLeaf: 8, VineWhip: 12},
  type: 'Grass',
  hp: 13,
  attack: 12,
  defense: 16,
  speed: 11
});

const squirtle = new PokeStats({
  name: 'Squirtle',
  lvl: 5,
  moveSet: {Tackle: 5, Bubble: 8, WaterGun: 12},
  type: 'Water',
  hp: 18,
  attack: 12,
  defense: 13,
  speed: 15
})

//Battle Function

function battleStart(pokemon1, pokemon2) {
  while(pokemon1.hp > 0 && pokemon2.hp > 0) {
    let pokemon1Speed = Math.floor((Math.random() * pokemon1.speed) + 1)
    let pokemon2Speed = Math.floor((Math.random() * pokemon2.speed) + 1)


    let moveSelector = Math.floor((Math.random() * 3))

    if(pokemon1Speed > pokemon2Speed) {
      console.log(pokemon1.battle(pokemon2, Object.keys(pokemon1.moveSet)[moveSelector]))

      if(pokemon2.hp <= 0) {
        console.log(`${pokemon2.name} has fainted!`);
        break;
      }

      console.log(pokemon2.battle(pokemon1, Object.keys(pokemon2.moveSet)[moveSelector]))

      if(pokemon1.hp <= 0) {
        console.log(`Player's ${pokemon1.name} has fainted!`);
        break;
      }

    } else {
      console.log(pokemon2.battle(pokemon1, Object.keys(pokemon2.moveSet)[moveSelector]))

      if(pokemon1.hp <= 0) {
        console.log(`Player's ${pokemon1.name} has fainted!`);
        break;
      }

      console.log(pokemon1.battle(pokemon2, Object.keys(pokemon1.moveSet)[moveSelector]))

      if(pokemon2.hp <= 0) {
        console.log(`${pokemon2.name} has fainted!`);
        break;
      }
    }
  }
}


/*
    Calling Battle Function, insert names of pokemon you want to battle as parameters
    The resulting randomized battle will take place in the browser Console
*/


const readline = require('readline');

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

terminal.setPrompt('Choose your Pokemon: ');
terminal.prompt();
terminal.on('line', function(answer) {
  let player;

  if('bulbasaur' === answer) {
    player = bulbasaur;
  } else if ('squirtle' === answer) {
    player = squirtle;
  }

  let opponent = squirtle;

  battleStart(player, opponent);

  process.exit();
});
