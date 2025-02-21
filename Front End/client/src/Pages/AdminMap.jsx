import {useLoadScript} from '@react-google-maps/api'



import React from 'react'
import Map from '../Components/Map';

function AdminMap() {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: import.meta.env.REACT_APP_API_URL,
      libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading ...</div>
  return (
    <div>
      <Map />
    </div>
  )
}

export default AdminMap
