import React from 'react';

const GeoComponent = (props) => {
  return (
    <path
      d={props.pathGenerator}
      fill={`rgba(38,50,56,${1 / props.featuresLength * props.index})`}
      stroke="rgb(0, 0, 0)"
      strokeWidth={0.5}
    />
  );
};

export default GeoComponent;
