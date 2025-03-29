import {
  config,
  geocoding,
  geolocation,
  coordinates,
  data,
  staticMaps,
  elevation,
  math,
} from "@maptiler/client";

config.apiKey = process.env.MAPTILER_API_KEY
const result = geocoding
  .forward("kakamega")
  .then((data) => {
    console.log(data.features[1].geometry.coordinates);
  })
  .catch((error) => console.log(error));
