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
import { ROW_GRAY, ROW_WHITE } from "modules/utils/ApiUtil.js";
import React from 'react';
import { CSVLink } from 'react-csv';
import { connect } from "react-redux";
import { getServiceAccount, getServiceAccountExport } from './CountServicesReportActions';



const rows = [
  { id: 1, numeric: false, disablePadding: true, isSorted: true, label: 'Grupo' },
  { id: 2, numeric: false, disablePadding: true, isSorted: true, label: 'Reporte' },
  { id: 3, numeric: false, disablePadding: true, isSorted: false, label: 'Total de servicios' },
  { id: 4, numeric: false, disablePadding: true, isSorted: false, label: 'Servicios completados' },
  { id: 5, numeric: false, disablePadding: true, isSorted: false, label: 'Servicios cancelados' },
];

class CountServicesReport extends React.Component {

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
        , groupBy: ""
      },
      apiPagination: {
        order: 0,
        orderBy: 1,
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

    this.props.getServiceAccount((success) => {
    },
      this.state.filter.startDate,
      this.state.filter.endDate,
      this.state.filter.groupBy,
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
    this.props.getServiceAccount((success) => {

    },
      filter.startDate,
      filter.endDate,
      filter.groupBy,
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

    this.props.getServiceAccount((success) => {

    },
      this.state.filter.startDate,
      this.state.filter.endDate,
      this.state.filter.groupBy,
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
    this.props.getServiceAccount((success) => {

    },
      this.state.filter.startDate,
      this.state.filter.endDate,
      this.state.filter.groupBy,
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
    this.props.getServiceAccount((success) => {

    },
      this.state.filter.startDate,
      this.state.filter.endDate,
      this.state.filter.groupBy,
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

  handleExportContent = rowsPerPage => {
    this.props.getServiceAccountExport((success) => {
      this.csvLink.current.link.click();
    },
      this.state.filter.startDate,
      this.state.filter.endDate,
      this.state.filter.groupBy,
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
    const { isActivityIndicatorShown } = this.props.countServicesReportState.data;

    var apiPagination = undefined;
    try {
      apiPagination = this.props.countServicesReportState.data.resultCountServices.apiPagination;
    } catch (except) { }

    var result = undefined;
    try {
      result = this.props.countServicesReportState.data.resultCountServices.result;
    } catch (except) { }

    var resultExport = undefined;
    try {
      resultExport = this.props.countServicesReportState.data.resultCountServicesExport.result;
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
      { key: 'grouper', label: 'Grupo' },
      { key: 'text_grouper', label: 'Reporte' },
      { key: 'total_request', label: 'Total de servicios' },
      { key: 'completed_request', label: 'Servicios completados' },
      { key: 'canceled_request', label: 'Servicios cancelados' },
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
              <h4 className={classes.cardIconTitle}>Contador de servicios</h4>
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
                filename={'contador_servicios(' + dateForCSV + ').csv'}
                headers={headersCSV}
                ref={this.csvLink}
              />
            </CardHeader>
            <CardBody style={{ overflow: "auto" }}>
              <Filter onFilter={this.onFilter}
                initialDate={true} initialDateValue={this.state.filter.startDate}
                endDate={true} endDateValue={this.state.filter.endDate}
                grouper={true}
              //showTypeService={true}
              //showStateRequest={true}
              //showCarrier={true}
              //showUbicationStart={true}
              //showUbicationEnd={true}
              />
              <Table className={classes.table}
                aria-labelledby="tableTitle"
                //fixedHeader={false}
                style={{ width: "100%", tableLayout: "auto" }}>

                <EnhancedTableHead
                  onRequestSort={this.handleRequestSort}
                  order={apiPagination.order === 0 ? 'asc' : 'desc'}
                  orderBy={apiPagination.orderBy}
                  rowCount={20}
                  rows={rows}
                />
                <TableBody>
                  {result.map((count, key) => {
                    return (
                      <TableRow tabIndex={-1} key={key} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                        <TableCell align="left">{count.grouper}</TableCell>
                        <TableCell align="left">{count.text_grouper}</TableCell>
                        <TableCell align="right">{count.total_request}</TableCell>
                        <TableCell align="right">{count.completed_request}</TableCell>
                        <TableCell align="right">{count.canceled_request}</TableCell>
                      </TableRow>);
                  })}

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
    countServicesReportState: state.countServicesReportState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getServiceAccount: (onSuccess,
      beginDate,
      endDate,
      groupBy,
      apiPaginationAction,
      apiPaginationCurrentPage,
      apiPaginationDirection,
      apiPaginationLimit,
      apiPaginationOrderColumn,
      apiPaginationMoveToPage,
      apiPaginationFilter) => dispatch(getServiceAccount(onSuccess,
        beginDate,
        endDate,
        groupBy,
        apiPaginationAction,
        apiPaginationCurrentPage,
        apiPaginationDirection,
        apiPaginationLimit,
        apiPaginationOrderColumn,
        apiPaginationMoveToPage,
        apiPaginationFilter)),

    getServiceAccountExport: (onSuccess,
      beginDate,
      endDate,
      groupBy,
      apiPaginationAction,
      apiPaginationCurrentPage,
      apiPaginationDirection,
      apiPaginationLimit,
      apiPaginationOrderColumn,
      apiPaginationMoveToPage,
      apiPaginationFilter) => dispatch(getServiceAccountExport(onSuccess,
        beginDate,
        endDate,
        groupBy,
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
  )(CountServicesReport)
);
