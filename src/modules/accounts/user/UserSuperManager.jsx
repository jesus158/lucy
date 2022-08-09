import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import LockOutlined from "@material-ui/icons/LockOutlined";
import MailOutline from "@material-ui/icons/MailOutline";
import PersonOutline from '@material-ui/icons/PersonOutline';
import SaveIcon from '@material-ui/icons/Save';
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import AlertInfo from "components/AlertInfo/AlertInfo.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
// core components
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { configureUser, getListTypeIdentification, getListTypeProfile, getUserByEmail, getUserById, setUser } from 'modules/accounts/user/UserActions.js';
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { ADMIN } from "modules/utils/ApiUtil.js";
import React from "react";
import { connect } from 'react-redux';

const style = {
  gridContainer: {
    padding: "0px 30px 30px 40px"
  }

  , gridItem: {
    margin: "20px 0px 10px 0px"
  }

  , headerGridItem: {
    margin: "30px 0px 0px 0px"
  }
  , ...regularFormsStyle
};


class UserSuperManager extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: [0],
      openAlertInfo: false,
      textAlertInfo: "",
      accountEmail: ""
    };

  }

  componentDidMount = () => {
    var urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has('code')) {
      this.props.getUserById(urlParams.get('code'));
    }
    this.props.getListTypeIdentification((success) => {

    });
    this.props.getListTypeProfile((success) => {

    });
  }


  configureUser = () => {

    var { user } = this.props.userState.data;
    if (user.userAccount.email === "") {

      this.showAlertInfo("Por favor debe ingresar correo electrónico");
      return;
    }

    if (user.userAccount.nameUser === "") {

      this.showAlertInfo("Por favor debe ingresar el nombre de la cuenta");
      return;
    }

    var account = user.account;
    account.id = parseInt(sessionStorage["accountId"]);
    user.account = account;
    this.props.configureUser(user, this.props, (success) => {
      if (success === "OK") {
        this.props.history.push('/admin/users');
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

  handleInputTextUser = event => {
    var user = this.props.userState.data.user;
    user[[event.target.name]] = event.target.value;
    this.props.setUser(user);
  };


  handleInputTextUserAccount = event => {

    var user = JSON.parse(JSON.stringify(this.props.userState.data.user));
    var userAccount = user.userAccount;
    var dataActual = event.target.value;
    var option = event.target.name;
    if (option === "email") {
      dataActual = dataActual.trim().toLowerCase();
    }

    userAccount[[event.target.name]] = dataActual;
    user.userAccount = userAccount;
    if (option === "email") {
      var emailReg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      if (emailReg.test(dataActual)) {
        this.props.getUserByEmail(dataActual, (succes) => {
          if (succes === "OK") {
            if (this.props.userState.data.listUserSystemAccount !== undefined) {
              try {
                var found = false;
                var userAccountLocal = null;
                var { listUserSystemAccount } = this.props.userState.data;
                listUserSystemAccount.map((userSystemAccount, index) => {
                  userAccountLocal = userSystemAccount.userAccount;
                  if (userSystemAccount.account.schemaAccount === sessionStorage["accountCode"]) {
                    user = userSystemAccount;
                    found = true;
                  }
                });
                if (!found && userAccountLocal !== null) {
                  user.userAccount = userAccountLocal;
                }
              } catch (ex) { }
            }
          }
          this.props.setUser(user);
        });
      } else {
        this.props.setUser(user);
      }
    } else {
      this.props.setUser(user);
    }
  };

  handleToggleActive = () => {
    var user = this.props.userState.data.user;
    if (user.active) {
      user.active = 0;
    } else {
      user.active = 1;
    }
    this.props.setUser(user);
  }

  handleToggleMakeRequest = () => {
    var user = this.props.userState.data.user;
    if (user.canMakeRequest) {
      user.canMakeRequest = 0;
    } else {
      user.canMakeRequest = 1;
    }
    this.props.setUser(user);
  }

  handleProfileInput = event => {
    var user = this.props.userState.data.user;
    var profile = user.profile;
    profile[[event.target.name]] = event.target.value;
    user.profile = profile;
    this.props.setUser(user);
  }

  handleDocTypeInput = event => {
    var user = this.props.userState.data.user;
    var userAccount = user.userAccount;
    var typeIdentification = userAccount.typeIdentification;
    typeIdentification[[event.target.name]] = event.target.value;
    userAccount.typeIdentification = typeIdentification;
    user.userAccount = userAccount;
    this.props.setUser(user);
  }
  getDataForSelectTypeProfile = (listTypeProfiles) => {
    var content = [];
    const { classes } = this.props;
    try {
      content.push(
        (<MenuItem
          classes={{
            root: classes.selectMenuItem
          }}
          value="0">
          Seleccione un tipo de perfil...
        </MenuItem>));
      listTypeProfiles.map((profile, key) => {
        content.push(<MenuItem value={profile.id}>{profile.nameProfile}</MenuItem>);
      })
    } catch (ex) { }
    return content;
  }

  getDataForSelectTypeIdentification = (listTypeIdentifications) => {
    var content = [];
    const { classes } = this.props;
    try {
      content.push(
        (<MenuItem
          classes={{
            root: classes.selectMenuItem
          }}
          value="0">
          Seleccione un tipo de documento...
        </MenuItem>));
      listTypeIdentifications.map((identification, key) => {
        content.push(<MenuItem value={identification.id}>{identification.nameShort}</MenuItem>);
      })
    } catch (ex) { }
    return content;
  }

  render() {
    const { classes } = this.props;
    let isActivityIndicatorShown = this.props.userState.data.isActivityIndicatorShown;
    var { user, listTypeIdentification, listProfile } = this.props.userState.data;

    if (user === undefined) {
      user = {
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
      };
    }

    if (listTypeIdentification === undefined) {
      listTypeIdentification = [];
    }
    if (listTypeIdentification === null) {
      listTypeIdentification = [];
    }

    if (listProfile === undefined) {
      listProfile = [];
    }
    if (listProfile === null) {
      listProfile = [];
    }
    const IS_ADMIN = (parseInt(sessionStorage["userAccountProfileId"], 10) === ADMIN) || sessionStorage["isSuperManager"] === "1";
    return (
      <div>
        {isActivityIndicatorShown &&
          <WaitDialog text={this.state.textAlertInfo} />
        }
        <AlertInfo text={this.state.textAlertInfo} open={this.state.openAlertInfo} onDoneClick={this.hideaAlertInfo} />
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="info">
              <PersonOutline />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Súper Manager</h4>
          </CardHeader>
          <CardBody style={{ overflow: "auto" }}>
            <GridContainer>
              <GridItem xs={12} sm={12} className={classes.gridItem}>
                <CustomInput
                  labelText={
                    <span>
                      Correo electrónico
                    </span>
                  }

                  id="firstname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: !IS_ADMIN,
                    name: "email",
                    id: "email",
                    value: user.userAccount.email,
                    onChange: event => this.handleInputTextUserAccount(event),
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}>
                        <MailOutline className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
              </GridItem>


              <GridItem xs={12} sm={12} className={classes.gridItem}>
                <CustomInput
                  labelText={
                    <span>
                      Nombre
                        </span>
                  }
                  id="firstname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: !IS_ADMIN,
                    name: "nameUser",
                    id: "nameUser",
                    value: user.userAccount.nameUser,
                    onChange: event => this.handleInputTextUserAccount(event),
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}>
                        <PersonOutline className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
              </GridItem>

              {//user.id == 0 &&
                <GridItem xs={12} sm={12}>
                  <CustomInput
                    labelText={
                      <span>
                        Contraseña
                        </span>
                    }
                    type="password"
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "passwordAccess",
                      id: "passwordAccess",
                      value: user.userAccount.passwordAccess,
                      onChange: event => this.handleInputTextUserAccount(event),
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <LockOutlined className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                </GridItem>
              }
              <Button
                onClick={this.configureUser}
                color="success"
                round><SaveIcon />
                Guardar
                </Button>

            </GridContainer>
          </CardBody>
        </Card>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    accountState: state.accountState,
    userState: state.userState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    configureUser: (user, ownProps, onSuccess) => dispatch(configureUser(user, ownProps, onSuccess)),
    setUser: (user) => dispatch(setUser(user)),
    getUserById: (id) => dispatch(getUserById(id)),
    getUserByEmail: (email, onSuccess) => dispatch(getUserByEmail(email, onSuccess)),
    getListTypeIdentification: (onSuccess) => dispatch(getListTypeIdentification(onSuccess)),
    getListTypeProfile: (onSuccess) => dispatch(getListTypeProfile(onSuccess)),
  };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(UserSuperManager));