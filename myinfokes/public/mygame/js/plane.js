'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function () {

function isIE() { //ie?
 if (!!window.ActiveXObject || "ActiveXObject" in window)
        { return true; }
 else
        { return false; }
 }
 if(isIE()){
 	return;
 }
	var imgarr = ['img/bg_1.jpg', 'img/bg_2.jpg', 'img/bg_3.jpg', 'img/bg_4.jpg'];
	var odiff = document.querySelector('.diff');
	var ocontainer = document.querySelector('.container');
	var btns = odiff.querySelectorAll('.modules li');
	var ocontent = document.querySelector('.content');
	var oscore = document.querySelector('.score');
	var scorenum = 0;
	var ocleft = ocontainer.offsetLeft;
	var octop = ocontainer.offsetTop;
	var bufftimer, scolltimer;
	//飞机构造

	var CreatePlane = //敌机
	function CreatePlane(info) {
		_classCallCheck(this, CreatePlane);

		this.src = info.src;
		this.width = info.width;
		this.height = info.height;
		this.className = info.className;
	};

	[].slice.call(btns).forEach(function (value, index) {
		value.addEventListener('click', function (ev) {
			ev = ev || window.event;
			odiff.style.display = 'none';
			ocontainer.style.backgroundImage = 'url(' + imgarr[index] + ')';
			ocontainer.classList.add('active');
			ocontent.classList.add('on');
			var newx = ev.clientX - ocleft;
			var newy = ev.clientY - octop;
			start({
				x: newx,
				y: newy,
				oindex: index
			});
		});
	});
	//开始游戏
	function start(opation) {
		enemy(opation, plane(opation));
	}
	//我军+子弹
	function plane(opation) {
		var planes = new Image();
		planes.src = "img/plane_1.png";
		planes.width = 61;
		planes.height = 47;
		planes.className = 'plane';
		planes.style.left = Math.floor(opation.x - planes.width / 2) + 'px';
		planes.style.top = Math.floor(opation.y - planes.height / 2) + 'px';
		ocontent.appendChild(planes);
		//飞机的移动和边界限制
		var _ref = [Math.floor(ocontainer.offsetWidth - planes.width / 2), -planes.width / 2, Math.floor(ocontainer.offsetHeight - planes.height / 2), 0],
		    leftmax = _ref[0],
		    leftmin = _ref[1],
		    topmax = _ref[2],
		    topmin = _ref[3];

		document.addEventListener('mousemove', function () {
			var ev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.event;

			var left = Math.floor(ev.clientX - ocleft - planes.width / 2);
			var top = Math.floor(ev.clientY - octop - planes.height / 2);
			left = Math.max(left, leftmin);
			left = Math.min(left, leftmax);
			top = Math.max(top, topmin);
			top = Math.min(top, topmax);
			planes.style.left = left + 'px';
			planes.style.top = top + 'px';
		});

		//生成子弹
		function buff(obj) {
			var sleft = Math.floor(obj.width / (opation.oindex + 1));
			var buffarr = [];
			for (var i = 0; i < opation.oindex + 1; i++) {
				var obuff = new Image();
				obuff.src = 'img/fire.png';
				obuff.width = 30;
				obuff.className = 'buff';
				obuff.height = 50;
				obuff.style.left = obj.x + sleft * i + 'px';
				obuff.style.top = obj.y + 'px';
				ocontent.appendChild(obuff);
				buffarr.push(obuff);
			}
			//子弹运动
			(function m() {
				if (!planes) return;
				for (var i = 0; i < opation.oindex + 1; i++) {
					var top = buffarr[i].offsetTop - 20;
					if (top < -buffarr[i].height) {
						ocontent.removeChild(buffarr[i]);
					};
					buffarr[i].style.top = top + 'px';
				}
				requestAnimationFrame(m);
			})();
		}
		bufftimer = setInterval(function () {
			buff({
				x: planes.offsetLeft,
				y: planes.offsetTop,
				width: planes.width
			});
		}, [300, 200, 150, 100][opation.oindex]);
		return planes; //敌军中要用到飞机实例
	}
	//敌军
	function enemy(opation, oplane) {
		var Enum = 1;
		var imgall = '';
		scolltimer = setInterval(function () {
			Enum++;
			var ifbig = !!(Enum % 20);
			//生成敌军
			if (imgall && imgall.length > 50) {
				setTimeout(creEnemy, 1000);
				console.log(setTimeout(creEnemy, 1000));
			} else {
				creEnemy();
				imgall = ocontent.getElementsByTagName('img');
			}
			function creEnemy() {
				// var oenemy = Object.assign(new Image(),new CreatePlane({
				// src : ifbig?'img/enemy_small.png':'img/enemy_big.png',
				// width : ifbig?oplane.width:'140',
				// height : ifbig?oplane.height:'100',
				// className : 'senemy'
				// }));
				var oenemy = new Image();
				oenemy.src = ifbig ? 'img/enemy_small.png' : 'img/enemy_big.png';
				oenemy.width = ifbig ? oplane.width : '140';
				oenemy.height = ifbig ? oplane.height : '100';
				oenemy.className = 'senemy';
				oenemy.hp = ifbig ? 1 + opation.oindex * 2 : 15 + opation.oindex * 2;
				oenemy.score = ifbig ? 2 + opation.oindex * 2 : 30 + opation.oindex * 2;
				var enemy_left = Math.floor(Math.random() * ocontent.offsetWidth - oenemy.width / 2);
				oenemy.style.left = enemy_left + 'px';
				oenemy.style.top = -oenemy.height / 2 + 'px';
				ocontent.appendChild(oenemy);

				//敌机运动
				(function m() {
					if (!oenemy.parentNode) return;
					var top = oenemy.offsetTop + 2;
					var allbuff = ocontent.getElementsByClassName('buff');
					//子弹与敌机的碰撞
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = allbuff[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var nowbuff = _step.value;

							if (isboom(nowbuff, oenemy)) {
								oenemy.hp = oenemy.hp - 1;
								ocontent.removeChild(nowbuff);
								if (oenemy.hp <= 0) {
									scorenum = scorenum + 1;
									repalysrc(oenemy);
									oscore.innerHTML = (oenemy.score * scorenum).toString().padStart(7, '0');
									ocontent.removeChild(oenemy);
									return;
								}
							}
						}
						//我军与敌军的碰撞
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					if (isboom(oplane, oenemy)) {
						repalysrc(oplane);
						oenemy.hp = oenemy.hp - 1;
						if (oenemy.hp <= 0) {
							repalysrc(oenemy);
							ocontent.removeChild(oenemy);
						}
						pop({
							"width": "300",
							"height": "200",
							"top": "100",
							"left": "100",
							"box": ocontent,
							"content": 'greamover,\u6E38\u620F\u7ED3\u675F\uFF0C\u5206\u6570\u4E3A\uFF1A' + oscore.innerHTML
						});
						if (!oplane) return;
						ocontent.removeChild(oplane);
						clearInterval(bufftimer);
						clearInterval(scolltimer);
					}
					oenemy.style.top = top + 'px';
					if (top < ocontent.offsetHeight) {
						requestAnimationFrame(m);
					} else {
						ocontent.removeChild(oenemy);
					}
				})();
			}
		}, [800, 600, 400, 300][opation.oindex]);
	}
	//检测碰撞,true为撞上了，false为没撞上,严格判断比较对象
	function isboom(p1, p2) {
		var T1 = p1.offsetTop,
		    B1 = T1 + p1.offsetHeight,
		    L1 = p1.offsetLeft,
		    R1 = L1 + p1.offsetWidth;
		var T2 = p2.offsetTop,
		    B2 = T2 + p2.offsetHeight,
		    L2 = p2.offsetLeft,
		    R2 = L2 + p2.offsetWidth;
		return !(R1 < L2 || B1 < T2 || L1 > R2 || T1 > B2);
	}
	//替换src
	function repalysrc(dom) {
		var ifenemy = /enemy/.test(dom.src);
		// var boom = Object.assign(new Image(),new CreatePlane({
		// 	src: ifenemy?'img/boom_small.png':'img/boom_big.png',
		// 	width: dom.width,
		// 	height: dom.height,
		// 	className: 'nowboom'
		// }));
		var boom = new Image();
		boom.src = ifenemy ? 'img/boom_small.png' : 'img/boom_big.png';
		boom.width = dom.width;
		boom.height = dom.height;
		boom.className = 'nowboom';
		boom.style.left = dom.offsetLeft + 'px';
		boom.style.top = dom.offsetTop + 'px';
		ocontent.appendChild(boom);
		if (!ifenemy) {
			return;
		}
		setTimeout(function () {
			ocontent.removeChild(boom);
		}, 500);
	}
	//游戏结束greamover
	//obj{
	//	width: 弹窗宽度
	//	height: gaodu
	//	left:  left值
	//	top:  top值
	//	box: 所在父级
	//}
	function pop(obj) {
		var popbox = document.createElement('div');
		var submite = document.createElement('div');
		var box = obj.box;
		popbox.style.position = 'absolute';
		popbox.style.border = '1px solid gray';
		popbox.style['border-radius'] = '10px';
		popbox.style.color = '#fff';
		popbox.style.fontSize = '30px';
		popbox.style['line-height'] = '40px';
		popbox.style['text-align'] = 'center';
		popbox.style.padding = '10px';
		popbox.style.width = obj.width + "px";
		popbox.style.height = obj.height + 'px';
		popbox.style.left = obj.left + 'px';
		popbox.style.top = obj.top + 'px';
		popbox.innerHTML = '<span>' + obj.content + '</span>';
		submite.className = 'submite';
		submite.innerHTML = '重置';
		popbox.addEventListener('click', function () {
			window.location.reload('../plane.html');
		});
		popbox.appendChild(submite);
		box.appendChild(popbox);
	}
})();
