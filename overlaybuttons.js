




/*! @name videojs-overlay-buttons @version 1.2.9 @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = global || self, global.videojsOverlayButtons = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  videojs = videojs && Object.prototype.hasOwnProperty.call(videojs, 'default') ? videojs['default'] : videojs;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var version = "1.2.9";

  var latestTap;
  var isLocked = false; // Default options for the plugin.

  var defaults = {
    seekLeft: {
      handleClick: function handleClick(player) {
        var time = Number(player.currentTime()) - 10;
        player.currentTime(time);
      },
      doubleTap: true
    },
    play: {
      handleClick: function handleClick(player) {
        if (player.paused()) {
          player.play();
        } else {
          player.pause();
        }
      }
    },
    seekRight: {
      handleClick: function handleClick(player) {
        var time = Number(player.currentTime()) + 10;
        player.currentTime(time);
      },
      doubleTap: true
    },
    lockButton: false
  };
  var controlButtons = {
    previous: {
      icon: 'backward',
      className: 'previous-button'
    },
    seekLeft: {
      icon: 'history',
      className: 'seek-left'
    },
    play: {
      icon: 'play',
      className: 'play-button'
    },
    seekRight: {
      icon: 'history',
      className: 'seek-right',
      extra: 'fa-flip-horizontal'
    },
    next: {
      icon: 'forward',
      className: 'next-button'
    }
  }; // Cross-compatibility for Video.js 5 and 6.

  var registerPlugin = videojs.registerPlugin || videojs.plugin; // const dom = videojs.dom || videojs;

  /**
   * Function to invoke when the player is ready.
   *
   * This is a great place for your plugin to initialize itself. When this
   * function is called, the player will have its DOM and child components
   * in place.
   *
   * @function onPlayerReady
   * @param    {Player} player
   *           A Video.js player object.
   *
   * @param    {Object} [options={}]
   *           A plain object containing options for the plugin.
   */

  var onPlayerReady = function onPlayerReady(player, options) {
    player.addClass('vjs-touch-overlay');
    var overlay = createOverlay(player, options);
    player.el().append(overlay);
    eventsInitialize(player, overlay);
  };

  var eventsInitialize = function eventsInitialize(player, overlay) {
    var overlayRow = document.querySelector('.overlay-row');
    player.on('play', function () {
      var playButtonWrapper = document.querySelector('.play-button .button-wrapper');
      playButtonWrapper.innerHTML = '<i class="icon fa fa-4x fa-pause"></i>';
    });
    player.on('pause', function () {
      var playButtonWrapper = document.querySelector('.play-button .button-wrapper');
      playButtonWrapper.innerHTML = '<i class="icon fa fa-4x fa-play"></i>';
    });
    
    player.on('userinactive', function () {
      overlay.classList.add('d-none');
      overlayRow.classList.add('d-none');
    });
    player.on('pause', function () {
      overlay.classList.add('d-none');
      overlayRow.classList.add('d-none');
    });
    
    player.on('useractive', function () {
      overlay.classList.remove('d-none');
      overlayRow.classList.remove('d-none');
    });
    overlay.addEventListener('click', function (e) {
      var controlBar = document.querySelector('.vjs-control-bar'); // If clicked element is overlay button, then ignore this

      if (e.target.classList.contains('icon')) {
        return;
      }

      if (!overlayRow.classList.contains('d-none')) {
        overlayRow.classList.add('d-none');
        controlBar.classList.remove('d-none');
      } else {
        overlayRow.classList.remove('d-none');

        if (!isLocked) {
          controlBar.classList.remove('d-none');
        }
      }
    });
  };

  var createOverlay = function createOverlay(player, options) {
    if (!options || !Object.keys(options).length) {
      options = _extends({}, defaults);
    } else {
      options = mergeOptions(options, defaults);
    }

    var overlay_div = document.createElement('div');
    var row = document.createElement('div');
    var controlOverlay = document.createElement('div');
    controlOverlay.className = 'overlay-col-12 mx-auto control-overlay-buttons';
    row.className = 'overlay-row';
    overlay_div.className = 'overlay-container-fluid vjs-overlay'; // Filter out button options

    var btnOpts = Object.keys(options).filter(function (button) {
      return controlButtons.hasOwnProperty(button);
    });
    var buttons = btnOpts.map(function (button) {
      var buttonProperties = controlButtons[button];
      var element = createButton(buttonProperties);
      return {
        options: options[button],
        element: element
      };
    });
    handleClick(buttons, player);
    handleTap(buttons, player);

    if (options.lockButton) {
      var lockOverlay = document.createElement('div');
      lockOverlay.className = 'overlay-col-1 lock-overlay';
      controlOverlay.classList.remove('overlay-col-12', 'mx-auto');
      controlOverlay.classList.add('overlay-col-11');
      var lockButtonProperties = {
        icon: 'lock',
        className: 'lock-button',
        size: '2x'
      };
      var lockButton = createButton(lockButtonProperties);
      handleLockClick(lockButton);
      lockOverlay.append(lockButton);
      row.append(lockOverlay);
    }

    buttons.forEach(function (button) {
      return controlOverlay.append(button.element);
    });
    row.append(controlOverlay);
    overlay_div.append(row);
    return overlay_div;
  };

  var handleLockClick = function handleLockClick(lockBtn) {
    var _lockBtn$children = lockBtn.children,
        wrapperElement = _lockBtn$children[0];
    var controlBar = document.querySelector('.vjs-control-bar');
    wrapperElement.addEventListener('click', function () {
      var controlButtonsWrapper = Array.from(document.querySelectorAll('.overlay-button:not(.lock-button)'));

      if (isLocked) {
        wrapperElement.innerHTML = '<i class="icon fa fa-2x fa-lock"></i>';
        controlButtonsWrapper.forEach(function (btn) {
          btn.classList.remove('d-none');
        });
        controlBar.classList.remove('d-none');
        isLocked = false;
        return;
      }

      wrapperElement.innerHTML = '<i class="icon fa fa-2x fa-unlock"></i>';
      controlButtonsWrapper.forEach(function (btn) {
        btn.classList.add('d-none');
      });
      controlBar.classList.add('d-none');
      isLocked = true;
    });
  };

  var handleTap = function handleTap(buttons, player) {
    buttons = buttons.filter(function (button) {
      return button.options.doubleTap && button.options.handleClick;
    });
    buttons.forEach(function (button) {
      button.element.addEventListener('click', function () {
        isDoubleTap(function () {
          button.options.handleClick(player);
        });
      });
    });
  };

  var handleClick = function handleClick(buttons, player) {
    buttons = buttons.filter(function (btn) {
      return btn.options.handleClick;
    });
    buttons.forEach(function (button) {
      var _button$element$child = button.element.children,
          wrapperElement = _button$element$child[0];
      wrapperElement.addEventListener('click', function () {
        return button.options.handleClick(player);
      });
    });
  };

  var createButton = function createButton(_ref) {
    var icon = _ref.icon,
        _ref$extra = _ref.extra,
        extra = _ref$extra === void 0 ? '' : _ref$extra,
        _ref$className = _ref.className,
        className = _ref$className === void 0 ? '' : _ref$className,
        _ref$size = _ref.size,
        size = _ref$size === void 0 ? '4x' : _ref$size;
    var iconEl = document.createElement('i');
    iconEl.className = "icon fa fa-" + size + " fa-" + icon + " " + extra;
    var wrapper = document.createElement('div');
    wrapper.className = 'button-wrapper';
    wrapper.append(iconEl);
    var button = document.createElement('div');
    button.className = "overlay-button vjs-button " + className;
    button.append(wrapper);
    return button;
  };

  var isDoubleTap = function isDoubleTap(callback) {
    var now = new Date().getTime();
    var timeSince = now - latestTap;

    if (timeSince < 400 && timeSince > 0) {
      callback();
    }

    latestTap = new Date().getTime();
  };

  var mergeOptions = function mergeOptions(originalOpts, defaultOpts) {
    for (var key in originalOpts) {
      var userOption = originalOpts[key];
      var defaultOption = defaultOpts[key];

      if (!defaultOption) {
        continue;
      }

      for (var option in defaultOption) {
        if (!userOption.hasOwnProperty(option) && defaultOption.hasOwnProperty(option)) {
          userOption[option] = defaultOption[option];
        }
      }
    }

    return originalOpts;
  };
  /**
   * A video.js plugin.
   *
   * In the plugin function, the value of `this` is a video.js `Player`
   * instance. You cannot rely on the player being in a "ready" state here,
   * depending on how the plugin is invoked. This may or may not be important
   * to you; if not, remove the wait for "ready"!
   *
   * @function touchOverlay
   * @param    {Object} [options={}]
   *           An object of options left to the plugin author to define.
   */


  var touchOverlay = function touchOverlay(options) {
    var _this = this;

    // videojs.mergeOptions(defaults, options)
    this.ready(function () {
      onPlayerReady(_this, options);
    });
  }; // Register the plugin with video.js.


  registerPlugin('touchOverlay', touchOverlay); // Include the version number.

  touchOverlay.VERSION = version;

  return touchOverlay;

})));

