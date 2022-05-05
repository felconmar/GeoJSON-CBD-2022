import './App.css'
import React from 'react'
import { MapContainer, TileLayer, useMap  } from "react-leaflet";
import L from 'leaflet'

function App() {
    const bounds = [
        [0, 0],
        [5400, 7200],
    ]
    const style = { height: '80vh', width: '75vw' }

    return (
        <div className="App">
            <MapContainer
                minZoom={-4}
                bounds={bounds}
                style={style}
            >
                <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
            </MapContainer>
        </div>
    )
}

export default App
