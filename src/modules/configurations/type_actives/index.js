import ViewList from "@material-ui/icons/ViewList";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from 'components/Grid/GridContainer'
import React from 'react'
import {connect} from 'react-redux'
import TypeActivesList from './TypeActivesList';
import { setTypeAsset } from 'modules/configurations/type_actives/TypeActivesActions.js';

class TypeActives extends React.Component {
    
    render() {
        return(<GridContainer justify="center">
            <GridItem xs={12} >
            <Button color="white" round onClick={() => {
          this.props.setTypeAsset({
            id: 0,
            name: "",
            description: "",
            active: 1
          });
          this.props.history.push('/admin/admin-type-asset');
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
    typeAssetState: state.typeAssetState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTypeAsset: (typeAsset) => dispatch(setTypeAsset(typeAsset)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeActives);