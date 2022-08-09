// @material-ui/icons
import ViewList from "@material-ui/icons/ViewList";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setTypeAbsence } from 'modules/configurations/type_absence/TypeAbsenceActions.js';
import TypeAbsenceList from "modules/configurations/type_absence/TypeAbsenceList.jsx";
import React from "react";
import { connect } from 'react-redux';

class TypeAbsence extends React.Component {

  render() {

    return (<GridContainer justify="center">

      <GridItem xs={12} >
        <Button color="white" round onClick={() => {
          this.props.setTypeAbsence({
            id: 0,
            absenceName: "",
            active: 1
          });
          this.props.history.push('/admin/admin-type-absence');
        }}>
          <ViewList /> Nuevo tipo de ausencia
            </Button>
      </GridItem>
      <TypeAbsenceList />

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
    setTypeAbsence: (typeService) => dispatch(setTypeAbsence(typeService)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeAbsence);
