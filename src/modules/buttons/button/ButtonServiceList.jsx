import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Block from "@material-ui/icons/Block";
import Edit from "@material-ui/icons/Edit";
// material-ui icons
import SettingsRemote from '@material-ui/icons/SettingsRemote';
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import Badge from "components/Badge/Badge.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import EnhancedTableHead from "components/EnhancedTableHead/EnhancedTableHead.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import TablePagination from "components/TablePagination/TablePagination.jsx";
import { findCallButton, inactiveCallButton, setCallButton } from 'modules/buttons/button/ButtonServiceActions.js';
import Filter from "modules/components/Filter.jsx";
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { MILI_SECONDS_REFRESH_LIST, ROW_GRAY, ROW_WHITE } from "modules/utils/ApiUtil.js";
import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


const rows = [
  { id: 0, numeric: false, disablePadding: true, isSorted: false, label: '' },
  { id: 32, numeric: false, disablePadding: false, isSorted: true, label: 'id' },
  { id: 36, numeric: false, disablePadding: false, isSorted: true, label: 'Código' },
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Modo' },
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Solicitante' },
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Tipo de servicio' },
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Origen' },
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Destino' },
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Observaciones' },
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Activo' },
];

var prevNowPlaying = null;

class ButtonServiceList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: {},
      order: 0,
      orderBy: 32,
      page: 0,
      rowsPerPage: 5,
      toAdmin: false,
      buttonId: 0,
      alertInactive: null
    };
    this.props.findCallButton(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
  }

  componentDidMount = () => {
    if (prevNowPlaying) {
      clearInterval(prevNowPlaying);
      prevNowPlaying = null;
    }
    prevNowPlaying = setInterval(() => {
      this.props.findCallButton(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
    }, MILI_SECONDS_REFRESH_LIST);
  }

  componentWillUnmount() {
    if (prevNowPlaying) {
      clearInterval(prevNowPlaying);
    }
    prevNowPlaying = null;
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 1;

    if (this.state.orderBy === property && this.state.order === 1) {
      order = 0;
    }

    this.props.findCallButton(undefined, this.state.page, order, this.state.rowsPerPage, orderBy, this.state.page, this.state.filter.name);
    this.setState({ order, orderBy });
  };

  handleEdit = (id) => {
    this.props.setCallButton({
      active: 1,
      hotspotCallButton: null,
      id: 0,
      locationBegin: { id: 0 },
      locationEnd: { id: 0 },
      modeUsed: 1,//Significa que el botón está en uso
      moreInformation: "",
      typeService: { id: 0 },
      userAsigned: { id: 0 },
      uuid: ""
    });
    this.setState({
      toAdmin: true
      , buttonId: id
    });
  }

  showAlertInactive = (nameAccountSelected, id) => {
    this.setState({
      alertInactive: (
        <Dialog
          open={true}
          onClose={this.hideAlertInactive}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{nameAccountSelected}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro que quiere inactivar este botón?
                </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.hideAlertInactive} color="danger">
              Cancelar
                </Button>
            <Button onClick={() => {
              this.hideAlertInactive();
              this.props.inactiveCallButton(id, success => {
                this.props.findCallButton(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
              });
            }} color="info">
              Aceptar
                </Button>
          </DialogActions>
        </Dialog>
      )
    });
  }

  hideAlertInactive = () => {
    this.setState({
      alertInactive: null
    });
  }

  onFilter = filter => {
    this.setState({ filter });
    this.props.findCallButton(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, filter.name);
  }

  handleChangePage = (page) => {
    this.props.findCallButton(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, page, this.state.filter.name);
    this.setState({ page });
  };

  handleChangeRowsPerPage = rowsPerPage => {
    this.props.findCallButton(undefined, this.state.page, this.state.order, rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
    this.setState({ rowsPerPage });
  };

  render() {

    var { isActivityIndicatorShown } = false;
    try {
      //var { isActivityIndicatorShown } = this.props.buttonServiceState.data;
    } catch (ex) { }
    var apiPagination = {};
    var listCallButton = [];
    try {
      apiPagination = this.props.buttonServiceState.data.listResultSetCallButton.apiPagination;
      listCallButton = this.props.buttonServiceState.data.listResultSetCallButton.listCallButton;
    } catch (ex) { }
    const { classes } = this.props;


    const { order, orderBy } = this.state;


    if (apiPagination === undefined) {
      apiPagination = {};
    }

    if (listCallButton === undefined) {
      listCallButton = [];
    }

    if (this.state.toAdmin === true) {
      return <Redirect to={'/admin/admin-call-button/?code=' + this.state.buttonId} />
    }
    return (
      <GridItem xs={12}>
        {isActivityIndicatorShown ?
          <WaitDialog text={"Cargando..."} />
          : null
        }
        {this.state.alertInactive}
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="info">
              <SettingsRemote />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Botones</h4>
          </CardHeader>
          <CardBody style={{ overflow: "auto" }}>
            <Filter onFilter={this.onFilter} name={true} nameText={"Filtrar"} placeholder={"código"} />
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                onRequestSort={this.handleRequestSort}
                order={order === 0 ? 'asc' : 'desc'}
                orderBy={orderBy+''}
                rowCount={20}
                rows={rows}
              />
              <TableBody>
                {listCallButton.map((callButton, key) => {
                  return (
                    <TableRow tabIndex={-1} key={`TableRow-${key}`} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                      <TableCell align="right" className="text-column">
                        <div>
                          <Button
                            color="success"
                            simple
                            className={classes.actionButton}
                            key={"edit_" + callButton.id}
                            onClick={() => { this.handleEdit(callButton.id) }}>
                            <Edit className={classes.icon} />
                          </Button>
                          <Button
                            color="danger"
                            simple
                            className={classes.actionButton}
                            key={"close_" + callButton.id}
                            onClick={this.showAlertInactive.bind(this, callButton.uuid, callButton.id)}>
                            <Block className={classes.icon} />
                          </Button>

                        </div>
                      </TableCell>
                      <TableCell align="left">{callButton.id}</TableCell>
                      <TableCell align="left">{callButton.uuid}</TableCell>
                      <TableCell align="left">
                        {callButton.modeUsed === 1 ? (
                          <Badge color="success">Servicio</Badge>
                        ) : <Badge color="warning">Configuración</Badge>}
                      </TableCell>
                      <TableCell align="left">{callButton.userAsigned.userAccount.nameUser}</TableCell>
                      <TableCell align="left">{callButton.typeService.serviceName}</TableCell>
                      <TableCell align="left">{callButton.locationBegin.nameUbication}</TableCell>
                      <TableCell align="left">{callButton.locationEnd.nameUbication}</TableCell>
                      <TableCell align="left">{callButton.moreInformation}</TableCell>

                      <TableCell className="text-column">
                        {callButton.active === 1 ? (
                          <Badge color="success">Activa</Badge>
                        ) : <Badge color="danger">Inactiva</Badge>}
                      </TableCell>

                    </TableRow>
                  )
                })
                }
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              pages={apiPagination.totalPages}
              rowsPerPage={apiPagination.limit}
              page={apiPagination.currentPage}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />

          </CardBody>
        </Card>
      </GridItem>
    );
  }

}

const mapStateToProps = state => {
  return {
    buttonServiceState: state.buttonServiceState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findCallButton: (apiPaginationAction
      , apiPaginationCurrentPage
      , apiPaginationDirection
      , apiPaginationLimit
      , apiPaginationOrderColumn
      , apiPaginationMoveToPage
      , apiPaginationFilter) => dispatch(findCallButton(apiPaginationAction
        , apiPaginationCurrentPage
        , apiPaginationDirection
        , apiPaginationLimit
        , apiPaginationOrderColumn
        , apiPaginationMoveToPage
        , apiPaginationFilter)),
    setCallButton: (callButton) => dispatch(setCallButton(callButton)),
    inactiveCallButton: (id, onSuccess) => dispatch(inactiveCallButton(id, onSuccess)),
  };
};

export default withStyles(extendedTablesStyle)(connect(mapStateToProps, mapDispatchToProps)(ButtonServiceList));