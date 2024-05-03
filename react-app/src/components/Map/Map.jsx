import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {Icon } from 'leaflet'
import './Map.css'
import "leaflet/dist/leaflet.css"

function Map(){

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        // iconUrl: require("./icons/placeholder.png"),
        iconSize: [38, 38] // size of the icon
      });
      
    const marker = {
        geocode: [43.55092680780213, 16.415082149942467],
        popUp: "Tu smo"
    }
    return(
        <MapContainer center={[43.55092680780213, 16.415082149942467]} zoom={13}>
            {/* <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            <TileLayer
            attribution="Google Maps"
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
            // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
            // url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
            maxZoom={20}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />

            <Marker position={marker.geocode} icon={customIcon}>
                <Popup>
                    <h2>{marker.popUp}</h2>
                </Popup>
            </Marker>

        </MapContainer>
    )
}

export default Map