import './App.css'
import React, { useRef, useState, useEffect, Text } from 'react'

import L from 'leaflet'
import { Map, ImageOverlay, FeatureGroup, TileLayer, useMap } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'

import { Marker } from 'react-leaflet';
import {  iconLocation  } from './IconLocation';
import { FaAccessibleIcon } from "react-icons/fa";
import Popup from 'reactjs-popup';
import 'leaflet-easybutton'
import 'react-icons/fa'

import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

import 'reactjs-popup/dist/index.css';


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
    useEffect(() => {

        const { current = {} } = mapRef;
        const { leafletElement: map } = current;

        if ( !map ) return;

      }, [mapRef]);

    let cont = 1;
    var myGeoJSON = {};
    myGeoJSON.type = "FeatureCollection";
    
    
    const _created = (e) => {
        myGeoJSON.features = [];   
        cont = cont + 1; 
    }
    const _edited = (e) => console.log(e)
    const _deleted = (e) => {
        myGeoJSON = {};
        myGeoJSON.type = "FeatureCollection";
    }

    const position = [40.42532588715934, -3.691904777609234]


    function importMarkers () {
        
    }

    const contentStyle = {
        maxWidth: '600px',
        width: '90%',
      };

    const exportData = <>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
    nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
    quibusdam voluptates delectus doloremque, explicabo tempore dicta
    adipisci fugit amet dignissimos?
    <br />
    L</>;

    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <div className="col">
                    <button onClick={importMarkers}><FaAccessibleIcon/>Importar</button>
                    <button>Exportar</button>
                    <Popup
    trigger={
      <button type="button" className="button">
        Open Modal
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
        <div className="header"> Modal Title </div>
        <div className="content">
          {exportData}
        </div>
        <div className="actions">
                            
                            <button
                                type="button"
                                className="button"
                                onClick={() => {
                                console.log('modal closed ');
                                close();
                                }}
                            >
                                close modal
                            </button>
                            </div>
                        </div>
                        )}
                    </Popup>
                    <Map center={position} zoom={15}>
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
