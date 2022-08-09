// @material-ui/icons
import FolderSharedOutlined from '@material-ui/icons/FolderSharedOutlined';
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setAccount } from 'modules/accounts/account/AccountActions.js';
import ListAccount from "modules/accounts/account/AccountList.jsx";
import React from "react";
import { connect } from 'react-redux';

class Account extends React.Component {

  render() {

    return (
      <GridContainer justify="flex-start">

        <GridItem xs={12} >
          <Button color="white" round onClick={() => {
            this.props.setAccount({ id: 0, nameAccount: "", moreInformation: "", active: 1 });
            this.props.history.push('/admin/admin-account');
          }}>
            <FolderSharedOutlined /> Nueva cuenta
            </Button>
        </GridItem>

        <GridItem xs={12} >
          <ListAccount />
        </GridItem>


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
    setAccount: (account) => dispatch(setAccount(account)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);