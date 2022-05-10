import './App.css'
import React, { useRef, useState, useEffect } from 'react'

import L from 'leaflet'
import { Map, FeatureGroup, TileLayer } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

import { Marker } from 'react-leaflet';
import {  iconLocation  } from './IconLocation';
import { FaAccessibleIcon } from "react-icons/fa";
import Popup from 'reactjs-popup';
import Cookies from 'universal-cookie'
import './DrawPlane.css'
import 'leaflet-easybutton'
import 'react-icons/fa'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'reactjs-popup/dist/index.css';

const cookies = new Cookies();

delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
        });


/*
function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    const map = useMap();


    
    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);


    return position === null ? null : (
      <Marker position={position} icon={iconLocation}>
      </Marker>
    );
  }
*/

const DrawPlane = () => {
    const bounds = [
        [0, 0],
        [5400, 7200],
    ]
    const style = { height: '80vh', width: '75vw' }
    const mapRef = useRef()
    var drawnItems = new L.FeatureGroup();
    var exportData = <></>;
    const [textarea, setTextarea] = useState();
    
    useEffect(() => {

        const { current = {} } = mapRef;
        const { leafletElement: map } = current;
    
        if ( !map ) return;

        let impdata = cookies.get('importData');
        let data = new L.GeoJSON(impdata)
        cookies.remove('importData')

        data.addTo(drawnItems);
        actualizarExport();
        map.addLayer(drawnItems);

      }, [mapRef]);

    const _created = (e) => {
        e.layer.addTo(drawnItems);
        actualizarExport();

    }
    const _edited = (e) => console.log(e)
    const _deleted = (e) => {
        drawnItems = drawnItems.removeLayer(e.layer);
        actualizarExport();
    }

    function actualizarExport(){
        exportData = <pre>{JSON.stringify(drawnItems.toGeoJSON(), null, 2)}</pre>;
    }

    const position = [40.42532588715934, -3.691904777609234]

    const importData = {
        "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
      };

    function importMarkers (e) {
        cookies.set('importData',textarea)
    }

    const contentStyle = {
        maxWidth: '600px',
        width: '90%',
        maxHeight: '500px',
        overflow: 'scroll'
      };

    
    const handleTextarea = (event) => {
        setTextarea(event.target.value)
    }

    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <div className="col">
                    <div className='button-box'>
                    <Popup
                        trigger={
                        <button type="button" className="button">
                            Exportar
                        </button>
                        }
                        modal
                        lockScroll={true}
                        contentStyle={contentStyle}
                        nested
                    >
                    {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                        &times;
                        </button>
                        <div className="header">
                            GeoJSON exportado!! Puedes copiar siguiente contenido y enviarlo a quien desees
                        </div>
                        <div>
                            {exportData}
                            </div>
                        </div>)}
                    </Popup>

                <Popup
                    trigger={
                    <button type="button" className="button">
                        Importar
                    </button>
                    }
                    modal
                    lockScroll={false}
                    contentStyle={contentStyle}
                    nested
                >
                    {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                        &times;
                        </button>
                        <div className="header"> Importación de datos GeoJSON </div>
                        <div className="content">
                        <form className="PopUp-form" onSubmit={importMarkers}>
                            <textarea className="PopUp-textarea" value={textarea} onChange={handleTextarea} />
                            <button className="PopUp-button" type='submit'>Cargar</button>
                        </form>
                        </div>
                        </div>)}
                    </Popup>

                    </div>


                    <Map center={position} zoom={15} ref={mapRef}> 
                            <FeatureGroup>
                                <EditControl
                                    position="topright"
                                    onCreated={_created}
                                    onEdited={_edited}
                                    onDeleted={_deleted}
                                    draw={{
                                        rectangle: false,
                                        circle: false,
                                        circlemarker: false,
                                        edit: false
                                    }}
                                    edit= {{
                                        edit: false,
                                        remove: false
                                    }}
                                />
                            </FeatureGroup>
                            <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                        </Map>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DrawPlane
