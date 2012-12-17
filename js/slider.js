$.fn.slider = function () {
	return this.each(function() {
		var $wrapper = $('> div', this).css('overflow', 'hidden'),
		$slider = $wrapper.find('> ul'),
		$items = $slider.find(' > li'),
		$single = $items.find(':first');

		$wrapper.after('<div class="selection"></div>');
		var $selection = $('.selection');
		$selection.append('<ul></ul>');
		var $selectors = $('.selection').find('> ul');
		$items.each(function (index) {
			$selectors.append('<li><a href=#' + index + '></a></li>')
		});
		
	});
};

$(document).ready(function () {
  $('.slider').slider();
});