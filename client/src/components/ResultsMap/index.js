import React from 'react';
import { GoogleMap, useLoadScript} from '@react-google-maps/api';
// import { geoCode } from '../../utils/API';

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 43.653225,
    lng: -79.383186
};

const options = {
    disableDefaultUI: true,
    zoomControl: true
}

const ResultsMap = props => {
    


    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
    })

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps"

    return(
        <div style={{height: '100%'}}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle} 
                zoom={8}
                center={center}
                options={options}   
            >
            </GoogleMap>
        </div>
    )
}

export default ResultsMap;