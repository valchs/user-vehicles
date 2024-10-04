import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import { User } from 'types/user';

interface MapProps {
  user: User | undefined;
}

const MapComponent: React.FC<MapProps> = ({ user }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [vectorLayer, setVectorLayer] =
    useState<VectorLayer<VectorSource> | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Create a vector source and layer for points
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      // Initialize the map
      const mapInstance = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(), // Base map layer
          }),
          vectorLayer,
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      setMap(mapInstance);
      setVectorLayer(vectorLayer);

      return () => mapInstance.setTarget(undefined); // Clean up on unmount
    }
  }, []);

  // Plot a specific point at given latitude and longitude
  const plotPoint = () => {
    console.log(user);
    if (!map || !vectorLayer) return;

    // Latitude and longitude for Los Angeles, CA
    const latitude = 34.0522;
    const longitude = -118.2437;

    // Transform from EPSG:4326 (lat/lon) to EPSG:3857 (map projection)
    const pointFeature = new Feature({
      geometry: new Point([longitude, latitude]).transform(
        'EPSG:4326',
        'EPSG:3857'
      ),
    });

    const latitude2 = 30.0522;
    const longitude2 = -110.2437;
    // Transform from EPSG:4326 (lat/lon) to EPSG:3857 (map projection)
    const pointFeature2 = new Feature({
      geometry: new Point([longitude2, latitude2]).transform(
        'EPSG:4326',
        'EPSG:3857'
      ),
    });

    // Style the point (optional)
    pointFeature.setStyle(
      new Style({
        image: new Icon({
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Custom marker icon
          scale: 0.05,
        }),
      })
    );
    pointFeature2.setStyle(
      new Style({
        image: new Icon({
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Custom marker icon
          scale: 0.05,
        }),
      })
    );

    // Add the point to the vector layer
    vectorLayer.getSource()?.addFeature(pointFeature);
    vectorLayer.getSource()?.addFeature(pointFeature2);

    // Center the map view to the new point
    // map
    //   .getView()
    //   .setCenter(pointFeature.getGeometry()?.getCoordinates() || [0, 0]);
    // map.getView().setZoom(10); // Adjust zoom level
  };

  return (
    <>
      <button onClick={plotPoint}>Plot Point at LA</button>
      <div
        ref={mapRef}
        style={{ width: '100%', height: '400px', marginTop: '20px' }}
      ></div>
    </>
  );
};

export default MapComponent;
