//============================================================
//
// Parallax Zepto/jQuery Plugin
//
// @description Parallax effect across an array of layers
// @version 1.00
//
// @author Matthew Wagerfield @mwagerfield
//
//============================================================

(function($) {

  function clamp(value, min, max) {
    value = Math.max(value, min);
    value = Math.min(value, max);
    return value;
  }

  function setLayerPosition($layer, x, y) {
    x += '%';
    y += '%';
    $.fx.off = true;
    if (Modernizr.csstransforms3d) {
      $layer.anim({translate3d:x+','+y+',0'});
    } else if (Modernizr.csstransforms) {
      $layer.anim({translate:x+','+y});
    } else {
      $layer.anim({left:x, top:y});
    }
  }

  function onAnimationFrame() {
    this.ox = this.ox + this.dy * this.settings.dampeningX;
    this.oy = this.oy + this.dx * this.settings.dampeningY;
    this.ox = clamp(this.ox, -this.settings.motionX, this.settings.motionX);
    this.oy = clamp(this.oy, -this.settings.motionY, this.settings.motionY);
    this.$layers.each($.proxy(function(index, element) {
      var $layer = $(element);
      var depth = $layer.data('depth') || 0;
      var xOffset = this.ox * depth * (this.settings.invertX ? -1 : 1);
      var yOffset = this.oy * depth * (this.settings.invertY ? -1 : 1);
      setLayerPosition($layer, xOffset, yOffset);
    }, this));
    this.raf = requestAnimationFrame($.proxy(onAnimationFrame, this));
  }

  function onDeviceOrientation(event) {

    // Extract Rotation
    var x = event.beta  || 0; //  -90 :: 90
    var y = event.gamma || 0; // -180 :: 180
    var z = event.alpha || 0; //    0 :: 360

    // Set Initial Rotation
    if (this.initialRotationSet === false) {
      this.initialRotationSet = true;
      this.rx = x;
      this.ry = y;
      this.rz = z;
    }

    // Set Delta Rotation
    this.dx = x - this.rx;
    this.dy = y - this.ry;
    this.dz = z - this.rz;

    // Set Rotation
    this.rx = x;
    this.ry = y;
    this.rz = z;
  }

  $.fn.parallax = function(options) {

    // Configure Each Parallax Component
    return this.each(function(index, element) {

      // API
      var api = {index:index, element:element};

      // Selections
      api.$this = $(this);
      api.$window = $(window);
      api.$layers = api.$this.find('.layer').addClass('accelerate');

      // Data Extraction
      var data = {
        invertX: api.$this.data('invert-x'),
        invertY: api.$this.data('invert-y'),
        motionX: parseFloat(api.$this.data('motion-x')),
        motionY: parseFloat(api.$this.data('motion-y')),
        dampeningX: 1 / (parseFloat(api.$this.data('dampening-x')) || 1),
        dampeningY: 1 / (parseFloat(api.$this.data('dampening-y')) || 1)
      };

      // Inversion Correction
      data.invertX = data.invertX === undefined ? true : data.invertX;
      data.invertY = data.invertY === undefined ? true : data.invertY;

      // Motion Correction
      data.motionX = isNaN(data.motionX) ? 10 : data.motionX;
      data.motionY = isNaN(data.motionY) ? 10 : data.motionY;

      // Compose Settings Object
      api.settings = $.extend({}, data, options);

      // Support
      api.orientationSupport = window.DeviceOrientationEvent !== undefined;
      api.motionSupport = window.DeviceMotionEvent !== undefined;

      // States
      api.initialRotationSet = false;
      api.raf = null;

      // Rotation
      api.rx = 0;
      api.ry = 0;
      api.rz = 0;

      // Delta
      api.dx = 0;
      api.dy = 0;
      api.dz = 0;

      // Offset
      api.ox = 0;
      api.oy = 0;

      // Enable
      $.fn.parallax.enable(api);
    });
  };

  $.fn.parallax.enable = function(instance) {
    instance.$window.on('deviceorientation', $.proxy(onDeviceOrientation, instance));
    instance.raf = requestAnimationFrame($.proxy(onAnimationFrame, instance));
  };

  $.fn.parallax.disable = function() {
    instance.$window.off('deviceorientation', onDeviceOrientation);
    cancelAnimationFrame(instance.raf);
  };

})(window.jQuery || window.Zepto);
