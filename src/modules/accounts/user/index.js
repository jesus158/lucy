// @material-ui/icons
import People from "@material-ui/icons/People";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setUser } from 'modules/accounts/user/UserActions.js';
import ListUser from "modules/accounts/user/UserList.jsx";
import React from "react";
import { connect } from 'react-redux';



class User extends React.Component {

  render() {

    return (

      <GridContainer justify="flex-start">

        <GridItem xs={12} >
          <Button color="white" round onClick={() => {
            this.props.setUser(
              {
                id: 0
                , account: { id: 0 }
                , userAccount: {
                  id: 0
                  , typeIdentification: { id: 0 }
                  , numberIdentification: ""
                  , nameUser: ""
                  , passwordAccess: ""
                  , phone: ""
                  , email: ""
                  , isSuperManager: 0
                }
                , active: 1
                , beaconsTracking: ""
                , canMakeRequest: 0
                , costCenter: ""
                , moreInformation: ""
                , profile: { id: 0 }
              }
            );
            this.props.history.push('/admin/admin-user');
          }}>
            <People /> Nuevo usuario
            </Button>
        </GridItem>

        {/*
        <div>
          <Button color="white" round onClick={() => {
            this.props.setUser(
              {
                id: 0
                , account: { id: 0 }
                , userAccount: {
                  id: 0
                  , typeIdentification: { id: 0 }
                  , numberIdentification: ""
                  , nameUser: ""
                  , passwordAccess: ""
                  , phone: ""
                  , email: ""
                  , isSuperManager: 0
                }
                , active: 1
                , beaconsTracking: ""
                , canMakeRequest: 0
                , costCenter: ""
                , moreInformation: ""
                , profile: { id: 0 }
              }
            );
            this.props.history.push('/admin/admin-super-manager');
          }}>
            <People /> Súper manager
            </Button>
        </div> 
        */}
        <GridItem xs={12} >
          <ListUser />
        </GridItem>
        
      </GridContainer>
    );
  }

}

const mapStateToProps = state => {
  return {
    userState: state.userState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);