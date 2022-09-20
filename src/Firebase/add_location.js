import axios from "axios";
import axius from "axios";

const BASE_URL =
  "https://us-central1-location-picker-miniapp.cloudfunctions.net/app/location";

export const saveLocation = async (data) => {
  const {
    name,
    woreda,
    region,
    city,
    hoseNo,
    latitude,
    longitude,
    type,
    userId,
  } = data;
  axius
    .post(BASE_URL, {
      name,
      woreda,
      region,
      city,
      hoseNo,
      latitude,
      longitude,
      type,
      userId,
    })
    .then((val) => {})
    .catch((err) => {
      throw err;
    });
};

export const getLocations = async (userId) => {
  const response = await axios.get(`${BASE_URL}/${userId}`);
  return response.data;
};
