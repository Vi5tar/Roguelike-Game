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
      }]
    };
    _this.handleKeyPress = _this.handleKeyPress.bind(_this);
    _this.handleLeft = _this.handleLeft.bind(_this);
    _this.handleUp = _this.handleUp.bind(_this);
    _this.handleRight = _this.handleRight.bind(_this);
    _this.handleDown = _this.handleDown.bind(_this);
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
      var movement = 20;
      for (var a = 0; a < this.state.enemys.length; a++) {
        var tempEnemy = this.state.enemys[a];
        if (this.state.positionX - 20 == tempEnemy.x && this.state.positionY == tempEnemy.y) {
          console.log("Whack!");
          movement = 0;
        }
      }
      this.setState({
        positionX: this.state.positionX - movement
      });
    }
  }, {
    key: 'handleUp',
    value: function handleUp() {
      var movement = 20;
      for (var a = 0; a < this.state.enemys.length; a++) {
        var tempEnemy = this.state.enemys[a];
        if (this.state.positionY - 20 == tempEnemy.y && this.state.positionX == tempEnemy.x) {
          console.log("Noggin Whack!");
          movement = 0;
        }
      }
      this.setState({
        positionY: this.state.positionY - movement
      });
    }
  }, {
    key: 'handleRight',
    value: function handleRight() {
      var movement = 20;
      for (var a = 0; a < this.state.enemys.length; a++) {
        var tempEnemy = this.state.enemys[a];
        if (this.state.positionX + 20 == tempEnemy.x && this.state.positionY == tempEnemy.y) {
          console.log("Right Whack!");
          movement = 0;
        }
      }
      this.setState({
        positionX: this.state.positionX + movement
      });
    }
  }, {
    key: 'handleDown',
    value: function handleDown() {
      var movement = 20;
      for (var a = 0; a < this.state.enemys.length; a++) {
        var tempEnemy = this.state.enemys[a];
        if (this.state.positionY + 20 == tempEnemy.y && this.state.positionX == tempEnemy.x) {
          console.log("Foot Whack!");
          movement = 0;
        }
      }
      this.setState({
        positionY: this.state.positionY + movement
      });
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

      var boardCreate = this.state.enemys.map(function (thing, index) {
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

      return React.createElement(
        'div',
        null,
        React.createElement('div', { style: character }),
        ' ',
        boardCreate
      );
    }
  }]);

  return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById("rogueLike"));