function init() {

	mapboxgl.accessToken = 'pk.eyJ1IjoiYWp6ZWlnZXJ0IiwiYSI6IldLdVhKN1UifQ.43CCALwNLBzVybtPFvcaJQ';

	ar map = new mapboxgl.Map({
	    container: 'map', // container id
	    style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
	    center: [-74.50, 40], // starting position
	    zoom: 9 // starting zoom
	});

}

// When the DOM is ready initialise the map
document.addEventListener("DOMContentLoaded", init);
