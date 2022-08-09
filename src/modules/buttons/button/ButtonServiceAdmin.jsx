// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import NotesOutlined from "@material-ui/icons/NotesOutlined";
import PersonOutline from '@material-ui/icons/PersonOutline';
import SaveIcon from '@material-ui/icons/Save';
import SettingsRemote from '@material-ui/icons/SettingsRemote';
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import AlertInfo from "components/AlertInfo/AlertInfo.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { addMessage } from 'layouts/MessagesActions';
import { findUsers } from 'modules/accounts/user/UserActions.js';
import { configureCallButton, getCallButtonById, setCallButton } from 'modules/buttons/button/ButtonServiceActions.js';
import { getHostspotListActive } from "modules/buttons/hotspot/HotspotActions.js";
import WaitDialog from "modules/components/WaitDialog.jsx";
import { getListActiveTypeService } from 'modules/configurations/type_services/TypeServicesActions.js';
import { getListActiveShowService } from 'modules/locations/ubications/UbicationActions.js';
import React from "react";
import { connect } from 'react-redux';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";



const style = {
  gridContainer: {
    padding: "0px 30px 30px 40px"
  },

  gridItem: {
    margin: "20px 0px 10px 0px"
  },

  headerGridItem: {
    margin: "30px 0px 0px 0px"
  },
  ...regularFormsStyle
};

class ButtonServiceAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AlertInfo: "",
      butonId: 0,
    };
  }

  componentDidMount = () => {
    var urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("code")) {
      this.props.getCallButtonById(urlParams.get("code"));
    }
    this.props.getListActiveTypeService((resul) => {
    });
    this.props.getListActiveShowService();
    this.props.getHostspotListActive((success) => { });
    this.props.findUsers();
  };

  
  /**
   * Ejecuta las acciones al solicitar guardar
   * desde el botón de la aplicación
   */
  onClickSave = () => {
    var callButton = this.props.buttonServiceState.data.callButton;

    var message = "Debe ingresar todos los datos para poder continuar.";

    message = "Se necesite que ingrese el código del botón con mínimo 3 caracteres";
    try {
      if(callButton.uuid===undefined){
        callButton["uuid"]=null;
      }else if (callButton.uuid.trim().length < 1) {
        callButton.uuid = null;
      }
    } catch (ex) {
      //this.props.addMessage({ variant: "error", message: message });
      //return
    }

    message = "Debe seleccionar el usuario solicitante";
    try {
      if (!(callButton.userAsigned.id > 0)) {
        throw message;
      }
    } catch (ex) {
      this.props.addMessage({ variant: "error", message: message });
      return
    }

    message = "Debe seleccionar el tipo de servicio";
    try {
      if (!(callButton.typeService.id > 0)) {
        throw message;
      }
    } catch (ex) {
      this.props.addMessage({ variant: "error", message: message });
      return
    }

    message = "Debe seleccionar la ubicación inicial";
    try {
      if (!(callButton.locationBegin.id > 0)) {
        throw message;
      }
    } catch (ex) {
      this.props.addMessage({ variant: "error", message: message });
      return
    }

    message = "Debe seleccionar la ubicación final";
    try {
      if (!(callButton.locationEnd.id > 0)) {
        throw message;
      }
    } catch (ex) {
      this.props.addMessage({ variant: "error", message: message });
      return
    }

    this.props.configureCallButton(callButton, (success) => {
      if (success === "OK") {
        this.props.history.push('/admin/buttons');
      }
    });
  }

  handleInputText = event => {
    var callButton = this.props.buttonServiceState.data.callButton;
    var fields = event.target.name;
    var dinamic = "";
    if (fields.indexOf(".") > -1) {
      fields = event.target.name.split(".");
    } else {
      fields = [event.target.name];
    }
    var pos = fields.length - 1;
    var upPos = 0;
    var tag = "@@*";
    dinamic = "callButton" + tag;
    while (pos > -1) {
      var local = dinamic.replace(tag, "[\"" + fields[upPos] + "\"]");
      eval(local + "={}");
      if (pos === 0) {
        eval(local + "='" + event.target.value + "'");
      }
      dinamic = dinamic.replace(tag, "." + fields[upPos] + tag);
      pos--;
      upPos++;
    }
    //callButton[event.target.name] = event.target.value;
    this.props.setCallButton(callButton);
  };
  handleToggleModeUsed() {
    var callButton = this.props.buttonServiceState.data.callButton;
    if (callButton.modeUsed) {
      callButton.modeUsed = 0;
    } else {
      callButton.modeUsed = 1;
    }
    this.props.setCallButton(callButton);
  }

  handleToggleActive() {
    var callButton = this.props.buttonServiceState.data.callButton;
    if (callButton.active) {
      callButton.active = 0;
    } else {
      callButton.active = 1;
    }
    this.props.setCallButton(callButton);
  }

  getDataForHotspot = (listHotspotCallButton) => {
    var content = [];
    var classes = this.props;
    try {
      content.push(
        (<MenuItem
          classes={{
            root: classes.selectMenuItem
          }}
          value={0}>
          Seleccione el receptor del botón...
        </MenuItem>));
      listHotspotCallButton.forEach(localHotspot => {
        content.push(<MenuItem value={localHotspot}>{localHotspot.hotspot}</MenuItem>);
      })
    } catch (ex) { }
    return content;
  }
  /**
   * Retorna el contenido para llenar el select que permite
   * seleccionar los tipos de servicios
   */
  getDataForSelectTypeServices = (listTypeServices) => {
    var content = [];
    var classes = this.props;
    try {
      content.push(
        <MenuItem
          classes={{
            root: classes.selectMenuItem
          }}
          value={0}>
          Seleccione el tipo de servicio...
        </MenuItem>);

      listTypeServices.forEach(localTypeService => {
        content.push(<MenuItem value={localTypeService.id}>{localTypeService.serviceName}</MenuItem>);
      })
    } catch (ex) { }
    return content;
  }

  /**
   * Retorna el contenido de las ubicaciones para
   * llenar el listado
   */
  getDataForSelectUbication = (listUbication, title) => {
    var content = [];
    var classes = this.props;
    try {
      content.push(
        <MenuItem
          classes={{
            root: classes.selectMenuItem
          }}
          value={0}>
          {title}
        </MenuItem>);
      listUbication.forEach(localUbication => {
        content.push(<MenuItem value={localUbication.id}>{localUbication.nameUbication}</MenuItem>);
      })
    } catch (ex) { }
    return content;
  }

  /**
   * Retorna los datos para llenar el listado de los
   * transportistas
   */
  getDataForSelectUser = (listUser) => {
    var content = [];
    var classes = this.props;
    try {
      content.push(
        (<MenuItem
          classes={{
            root: classes.selectMenuItem
          }}
          value={0}>
          Seleccione el usuario solicitante...
        </MenuItem>));
      listUser.forEach(localuser => {
        if (localuser.active === 1) {
          content.push(<MenuItem value={localuser.id}>{localuser.userAccount.nameUser}</MenuItem>);
        }
      })
    } catch (ex) { }
    return content;
  }

  render() {
    let isActivityIndicatorShown = this.props.typeServiceState.data.isActivityIndicatorShown;
    const { classes } = this.props;
    var listTypeService = [];
    var listUbication = []
    var listHotspotCallButton = [];
    var userList = [];

    try {
      listTypeService = this.props.typeServiceState.data.listTypeService;
    } catch (ex) { }
    if (listTypeService === undefined || listTypeService === null) {
      listTypeService = [];
    }

    try {
      listUbication = this.props.ubicationState.data.listUbication;
    } catch (ex) { }
    if (listUbication === undefined || listUbication === null) {
      listUbication = [];
    }

    try {
      listHotspotCallButton = this.props.hotspotState.data.listHotspotCallButton;
    } catch (ex) { }
    if (listHotspotCallButton === undefined || listHotspotCallButton === null) {
      listHotspotCallButton = [];
    }

    try {
      userList = this.props.userState.data.listResultSetUser.userSystemAccount;
    } catch (ex) {
      userList = [];
    }

    var { callButton } = this.props.buttonServiceState.data;
    if (callButton === undefined) {
      return (<></>)
    }
    if (callButton === null) {
      return (<></>)
    }

    return (
      <>
        <GridItem xs={12}>
          {isActivityIndicatorShown &&
            <WaitDialog text={this.state.textAlertInfo} />
          }
          <AlertInfo text={this.state.textAlertInfo} open={this.state.openAlertInfo} onDoneClick={this.hideaAlertInfo} />
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="info">
                <SettingsRemote />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Botón</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>

                <GridItem xs={12} sm={12}>
                  <CustomInput
                    labelText={
                      <span>
                        Código del botón
                        </span>
                    }
                    id="uuid"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "uuid",
                      id: "uuid",
                      value: callButton.uuid,
                      onChange: event => this.handleInputText(event),
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

                {/*
                <GridItem xs={12} sm={12} className={classes.gridItem}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}>
                      Receptor del botón
                    </InputLabel>
                    <Select
                      id="hotspotCallButton"
                      inputProps={{
                        name: "hotspotCallButton",
                        id: "hotspotCallButton",
                        value: this.props.buttonServiceState.data.callButton.hotspotCallButton,
                        onChange: event => this.handleInputText(event),
                      }}
                      startAdornment={(
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <PersonOutline className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )}>
                      {this.getDataForHotspot(listHotspotCallButton)}
                    </Select>
                  </FormControl>
                </GridItem>
                      */}

                <GridItem xs={12} sm={12} className={classes.gridItem}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}>
                      Usuario solicitante
                    </InputLabel>
                    <Select
                      id="userAsigned.id"
                      inputProps={{
                        name: "userAsigned.id",
                        id: "userAsigned.id",
                        value: callButton.userAsigned.id,
                        onChange: event => this.handleInputText(event),
                      }}
                      startAdornment={(
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <PersonOutline className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )}>
                      {this.getDataForSelectUser(userList)}
                    </Select>
                  </FormControl>
                </GridItem>


                <GridItem xs={12} sm={12} className={classes.gridItem}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}>
                      Tipo de servicio
                    </InputLabel>
                    <Select
                      id="typeService.id"
                      inputProps={{
                        name: "typeService.id",
                        id: "typeService.id",
                        value: callButton.typeService.id,
                        onChange: event => this.handleInputText(event),
                      }}
                      startAdornment={(
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <BookmarkBorder className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )}>
                      {this.getDataForSelectTypeServices(listTypeService)}
                    </Select>
                  </FormControl>
                </GridItem>


                <GridItem xs={12} sm={12} className={classes.gridItem}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}>
                      Ubicación inicial
                    </InputLabel>
                    <Select
                      id="locationBegin.id"
                      inputProps={{
                        name: "locationBegin.id",
                        id: "locationBegin.id",
                        value: callButton.locationBegin.id,
                        onChange: event => this.handleInputText(event),
                      }}
                      startAdornment={(
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <LocationSearchingIcon className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )}>
                      {this.getDataForSelectUbication(listUbication, "Seleccione la ubicación inicial...")}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem xs={12} sm={12} className={classes.gridItem}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}>
                      Ubicación final
                    </InputLabel>
                    <Select
                      id="locationEnd.id"
                      inputProps={{
                        name: "locationEnd.id",
                        id: "locationEnd.id",
                        value: callButton.locationEnd.id,
                        onChange: event => this.handleInputText(event),
                      }}
                      startAdornment={(
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <LocationSearchingIcon className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )}>
                      {this.getDataForSelectUbication(listUbication, "Seleccione la ubicación final...")}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem xs={12} sm={12}>
                  <CustomInput
                    labelText={
                      <span>
                        Información adicional
                        </span>
                    }
                    id="moreInformation"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "moreInformation",
                      id: "moreInformation",
                      value: callButton.moreInformation,
                      onChange: event => this.handleInputText(event),
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

                {callButton.id > 0 &&
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
                          checked={callButton.active}
                          onClick={() => this.handleToggleActive()}
                          disableRipple
                        />
                      }
                      label={"Activo"}>
                    </FormControlLabel>
                  </GridItem>
                }

                {callButton.id > 0 &&
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
                          checked={callButton.modeUsed}
                          onClick={() => this.handleToggleModeUsed()}
                          disableRipple
                        />
                      }
                      label={callButton.modeUsed === 1 ? "En servicio" : "Modo configuración"}>
                    </FormControlLabel>
                  </GridItem>
                }

                <GridItem xs={12} sm={12} className={classes.gridItem}>
                  <Button
                    onClick={this.onClickSave}
                    color="success"
                    round><SaveIcon />
                    Guardar
                 </Button>
                </GridItem>

              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    typeServiceState: state.typeServiceState,
    ubicationState: state.ubicationState,
    buttonServiceState: state.buttonServiceState,
    hotspotState: state.hotspotState,
    userState: state.userState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    configureCallButton: (callButton, onSuccess) => dispatch(configureCallButton(callButton, onSuccess)),
    getCallButtonById: (id) => dispatch(getCallButtonById(id)),
    setCallButton: (callButton) => dispatch(setCallButton(callButton)),
    getHostspotListActive: (onSuccess) => dispatch(getHostspotListActive(onSuccess)),
    getListActiveTypeService: (onSuccess) => dispatch(getListActiveTypeService(onSuccess)),
    getListActiveShowService: () => dispatch(getListActiveShowService()),
    findUsers: () => dispatch(findUsers(undefined, undefined, undefined, 10000, 18, undefined, undefined)),
    addMessage: (message) => dispatch(addMessage(message)),
  }
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(ButtonServiceAdmin));
