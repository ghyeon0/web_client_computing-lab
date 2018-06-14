var geocoder;
var map;
var markers = Array();
var infos = Array();

function initialize() {
    // prepare Geocoder
    geocoder = new google.maps.Geocoder();

    // set initial position (New York)
    var myLatlng = new google.maps.LatLng(37.61005,126.99719);

    var myOptions = { // default map options
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);
}

// clear overlays function
function clearOverlays() {
    if (markers) {
        for (i in markers) {
            markers[i].setMap(null);
        }
        markers = [];
        infos = [];
    }
}

// clear infos function
function clearInfos() {
    if (infos) {
        for (i in infos) {
            if (infos[i].getMap()) {
                infos[i].close();
            }
        }
    }
}

// set coordinate function
function setCoord(table) {
    var address_lat = document.getElementById("gmap_coord_lat").value;
    var address_long = document.getElementById("gmap_coord_long").value;
    let min_x = 200;
    let min_y = 40;
    let max_x = 0;
    let max_y = 0;
    for(let i = 0;i < table.length;i++){
        if (table[i]['Y'] < min_y) min_y = table[i]['Y'];
        if (table[i]['X'] < min_x) min_x = table[i]['X'];
        if (table[i]['Y'] > max_y) max_y = table[i]['Y'];
        if (table[i]['X'] > max_x) max_x = table[i]['X'];
    }
    let diff = ((max_x - min_x > max_y - min_y) ? max_x - min_x : max_y - min_y);
    console.log(diff);
    let size;
    if (diff >= 0.2){
        size = 11;
    }
    else if (diff >= 0.1){
        size = 12;
    }
    else if (diff >= 0.5){
        size = 13;
    }
    else if (diff >= 0.2){
        size = 13;
    }
    else if (diff == 0){
        size = 17;
    }
    else if (diff >= 0.1){
        size = 13;
    }
    else if (diff >= 0.05){
        size = 13;
    }
    else if (diff >= 0.02){
        size = 14;
    }
    else if (diff >= 0.1){
        size = 15;
    }
    else if (diff >= 0.005){
        size = 16;
    }
    else if (diff >= 0.001){
        size = 17;
    }
    else if (diff >= 0.0005){
        size = 18;
    }
    else{
        size = 19;
    }
    var myOptions = { // default map options
        zoom: size,
        center: geolocate,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // script uses our 'geocoder' in order to find location by address name
//    geocoder.geocode( { 'address': address}, function(results, status) {
//        if (status == google.maps.GeocoderStatus.OK) { // and, if everything is ok

            // we will center map
            var geolocate = new google.maps.LatLng(address_lat, address_long);
            // console.log(parseFloat(address_lat)+0.01, parseFloat(address_long)+0.01);
            // var geolocate2 = new google.maps.LatLng(parseFloat(address_lat)+0.01, parseFloat(address_long)+0.01);

            map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);


      //      alert(addrLocation.lat());
            

            // store current coordinates into hidden variables
            document.getElementById('lat').value = address_lat;
            document.getElementById('lng').value = address_long;

            // and then - add new custom marker
            var addrMarker = new google.maps.Marker({
                position: geolocate,
                map: map,
                title: address_lat + ', ' + address_long,
                icon: 'marker.png'
            });
            
            var geolocate2 = new google.maps.LatLng((min_y + max_y) / 2, (min_x + max_x) / 2);
            map.setCenter(geolocate2);
            for(let i = 1;i < table.length;i++){
                var geolocate2 = new google.maps.LatLng(table[i]['Y'], table[i]['X']);
                var addrMarker = new google.maps.Marker({
                    position: geolocate2,
                    map: map,
                    title: table[i]['Y'] + ', ' + table[i]['X'],
                    icon: 'marker.png'
                });
            }
            // var addrMarker2 = new google.maps.Marker({
            //     position: geolocate2,
            //     map: map,
            //     title: (parseFloat(address_lat)+0.01) + ', ' + (parseFloat(address_long)+0.01),
            //     icon: 'marker.png'
            // });
        //    marker.setMap(map);
        //    marker2.setMap(map);
//        } else {
//            alert('Geocode was not successful for the following reason: ' + status);
//        }
//    });
}

// find address function
function findAddress() {
    var address = document.getElementById("gmap_where").value;

    // script uses our 'geocoder' in order to find location by address name
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) { // and, if everything is ok

            // we will center map
            var addrLocation = results[0].geometry.location;
      //      alert(addrLocation.lat());
            map.setCenter(addrLocation);

            // store current coordinates into hidden variables
            document.getElementById('lat').value = results[0].geometry.location.lat();
            document.getElementById('lng').value = results[0].geometry.location.lng();

            // and then - add new custom marker
            var addrMarker = new google.maps.Marker({
                position: addrLocation,
                map: map,
                title: results[0].formatted_address,
                icon: 'marker.png'
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// find custom places function
function findPlaces() {

    // prepare variables (filter)
    var type = document.getElementById('gmap_type').value;
//    type = 'restaurant';
    var radius = document.getElementById('gmap_radius').value;
    var keyword = document.getElementById('gmap_keyword').value;

    var lat = document.getElementById('lat').value;
    var lng = document.getElementById('lng').value;
//    alert(lat, lng);
    var cur_location = new google.maps.LatLng(lat, lng);

    // prepare request to Places
    var request = {
        location: cur_location,
        radius: radius,
        types: [type]
    };
    if (keyword) {
        request.keyword = [keyword];
    }

    // send request
    service = new google.maps.places.PlacesService(map);
    service.search(request, createMarkers);
}

// create markers (from 'findPlaces' function)
function createMarkers(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        // if we have found something - clear map (overlays)
        clearOverlays();

        // and create new markers by search result
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert('Sorry, nothing is found');
    }
}

// creare single marker function
function createMarker(obj) {

    // prepare new Marker object
    var mark = new google.maps.Marker({
        position: obj.geometry.location,
        map: map,
        title: obj.name
    });
    markers.push(mark);

    // prepare info window
    var infowindow = new google.maps.InfoWindow({
        content: '<img src="' + obj.icon + '" /><font style="color:#000;">' + obj.name +
        '<br />Rating: ' + obj.rating + '<br />Vicinity: ' + obj.vicinity + '</font>'
    });

    // add event handler to current marker
    google.maps.event.addListener(mark, 'click', function() {
        clearInfos();
        infowindow.open(map,mark);
    });
    infos.push(infowindow);
}

// initialization
google.maps.event.addDomListener(window, 'load', initialize);
