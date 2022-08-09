import ViewList from "@material-ui/icons/ViewList";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from 'components/Grid/GridContainer'
import React from 'react'
import Layers from "@material-ui/icons/Layers";
import {connect} from 'react-redux'
import AssetList from './AssetList';
import { setAsset } from 'modules/assets/AssetActions.js';

class Asset extends React.Component {

    render() {
        return(<GridContainer justify="center">
            <GridItem xs={12} >
            <Button color="white" round onClick={() => {
          this.props.setAsset({ 
              id: 0,
              active: 1,
              assetCode: "",
              assetZoneTag: 0,
              nameAsset: "",
              state: 1,
              typeAsset: {
                  id: 0,
                  active: 0,
                  description: "",
                  name: ""
              },
              account: {
                active: 0,
                id: 0,
                moreInformation: "",
                nameAccount: "",
                schemaAccount: ""
            }
          });
          this.props.history.push('/admin/admin-asset');
        }}>
          <Layers /> Nuevo activo
            </Button>
            </GridItem>
            <AssetList/>
        </GridContainer>)
    }

}

const mapStateToProps = state => {
    return {
      assetState: state.assetState,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      setAsset: (asset) => dispatch(setAsset(asset)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Asset);
