// module components
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
import { findHotspot, inactiveHotspot, setHotspot } from 'modules/buttons/hotspot/HotspotActions.js';
import Filter from "modules/components/Filter.jsx";
import WaitDialog from "modules/components/WaitDialog.jsx";
import { ROW_GRAY, ROW_WHITE } from "modules/utils/ApiUtil.js";
import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


const rows = [
  { id: 2, numeric: false, disablePadding: false, isSorted: true, label: 'Código' },
  { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Estado' },
  { id: 0, numeric: false, disablePadding: true, isSorted: false, label: '' },
];

class HotspotList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: {},
      order: 0,
      orderBy: 2,
      page: 0,
      rowsPerPage: 5,
      toAdmin: false,
      hotspotId: 0,
      alertInactive: null
    };
  }

  componentDidMount = () => {
    this.props.findHotspot(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 1;

    if (this.state.orderBy === property && this.state.order === 1) {
      order = 0;
    }

    this.props.findHotspot(undefined, this.state.page, order, this.state.rowsPerPage, orderBy, this.state.page, this.state.filter.name);
    this.setState({ order, orderBy });
  };

  handleEdit = (id) => {
    this.props.setHotspot({
      account: { id: 0 },
      id: 0,
      hotspot: "",
      active: 1
    });
    this.setState({
      toAdmin: true
      , hotspotId: id
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
              ¿Está seguro que quiere inactivar este receptor?
                </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.hideAlertInactive} color="danger">
              Cancelar
                </Button>
            <Button onClick={() => {
              this.hideAlertInactive();
              this.props.inactiveHotspot(id, success => {
                this.props.findHotspot(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
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
    this.props.findHotspot(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, filter.name);
  }

  handleChangePage = (page) => {
    this.props.findHotspot(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, page, this.state.filter.name);
    this.setState({ page });
  };

  handleChangeRowsPerPage = rowsPerPage => {
    this.props.findHotspot(undefined, this.state.page, this.state.order, rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
    this.setState({ rowsPerPage });
  };

  render() {
    const { order, orderBy } = this.state;

    const { classes } = this.props;
    var isActivityIndicatorShown = false;
    try {
        isActivityIndicatorShown  = this.props.hotspotState.data.isActivityIndicatorShown;
    } catch (ex) { }

    var apiPagination = {};
    var listHotspotCallButton = [];
    try {
      listHotspotCallButton = this.props.hotspotState.data.listHotspotCallButton.listHotspotCallButton;
      apiPagination = this.props.hotspotState.data.listHotspotCallButton.apiPagination;
    } catch (ex1) { 

    }

    if (apiPagination === undefined) {
      apiPagination = {};
    }

    if (listHotspotCallButton === undefined) {
      listHotspotCallButton = [];
    }

    if (this.state.toAdmin === true) {
      return <Redirect to={'/admin/admin-hotspot?code=' + this.state.hotspotId} />
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
            <h4 className={classes.cardIconTitle}>Receptores</h4>
          </CardHeader>
          <CardBody style={{ overflow: "auto" }}>
          <Filter onFilter={this.onFilter} name={true} nameText={"Filtrar"} placeholder={"Código"} />
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                onRequestSort={this.handleRequestSort}
                order={order === 0 ? 'asc' : 'desc'}
                orderBy={orderBy+''}
                rowCount={20}
                rows={rows}
              />
              <TableBody>
                {listHotspotCallButton.map((hotspot, key) => {
                  return (
                    <TableRow tabIndex={-1} key={`TableRow-${key}`} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                      <TableCell align="left"><Link color="inherit" onClick={() => { this.handleEdit(hotspot.id) }} component="button" size="sm" className={classes.marginRight}>{hotspot.hotspot}</Link></TableCell>
                      <TableCell className="text-column">
                        {hotspot.active === 1 ? (
                          <Badge color="success">Activo</Badge>
                        ) : <Badge color="danger">Inactivo</Badge>}
                      </TableCell>
                      <TableCell align="right" className="text-column">
                        <div>
                          <Button
                            color="success"
                            simple
                            className={classes.actionButton}
                            key={"edit_" + hotspot.id}
                            onClick={() => { this.handleEdit(hotspot.id) }}>
                            <Edit className={classes.icon} />
                          </Button>
                          <Button
                            color="danger"
                            simple
                            className={classes.actionButton}
                            key={"close_" + hotspot.id}
                            onClick={this.showAlertInactive.bind(this, hotspot.hotspot, hotspot.id)}>
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
    hotspotState: state.hotspotState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findHotspot: (apiPaginationAction
      , apiPaginationCurrentPage
      , apiPaginationDirection
      , apiPaginationLimit
      , apiPaginationOrderColumn
      , apiPaginationMoveToPage
      , apiPaginationFilter) => dispatch(findHotspot(apiPaginationAction
        , apiPaginationCurrentPage
        , apiPaginationDirection
        , apiPaginationLimit
        , apiPaginationOrderColumn
        , apiPaginationMoveToPage
        , apiPaginationFilter)),
    setHotspot: (hotspot) => dispatch(setHotspot(hotspot)),
    inactiveHotspot: (id, onSuccess) => dispatch(inactiveHotspot(id, onSuccess)),
  };
};

export default withStyles(extendedTablesStyle)(connect(mapStateToProps, mapDispatchToProps)(HotspotList));