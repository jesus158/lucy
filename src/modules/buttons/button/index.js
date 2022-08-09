// @material-ui/icons
import SettingsRemote from '@material-ui/icons/SettingsRemote';
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setCallButton } from 'modules/buttons/button/ButtonServiceActions.js';
import ButtonServiceList from "modules/buttons/button/ButtonServiceList.jsx";
import React from "react";
import { connect } from 'react-redux';

class ButtonService extends React.Component {

  render() {

    return (<GridContainer justify="center">

      <GridItem xs={12} >
        <Button color="white" round onClick={() => {
          this.props.setCallButton({
            active: 1,
            hotspotCallButton: null,
            id: 0,
            locationBegin: { id: 0 },
            locationEnd: { id: 0 },
            modeUsed: 1,//Significa que el botón está en uso
            moreInformation: "",
            typeService: { id: 0 },
            userAsigned: { id: 0 },
            uuid: ""
          });
          this.props.history.push('/admin/admin-call-button');
        }}>
          <SettingsRemote /> Nuevo botón
            </Button>
      </GridItem>
      <ButtonServiceList />

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
    setCallButton: (typeService) => dispatch(setCallButton(typeService)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonService);