// @material-ui/core components
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import CancelIcon from '@material-ui/icons/Cancel';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import SaveIcon from '@material-ui/icons/Save';
import StopIcon from '@material-ui/icons/Stop';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import AlertInfo from "components/AlertInfo/AlertInfo.jsx";
import Badge from "components/Badge/Badge.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
// core components
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { addMessage } from 'layouts/MessagesActions';
import { endCarrierBreakShift,endCarrierAbsenceShift,carrierAbsenceShift, carrierBreakShift, carrierEndShift, carrierStartShift, getCarrierById } from "modules/carriers/carrierActions.js";
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { getActiveListTypeAbsence } from "modules/configurations/type_absence/TypeAbsenceActions.js";
import { getActiveListTypeBreak } from "modules/configurations/type_break/TypeBreakActions.js";
import { MILI_SECONDS_REFRESH_LIST, NAME_OPERATOR } from "modules/utils/ApiUtil.js";
import React from "react";
import { connect } from 'react-redux';
import {red} from "@material-ui/core/colors";

const exit = (<></>);
const typeBreakByDefault = {
  id: 0,
  breakName: "Seleccione el tipo de receso...",
  active: 1
}
const typeAbsenceByDefault = {
  id: 0,
  absenceName: "Seleccione el tipo de ausencia...",
  active: 1
}
const timeTypeBreakByDefault = 0;
const timeTypeAbsenceByDefault = 0;

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
var prevNowPlaying = null;
class CarrierAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActivityIndicatorShown: false,
      checked: [0],
      openAlertInfo: false,
      textAlertInfo: "",
      typeBreak: typeBreakByDefault,
      typeAbsence: typeAbsenceByDefault,
      timeTypeBreak: timeTypeBreakByDefault,
      timeTypeAbsence: timeTypeAbsenceByDefault
    };
    this.activeIndicatorShown();
    this.getDataCarrier();
  }
  componentWillUnmount() {
    if (prevNowPlaying) {
      clearInterval(prevNowPlaying);
    }
    prevNowPlaying = null;
  }

  componentDidMount = () => {
    this.props.getActiveListTypeAbsence((success) => {

    });
    this.props.getActiveListTypeBreak((success) => {

    })
    if (prevNowPlaying) {
      clearInterval(prevNowPlaying);
      prevNowPlaying = null;
    }
    prevNowPlaying = setInterval(() => {
      this.getDataCarrier();
    }, MILI_SECONDS_REFRESH_LIST);
  }

  activeIndicatorShown = () => {
    this.setState({ isActivityIndicatorShown: true });
  }

  inActiveIndicatorShown = () => {
    this.setState({ isActivityIndicatorShown: false });
  }
  getDataCarrier = () => {
    this.props.getCarrierById((success) => {
      this.inActiveIndicatorShown();
    });
  }

  formatDate = (pData, pSeparator = '/') => {
    var date = pData;
    if (Object.prototype.toString.call(pData) !== '[object Date]') {
      date = new Date(pData);
    }
    if (isNaN(date)) {
      return '';
    }
    var result = '';
    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    result = +
      year + pSeparator + month + pSeparator + day + " " + hour + ":" + minute;
    return result;
  }

  getTimeFromInfo = (pData, pDataActual = undefined) => {
    var date = pData;
    var result = "--"
    if (pData < 1000) {
      return result;
    }
    if (Object.prototype.toString.call(pData) !== '[object Date]') {
      date = new Date(pData);
    }
    if (isNaN(date)) {
      return result;
    }
    //Por si se necesita una fecha de referencia
    //que es diferente a la fecha actual
    var actualDate = new Date();
    if (pDataActual === null) {
      pDataActual = undefined;
    }
    if (pDataActual !== undefined) {
      actualDate = new Date(pDataActual);
    }


    if (actualDate < date) {
      return result;
    }
    var miliseconds = actualDate - date;

    const minutesMiliseconds = (60 * 1000);
    const hourMiliseconds = (60 * minutesMiliseconds);
    const dayMiliseconds = (24 * hourMiliseconds);

    var days = (miliseconds / dayMiliseconds) >> 0;
    miliseconds = miliseconds - (days * dayMiliseconds);

    var hours = (miliseconds / hourMiliseconds) >> 0;
    miliseconds = miliseconds - (hours * hourMiliseconds);

    var minutes = (miliseconds / minutesMiliseconds) >> 0;
    result = "";
    if (days === 1) {
      result = days + " día ";
    }
    if (days > 1) {
      result = days + " días ";
    }
    if (hours === 1) {
      result += hours + " hora ";
    }
    if (hours > 1) {
      result += hours + " horas ";
    }
    if (minutes === 1) {
      result += minutes + " minuto ";
    }
    if (minutes > 1) {
      result += minutes + " minutos ";
    }
    if (result === "") {
      result = "--";
    }
    return result;
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

  hideAlertInactive = () => {
    this.setState({
      alertInactive: null
    });
  }

  validateContent = (data) => {
    var result = false;
    if (data === undefined) {
      return result;
    }
    if (data === null) {
      return result;
    }
    if (data === {}) {
      return result;
    }
    try {
      var local = data.state;
      if (local === undefined) {
        return result
      }
      if (local === null) {
        return result
      }
    } catch (ex) {
      return result;
    }
    return true;
  }

  getStateColor = (data) => {
    var result = "info";
    if (!this.validateContent(data)) {
      return result;
    }
    try {
      switch (data.state) {
        case 0:
          result = "success";
          break;
        case 1:
          result = "info";
          break;
        case 2:
          result = "warning";
          break;
        case 3:
          result = "info";
          break;
        case 4:
          result = "warning";
          break;
        case 5:
          result = "warning";
          break;
        case 6:
          result = "success";
          break;
        default:
          result = "info";
          break;
      }
    } catch (ex) {
      result = "info";
    }
    return result;
  }

  getStateName = (data) => {
    console.log(data)
    var result = "Desconocido";
    if (!this.validateContent(data)) {
      return result;
    }
    try {
      switch (data.state) {
        case 0:
          result = "Turno Iniciado";
          break;
        case 1:
          result = "Turno Terminado";
          break;
        case 2:
          result = "En receso";
          break;
        case 3:
          result = "Ausente";
          break;
        case 4:
          result = "Ocupado en la solicitud ";
          break;
        case 5:
          result = "Respondiendo asignación ";
          
          break;
        case 6:
          result = "Disponible";
          break;
        default:
          result = "Desconocido 3";
          break;
      }
    } catch (ex) {
      result = "Desconocido 4";
    }
    return result;
  }

  showAlertTypeAbsence = (data) => {
    this.setState({
      alertInactive: (
        <React.Fragment>
          <Dialog
            open={true}
            onClose={this.hideAlertInactive}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {`Ausentarse`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {'¿Está seguro que quiere ausentarse ?'}
                <br />
                {this.renderListTypeAbsence(data)}
                <br />
                {this.renderTimeTypeAbsence(data)}
              </DialogContentText>
            </DialogContent>
            <div align="center">
              <Button
                style={{ width: 120 }}
                onClick={this.hideAlertInactive}
                color="info"
                round><CancelIcon />
                Cancelar
              </Button>
              <Button
                style={{ width: 120 }}
                onClick={(event) => {
                  this.onConfirmTypeAbsence(data);
                }}
                color="success"
                round><SaveIcon />
                Aceptar
              </Button>
            </div>
          </Dialog>
        </React.Fragment>
      )
    });
  };

  onConfirmTypeAbsence = (data) => {
    var typeAbsence = this.state.typeAbsence;
    var timeTypeAbsence = this.state.timeTypeAbsence;

    var message = "Por favor seleccione el tipo de ausencia";

    if (typeAbsence === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (typeAbsence === null) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (typeAbsence.id < 1) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    message = "Por favor seleccione el tiempo de ausencia";
    if (timeTypeAbsence === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (timeTypeAbsence === null) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (timeTypeAbsence < 1) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    this.activeIndicatorShown();
    this.hideAlertInactive();
    this.setState({ isActivityIndicatorShown: true }, () => {
      this.props.carrierAbsenceShift((success) => {
        this.getDataCarrier();
      }, typeAbsence.id, timeTypeAbsence);
    });
  }
  onClickButtonTypeAbsence = (data) => {
    this.setState({ typeAbsence: typeAbsenceByDefault }, () => {
      this.showAlertTypeAbsence(data);
    })
  }
  handleTypeAbsenceInput = (event, data) => {
    var typeAbsence = event.target.value;
    this.setState({ typeAbsence }, () => {
      this.showAlertTypeAbsence(data);
    });
  }
  handleTimeTypeAbsenceInput = (event, data) => {
    var timeTypeAbsence = event.target.value;
    this.setState({ timeTypeAbsence }, () => {
      this.showAlertTypeAbsence(data);
    });
  }
  getDataForSelectTypeAbsence = (listTypeAbsence) => {
    var content = [];
    try {
      content.push(
        <MenuItem
          value={typeAbsenceByDefault}>
          {typeAbsenceByDefault.absenceName}
        </MenuItem>);
      listTypeAbsence.forEach(localTypeAbsence => {
        content.push(<MenuItem value={localTypeAbsence}>{localTypeAbsence.absenceName}</MenuItem>);
      })
    } catch (ex) { }
    return content;
  }
  renderTimeTypeAbsence = (data) => {
    var classes = this.props;
    return (
      <FormControl
        fullWidth
        className={classes.selectFormControl}>
        <InputLabel
          htmlFor="simple-select"
          className={classes.selectLabel}>
          Tiempo de la ausencia
          </InputLabel>
        <Select
          value={this.state.timeTypeAbsence}
          onChange={(event) => { this.handleTimeTypeAbsenceInput(event, data) }}
          startAdornment={(
            <InputAdornment
              position="start"
              className={classes.inputAdornment}>
              <BookmarkBorder className={classes.inputAdornmentIcon} />
            </InputAdornment>
          )}>
          <MenuItem value={0}>{"Seleccione el tiempo..."}</MenuItem>
          <MenuItem value={15}>{"15 minutos"}</MenuItem>
          <MenuItem value={30}>{"30 minutos"}</MenuItem>
          <MenuItem value={45}>{"45 minutos"}</MenuItem>
          <MenuItem value={60}>{"1 hora"}</MenuItem>
          <MenuItem value={90}>{"1 hora y 30 minutos"}</MenuItem>
          <MenuItem value={120}>{"2 horas"}</MenuItem>
          <MenuItem value={150}>{"más de 2 horas"}</MenuItem>
        </Select>
      </FormControl>
    );
  }
  renderListTypeAbsence = (data) => {
    var listTypeAbsence = this.props.typeAbsenceState.data.listTypeAbsence;
    if (listTypeAbsence === undefined) {
      listTypeAbsence = [];
    }
    if (listTypeAbsence === null) {
      listTypeAbsence = [];
    }
    var classes = this.props;
    return (
      <FormControl
        fullWidth
        className={classes.selectFormControl}>
        <InputLabel
          htmlFor="simple-select"
          className={classes.selectLabel}>
          Tipo de ausencia
          </InputLabel>
        <Select
          value={this.state.typeAbsence}
          onChange={(event) => { this.handleTypeAbsenceInput(event, data) }}
          startAdornment={(
            <InputAdornment
              position="start"
              className={classes.inputAdornment}>
              <BookmarkBorder className={classes.inputAdornmentIcon} />
            </InputAdornment>
          )}>
          {this.getDataForSelectTypeAbsence(listTypeAbsence)}
        </Select>
      </FormControl>
    );
  }
  renderAbsence = (data, withButton) => {
    if (!this.validateContent(data)) {
      return exit;
    }
    switch (data.state) {
      case 1:
      case 3:
      case 4:
        return exit;
      default:
        break;
    }
    return (
      <Button style={{ width: withButton }}
        onClick={(event) => { this.onClickButtonTypeAbsence(data) }}
        color="info"
        round><ExitToAppIcon />
        AUSENTAR
        </Button>
    );
  }

// ok
  showAlertTypeBreak = (data) => {
    this.setState({
      alertInactive: (
        <React.Fragment>
          <Dialog
            open={true}
            onClose={this.hideAlertInactive}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {`Tomar un receso`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {'¿Está seguro que quiere tomar un receso?'}
                <br />
                {this.renderListTypeBreak(data)}
                <br />
                {this.renderTimeTypeBreak(data)}
              </DialogContentText>
            </DialogContent>
            <div align="center">
              <Button
                style={{ width: 120 }}
                onClick={this.hideAlertInactive}
                color="info"
                round><CancelIcon />
                Cancelar
              </Button>
              <Button
                style={{ width: 120 }}
                onClick={(event) => {
                  this.onConfirmTypeBreak(data);
                }}
                color="success"
                round><SaveIcon />
                Aceptar
              </Button>
            </div>
          </Dialog>
        </React.Fragment>
      )
    });
  };

  //ok

  onConfirmTypeBreak = (data) => {
    var typeBreak = this.state.typeBreak;
    var timeTypeBreak = this.state.timeTypeBreak;
    var message = "Por favor seleccione el tipo de receso";
    var message1 = "Por favor seleccione el tiempo del receso";

    if (typeBreak === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (typeBreak === null) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (typeBreak.id < 1) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (timeTypeBreak === undefined) {
      this.props.addMessage({ variant: "error", message: message1 });
      return;
    }
    if (timeTypeBreak === null) {
      this.props.addMessage({ variant: "error", message: message1 });
      return;
    }
    if (timeTypeBreak < 1) {
      this.props.addMessage({ variant: "error", message: message1 });
      return;
    }
    this.hideAlertInactive();
    this.setState({ isActivityIndicatorShown: true }, () => {
      this.props.carrierBreakShift((success) => {
        this.getDataCarrier();
      }, typeBreak.id, timeTypeBreak);
    });
  }
  //ok
  onClickButtonTypeBreak = (data) => {
    this.setState({ typeBreak: typeBreakByDefault, timeTypeBreak: timeTypeBreakByDefault }, () => {
      this.showAlertTypeBreak(data);
    })
  }
  //ok
  handleTypeBreakInput = (event, data) => {
    var typeBreak = event.target.value;
    this.setState({ typeBreak }, () => {
      this.showAlertTypeBreak(data);
    });
  }

  //??
  handleTimeTypeBreakInput = (event, data) => {
    var timeTypeBreak = event.target.value;
    this.setState({ timeTypeBreak }, () => {
      this.showAlertTypeBreak(data);
    });
  }

  //ok
  getDataForSelectTypeBreak = (listTypeBreak) => {
    var content = [];
    try {
      content.push(
        <MenuItem
          value={typeBreakByDefault}>
          {typeBreakByDefault.breakName}
        </MenuItem>);
      listTypeBreak.forEach(localTypeBreak => {
        content.push(<MenuItem value={localTypeBreak}>{localTypeBreak.breakName}</MenuItem>);
      })
    } catch (ex) { }
    return content;
  }
  //?
  renderTimeTypeBreak = (data) => {
    var classes = this.props;
    return (
      <FormControl
        fullWidth
        className={classes.selectFormControl}>
        <InputLabel
          htmlFor="simple-select"
          className={classes.selectLabel}>
          Tiempo del receso
          </InputLabel>
        <Select
          value={this.state.timeTypeBreak}
          onChange={(event) => { this.handleTimeTypeBreakInput(event, data) }}
          startAdornment={(
            <InputAdornment
              position="start"
              className={classes.inputAdornment}>
              <BookmarkBorder className={classes.inputAdornmentIcon} />
            </InputAdornment>
          )}>
          <MenuItem value={0}>{"Seleccione el tiempo..."}</MenuItem>
          <MenuItem value={5}>{"5 Minutos"}</MenuItem>
          <MenuItem value={10}>{"10 minutos"}</MenuItem>
          <MenuItem value={15}>{"15 minutos"}</MenuItem>
          <MenuItem value={20}>{"20 minutos"}</MenuItem>
          <MenuItem value={25}>{"25 minutos"}</MenuItem>
          <MenuItem value={30}>{"30 minutos"}</MenuItem>
          <MenuItem value={35}>{"35 minutos"}</MenuItem>
          <MenuItem value={40}>{"40 minutos"}</MenuItem>
          <MenuItem value={45}>{"45 minutos"}</MenuItem>
        </Select>
      </FormControl>
    );
  }

  //ok
  renderListTypeBreak = (data) => {

    var listTypeBreak = this.props.typeBreakState.data.listTypeBreak;
    if (listTypeBreak === undefined) {
      listTypeBreak = [];
    }
    if (listTypeBreak === null) {
      listTypeBreak = [];
    }
    var classes = this.props;
    return (
      <FormControl
        fullWidth
        className={classes.selectFormControl}>
        <InputLabel
          htmlFor="simple-select"
          className={classes.selectLabel}>
          Tipo de receso
          </InputLabel>
        <Select
          value={this.state.typeBreak}
          onChange={(event) => { this.handleTypeBreakInput(event, data) }}
          startAdornment={(
            <InputAdornment
              position="start"
              className={classes.inputAdornment}>
              <BookmarkBorder className={classes.inputAdornmentIcon} />
            </InputAdornment>
          )}>
          {this.getDataForSelectTypeBreak(listTypeBreak)}
        </Select>
      </FormControl>
    );
  }
  /**
   */
  renderBreak = (data, withButton) => {
    if (!this.validateContent(data)) {
      return exit;
    }
    switch (data.state) {
      case 1:
      case 2:
      case 3:
      case 4:
        return exit;
      default:
        break;
    }
    return (
      <Button style={{ width: withButton }}
        onClick={(event) => { this.onClickButtonTypeBreak(data) }}
        color="warning"
        round><PauseCircleOutlineIcon />
        RECESO
        </Button>
    );
  }
  /**
  * 
  */
  confirmEnd =(data)=>{
    this.setState({
      alertInactive: (
          <React.Fragment>
            <Dialog
                open={true}
                onClose={this.hideAlertInactive}
                aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                {'¿Realmente desea terminar su turno?'}
              </DialogTitle>
              <div align="center">
                <Button
                    style={{width: 110, marginRight:6}}
                    onClick={this.hideAlertInactive}
                    color="rose"
                    round><CancelIcon/>
                  regresar
                </Button>
                <Button
                    style={{width: 110}}
                    onClick={this.onClickEnd}
                    color="success"
                    round><CancelIcon/>
                  confirmar
                </Button>
              </div>
            </Dialog>
          </React.Fragment>
      )
    });
  }

  onClickEnd = (data) => {
    this.setState({ isActivityIndicatorShown: true }, () => {
      this.props.carrierEndShift((success) => {
        this.getDataCarrier();
        this.hideAlertInactive();
      });
    });
  }
  /**
   */
  renderEnd = (data, withButton) => {
    if (!this.validateContent(data)) {
      return exit;
    }
    switch (data.state) {
      case 1:
      case 2:
      case 3:
      case 4:
        return exit;
      default:
        break;
    }
    return (
      <Button style={{ width: withButton }}
        onClick={(event) => { this.confirmEnd(data) }}
        color="info"
        round><StopIcon />
        TERMINAR
        </Button>
    );
  }
  /**
   * 
   */
   onClickEndBreak = (data) => {
    this.setState({ isActivityIndicatorShown: true }, () => {
      this.props.endCarrierBreakShift((success) => {
        this.getDataCarrier();
      });
    });
  }
  /**
   */
   renderEndBreak = (data, withButton) => {
    if (!this.validateContent(data)) {
      return exit;
    }
    switch (data.state) {
      case 0:
      case 1:
      case 3:
      case 4:
      case 5:
      case 6:
        return exit;
      default:
        break;
    }
    return (
      <Button style={{ width: withButton }}
        onClick={(event) => { this.onClickEndBreak(data) }}
        color="info"
        round><StopIcon />
        TERMINAR RECESO
        </Button>
    );
  }
  /**
   * 
   */
  onClickEndAbsence = (data) => {
    this.setState({ isActivityIndicatorShown: true }, () => {
      this.props.endCarrierAbsenceShift((success) => {
        this.getDataCarrier();
      });
    });
  }
  /**
   */
   renderEndAbsence = (data, withButton) => {
    if (!this.validateContent(data)) {
      return exit;
    }
    switch (data.state) {
      case 0:
      case 1:
      case 2:
      case 4:
      case 5:
      case 6:
        return exit;
      default:
        break;
    }
    return (
      <Button style={{ width: withButton }}
        onClick={(event) => { this.onClickEndAbsence(data) }}
        color="info"
        round><StopIcon />
        TERMINAR AUSENCIA
        </Button>
    );
  }
  /**
   * 
   */
  onClickStart = (data) => {
    this.setState({ isActivityIndicatorShown: true }, () => {
      this.props.carrierStartShift((success) => {
        this.activeIndicatorShown();
        this.getDataCarrier();
      });
    });
  }
  /**
   */
  renderStart = (data, withButton) => {
    if (!this.validateContent(data)) {
      return exit;
    }
    switch (data.state) {
      case 0:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return exit;
      default:
        break;
    }
    return (
      <Button style={{ width: withButton }}
        onClick={(event) => { this.onClickStart(data) }}
        color="success"
        round><PlayCircleFilledWhiteIcon />
        INICIAR
        </Button>
    );
  }

  //Devuelve el estado RECESO y tiempo
  renderTimeBreak = (carrierLocation, gunnarStyle, gunnarStyle2) => {
    if (!this.validateContent(carrierLocation)) {
      return exit;
    }
    if (carrierLocation.state !== 2) {
      return exit;
    }
    return (
        <TableRow>
          <TableCell style={gunnarStyle}>
            <b>Fin receso:</b>
          </TableCell>
          <TableCell style={gunnarStyle2}>
            {this.getTimeFromInfo(new Date(), carrierLocation.alertTimeout)}
          </TableCell>
        </TableRow>
      )
    }
  

  renderTimeAbsence = (carrierLocation, gunnarStyle, gunnarStyle2) => {
    if (!this.validateContent(carrierLocation)) {
      return exit;
    }
    if (carrierLocation.state !== 3) {
      return exit;
    }
      return (
        <TableRow>
          <TableCell style={gunnarStyle}>
            <b>Fin ausencia:</b>
          </TableCell>
          <TableCell style={gunnarStyle2}>
            {this.getTimeFromInfo(new Date(), carrierLocation.alertTimeout)}
          </TableCell>
        </TableRow>
      )
    }
  

  renderTimeEnd = (data, gunnarStyle, gunnarStyle2) => {
    if (data === undefined) {
      return exit;
    }
    if (data === null) {
      return exit;
    }
    if (data < 1000) {
      return exit;
    }
    return (
      <TableRow>
        <TableCell style={gunnarStyle}>
          <b>Fin:</b>
        </TableCell>
        <TableCell style={gunnarStyle2}>
          {this.formatDate(data)}
        </TableCell>
      </TableRow>
    )
  }

  //ok ?
  renderActions = (carrierLocation, withButton) => {
    var contentStart = this.renderStart(carrierLocation, withButton);
    var contentEnd = this.renderEnd(carrierLocation, withButton);
    var contentBreak = this.renderBreak(carrierLocation, withButton);
    var contentAbsence = this.renderAbsence(carrierLocation, withButton);
    var contentEndBreak = this.renderEndBreak(carrierLocation, withButton);
    var contentEndAbsence = this.renderEndAbsence(carrierLocation, withButton);
    if (contentStart === exit &&
      contentEnd === exit &&
      contentBreak === exit &&
      contentAbsence === exit &&
      contentEndBreak === exit &&
      contentEndAbsence === exit
    ) {
      return exit;
    }
    return (
      <>
        {this.renderStart(carrierLocation, withButton)}
        {this.renderEnd(carrierLocation, withButton)}
        {this.renderBreak(carrierLocation, withButton)}
        {this.renderAbsence(carrierLocation, withButton)}
        {this.renderEndBreak(carrierLocation, withButton)}
        {this.renderEndAbsence(carrierLocation, withButton)}
      </>
    )
  }
  render() {
    const gunnarStyle = { height: "10px", padding: "1px 1px 1px 10px" };
    const gunnarStyle2 = { height: "10px", padding: "1px 1px 1px 3px", width: "100%" };
    const divRounded2 = { borderRadius: " 5px 5px 5px 5px" };
    const withButton = 150;
    const { classes } = this.props;
    var isActivityIndicatorShown = this.state.isActivityIndicatorShown;
    var { carrierLocation } = this.props.carrierState.data;
    if (!this.validateContent(carrierLocation)) {
      return exit;
    }
    return (
      <GridItem xs={12}>
        {isActivityIndicatorShown &&
          <WaitDialog text={this.state.textAlertInfo} />
        }
        <AlertInfo text={this.state.textAlertInfo} open={this.state.openAlertInfo} onDoneClick={this.hideaAlertInfo} />
        {this.state.alertInactive}
        <Card>
          <CardHeader color="info" icon>
            <CardIcon color="info">
              <TrackChangesIcon />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Turno</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  //fixedHeader={false}
                  style={{ width: "100%", tableLayout: "auto" }}>
                  <TableBody>
                    <div style={divRounded2}>

                      <TableRow>
                        <TableCell style={gunnarStyle}>
                          <b>{'El ' + NAME_OPERATOR}:</b>
                        </TableCell>
                        <TableCell style={gunnarStyle2}>
                          {` ${sessionStorage["name"]}`}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell style={gunnarStyle}>
                          <b>Estado:</b>
                        </TableCell>
                        <TableCell style={gunnarStyle2}>
                          <Badge
                            color={this.getStateColor(carrierLocation)}>
                            {this.getStateName(carrierLocation)}
                          </Badge>
                        </TableCell>
                      </TableRow>

                      {this.renderTimeBreak(carrierLocation, gunnarStyle, gunnarStyle2)}
                      {this.renderTimeAbsence(carrierLocation, gunnarStyle, gunnarStyle2)}


                      <TableRow>
                        <TableCell style={gunnarStyle}>
                          <b>Inicio:</b>
                        </TableCell>
                        <TableCell style={gunnarStyle2}>
                          {this.formatDate(carrierLocation.dateStartsShift)}
                        </TableCell>
                      </TableRow>

                      {this.renderTimeEnd(carrierLocation.dateEndsShift, gunnarStyle, gunnarStyle2)}

                      <TableRow>
                        <TableCell style={gunnarStyle}>
                          <b>Tiempo:</b>
                        </TableCell>
                        <TableCell style={gunnarStyle2}>
                          {this.getTimeFromInfo(carrierLocation.dateStartsShift, carrierLocation.dateEndsShift)}
                        </TableCell>
                      </TableRow>

                      <div align="left" color={red}>
                        {this.renderActions(carrierLocation, withButton)}
                      </div>

                    </div>
                  </TableBody>
                </Table>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    );
  }

}

const mapStateToProps = state => {
  return {
    carrierState: state.carrierState,
    typeBreakState: state.typeBreakState,
    messagesState: state.messagesState,
    typeAbsenceState: state.typeAbsenceState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCarrierById: (onSuccess) => dispatch(getCarrierById(onSuccess)),
    carrierEndShift: (onSuccess) => dispatch(carrierEndShift(onSuccess)),
    carrierStartShift: (onSuccess) => dispatch(carrierStartShift(onSuccess)),
    getActiveListTypeBreak: (onSuccess) => dispatch(getActiveListTypeBreak(onSuccess)),
    getActiveListTypeAbsence: (onSuccess) => dispatch(getActiveListTypeAbsence(onSuccess)),
    addMessage: (message) => dispatch(addMessage(message)),
    carrierBreakShift: (onSuccess, idTypeBreak, minutesBreak) => dispatch(carrierBreakShift(onSuccess, idTypeBreak, minutesBreak)),
    carrierAbsenceShift: (onSuccess, idTypeAbsence, minutesAbsence) => dispatch(carrierAbsenceShift(onSuccess, idTypeAbsence, minutesAbsence)),
    endCarrierAbsenceShift: (onSuccess) => dispatch(endCarrierAbsenceShift(onSuccess)),
    endCarrierBreakShift: (onSuccess) => dispatch(endCarrierBreakShift(onSuccess)),
  };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(CarrierAdmin));