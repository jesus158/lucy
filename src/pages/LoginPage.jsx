/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Email from "@material-ui/icons/Email";
import logo from "assets/img/logo-white.png";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import AlertInfo from "components/AlertInfo/AlertInfo.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
// import LockOutline from "@material-ui/icons/LockOutline";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { loginUser, sendEmailRememberAccess } from 'modules/accounts/user/UserActions';
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import PropTypes from "prop-types";
import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      tries: 0,
      cardAnimaton: "cardHidden"
      , rememberPassword: 0
      , toAdmin: false
      , openAlertInfo: false
      , textAlertInfo: ""
      , userLogin: {
        userName: ""
        , password: ""
        , loginMode: "EMAIL"
        , authToken: ""
      }
    };
  }

  componentDidMount() {
    var urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("token") && urlParams.has("accountCode")) {
      this.loginByToken(urlParams.get("token"), urlParams.get("accountCode"));
    }

    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );

    //sessionStorage["accountCode"] = "Groupware_1_3974";
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  handleInput = event => {
    var userLogin = this.state.userLogin;
    userLogin[[event.target.name]] = event.target.value;
    this.setState({ userLogin });
  };

  loginByToken = (token, accountCode) => {
    this.setState({ tries: 0 },
      () => {
        this.loginProcess(undefined, this.props, true, token, accountCode);
      });

  }

  login = () => {

    if (this.state.userLogin.userName === "") {
      this.showAlertInfo("Por favor debe ingresar el usuario");
      return;
    }

    if (this.state.userLogin.password === "") {
      this.showAlertInfo("Por favor debe ingresar la contraseña");
      return;
    }
    this.loginProcess(this.state.userLogin, this.props);
    //login, ownProps, byToken, token, accountCode, onSuccess

  }

  loginProcess = (login, ownProps, byToken = false, token = "", accountCode = 0) => {
    this.props.loginUser(login, ownProps, byToken, token, accountCode, (success) => {
      //Navegación a la lista
      if (success === "OK") {
        this.setState({ toAdmin: true });
      } else {
        var standarAnswer = "Usuario o contraseña incorrectas";
        if (byToken === true) {
          if (this.state.tries < 4) {
            this.setState({ tries: this.state.tries + 1 }, () => {
              this.loginProcess((login, ownProps, byToken, token, accountCode));
            });
          } else {
            standarAnswer = "Verifique el estado de la red e inténtelo nuevamente";
            var systemMessage = standarAnswer;
            var { apiResponse } = this.props.userState.data;
            if (apiResponse !== undefined) {
              systemMessage = apiResponse.message;
            }
            if (systemMessage === undefined) {
              systemMessage = standarAnswer;
            }
            if (systemMessage === null) {
              systemMessage = standarAnswer;
            }
            if (systemMessage.trim() === "") {
              systemMessage = standarAnswer;
            }
            this.showAlertInfo(systemMessage);
          }
        } else {
          var systemMessage = standarAnswer;
          var { apiResponse } = this.props.userState.data;
          if (apiResponse !== undefined) {
            systemMessage = apiResponse.message;
          }
          if (systemMessage === undefined) {
            systemMessage = standarAnswer;
          }
          if (systemMessage === null) {
            systemMessage = standarAnswer;
          }
          if (systemMessage.trim() === "") {
            systemMessage = standarAnswer;
          }
          this.showAlertInfo(systemMessage);
        }
      }
    });
  }

  showAlertInfo = (text) => {
    this.setState({
      openAlertInfo: true,
      textAlertInfo: text,
    });
  }

  hideaAlertInfo = () => {
    this.setState({
      openAlertInfo: false
    });
  }

  handleToggle = () => {
    if (this.state.rememberPassword === 0) {
      this.setState({ rememberPassword: 1 });
    } else {
      this.setState({ rememberPassword: 0 });
    }
  }

  emailToRemember = () => {
    if (this.state.userLogin.userName === "") {
      this.showAlertInfo("Por favor debe ingresar el usuario");
      return;
    }
    var email = this.state.userLogin.userName;
    this.props.sendEmailRememberAccess(email, (success) => {
      var userLogin = this.state.userLogin;
      userLogin.userName = "";
      this.setState({ rememberPassword: 0, userLogin: userLogin });
    });
  }

  render() {
    const { classes } = this.props;
    let isActivityIndicatorShown = this.props.userState.data.isActivityIndicatorShown;

    if (this.state.toAdmin === true) {
      return <Redirect to={'/admin'} />
    }

    return (
      <div className={classes.container}>

        <GridContainer justify="center">
          <AlertInfo text={this.state.textAlertInfo} open={this.state.openAlertInfo} onDoneClick={this.hideaAlertInfo} />
          <GridItem xs={12} sm={6} md={4}>
            {isActivityIndicatorShown &&
              <WaitDialog text={"Validando usuario..."} />
            }
            <form>
              <Card login className={classes[this.state.cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="primary"
                >
                  <h4 className={classes.cardTitle}>
                    <img src={logo} alt="..." width="140" />
                  </h4>

                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Correo..."
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "userName",
                      id: "userName",
                      value: this.state.userLogin.userName,
                      onChange: event => this.handleInput(event),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  {this.state.rememberPassword !== 1 &&
                    <CustomInput
                      labelText="Clave..."
                      id="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "password",
                        id: "password",
                        type: "password",
                        value: this.state.userLogin.password,
                        onChange: event => this.handleInput(event),
                        onKeyDown: (event) => {
                          if (event.keyCode === 13) {
                            this.login();
                          }
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                          </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  }
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.rememberPassword === 1}
                        onChange={() => this.handleToggle()}
                        color="default" />}
                    label={this.state.rememberPassword !== 1 ? "¿Olvidó su clave?" : "Recordar al correo"}
                  />

                  {this.state.rememberPassword !== 1 &&
                    <Button color="primary" simple size="lg" block onClick={() => {
                      this.login();
                    }}>
                      Ingresar
                  </Button>
                  }
                  {this.state.rememberPassword === 1 &&
                    <Button color="primary" simple size="lg" block onClick={() => {
                      this.emailToRemember();
                    }}>
                      Enviar
                  </Button>
                  }

                </CardBody>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    userState: state.userState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (login, ownProps, byToken, token, accountCode, onSuccess) => dispatch(loginUser(login, ownProps, byToken, token, accountCode, onSuccess)),
    sendEmailRememberAccess: (email, onSuccess) => dispatch(sendEmailRememberAccess(email, onSuccess)),
  };
};

export default withStyles(loginPageStyle)(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
