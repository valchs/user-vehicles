import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import { User } from 'types/user';
import useGetVehicleLocations from 'features/vehicles/hooks/useGetVehicleLocations';
import useGetAddress from 'features/vehicles/hooks/useGetAddress';
import { Select } from 'ol/interaction';
import { click } from 'ol/events/condition';
import Overlay from 'ol/Overlay';
import { VehicleLocation } from 'types/vehicleLocation';
import { resetVehicleAddresses } from 'features/vehicles/slice';
import { useDispatch } from 'react-redux';
import { Address } from 'types/address';

interface MapProps {
  user: User | undefined;
}

const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '10px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
  backgroundColor: '#fff',
  height: '500px',
};

const mapStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  border: '1px solid #ddd',
  borderRadius: '10px',
  overflow: 'hidden',
};

const MAX_CACHE_TIME = 3000; // Vehicle location data should be cached for 30 seconds

const MapComponent: React.FC<MapProps> = ({ user }) => {
  const dispatch = useDispatch();
  const addressRef = useRef<string | null>(null);
  const vehicleAddressesRef = useRef<Address[]>([]);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [vectorLayer, setVectorLayer] =
    useState<VectorLayer<VectorSource> | null>(null);
  const [selectInteraction, setSelectInteraction] = useState<Select | null>(
    null
  );
  const {
    getVehicleLocations,
    setSelectedVehicleId,
    vehicleLocations,
    selectedVehicleId,
    lastFetched,
  } = useGetVehicleLocations();
  const { getAddress, vehicleAddresses } = useGetAddress();

  useEffect(() => {
    vehicleAddressesRef.current = vehicleAddresses;
  }, [vehicleAddresses]);

  useEffect(() => {
    console.log(vehicleLocations);
    const fetchAddresses = async () => {
      if (vehicleLocations.length > 0) {
        await Promise.all(
          vehicleLocations.map(async vehicleLocation => {
            const existingAddress = vehicleAddresses.find(
              address => address.vehicleId === vehicleLocation.vehicleid
            );
            if (!existingAddress) {
              await getAddress(vehicleLocation);
            }
          })
        );
      }
    };
    fetchAddresses();
  }, [vehicleLocations, vehicleAddresses, getAddress]);

  useEffect(() => {
    if (selectedVehicleId !== 0) {
      handleVehicleSelected(selectedVehicleId);
    }
    setSelectedVehicleId(0);
  }, [selectedVehicleId]);

  useEffect(() => {
    if (user) {
      const fetchVehicleLocations = async () => {
        try {
          const shouldFetchData =
            !lastFetched ||
            Date.now() - lastFetched > MAX_CACHE_TIME ||
            !vehicleLocations.some(vl => vl.userid === user.userid);
          if (shouldFetchData) {
            await getVehicleLocations(user.userid);
          }
        } catch (error) {
          console.error('Error fetching vehicle locations:', error);
        }
      };
      fetchVehicleLocations();

      const interval = setInterval(() => {
        console.log('Refreshing vehicle locations...');
        dispatch(resetVehicleAddresses());
        fetchVehicleLocations();
      }, 60000);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(vehicleLocations) && vehicleLocations.length > 0) {
      if (vectorLayer) {
        vectorLayer.getSource()?.clear();
        vehicleLocations
          .filter(x => x.userid === user?.userid)
          .forEach(vl => plotPoint(vl));
      }
    }
  }, [vehicleLocations, vectorLayer]);

  useEffect(() => {
    if (mapRef.current) {
      // Create a vector source and layer for points
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      // Create an overlay for the tooltip
      const tooltipElement = document.createElement('div');
      tooltipElement.className = 'tooltip';
      tooltipElement.style.cssText = `
        position: absolute; 
        background: white; 
        border: 1px solid black; 
        padding: 5px; 
        border-radius: 3px;  
        width: 200px; 
        height: auto;`;
      tooltipRef.current = tooltipElement;

      const tooltipOverlay = new Overlay({
        element: tooltipElement,
        id: 'tooltip',
        positioning: 'bottom-center',
        offset: [0, -15],
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
        overlays: [tooltipOverlay],
      });

      // Set up the click interaction on the vector layer
      const selectInteraction = new Select({
        condition: click,
        layers: [vectorLayer],
      });

      mapInstance.addInteraction(selectInteraction);

      selectInteraction.on('select', async event => {
        await highlightAndShowTooltip(
          event.selected,
          mapInstance,
          tooltipElement,
          tooltipOverlay,
          true
        );
      });

      setMap(mapInstance);
      setVectorLayer(vectorLayer);
      setSelectInteraction(selectInteraction);

      return () => mapInstance.setTarget(undefined); // Clean up on unmount
    }
  }, []);

  const plotPoint = (vehicleLocation: VehicleLocation) => {
    if (!map || !vectorLayer) return;

    // Transform from EPSG:4326 (lat/lon) to EPSG:3857 (map projection)
    const pointFeature = new Feature({
      geometry: new Point([vehicleLocation.lon, vehicleLocation.lat]).transform(
        'EPSG:4326',
        'EPSG:3857'
      ),
    });
    pointFeature.set('vehicleId', vehicleLocation.vehicleid);
    pointFeature.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: user?.vehicles.find(
              x => x.vehicleid === vehicleLocation.vehicleid
            )?.color,
          }),
          stroke: new Stroke({
            color: 'black',
            width: 2,
          }),
        }),
      })
    );

    // Add the point to the vector layer
    vectorLayer.getSource()?.addFeature(pointFeature);

    map
      .getView()
      .setCenter(pointFeature.getGeometry()?.getCoordinates() || [0, 0]);
    map.getView().setZoom(12);
  };

  const handleVehicleSelected = async (vehicleId: number) => {
    if (!vectorLayer || !map || !selectInteraction) return;

    // Find the feature corresponding to the clicked vehicleId
    const feature = vectorLayer
      .getSource()
      ?.getFeatures()
      .find(f => f.get('vehicleId') === vehicleId);

    if (feature) {
      // Clear previous selection
      selectInteraction.getFeatures().clear();

      // Add the clicked feature to the selection
      selectInteraction.getFeatures().push(feature);

      // Highlight the feature and show the tooltip
      await highlightAndShowTooltip(
        [feature],
        map,
        tooltipRef.current,
        map.getOverlayById('tooltip') as Overlay,
        false
      );
    }
  };

  const highlightAndShowTooltip = async (
    features: Feature[],
    mapInstance: Map,
    tooltipElement: HTMLDivElement | null,
    tooltipOverlay: Overlay,
    selectedOnMap: boolean
  ) => {
    for (const feature of features) {
      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 9,
            fill: new Fill({ color: 'black' }),
            stroke: new Stroke({
              color: 'black',
              width: 2,
            }),
          }),
        })
      );

      const geometry = feature.getGeometry();
      if (geometry && geometry instanceof Point) {
        const coordinates = geometry.getCoordinates();

        if (!selectedOnMap) {
          mapInstance?.getView().setCenter(coordinates || [0, 0]);
          mapInstance?.getView().setZoom(13);
        }

        const vehicleId = feature.get('vehicleId');
        const selectedVehicle = user?.vehicles.find(
          x => x.vehicleid === vehicleId
        );
        const selectedAddress = vehicleAddressesRef.current.find(
          x => x.vehicleId === vehicleId
        );
        addressRef.current = selectedAddress
          ? selectedAddress.display_name
          : 'Failed to load';
        tooltipElement!.innerHTML = `
          ${selectedVehicle?.make} ${selectedVehicle?.model}
          <br>${addressRef.current}<br>
          <img src="${selectedVehicle?.foto}" alt="Failed to load image" width="100%" height="auto">
          <br>`;
        tooltipOverlay.setPosition(coordinates);
      }
    }

    if (features.length === 0) {
      tooltipOverlay.setPosition(undefined);
    }
  };

  return (
    <div style={mapContainerStyle}>
      <div style={mapStyle} ref={mapRef}></div>
    </div>
  );
};

export default MapComponent;
