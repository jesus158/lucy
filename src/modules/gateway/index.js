// @material-ui/icons
import Router from "@material-ui/icons/Router";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setGateway } from 'modules/gateway/GatewayActions.js';
import GatewayList from "modules/gateway/GatewayList.jsx";
import React from "react";
import { connect } from 'react-redux';

class Gateway extends React.Component {

  render() {

    return (<GridContainer justify="center">

      <GridItem xs={12} >
        <Button color="white" round onClick={() => {
          this.props.setGateway({
            id: 0,
            serviceName: "",
            priority: 0,
            active: 1
          });
          this.props.history.push('/admin/admin-type-service');
        }}>
          <Router /> Nuevo receptor
            </Button>
      </GridItem>
      <GatewayList />

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
    setGateway: (typeService) => dispatch(setGateway(typeService)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gateway);