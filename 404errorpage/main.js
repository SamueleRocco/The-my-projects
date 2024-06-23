$(function (){ 
    setInterval(function(){
      if( $('.errorBox').length > 20){
        console.log($('.errorBox').length)
        var firstBox = $('.errorBox').first().addClass('out')
        firstBox.one("animationend webkitAnimationEnd", function(){
          firstBox.remove();
        })
      }

      var box = $('.errorBox').last().clone();
      $('body').append(box);
      $(box).css({
        'top': Math.random() * (100 - 0) + (0)+'%',
        'left': Math.random() * (100 - 0) + (0)+'%',
      });
    }, 500);
});