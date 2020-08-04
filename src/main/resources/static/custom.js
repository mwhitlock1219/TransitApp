var map, infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: parseFloat(busLocations[0].LATITUDE), lng: parseFloat(busLocations[0].LONGITUDE) },
        zoom: 15,
        scrollwheel: false
    });

    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'

    for (i = 0; i < busLocations.length; i++) {
        var marker = new google.maps.Marker({
            position: { lat: parseFloat(busLocations[i].LATITUDE), lng: parseFloat(busLocations[i].LONGITUDE) },
            map: map,
            icon: iconBase + 'bus.png',
            // add zoom capability by clicking on bus icon
            title: "Click to zoom"
        });
        map.addListener("center_changed", () => {
            // 5 seconds after the center of the map has changed, pan back to the
            // marker.
            // window.setTimeout(() => {
            //     map.panTo(marker.getPosition());
            // }, 5000);
        });
        marker.addListener("click", () => {
            map.setZoom(13);
            map.setCenter(marker.getPosition());
        });
    }
    // end zoom capabilities by clicking on bus icon
    // add transit lines to map
    const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);

    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
