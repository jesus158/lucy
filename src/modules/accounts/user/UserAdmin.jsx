import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
// @material-ui/icons
import BusinessCenter from "@material-ui/icons/BusinessCenter";
import Check from "@material-ui/icons/Check";
import CreditCard from '@material-ui/icons/CreditCard';
import LocalOfferOutlined from "@material-ui/icons/LocalOfferOutlined";
import LockOutlined from "@material-ui/icons/LockOutlined";
import MailOutline from "@material-ui/icons/MailOutline";
import Money from '@material-ui/icons/Money';
import NotesOutlined from "@material-ui/icons/NotesOutlined";
import PersonOutline from '@material-ui/icons/PersonOutline';
import Phone from "@material-ui/icons/Phone";
import SaveIcon from '@material-ui/icons/Save';
import WifiTethering from "@material-ui/icons/WifiTethering";
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import { getListCostCenter } from 'modules/accounts/account/AccountActions.js';
import { configureUser, getListTypeIdentification, getListTypeProfile, getUserByEmail, getUserById, setUser } from 'modules/accounts/user/UserActions.js';
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { ADMIN, BEACON_NAME, PATTERN_BEACONS, PATTERN_EMAIL, PATTERN_LETTERS_NUMEROS, PATTERN_PHONE_EXTENSIONS, PATTERN_TEXTOS_NUMEROS, utilConverTextToPattern } from "modules/utils/ApiUtil.js";
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


class UserAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: [0],
      openAlertInfo: false,
      textAlertInfo: "",
      accountEmail: "",
      showPassword: 0,
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
    this.props.getListCostCenter((success) => {

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
      //Navegación a la lista
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

  handleInputTextUser = (event, pattern = "", fieldName = "", valueField = "") => {
    var user = this.props.userState.data.user;
    var dataActual = valueField;
    if (valueField === "") {
      dataActual = event.target.value;
    }

    if (pattern !== undefined) {
      if (pattern !== "") {
        let regex = new RegExp(pattern);
        var permited = "";
        for (let i = 0; i < dataActual.length; i++) {
          if (regex.test(dataActual[i])) {
            permited += dataActual[i];
          }
        }
        dataActual = permited;
      }
    }
    if (fieldName === "") {
      fieldName = event.target.name;
    }
    user[[fieldName]] = dataActual;
    this.props.setUser(user);
  };

  handleOnBlur = event => {
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
      var emailReg = PATTERN_EMAIL;
      if (emailReg.test(dataActual)) {
        this.props.getUserByEmail(dataActual, (succes) => {
          if (succes === "OK") {
            if (this.props.userState.data.listUserSystemAccount !== undefined) {
              try {
                var found = false;
                var userAccountLocal = null;
                var { listUserSystemAccount } = this.props.userState.data;
                listUserSystemAccount.forEach(userSystemAccount => {
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
    }
    this.props.setUser(user);
  }

  handleInputTextUserAccount = (event, pattern = "") => {

    var user = JSON.parse(JSON.stringify(this.props.userState.data.user));
    var userAccount = user.userAccount;
    var dataActual = event.target.value;
    dataActual = utilConverTextToPattern(dataActual, pattern);
    /*if (pattern !== undefined) {
      if (pattern !== "") {
        let regex = new RegExp(pattern);
        var permited = "";
        for (let i = 0; i < dataActual.length; i++) {
          if (regex.test(dataActual[i])) {
            permited += dataActual[i];
          }
        }
        dataActual = permited;
      }
    }*/
    userAccount[[event.target.name]] = dataActual;
    user.userAccount = userAccount;
    this.props.setUser(user);
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
      listTypeProfiles.forEach(profile => {
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
      listTypeIdentifications.forEach(identification => {
        content.push(<MenuItem value={identification.id}>{identification.nameShort}</MenuItem>);
      })
    } catch (ex) { }
    return content;
  }

  render() {
    const { classes } = this.props;
    let isActivityIndicatorShown = this.props.userState.data.isActivityIndicatorShown;
    var { user, listTypeIdentification, listProfile } = this.props.userState.data;
    let { listCostCenter } = this.props.accountState.data;
    if (listCostCenter === undefined) {
      listCostCenter = [];
    }
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
            <h4 className={classes.cardIconTitle}>Usuario</h4>
          </CardHeader>
          <CardBody style={{ overflow: "auto" }}>

            <GridContainer>

              <GridItem xs={12} sm={12}>

                <CustomInput
                  labelText={
                    <span>
                      Correo electrónico
                    </span>
                  }
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: !IS_ADMIN,
                    name: "email",
                    id: "email",
                    value: user.userAccount.email,
                    onBlur: event => this.handleOnBlur(event),
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


              <GridItem xs={12} sm={12}>
                <CustomInput
                  labelText={
                    <span>
                      Nombre
                    </span>
                  }
                  id="nameUser"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: !IS_ADMIN,
                    name: "nameUser",
                    id: "nameUser",
                    value: user.userAccount.nameUser,
                    onChange: event => this.handleInputTextUserAccount(event, PATTERN_TEXTOS_NUMEROS),
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


              <GridItem xs={12} sm={12}>
                <CustomInput
                  labelText={
                    <span>
                      Contraseña
                        </span>
                  }
                  type={this.state.showPassword === 0 ? "password" : "text"}
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


              {/* <GridItem xs={12} sm={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={
                        <Check className={classes.checkedIcon} />
                      }
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                      checked={this.state.showPassword}
                      onClick={(event) => { this.setState({ showPassword: this.state.showPassword === 0 ? 1 : 0 }) }}
                      disableRipple
                    />
                  }
                  label={"Mostrar contraseña"}>
                </FormControlLabel>
              </GridItem> */}


              <GridItem xs={12} sm={12} className={classes.gridItem}>
                <FormControl
                  fullWidth
                  className={classes.selectFormControl}>
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}>
                    Tipo de documento
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    value={user.userAccount.typeIdentification.id}
                    onChange={(event) => { this.handleDocTypeInput(event) }}
                    inputProps={{
                      disabled: !IS_ADMIN,
                      name: "id",
                      id: "doctype_id",
                    }}
                    startAdornment={(
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}>
                        <CreditCard className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )}>
                    {this.getDataForSelectTypeIdentification(listTypeIdentification)}
                  </Select>
                </FormControl>
              </GridItem>


              <GridItem xs={12} sm={12}>
                <CustomInput
                  labelText={
                    <span>
                      Número documento
                    </span>
                  }
                  id="numberIdentification"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: !IS_ADMIN,
                    name: "numberIdentification",
                    id: "numberIdentification",
                    value: user.userAccount.numberIdentification,
                    onChange: event => this.handleInputTextUserAccount(event, PATTERN_LETTERS_NUMEROS),
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}>
                        <Money className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
              </GridItem>


              <GridItem xs={12} sm={12}>
                <CustomInput
                  labelText={
                    <span>
                      Teléfono
                    </span>
                  }
                  id="phone"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: !IS_ADMIN,
                    name: "phone",
                    id: "phone",
                    value: user.userAccount.phone,
                    onChange: event => this.handleInputTextUserAccount(event, PATTERN_PHONE_EXTENSIONS),
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}>
                        <Phone className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
              </GridItem>


              <GridItem xs={12} sm={12}>
                <FormControl
                  fullWidth
                  className={classes.selectFormControl}>
                  <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}>
                    Tipo de usuario
                        </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu
                    }}
                    classes={{
                      select: classes.select
                    }}
                    value={user.profile.id}
                    onChange={this.handleProfileInput}
                    inputProps={{
                      disabled: !IS_ADMIN,
                      name: "id",
                      id: "profile_id",

                    }}
                    startAdornment={(
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}>
                        <LocalOfferOutlined className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )}>
                    {this.getDataForSelectTypeProfile(listProfile)}
                  </Select>
                </FormControl>
              </GridItem>


              <GridItem xs={12} sm={12}>
                <br />
                <Autocomplete
                  freeSolo
                  id="costCenter"
                  name="costCenter"
                  disableClearable
                  options={listCostCenter}
                  onChange={(event, value) => this.handleInputTextUser(event, PATTERN_TEXTOS_NUMEROS, "costCenter", value)}
                  onInputChange={(event, value) => this.handleInputTextUser(event, PATTERN_TEXTOS_NUMEROS, "costCenter", value)}
                  value={user.costCenter}
                  inputValue={user.costCenter}
                  defaultValue={user.costCenter}
                  disabled={!IS_ADMIN}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={'Centro de costo'}
                      className={classes.margin}

                      fullWidth
                      name="costCenter"
                      id="costCenter"
                      InputProps={{
                        ...params.InputProps, type: 'costCenter', startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}>
                            <BusinessCenter className={classes.inputAdornmentIcon} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </GridItem>


              <GridItem xs={12} sm={12}>
                <CustomInput
                  labelText={
                    <span>
                      {BEACON_NAME}
                    </span>
                  }
                  id="firstname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: !IS_ADMIN,
                    name: "beaconsTracking",
                    id: "beaconsTracking",
                    value: user.beaconsTracking,
                    onChange: event => this.handleInputTextUser(event, PATTERN_BEACONS),
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}>
                        <WifiTethering className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
              </GridItem>


              <GridItem xs={12} sm={12}>
                <CustomInput
                  labelText={
                    <span>
                      Información adicional
                    </span>
                  }
                  id="firstname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: !IS_ADMIN,
                    name: "moreInformation",
                    id: "moreInformation",
                    value: user.moreInformation,
                    onChange: event => this.handleInputTextUser(event, PATTERN_TEXTOS_NUMEROS),
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className={classes.inputAdornment}>
                        <NotesOutlined className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
              </GridItem>
              {(user.profile.id === 2 && IS_ADMIN) && //solo un administrador tiene este control
                <GridItem xs={12} sm={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checkedIcon={
                          <Check className={classes.checkedIcon} />
                        }
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked
                        }}
                        checked={user.canMakeRequest}
                        onClick={() => this.handleToggleMakeRequest()}
                        disableRipple
                      />
                    }
                    label={"Puede hacer solicitud"}>
                  </FormControlLabel>
                </GridItem>
              }
              {user.id > 0 && IS_ADMIN &&
                <GridItem xs={12} sm={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checkedIcon={
                          <Check className={classes.checkedIcon} />
                        }
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{
                          checked: classes.checked
                        }}
                        checked={user.active}
                        onClick={() => this.handleToggleActive()}
                        disableRipple
                      />
                    }
                    label={"Activo"}>
                  </FormControlLabel>
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
    getListCostCenter: (onSuccess) => dispatch(getListCostCenter(onSuccess)),
  };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(UserAdmin));