mapboxgl.accessToken = mapToken ;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: campground.geometry.coordinates,
    zoom: 4, 
   
});


new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({offset:25})
    .setHTML(
        `<h3>${campground.city} </h3>`
    )
)
.addTo(map)
const nav = new mapboxgl.NavigationControl({
    visualizePitch: true
});

map.addControl(nav, 'top-right');