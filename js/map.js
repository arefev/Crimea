// MAP
var mapPersonalStyle = [
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b3b1a3"
            },
            {
                "weight": 2
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f0faff"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#cccfc0"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": -13
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c2e7ff"
            },
            {
                "lightness": 34
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "color": "#cccfc0"
            },
            {
                "lightness": 44
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];		

var data = {
	home: {
		image: "images/icon-map-home.png",
		points: {
			"0001": {
				text: "Текст маркера 0001",
				coords: [44.999673,33.827730]
			},
			"0002": {
				text: "Текст маркера 0002",
				coords: [45.333860,33.761812]
			}
		}
	},
	rub: {
		image: "images/icon-map-rub.png",
		points: {
			"0003": {
				text: "Текст маркера 0003",
				coords: [45.331922,34.731356]
			},
			"0004": {
				text: "Текст маркера 0004",
				coords: [45.011364,34.827486]
			}
		}
	},
	handcuffs: {
		image: "images/icon-map-handcuffs.png",
		points: {
			"0005": {
				text: "Текст маркера 0005",
				coords: [44.604135, 33.853998]
			},
			"0006": {
				text: "Текст маркера 0006",
				coords: [44.756464, 34.238519]
			}
		}
	}
};

var map, markers = [];

$(function(){
	// This is the minimum zoom level that we'll allow
	var minZoomLevel = 9;

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: minZoomLevel,
		minZoom: minZoomLevel,
		zoomControl: false,
		panControl: false,
		center: new google.maps.LatLng(45.272932, 34.510431),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: mapPersonalStyle
	});
	
	// Bounds for North America
	var strictBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(43.517799, 30.319287),
		new google.maps.LatLng(46.038901, 36.537408)
	);

	// Listen for the dragend event
	google.maps.event.addListener(map, 'dragend', function() {
		if (strictBounds.contains(map.getCenter())) return;

		// We're out of bounds - Move the map back within the bounds

		var c = map.getCenter(),
			x = c.lng(),
			y = c.lat(),
			maxX = strictBounds.getNorthEast().lng(),
			maxY = strictBounds.getNorthEast().lat(),
			minX = strictBounds.getSouthWest().lng(),
			minY = strictBounds.getSouthWest().lat();

		if (x < minX) x = minX;
		if (x > maxX) x = maxX;
		if (y < minY) y = minY;
		if (y > maxY) y = maxY;

		map.setCenter(new google.maps.LatLng(y, x));
	});
	
});

function showPoints(sectionCode) {
	clearMarkers();
	
	var image = data[sectionCode]["image"];
	
	for (point in data[sectionCode]["points"]) {
		var points = data[sectionCode]["points"][point]["coords"],
			text = data[sectionCode]["points"][point]["text"];
			
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(points[0], points[1]),
			map: map,
			icon: image,
			ID: point,
			markerText: text
		});
		
		markers.push(marker);
		
		setMarkerEvents(marker);
	}
}

function setMarkerEvents(marker) {
	google.maps.event.addListener(marker, 'click', function() {
		setArticleUrl(1);
		checkArticleUrl(false);
	});
	
	var infowindow = new InfoBox({
		content: marker.markerText,
		boxClass: "b-map__map-infobox",
		disableAutoPan: true,
		alignBottom: true,
		pixelOffset: new google.maps.Size(-15, -55),
	});
	
	google.maps.event.addListener(marker, 'mouseover', function() {
		infowindow.open(marker.get('map'), marker);
	});
	
	google.maps.event.addListener(marker, 'mouseout', function() {
		infowindow.close(marker.get('map'), marker);
	});
}

// Sets the map on all markers in the array.
function setAllMap(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

function clearMarkers() {
	setAllMap(null);
}