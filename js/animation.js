
"use strict"


// let change = document.querySelector('.block-inside');
// function animationBlockOpen() {
// 	let timer = setInterval(function() {
//  		let start = Date.now();
//  		let timePassed = Date.now() - start;
//  		if (timePassed >= 2000) {
//  			clearIntreval(timer);
//  			return;
//  		}
//  		draw(timePassed, change);
// 	}, 20);
// }

// function draw(timePassed, elem) {
// 	elem.style.width = timePassed + 5 + '%';
// }

function animationBlockOpen() {
	document.querySelector('.block-inside').classList.add('animateBlock');
	document.querySelector('.animate-h2').classList.add('animateBlockH2');
	document.querySelector('.animate-text-1').classList.add('animationShowText');
	document.querySelector('.animate-show-text-1').classList.add('animateShowInsideText');
}

function animationBlockOpen2() {
	document.querySelector('.block-inside-2').classList.add('animateBlock');
	document.querySelector('.animate-h2-2').classList.add('animateBlockH2Left');
	document.querySelector('.animate-text-2').classList.add('animationShowTextLeft');
	document.querySelector('.animate-show-text-2').classList.add('animateShowInsideText');
}

function animationBlockOpen3() {
	document.querySelector('.block-inside-3').classList.add('animateBlock');
	document.querySelector('.animate-h2-3').classList.add('animateBlockH2');
	document.querySelector('.animate-text-3').classList.add('animationShowTextLeft');
	document.querySelector('.animate-show-text-3').classList.add('animateShowInsideText');
}

function openMobileNav() {
	let x = document.querySelector('.mobile-menu-nav')
	let bg = document.querySelector('.mobile-menu-header');
	let icon = document.querySelector('.gamburger-icon');
	if (x.style.paddingBottom === '120px') {
		x.style.paddingBottom = '0px';
		bg.style.backgroundColor = 'black';
		bg.style.backgroundImage = "url('img/Logo.svg')";
		icon.style.backgroundImage = "url('img/MenuIconBar.svg')";
	} else {
		x.style.paddingBottom = '120px';
		bg.style.backgroundColor = 'white';
		bg.style.backgroundImage = "url('img/BlackLogo.svg')";
		icon.style.backgroundImage = "url('img/MenuIconBarBlack.svg')";
	}
}

//onScroll

let isScrolling = false;
 
window.addEventListener("scroll", throttleScroll, false);

function throttleScroll(e) {
  if (isScrolling == false) {
	window.requestAnimationFrame(function() {
	  scrolling(e);
	  isScrolling = false;
	});
  }
  isScrolling = true;
}

document.addEventListener("DOMContentLoaded", scrolling, false);

// let listItems = document.querySelectorAll("#mainContent ol li");
// let firstBox = document.querySelector("#firstBox");
let storm = document.querySelector(".shtorm-animation");

function scrolling(e) {
  if (isFullyVisible(storm)) {
	storm.classList.add("move-storm");
  }
}

function isFullyVisible(el) {
  let elementBoundary = el.getBoundingClientRect();

  let top = elementBoundary.top;
  let bottom = elementBoundary.bottom;

  return ((top >= 0) && (bottom <= window.innerHeight));
}

//slider

var multiItemSlider = (function () {
	return function (selector, config) {
	  var
		_mainElement = document.querySelector(selector), // основный элемент блока
		_sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
		_sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
		_sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
		_sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
		_sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
		_wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
		_itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
		_positionLeftItem = 0, // позиция левого активного элемента
		_transform = 0, // значение транфсофрмации .slider_wrapper
		_step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
		_items = []; // массив элементов

	  // наполнение массива _items
	  _sliderItems.forEach(function (item, index) {
		_items.push({ item: item, position: index, transform: 0 });
	  });

	  var position = {
		getItemMin: function () {
		  var indexItem = 0;
		  _items.forEach(function (item, index) {
			if (item.position < _items[indexItem].position) {
			  indexItem = index;
			}
		  });
		  return indexItem;
		},
		getItemMax: function () {
		  var indexItem = 0;
		  _items.forEach(function (item, index) {
			if (item.position > _items[indexItem].position) {
			  indexItem = index;
			}
		  });
		  return indexItem;
		},
		getMin: function () {
		  return _items[position.getItemMin()].position;
		},
		getMax: function () {
		  return _items[position.getItemMax()].position;
		}
	  }

	  var _transformItem = function (direction) {
		var nextItem;
		if (direction === 'right') {
		  _positionLeftItem++;
		  if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
			nextItem = position.getItemMin();
			_items[nextItem].position = position.getMax() + 1;
			_items[nextItem].transform += _items.length * 100;
			_items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
		  }
		  _transform -= _step;
		}
		if (direction === 'left') {
		  _positionLeftItem--;
		  if (_positionLeftItem < position.getMin()) {
			nextItem = position.getItemMax();
			_items[nextItem].position = position.getMin() - 1;
			_items[nextItem].transform -= _items.length * 100;
			_items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
		  }
		  _transform += _step;
		}
		_sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
	  }

	  // обработчик события click для кнопок "назад" и "вперед"
	  var _controlClick = function (e) {
		if (e.target.classList.contains('slider__control')) {
		  e.preventDefault();
		  var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
		  _transformItem(direction);
		}
	  };

	  var _setUpListeners = function () {
		// добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
		_sliderControls.forEach(function (item) {
		  item.addEventListener('click', _controlClick);
		});
	  }

	  // инициализация
	  _setUpListeners();

	  return {
		right: function () { // метод right
		  _transformItem('right');
		},
		left: function () { // метод left
		  _transformItem('left');
		}
	  }

	}
  }());

  var slider = multiItemSlider('.slider');

  window.addEventListener("DOMContentLoaded", function() {
	function setCursorPosition(pos, elem) {
		elem.focus();
		if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
		else if (elem.createTextRange) {
			var range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd("character", pos);
			range.moveStart("character", pos);
			range.select()
		}
	}
	
	function mask(event) {
		var matrix = this.defaultValue,
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
			def.length >= val.length && (val = def);
		matrix = matrix.replace(/[_\d]/g, function(a) {
			return val.charAt(i++) || "_"
		});
		this.value = matrix;
		i = matrix.lastIndexOf(val.substr(-1));
		i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
		setCursorPosition(i, this)
	}
	
		var input = document.querySelector(".mask-phone");
		input.addEventListener("input", mask, false)
	});

const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

const svgNS = 'http://www.w3.org/2000/svg';
const $ = document.querySelector.bind(document);
const svg = $('svg');
const rand = (min, max) => (min + Math.floor(Math.random() * (max - min + 1)));
const palette = [
  '#f07', '#0cf', '#0f7', '#fff'
];

function setSize() {
  svg.setAttributeNS(svgNS, 'viewBox', [0, 0, innerWidth, innerHeight].join(' ')); 
};

function create(tag, attrs) {
  const el = document.createElementNS(svgNS, tag);
  if (attrs) {
    Object.entries(attrs).map(([key, value]) => {
      el.setAttribute(key, value);
    });
  }
  svg.appendChild(el);
  return el;
}

class GenerativePattern {
  constructor(color = '#fff') {
    this.pathStyle = {fill: 'none', 'stroke': color};
    this.pathDef = '';
    this.setRandomPosition();
    this.setRandomDirection();
  }
  
  setRandomPosition() {
    this.x = rand(0, innerWidth);
    this.y = rand(0, innerHeight);
  }
  
  setRandomDirection() {
    this.xDir = Math.random() < .5 ? -5 : 5;
    this.yDir = Math.random() < .5 ? -5 : 5;    
  }
  
  step() {
    const { x, y, xDir, yDir } = this;
    if (Math.random() < .8) {
      this.pathDef += `M${x} ${y} l${-xDir*50} ${yDir * 50}`
      this.x += xDir;
      this.y += yDir;
    }
    if (! this.path) {
      this.path = create('path', this.pathStyle);
    }
    if (Math.random() < .05) {
      this.setRandomDirection();
    }
    if (Math.random() < .1) {
      this.setRandomPosition();
    }
    if (this.pathDef.length > 800 && Math.random() < .8) {
      this.pathDef = this.pathDef.slice(this.pathDef.indexOf('M', 1))
    }
    this.path.setAttribute('d', this.pathDef);
  }
}

const patterns = Array(4).fill(0).map((_, i) => new GenerativePattern(palette[i]));

function loop() {
  patterns.map(p => p.step());
  window.setTimeout(() => requestAnimationFrame(loop), 100);
}

setSize();
window.addEventListener('resize', setSize);
loop();


