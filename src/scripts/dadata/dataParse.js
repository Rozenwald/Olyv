function parse(data) {
  if (!data) {
    return {};
  }

  const positionInfo = {
    lat: data.data.geo_lat,
    lon: data.data.geo_lon,
    region: data.data.region_with_type,
    city: data.data.city,
    street: data.data.street_with_type,
    house: data.data.house,
    value: data.value,
    full_value: data.unrestricted_value,
    kladr_id: data.data.kladr_id,
    city_kladr_id: data.data.city_kladr_id,
    settlement_kladr_id: data.data.settlement_kladr_id,
  };

  return positionInfo;
}

export default {
  parse,
};
