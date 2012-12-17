$.fn.slider = function () {
    return this.each(function() {
        var $wrapper = $('> div', this).css('overflow', 'hidden'),
        $slider = $wrapper.find('> ul'),
        $items = $slider.find('> li');
        var currentPage = 0;

        function gotoPage (page, currentPage) {
            if (page != currentPage) {

            }
        }

        $wrapper.after('<div class="selection"></div>');
        var $selection = $('.selection');
        $selection.append('<ul></ul>');
        $selectorBox = $selection.find('> ul');
        $items.each(function (index) {
            $selectorBox.append('<li><a href=#' + 
                ($items.length - index - 1) + '></a></li>');
        });
        var $selectors =  $selectorBox.find('> li');
        $selectors.each(function (index) {
            $(this).click(function () {
                var choice = $(this).find('>a').attr('href').match('[^#/]+$');
                if (choice != currentPage) {
                    $items.eq(currentPage).fadeOut("slow");
                    $items.eq(choice).fadeIn("slow");
                    currentPage = choice;
                };
            });
        });
    });
};

$(function () {
  $('.slider').slider();
});