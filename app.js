function init() {

	mapboxgl.accessToken = 'pk.eyJ1IjoiYWp6ZWlnZXJ0IiwiYSI6IldLdVhKN1UifQ.43CCALwNLBzVybtPFvcaJQ';

	var map = new mapboxgl.Map({
	    container: 'map', // container id
	    style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
	    center: [-121, 44], // starting position
	    zoom: 6, // starting zoom
			hash: true
	});

	map.on('style.load', function () {
	    map.addSource('taxlots', {
	        type: 'vector',
	        url: 'mapbox://ajzeigert.2xzxvioz'
	    });
		map.addLayer({
	        "id": "taxlotsOutline",
	        "type": "line",
	        "source": "taxlots",
	        "source-layer": "taxlots_elev_aspect_sales",
	        "layout": {
	        },
	        "paint": {
				"line-color": "#fff",
				"line-width": 1
	        }
	    }, 'water');

		// Not using centerpoints...
	    // map.addLayer({
	    //     "id": "taxlots",
	    //     "type": "circle",
	    //     "source": "taxlots",
	    //     "source-layer": "taxlots_elev_aspect_sales",
	    //     "layout": {
	    //     },
	    //     "paint": {
		// 		"circle-radius": {
		// 			property: 'sale_p',
		// 			stops: [
		// 				[0, 0],
		// 				[100000, 1],
		// 				[2000000, 10],
		// 				[10000000, 0]
		// 			]
		// 		},
	    //         "circle-color": {
		// 			property: 'elev',
		// 			stops: [
		// 				[1100, "#d9b410"],
		// 				[1200, "#ff69b4"]
		// 			]
		// 		}
	    //     }
	    // });
	});

	function getDirection(d){
			if (d < 22.5 ) {
				return 'N';
			} else if ( d < 67.5 ) {
				return 'NE';
			} else if ( d < 112.5 ) {
				return 'E';
			} else if ( d < 157.5 ) {
				return 'SE';
			} else if ( d < 202.5 ) {
				return 'S';
			} else if ( d < 247.5 ) {
				return 'SW';
			} else if ( d < 292.5 ) {
				return 'W';
			} else if ( d < 337.5 ) {
				return 'NW';
			} else {
				return 'N';
			}
	}

	d3.csv("data/sales.csv", function(d) {
		// Incoming headers: OBJECTID,TAXLOT,elev,sale_p,sale_d,aspect

		// This is an accessor function to properly type the incoming columns
	  return {
			objectid: +d.OBJECTID,
			taxlot: d.TAXLOT,
			elevation: +d.elev,
			aspect: { degrees: +d.aspect, direction: getDirection(+d.aspect) },
			price: +d.sale_p,
			date: new Date(d.sale_d)
	  };
	}, function(error, rows) {
		// console.log(rows);
		var properties = crossfilter(rows);
		var price = properties.dimension(function(d) { return d.price; }),
			elevation = properties.dimension(function(d){ return d.elevation }),
			aspect = properties.dimension(function(d){ return d.aspect }),
			date = properties.dimension(function(d) { return d.date });

		var aspects = aspect.group(function(d) { d.direction })

		var elevations = elevation.group(function(d) { return Math.floor( d / 10 )})

		console.log(elevations.top(Infinity));
		d3.selectAll
		// var charts = [
		//
	  //   barChart()
	  //       .dimension(elevation)
	  //       .group(elevations)
	  //     .x(d3.scale.linear()
	  //       .domain([elevation.bottom(1)[0], elevation.top(1)[0]])
	  //       .rangeRound([0, 100]))
		// ];
	});

}

// When the DOM is ready initialise the map
document.addEventListener("DOMContentLoaded", init);
