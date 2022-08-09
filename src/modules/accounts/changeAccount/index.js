// @material-ui/icons
// core components
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import React from "react";
import { connect } from 'react-redux';

var prevNowPlaying = null;
class ChangeAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Admin: false,
      history: props.history,
      isMobile: window.screen.width < 600
    };
  }

  componentWillUnmount() {
    if (prevNowPlaying) {
      clearInterval(prevNowPlaying);
    }
    prevNowPlaying = null;
  }

  componentDidMount = () => {
    if (prevNowPlaying) {
      clearInterval(prevNowPlaying);
      prevNowPlaying = null;
    }

    prevNowPlaying = setInterval(() => {
      this.props.history.push(sessionStorage["userAccountProfileId"] === "4" ? "../admin/accounts" : "../admin/requests");
    }, 50);
  }


  render() {
    return (
      <Card>
        <CardHeader color="primary" icon>
          <CardIcon color="info">
            <RotateLeftIcon />
          </CardIcon>
          <h4>Cambio de cuenta</h4>
        </CardHeader>
        <CardBody >
          <h3>Se ha detectado un cambio de cuenta ...</h3>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAccount);