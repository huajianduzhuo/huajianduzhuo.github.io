'use strict';

$(document).ready(function () {

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var can = document.createElement('canvas');
  can.id = 'canvas';
  can.width = '700';
  can.height = '500';
  document.body.appendChild(can);

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var htmlE = document.documentElement;
  var balls = [];

  function init() {
    var hw = htmlE.offsetWidth;
    var hh = htmlE.offsetHeight;
    canvas.width = hw;
    canvas.height = hh;
  }

  window.onresize = window.onload = init;

  var Ball = function () {
    function Ball(x, y, direct) {
      _classCallCheck(this, Ball);

      this.x = x;
      this.y = y;
      this.globalAlpha = 1;
      this.color = 'rgba(255,255,255,1)';
      this.direct = direct;
    }

    _createClass(Ball, [{
      key: 'set',
      value: function set() {
        this.x += Math.cos(this.direct);
        this.y += Math.sin(this.direct);
        if (this.globalAlpha > 0) {
          this.globalAlpha = this.globalAlpha - 0.005;
        } else {
          this.globalAlpha = 0;
        }
      }
    }, {
      key: 'paint',
      value: function paint() {
        if (this.globalAlpha <= 0) {
          return;
        }
        context.beginPath();
        context.globalAlpha = this.globalAlpha;
        context.strokeStyle = this.color;
        context.arc(this.x, this.y, 4, 0, Math.PI * 2, true);
        context.stroke();
      }
    }]);

    return Ball;
  }();

  setInterval(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function (ball) {
      ball.paint();
      ball.set();
    });
  }, 10);

  setInterval(function () {
    balls.forEach(function (ball, index) {
      if (ball.globalAlpha <= 0) {
        balls.splice(index, 1);
      }
    });
  }, 1000);

  function isInMain(node) {
    if (node.className === 'content-wrap') {
      return false;
    }
    if (node.className === 'main') {
      return true;
    }
    while (node.parentNode) {
      return isInMain(node.parentNode);
    }
  }

  var moveCallback = function moveCallback(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    var node = target.nodeName;
    if (!isInMain(target) || node === 'TD' || node === 'INPUT' || node === 'A' || node === 'BUTTON' ||
      node === 'TH' || node === 'TR' || node === 'TABLE') {
      return;
    }
    var mx = event.clientX;
    var my = event.clientY;
    if (event.type === 'touchmove' && event.changedTouches.length === 1) {
      mx = event.changedTouches[0].clientX;
      my = event.changedTouches[0].clientY;
    }
    if (!mx) {
      return;
    }
    var direct = Math.random() * 2 * Math.PI;
    var ball = new Ball(mx, my, direct);
    balls.push(ball);
  };

  document.onmousemove = moveCallback;
  document.ontouchmove = moveCallback;

});
