import React, { MutableRefObject, useContext, useEffect, useRef } from 'react';
import { MapGL } from '../MapGL';
import { MapContext } from '../MapProvider';
import { Tooltip } from '../Tooltip';
import { markEarthquakes } from '../../utils/mark-earthquakes';


export const App: React.FC = () => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [mapInstance, setMapInstance] = useContext(MapContext);

  useEffect(() => {
    if (mapInstance && tooltipRef.current !== null) {
      markEarthquakes(mapInstance, tooltipRef as MutableRefObject<HTMLDivElement>);
    }
  }, [mapInstance, tooltipRef]);

  return (
    <>
      <Tooltip ref={ tooltipRef }/>
      <MapGL/>
    </>
  );
};
