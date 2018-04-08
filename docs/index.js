'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var heroMenu = {
  position: 'absolute',
  backgroundColor: 'black',
  color: 'white',
  width: 160,
  height: 200,
  top: 0,
  left: 800
};

var HeroStats = function HeroStats(props) {
  return React.createElement(
    'div',
    { style: heroMenu },
    React.createElement(
      'p',
      null,
      'Level: ',
      props.level
    ),
    React.createElement(
      'p',
      null,
      'HP: ',
      props.hp
    ),
    React.createElement(
      'p',
      null,
      'Weapon: ',
      props.weapon
    ),
    React.createElement(
      'p',
      null,
      'Attack: ',
      props.atk
    ),
    React.createElement(
      'p',
      null,
      'XP: ',
      props.xp
    )
  );
};

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this.state = {
      gameParamaters: {
        darkness: 1,
        enemyCount: 7,
        weaponCount: 2,
        potCount: 4,
        weapons: [{
          name: "none",
          atkBonus: 0
        }, {
          name: "Club",
          atkBonus: 2
        }, {
          name: "Sword",
          atkBonus: 5
        }]
      },
      hero: {
        x: 40,
        y: 40,
        maxHP: 100,
        HP: 100,
        atk: 10,
        weapon: 'none',
        weaponBonus: 0,
        weaponCounter: 0,
        xp: 0,
        level: 1
      },
      level: {
        levelAt: 10
      },
      enemys: [],
      potions: [],
      weaponBox: [],
      darkness: [],
      playArea: [{
        x: 0,
        y: 0,
        width: 200,
        height: 160
      }, {
        x: 200,
        y: 140,
        width: 400,
        height: 20
      }, {
        x: 60,
        y: 160,
        width: 20,
        height: 40
      }, {
        x: 200,
        y: 0,
        width: 120,
        height: 20
      }, {
        x: 200,
        y: 280,
        width: 200,
        height: 20
      }, {
        x: 320,
        y: 0,
        width: 100,
        height: 100
      }, {
        x: 440,
        y: 20,
        width: 100,
        height: 100
      }, {
        x: 500,
        y: 120,
        width: 20,
        height: 20
      }, {
        x: 640,
        y: 40,
        width: 20,
        height: 60
      }, {
        x: 660,
        y: 40,
        width: 60,
        height: 20
      }, {
        x: 500,
        y: 340,
        width: 220,
        height: 20
      }, {
        x: 720,
        y: 40,
        width: 20,
        height: 400
      }, {
        x: 400,
        y: 200,
        width: 160,
        height: 100
      }, {
        x: 200,
        y: 380,
        width: 80,
        height: 100
      }, {
        x: 600,
        y: 100,
        width: 80,
        height: 100
      }, {
        x: 100,
        y: 500,
        width: 240,
        height: 200
      }, {
        x: 40,
        y: 200,
        width: 160,
        height: 200
      }, {
        x: 340,
        y: 320,
        width: 160,
        height: 160
      }, {
        x: 640,
        y: 440,
        width: 140,
        height: 160
      }, {
        x: 560,
        y: 360,
        width: 20,
        height: 380
      }, {
        x: 360,
        y: 560,
        width: 120,
        height: 100
      }, {
        x: 480,
        y: 640,
        width: 220,
        height: 20
      }, {
        x: 180,
        y: 720,
        width: 380,
        height: 20
      }, {
        x: 180,
        y: 700,
        width: 20,
        height: 20
      }]
    };
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.wallDetection = _this.wallDetection.bind(_this);
    return _this;
  }

  _createClass(Game, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(event) {
      switch (event.keyCode) {
        case 37:
          this.handleMovement("left", -20);
          break;
        case 38:
          this.handleMovement("up", -20);
          break;
        case 39:
          this.handleMovement("right", 20);
          break;
        case 40:
          this.handleMovement("down", 20);
          break;
      }
    }
  }, {
    key: 'handleMovement',
    value: function handleMovement(direction, increment) {
      if (this.wallDetection(direction, increment)) {
        var movement = this.enemyDetection(direction, increment);
        var hero = Object.assign({}, this.state.hero);
        hero.HP = hero.HP + this.potionDetection(direction, increment);
        if (this.weaponBoxDetection(direction, increment) == 1) {
          hero.weaponCounter++;
          hero.weapon = this.state.gameParamaters.weapons[hero.weaponCounter].name;
          hero.weaponBonus = this.state.gameParamaters.weapons[hero.weaponCounter].atkBonus;
        }
        if (direction == "left" || direction == "right") {
          hero.x = this.state.hero.x + movement;
        } else if (direction == "up" || direction == "down") {
          hero.y = this.state.hero.y + movement;
        }
        this.setState({ hero: hero });
        this.createDarkness();
      }
    }
  }, {
    key: 'enemyDetection',
    value: function enemyDetection(direction, increment) {
      var enemys = [];
      for (var b = 0; b < this.state.enemys.length; b++) {
        enemys.push(this.state.enemys[b]);
      }
      if (direction == "left" || direction == "right") {
        for (var a = 0; a < enemys.length; a++) {
          var tempEnemy = enemys[a];
          if (tempEnemy.status == 1 || tempEnemy.status == 2) {
            if (this.state.hero.x + increment >= tempEnemy.x && this.state.hero.x + increment < tempEnemy.x + tempEnemy.width && this.state.hero.y >= tempEnemy.y && this.state.hero.y < tempEnemy.y + tempEnemy.height) {
              this.combat(tempEnemy);
              enemys[a] = tempEnemy;
              this.setState({ enemys: enemys });
              return 0;
            }
          }
        }
        return increment;
      } else if (direction == "up" || direction == "down") {
        for (var a = 0; a < enemys.length; a++) {
          var tempEnemy = enemys[a];
          if (tempEnemy.status == 1 || tempEnemy.status == 2) {
            if (this.state.hero.y + increment >= tempEnemy.y && this.state.hero.y + increment < tempEnemy.y + tempEnemy.height && this.state.hero.x >= tempEnemy.x && this.state.hero.x < tempEnemy.x + tempEnemy.width) {
              this.combat(tempEnemy);
              enemys[a] = tempEnemy;
              this.setState({ enemys: enemys });
              return 0;
            }
          }
        }
        return increment;
      }
    }
  }, {
    key: 'potionDetection',
    value: function potionDetection(direction, increment) {
      var potions = [];
      for (var c = 0; c < this.state.potions.length; c++) {
        potions.push(this.state.potions[c]);
      }
      if (direction == "left" || direction == "right") {
        for (var d = 0; d < potions.length; d++) {
          if (potions[d].status == 1) {
            if (this.state.hero.x + increment == potions[d].x && this.state.hero.y == potions[d].y) {
              potions[d].status = 0;
              this.setState({ potions: potions });
              return 20;
            }
          }
        }
        return 0;
      } else if (direction == "up" || direction == "down") {
        for (var d = 0; d < potions.length; d++) {
          if (potions[d].status == 1) {
            if (this.state.hero.y + increment == potions[d].y && this.state.hero.x == potions[d].x) {
              potions[d].status = 0;
              this.setState({ potions: potions });
              return 20;
            }
          }
        }
        return 0;
      }
    }
  }, {
    key: 'weaponBoxDetection',
    value: function weaponBoxDetection(direction, increment) {
      var weaponBox = [];
      for (var c = 0; c < this.state.weaponBox.length; c++) {
        weaponBox.push(this.state.weaponBox[c]);
      }
      if (direction == "left" || direction == "right") {
        for (var d = 0; d < weaponBox.length; d++) {
          if (weaponBox[d].status == 1) {
            if (this.state.hero.x + increment == weaponBox[d].x && this.state.hero.y == weaponBox[d].y) {
              weaponBox[d].status = 0;
              this.setState({ weaponBox: weaponBox });
              return 1;
            }
          }
        }
        return 0;
      } else if (direction == "up" || direction == "down") {
        for (var d = 0; d < weaponBox.length; d++) {
          if (weaponBox[d].status == 1) {
            if (this.state.hero.y + increment == weaponBox[d].y && this.state.hero.x == weaponBox[d].x) {
              weaponBox[d].status = 0;
              this.setState({ weaponBox: weaponBox });
              return 1;
            }
          }
        }
        return 0;
      }
    }
  }, {
    key: 'wallDetection',
    value: function wallDetection(direction, increment) {
      if (direction == "left" || direction == "right") {
        for (var a = 0; a < this.state.playArea.length; a++) {
          var tempPlayArea = this.state.playArea[a];
          if (this.state.hero.x + increment >= tempPlayArea.x && this.state.hero.x + increment < tempPlayArea.x + tempPlayArea.width && this.state.hero.y >= tempPlayArea.y && this.state.hero.y < tempPlayArea.y + tempPlayArea.height) {
            return true;
          }
        }
        return false;
      } else if (direction == "up" || direction == "down") {
        for (var a = 0; a < this.state.playArea.length; a++) {
          var tempPlayArea = this.state.playArea[a];
          if (this.state.hero.y + increment >= tempPlayArea.y && this.state.hero.y + increment < tempPlayArea.y + tempPlayArea.height && this.state.hero.x >= tempPlayArea.x && this.state.hero.x < tempPlayArea.x + tempPlayArea.width) {
            return true;
          }
        }
        return false;
      }
    }

    // carries out the math that constitutes combat. Determines attack of Hero
    // and Mob and subtracts that from their HP pools until one of their pools
    // reaches 0. If hero falls to zero game over. If mob falls to zero hero gains
    // xp and mob disappears.

  }, {
    key: 'combat',
    value: function combat(enemy) {
      var hero = Object.assign({}, this.state.hero);
      if (enemy.hp > 0) {
        var heroSwing = Math.round((hero.atk + hero.weaponBonus) * this.getRandomAtk());
        var mobSwing = Math.round(enemy.atk * this.getRandomAtk());
        enemy.hp = enemy.hp - heroSwing;
        hero.HP = hero.HP - mobSwing;
        if (enemy.hp <= 0) {
          if (enemy.status == 2) {
            alert("YOU WIN!");
            document.location.reload();
          }
          enemy.status = 0;
          hero.xp += enemy.xpGranted;
        }
        if (hero.HP <= 0) {
          this.setState({ hero: hero });
          alert("GAME OVER");
          document.location.reload();
        }
        this.setState({ hero: hero });
        this.levelUp();
      }
    }

    //populates the enemys at random. Number of enemys is determined by
    //this.state.gameParamaters.enemyCount.

  }, {
    key: 'createEnemys',
    value: function createEnemys() {
      var enemys = [];
      //creates basic enemys
      for (var n = 0; n < this.state.gameParamaters.enemyCount; n++) {
        var randomCords = this.randomPlayableCords();
        while (randomCords == false) {
          randomCords = this.randomPlayableCords();
        }
        enemys.push({
          x: randomCords[0],
          y: randomCords[1],
          width: 20,
          height: 20,
          status: 1,
          hp: 20,
          atk: 5,
          xpGranted: 5
        });
      }
      //creates boss
      enemys.push({
        x: 280,
        y: 520,
        width: 40,
        height: 40,
        status: 2,
        hp: 200,
        atk: 20
      });
      this.setState({ enemys: enemys });
    }

    //populates the potions at random. Number of potions is determined by
    //this.state.gameParamaters.potCount.

  }, {
    key: 'createPots',
    value: function createPots() {
      var potions = [];
      for (var n = 0; n < this.state.gameParamaters.potCount; n++) {
        var randomCords = this.randomPlayableCords();
        while (randomCords == false) {
          randomCords = this.randomPlayableCords();
        }
        potions.push({
          x: randomCords[0],
          y: randomCords[1],
          status: 1
        });
      }
      this.setState({ potions: potions });
    }

    //populates the Weapon Boxes at random. Number of Boxes is determined by
    //this.state.gameParamaters.weaponCount.

  }, {
    key: 'createWeaponBoxes',
    value: function createWeaponBoxes() {
      var weaponBox = [];
      for (var n = 0; n < this.state.gameParamaters.weaponCount; n++) {
        var randomCords = this.randomPlayableCords();
        while (randomCords == false) {
          randomCords = this.randomPlayableCords();
        }
        weaponBox.push({
          x: randomCords[0],
          y: randomCords[1],
          status: 1
        });
      }
      this.setState({ weaponBox: weaponBox });
    }

    //creates the dark that overlays much of the play area.

  }, {
    key: 'createDarkness',
    value: function createDarkness() {
      if (this.state.gameParamaters.darkness == 1) {
        var darkness = [];
        for (var x = 0; x < 960; x += 20) {
          for (var y = 0; y < 740; y += 20) {
            //square viewable area
            //if (x < this.state.hero.x - 100 || x > this.state.hero.x + 100 || y < this.state.hero.y - 100 || y > this.state.hero.y + 100) {
            //diamond viewable area
            //if (x - y < (this.state.hero.x - this.state.hero.y) - 100 || x - y > (this.state.hero.x - this.state.hero.y) + 100 || x + y < (this.state.hero.x + this.state.hero.y) - 100 || x + y > (this.state.hero.x + this.state.hero.y) + 100) {
            //circular viewable area
            if (Math.pow(x - this.state.hero.x, 2) + Math.pow(y - this.state.hero.y, 2) > 12500) {
              darkness.push({
                x: x,
                y: y
              });
            }
          }
        }
        this.setState({ darkness: darkness });
      }
    }

    //returns a number between .75 and 1

  }, {
    key: 'getRandomAtk',
    value: function getRandomAtk() {
      return (Math.floor(Math.random() * (100 - 75 + 1)) + 75) / 100;
    }

    //returns a number evenly divisible by 20 within a range

  }, {
    key: 'getRandomIntInclusive',
    value: function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      var number = Math.floor(Math.random() * (max - min + 1)) + min;
      while (number % 20 != 0) {
        number = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      return number;
    }

    //ensures the cordinates are within the playable space

  }, {
    key: 'randomPlayableCords',
    value: function randomPlayableCords() {
      var x = this.getRandomIntInclusive(0, 1920);
      var y = this.getRandomIntInclusive(0, 1080);
      for (var a = 0; a < this.state.playArea.length; a++) {
        var tempPlayArea = this.state.playArea[a];
        if (x >= tempPlayArea.x && x < tempPlayArea.x + tempPlayArea.width && y >= tempPlayArea.y && y < tempPlayArea.y + tempPlayArea.height) {
          return [x, y];
        }
      }
      return false;
    }
  }, {
    key: 'levelUp',
    value: function levelUp() {
      var hero = Object.assign({}, this.state.hero);
      if (hero.xp >= this.state.level.levelAt) {
        this.increaseLevel(hero);
        var level = Object.assign({}, this.state.level);
        level.levelAt = level.levelAt * 1.5 + level.levelAt;
        this.setState({ level: level });
      }
    }
  }, {
    key: 'increaseLevel',
    value: function increaseLevel(hero) {
      var increase = 1 / hero.level;
      hero.maxHP += hero.maxHP * increase;
      hero.HP = hero.maxHP;
      hero.atk += hero.atk * increase;
      hero.level++;
      this.setState({ hero: hero });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.enemys.length == 0) {
        this.createEnemys();
      }

      if (this.state.potions == 0) {
        this.createPots();
      }

      if (this.state.weaponBox == 0) {
        this.createWeaponBoxes();
      }

      if (this.state.darkness == 0) {
        this.createDarkness();
      }

      var character = {
        position: 'absolute',
        //backgroundColor: 'blue',
        //width: 20,
        //height: 20,
        top: this.state.hero.y - 4,
        left: this.state.hero.x
      };

      var locateEnemys = this.state.enemys.map(function (thing, index) {
        var enemy = {
          position: 'absolute',
          //backgroundColor: 'red',
          //width: 20,
          //height: 20,
          top: thing.y - 4,
          left: thing.x
        };
        if (thing.status == 1) {
          return React.createElement(
            'div',
            { style: enemy },
            React.createElement('img', { src: 'images/ATTAK_000.png', width: thing.width, height: thing.height })
          );
        } else if (thing.status == 2) {
          return React.createElement(
            'div',
            { style: enemy },
            React.createElement('img', { src: 'images/ATTAK_000.png', width: thing.width, height: thing.height })
          );
        }
      });

      var locatePotions = this.state.potions.map(function (pot, index) {
        var potion = {
          //backgroundColor: 'green',
          //width: 20,
          //height: 20,
          //color: 'green',
          position: 'absolute',
          left: pot.x,
          top: pot.y
        };
        if (pot.status == 1) {
          return React.createElement(
            'div',
            { style: potion },
            React.createElement('i', { className: 'fas fa-flask', 'data-fa-transform': 'right-2.5 up-2' })
          );
        }
      });

      var locateWeaponBoxes = this.state.weaponBox.map(function (thing, index) {
        var weaponBox = {
          backgroundColor: 'green',
          width: 20,
          height: 20,
          color: 'green',
          position: 'absolute',
          left: thing.x,
          top: thing.y
        };
        if (thing.status == 1) {
          return React.createElement('div', { style: weaponBox });
        }
      });

      var playSpace = this.state.playArea.map(function (thing, index) {
        var playArea = {
          position: 'absolute',
          backgroundColor: 'white',
          zIndex: -1,
          width: thing.width,
          height: thing.height,
          top: thing.y,
          left: thing.x
        };
        return React.createElement('div', { style: playArea });
      });

      var darkness = this.state.darkness.map(function (thing, index) {
        var darknessPixel = {
          position: 'absolute',
          backgroundColor: 'black',
          width: 20,
          height: 20,
          top: thing.y,
          left: thing.x
        };
        return React.createElement('div', { style: darknessPixel });
      });

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { style: character },
          React.createElement('img', { src: 'images/IDLE_000.png', width: '20', height: '20' })
        ),
        locateEnemys,
        locatePotions,
        locateWeaponBoxes,
        playSpace,
        darkness,
        React.createElement(HeroStats, { hp: this.state.hero.HP, weapon: this.state.hero.weapon, atk: this.state.hero.atk + this.state.hero.weaponBonus, xp: this.state.hero.xp, level: this.state.hero.level })
      );
    }
  }]);

  return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById("rogueLike"));
//# sourceMappingURL=../index.js.map