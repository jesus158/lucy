import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Block from "@material-ui/icons/Block";
import Edit from "@material-ui/icons/Edit";
// material-ui icons
import Router from "@material-ui/icons/Router";
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
import Filter from "modules/components/Filter.jsx";
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { findGateway, inactiveGateway, setGateway } from 'modules/gateway/GatewayActions.js';
import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { MILI_SECONDS_REFRESH_LIST,ROW_GRAY,ROW_WHITE,GATEWAY_NAME } from "modules/utils/ApiUtil.js";

const rows = [
  { id: 3, numeric: false, disablePadding: false, isSorted: true, label: 'Nombre' },
  { id: 2, numeric: false, disablePadding: false, isSorted: false, label: 'Prioridad' },
  { id: 4, numeric: false, disablePadding: false, isSorted: false, label: 'Estado' },
  { id: 5, numeric: false, disablePadding: true, isSorted: false, label: '' },
];

class GatewayList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: {},
      order: 0,
      orderBy: 3,
      page: 0,
      rowsPerPage: 5,
      toAdmin: false,
      accountId: 0,
      alertInactive: null
    };
  }

  componentDidMount = () => {
    this.props.findGateway(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 1;

    if (this.state.orderBy === property && this.state.order === 1) {
      order = 0;
    }

    this.props.findGateway(undefined, this.state.page, order, this.state.rowsPerPage, orderBy, this.state.page, this.state.filter.name);
    this.setState({ order, orderBy });
  };

  handleEdit = (id) => {
    this.props.setGateway({
      id: 0,
      serviceName: "",
      priority: 0,
      active: 1
    });
    this.setState({
      toAdmin: true
      , accountId: id
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
              ¿Está seguro que quiere inactivar este servicio?
                </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.hideAlertInactive} color="danger">
              Cancelar
                </Button>
            <Button onClick={() => {
              this.hideAlertInactive();
              this.props.inactiveGateway(id, success => {
                this.props.findGateway(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
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
    this.props.findGateway(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, filter.name);
  }

  handleChangePage = (page) => {
    this.props.findGateway(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, page, this.state.filter.name);
    this.setState({ page });
  };

  handleChangeRowsPerPage = rowsPerPage => {
    this.props.findGateway(undefined, this.state.page, this.state.order, rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
    this.setState({ rowsPerPage });
  };

  render() {
    const { classes } = this.props;
    var isActivityIndicatorShown = false;
    try {
      var { isActivityIndicatorShown } = this.props.typeServiceState.data;
    } catch (ex) { }

    var apiPagination = {};
    var listGateway = [];
    try {
      var { apiPagination, listGateway } = this.props.typeServiceState.data.listResultSetGateway;
    } catch (ex1) { }


    const { order, orderBy, selected, page, rowsPerPage } = this.state;

    if (apiPagination === undefined) {
      apiPagination = {};
    }

    if (listGateway === undefined) {
      listGateway = [];
    }

    if (this.state.toAdmin === true) {
      return <Redirect to={'/admin/admin-type-service/?code=' + this.state.accountId} />
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
            <CardIcon color="primary">
              <Router />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Receptores</h4>
          </CardHeader>
          <CardBody>
            <Filter onFilter={this.onFilter} name={true} />
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                onRequestSort={this.handleRequestSort}
                order={order === 0 ? 'asc' : 'desc'}
                orderBy={orderBy+''}
                rowCount={20}
                rows={rows}
              />
              <TableBody>
                {listGateway.map((typeService, key) => {
                  return (
                    <TableRow tabIndex={-1} key={key} style={{ background: key % 2 == 0 ? ROW_GRAY : ROW_WHITE }}>
                      <TableCell align="left"><Link color="inherit" onClick={() => { this.handleEdit(typeService.id) }} component="button" size="sm" className={classes.marginRight}>{typeService.serviceName}</Link></TableCell>
                      <TableCell align="left">{typeService.priority}</TableCell>
                      <TableCell className="text-column">
                        {typeService.active == 1 ? (
                          <Badge color="success">Activa</Badge>
                        ) : <Badge color="danger">Inactiva</Badge>}
                      </TableCell>
                      <TableCell align="right" className="text-column">
                        <div>
                          <Button
                            color="success"
                            simple
                            className={classes.actionButton}
                            key={"edit_" + typeService.id}
                            onClick={() => { this.handleEdit(typeService.id) }}>
                            <Edit className={classes.icon} />
                          </Button>
                          <Button
                            color="danger"
                            simple
                            className={classes.actionButton}
                            key={"close_" + typeService.id}
                            onClick={this.showAlertInactive.bind(this, typeService.nameAccount, typeService.id)}>
                            <Block className={classes.icon} />
                          </Button>

                        </div>
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
    typeServiceState: state.typeServiceState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findGateway: (apiPaginationAction
      , apiPaginationCurrentPage
      , apiPaginationDirection
      , apiPaginationLimit
      , apiPaginationOrderColumn
      , apiPaginationMoveToPage
      , apiPaginationFilter) => dispatch(findGateway(apiPaginationAction
        , apiPaginationCurrentPage
        , apiPaginationDirection
        , apiPaginationLimit
        , apiPaginationOrderColumn
        , apiPaginationMoveToPage
        , apiPaginationFilter)),
    setGateway: (typeService) => dispatch(setGateway(typeService)),
    inactiveGateway: (id, onSuccess) => dispatch(inactiveGateway(id, onSuccess)),
  };
};

export default withStyles(extendedTablesStyle)(connect(mapStateToProps, mapDispatchToProps)(GatewayList));