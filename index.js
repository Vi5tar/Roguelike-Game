'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this.state = {
      positionX: 40,
      positionY: 40,
      enemys: [{
        x: 120,
        y: 100
      }, {
        x: 140,
        y: 140
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
        this.setState({
          positionX: this.state.positionX + movement
        });
      }
    }
  }, {
    key: 'handleUp',
    value: function handleUp() {
      if (this.wallDetection("up", -20)) {
        var movement = this.enemyDetection("up", -20);
        this.setState({
          positionY: this.state.positionY + movement
        });
      }
    }
  }, {
    key: 'handleRight',
    value: function handleRight() {
      if (this.wallDetection("right", 20)) {
        var movement = this.enemyDetection("right", 20);
        this.setState({
          positionX: this.state.positionX + movement
        });
      }
    }
  }, {
    key: 'handleDown',
    value: function handleDown() {
      if (this.wallDetection("down", 20)) {
        var movement = this.enemyDetection("down", 20);
        this.setState({
          positionY: this.state.positionY + movement
        });
      }
    }
  }, {
    key: 'enemyDetection',
    value: function enemyDetection(direction, increment) {
      if (direction == "left" || direction == "right") {
        for (var a = 0; a < this.state.enemys.length; a++) {
          var tempEnemy = this.state.enemys[a];
          if (this.state.positionX + increment == tempEnemy.x && this.state.positionY == tempEnemy.y) {
            console.log("Side Whack!");
            return 0;
          }
        }
        return increment;
      } else if (direction == "up" || direction == "down") {
        for (var a = 0; a < this.state.enemys.length; a++) {
          var tempEnemy = this.state.enemys[a];
          if (this.state.positionY + increment == tempEnemy.y && this.state.positionX == tempEnemy.x) {
            console.log("Vertical Whack!");
            return 0;
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
          if (this.state.positionX + increment >= tempPlayArea.x && this.state.positionX + increment < tempPlayArea.x + tempPlayArea.width && this.state.positionY >= tempPlayArea.y && this.state.positionY < tempPlayArea.y + tempPlayArea.height) {
            return true;
          }
        }
        return false;
      } else if (direction == "up" || direction == "down") {
        for (var a = 0; a < this.state.playArea.length; a++) {
          var tempPlayArea = this.state.playArea[a];
          if (this.state.positionY + increment >= tempPlayArea.y && this.state.positionY + increment < tempPlayArea.y + tempPlayArea.height && this.state.positionX >= tempPlayArea.x && this.state.positionX < tempPlayArea.x + tempPlayArea.width) {
            return true;
          }
        }
        return false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var character = {
        position: 'absolute',
        backgroundColor: 'blue',
        width: 20,
        height: 20,
        top: this.state.positionY,
        left: this.state.positionX
      };

      var locateEnemys = this.state.enemys.map(function (thing, index) {
        var enemy = {
          position: 'absolute',
          backgroundColor: 'red',
          width: 20,
          height: 20,
          top: thing.y,
          left: thing.x
        };
        return React.createElement('div', { style: enemy });
      });

      var playSpace = this.state.playArea.map(function (thing, index) {
        var playArea = {
          position: 'absolute',
          backgroundColor: 'yellow',
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
        React.createElement('div', { style: character }),
        ' ',
        locateEnemys,
        playSpace
      );
    }
  }]);

  return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById("rogueLike"));