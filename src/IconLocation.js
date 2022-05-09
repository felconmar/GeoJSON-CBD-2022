import L from 'leaflet';

const iconLocation = new L.Icon({
    iconUrl: require('./resources/marker.png'),
    iconRetinaUrl: require('./resources/marker.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 60),
});

export { iconLocation };
