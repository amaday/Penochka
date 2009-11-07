/*
 * DOM Walk plugin.
 */
;(function ($) {
   $.fn.walk = function (f, reversed, lvl) {
      lvl = lvl ? lvl : 0
      if (reversed) {
	 var set = this.children().reverse()
      } else {
	 var set = this.children()
      }
      set.each(
	 function () {
	    $(this).walk(f, reversed, lvl++)
	    f(this, lvl)
	 })
   }
})(jQuery);