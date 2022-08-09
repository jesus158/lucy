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
import VisibilityIcon from '@material-ui/icons/Visibility';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import TablePagination from "components/TablePagination/TablePagination.jsx";
import Filter from "modules/components/Filter.jsx";
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import {getHistoryRequest, getHistoryRequestExport} from 'modules/reports/history_request/HistoryRequestActions.js';
import {NAME_OPERATOR_TITLE, ROW_GRAY, ROW_WHITE} from "modules/utils/ApiUtil.js";
import React from 'react';
import {CSVLink} from 'react-csv';
import {connect} from "react-redux";
import Button from "../../../components/CustomButtons/Button";
import Edit from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CancelIcon from "@material-ui/icons/Cancel";
import SaveIcon from "@material-ui/icons/Save";
import Block from "@material-ui/icons/Block";

const rows = [
    {id: 4, numeric: false, disablePadding: true, isSorted: false, label: 'Solicitud'},
    {id: 5, numeric: false, disablePadding: true, isSorted: false, label: 'Fecha'},
    {id: 6, numeric: false, disablePadding: true, isSorted: false, label: 'Solicitante'},
    {id: 7, numeric: false, disablePadding: true, isSorted: false, label: 'Tipo'},
    {id: 9, numeric: false, disablePadding: true, isSorted: false, label: NAME_OPERATOR_TITLE},
    {id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Origen'},
    {id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Destino'},
    {id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Estado'},
    {id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Tiempo Inicio Solicitud (Min)'},
    {id: 9, numeric: false, disablePadding: true, isSorted: false, label: 'Botón'},
    {id: 8, numeric: false, disablePadding: true, isSorted: false, label: 'Información'},
    {id: 10, numeric: false, disablePadding: true, isSorted: false, label: 'Recibido Por'},
    {id: 8, numeric: false, disablePadding: true, isSorted: false, label: 'Novedades'},

];

class HistoryRequest extends React.Component {

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
            exportCSV: false,
            openAlertInfo: false,
            textAlertInfo: "",
            filter: {
                startDate: startDate.getTime()
                , endDate: endDate.getTime()
                , idTypeService: undefined
                , stateRequest: undefined
                , idCarrier: undefined
                , locationBegin: undefined
                , locationEnd: undefined
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
            endDateValue: endDate.getTime(),
            alertInactive: null,
        };
    }

    /**
     * Se ejecuta al momento que se ha terminado de pintar toda la información
     * en la interfaz o cuando esta ha cambiado
     */
    componentDidMount = () => {

        this.props.getHistoryRequest((success) => {
                // console.log(success)
            },
            this.state.filter.startDate,
            this.state.filter.endDate,
            this.state.filter.idTypeService,
            this.state.filter.stateRequest,
            this.state.filter.idCarrier,
            this.state.filter.locationBegin,
            this.state.filter.locationEnd,
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
        this.setState({filter});
        this.props.getHistoryRequest((success) => {

            },
            filter.startDate,
            filter.endDate,
            filter.idTypeService,
            filter.stateRequest,
            filter.idCarrier,
            filter.locationBegin,
            filter.locationEnd,
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

        this.props.getHistoryRequest((success) => {

            },
            this.state.filter.startDate,
            this.state.filter.endDate,
            this.state.filter.idTypeService,
            this.state.filter.stateRequest,
            this.state.filter.idCarrier,
            this.state.filter.locationBegin,
            this.state.filter.locationEnd,
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
        this.setState({apiPagination});
    };

    handleChangePage = (page) => {
        this.props.getHistoryRequest((success) => {

            },
            this.state.filter.startDate,
            this.state.filter.endDate,
            this.state.filter.idTypeService,
            this.state.filter.stateRequest,
            this.state.filter.idCarrier,
            this.state.filter.locationBegin,
            this.state.filter.locationEnd,
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
        this.setState({apiPagination});
    };

    handleChangeRowsPerPage = rowsPerPage => {
        this.props.getHistoryRequest((success) => {

            },
            this.state.filter.startDate,
            this.state.filter.endDate,
            this.state.filter.idTypeService,
            this.state.filter.stateRequest,
            this.state.filter.idCarrier,
            this.state.filter.locationBegin,
            this.state.filter.locationEnd,
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
        this.setState({apiPagination});
    };

    handleExportContent = () => {
        this.props.getHistoryRequestExport((success) => {
                this.csvLink.current.link.click();
            },
            this.state.filter.startDate,
            this.state.filter.endDate,
            this.state.filter.idTypeService,
            this.state.filter.stateRequest,
            this.state.filter.idCarrier,
            this.state.filter.locationBegin,
            this.state.filter.locationEnd,
            undefined,
            1,
            this.state.apiPagination.order,
            1000000,
            this.state.apiPagination.orderBy,
            this.state.apiPagination.page,
            this.state.filter.name
        );

    };

    hideAlertInactive = () => {
        this.setState({
            alertInactive: null
        });
    };

    showAlertNewness = (request) => {

        this.setState({
            alertInactive: (
                <React.Fragment>
                    <Dialog
                        open={true}
                        onClose={this.hideAlertInactive}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">
                            {'Lista de novedades'}
                        </DialogTitle>
                        <div align="center">
                            <DialogContent>
                                <span>{this.getNewnwess(request)}</span>
                            </DialogContent>
                            <Button
                                style={{width: 100}}
                                onClick={this.hideAlertInactive}
                                color="info"
                                round><CancelIcon/>
                                cerrar
                            </Button>
                        </div>
                    </Dialog>
                </React.Fragment>
            )
        });
    }

    getNewnwess = (request) => {
        var data = "";
        // console.log(request)
        request.novedades.forEach(localRequestNewness => {
            data += "  [" +localRequestNewness.newnessName + " | " + new Date(localRequestNewness.timeStart).toLocaleString() + "]" ;
        })
        if (data == "") {
            return "NO ASOCIADAS"
        }
        return data;
    }


    //Mostrar tiempo dese que se inicio la solicitud en formato hh:mm:ss

    secondsToString(seconds) {
        var timeStr = "";

        if (seconds >= 3600) {
            timeStr = timeStr.concat(Math.floor(seconds / 3600) + "h:");
            seconds = seconds % 3600;
        }

        if (seconds >= 60) {
            timeStr = timeStr.concat(Math.floor(seconds / 60) + "m:");
            seconds = seconds % 60;
        } else {
            timeStr = timeStr.concat("0m:");
        }

        timeStr = timeStr.concat(Math.floor(seconds) + "s");

        return timeStr;
    }

    /**
     * Contenido gráfico de la opción.
     */
    render = () => {
        var d = new Date();
        var dateForCSV = d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + " " +
            d.getHours() + "-" + d.getMinutes();

        const {classes} = this.props;
        const {isActivityIndicatorShown} = this.props.historyRequestState.data;
        var apiPagination = undefined;
        try {
            apiPagination = this.props.historyRequestState.data.resultHistoryRequest.apiPagination;
        } catch (except) {
        }

        var result = undefined;
        try {
            result = this.props.historyRequestState.data.resultHistoryRequest.result;
        } catch (exception) {
        }

        var resultExport = undefined;
        try {
            resultExport = this.props.historyRequestState.data.resultHistoryRequestExport.result;

            for  ( var i=0; i<resultExport.length; i++){
                resultExport[i].novedadesString =""
                resultExport[i].novedades.forEach(localRequestNewness => {
                    if(localRequestNewness.newnessName !== undefined){
                        resultExport[i].novedadesString += localRequestNewness.newnessName + " | " + new Date(localRequestNewness.timeStart).toLocaleString() + " \n "  ;
                    }
                })
            } console.log(resultExport)
        } catch (exception) {
        }
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
            {label: 'Id', key: 'id'},
            {label: 'Fecha de solicitud', key: 'dateRequest'},
            {label: 'Solicitante', key: 'nameUserRequest'},
            {label: 'Tipo de solicitud', key: 'serviceName'},
            {label: 'Información', key: 'moreInformation'},
            {label: NAME_OPERATOR_TITLE, key: 'nameUser'},
            {label: 'Botón usado', key: 'callButton'},
            {label: 'Origen', key: 'beginNameUbication'},
            {label: 'Destino', key: 'endNameUbication'},
            {label: 'Estado', key: 'state'},
            {label: 'Tiempo inicio', key: 'realTime'},
            {label: 'Novedades', key: 'novedadesString'},
            {label: 'Recibido Por', key: 'nameReceived'},
        ];
        return (

            <GridContainer>
                {isActivityIndicatorShown ?
                    <WaitDialog text={"Cargando..."}/>
                    : null
                }
                {this.state.alertInactive}
                <GridItem xs={12} sm={12} md={12} lg={12}>
                    <Card>
                        <CardHeader color="info" icon>
                            <CardIcon color="info">
                                <Sms/>
                            </CardIcon>
                            <h4 className={classes.cardIconTitle}>Historia de solicitudes</h4>
                            <a
                                href="#Export"
                                onClick={(event) => {
                                    this.handleExportContent();
                                }}
                            >
                                Exportar Excel
                            </a>
                            <CSVLink
                                color="info"
                                data={resultExport}
                                separator={";"}
                                filename={'Historia_solicitudes(' + dateForCSV + ').csv'}
                                headers={headersCSV}
                                className="hidden"
                                ref={this.csvLink}
                            />
                        </CardHeader>
                        <CardBody style={{overflow: "auto"}}>
                            <Filter onFilter={this.onFilter}
                                    initialDate={true} initialDateValue={this.state.filter.startDate}
                                    endDate={true} endDateValue={this.state.filter.endDate}
                                    carrier={false} borderBottom={false}
                                    showTypeService={true}
                                    showStateRequest={true}
                                    showCarrier={true}
                                    showUbicationStart={true}
                                    showUbicationEnd={true}
                            />

                            <Table className={classes.table}
                                   aria-labelledby="tableTitle"
                                //fixedHeader={false}
                                   style={{width: "100%", tableLayout: "auto"}}>

                                <EnhancedTableHead
                                    onRequestSort={this.handleRequestSort}
                                    order={apiPagination.order === 0 ? 'asc' : 'desc'}
                                    orderBy={apiPagination.orderBy + ''}
                                    rowCount={20}
                                    rows={rows}
                                />
                                {/* <TableHead>
                  <TableRow tabIndex={-1} key={'headTablerequests'}>
                    <TableCell align="center">{'Solicitud'}</TableCell>
                    <TableCell align="center">{'Fecha'}</TableCell>
                    <TableCell align="center">{'Solicitante'}</TableCell>
                    <TableCell align="center">{'Tipo'}</TableCell>
                    <TableCell align="center">{'Observaciones'}</TableCell>
                    <TableCell align="center">{'Operador'}</TableCell>
                    <TableCell align="center">{'Botón'}</TableCell>
                    <TableCell align="center">{'Origen'}</TableCell>
                    <TableCell align="center">{'Destino'}</TableCell>
                    <TableCell align="center">{'Estado'}</TableCell>
                    <TableCell align="center">{'Tiempo (min)'}</TableCell>
                  </TableRow>
                </TableHead>
               */}
                                <TableBody>

                                    {result.map((request, key) => {
                                        return (

                                            <TableRow
                                                tabIndex={-1} key={key}
                                                style={{background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE}}>
                                                <TableCell align="left">{request.id}</TableCell>
                                                <TableCell align="left">{request.dateRequest}</TableCell>
                                                <TableCell align="left">{request.nameUserRequest}</TableCell>
                                                <TableCell align="left">{request.serviceName}</TableCell>
                                                <TableCell align="left">{request.nameUser}</TableCell>
                                                <TableCell align="left">{request.beginNameUbication}</TableCell>
                                                <TableCell align="left">{request.endNameUbication}</TableCell>
                                                <TableCell align="left">{request.state}</TableCell>
                                                <TableCell align="left">{request.realTime}</TableCell>
                                                <TableCell align="left">{request.callButton}</TableCell>
                                                <TableCell align="left">{request.moreInformation}</TableCell>
                                                <TableCell align="left">{request.nameReceived}</TableCell>
                                                <TableCell align="right" className="text-column">
                                                    <Button
                                                        color="info"
                                                        simple
                                                        className={classes.actionButton}
                                                        key={"edit_" + key}
                                                        onClick={() => {
                                                            this.showAlertNewness(request)

                                                        }}
                                                    >
                                                        <VisibilityIcon/>
                                                    </Button>

                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                </TableBody>
                            </Table>

                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50, 100, 1000, 10000]}
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
        historyRequestState: state.historyRequestState,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHistoryRequest: (onSuccess
            , beginDate
            , endDate
            , idTypeService
            , stateRequest
            , idCarrier
            , locationBegin
            , locationEnd
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter) => dispatch(getHistoryRequest(onSuccess
            , beginDate
            , endDate
            , idTypeService
            , stateRequest
            , idCarrier
            , locationBegin
            , locationEnd
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter)),

        getHistoryRequestExport: (onSuccess
            , beginDate
            , endDate
            , idTypeService
            , stateRequest
            , idCarrier
            , locationBegin
            , locationEnd
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter) => dispatch(getHistoryRequestExport(onSuccess
            , beginDate
            , endDate
            , idTypeService
            , stateRequest
            , idCarrier
            , locationBegin
            , locationEnd
            , apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter)),
    };
};

export default withStyles(extendedTablesStyle)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(HistoryRequest)
);