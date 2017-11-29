import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mapActionCreators from '../../../action-creators/map/mapActions.js';
import Map from '../Map.js';

const mapStateToProps = (state) => {
  return {
    mapReducers: state.mapReducers,
  };
};

const bundledActionCreators = Object.assign({},
  mapActionCreators,
);

const mapDispatchToProps = dispatch => bindActionCreators(bundledActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
