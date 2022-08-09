// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InsertInvitation from "@material-ui/icons/InsertInvitation";
import Timelapse from "@material-ui/icons/Timelapse";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import Badge from "components/Badge/Badge.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import TablePagination from "components/TablePagination/TablePagination.jsx";
import { addMessage } from 'layouts/MessagesActions';
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { getRequestInProcessByUserByFilter } from "modules/requests/RequestActions.js";
import { MILI_SECONDS_REFRESH_LIST ,NAME_OPERATOR } from "modules/utils/ApiUtil.js";
//import { gettrackingByFilter } from "modules/locations/trackings/trackingActions.js";
import React from 'react';
import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";



var prevNowPlaying = null;
class DashboardRequestInProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            multiAction: props.multiAction,
            stateRequest: props.stateRequest,
            title: props.title,
            openAlertInfo: false,
            textAlertInfo: "",
            filter: {},
            order: 0,
            orderBy: 1,
            page: 0,
            rowsPerPage: 5,
            toAdmin: false,
            accountId: 0,
            alertInactive: null,
            isActivityIndicatorShown: false,
        };
        this.loadContentList();
    }

    componentDidMount = () => {
        if (prevNowPlaying) {
            clearInterval(prevNowPlaying);
            prevNowPlaying = null;
        }
        prevNowPlaying = setInterval(() => {
            this.loadContentList();
        }, MILI_SECONDS_REFRESH_LIST);
    }

    componentWillUnmount() {
        if (prevNowPlaying) {
            clearInterval(prevNowPlaying);
        }
        prevNowPlaying = null;
    }

    loadContentList = () => {
        this.props.getRequestInProcessByUserByFilter(
            this.state.stateRequest,
            undefined,
            this.state.page,
            this.state.order,
            this.state.rowsPerPage,
            this.state.orderBy,
            this.state.page,
            this.state.filter.name,
            this.state.multiAction,
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

    /*
   * Retorna el color que se asocia al estado
   */
    getStateColor = (pData) => {
        switch (pData) {
            case 0:
                return "warning";
            case 1:
                return "warning";
            case 2:
                return "info";
            case 3:
                return "success";
            case 4:
                return "success";
            case 5:
                return "info";
            case 6:
                return "danger";
            default:
                return "danger";
        }
    }

    /**
   * Covierte en texto el estado
   */
    formatState = (pData) => {
        switch (pData) {
            case 0:
                return "REGISTRADA";
            case 1:
                return "ESPERANDO " + NAME_OPERATOR.toUpperCase();
            case 2:
                return "ESPERANDO RESPUESTA";
            case 3:
                return "ESPERANDO INICIAR";
            case 4:
                return "INICIADA";
            case 5:
                return "TERMINADA";
            case 6:
                return "CANCELADA";
            default:
                return "DESCCONOCIDO";
        }
    }
    /**
     * Da formato a la fecha dada
     */
    formatDate = (pData, pSeparator = '/') => {
        var date = pData;
        if (Object.prototype.toString.call(pData) !== '[object Date]') {
            date = new Date(pData);
        }
        if (isNaN(date)) {
            return '';
        }
        var result = '';
        var year = date.getFullYear();
        var month = (date.getMonth() + 1);
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (minute < 10) {
            minute = '0' + minute;
        }
        result = +
            year + pSeparator + month + pSeparator + day + " " + hour + ":" + minute;
        return result;
    }

    getTimeFromInfo = (pData, pDataActual = undefined) => {
        var date = pData;
        var result = "--"
        if (pData < 1000) {
            return result;
        }
        if (Object.prototype.toString.call(pData) !== '[object Date]') {
            date = new Date(pData);
        }
        if (isNaN(date)) {
            return result;
        }
        //Por si se necesita una fecha de referencia
        //que es diferente a la fecha actual
        var actualDate = new Date();
        if (pDataActual !== undefined) {
            actualDate = new Date(pDataActual);
        }

        if (actualDate < date) {
            return result;
        }
        var miliseconds = actualDate - date;

        const minutesMiliseconds = (60 * 1000);
        const hourMiliseconds = (60 * minutesMiliseconds);
        const dayMiliseconds = (24 * hourMiliseconds);

        var days = (miliseconds / dayMiliseconds) >> 0;
        miliseconds = miliseconds - (days * dayMiliseconds);

        var hours = (miliseconds / hourMiliseconds) >> 0;
        miliseconds = miliseconds - (hours * hourMiliseconds);

        var minutes = (miliseconds / minutesMiliseconds) >> 0;
        result = "";
        if (days === 1) {
            result = days + " día ";
        }
        if (days > 1) {
            result = days + " días ";
        }
        if (hours === 1) {
            result += hours + " hora ";
        }
        if (hours > 1) {
            result += hours + " horas ";
        }
        if (minutes === 1) {
            result += minutes + " minuto ";
        }
        if (minutes > 1) {
            result += minutes + " minutos ";
        }
        if (result === "") {
            result = "--";
        }
        return result;
    }

    validateContent = (data) => {
        var result = false;
        if (data === undefined) {
            return result;
        }
        if (data === null) {
            return result;
        }
        if (data === {}) {
            return result;
        }
        try {
            var local = data.state;
            if (local === undefined) {
                return result
            }
            if (local === null) {
                return result
            }
        } catch (ex) {
            return result;
        }
        return true;
    }

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


    /**
   * Retorna el texto que corresponde a la prioridad de una solicitud realizada
   */
    getTextOfPriority = (data) => {
        try {
            switch (parseInt(data, 10)) {
                case 1:
                    return "Alta";
                case 2:
                    return "Media";
                default:
                    return "Baja";
            }
        } catch (ex) {
            return "Baja";
        }
    }

    handleChangePage = page => {
        this.props.getRequestInProcessByUserByFilter(
            this.state.stateRequest,
            undefined,
            this.state.page,
            this.state.order,
            this.state.rowsPerPage,
            this.state.orderBy,
            page,
            this.state.filter.name,
            this.state.multiAction,
        );
        this.setState({ page });
    };

    handleChangeRowsPerPage = rowsPerPage => {
        this.props.getRequestInProcessByUserByFilter(
            this.state.stateRequest,
            undefined,
            this.state.page,
            this.state.order,
            rowsPerPage,
            this.state.orderBy,
            this.state.page,
            this.state.filter.name,
            this.state.multiAction,
        );
        this.setState({ rowsPerPage });
    };

    render = () => {
        const { classes } = this.props;
        const isActivityIndicatorShown = this.state.isActivityIndicatorShown;
        var apiPagination = {};
        var listRequests = [];
        //usando el mismo servicio, el sistema en el EPIC lee el multiAction
        //y entonces guarda el contenido en la parte que corresponda.
        switch (this.state.multiAction) {
            case 'waiting':
                apiPagination = this.props.requestState.data.apiPaginationWaiting;
                listRequests = this.props.requestState.data.listRequestsWaiting;
                break;
            case 'inprocess':
                apiPagination = this.props.requestState.data.apiPaginationInprocess;
                listRequests = this.props.requestState.data.listRequestsInprocess;
                break;
            default:
                apiPagination = {};
                listRequests = [];
                break;
        }

        if (apiPagination === undefined) {
            apiPagination = {};
        }
        if (listRequests === undefined) {
            listRequests = [];
        }

        return (
            <>
                
                {isActivityIndicatorShown ?
                    <WaitDialog text={"Cargando..."} />
                    : null
                }
                {this.state.alertInactive}
                <Card>
                    <CardHeader color="success" icon>
                        <CardIcon color="success">
                            <Icon>chat_bubble_outline</Icon>
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>{this.state.title}</h4>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto" }}>
                        {listRequests.map((request, key) => {
                            return (
                                <div>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                        <Badge color={this.getStateColor(request.state)} >
                                            {this.formatState(request.state)}
                                        </Badge>

                                        <InsertInvitation style={{ marginLeft: "auto", }} />
                                        <span style={{ marginLeft: 8 }}>{` ${this.formatDate(request.dateRequest)}`}</span>

                                    </GridItem>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ fontWeight: "bold", marginLeft: 0, alignContent: "left", display: "inline-flex", alignItems: "left" }}>{` ${request.typeService.serviceName}`}</span>
                                    </GridItem>


                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Id:</span>
                                        <span style={{ marginLeft: 6 }}>{` ${request.id}`}</span>

                                    </GridItem>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Prioridad:</span>
                                        <span style={{ marginLeft: 6 }}>{this.getTextOfPriority(request.typeService.priority)}</span>

                                    </GridItem>


                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Origen:</span>
                                        <span style={{ marginLeft: 6 }}>{` ${request.locationBegin.nameUbication}`}</span>

                                    </GridItem>
                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Destino:</span>
                                        <span style={{ marginLeft: 6 }}>{` ${request.locationEnd.nameUbication}`}</span>

                                    </GridItem>
                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Solicitante:</span>
                                        <span style={{ marginLeft: 6 }}>{` ${request.userRequest.userAccount.nameUser}`}</span>

                                    </GridItem>
                                    <CardFooter stats>
                                        <div className={classes.stats}>


                                        </div>
                                    </CardFooter>
                                </div>
                            );
                        })}
                        <TablePagination
                            rowsPerPageOptions={[1, 5, 10, 25, 50, 100]}
                            pages={apiPagination.totalPages}
                            rowsPerPage={apiPagination.limit}
                            page={apiPagination.currentPage}
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
        requestState: state.requestState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequestInProcessByUserByFilter: (
            filterRequest,
            apiPaginationAction,
            apiPaginationCurrentPage,
            apiPaginationDirection,
            apiPaginationLimit,
            apiPaginationOrderColumn,
            apiPaginationMoveToPage,
            apiPaginationFilter,
            multiAction,
        ) =>
            dispatch(
                getRequestInProcessByUserByFilter(
                    () => { },
                    filterRequest,//"0,1,2",
                    apiPaginationAction,
                    apiPaginationCurrentPage,
                    apiPaginationDirection,
                    apiPaginationLimit,
                    apiPaginationOrderColumn,
                    apiPaginationMoveToPage,
                    apiPaginationFilter,
                    multiAction,
                )
            ),
        addMessage: (message) => dispatch(addMessage(message)),
    };
};

export default withStyles(extendedTablesStyle)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DashboardRequestInProcess)
);