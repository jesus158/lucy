// @material-ui/icons
import Warning from '@material-ui/icons/Warning';
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setAlert } from 'modules/alerts/AlertActions.js';
import AlertList from "modules/alerts/AlertList.jsx";
import React from "react";
import { connect } from 'react-redux';

class Alert extends React.Component {

  render() {

    return (<GridContainer justify="center">

      <GridItem xs={12} >
        <Button color="white" round onClick={() => {
          this.props.setAlert({
            id: 0,
            active: 1,
            ubication: { id: 0 },
            asset: [],
            typeAlert: { id: 2 },
            time: 0
          });
          this.props.history.push('/admin/admin-alert');
        }}>
          <Warning /> Nueva alerta
            </Button>
      </GridItem>
      <AlertList />

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
    setAlert: (alert) => dispatch(setAlert(alert)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);