import { MutableRefObject } from 'react';
import { Clusterer, ClustererPointerEvent, InputMarker } from '@2gis/mapgl-clusterer';
import { earthquakesService } from './earthquakes-service';
import earthquakeIcon from '../assets/earthquake.png';
import { clusterStyle } from './cluster-style';

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

  const cluster = new Clusterer(map, {
    radius: 90,
    clusterStyle,
  });
  cluster.load(markers);

  addListenersOnMarkers({ map, cluster, tooltipRef });
};

interface IAddListenersOnMarkers {
  map: mapgl.Map,
  cluster: Clusterer,
  tooltipRef: MutableRefObject<HTMLDivElement>
}

const addListenersOnMarkers = ({ map, tooltipRef, cluster }: IAddListenersOnMarkers) => {
  cluster.on('mouseover', event => {
    handleShowTooltip(event, tooltipRef);
  });
  cluster.on('click', event => {
    handleShowTooltip(event, tooltipRef);
  });

  cluster.on('mouseout', event => {
    if (event.target.type === 'marker') {
      tooltipRef.current.style.display = 'none';
    }
  });
  map.on('movestart', () => {
    tooltipRef.current.style.display = 'none';
  });
};

const handleShowTooltip = (event: ClustererPointerEvent, tooltipRef: MutableRefObject<HTMLDivElement>) => {
  if (event.target.type === 'marker') {
    const offset = 5;

    tooltipRef.current.style.top = `${ event.point[1] + offset }px`;
    tooltipRef.current.style.left = `${ event.point[0] + offset }px`;
    tooltipRef.current.style.display = 'block';
    tooltipRef.current.textContent = event.target.data.userData;
  }
};
