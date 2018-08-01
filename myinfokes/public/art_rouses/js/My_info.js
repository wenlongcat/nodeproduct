'use strict';

function _toConsumableArray(arr) {
	if (Array.isArray(arr)) {
		for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
			arr2[i] = arr[i];
		}return arr2;
	} else {
		return Array.from(arr);
	}
}

;(function () {
	var oc = document.querySelector('canvas');
	var cxt = oc.getContext('2d');
	var w = oc.width = window.innerWidth;
	var h = oc.height = window.innerHeight;

	var effect0 = false,
	    effect1 = false,
	    effect2 = false;

	window.addEventListener('resize', function () {
		w = oc.width = window.innerWidth;
		h = oc.height = window.innerHeight;
	});
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
			var self = this,
			    start = void 0,
			    finish = void 0;
			return window.setTimeout(function () {
				start = new Date();
				callback(start);
				finish = new Date();
				self.timeout = 1000 / 60 - (finish - start);
			}, self.timeout);
		};
	}
	//工具函数
	function MyTool() {}
	MyTool.prototype = {
		random: function random(min, max) {
			if (arguments.length < 2) {
				max = min;
				min = 0;
			} else {
				min = Math.min(min, max);
				max = Math.max(min, max);
			}
			return Math.floor(Math.random() * (max - min) + min);
		},
		randomColor: function randomColor() {
			var r = Math.floor(Math.random() * 256);
			var g = Math.floor(Math.random() * 256);
			var b = Math.floor(Math.random() * 256);
			return 'rgb(' + r + ',' + g + ',' + b + ')';
		}
	};
	var tls = new MyTool();

	//效果一,@ballnum  --生成小求个数量
	function effect_0(ballnum) {
		var ballarr = [],
		    colorarr = ['green', 'blue', 'orange'];

		//小球函数
		function Createball() {
			this.x = tls.random(w);
			this.y = tls.random(h);
			this.r = tls.random(3, 6);
			this.vx = tls.random(2) - 1.4;
			this.vy = tls.random(3) - 1.6;
			this.color = colorarr[tls.random(3)];
		}

		for (var i = 0; i < ballnum; i++) {
			ballarr.push(new Createball());
		}

		//绘制
		function draw() {
			if (effect0) return;
			cxt.clearRect(0, 0, w, h);
			for (var _i = 0; _i < ballnum; _i++) {
				var ball_a = ballarr[_i];
				cxt.fillStyle = ball_a.color;
				cxt.strokeStyle = ball_a.color;
				for (var j = 0; j < ballnum; j++) {
					var ball_b = ballarr[j];
					isLine(ball_a, ball_b);
				}
				cxt.beginPath();
				cxt.arc(ball_a.x, ball_a.y, ball_a.r, 0, 2 * Math.PI, false);
				cxt.fill();
				cxt.closePath();
				cxt.beginPath();
				cxt.arc(ball_a.x, ball_a.y, ball_a.r + ball_a.r * 0.7, 0, 2 * Math.PI, false);
				cxt.stroke();
				move(ball_a);
			}
			requestAnimationFrame(draw);
		}
		//是否连线
		function isLine(a, b) {
			cxt.lineWidth = 0.6;
			if (a.color === b.color && a != b && Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)) < 150) {
				cxt.beginPath();
				cxt.moveTo(a.x, a.y);
				cxt.lineTo(b.x, b.y);
				cxt.stroke();
			}
		}
		//鼠标移动构建虚拟小球
		document.addEventListener('mousemove', function () {
			var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;

			var newball = new Createball();
			newball.x = e.clientX;
			newball.y = e.clientY;
			newball.color = 'orange';
			newball.r = 0.2;
			ballarr[0] = newball;
		});
		//小球移动
		function move(that) {
			if (that === ballarr[0]) {
				return;
			}
			that.x += that.vx;
			that.y += that.vy;
			if (that.x > w) that.x = 0;
			if (that.x < 0) that.x = w;
			if (that.y > h) that.y = 0;
			if (that.y < 0) that.y = h;
		}
		//初始化
		(function init() {
			draw();
		})();
	}
	//效果二
	function effect_1(countnum) {
		var droparr = [];
		var onOff = true;
		function Drop() {};
		Drop.prototype = {
			init: function init() {
				//雨点属性
				this.x = tls.random(2, w);
				this.y = 0;
				this.vy = tls.random(3, 5);
				this.vr = 1;
				this.l = tls.random(h * 0.7, h * 0.9);
				this.op = 1;
				this.newop = 0.85;
				this.r = 1;
			},
			updata: function updata() {
				//刷新
				if (this.y < this.l) {
					this.y += this.vy;
				} else {
					if (this.op > 0.03) {
						this.r += this.vr;
						if (this.r > 30) this.op *= this.newop;
					} else {
						this.init();
					}
				}
			},
			draw: function draw() {
				if (this.y < this.l) {
					cxt.beginPath();
					cxt.fillStyle = tls.randomColor();
					cxt.fillRect(this.x, this.y, 2, 10);
					cxt.closePath();
				} else {
					cxt.beginPath();
					cxt.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
					cxt.strokeStyle = 'rgba(255,255,255,' + this.op + ')';
					cxt.stroke();
				}
				this.updata();
			}
		};
		// 是否为ie
		function isIE() { //ie?
     if (!!window.ActiveXObject || "ActiveXObject" in window)
            { return true; }
     else
            { return false; }
 	}
		function move() {
			//运动
			if (effect1) return;
			// ie下不添加渲染层
			if (onOff&&(!isIE())) {
				//选着渲染方式
				cxt.fillStyle = 'rgb(0,0,0,0.1)';
				cxt.fillRect(0, 0, w, h);
			} else {
				cxt.clearRect(0, 0, w, h);
			}
			for (var i = 0; i < countnum; i++) {
				droparr.push(new Drop());
				droparr[i].draw();
			}
			requestAnimationFrame(move);
		}
		move();
	}
	//效果三
	function effect_2(snownum) {
		var snowarr = [];
		var textarr = ['✳', '✽', '❇', '✴', '✾', '❃'];
		function Snow() {}
		Snow.prototype = {
			init: function init() {
				this.x = tls.random(2, w);
				this.y = 0;
				this.op = 1;
				this.text = textarr[tls.random(6)];
				this.vy = tls.random(1, 3.5);
			},
			draw: function draw() {
				cxt.font = "italic 35px 黑体";
				cxt.fillStyle = 'rgba(255,255,255,' + this.op + ')';
				cxt.fillText(this.text, this.x, this.y);
				this.updata();
			},
			updata: function updata() {
				if (this.y < h * 0.8) {
					this.y += this.vy;
				} else {
					this.init();
				}
			}
		};
		function move() {
			if (effect2) return;
			cxt.clearRect(0, 0, w, h);
			for (var i = 0; i < snownum; i++) {
				snowarr.push(new Snow());
				snowarr[i].draw();
			}
			requestAnimationFrame(move);
		}
		move();
	}

	//按钮点击事件
	(function () {
		var btns = document.querySelectorAll('#btnbox li'),
		    oul = document.getElementsByTagName('ul')[0],
		    num = 0,
		    timer = '',
		    point = document.querySelector('.point');
		if (num === 0) {
			effect_0(50);
		}
		setTimeout(function () {
			[].concat(_toConsumableArray(btns)).forEach(function (value, index) {
				value.addEventListener('click', function () {
					num = index + 1;
					if (num === 0 || num === 4) {
						effect0 = false;
						effect1 = true;
						effect2 = true;
						effect_0(50);
					}
					if (num === 2) {
						effect1 = false;
						effect_1(50);
						effect0 = true;
						effect2 = true;
					}
					if (num === 3) {
						effect2 = false;
						effect_2(30);
						effect0 = true;
						effect1 = true;
					}
					run(num);
				});
			});
		}, 5000);

		function run(num) {
			if (num === 4) {
				oul.style.left = 0;
				num = 0;
			} else {
				Move(oul, 'left', '' + -80 * num, 1000);
			}
		}

		//运动函数
		function Move(ele, attr, targetVal, time) {
			//初始值的获取
			var CSSObj = ele.currentStyle || getComputedStyle(ele);
			var startVal = parseFloat(CSSObj[attr]) || 0;
			//初始事件的获取
			var startDate = new Date();
			//动画
			function m() {
				var nowDate = new Date();
				var prop = (nowDate - startDate) / time;
				var ifEnd = prop >= 1;
				ifEnd && (prop = 1);
				//匀速的
				var Sx = (targetVal - startVal) * prop + startVal;
				ele.style[attr] = Sx + 'px';
				!ifEnd && requestAnimationFrame(m);
			}
			requestAnimationFrame(m);
		}
	})();
})();
