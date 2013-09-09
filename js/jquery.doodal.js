/*
 * jquery.doodal.js
 * v1.0.0
 * Author: James Doyle(@james2doyle)
 * Repo: https://github.com/james2doyle/jquery.doodal.js
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
      type: 'modal',
      closeclass: '.doodal-close',
      trueclass: '.doodal-true',
      falseclass: '.doodal-false',
      showclass: 'showing'
    },
    init: function() {
      // Introduce defaults that can be extended either
      // globally or using an object literal.
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
      $(document).on('keydown', function(event){
        if(event.keyCode === 27) {
          $this.$elem.trigger('close');
        }
      });
      return this;
    },
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
  //optional: window.Doodal = Doodal;
})(jQuery, window, document);

// References
/*
Creating Highly Configurable jQuery Plugins (by Mark Dalgleish) - http://goo.gl/1VwfP http://goo.gl/bg63
Essential jQuery Plugin Patterns (by Addy Osmani) - http://goo.gl/oE0ge
*/