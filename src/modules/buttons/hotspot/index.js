// @material-ui/icons
import SettingsRemote from '@material-ui/icons/SettingsRemote';
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setHotspot } from 'modules/buttons/hotspot/HotspotActions.js';
import HotspotList from "modules/buttons/hotspot/HotspotList.jsx";
import React from "react";
import { connect } from 'react-redux';

class Hotspot extends React.Component {

  render() {

    return (<GridContainer justify="center">

      <GridItem xs={12} >
        <Button color="white" round onClick={() => {
          this.props.setHotspot({
            account: { id: 0 },
            id: 0,
            hotspot: "",
            active: 1
          });
          this.props.history.push('/admin/admin-hotspot');
        }}>
          <SettingsRemote /> Nuevo receptor
            </Button>
      </GridItem>
      <HotspotList />

    </GridContainer>);
  }

}

const mapStateToProps = state => {
  return {
    accountState: state.accountState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHotspot: (typeService) => dispatch(setHotspot(typeService)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hotspot);