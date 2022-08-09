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
import Warning from '@material-ui/icons/Warning';
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
import { configureAlert, getAlertById, setAlert } from 'modules/alerts/AlertActions.js';
import WaitDialog from "modules/components/WaitDialog.jsx";
// import { getListActiveTypeAlert } from 'modules/configurations/type_alerts/TypeAlertsActions.js';
import { getListActiveShowService } from 'modules/locations/ubications/UbicationActions.js';
import { getListActiveAsset } from 'modules/assets/AssetActions.js';


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

class AlertAdmin extends React.Component {
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
      this.props.getAlertById(urlParams.get("code"));
    }
    // this.props.getListActiveTypeAlert((resul) => {
    // });
    this.props.getListActiveShowService();
    this.props.getListActiveAsset((result) => {
    }); 

  };

  
  /**
   * Ejecuta las acciones al solicitar guardar
   * desde el botón de la aplicación
   */
  onClickSave = () => {
    var alert = this.props.alertState.data.alert;

    var message = "Debe ingresar todos los datos para poder continuar.";



    // message = "Debe seleccionar el tipo de alerta";
    // try {
    //   if (!(alert.typeAlert.id > 0)) {
    //     throw message;
    //   }
    // } catch (ex) {
    //   this.props.addMessage({ variant: "error", message: message });
    //   return
    // }

    message = "Debe seleccionar la ubicación";
    try {
      if (!(alert.ubication.id > 0)) {
        throw message;
      }
    } catch (ex) {
      this.props.addMessage({ variant: "error", message: message });
      return
    }

    message = "Debe seleccionar por lo menos un activo";
    try {
      if (alert.asset.length === 0) {
        throw message;
      }
    } catch (ex) {
      this.props.addMessage({ variant: "error", message: message });
      return
    }


    this.props.configureAlert(alert, (success) => {
      if (success === "OK") {
        this.props.history.push('/admin/alerts');
      }
    });
  }

  handleInputText = event => {
    console.log("handleInputText");
    console.log(event.target.value);
    var alert = this.props.alertState.data.alert;
    if (event.target.name == "asset")
    {
      // if (alert.asset.includes(event.target.value) === true)
      // {

      // }else{
      //   alert.asset.push(event.target.value)
      // }
      alert.asset = event.target.value;

    }else{

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
      dinamic = "alert" + tag;
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

    }
   

    this.props.setAlert(alert);
  };



  handleToggleActive() {
    var alert = this.props.alertState.data.alert;
    if (alert.active) {
      alert.active = 0;
    } else {
      alert.active = 1;
    }
    this.props.setAlert(alert);
  }


  /**
   * Retorna el contenido para llenar el select que permite
   * seleccionar los tipos de servicios
   */
  getDataForSelectTypeAlerts = (listTypeAlerts) => {
    var content = [];
    var classes = this.props;
    try {
      content.push(
        <MenuItem
          classes={{
            root: classes.selectMenuItem
          }}
          value={0}>
          Seleccione el tipo de alerta...
        </MenuItem>);

        listTypeAlerts.forEach(localTypeAlert => {
        content.push(<MenuItem value={localTypeAlert.id}>{localTypeAlert.name}</MenuItem>);
      })
    } catch (ex) { }
    return content;
  }

  getDataForSelectAsset = (listAssets) => {
    var content = [];
    var classes = this.props;
    try {
      content.push(
        <MenuItem
          classes={{
            root: classes.selectMenuItem
          }}
          value={0}>
          Seleccione el activo...
        </MenuItem>);

        listAssets.forEach(localAsset => {
        content.push(<MenuItem value={localAsset.id}>{localAsset.nameAsset}</MenuItem>);
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


  render() {
    let isActivityIndicatorShown = this.props.alertState.data.isActivityIndicatorShown;
    const { classes } = this.props;
    var listTypeAlert = [];
    var listUbication = []
    var listAsset = []


    // try {
    //   listTypeAlert = this.props.typeAlertState.data.listTypeAlert;
    // } catch (ex) { }
    // if (listTypeAlert === undefined || listTypeAlert === null) {
    //   listTypeAlert = [];
    // }

    try {
      listAsset = this.props.assetState.data.listAsset;
    } catch (ex) { }
    if (listAsset === undefined || listAsset === null) {
      listAsset = [];
    }

    try {
      listUbication = this.props.ubicationState.data.listUbication;
    } catch (ex) { }
    if (listUbication === undefined || listUbication === null) {
      listUbication = [];
    }

    var { alert } = this.props.alertState.data;
    if (alert === undefined) {
      return (<></>)
    }
    if (alert === null) {
      return (<></>)
    }
    console.log("alerta");
    console.log(alert);

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
                <Warning />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Alerta</h4>
            </CardHeader>
            <CardBody>

              <GridContainer>

              <GridItem xs={12} sm={12} className={classes.gridItem}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}>
                      Ubicación
                    </InputLabel>
                    <Select
                      id="ubication.id"
                      inputProps={{
                        name: "ubication.id",
                        id: "ubication.id",
                        value: alert.ubication.id,
                        onChange: event => this.handleInputText(event),
                      }}
                      startAdornment={(
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <PersonOutline className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )}>
                      {this.getDataForSelectUbication(listUbication)}
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
                      Activo
                    </InputLabel>
                    <Select
                      multiple="true"
                      id="asset"
                      inputProps={{
                        name: "asset",
                        id: "asset",
                        value: alert.asset,
                        onChange: event => this.handleInputText(event),
                      }}
                      startAdornment={(
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <PersonOutline className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )}>
                      {this.getDataForSelectAsset(listAsset)}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem xs={12} sm={12}>
                  <CustomInput
                    labelText={
                      <span>
                        Tiempo
                        </span>
                    }
                    id="time"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "time",
                      id: "time",
                      value: alert.time,
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

                {/* <GridItem xs={12} sm={12} className={classes.gridItem}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}>
                      Activo<noscript></noscript>
                    </InputLabel>
                    <Select
                      id="asset.id"
                      inputProps={{
                        name: "asset.id",
                        id: "asset.id",
                        value: alert.asset.id,
                        onChange: event => this.handleInputText(event),
                      }}
                      startAdornment={(
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <LocationSearchingIcon className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )}>
                      {this.getDataForSelectAssets(listAsset, "Seleccione el activo...")}
                    </Select>
                  </FormControl>
                </GridItem> */}

                {/* <GridItem xs={12} sm={12} className={classes.gridItem}>
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
                } */}

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
    // typeAlertState: state.typeAlertState,
    ubicationState: state.ubicationState,
    alertState: state.alertState,
    assetState: state.assetState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    configureAlert: (alert, onSuccess) => dispatch(configureAlert(alert, onSuccess)),
    getAlertById: (id) => dispatch(getAlertById(id)),
    setAlert: (alert) => dispatch(setAlert(alert)),
    getListActiveAsset: (onSuccess) => dispatch(getListActiveAsset(onSuccess)),
    // getListActiveTypeAlert: (onSuccess) => dispatch(getListActiveTypeAlert(onSuccess)),
    getListActiveShowService: () => dispatch(getListActiveShowService()),
    addMessage: (message) => dispatch(addMessage(message)),
  }
}; 

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(AlertAdmin));
