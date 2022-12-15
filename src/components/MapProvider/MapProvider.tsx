import React, { Dispatch } from 'react';
import { MapProviderProps } from './MapProvider.types';

type MapStateType = mapgl.Map | undefined;

export const MapContext = React.createContext<[MapStateType, Dispatch<mapgl.Map>]>([undefined, () => {}]);

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [mapInstance, setMapInstance] = React.useState<MapStateType>(undefined);

  return (
    <MapContext.Provider value={ [mapInstance, setMapInstance] }>
      { children }
    </MapContext.Provider>
  );
};
