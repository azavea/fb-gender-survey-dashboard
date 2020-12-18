import regionConfig from '../data/region_config.json';
import countryConfig from '../data/country_config.json';

export const GEO_REGION = 'regions';
export const GEO_COUNTRY = 'countries';
export const GEO_MODES = [GEO_REGION, GEO_COUNTRY];

export const CONFIG = {
    [GEO_REGION]: regionConfig,
    [GEO_COUNTRY]: countryConfig,
};
