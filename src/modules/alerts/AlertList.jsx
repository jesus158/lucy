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
import Warning from '@material-ui/icons/Warning';
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
import { findAlert, inactiveAlert, setAlert } from 'modules/alerts/AlertActions.js';
import Filter from "modules/components/Filter.jsx";
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { MILI_SECONDS_REFRESH_LIST, ROW_GRAY, ROW_WHITE } from "modules/utils/ApiUtil.js";
import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


const rows = [
  { id: 0, numeric: false, disablePadding: true, isSorted: false, label: '' },
  { id: 0, numeric: false, disablePadding: false, isSorted: true, label: 'id' },
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Tipo alerta' },
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Ubicacion' },
  { id: 4, numeric: false, disablePadding: false, isSorted: false, label: 'Activo' },
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Tiempo' },
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Estado' },
];

var prevNowPlaying = null;

class AlertList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: {},
      order: 0,
      orderBy: 4,
      page: 0,
      rowsPerPage: 5,
      toAdmin: false,
      alertId: 0,
      alertInactive: null
    };
    this.props.findAlert(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
  }

  componentDidMount = () => {
    if (prevNowPlaying) {
      clearInterval(prevNowPlaying);
      prevNowPlaying = null;
    }
    prevNowPlaying = setInterval(() => {
      this.props.findAlert(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
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

    this.props.findAlert(undefined, this.state.page, order, this.state.rowsPerPage, orderBy, this.state.page, this.state.filter.name);
    this.setState({ order, orderBy });
  };

  handleEdit = (id) => {
    this.props.setAlert({
      active: 1,
      id: 0,
      ubication: { id: 0 },
      asset: [],
      typeAlert: { id: 0 },
      time: 0
    });
    this.setState({
      toAdmin: true
      , alertId: id
    });
  }

  showAlertInactive = (id) => {
    console.log("ID");
    console.log(id);
    this.setState({
      alertInactive: (
        <Dialog open={true}>

          <DialogTitle id="form-dialog-title">Inactivar</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro que quiere inactivar esta alerta?
                </DialogContentText>
          </DialogContent> 
          <DialogActions>
            <Button onClick={this.hideAlertInactive} color="danger">
              Cancelar
                </Button>
            <Button onClick={() => {
              this.hideAlertInactive();
              this.props.inactiveAlert(id, success => {
                this.props.findAlert(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
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
    this.props.findAlert(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, filter.name);
  }

  handleChangePage = (page) => {
    this.props.findAlert(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, page, this.state.filter.name);
    this.setState({ page });
  };

  handleChangeRowsPerPage = rowsPerPage => {
    this.props.findAlert(undefined, this.state.page, this.state.order, rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
    this.setState({ rowsPerPage });
  };

  render() {

    var { isActivityIndicatorShown } = false;
    try {
      //var { isActivityIndicatorShown } = this.props.buttonServiceState.data;
    } catch (ex) { }
    var apiPagination = {};
    var listAlert = [];
    try {
      apiPagination = this.props.alertState.data.listResultSetAlert.apiPagination;
      listAlert= this.props.alertState.data.listResultSetAlert.listAlert;
    } catch (ex) { }
    const { classes } = this.props;


    const { order, orderBy } = this.state;


    if (apiPagination === undefined) {
      apiPagination = {};
    }

    if (listAlert === undefined) {
      listAlert = [];
    }

    if (this.state.toAdmin === true) {
      return <Redirect to={'/admin/admin-alert/?code=' + this.state.alertId} />
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
              <Warning />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Alertas</h4>
          </CardHeader>
          <CardBody style={{ overflow: "auto" }}>
            <Filter onFilter={this.onFilter} name={true} nameText={"Filtrar"} placeholder={"activo"} />
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                onRequestSort={this.handleRequestSort}
                order={order === 0 ? 'asc' : 'desc'}
                orderBy={orderBy+''}
                rowCount={20}
                rows={rows}
              />
              <TableBody>
                {listAlert.map((alert, key) => {
                  return (
                    <TableRow tabIndex={-1} key={`TableRow-${key}`} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                      <TableCell align="right" className="text-column">
                        <div>
                          <Button
                            color="success"
                            simple
                            className={classes.actionButton}
                            key={"edit_" + alert.id}
                            onClick={() => { this.handleEdit(alert.id) }}>
                            <Edit className={classes.icon} />
                          </Button>
                          <Button
                            color="danger"
                            simple
                            className={classes.actionButton}
                            key={"close_" + alert.id}
                            onClick={this.showAlertInactive.bind(this,alert.id)}>
                            <Block className={classes.icon} />
                          </Button>

                        </div>
                      </TableCell>
                      <TableCell align="left">{alert.id}</TableCell>
                      <TableCell align="left">{alert.typeAlert.name}</TableCell>
                      <TableCell align="left">{alert.ubication}</TableCell>
                      <TableCell align="left">{alert.asset}</TableCell>
                      <TableCell align="left">{alert.time}</TableCell>
                      <TableCell className="text-column">
                        {alert.active === 1 ? (
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
    alertState: state.alertState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findAlert: (apiPaginationAction
      , apiPaginationCurrentPage
      , apiPaginationDirection
      , apiPaginationLimit
      , apiPaginationOrderColumn
      , apiPaginationMoveToPage
      , apiPaginationFilter) => dispatch(findAlert(apiPaginationAction
        , apiPaginationCurrentPage
        , apiPaginationDirection
        , apiPaginationLimit
        , apiPaginationOrderColumn
        , apiPaginationMoveToPage
        , apiPaginationFilter)),
    setAlert: (alert) => dispatch(setAlert(alert)),
    inactiveAlert: (id, onSuccess) => dispatch(inactiveAlert(id, onSuccess)),
  };
};

export default withStyles(extendedTablesStyle)(connect(mapStateToProps, mapDispatchToProps)(AlertList));