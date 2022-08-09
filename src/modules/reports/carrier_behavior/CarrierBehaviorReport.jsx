// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Sms from "@material-ui/icons/Sms";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import EnhancedTableHead from "components/EnhancedTableHead/EnhancedTableHead.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import TablePagination from "components/TablePagination/TablePagination.jsx";
import Filter from "modules/components/Filter.jsx";
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { getCarrierBehavior, getCarrierBehaviorExport } from 'modules/reports/carrier_behavior/CarrierBehaviorReportActions';
import { NAME_OPERATOR, ROW_GRAY, ROW_WHITE } from "modules/utils/ApiUtil.js";
import React from 'react';
import { CSVLink } from 'react-csv';
import { connect } from "react-redux";



const rows = [
  /*{ id: 4, numeric: false, disablePadding: true, isSorted: true, label: 'Nombre' },
  { id: 5, numeric: false, disablePadding: true, isSorted: false, label: 'Horas dedicadas' },
  { id: 6, numeric: false, disablePadding: true, isSorted: false, label: 'Horas en turno' },
  { id: 7, numeric: false, disablePadding: true, isSorted: false, label: 'Solicitudes completadas' },
  { id: 8, numeric: false, disablePadding: true, isSorted: false, label: 'Promedio aceptación (Seg)' },
  { id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Promedio llegada origen (Seg)' },
  { id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Promedio llegada destino (Seg)' },
  { id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Solicitudes rechazadas' },
  { id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Solicitudes canceladas' },
  { id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Tiempo en ausencia (Min)' },*/
  { id: 4, numeric: false, disablePadding: true, isSorted: false, label: `Nombre del ${NAME_OPERATOR}` },
  { id: 5, numeric: false, disablePadding: true, isSorted: false, label: 'Tipo información' },
  { id: 6, numeric: false, disablePadding: true, isSorted: false, label: 'Detalle' },
  { id: 7, numeric: false, disablePadding: true, isSorted: false, label: 'Cantidad' },
];


class CarrierBehaviorReport extends React.Component {

  constructor(props) {
    super(props);

    this.csvLink = React.createRef();

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
        , idCarrier: ""
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
    this.getUpdateData();
  };

  componentWillUnmount() {

  }

  onFilter = filter => {
    this.setState({ filter });
    this.props.getCarrierBehavior((success) => {

    },
      filter.startDate,
      filter.endDate,
      filter.idCarrier,
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
      this.state.filter.idCarrier,
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
      this.state.filter.idCarrier,
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
      this.state.filter.idCarrier,
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

  getUpdateData = () => {
    this.props.getCarrierBehavior((success) => {
    },
      this.state.filter.startDate,
      this.state.filter.endDate,
      this.state.filter.idCarrier,
      undefined,
      this.state.apiPagination.page,
      this.state.apiPagination.order,
      this.state.apiPagination.rowsPerPage,
      this.state.apiPagination.orderBy,
      this.state.apiPagination.page,
      this.state.filter.name
    );
  }

  handleExportContent = () => {
    this.props.getCarrierBehaviorExport((success) => {
      this.csvLink.current.link.click();
    },
      this.state.filter.startDate,
      this.state.filter.endDate,
      this.state.filter.idCarrier,
      undefined,
      1,
      this.state.apiPagination.order,
      1000000,
      this.state.apiPagination.orderBy,
      this.state.apiPagination.page,
      this.state.filter.name
    );
    
  };



  /**
   * Contenido gráfico de la opción.
   */
  render = () => {
    var d = new Date();

    var dateForCSV = d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + " " +
      d.getHours() + "-" + d.getMinutes();

    const { classes } = this.props;
    const { isActivityIndicatorShown } = this.props.carrierBehaviorReportState.data;
    var apiPagination = undefined;
    try {
      apiPagination = this.props.carrierBehaviorReportState.data.resultCarrierBehavior.apiPagination;
    } catch (except) { }

    var result = undefined;
    try {
      result = this.props.carrierBehaviorReportState.data.resultCarrierBehavior.result;
    } catch (except) { }

    var resultExport = undefined;
    try {
      resultExport = this.props.carrierBehaviorReportState.data.resultCarrierBehaviorExport.result;
    } catch (except) { }

    if (apiPagination === undefined) {
      apiPagination = {};
    }
    if (result === undefined) {
      result = [];
    }
    if (resultExport === undefined) {
      resultExport = [];
    }

    const headersCSV = [
      { key: 'email', label: 'email' },
      { key: 'identification', label: 'Identificación' },
      { key: 'carrier', label: `Nombre del ${NAME_OPERATOR}` },
      { key: 'typeInfo', label: 'Tipo información' },
      { key: 'nameInfo', label: 'Detalle' },
      { key: 'quantity', label: 'Cantidad' },
    ];

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
              <a
                href="#Export"
                onClick={(event) => {
                  this.handleExportContent();
                }}
              >
                Exportar Excel
              </a>
              <CSVLink
                className="hidden"
                color="info"
                data={resultExport}
                separator={";"}
                filename={'Comportamiento_' + NAME_OPERATOR + '(' + dateForCSV + ').csv'}
                headers={headersCSV}
                ref={this.csvLink}
              />

            </CardHeader>
            <CardBody style={{ overflow: "auto" }}>
              <Filter
                onFilter={this.onFilter}
                initialDate={true}
                initialDateValue={this.state.initialDateValue}
                endDate={true}
                endDateValue={this.state.endDateValue}
                carrier={false}
                showCarrier={true}
                borderBottom={true} />

              <Table className={classes.table}
                aria-labelledby="tableTitle"
                //fixedheader={false}
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
                      <TableRow tabIndex={-1} key={`TableRow-${key}`} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                        <TableCell align="left">{carrier.carrier}</TableCell>
                        <TableCell align="left">{carrier.typeInfo}</TableCell>
                        <TableCell align="left">{carrier.nameInfo}</TableCell>
                        <TableCell align="right">{carrier.quantity}</TableCell>
                      </TableRow>
                    )
                  })}
                  {/*return (
                      <TableRow tabIndex={-1} key={`TableRow-${key}`} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                        <TableCell align="left">{carrier.name_user}</TableCell>
                        <TableCell align="right">{carrier.dedicated_requests_hours}</TableCell>
                        <TableCell align="right">{carrier.hours_shift}</TableCell>
                        <TableCell align="right">{carrier.completed_request}</TableCell>
                        <TableCell align="right">{carrier.avr_accept_requests_seconds}</TableCell>
                        <TableCell align="right">{carrier.avr_arrival_begin_seconds}</TableCell>
                        <TableCell align="right">{carrier.avr_arrival_end_seconds}</TableCell>
                        <TableCell align="right">{carrier.rejected_request}</TableCell>
                        <TableCell align="right">{carrier.canceled_request}</TableCell>
                        <TableCell align="right">{carrier.absence_minutes}</TableCell>
                      </TableRow>);
                  })*/}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100, 1000]}
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

    getCarrierBehaviorExport: (onSuccess,
      beginDate,
      endDate,
      listIdStates,
      apiPaginationAction,
      apiPaginationCurrentPage,
      apiPaginationDirection,
      apiPaginationLimit,
      apiPaginationOrderColumn,
      apiPaginationMoveToPage,
      apiPaginationFilter) => dispatch(getCarrierBehaviorExport(onSuccess,
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
