const clusterIcon = 'https://docs.2gis.com/img/mapgl/clusterHover.svg';

export const clusterStyle = (pointsCount: number) => {
  if (pointsCount < 5) {
    return {
      icon: clusterIcon,
      hoverIcon: clusterIcon,
      size: [25, 25],
      hoverSize: [35, 35],
      labelColor: '#ffffff',
      labelFontSize: 12,
    };
  }
  return {
    icon: clusterIcon,
    hoverIcon: clusterIcon,
    size: [35, 35],
    hoverSize: [45, 45],
    labelColor: '#ffffff',
    labelFontSize: 16,
  };
};
