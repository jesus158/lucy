// @material-ui/icons
import ViewList from "@material-ui/icons/ViewList";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setTypeCancellation } from 'modules/configurations/type_cancellation/TypeCancellationActions.js';
import React from "react";
import { connect } from 'react-redux';
import TypeCancellationList from "./TypeCancellationList";

class TypeCancellation extends React.Component {

  render() {

    return (<GridContainer justify="center">

      <GridItem xs={12} >
        <Button color="white" round onClick={() => {
          this.props.setTypeCancellation({
            id: 0,
            cancellationName: "",
            active: 1
          });
          this.props.history.push('/admin/admin-type-cancel');
        }}>
          <ViewList /> Nuevo tipo de cancelación
            </Button>
      </GridItem>
      <TypeCancellationList />

    </GridContainer>);
  }

}

const mapStateToProps = state => {
  return {
    typeCancellationState: state.typeCancellationState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTypeCancellation: (typeService) => dispatch(setTypeCancellation(typeService)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeCancellation);