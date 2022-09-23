/*! @name @viostream/videojs-title-overlay @version v0.0.3 @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.videojsTitleOverlay = factory(global.videojs));
}(this, (function (videojs) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var videojs__default = /*#__PURE__*/_interopDefaultLegacy(videojs);

  var version = "v0.0.3";

  var defaults = {}; // Cross-compatibility for Video.js 5 and 6.

  var registerPlugin = videojs__default['default'].registerPlugin || videojs__default['default'].plugin; // const dom = videojs.dom || videojs;

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
    var titleOverlayContainer;

    if (!options.title) {
      return;
    }

    var playerEl = player.el();

    if (player.el().classList.contains('vjs-title-overlay')) {
      titleOverlayContainer = playerEl.querySelector('.vjs-title-background');
      var titleOverlayTextContainer = titleOverlayContainer.querySelector('span');
      titleOverlayTextContainer.textContent = options.title;
    } else {
      // first load on player
      player.addClass('vjs-title-overlay'); // eslint-disable-next-line no-undef

      titleOverlayContainer = playerEl.appendChild(document.createElement('div'));
      titleOverlayContainer.className = 'vjs-title-background'; // eslint-disable-next-line no-undef

      var _titleOverlayTextContainer = titleOverlayContainer.appendChild(document.createElement('span'));

      _titleOverlayTextContainer.textContent = options.title;
    }
    /*
    // eslint-disable-next-line no-undef
    const titleOverlayContainer = playerEl.appendChild(document.createElement('div'));
     titleOverlayContainer.className = 'vjs-title-background';
    // eslint-disable-next-line no-undef
    const titleOverlayTextContainer = titleOverlayContainer.appendChild(document.createElement('span'));
     titleOverlayTextContainer.textContent = options.title;
    */


    var showOverlay_ = function showOverlay_() {
      titleOverlayContainer.style.display = 'block';
    };

    var hideOverlay_ = function hideOverlay_() {
      titleOverlayContainer.style.display = 'none';
    };

    showOverlay_();
    player.on('pause', function () {
      showOverlay_();
    });
    player.on('play', function () {
      hideOverlay_();
    });
    player.on('ended', function () {
      hideOverlay_();
    });
   player.on('useractive', function () {
      showOverlay_(); 
  };
  /**
   * A video.js plugin.
   *
   * In the plugin function, the value of `this` is a video.js `Player`
   * instance. You cannot rely on the player being in a "ready" state here,
   * depending on how the plugin is invoked. This may or may not be important
   * to you; if not, remove the wait for "ready"!
   *
   * @function titleOverlay
   * @param    {Object} [options={}]
   *           An object of options left to the plugin author to define.
   */


  var titleOverlay = function titleOverlay(options) {
    var _this = this;

    this.ready(function () {
      onPlayerReady(_this, videojs__default['default'].mergeOptions(defaults, options));
    });
  }; // Register the plugin with video.js.


  registerPlugin('titleOverlay', titleOverlay); // Include the version number.

  titleOverlay.VERSION = version;

  return titleOverlay;

})));