import './App.css'
import React from 'react'
import { MapContainer, TileLayer, useMap  } from "react-leaflet";
import L from 'leaflet'
import DrawPlane from './DrawPlane'
import {RemoveScrollBar} from 'react-remove-scroll-bar';

function App() {

    return (
        <div className="App">
            
            <DrawPlane />
        </div>
    )
}

export default App
