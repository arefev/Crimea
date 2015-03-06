// MAP

ymaps.ready(init);

function init(){    
	var myMap = new ymaps.Map ("map", {
		center: [45.262971, 34.106508],
		zoom: 9
	}, {
		minZoom: 9, 
		restrictMapArea:[[46.370230,30.952059], [43.411368,36.983553]]
	});
	
	myMap.controls.remove('zoomControl');
	
	var data = {
		home: {
			image: "images/icon-map-home.png",
			points: {
				"0001": [44.999673,33.827730],
				"0002": [45.333860,33.761812],
			}
		},
		rub: {
			image: "images/icon-map-home.png",
			points: {
				"0003": [45.331922,34.731356],
				"0004": [45.011364,34.827486],
			}
		}
	}
	
	for (sectionCode in data) {
		var collection = new ymaps.GeoObjectCollection({}, {
			iconLayout: 'default#image',
			iconImageHref: data[sectionCode]["image"],
			iconImageSize: [42, 55],
			iconImageOffset: [-21, -55],
        });
		
		var points = data[sectionCode]["points"];
		for (point in points) {
			var myPlaceMark = new ymaps.Placemark(points[point], {}, {
				ID: point
			});
			collection.add(myPlaceMark);
		}
		
		myMap.geoObjects.add(collection);
		collection.events.add('click', function (e) { 
			console.log(e.get("target").options.get("ID")); 
		});
		
	}
	
	
	$(".b-sections__item .b-small-icon").click(function(){
		myMap.geoObjects.removeAll();
	});
}