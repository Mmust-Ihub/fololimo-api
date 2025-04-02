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

export const getGeo = async () => {
  const counties = [
    "Kiambu",
    "Murang'a",
    "Nyeri",
    "Kirinyaga",
    "Nyandarua",
    "Nakuru",
    "Uasin Gishu",
    "Kericho",
    "Baringo",
    "Narok",
    "Bomet",
    "Elgeyo-Marakwet",
    "Kajiado",
    "Laikipia",
    "Nandi",
    "Samburu",
    "Trans Nzoia",
    "Turkana",
    "West Pokot",
    "Embu",
    "Kitui",
    "Machakos",
    "Makueni",
    "Marsabit",
    "Meru",
    "Tharaka-Nithi",
    "Isiolo",
    "Homa Bay",
    "Kisii",
    "Kisumu",
    "Migori",
    "Nyamira",
    "Siaya",
    "Bungoma",
    "Busia",
    "Kakamega",
    "Vihiga",
    "Kilifi",
    "Kwale",
    "Lamu",
    "Mombasa",
    "Taita-Taveta",
    "Tana River",
    "Garissa",
    "Mandera",
    "Wajir",
    "Nairobi",
  ];
  config.apiKey = process.env.MAPTILER_API_KEY;
  for (const county of counties) {
    const result = geocoding
      .forward(county)
      .then((data) => {
        console.log(data.features[1].geometry.coordinates);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }
  return "✅ Finished updating weather for all counties!";
};
// getGeo();
