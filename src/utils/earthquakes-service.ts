class EarthquakesService {
  getGeoJson = async () => {
    const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson');
    if (!response.ok) {
      console.log('Fetch failed');
    }

    const geoJsonEarthquakes = await response.json();
    return geoJsonEarthquakes;
  };
}

export const earthquakesService = new EarthquakesService();
