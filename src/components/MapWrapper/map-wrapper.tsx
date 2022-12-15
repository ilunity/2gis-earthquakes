import React from 'react';

export const MapWrapper = React.memo(
  () => {
    return <div id="map"></div>;
  },
  () => true,
);
