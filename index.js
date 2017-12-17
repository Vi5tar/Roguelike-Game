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
      hero: {
        x: 40,
        y: 40,
        HP: 100,
        atkMin: 10,
        atkMax: 15,
        weapon: 'none',
        weaponBonus: 0
      },
      enemys: [{
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
      }],
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
      }]
    };
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.handleLeft = _this.handleLeft.bind(_this);
    _this.handleUp = _this.handleUp.bind(_this);
    _this.handleRight = _this.handleRight.bind(_this);
    _this.handleDown = _this.handleDown.bind(_this);
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
          this.handleLeft();
          break;
        case 38:
          this.handleUp();
          break;
        case 39:
          this.handleRight();
          break;
        case 40:
          this.handleDown();
          break;
      }
    }
  }, {
    key: 'handleLeft',
    value: function handleLeft() {
      if (this.wallDetection("left", -20)) {
        var movement = this.enemyDetection("left", -20);
        var hero = Object.assign({}, this.state.hero);
        hero.x = this.state.hero.x + movement;
        this.setState({ hero: hero });
      }
    }
  }, {
    key: 'handleUp',
    value: function handleUp() {
      if (this.wallDetection("up", -20)) {
        var movement = this.enemyDetection("up", -20);
        var hero = Object.assign({}, this.state.hero);
        hero.y = this.state.hero.y + movement;
        this.setState({ hero: hero });
      }
    }
  }, {
    key: 'handleRight',
    value: function handleRight() {
      if (this.wallDetection("right", 20)) {
        var movement = this.enemyDetection("right", 20);
        var hero = Object.assign({}, this.state.hero);
        hero.x = this.state.hero.x + movement;
        this.setState({ hero: hero });
      }
    }
  }, {
    key: 'handleDown',
    value: function handleDown() {
      if (this.wallDetection("down", 20)) {
        var movement = this.enemyDetection("down", 20);
        var hero = Object.assign({}, this.state.hero);
        hero.y = this.state.hero.y + movement;
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
  }, {
    key: 'render',
    value: function render() {
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
          React.createElement('img', { src: 'images/_IDLE_000.png', width: '20', height: '20' })
        ),
        locateEnemys,
        playSpace,
        React.createElement(HeroStats, { xpos: this.state.hero.x, ypos: this.state.hero.y, hp: this.state.hero.HP, weapon: this.state.hero.weapon, atkMin: this.state.hero.atkMin, atkMax: this.state.hero.atkMax })
      );
    }
  }]);

  return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById("rogueLike"));