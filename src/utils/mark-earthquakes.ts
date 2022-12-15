import { MutableRefObject } from 'react';
import { mapglService } from './mapgl-service';
import { Clusterer, ClustererPointerEvent, InputMarker } from '@2gis/mapgl-clusterer';
import { earthquakesService } from './earthquakes-service';
import earthquakeIcon from '../assets/earthquake.png';
import { clusterStyle } from './cluster-style';

const handleShowTooltip = (event: ClustererPointerEvent, tooltipRef: MutableRefObject<HTMLDivElement>) => {
  if (event.target.type === 'marker') {
    const offset = 5;

    tooltipRef.current.style.top = `${ event.point[1] + offset }px`;
    tooltipRef.current.style.left = `${ event.point[0] + offset }px`;
    tooltipRef.current.style.display = 'block';
    tooltipRef.current.textContent = event.target.data.userData;
  }
};

const handleCloseTooltip = (event: ClustererPointerEvent, tooltipRef: MutableRefObject<HTMLDivElement>) => {
  if (event.target.type === 'marker') {
    tooltipRef.current.style.display = 'none';
  }
};

export const markEarthquakes = async (map: mapgl.Map, tooltipRef: MutableRefObject<HTMLDivElement>) => {
  const geoJsonEarthquakes = await earthquakesService.getGeoJson();

  const markers: InputMarker[] = geoJsonEarthquakes.features.map((feature: any) => {
    const coords = feature.geometry.coordinates;

    const marker = {
      coordinates: [coords[0], coords[1]],
      userData: feature.properties.title,
      icon: earthquakeIcon,
      hoverIcon: earthquakeIcon,
      size: [28, 28],
      hoverSize: [34, 34],
    };
    return marker;
  });

  const clusterer = new Clusterer(map, {
    radius: 90,
    clusterStyle,
  });
  clusterer.load(markers);

  clusterer.on('mouseover', event => {
    handleShowTooltip(event, tooltipRef);
  });
  clusterer.on('mouseout', event => {
    handleCloseTooltip(event, tooltipRef);
  });
};
