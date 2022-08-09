// @material-ui/icons
import ViewList from "@material-ui/icons/ViewList";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setTypeService } from 'modules/configurations/type_services/TypeServicesActions.js';
import TypeServiceList from "modules/configurations/type_services/TypeServicesList.jsx";
import React from "react";
import { connect } from 'react-redux';
class TypeServices extends React.Component {

  render() {

    return (<GridContainer justify="center">

      <GridItem xs={12} >
        <Button color="white" round onClick={() => {
          this.props.setTypeService({
            id: 0,
            serviceName: "",
            priority: 0,
            active: 1
          });
          this.props.history.push('/admin/admin-type-service');
        }}>
          <ViewList /> Nuevo servicio
            </Button>
      </GridItem>
      <TypeServiceList />

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
    setTypeService: (typeService) => dispatch(setTypeService(typeService)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeServices);