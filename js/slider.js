$.fn.slider = function (slideDelay) {
    return this.each(function() {
        var $wrapper = $('> div', this).css('overflow', 'hidden'),
        $itemsBox = $wrapper.find('> ul');
        $items = $itemsBox.find('> li');
        var currentPage = 0;
        $wrapper.after('<div class="selection"></div>');
        var $selection = $('.selection');
        $selection.append('<ul></ul>');
        $selectorBox = $selection.find('> ul');
        $items.each(function (index) {
            $selectorBox.append('<li><a href=#' + 
                ($items.length - index - 1) + '></a></li>');
            $(this).css('display', 'none');
        });
        function nextSlide (choice) {
            //eq hack cause of <li> output inproper order
            $selectors.eq($items.length - currentPage - 1).removeClass('selected');
            $selectors.eq($items.length - choice - 1).addClass('selected');
            $items.eq(currentPage).fadeOut("slow", 
                (function() {$items.eq(choice).fadeIn("slow");}));
            currentPage = choice;
        };
        function player() {
            return setInterval((function () {
                nextSlide((currentPage + 1) % $items.length);
            }), slideDelay);
        };
        var breaker = player();
        $items.eq(currentPage).css('display', 'list-item');
        var $selectors =  $selectorBox.find('> li');
        //misordered output of <li>, that's why mysterious eq
        $selectors.eq($items.length - currentPage - 1).addClass('selected');
        $selectors.each(function (index) {
            $(this).click(function () {
                clearInterval(breaker);
                var choice = parseInt($(this).find('>a').attr('href').match('[^#/]+$'));
                if (choice != currentPage) {
                    nextSlide(choice);
                    $(this).delay(slideDelay);
                };
                breaker = player();
            });
        });
    });
};

$(function () {
  $('.slider').slider(5000);
});