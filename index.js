'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var heroMenu = {
  position: 'absolute',
  backgroundColor: 'black',
  color: 'white',
  width: 200,
  height: 300,
  top: 0,
  left: 700
};

var HeroStats = function HeroStats(props) {
  return React.createElement(
    'div',
    { style: heroMenu },
    React.createElement(
      'p',
      null,
      'X: ',
      props.xpos
    ),
    React.createElement(
      'p',
      null,
      'Y: ',
      props.ypos
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
      props.atkMin,
      '-',
      props.atkMax
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
        enemyCount: 7
      },
      hero: {
        x: 40,
        y: 40,
        HP: 100,
        atkMin: 10,
        atkMax: 15,
        weapon: 'none',
        weaponBonus: 0
      },
      enemys: [/*{
               x: 120,
               y: 100,
               status: 1,
               hp: 20,
               atk: 5
               }, {
               x: 140,
               y: 140,
               status: 1,
               hp: 20,
               atk: 5
               }*/],
      playArea: [{
        x: 0,
        y: 0,
        width: 400,
        height: 360
      }, {
        x: 400,
        y: 180,
        width: 200,
        height: 20
      }, {
        x: 200,
        y: 360,
        width: 20,
        height: 200
      }],
      potions: [{
        x: 200,
        y: 200,
        status: 1
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
        if (direction == "left" || direction == "right") {
          hero.x = this.state.hero.x + movement;
        } else if (direction == "up" || direction == "down") {
          hero.y = this.state.hero.y + movement;
        }
        this.setState({ hero: hero });
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
          if (tempEnemy.status == 1) {
            if (this.state.hero.x + increment == tempEnemy.x && this.state.hero.y == tempEnemy.y) {
              console.log("Side Whack!");
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
          if (tempEnemy.status == 1) {
            if (this.state.hero.y + increment == tempEnemy.y && this.state.hero.x == tempEnemy.x) {
              console.log("Vertical Whack!");
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
  }, {
    key: 'combat',
    value: function combat(enemy) {
      var hero = Object.assign({}, this.state.hero);
      if (enemy.hp > 0) {
        enemy.hp = enemy.hp - hero.atkMin;
        hero.HP = hero.HP - enemy.atk;
        if (enemy.hp <= 0) {
          enemy.status = 0;
        }
        if (hero.HP <= 0) {
          this.setState({ hero: hero });
          alert("GAME OVER");
          document.location.reload();
        }
        this.setState({ hero: hero });
      }
    }

    //populates the enemys at random. Number of enemys is determined by
    //this.state.gameParamaters.enemyCount.

  }, {
    key: 'createEnemys',
    value: function createEnemys() {
      var enemys = [];
      for (var n = 0; n < this.state.gameParamaters.enemyCount; n++) {
        var randomCords = this.randomPlayableCords();
        while (randomCords == false) {
          randomCords = this.randomPlayableCords();
        }
        enemys.push({ x: randomCords[0], y: randomCords[1], status: 1, hp: 20, atk: 5 });
      }
      this.setState({ enemys: enemys });
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
    key: 'render',
    value: function render() {
      if (this.state.enemys.length == 0) {
        this.createEnemys();
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
            React.createElement('img', { src: 'images/ATTAK_000.png', width: '20', height: '20' })
          );
        }
      });

      var locatePotions = this.state.potions.map(function (thing, index) {
        var potion = {
          //backgroundColor: 'green',
          //width: 20,
          //height: 20,
          //color: 'green',
          position: 'absolute',
          left: thing.x,
          top: thing.y
        };
        if (thing.status == 1) {
          return React.createElement(
            'div',
            { style: potion },
            React.createElement('i', { className: 'fas fa-flask', 'data-fa-transform': 'right-2.5 up-2' })
          );
        }
      });

      var playSpace = this.state.playArea.map(function (thing, index) {
        var playArea = {
          position: 'absolute',
          backgroundColor: 'gray',
          zIndex: -1,
          width: thing.width,
          height: thing.height,
          top: thing.y,
          left: thing.x
        };
        return React.createElement('div', { style: playArea });
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
        playSpace,
        React.createElement(HeroStats, { xpos: this.state.hero.x, ypos: this.state.hero.y, hp: this.state.hero.HP, weapon: this.state.hero.weapon, atkMin: this.state.hero.atkMin, atkMax: this.state.hero.atkMax })
      );
    }
  }]);

  return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById("rogueLike"));