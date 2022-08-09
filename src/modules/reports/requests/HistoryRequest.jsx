import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import SaveIcon from '@material-ui/icons/Save';
import Sms from "@material-ui/icons/Sms";
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import extendedTablesStyle from "./node_modules/assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx.js";
import AlertInfo from "./node_modules/components/AlertInfo/AlertInfo.jsx.js";
import Badge from "./node_modules/components/Badge/Badge.jsx.js";
import Card from "./node_modules/components/Card/Card.jsx.js";
import CardBody from "./node_modules/components/Card/CardBody.jsx.js";
import CardHeader from "./node_modules/components/Card/CardHeader.jsx.js";
import CardIcon from "./node_modules/components/Card/CardIcon.jsx.js";
import Button from "./node_modules/components/CustomButtons/Button.jsx.js";
import GridContainer from "./node_modules/components/Grid/GridContainer.jsx.js";
import Icon from "@material-ui/core/Icon";
import CardFooter from "./node_modules/components/Card/CardFooter.jsx.js";
import Danger from "./node_modules/components/Typography/Danger.jsx.js";
// @material-ui/icons components
import DirectionsWalk from "@material-ui/icons/DirectionsWalk";
import Timelapse from "@material-ui/icons/Timelapse";
import InsertInvitation from "@material-ui/icons/InsertInvitation";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";

// core components
import GridItem from "./node_modules/components/Grid/GridItem.jsx.js";
import TablePagination from "./node_modules/components/TablePagination/TablePagination.jsx.js";
import EnhancedTableHead from "./node_modules/components/EnhancedTableHead/EnhancedTableHead.jsx.js";
import Filter from "./node_modules/modules/components/Filter.jsx.js";

// module components
import WaitDialog from "./node_modules/modules/components/WaitDialog.jsx.js";
import { addMessage } from './node_modules/layouts/MessagesActions';
import { getCarrierBehavior } from './CarrierBehaviorReportActions';
import React from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {NAME_OPERATOR} from "modules/utils/ApiUtil.js";

const rows = [
  { id: 4, numeric: false, disablePadding: true, isSorted: true, label: 'Nombre' },
  { id: 5, numeric: false, disablePadding: true, isSorted: false, label: 'Horas dedicadas' },
  { id: 6, numeric: false, disablePadding: true, isSorted: false, label: 'Horas en turno' },
  { id: 7, numeric: false, disablePadding: true, isSorted: false, label: 'Solicitudes completadas' },
  { id: 8, numeric: false, disablePadding: true, isSorted: false, label: 'Promedio aceptación (Seg)' },
  { id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Promedio llegada origen (Seg)' },
  { id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Promedio llegada destino (Seg)' },
  { id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Solicitudes rechazadas' },
  { id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Solicitudes canceladas' },
  { id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Tiempo en ausencia (Min)' },
];

class CarrierBehaviorReport extends React.Component {

  constructor(props) {
    super(props);

    //Ajuste del rango de fecha inicial
    let days = 7;
    var endDate = new Date();
    endDate.setHours(0, 0, 0, 0);
    var startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));
    endDate.setHours(23, 59, 59, 0);

    this.state = {
      openAlertInfo: false,
      textAlertInfo: "",
      filter: {
        startDate: startDate.getTime()
        , endDate: endDate.getTime()
        , listIdCarrier: ""
      },
      apiPagination: {
        order: 0,
        orderBy: 4,
        page: 0,
        rowsPerPage: 5
      },
      toAdmin: false,
      accountId: 0,
      isActivityIndicatorShown: false,
      initialDateValue: startDate.getTime(),
      endDateValue: endDate.getTime()
    };
  }
  /**
   * Se ejecuta al momento que se ha terminado de pintar toda la información 
   * en la interfaz o cuando esta ha cambiado
   */
  componentDidMount = () => {

    this.props.getCarrierBehavior((success) => {
    },
      this.state.filter.startDate,
      this.state.filter.endDate,
      this.state.filter.listIdCarrier,
      undefined,
      this.state.apiPagination.page,
      this.state.apiPagination.order,
      this.state.apiPagination.rowsPerPage,
      this.state.apiPagination.orderBy,
      this.state.apiPagination.page,
      this.state.filter.name
    );

  };

  componentWillUnmount() {

  }


  onFilter = filter => {
    this.setState({ filter });
    this.props.getCarrierBehavior((success) => {

    },
      filter.startDate,
      filter.endDate,
      filter.listIdCarrier,
      undefined,
      this.state.apiPagination.page,
      this.state.apiPagination.order,
      this.state.apiPagination.rowsPerPage,
      this.state.apiPagination.orderBy,
      this.state.apiPagination.page,
      filter.name
    );
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 1;

    if (this.state.apiPagination.orderBy === property && this.state.apiPagination.order === 1) {
      order = 0;
    }

    this.props.getCarrierBehavior((success) => {

    },
      this.state.filter.startDate,
      this.state.filter.endDate,
      this.state.filter.listIdCarrier,
      undefined,
      this.state.apiPagination.page,
      order,
      this.state.apiPagination.rowsPerPage,
      orderBy,
      this.state.apiPagination.page,
      this.state.filter.name
    );

    var apiPagination = this.state.apiPagination;
    apiPagination.order = order;
    apiPagination.orderBy = orderBy;
    this.setState({ apiPagination });
  };

  handleChangePage = (page) => {
    this.props.getCarrierBehavior((success) => {

    },
      this.state.filter.startDate,
      this.state.filter.endDate,
      this.state.filter.listIdCarrier,
      undefined,
      this.state.apiPagination.page,
      this.state.apiPagination.order,
      this.state.apiPagination.rowsPerPage,
      this.state.apiPagination.orderBy,
      page,
      this.state.filter.name
    );
    var apiPagination = this.state.apiPagination;
    apiPagination.page = page;
    this.setState({ apiPagination });
  };

  handleChangeRowsPerPage = rowsPerPage => {
    this.props.getCarrierBehavior((success) => {

    },
      this.state.filter.startDate,
      this.state.filter.endDate,
      this.state.filter.listIdCarrier,
      undefined,
      this.state.apiPagination.page,
      this.state.apiPagination.order,
      rowsPerPage,
      this.state.apiPagination.orderBy,
      this.state.apiPagination.page,
      this.state.filter.name
    );
    var apiPagination = this.state.apiPagination;
    apiPagination.rowsPerPage = rowsPerPage;
    this.setState({ apiPagination });
  };



  /**
   * Contenido gráfico de la opción.
   */
  render = () => {
    const { classes } = this.props;
    const { isActivityIndicatorShown } = this.props.carrierBehaviorReportState.data;
    var { apiPagination, result } = this.props.carrierBehaviorReportState.data.resultCarrierBehavior;

    if (apiPagination === undefined) {
      apiPagination = {};
    }
    if (result === undefined) {
      result = [];
    }

    const gunnarStyle = { height: "10px", padding: "1px 1px 1px 10px" };
    const gunnarStyle2 = { height: "10px", padding: "1px 1px 1px 3px", width: "100%" };
    const divRounded1 = { backgroundColor: "#F0F0F0", borderRadius: " 10px 10px 10px 10px", width: "100%" };
    const divRounded2 = { borderRadius: " 5px 5px 5px 5px" };

    return (
      <GridContainer >
        {isActivityIndicatorShown ?
          <WaitDialog text={"Cargando..."} />
          : null
        }
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="info">
                <Sms />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>{'Comportamiento de ' + NAME_OPERATOR}</h4>
            </CardHeader>
            <CardBody style={{ overflow: "auto" }}>
              <Filter onFilter={this.onFilter} initialDate={true} initialDateValue={this.state.initialDateValue} endDate={true} endDateValue={this.state.endDateValue} carrier={true} borderBottom={true} />

              <Table className={classes.table}
                aria-labelledby="tableTitle"
                //fixedHeader={false}
                style={{ width: "100%", tableLayout: "auto" }}>

                <EnhancedTableHead
                  onRequestSort={this.handleRequestSort}
                  order={apiPagination.order === 0 ? 'asc' : 'desc'}
                  orderBy={apiPagination.orderBy + ''}
                  rowCount={20}
                  rows={rows}
                />
                <TableBody>
                  {result.map((carrier, key) => {
                    return (
                      <TableRow tabIndex={-1} key={key} style={{ background: key % 2 == 0 ? '#f7f7f7' : '#ffffff' }}>
                        <TableCell align="left">{carrier.name_user}</TableCell>
                        <TableCell align="rigth">{carrier.dedicated_requests_hours}</TableCell>
                        <TableCell align="rigth">{carrier.hours_shift}</TableCell>
                        <TableCell align="rigth">{carrier.completed_request}</TableCell>
                        <TableCell align="rigth">{carrier.avr_accept_requests_seconds}</TableCell>
                        <TableCell align="rigth">{carrier.avr_arrival_begin_seconds}</TableCell>
                        <TableCell align="rigth">{carrier.avr_arrival_end_seconds}</TableCell>
                        <TableCell align="rigth">{carrier.rejected_request}</TableCell>
                        <TableCell align="rigth">{carrier.canceled_request}</TableCell>
                        <TableCell align="rigth">{carrier.absence_minutes}</TableCell>
                      </TableRow>);
                  })}

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
      </GridContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    carrierBehaviorReportState: state.carrierBehaviorReportState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCarrierBehavior: (onSuccess,
      beginDate,
      endDate,
      listIdStates,
      apiPaginationAction,
      apiPaginationCurrentPage,
      apiPaginationDirection,
      apiPaginationLimit,
      apiPaginationOrderColumn,
      apiPaginationMoveToPage,
      apiPaginationFilter) => dispatch(getCarrierBehavior(onSuccess,
        beginDate,
        endDate,
        listIdStates,
        apiPaginationAction,
        apiPaginationCurrentPage,
        apiPaginationDirection,
        apiPaginationLimit,
        apiPaginationOrderColumn,
        apiPaginationMoveToPage,
        apiPaginationFilter)),
  };
};

export default withStyles(extendedTablesStyle)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CarrierBehaviorReport)
);
