$(document).ready(function(){

$('.vjs-loading-spinner').html('<img src="https://cdn.jsdelivr.net/gh/ltft/latinflixtvplayer@main/Bean%20Eater-1.3s-100px%20(1).svg" alt="Loading...">');

});


(function (window, videojs) {

        var latinflixtv_Player = (window.latinflixtvPlayer = videojs(

          "latinflixtvplayer1"

        ));
  
  var touchOverlay = (window.touchOverlay = latinflixtvPlayer.touchOverlay({

          

          seekLeft: {},
    play: {},
          seekRight: {},
          
          lockButton: {},
        }));

      })(window, window.videojs);

  
(function(window, videojs,) {

      var player = window.player = videojs('latinflixtvplayer1');

  player.hlsQualitySelector({

         displayCurrentQuality:false,
         sortAscending: true,
autoPlacement: 'top',
          getCurrentQuality: '360p',         
      });
    }(window, window.videojs));

  





//WaterMark Plugin
(function(window, videojs) {

      var player = window.player = videojs('latinflixtvplayer1');

      player.watermark({

        image: 'https://cdn.jsdelivr.net/gh/ltft/latinflixtvplayer@main/svg%20(1)%20(1).svg' ,

        url: '',

        align: 'top-left',

      });

    }(window, window.videojs));








//Context Menu Plugin
(function(window, videojs) {
      var player = window.player = videojs('latinflixtvplayer1');

      player.contextmenuUI({
        content: [{
          href: window.location.href,
          label: 'LatinflixTV Player™'
        }, {
          label: '',
          listener: function() {
            alert('you clicked the example link!');
          }
        }]
      });
    }(window, window.videojs));





//MobileUI Plugin


var player = videojs('latinflixtvplayer1');

  player.mobileUi();



videojs('latinflixtvplayer1', {
    controls: true,
    plugins: {
        videoJsResolutionSwitcher: {
          default: 'high',
          dynamicLabel: true
        }
      }
  }, function(){

      player.on('resolutionchange', function(){
        console.info('Source changed to %s', player.src())
      })
      
  })


/* VIDEOJS */
// declare object for video
var vgsPlayer, poster;
/*
vgsPlayer = videojs('vid1', {
  techOrder: ['youtube'],
  autoplay: false,
  sources: [{
    type: "video/youtube",
    src: "https://www.youtube.com/watch?v=xjS6SftYQaQ"
  }]
});
*/

vgsPlayer = videojs('latinflixtvplayer1');

// RELOAD VIDEO ON CLICK LIVE BUTTON GC
$(document).on('click', '.vjs-live-display', function() {

  vgsPlayer.src({
    "type": vgsPlayer.currentType(),
    "src": vgsPlayer.currentSrc()
  });
  vgsPlayer.load();
  vgsPlayer.play();
});

vgsPlayer.on('error', function() {
  console.log('The following error occurred:', this.error());
});

/* 
vgsPlayer = videojs('vid1', {
  techOrder: ["html5", "flash", "youtube"],
  autoplay: false,
  youtube: {
    "iv_load_policy": 3
  },
  sources: [{
    type: "video/mp4",
    src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
  }]
}); */

//vgsPlayer.poster('https://img.youtube.com/vi/aqz-KE-bpKQ/maxresdefault.jpg');
//vgsPlayer.poster("http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4")

//videojs("vid1").ready(function() {
//  vgsPlayer = this;
//});

/********* LOAD URL *********/
$('#vidlink li a').on('click', function(e) {
  e.preventDefault();
  var vidlink = $(this).attr('href');
  $('#vsg-vurl').val(vidlink);  
  $('input[type=submit]').click(); 
  //vsgLoadVideo(vidlink);
});

jQuery(function($) {

  // vsgLoadVideo("https://www.youtube.com/watch?v=r1H98REH0c0");
  // Video on page load

  //jQuery(document).ready(function($) {

  $("#vsg-loadvideo").submit(function(e) {
    e.preventDefault();

    var vidURL = $("#vsg-vurl").val();

    vsgLoadVideo(vidURL);

  });

}); // jQuery(function($) END


function vsgLoadVideo(vidURL, poster) {

  var type = getType(vidURL);

  console.log(type);

  if (getId(vidURL))
    poster = "http://img.youtube.com/vi/" + getId(vidURL) + "/hqdefault.jpg";

  vgsPlayer.src({
    "src": vidURL,
    "type": type,
  });
  if (poster)
    vgsPlayer.poster(poster);
  else
  	vgsPlayer.poster("//i.imgur.com/aE0LoTe.png");

  // play seem to trigger to fast before Youtube is ready
  
  //vgsPlayer.pause();
	vgsPlayer.load();
  vgsPlayer.play();
/*   setTimeout(function() {
    vgsPlayer.play();
  }, 500); */
  
  return false;

}


function ytVidId(url) {
  //var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
  //var p = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var p = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

  if (url.match(p) || getId(url).length == 11)
    return false;
}

/**/
function getId(url) {
  //var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return false;
  }
}

var rtmp_suffix = /^rtmp:\/\//;
var hls_suffix = /\.m3u8/;
var mp4_suffix = /\.(mp4|m4p|m4v|mov)/i;
var hds_suffix = /\.f4m/;
var dash_suffix = /\.mpd/;
var flv_suffix = /\.flv/;
var webm_suffix = /\.webm/;
/* AUDIO */
//var mp3_suffix = /\.mp3/;
var mpeg_suffix = /\.(mp3|m4a)/i;
var ogg_suffix = /\.ogg/;

//var youtube_suffix = /\.youtube.com/;
//var yt_suffix = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
var yt_suffix = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
var dm_suffix = /\.?dailymotion.com/;
var vm_suffix = /\.?vimeo.com/;
/* ADVANCED REGEX */
//      var regVimeo = /^.*(vimeo.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
//      var regDailymotion = /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
//      var regMetacafe = /^.*(metacafe.com)(\/watch\/)(d+)(.*)/i;
//      var youtube_suffix = /(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

function getType(url) {

  /* AUDIO */
  if (mpeg_suffix.test(url))
    return 'audio/mpeg';
  if (ogg_suffix.test(url))
    return 'audio/ogg';
  if (dash_suffix.test(url))
    return 'application/dash+xml';
  if (rtmp_suffix.test(url))
    return 'rtmp/mp4';
  if (hls_suffix.test(url))
    return 'application/x-mpegurl';
  if (mp4_suffix.test(url))
    return 'video/mp4';
  if (hds_suffix.test(url))
    return 'application/adobe-f4m';
  if (flv_suffix.test(url))
    return 'video/flv';
  if (webm_suffix.test(url))
    return 'video/webm';
  if (yt_suffix.test(url)) {
    //alert(url.match(yt_suffix)[2]);
    //player.poster(ytmaxres(url.match(yt_suffix)[2]));
    //alert(ytmaxres(url.match(yt_suffix)[2]));
    return 'video/youtube';
  }
  if (dm_suffix.test(url))
    return 'video/dailymotion';
  if (vm_suffix.test(url))
    return 'video/vimeo';

  console.log('could not find link type: "' + url + '" assuming mp4');
  return 'video/mp4';
};

function getExt(ext) {

  //if (ext == "youtube") ext = "mp4";
  if (ext == "mp4" || ext == "m4v") ext = "m4v";
  if (ext == "ogg" || ext == "ogv") ext = "oga";
  if (ext == "webm") ext = "webmv";

  return ext;
}