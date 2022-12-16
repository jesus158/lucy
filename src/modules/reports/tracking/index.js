import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SOS from "modules/reports/tracking/SOS.jsx";
import Alerts from "modules/reports/tracking/Alerts.jsx";
import Tracking from "modules/reports/tracking/Tracking.jsx";
import TrackingAssets from "modules/reports/tracking/TrackingAssets.jsx";
import React from "react";
import { connect } from "react-redux";

class TrackingIndex extends React.Component {

  render() {

    return (
      <GridContainer >

        <GridItem xs={12} sm={6} md={6} lg={6}>
          <SOS />
        </GridItem>

        <GridItem xs={12} sm={6} md={6} lg={6}>
          <Tracking />
        </GridItem>

        <GridItem xs={12} sm={6} md={6} lg={6}>
          <TrackingAssets />
        </GridItem>

        <GridItem xs={12} sm={6} md={6} lg={6}>
          <Alerts />
        </GridItem>

      </GridContainer >
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackingIndex);
