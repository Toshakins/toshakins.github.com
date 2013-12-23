//at least three images in carousel. recommendation

var smallCarousel = {
	daddy: '.carousel',
	title: '.carousel__title',
	img: '.carousel__img',
	prev: '.carousel__prev',
	next: '.carousel__next',
	progress: '.carousel__progress'
},
	bigCarousel = {
	daddy: '.big-carousel',
	img: '.big-carousel__img',
	prev: '.big-carousel__prev',
	next: '.big-carousel__next',
	progress: '.big-carousel__progress'
};

var leftAnimation = function(prevImg, activeImg, prevTitle, activeTitle) {
	activeTitle.fadeOut(100, function () {
		activeTitle.toggleClass('active');
		prevTitle.fadeIn(100, function() {
			prevTitle.toggleClass('active');
		});
	});

	prevImg.css({
		'top': '0',
		'left': '-100%'
	});
	activeImg.animate({'left':	'100%'}, 200);
	prevImg.animate({'left':	'0%'}, 200);
	activeImg.toggleClass('active');
	prevImg.toggleClass('active');
};


var rightAnimation = function(nextImg, activeImg, nextTitle, activeTitle) {
	activeTitle.fadeOut(100, function () {
		activeTitle.toggleClass('active');
		nextTitle.fadeIn(100, function() {
			nextTitle.toggleClass('active');
		});
	});

	nextImg.css({
		'top': '0',
		'left': '100%'
	});
	activeImg.animate({'left':	'-100%'}, 200);
	nextImg.animate({'left':	'0%'}, 200);
	activeImg.toggleClass('active');
	nextImg.toggleClass('active');
};

var getNext = function (elem) {
	var next = elem.next();
	if (next.length === 0) {
		next = elem.siblings().filter(':last');
	}
	return next;
};

var getPrev = function (elem) {
	var prev = elem.prev();
	if (prev.length === 0) {
		prev = elem.siblings().filter(':first');
	}
	return prev;
};

var carouselShifter = function (rootElement, carouselObject, direction, leftAnimation) {
	var daddy = rootElement.closest(carouselObject.daddy),
		imgs = daddy.find(carouselObject.img),
		activeImg = imgs.filter('.active'),
		prevImg,
		nextImg,
		titles =  daddy.find(carouselObject.title),
		activeTitle = titles.filter('.active'),
		prevTitle,
		nextTitle,
		position = daddy.find('.position'),
		of = daddy.find('.of');

	if (direction === 'prev') {

		prevImg = getPrev(activeImg);
		prevTitle = getPrev(activeTitle);

		leftAnimation(prevImg, activeImg, prevTitle, activeTitle);
		if (position.text() === '1') {
			position.text(of.text());
		} else{
			position.text(parseInt(position.text(), 10) - 1);
		}
	} else {
		nextImg = getNext(activeImg);
		nextTitle = getNext(activeTitle);

		rightAnimation(nextImg, activeImg, nextTitle, activeTitle);
		if (position.text() === of.text()) {
			position.text('1');
		} else{
			position.text(parseInt(position.text(), 10) + 1);
		}
	}
};

$.fn.carouselControl = function (carouselObject) {
	$(carouselObject.daddy + ' ' + carouselObject.prev).click(function(e) {
		e.preventDefault();
		carouselShifter($(this), carouselObject, 'prev', leftAnimation);
	});

	$(carouselObject.daddy + ' ' + carouselObject.next).click(function(e) {
		e.preventDefault();
		carouselShifter($(this), carouselObject, 'next', rightAnimation);
	});

	return this.each(function () {
		var progress = $(this).find(smallCarousel.progress),
			imgs = $(this).find(carouselObject.img),
			titles = $(this).find(carouselObject.title);
		imgs.first().toggleClass('active');
		if (titles.length){ titles.first().toggleClass('active'); }
		progress.find('.position').text('1');
		progress.find('.of').text(imgs.length);
	});
};

$(function() {
	$(smallCarousel.daddy).carouselControl(smallCarousel);
	$(bigCarousel.daddy).carouselControl(bigCarousel);
});