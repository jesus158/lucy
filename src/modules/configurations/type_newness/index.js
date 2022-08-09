// @material-ui/icons
import ViewList from "@material-ui/icons/ViewList";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setTypeNewness } from 'modules/configurations/type_newness/TypeNewnessActions.js';
import TypeNewnessList from "modules/configurations/type_newness/TypeNewnessList.jsx";
import React from "react";
import { connect } from 'react-redux';


class TypeNewness extends React.Component {

  render() {

    return (<GridContainer justify="center">

      <GridItem xs={12} >
        <Button color="white" round onClick={() => {
          this.props.setTypeNewness({
            id: 0,
            newnessName: "",
            active: 1
          });
          this.props.history.push('/admin/admin-type-newness');
        }}>
          <ViewList /> Nuevo tipo de novedad
            </Button>
      </GridItem>
      <TypeNewnessList />

    </GridContainer>);
  }

}

const mapStateToProps = state => {
  return {
    typeNewnessState: state.typeNewnessState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTypeNewness: (typeService) => dispatch(setTypeNewness(typeService)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeNewness);