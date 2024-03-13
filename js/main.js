//const { marker } = require("leaflet");

$(document).ready(function () {
    $('.toggleMenu').click(function () {
        $('.main-menu-wrap').toggleClass('active');
        $('body').toggleClass('menu_opened');


    });


});
$(window).on('load', function () {
    $('.preloader').removeClass('active');


});

function initMap() {
    const markersData = $('#map').data("markers");


    const coords = new google.maps.LatLng(48.35503005362635, 24.404158258106886);
    var mapOptions = {
        zoom: 15,
        center: coords,
        mapTypeId: google.maps.MapTypeId.SATELITTE,
        styles: [
            {
              "featureType": "poi.business",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]

    };

    const mapDiv = document.getElementById('map');
    const map = new google.maps.Map(mapDiv, mapOptions);

    
    const markers = markersData.map((item, i) => {

        const contentInfoWindow = `<div class="info-window" >
                                        <div class="info-title"><p>${item.title}</p></div>
                                       <div class="info-text"><p>${item.text}</p></div>
                              </div>`;

      const  infoWindow = new google.maps.InfoWindow({
            content: contentInfoWindow,
            padding: 0,
        });


        const marker = new google.maps.Marker({
            map: map,
            title: item.title,
            position: item.coord,
            icon: {
                url: item.icon,
                scaledSize: new google.maps.Size(60, 100),
            },
        })


        marker.addListener("click", function () {
            if(!marker.open){
                marker.open = true;
             infoWindow.open({
                 anchor: marker,
                 map: map,
             });

            }else{
                marker.open = false;
                infoWindow.close();
            }


        })


        google.maps.event.addListener(infoWindow, 'domready', function () {

            const l = $('.info-window').parent().parent().parent()
            const s = l.siblings();
            const btn = l.children().eq(1);
            l.addClass("info-wrap");
            btn.addClass("btn-close");
            console.log(l.parent())
           
            s.addClass("info-window-tale");
            s.append("<div class='dark-tale'></div>")

        })
      

    })



    window.initMap = initMap;
}
