// @material-ui/core components
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Block from "@material-ui/icons/Block";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import CancelIcon from '@material-ui/icons/Cancel';
import Edit from "@material-ui/icons/Edit";
import NearMe from "@material-ui/icons/NearMe";
import SaveIcon from '@material-ui/icons/Save';
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import Badge from "components/Badge/Badge.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import EnhancedTableHead from "components/EnhancedTableHead/EnhancedTableHead.jsx";
import TablePagination from "components/TablePagination/TablePagination.jsx";
import { addMessage } from 'layouts/MessagesActions';
import Filter from "modules/components/Filter.jsx";
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { createUpdateUbication, deleteUbication, getUbicationByFilter } from "modules/locations/ubications/UbicationActions.js";
import { ROW_GRAY, ROW_WHITE ,BEACON_NAME,GATEWAY_NAME} from "modules/utils/ApiUtil.js";
import React from 'react';
import { connect } from "react-redux";




const rows = [
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: '' },
  { id: 16, numeric: false, disablePadding: true, isSorted: true, label: 'Ubicación' },
  { id: 4, numeric: false, disablePadding: true, isSorted: true, label: 'Zona' },
  { id: 10, numeric: false, disablePadding: true, isSorted: true, label: 'Piso' },
  { id: 21, numeric: false, disablePadding: true, isSorted: true, label: BEACON_NAME },
  { id: 25, numeric: false, disablePadding: true, isSorted: true, label: GATEWAY_NAME },
  { id: 17, numeric: false, disablePadding: true, isSorted: true, label: 'En lista' },
  { id: 19, numeric: false, disablePadding: true, isSorted: true, label: 'Activa' },
];

class LocationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAlertInfo: false,
      textAlertInfo: "",
      filter: {},
      order: 0,
      orderBy: 16,
      page: 0,
      rowsPerPage: 5,
      toAdmin: false,
      accountId: 0,
      alertInactive: null,
      isActivityIndicatorShown: false,
    };
  }

  componentDidMount = () => {
    this.loadContentList();
  };

  loadContentList = () => {
    this.props.getUbicationByFilter((success) => {
      this.setState({ isActivityIndicatorShown: false });
    },
      undefined,
      this.state.page,
      this.state.order,
      this.state.rowsPerPage,
      this.state.orderBy,
      this.state.page,
      this.state.filter.name
    );
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

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 1;

    if (this.state.orderBy === property && this.state.order === 1) {
      order = 0;
    }

    this.props.getUbicationByFilter((success) => {
      this.setState({ isActivityIndicatorShown: false });
    },
      undefined,
      this.state.page,
      order,
      this.state.rowsPerPage,
      orderBy,
      this.state.page,
      this.state.filter.name
    );
    this.setState({ order, orderBy });
  };

  handleEdit = id => {
    this.setState({
      toAdmin: true,
      accountId: id
    });
  };

  hideAlertInactive = () => {
    this.setState({
      alertInactive: null
    });
  };

  onFilter = filter => {
    this.setState({ filter });
    this.props.getUbicationByFilter((success) => {
      this.setState({ isActivityIndicatorShown: false });
    },
      undefined,
      this.state.page,
      this.state.order,
      this.state.rowsPerPage,
      this.state.orderBy,
      this.state.page,
      filter.name
    );
  };

  handleChangePage = page => {
    this.props.getUbicationByFilter((success) => {
      this.setState({ isActivityIndicatorShown: false });
    },
      undefined,
      this.state.page,
      this.state.order,
      this.state.rowsPerPage,
      this.state.orderBy,
      page,
      this.state.filter.name
    );
    this.setState({ page });
  };

  handleChangeRowsPerPage = rowsPerPage => {
    this.props.getUbicationByFilter((success) => {
      this.setState({ isActivityIndicatorShown: false });
    },
      undefined,
      this.state.page,
      this.state.order,
      rowsPerPage,
      this.state.orderBy,
      this.state.page,
      this.state.filter.name
    );
    this.setState({ rowsPerPage });
  };



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
        this.loadContentList();
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
    message = "El "+BEACON_NAME+" debe contener como mínimo 3 caracteres";
    var lengthLocal = 0;
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
        this.loadContentList()
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

  cloneContent = (data) => {
    return JSON.parse(JSON.stringify(data));
  }

  render = () => {
    const { classes } = this.props;
    const isActivityIndicatorShown = this.state.isActivityIndicatorShown;
    var { apiPagination, listUbication } = this.props.ubicationState.data;
    const { order, orderBy } = this.state;

    if (apiPagination === undefined) {
      apiPagination = {};
    }
    if (listUbication === undefined) {
      listUbication = [];
    }

    return (
      <>
        {isActivityIndicatorShown ?
          <WaitDialog text={"Cargando..."} />
          : null
        }
        {this.state.alertInactive}
        <Card key={`CardUbicationes`} >
          <CardHeader color="primary" icon >
            <CardIcon color="info">
              <NearMe />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Ubicaciones</h4>
          </CardHeader>
          <CardBody style={{ overflow: "auto" }}>
            <Filter onFilter={this.onFilter} name={true} nameText={"Filtrar"} placeholder={"ubicación, zona, piso..."} />
            <Table className={classes.table} aria-labelledby="tableTitle" key={`TableCardUbicationes`}>
              <EnhancedTableHead
                key={`EnhancedTableHead-${Math.random()}`}
                onRequestSort={this.handleRequestSort}
                order={order === 0 ? 'asc' : 'desc'}
                orderBy={orderBy+''}
                rowCount={20}
                rows={rows}
              />
              <TableBody>
                {listUbication.map((ubication, key) => {
                  return (
                    <TableRow tabIndex={-1} key={`TableRow-${key}`} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                      <TableCell align="right" className="text-column">
                        <div>
                          <Button
                            color="success"
                            simple
                            className={classes.actionButton}
                            key={"edit_" + key}
                            onClick={() => {

                              this.setState({ ubicationEdit: this.cloneContent(ubication) }, () => {
                                this.showAlertEditeUbication(ubication.rowPosition, ubication.columnPosition, ubication.floorUbication, ubication.floorUbication.zoneUbication, false)
                              })

                            }}
                          >
                            <Edit className={classes.icon} />
                          </Button>
                          <Button
                            color="danger"
                            simple
                            className={classes.actionButton}
                            key={"close_" + key}
                            onClick={(event) => {
                              this.setState({ ubicationDelete: this.cloneContent(ubication) }, () => {
                                this.showAlertDeleteUbication(ubication.rowPosition, ubication.columnPosition)
                              })
                            }}
                          >
                            <Block className={classes.icon} />
                          </Button>

                        </div>
                      </TableCell>


                      <TableCell className="text-column">
                        {ubication.nameUbication}
                      </TableCell>

                      <TableCell className="text-column">
                        {ubication.floorUbication.zoneUbication.nameZone}
                      </TableCell>

                      <TableCell className="text-column">
                        {ubication.floorUbication.nameFloor}
                      </TableCell>

                      <TableCell className="text-column">
                        {ubication.configurationBeacon.uuid || ""}
                      </TableCell>

                      <TableCell className="text-column">
                        {ubication.configurationGateway.uuid || ""}
                      </TableCell>

                      <TableCell className="text-column">
                        <Badge color={ubication.showInList === 1 ? "success" : "danger"}>
                          {ubication.showInList === 1 ? "Si" : "No"}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-column">
                        <Badge color={ubication.active === 1 ? "success" : "danger"}>
                          {ubication.active === 1 ? "Si" : "No"}
                        </Badge>
                      </TableCell>

                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              pages={apiPagination.totalPages}
              rowsPerPage={apiPagination.limit}
              page={parseInt(apiPagination.currentPage,10)}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </CardBody>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ubicationState: state.ubicationState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUbicationByFilter: (
      onSuccess,
      apiPaginationAction,
      apiPaginationCurrentPage,
      apiPaginationDirection,
      apiPaginationLimit,
      apiPaginationOrderColumn,
      apiPaginationMoveToPage,
      apiPaginationFilter
    ) =>
      dispatch(
        getUbicationByFilter(
          onSuccess,
          apiPaginationAction,
          apiPaginationCurrentPage,
          apiPaginationDirection,
          apiPaginationLimit,
          apiPaginationOrderColumn,
          apiPaginationMoveToPage,
          apiPaginationFilter
        )
      ),
    addMessage: (message) => dispatch(addMessage(message)),
    createUpdateUbication: (onSuccess, zoneUbication) => dispatch(createUpdateUbication(onSuccess, zoneUbication)),
    deleteUbication: (onSuccess, idUbication) => dispatch(deleteUbication(onSuccess, idUbication)),

  };
};

export default withStyles(extendedTablesStyle)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LocationList)
);
