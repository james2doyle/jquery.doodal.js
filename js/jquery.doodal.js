/*
 * jquery.doodal.js
 * v1.1.0
 * Author: James Doyle(@james2doyle)
 * Repo: https://github.com/james2doyle/jquery.doodal.js
 * Demo: http://james2doyle.github.io/jquery.doodal.js
 * Licensed under the MIT license
 */

// events
// open - when the modal starts to open
// afteropen - after the animation is over and it is open
// ontrue - for confirms yes button
// onfalse - for confirms no button
// close - when the close is clicked
// afterclose - after the animation is over and it is hidden

;(function($, window, document, undefined) {
  // our plugin constructor
  var Doodal = function(elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };
  // transition end detection
  var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';
  function transitEnd($elem, method, callback) {
    if (method === 'open') {
      $elem.css('z-index', 1);
    }
    $elem.on(transitionEnd, function transitHandle() {
      $elem.off(transitionEnd, transitHandle);
      if(method === 'close') {
        $elem.css('z-index', -1);
      }
      callback($elem);
    });
  }
  // the plugin prototype
  Doodal.prototype = {
    defaults: {
      closeclass: '.doodal-close',
      trueclass: '.doodal-true',
      falseclass: '.doodal-false',
      showclass: 'showing',
      escape: true
    },
    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.eventType();
      this.addEvents(this);
      var $this = this;
      this.$elem.on('open', function() {
        $this.openDoodal($this);
      });
      this.$elem.on('close', function() {
        $this.closeDoodal();
      });
      // bind the escape key to the close trigger
      if (this.config.escape) {
        $(document).on('keydown', function(event){
          if(event.keyCode === 27) {
            $this.$elem.trigger('close');
          }
        });
      }
      return this;
    },
    // detect if they are using a touchscreen
    // helps with the click delay
    eventType: function() {
      if('ontouchstart' in window) {
        this.evt = 'touchstart';
      } else {
        this.evt = 'click';
      }
    },
    addEvents: function(elem) {
      this.$elem.find(this.config.closeclass).on(this.evt, function(event) {
        event.preventDefault();
        elem.$elem.trigger('close');
        return false;
      });
      function boolClick() {
        elem.$elem.trigger('on'+$(this).data('bool'));
        return false;
      }
      this.$elem.find(this.config.trueclass).on(this.evt, boolClick);
      this.$elem.find(this.config.falseclass).on(this.evt, boolClick);
    },
    openDoodal: function() {
      this.$elem.addClass(this.config.showclass);
      transitEnd(this.$elem, 'open', function(elem) {
        elem.trigger('afteropen');
      });
    },
    closeDoodal: function() {
      this.$elem.removeClass(this.config.showclass);
      transitEnd(this.$elem, 'close', function(elem) {
        elem.trigger('afterclose');
        // remove the event to stop event propagation
        elem.off(transitionEnd, transitEnd);
      });
    }
  }
  Doodal.defaults = Doodal.prototype.defaults;
  $.fn.doodal = function(options) {
    return this.each(function() {
      new Doodal(this, options).init();
    });
  };
})(jQuery, window, document);