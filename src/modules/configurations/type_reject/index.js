// @material-ui/icons
import ViewList from "@material-ui/icons/ViewList";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setTypeReject } from 'modules/configurations/type_reject/TypeRejectActions.js';
import TypeRejectList from "modules/configurations/type_reject/TypeRejectList.jsx";
import React from "react";
import { connect } from 'react-redux';


class TypeReject extends React.Component {

  render() {

    return (<GridContainer justify="center">

      <GridItem xs={12} >
        <Button color="white" round onClick={() => {
          this.props.setTypeReject({
            id: 0,
            rejectName: "",
            active: 1
          });
          this.props.history.push('/admin/admin-type-rejection');
        }}>
          <ViewList /> Nuevo tipo de rechazo
            </Button>
      </GridItem>
      <TypeRejectList />

    </GridContainer>);
  }

}

const mapStateToProps = state => {
  return {
    typeRejectState: state.typeRejectState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTypeReject: (typeService) => dispatch(setTypeReject(typeService)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeReject);