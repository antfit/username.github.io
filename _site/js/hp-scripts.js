$(document).ready(function() {
  /*
    var winHeight = $(window).height();

    enquire.register("screen and (min-width: 1024px)", {
        match: function () {
            $('body').addClass('reveal');

            //Based on the Scroller function from @sallar
            var $content = $('header .feature')
              , $blur    = $('.fixed-background')
              , wHeight  = $(window).height();

            $(window).on('resize', function(){
              wHeight = $(window).height();
            });

            window.requestAnimFrame = (function()
            {
              return  window.requestAnimationFrame       ||
                      window.webkitRequestAnimationFrame ||
                      window.mozRequestAnimationFrame    ||
                      function( callback ){
                        window.setTimeout(callback, 1000 / 60);
                      };
            })();

            function Scroller()
            {
              this.latestKnownScrollY = 0;
              this.ticking            = false;
            }

            Scroller.prototype = {
             
              init: function() {
                window.addEventListener('scroll', this.onScroll.bind(this), false);
                $blur.css('background-image',$('header:first-of-type').css('background-image'));
              },


              onScroll: function() {
                this.latestKnownScrollY = window.scrollY;
                this.requestTick();
              },

              
              requestTick: function() {
                if( !this.ticking ) {
                  window.requestAnimFrame(this.update.bind(this));
                }
                this.ticking = true;
              },

              update: function() {
                var currentScrollY = this.latestKnownScrollY;
                this.ticking       = false;                    
                
                var slowScroll = currentScrollY / 2
                  , blurScroll = currentScrollY * 2
                  , opaScroll = 1.4 - currentScrollY / 400;
                
                $content.css({
                  'transform'         : 'translateY(' + -Math.abs(slowScroll) + 'px)',
                  '-moz-transform'    : 'translateY(' + -Math.abs(slowScroll) + 'px)',
                  '-webkit-transform' : 'translateY(' + -Math.abs(slowScroll) + 'px)',
                  'opacity' : opaScroll
                });
                
                $blur.css({
                  'opacity' : blurScroll / wHeight
                });
              }
            };

            var scroller = new Scroller();  
            scroller.init();
        },
        unmatch: function () {
        }
    });

    */

    var obj = 'map-canvas-contact';
    var lat = $('#'+obj).attr("data-lat");
    var lng = $('#'+obj).attr("data-lng");
    var contentString = $('#'+obj).attr("data-string");
    var myLatlng = new google.maps.LatLng(lat,lng);
    var map, marker, infowindow;
    var image = 'imgs/marker.png';
    var zoomLevel = parseInt($('#'+obj).attr("data-zoom") ,12);
    var styles = [{"featureType":"landscape","stylers":[{"saturation":" "},{"lightness":" "},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":" "},{"lightness":" "},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":" "},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":" "},{"lightness":" "},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":" "},{"lightness":" "},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":" "},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":" "},{"saturation":" "}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":" "},{"saturation":" "}]}]
    var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"}); 
    var mapOptions = {
      zoom: zoomLevel,
      disableDefaultUI: true,
      center: myLatlng,
          scrollwheel: false,
      mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      },
      zoomControls: true
    }
    
    map = new google.maps.Map(document.getElementById(obj), mapOptions);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    infowindow = new google.maps.InfoWindow({
      content: contentString
    });      
      
      marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      icon: image
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
})