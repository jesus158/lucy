// @material-ui/icons
import ViewList from "@material-ui/icons/ViewList";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setTypeBreak } from 'modules/configurations/type_break/TypeBreakActions.js';
import TypeBreakList from "modules/configurations/type_break/TypeBreakList.jsx";
import React from "react";
import { connect } from 'react-redux';


class TypeBreak extends React.Component {

  render() {

    return (<GridContainer justify="center">

      <GridItem xs={12} >
        <Button color="white" round onClick={() => {
          this.props.setTypeBreak({
            id: 0,
            breakName: "",
            active: 1
          });
          this.props.history.push('/admin/admin-type-break');
        }}>
          <ViewList /> Nuevo tipo de receso
            </Button>
      </GridItem>
      <TypeBreakList />

    </GridContainer>);
  }

}

const mapStateToProps = state => {
  return {
    typeBreakState: state.typeBreakState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTypeBreak: (typeService) => dispatch(setTypeBreak(typeService)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeBreak);