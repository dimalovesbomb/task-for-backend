import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

let App = props => {
  return (
    <h1>Works</h1>
  );
}

function mapStateToProps(state) {
  return {
    // places: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // getPlace: city => dispatch(getPlace(city)),
    // removePlace: id => dispatch(removePlace(id)),
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
