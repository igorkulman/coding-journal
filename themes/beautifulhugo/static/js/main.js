/*!
 * Add an event listener
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String}   event    The event type
 * @param  {Node}     elem     The element to attach the event to (optional, defaults to window)
 * @param  {Function} callback The callback to run on the event
 * @param  {Boolean}  capture  If true, forces bubbling on non-bubbling events
 */
var on = function (event, elem, callback, capture) {
	if (typeof (elem) === 'function') {
		capture = callback;
		callback = elem;
		elem = window;
	}
	capture = capture ? true : false;
	elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
	if (!elem) return;
	elem.addEventListener(event, callback, capture);
};

// Dean Attali / Beautiful Jekyll 2016

var main = {
  
  init : function() {
    // Shorten the navbar after scrolling a little bit down
    window.onscroll = function() {
        var rect = document.getElementsByClassName("navbar")[0].getBoundingClientRect()
        var offset = { 
          top: rect.top + window.scrollY, 
          left: rect.left + window.scrollX, 
        };
        if (offset.top > 50) {
          document.getElementsByClassName("navbar")[0].classList.add("top-nav-short");
        } else {
          document.getElementsByClassName("navbar")[0].classList.remove("top-nav-short");
        }
    };

    // On mobile, hide the avatar when expanding the navbar menu
    on('show.bs.collapse', document.getElementById('main-navbar'), function () {      
      document.getElementsByClassName("navbar")[0].classList.add("top-nav-expanded");
    });
    on('hidden.bs.collapse', document.getElementById('main-navbar'), function () {      
      document.getElementsByClassName("navbar")[0].classList.remove("top-nav-expanded");
    });
  }  
};

document.addEventListener('DOMContentLoaded', main.init);