import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import styles from './MapChart.css';
import L from 'leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class MapChart extends React.Component {
  state = {
    zoom: 11
  }
  render() {
    const center = this.props.data["center"];
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}><span className={styles.category}>LOCATION</span>Incidents per location</div>
        <Map center={center} zoom={this.state.zoom}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
            {this.props.data["data"]
              .map((elt, index) => {
                if (elt["latitude"] !== null && elt["longitude"] !== null) {
                  return (
                    <Marker key={index + elt["name"]} position={[elt["latitude"], elt["longitude"]]}>
                      <Popup>
                        {elt["date"]}<br /> {elt["name"]}
                      </Popup>
                    </Marker>
                  )
                }
              })
            }
        </Map>
      </div>
    )
  }
}

export default MapChart;