// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CarrierAdmin from "modules/carriers/CarrierAdmin.jsx";
import React from "react";
import { connect } from 'react-redux';

class Carrier extends React.Component {

  render() {

    return (<GridContainer justify="center">

      <GridItem xs={12} >

      </GridItem>
      <CarrierAdmin />
    </GridContainer>);
  }

}

const mapStateToProps = state => {
  return {
    typeAbsenceState: state.typeAbsenceState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carrier);
