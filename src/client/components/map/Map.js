import React, { Component } from 'react';
import * as d3 from 'd3';
import arteriesData from './sfmaps/arteries.json';
import freewaysData from './sfmaps/freeways.json';
import neighborhoodsData from './sfmaps/neighborhoods.json';
import streetsData from './sfmaps/streets.json';
import GeoComponent from './GeoComponent.js';
import busIcon from './busIcon.svg';
import './mapStyles.css';

class Map extends Component {
  componentDidMount() {
    this.props.setPathGenerators('arteries', arteriesData, this.props.mapReducers.dimensions, this.props.mapReducers.pathGenerators);
    this.props.setPathGenerators('freeways', freewaysData, this.props.mapReducers.dimensions, this.props.mapReducers.pathGenerators);
    this.props.setPathGenerators('neighborhoods', neighborhoodsData, this.props.mapReducers.dimensions, this.props.mapReducers.pathGenerators);
    this.props.setPathGenerators('streets', streetsData, this.props.mapReducers.dimensions, this.props.mapReducers.pathGenerators);
    this.props.setVehicles();
    setInterval(() => {
      this.props.setVehicles();
    }, 15000);
  }

  render() {
    const bounds = d3.geoPath().bounds(neighborhoodsData);
    const translate = [this.props.mapReducers.dimensions.width / 2, this.props.mapReducers.dimensions.height / 2];
    const rotate = [(bounds[0][0] + bounds[1][0]) / -2, (bounds[0][1] + bounds[1][1]) / -2];

    const vehiclesProjection = d3.geoMercator()
                                 .scale(this.props.mapReducers.dimensions.scale)
                                 .translate(translate)
                                 .rotate(rotate);

    const arteries = arteriesData.features.map((d,i) => (
      <GeoComponent
        key={'path' + i}
        pathGenerator={this.props.mapReducers.pathGenerators.arteries(d)}
        featuresLength={arteriesData.features.length}
        index={i}
      />));

    const freeways = freewaysData.features.map((d,i) => (
      <GeoComponent
        key={'path' + i}
        pathGenerator={this.props.mapReducers.pathGenerators.freeways(d)}
        featuresLength={freewaysData.features.length}
        index={i}
      />));

    const neighborhoods = neighborhoodsData.features.map((d,i) => (
      <GeoComponent
        key={'path' + i}
        pathGenerator={this.props.mapReducers.pathGenerators.neighborhoods(d)}
        featuresLength={neighborhoodsData.features.length}
        index={i}
      />));

    const streets = streetsData.features.map((d,i) => (
      <GeoComponent
        key={'path' + i}
        pathGenerator={this.props.mapReducers.pathGenerators.streets(d)}
        featuresLength={streetsData.features.length}
        index={i}
      />));

    const vehicles = this.props.mapReducers.vehicles.map((vehicle, i) => {
      const coordinates = vehiclesProjection([vehicle.lon, vehicle.lat]);
      return (
        <image
          href={busIcon}
          key={'bus' + i}
          x={coordinates[0]}
          y={coordinates[1]}
          height="20px"
          width="20px"
          alt="Bus Icon"
        />
      );
    });

    return (
      <div className="root">
        <h1 className="header">Visualizing<br />SF Muni</h1>
        <svg
          width={this.props.mapReducers.dimensions.width}
          height={this.props.mapReducers.dimensions.height}
          viewBox="0 0 800 450"
        >
          <g>
            {arteries}
            {freeways}
            {neighborhoods}
            {streets}
            {vehicles}
          </g>
        </svg>
        <div className="credit">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC 3.0 BY</a></div>
      </div>
    );
  }
}

export default Map;
