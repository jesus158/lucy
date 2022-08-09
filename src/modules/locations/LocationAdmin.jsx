// @material-ui/core components
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from '@material-ui/core/Fab';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from "@material-ui/core/InputAdornment";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from '@material-ui/icons/Add';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PanToolIcon from '@material-ui/icons/PanTool';
import SaveIcon from '@material-ui/icons/Save';
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { addMessage } from 'layouts/MessagesActions';
import WaitDialog from "modules/components/WaitDialog.jsx";
import { changeTwoFloors, createUpdateFloor, deleteFloor } from 'modules/locations/floors/floorActions.js';
import { getMap } from 'modules/locations/map/MapActions.js';
import { changeTwoUbications, createUpdateUbication, deleteUbication } from 'modules/locations/ubications/UbicationActions.js';
import { changeTwoZones, createUpdateZone, deleteZone } from 'modules/locations/zones/zoneActions.js';
import React from "react";
import { connect } from 'react-redux';
import {BEACON_NAME,GATEWAY_NAME} from 'modules/utils/ApiUtil.js';

const exit = (<></>);
const allowDragZone = "true";
const colorZone = "info";

const colorUbicationListActive = "success";
const colorUbicationListNoActive = "danger";
const colorUbicationNoListActive = "warning";

const styleColorFree = { background: "#F0F0F0", padding: "1px 1px 1px 1px", height: 95, width: 95 };//margin: "1px 1px 1px 1px"
const styleCardContent = { padding: "1px 1px 1px 1px" };//margin: "1px 1px 1px 1px"
const styleTableCell = { verticalAlign: "top", align: "left", padding: "1px 1px 1px 1px" };//margin: "1px 1px 1px 1px"
const styleTableRow = { margin: "1px 1px 1px 1px" };
const styleTable = { borderBottom: 0, width: "auto", tableLayout: "auto" };
const zoneUbicationByDefault = {
  id: 0,
  active: 1,
  rowPosition: 0,
  columnPosition: 0,
  nameZone: ""
}
const floorUbicationByDefault = {
  id: 0,
  active: 1,
  rowPosition: 0,
  columnPosition: 0,
  nameFloor: ""
}
const ubicationByDefault = {
  id: 0,
  active: 1,
  rowPosition: 0,
  columnPosition: 0,
  nameUbication: "",
  showInList: 1,
  walkTime: 0,
  floorUbication: null,
  configurationBeaconEdit: null,
}
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

class LocationAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editUbicationFromList: 0,
      isActivityIndicatorShown: false,
      textAlertInfo: "Procesando...",
      alertInactive: null,
      zoneEdit: zoneUbicationByDefault,
      collapsedZones: [],
      collapsedFloors: [],
      zoneDelete: null,
      floorEdit: floorUbicationByDefault,
      floorDelete: null,
      ubicationEdit: ubicationByDefault,
      configurationBeaconEdit: null,
      ubicationdelete: null
    };
    this.loadDataMap();
  }

  componentDidMount = () => {
    var urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("idZone")) {
      // var idUbication = urlParams.get("ubicationId");
      var idZone = urlParams.get("idZone");
      var idFloor = urlParams.get("idFloor");
      var idUbication = urlParams.get("idUbication");
      var local = this.state.collapsedZones;
      var localFloor = this.state.collapsedFloors;
      local["z" + idZone] = 1;
      this.setState({ collapsedZones: local }, () => {
        localFloor["f" + idFloor] = 1;
        this.setState({ collapsedFloors: localFloor }, () => {
          this.setState({ editUbicationFromList: idUbication });
        });
      });


      //this.setState({ ubicationIdForEditting: urlParams.get("ubicationId") });
    }
  };


  loadDataMap = () => {
    this.props.getMap((success) => {
      this.setState({ isActivityIndicatorShown: false });
    });
  }

  hideAlertInactive = () => {
    this.setState({
      alertInactive: null
    });
  };

  cloneContent = (data) => {
    return JSON.parse(JSON.stringify(data));
  }
  /****************************************************************************
                                  UBICATIONS                  
  ******************************************************************************/
  ubicationDragOver = (ev) => {
    ev.preventDefault();
  }

  ubicationDragStart = (ev, data, dataFloor, dataZone) => {
    ev.dataTransfer.setData('dataUbication', JSON.stringify(data));
  }

  ubicationDrop = (ev, destiny, dataFloor, dataZone) => {
    ev.preventDefault();
    var origin = JSON.parse(ev.dataTransfer.getData('dataUbication'));
    if (destiny.id === origin.id) {
      return;
    }
    if (origin.nameUbication === undefined) {
      return
    }
    if (destiny.nameUbication === undefined) {
      return
    }

    if (destiny.id === 0) {
      origin.rowPosition = destiny.rowPosition;
      origin.columnPosition = destiny.columnPosition;
      origin.floorUbication = { id: dataFloor.id };
      this.setState({ isActivityIndicatorShown: true }, () => {
        this.props.createUpdateUbication((success) => {
          this.loadDataMap();
        },
          origin);
      });
    } else {
      this.setState({ isActivityIndicatorShown: true }, () => {
        try {
          this.props.changeTwoUbications((success) => {
            this.loadDataMap();
          }, origin.id, destiny.id);
        } catch (ex) {
          this.setState({ isActivityIndicatorShown: false });
        }
      });
    }
  }
  onConfirDeleteUbication = (row, col) => {
    var { ubicationDelete } = this.state;
    var message = "No se ha seleccionado una ubicación que borrar";
    if (ubicationDelete === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (ubicationDelete === null) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (ubicationDelete.id === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (ubicationDelete.id < 1) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    this.hideAlertInactive();
    this.setState({ isActivityIndicatorShown: true }, () => {
      this.props.deleteUbication((success) => {
        this.loadDataMap();
      }, ubicationDelete.id);
    });
  }

  showAlertDeleteUbication = (row, col) => {

    this.setState({
      alertInactive: (
        <React.Fragment>
          <Dialog
            open={true}
            onClose={this.hideAlertInactive}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {'Borrar la ubicación'}
            </DialogTitle>
            <DialogContent>
              {'¿Está seguro que quiere borrar la ubicación?'}
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
                onClick={() => {
                  this.onConfirDeleteUbication(row, col);
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
  }
  onConfirmEditUbication = (row, col, dataFloor, dataZone) => {
    var ubicationEdit = this.state.ubicationEdit;
    var message = "Los datos de la ubicación son incorrectos";
    if (ubicationEdit === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (ubicationEdit === null) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (ubicationEdit.nameUbication === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (ubicationEdit.nameUbication === null) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    message = "Debe ingresar un nombre de ubicación válido";
    if (ubicationEdit.nameUbication.trim() === "") {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    var lengthLocal = 0;
    message = "El "+BEACON_NAME+" debe contener como mínimo 3 caracteres";
    if (ubicationEdit.configurationBeacon !== undefined) {
      try {
        lengthLocal = ubicationEdit.configurationBeacon.uuid.trim().length;
        if (lengthLocal === 0) {
          ubicationEdit.configurationBeacon = undefined;
        } else if (lengthLocal < 3) {
          this.props.addMessage({ variant: "error", message: message });
          return;
        }
      } catch (ex) { }
    }
    message = "El "+GATEWAY_NAME+" debe contener como mínimo 3 caracteres";
    if (ubicationEdit.configurationGateway !== undefined) {
      try {
        lengthLocal = ubicationEdit.configurationGateway.uuid.trim().length;
        if (lengthLocal === 0) {
          ubicationEdit.configurationGateway = undefined;
        } else if (lengthLocal < 3) {
          this.props.addMessage({ variant: "error", message: message });
          return;
        }
      } catch (ex) { }
    }

    ubicationEdit.rowPosition = row;
    ubicationEdit.columnPosition = col;
    ubicationEdit.floorUbication = { id: dataFloor.id };
    this.hideAlertInactive();
    this.setState({ isActivityIndicatorShown: true }, () => {
      this.props.createUpdateUbication((success) => {
        this.loadDataMap();
      },
        ubicationEdit, dataFloor.id);
    });
  }
  handleInputConfigurationBeaconEdit = (event, row, col, dataFloor, dataZone) => {
    var configurationBeaconEdit = event.target.value;
    var ubicationEdit = this.state.ubicationEdit;
    ubicationEdit.configurationBeacon = { uuid: configurationBeaconEdit };
    this.setState({ ubicationEdit: ubicationEdit }, () => {
      this.showAlertEditeUbication(row, col, dataFloor, dataZone);
    });
  }

  handleInputGatewayEdit = (event, row, col, dataFloor, dataZone) => {
    var configurationGatewayEdit = event.target.value;
    var ubicationEdit = this.state.ubicationEdit;
    ubicationEdit.configurationGateway = { uuid: configurationGatewayEdit };
    this.setState({ ubicationEdit: ubicationEdit }, () => {
      this.showAlertEditeUbication(row, col, dataFloor, dataZone);
    });
  }

  handleInputUbicationEdit = (event, row, col, dataFloor, dataZone) => {
    var ubicationNameEdit = event.target.value;
    var ubicationEdit = this.state.ubicationEdit;
    ubicationEdit.nameUbication = ubicationNameEdit;
    this.setState({ ubicationEdit: ubicationEdit }, () => {
      this.showAlertEditeUbication(row, col, dataFloor, dataZone);
    });
  }
  handleShowInListUbication = (event, row, col, dataFloor, dataZone) => {
    var { ubicationEdit } = this.state;
    if (ubicationEdit === undefined) {
      return
    }
    if (ubicationEdit === null) {
      return
    }
    if (ubicationEdit.showInList === undefined) {
      ubicationEdit.showInList = 0;
    }
    if (ubicationEdit.showInList === null) {
      ubicationEdit.showInList = 0;
    }
    ubicationEdit.showInList = ubicationEdit.showInList === 0 ? 1 : 0;
    this.setState({ ubicationEdit: ubicationEdit }, () => {
      this.showAlertEditeUbication(row, col, dataFloor, dataZone);
    });
  }
  handleChekActiveUbication = (event, row, col, dataFloor, dataZone) => {
    var { ubicationEdit } = this.state;
    if (ubicationEdit === undefined) {
      return
    }
    if (ubicationEdit === null) {
      return
    }
    if (ubicationEdit.active === undefined) {
      ubicationEdit.active = 0;
    }
    if (ubicationEdit.active === null) {
      ubicationEdit.active = 0;
    }
    ubicationEdit.active = ubicationEdit.active === 0 ? 1 : 0;
    this.setState({ ubicationEdit: ubicationEdit }, () => {
      this.showAlertEditeUbication(row, col, dataFloor, dataZone);
    });
  }
  showAlertEditeUbication = (row, col, dataFloor, dataZone, isNew = false) => {
    var classes = this.props;
    this.setState({
      alertInactive: (
        <React.Fragment>
          <Dialog
            open={true}
            onClose={this.hideAlertInactive}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {isNew ? 'Crear nueva ubicación' : 'Editar la ubicación'}
            </DialogTitle>
            <DialogContent>

              {isNew ? '¿Está seguro que quiere crear la ubicación?' : '¿Está seguro que quiere editar la ubicación?'}
              <br />
              <CustomInput
                labelText={
                  <span>Nombre de la ubicación</span>
                }
                id="ubicationName"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "ubicationName",
                  id: "ubicationName",
                  value: this.state.ubicationEdit.nameUbication,
                  onChange: event => this.handleInputUbicationEdit(event, row, col, dataFloor, dataZone),
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      className={classes.inputAdornment}>
                      <BookmarkBorder className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  )
                }}
              />
              <CustomInput
                labelText={
                  <span>{BEACON_NAME}</span>
                }
                id="configurationBeacon"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "configurationBeacon",
                  id: "configurationBeacon",
                  value: this.state.ubicationEdit.configurationBeacon !== undefined && this.state.ubicationEdit.configurationBeacon !== null ? this.state.ubicationEdit.configurationBeacon.uuid : "",
                  onChange: event => this.handleInputConfigurationBeaconEdit(event, row, col, dataFloor, dataZone),
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      className={classes.inputAdornment}>
                      <BookmarkBorder className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  )
                }}
              />
              <CustomInput
                labelText={
                <span>{GATEWAY_NAME}</span>
                }
                id="configurationGateway"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "configurationGateway",
                  id: "configurationGateway",
                  value: this.state.ubicationEdit.configurationGateway !== undefined && this.state.ubicationEdit.configurationGateway !== null ? this.state.ubicationEdit.configurationGateway.uuid : "",
                  onChange: (event) => { this.handleInputGatewayEdit(event, row, col, dataFloor, dataZone) },
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      className={classes.inputAdornment}>
                      <BookmarkBorder className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  )
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    checked={this.state.ubicationEdit.active === 1}
                    onClick={(event) => this.handleChekActiveUbication(event, row, col, dataFloor, dataZone)}
                  />
                }
                label={"Activa"}>
              </FormControlLabel>
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    checked={this.state.ubicationEdit.showInList === 1}
                    onClick={(event) => this.handleShowInListUbication(event, row, col, dataFloor, dataZone)}
                  />
                }
                label={"Mostrar en listado"}>
              </FormControlLabel>

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
                onClick={() => {
                  this.onConfirmEditUbication(row, col, dataFloor, dataZone);
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
  }
  renderUbicationData = (row, col, dataUbication, dataFloor, dataZone, editUbication = false) => {
    const { classes } = this.props;
    return (
      <Card
        style={this.state.collapsedFloors["f" + dataFloor.id] === 1 ? {} : styleCardContent}
        color={
          dataUbication.showInList === 1 &&
            dataUbication.active === 1 ? colorUbicationListActive :
            dataUbication.active !== 1 ? colorUbicationListNoActive :
              colorUbicationNoListActive
        }
      >
        <CardBody
          onDrop={(event) => { this.ubicationDrop(event, dataUbication, dataFloor, dataZone) }}
          onDragOver={(event) => { this.ubicationDragOver(event) }}
        >
          <font size="1">
            <b>{dataUbication.nameUbication}</b>
            <br />
            <IconButton aria-label="borrar ubicación" className={classes.margin}
              onClick={event => {
                this.setState({ ubicationDelete: this.cloneContent(dataUbication) }, () => {
                  this.showAlertDeleteUbication(row, col)
                })
              }}>
              <DeleteIcon fontSize="small" />
            </IconButton>

            <IconButton aria-label="editar ubicación" className={classes.margin}
              onClick={event => {
                this.setState({ ubicationEdit: this.cloneContent(dataUbication) }, () => {
                  this.showAlertEditeUbication(row, col, dataFloor, dataZone, false)
                })
              }}>
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton aria-label="mover ubicación" className={classes.margin}
              draggable={allowDragZone}
              onDrop={(event) => { this.ubicationDrop(event, dataUbication, dataFloor, dataZone) }}
              onDragOver={(event) => { this.ubicationDragOver(event) }}
              onDragStart={(event) => { this.ubicationDragStart(event, dataUbication, dataFloor, dataZone) }}
            >
              <PanToolIcon fontSize="small" />
            </IconButton>

          </font>
        </CardBody>
      </Card>
    )
  }
  renderUbicationFree = (row, col, dataUbication, dataFloor, dataZone) => {
    const { classes } = this.props;
    var ubicationEdit = this.cloneContent(ubicationByDefault);
    ubicationEdit.id = 0;
    ubicationEdit.rowPosition = row;
    ubicationEdit.columnPosition = col;
    ubicationEdit.nameUbication = "";
    return (
      <Card
        key={`CardRenderFree-${row}-${col}-${dataFloor.id}-${dataZone.id}`}
        style={styleColorFree}
        onDrop={(event) => { this.ubicationDrop(event, ubicationEdit, dataFloor, dataZone) }}
        onDragOver={(event) => { this.ubicationDragOver(event) }}
      >
        <CardBody align="center">
          <Fab color={"default"} aria-label="add" className={classes.fab}//["default","inherit","primary","secondary"]
            onClick={event => {
              this.setState({ ubicationEdit: this.cloneContent(ubicationByDefault) }, () => {
                this.showAlertEditeUbication(row, col, dataFloor, dataZone, true);
              })
            }}
          >
            <AddIcon />
          </Fab>
        </CardBody>
      </Card>
    );
  }
  renderUbication = (row, col, dataUbication, dataFloor, dataZone) => {
    if (dataUbication === undefined) {
      return this.renderUbicationFree(row, col, dataUbication, dataFloor, dataZone);
    }
    if (dataUbication === null) {
      return this.renderUbicationFree(row, col, dataUbication, dataFloor, dataZone);
    }
    if (dataUbication === {}) {
      return this.renderUbicationFree(row, col, dataUbication, dataFloor, dataZone);
    }
    return this.renderUbicationData(row, col, dataUbication, dataFloor, dataZone, parseInt(this.state.editUbicationFromList, 10) === parseInt(dataUbication.id, 10));
  }

  renderUbications = (data, dataFloor, dataZone) => {
    var root = (data);
    if (root === undefined) {
      return exit;
    }
    if (root === null) {
      return exit;
    }
    var isCollapsed = this.state.collapsedFloors["f" + dataFloor.id];
    if (isCollapsed === undefined) {
      return exit;
    }
    if (isCollapsed !== 1) {
      return exit;
    }
    return (<>
      <Table style={{ styleTable }} key={`TableUbication-${dataFloor.id}-${dataZone.id}`}>
        <TableBody>
          {
            root.map((c, row) => {
              return (<>
                <TableRow style={styleTableRow} key={`TableRowUbication-${dataFloor.id}-${dataZone.id}-${row}`}>
                  {
                    c.map((dataUbication, col) => {
                      return (<>
                        <TableCell style={styleTableCell} key={`TableCellUbication-${dataFloor.id}-${dataZone.id}-${row}-${col}`}>
                          {this.renderUbication(row, col, dataUbication, dataFloor, dataZone)}
                        </TableCell>
                      </>
                      )
                    })
                  }
                </TableRow>
              </>
              )
            })
          }
        </TableBody>
      </Table>
    </>
    )
  }
  /****************************************************************************
                                 FLOORS                  
   ****************************************************************************/
  floorDragOver = (ev) => {
    ev.preventDefault();
  }

  floorDragStart = (ev, data, dataZone) => {
    ev.dataTransfer.setData('dataFloor', JSON.stringify(data));
  }

  floorDrop = (ev, destiny, dataZone) => {
    ev.preventDefault();
    var origin = JSON.parse(ev.dataTransfer.getData('dataFloor'));
    if (destiny.id === origin.id) {
      return;
    }
    if (origin.nameFloor === undefined) {
      return
    }
    if (destiny.nameFloor === undefined) {
      return
    }

    if (destiny.id === 0) {
      origin.rowPosition = destiny.rowPosition;
      origin.columnPosition = destiny.columnPosition;
      origin.zoneUbication = { id: dataZone.id };
      this.setState({ isActivityIndicatorShown: true }, () => {
        this.props.createUpdateFloor((success) => {
          this.loadDataMap();
        },
          origin);
      });
    } else {
      this.setState({ isActivityIndicatorShown: true }, () => {
        try {
          this.props.changeTwoFloors((success) => {
            this.loadDataMap();
          }, origin.id, destiny.id);
        } catch (ex) {
          this.setState({ isActivityIndicatorShown: false });
        }
      });
    }
  }
  onConfirmEditFloor = (row, col, dataZone) => {
    var floorEdit = this.state.floorEdit;
    var message = "Los datos del piso son incorrectos";
    if (floorEdit === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (floorEdit === null) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (floorEdit.nameFloor === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (floorEdit.nameFloor === null) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    message = "Debe ingresar un nombre de piso válido";
    if (floorEdit.nameFloor.trim() === "") {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    floorEdit.rowPosition = row;
    floorEdit.columnPosition = col;
    floorEdit.zoneUbication = { id: dataZone.id };
    this.hideAlertInactive();
    this.setState({ isActivityIndicatorShown: true }, () => {
      this.props.createUpdateFloor((success) => {
        this.loadDataMap();
      },
        floorEdit, dataZone.id);
    });
  }

  onConfirDeleteFloor = (row, col) => {
    var { floorDelete } = this.state;
    var message = "No se ha seleccionado un piso que borrar";
    if (floorDelete === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (floorDelete === null) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (floorDelete.id === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (floorDelete.id < 1) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    this.hideAlertInactive();
    this.setState({ isActivityIndicatorShown: true }, () => {
      this.props.deleteFloor((success) => {
        this.loadDataMap();
      }, floorDelete.id);
    });
  }

  showAlertDeleteFloor = (row, col) => {

    this.setState({
      alertInactive: (
        <React.Fragment>
          <Dialog
            open={true}
            onClose={this.hideAlertInactive}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {'Borrar el piso'}
            </DialogTitle>
            <DialogContent>
              {'¿Está seguro que quiere borrar el piso?'}
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
                onClick={() => {
                  this.onConfirDeleteFloor(row, col);
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
  }

  handleInputFloorEdit = (event, row, col, dataZone) => {
    var floorNameEdit = event.target.value;
    var floorEdit = this.state.floorEdit;
    floorEdit.nameFloor = floorNameEdit;
    this.setState({ floorEdit: floorEdit }, () => {
      this.showAlertEditeFloor(row, col, dataZone);
    });
  }
  showAlertEditeFloor = (row, col, dataZone, isNew = false) => {
    var classes = this.props;

    this.setState({
      alertInactive: (
        <React.Fragment>
          <Dialog
            open={true}
            onClose={this.hideAlertInactive}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {isNew ? 'Crear nuevo piso' : 'Editar el piso'}
            </DialogTitle>
            <DialogContent>
              {isNew ? '¿Está seguro que quiere crear el piso?' : '¿Está seguro que quiere editar el piso?'}
              <br />
              <CustomInput
                labelText={
                  <span>Nombre del piso</span>
                }
                id="floorName"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "floorName",
                  id: "floorName",
                  value: this.state.floorEdit.nameFloor,
                  onChange: event => this.handleInputFloorEdit(event, row, col, dataZone),
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      className={classes.inputAdornment}>
                      <BookmarkBorder className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  )
                }}
              />
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
                onClick={() => {
                  this.onConfirmEditFloor(row, col, dataZone);
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
  }
  setCollapsedFloor = (dataFloor) => {
    var local = this.state.collapsedFloors;
    if (local["f" + dataFloor.id] === undefined) {
      local["f" + dataFloor.id] = 0;
    }
    local["f" + dataFloor.id] = local["f" + dataFloor.id] === 0 ? 1 : 0;
    this.setState({ collapsedFloors: local });
    ;
  }

  renderFloorButtonUbications = (dataFloor, dataZone) => {
    var classes = this.props;
    if (dataFloor === undefined) {
      return exit;
    }
    if (dataFloor === null) {
      return exit;
    }

    var createUbication = (<IconButton aria-label="Crear ubicación" className={classes.margin}>
      <AddIcon fontSize="small" />
    </IconButton>);
    if (dataFloor.matrixUbication === undefined) {
      return createUbication;
    }
    if (dataFloor.matrixUbication === null) {
      return createUbication;
    }
    return (<>
      <IconButton aria-label="ver pisos" className={classes.margin}
        onClick={event => { this.setCollapsedFloor(dataFloor) }}>
        {this.state.collapsedFloors["f" + dataFloor.id] === 0 || this.state.collapsedFloors["f" + dataFloor.id] === undefined ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
      </IconButton>
      {this.renderUbications(dataFloor.matrixUbication, dataFloor, dataZone)}
    </>)
  }

  renderFloorData = (row, col, dataFloor, dataZone) => {
    const { classes } = this.props;
    return (
      <Card
        style={this.state.collapsedZones["z" + dataFloor.id] === 1 ? {} : styleCardContent}
        onDrop={(event) => { this.floorDrop(event, dataFloor, dataZone) }}
        onDragOver={(event) => { this.floorDragOver(event) }}
      >
        <CardBody >
          <font size="1">
            <b>{dataFloor.nameFloor}</b>
            <br />
            <IconButton aria-label="borrar piso" className={classes.margin}
              onClick={event => {
                this.setState({ floorDelete: this.cloneContent(dataFloor) }, () => {
                  this.showAlertDeleteFloor(row, col)
                })
              }}>
              <DeleteIcon fontSize="small" />
            </IconButton>

            <IconButton aria-label="editar piso" className={classes.margin}
              onClick={event => {
                this.setState({ floorEdit: this.cloneContent(dataFloor) }, () => {
                  this.showAlertEditeFloor(row, col, dataZone, false)
                })
              }}>
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton aria-label="editar zona" className={classes.margin}
              draggable={allowDragZone}
              onDrop={(event) => { this.floorDrop(event, dataFloor, dataZone) }}
              onDragOver={(event) => { this.floorDragOver(event) }}
              onDragStart={(event) => { this.floorDragStart(event, dataFloor) }}
            >
              <PanToolIcon fontSize="small" />
            </IconButton>

            {
              this.renderFloorButtonUbications(dataFloor, dataZone)
            }

          </font>
        </CardBody>
      </Card>
    )
  }
  renderFloorFree = (row, col, dataFloor, dataZone) => {
    const { classes } = this.props;
    var floorEdit = this.cloneContent(floorUbicationByDefault);
    floorEdit.id = 0;
    floorEdit.rowPosition = row;
    floorEdit.columnPosition = col;
    floorEdit.nameFloor = "";
    return (
      <Card
        style={styleColorFree}
        onDrop={(event) => { this.floorDrop(event, floorEdit, dataZone) }}
        onDragOver={(event) => { this.floorDragOver(event) }}
      >
        <CardBody align="center">
          <Fab color={"default"} aria-label="add" className={classes.fab}//["default","inherit","primary","secondary"]
            onClick={event => {
              this.setState({ floorEdit: this.cloneContent(floorUbicationByDefault) }, () => {
                this.showAlertEditeFloor(row, col, dataZone, true);
              })
            }}>
            <AddIcon />
          </Fab>
        </CardBody>
      </Card>
    );
  }

  renderFloor = (row, col, dataFloor, dataZone) => {
    if (dataFloor === undefined) {
      return this.renderFloorFree(row, col, dataFloor, dataZone);
    }
    if (dataFloor === null) {
      return this.renderFloorFree(row, col, dataFloor, dataZone);
    }
    if (dataFloor === {}) {
      return this.renderFloorFree(row, col, dataFloor, dataZone);
    }
    return this.renderFloorData(row, col, dataFloor, dataZone);
  }

  renderFloors = (data, dataZone) => {
    var root = (data);
    if (root === undefined) {
      return exit;
    }
    if (root === null) {
      return exit;
    }
    var isCollapsed = this.state.collapsedZones["z" + dataZone.id];
    if (isCollapsed === undefined) {
      return exit;
    }
    if (isCollapsed !== 1) {
      return exit;
    }
    return (<>
      <Table style={styleTable} key={`TableFloor-${dataZone.id}`}>
        <TableBody>
          {
            root.map((c, row) => {
              return (<>
                <TableRow style={styleTableRow} key={`TableRowFloor-${dataZone.id}-${row}`}>
                  {
                    c.map((dataFloor, col) => {
                      return (<>
                        <TableCell style={styleTableCell} key={`TableCellFloor-${dataZone.id}-${row}-${col}`}>
                          {this.renderFloor(row, col, dataFloor, dataZone)}
                        </TableCell>
                      </>
                      )
                    })
                  }
                </TableRow>
              </>
              )
            })
          }
        </TableBody>
      </Table>
    </>
    )
  }
  /****************************************************************************
                                ZONES                  
  ****************************************************************************/
  onConfirDeleteZone = (row, col) => {
    var { zoneDelete } = this.state;
    var message = "No se ha seleccionado una zona que borrar";
    if (zoneDelete === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (zoneDelete === null) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (zoneDelete.id === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (zoneDelete.id < 1) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    this.hideAlertInactive();
    this.setState({ isActivityIndicatorShown: true }, () => {
      this.props.deleteZone((success) => {
        this.loadDataMap();
      }, zoneDelete.id);
    });
  }

  showAlertDeleteZone = (row, col) => {

    this.setState({
      alertInactive: (
        <React.Fragment>
          <Dialog
            open={true}
            onClose={this.hideAlertInactive}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {'Borrar la zona'}
            </DialogTitle>
            <DialogContent>
              {'¿Está seguro que quiere borrar la zona?'}
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
                onClick={() => {
                  this.onConfirDeleteZone(row, col);
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
  }

  onConfirmEditZone = (row, col) => {
    var zoneEdit = this.state.zoneEdit;
    var message = "Los datos de la zona son incorrectos";
    if (zoneEdit === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (zoneEdit === null) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (zoneEdit.nameZone === undefined) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    if (zoneEdit.nameZone === null) {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    message = "Debe ingresar un nombre de zona válido";
    if (zoneEdit.nameZone.trim() === "") {
      this.props.addMessage({ variant: "error", message: message });
      return;
    }
    zoneEdit.rowPosition = row;
    zoneEdit.columnPosition = col;
    this.hideAlertInactive();
    this.setState({ isActivityIndicatorShown: true }, () => {
      this.props.createUpdateZone((success) => {
        this.loadDataMap();
      },
        zoneEdit);
    });
  }

  handleInputZoneEdit = (event, row, col) => {
    var zoneNameEdit = event.target.value;
    var zoneEdit = this.state.zoneEdit;
    zoneEdit.nameZone = zoneNameEdit;
    this.setState({ zoneEdit: zoneEdit }, () => {
      this.showAlertEditeZone(row, col);
    });
  }

  showAlertEditeZone = (row, col, isNew = false) => {
    var classes = this.props;

    this.setState({
      alertInactive: (
        <React.Fragment>
          <Dialog
            open={true}
            onClose={this.hideAlertInactive}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {isNew ? 'Crear nueva zona' : 'Editar la zona'}
            </DialogTitle>
            <DialogContent>
              {isNew ? '¿Está seguro que quiere crear la zona?' : '¿Está seguro que quiere editar la zona?'}
              <br />
              <CustomInput
                labelText={
                  <span>Nombre de la zona</span>
                }
                id="zoneName"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  name: "zoneName",
                  id: "zoneName",
                  value: this.state.zoneEdit.nameZone,
                  onChange: event => this.handleInputZoneEdit(event, row, col),
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      className={classes.inputAdornment}>
                      <BookmarkBorder className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  )
                }}
              />
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
                onClick={() => {
                  this.onConfirmEditZone(row, col);
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
  }

  zoneDragOver = (ev) => {
    ev.preventDefault();
  }

  zoneDragStart = (ev, data) => {
    ev.dataTransfer.setData('dataZone', JSON.stringify(data));
  }

  zoneDrop = (ev, destiny) => {
    ev.preventDefault();
    var origin = JSON.parse(ev.dataTransfer.getData('dataZone'));
    if (destiny.id === origin.id) {
      return;
    }
    if (origin.nameZone === undefined) {
      return
    }
    if (destiny.nameZone === undefined) {
      return
    }
    if (destiny.id === 0) {
      origin.rowPosition = destiny.rowPosition;
      origin.columnPosition = destiny.columnPosition;
      this.setState({ isActivityIndicatorShown: true }, () => {
        this.props.createUpdateZone((success) => {
          this.loadDataMap();
        },
          origin);
      });
    } else {
      this.setState({ isActivityIndicatorShown: true }, () => {
        try {
          this.props.changeTwoZones((success) => {
            this.loadDataMap();
          }, origin.id, destiny.id);
        } catch (ex) {
          this.setState({ isActivityIndicatorShown: false });
        }
      });

    }
  }

  setCollapsed = (dataZone) => {
    var local = this.state.collapsedZones;
    if (local["z" + dataZone.id] === undefined) {
      local["z" + dataZone.id] = 0;
    }
    local["z" + dataZone.id] = local["z" + dataZone.id] === 0 ? 1 : 0;
    this.setState({ collapsedZones: local });
    ;
  }

  renderZoneButtonFloors = (dataZone) => {
    var classes = this.props;
    if (dataZone === undefined) {
      return exit;
    }
    if (dataZone === null) {
      return exit;
    }

    var createFloor = (<IconButton aria-label="Crear piso" className={classes.margin}>
      <AddIcon fontSize="small" />
    </IconButton>);
    if (dataZone.matrixFloor === undefined) {
      return createFloor;
    }
    if (dataZone.matrixFloor === null) {
      return createFloor;
    }
    return (<>
      <IconButton aria-label="ver pisos" className={classes.margin}
        onClick={event => { this.setCollapsed(dataZone) }}>
        {this.state.collapsedZones["z" + dataZone.id] === 0 || this.state.collapsedZones["z" + dataZone.id] === undefined ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
      </IconButton>
      {this.renderFloors(dataZone.matrixFloor, dataZone)}
    </>)
  }

  renderZoneData = (row, col, dataZone) => {
    const { classes } = this.props;
    return (
      <Card
        style={this.state.collapsedZones["z" + dataZone.id] === 1 ? {} : styleCardContent}
        color={colorZone}
        onDrop={(event) => { this.zoneDrop(event, dataZone) }}
        onDragOver={(event) => { this.zoneDragOver(event) }}
      >
        <CardBody >
          <font size="1">
            <b>{dataZone.nameZone}</b>
            <br />
            <IconButton aria-label="borrar zona" className={classes.margin}
              onClick={event => {
                this.setState({ zoneDelete: this.cloneContent(dataZone) }, () => {
                  this.showAlertDeleteZone(row, col)
                })
              }}>
              <DeleteIcon fontSize="small" />
            </IconButton>

            <IconButton aria-label="editar zona" className={classes.margin}
              onClick={event => {
                this.setState({ zoneEdit: this.cloneContent(dataZone) }, () => {
                  this.showAlertEditeZone(row, col)
                })
              }}>
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton aria-label="editar zona" className={classes.margin}
              draggable={allowDragZone}
              onDrop={(event) => { this.zoneDrop(event, dataZone) }}
              onDragOver={(event) => { this.zoneDragOver(event) }}
              onDragStart={(event) => { this.zoneDragStart(event, dataZone) }}
            >
              <PanToolIcon fontSize="small" />
            </IconButton>

            {this.renderZoneButtonFloors(dataZone)}

          </font>
        </CardBody>
      </Card>
    )
  }

  renderZoneButtonCreate = (row, col) => {
    return (
      <Button
        size="lg"
        simple
        color={colorZone}
        onClick={event => {
          this.setState({ zoneEdit: this.cloneContent(zoneUbicationByDefault) }, () => {
            this.showAlertEditeZone(row, col, true)
          })
        }}>
        <AddLocationIcon />
      </Button>
    )
  }

  renderZoneFree = (row, col) => {
    const { classes } = this.props;
    var zoneEdit = this.cloneContent(zoneUbicationByDefault);
    zoneEdit.id = 0;
    zoneEdit.rowPosition = row;
    zoneEdit.columnPosition = col;
    return (
      <Card
        style={styleColorFree}
        onDrop={(event) => { this.zoneDrop(event, zoneEdit) }}
        onDragOver={(event) => { this.zoneDragOver(event) }}
      >
        <CardBody align="center">
          <Fab color={'inherit'} aria-label="add" className={classes.fab}//["default","inherit","primary","secondary"].
            onClick={event => {
              this.setState({ zoneEdit: this.cloneContent(zoneUbicationByDefault) }, () => {
                this.showAlertEditeZone(row, col, true)
              })
            }}>
            <AddIcon />
          </Fab>
        </CardBody>
      </Card>
    );
  }

  renderZone = (row, col, dataZone) => {
    if (dataZone === undefined) {
      return this.renderZoneFree(row, col);
    }
    if (dataZone === null) {
      return this.renderZoneFree(row, col);
    }
    if (dataZone === {}) {
      return this.renderZoneFree(row, col);
    }
    return this.renderZoneData(row, col, dataZone);
  }

  renderZones = (data) => {
    var zf = (data);
    return (<>
      <Table style={styleTable}>
        <TableBody>
          {
            zf.map((zc, row) => {
              return (<>
                <TableRow style={styleTableRow} key={`TableRowZone-${row}`}>
                  {
                    zc.map((z, col) => {
                      return (<>
                        <TableCell style={styleTableCell} key={`TableCellZone-${row}-${col}`}>
                          {this.renderZone(row, col, z)}
                        </TableCell>
                      </>
                      )
                    })
                  }
                </TableRow>
              </>
              )
            })
          }
        </TableBody>
      </Table>
    </>
    )
  }

  render() {
    let isActivityIndicatorShown = this.state.isActivityIndicatorShown;
    var { matrixZoneUbication } = this.props.mapState;
    if (matrixZoneUbication === undefined) {
      matrixZoneUbication = [[null]]
    }
    return (
      <>
        {isActivityIndicatorShown &&
          <WaitDialog text={this.state.textAlertInfo} />
        }
        {this.state.alertInactive}
        {this.renderZones(matrixZoneUbication)}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    mapState: state.mapState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMap: (onSuccess) => dispatch(getMap(onSuccess)),
    createUpdateZone: (onSuccess, zoneUbication) => dispatch(createUpdateZone(onSuccess, zoneUbication)),
    changeTwoZones: (onSuccess, idZone1, idZone2) => dispatch(changeTwoZones(onSuccess, idZone1, idZone2)),
    deleteZone: (onSuccess, idZoneUbication) => dispatch(deleteZone(onSuccess, idZoneUbication)),
    createUpdateFloor: (onSuccess, FloorUbication) => dispatch(createUpdateFloor(onSuccess, FloorUbication)),
    changeTwoFloors: (onSuccess, idFloor1, idFloor2) => dispatch(changeTwoFloors(onSuccess, idFloor1, idFloor2)),
    deleteFloor: (onSuccess, idFloorUbication) => dispatch(deleteFloor(onSuccess, idFloorUbication)),
    createUpdateUbication: (onSuccess, zoneUbication) => dispatch(createUpdateUbication(onSuccess, zoneUbication)),
    changeTwoUbications: (onSuccess, idUbication1, idUbication2) => dispatch(changeTwoUbications(onSuccess, idUbication1, idUbication2)),
    deleteUbication: (onSuccess, idUbication) => dispatch(deleteUbication(onSuccess, idUbication)),
    addMessage: (message) => dispatch(addMessage(message)),
  };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(LocationAdmin));