$.fn.slider = function (slideDelay) {
    return this.each(function() {
        var $wrapper = $('> div', this).css('overflow', 'hidden'),
        $items = $wrapper.find('li');
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

        function nextFrame (choice) {
            //getter hack cause of <li> output in inproper order
            $selectors.eq($items.length - currentPage - 1).removeClass('selected');
            $selectors.eq($items.length - choice - 1).addClass('selected');
            $items.eq(currentPage).fadeOut("slow");
            $items.eq(choice).fadeIn("slow");
            currentPage = choice;
        }

        function player() {
            return setInterval((function () {
                nextFrame((currentPage + 1) % $items.length);
            }), slideDelay);
        }
        var stop = player();
        $items.eq(currentPage).css('display', 'list-item');
        var $selectors =  $selectorBox.find('> li');
        //misordered ouptup of <li>, that's why hack
        $selectors.eq($items.length - currentPage - 1).addClass('selected');
        $selectors.each(function (index) {
            $(this).click(function () {
                clearInterval(stop);
                var choice = parseInt($(this).find('>a').attr('href').match('[^#/]+$'));
                if (choice != currentPage) {
                    nextFrame(choice);
                    $(this).delay(slideDelay);
                };
                stop = player();
            });
        });
    });
};

$(function () {
  $('.slider').slider(2000);
});