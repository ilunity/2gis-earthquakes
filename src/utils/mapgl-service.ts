import { load } from '@2gis/mapgl';
import API from '@2gis/mapgl/types';

type mapglApiType = typeof API

class Service {
  private mapglAPI: mapglApiType | undefined = undefined;

  getAPI = async (): Promise<mapglApiType> => {
    const api = this.mapglAPI;
    if (api) {
      return api;
    }

    this.mapglAPI = await load();
    return this.mapglAPI;
  };
}

export const mapglService = new Service();
