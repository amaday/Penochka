/**
 *
 *
 */

$.p5a.house.bind(
   'click',
   function (e) {
      var subj = $(e.target)
      if (e.which == 1 && subj.is('img')) {
	 var href = subj.closest('a').attr('href')
	 alert(href)
         if (href) {
	    if (subj.attr('thumb')) {
               subj.attr('src', subj.attr('thumb'))
	       subj.removeAttr('thumb')
	    } else {
	       subj.attr('thumb', subj.attr('src')).
		  attr('src', href)
	    }
            return false
         }
      }
   })
