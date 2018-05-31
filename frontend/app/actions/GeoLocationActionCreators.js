import axios from "axios"; // @see https://www.npmjs.com/package/axios
import AppDispatcher from "../dispatcher/AppDispatcher";
import config from "../config";

const api = axios.create({
  baseURL: config.apiServer.url
});

const GeoLocationActionCreators = {
  getLocations({ type, resolve, reject }) {
    const filter = type
      ? {
          params: {
            filter: {
              where: { type }
            }
          }
        }
      : {};

    api
      .get("/sample_locations", filter)
      .then(response => {
        AppDispatcher.dispatch({
          type,
          data: response.data
        });

        resolve();
      })
      .catch(error => {
        reject(error);
      });
  }
};

export default GeoLocationActionCreators;
