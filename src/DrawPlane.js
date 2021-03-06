import './App.css'
import React, { useRef, useState, useEffect } from 'react'
import L from 'leaflet'
import { Map, FeatureGroup, TileLayer } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import Popup from 'reactjs-popup';
import './DrawPlane.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'reactjs-popup/dist/index.css';


delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
        });


const DrawPlane = () => {
    const mapRef = useRef();
    var drawnItems = new L.FeatureGroup();
    var exportData = <></>;
    const [textarea, setTextarea] = useState();

    useEffect(() => {

        const { current = {} } = mapRef;
        const { leafletElement: map } = current;
    
        if ( !map ) return;

        let impdata = JSON.parse(localStorage.getItem('importData'));
        let data = new L.GeoJSON(impdata);
        localStorage.removeItem('importData');

        data.addTo(drawnItems);
        actualizarExport();
        map.addLayer(drawnItems);

      }, [mapRef]);

    const _created = (e) => {
        e.layer.addTo(drawnItems);
        actualizarExport();

    }
    const _edited = (e) => console.log(e);
    const _deleted = (e) => {
        drawnItems = drawnItems.removeLayer(e.layer);
        actualizarExport();
    }

    function actualizarExport(){
        exportData = <pre>{JSON.stringify(drawnItems.toGeoJSON(), null, 2)}</pre>;
    }

    const position = [40.42532588715934, -3.691904777609234];

    function importMarkers (e) {
        localStorage.setItem('importData',textarea);
    }

    const contentStyle = {
        maxWidth: '600px',
        width: '90%',
        maxHeight: '500px',
        overflow: 'scroll'
      };

    
    const handleTextarea = (event) => {
        setTextarea(event.target.value);
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
                        <div className="header"> Importaci??n de datos GeoJSON </div>
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
