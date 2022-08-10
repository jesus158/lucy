import ViewList from "@material-ui/icons/ViewList";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from 'components/Grid/GridContainer'
import React from 'react'
import {connect} from 'react-redux'
import TypeActivesList from './TypeAlertsList';
import { setTypeAlert } from 'modules/configurations/type_alerts/TypeAlertsActions.js';

class TypeAlerts extends React.Component {
    
    render() {
        return(<GridContainer justify="center">
            <GridItem xs={12} >
            <Button color="white" round onClick={() => {
          this.props.setTypeAlert({
            id: 0,
            name: "",
            description: "",
            active: 1
          });
          this.props.history.push('/admin/admin-type-alert');
        }}>
          <ViewList /> Nuevo tipo de activo
            </Button>
            </GridItem>
            <TypeActivesList/>
        </GridContainer>)
    }
}

const mapStateToProps = state => {
  return {
    typeAlertState: state.typeAlertState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      setTypeAlert: (typeAlert) => dispatch(setTypeAlert(typeAlert)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeAlerts);