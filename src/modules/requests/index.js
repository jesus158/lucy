import Sms from "@material-ui/icons/Sms";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { setRequest } from "modules/requests/RequestActions";
import RequestList from "modules/requests/RequestList";
import React from "react";
import { connect } from "react-redux";

class Request extends React.Component {

  renderButton = () => {
    const CARRIER = 2;
    const MAKE_REQUEST = 1;
    if (parseInt(sessionStorage["userAccountProfileId"], 10) === CARRIER) {
      if (parseInt(sessionStorage["canMakeRequest"], 10) !== MAKE_REQUEST) {
        return (<></>);
      }
    }
    return (
      <Button color="white" round onClick={() => {
        this.props.history.push('/admin/admin-request');
      }}>
        <Sms /> Nueva solicitud
      </Button>
    )
  }

  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12}>
          {this.renderButton()}
        </GridItem>
        <RequestList />
      </GridContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    requestState: state.requestState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRequest: request => dispatch(setRequest(request))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Request);
