import React, { useContext, useEffect } from 'react';
import { mapglService } from '../../utils/mapgl-service';
import { MapWrapper } from '../MapWrapper';
import { MapContext } from '../MapProvider';

const API_KEY = import.meta.env.VITE_API_KEY;

export const MapGL: React.FC = () => {
  const [mapInstance, setMapInstance] = useContext(MapContext);

  useEffect(() => {
    const loadMap = async () => {
      const mapglApi = await mapglService.getAPI();

      const map = new mapglApi.Map('map', {
        key: API_KEY,
        center: [58, 20],
        zoom: 4,
      });

      setMapInstance(map);
    };

    loadMap();
    return () => mapInstance && mapInstance.destroy();
  }, []);


  return (
    <MapWrapper/>
  );
};
