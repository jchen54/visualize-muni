import queryString from 'query-string';
import * as d3 from 'd3';
import actionTypes from './mapActionTypes';

export function setPathGenerators(geoComponent, geoComponentDataset, dimensions, pathGenerators) {
  const bounds = d3.geoPath().bounds(geoComponentDataset);
  const translate = [dimensions.width / 2, dimensions.height / 2];
  const rotate = [(bounds[0][0] + bounds[1][0]) / -2, (bounds[0][1] + bounds[1][1]) / -2];

  const projection = d3.geoMercator()
                       .scale(dimensions.scale)
                       .translate(translate)
                       .rotate(rotate);

  const pathGenerator = d3.geoPath().projection(projection);
  pathGenerators[geoComponent] = pathGenerator;
  return {
    type: actionTypes.SET_PATH_GENERATORS,
    pathGenerators,
  };

}

export function setVehicles() {
  return async (dispatch) => {
      let vehicles = [];
      try {
        const currentTime = Math.round((new Date()).getTime() / 1000);
        const params = {
          command: 'vehicleLocations',
          a: 'sf-muni',
          t: currentTime,
        };
        const response = await fetch(`http://webservices.nextbus.com/service/publicJSONFeed?${queryString.stringify(params)}`);
        const responseData = await response.json();
        console.log('responseData: ', responseData);
        vehicles = responseData.vehicle;
      } catch (err) {
        console.log(err);
      }
      return await dispatch({
        type: actionTypes.SET_VEHICLES,
        vehicles,
      });
    };
}
