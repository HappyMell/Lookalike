 $(function () {
     $('.newsCollapse').on('hidden.bs.collapse', function (e) {
         var $card = $(this).closest('.line');
         $('html,body').animate({
             scrollTop: $card.offset().top
         }, 1000);
     });
 })

 $(function () {
     $('.cross').each(function (index) {
         $(this).on('click', function () {
             if ($('#info-' + index).css('opacity') == 1) $('#info-' + index).css('opacity', 0);
             else if ($('#info-' + index).css('opacity') == 0) $('#info-' + index).css('opacity', 1);
             else $('#info-' + index).css('opacity', 1);

         });
     })

 })