// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import DirectionsWalk from "@material-ui/icons/DirectionsWalk";
import InsertInvitation from "@material-ui/icons/InsertInvitation";
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
import { getInShiftByFilter } from 'modules/carriers/carrierActions.js';
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { MILI_SECONDS_REFRESH_LIST_CARRIERS, NAME_OPERATOR } from "modules/utils/ApiUtil.js";
//import { gettrackingByFilter } from "modules/locations/trackings/trackingActions.js";
import React from 'react';
import { connect } from "react-redux";

var prevNowPlaying = null;
class DashboardCarrier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openAlertInfo: false,
            textAlertInfo: "",
            filter: {},
            order: 0,
            orderBy: 12,
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
        }, MILI_SECONDS_REFRESH_LIST_CARRIERS);
    }

    componentWillUnmount() {
        if (prevNowPlaying) {
            clearInterval(prevNowPlaying);
        }
        prevNowPlaying = null;
    }

    loadContentList = () => {

        this.props.getInShiftByFilter(
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

    getCarrierStateColor = (data) => {
        var result = "info";
        if (!this.validateContent(data)) {
            return result;
        }
        try {
            switch (data.state) {
                case 0:
                    result = "success";
                    break;
                case 1:
                    result = "info";
                    break;
                case 2:
                    result = "warning";
                    break;
                case 3:
                    result = "info";
                    break;
                case 4:
                    result = "warning";
                    break;
                case 5:
                    result = "warning";
                    break;
                case 6:
                    result = "success";
                    break;
                default:
                    result = "info";
                    break;
            }
        } catch (ex) {
            result = "info";
        }
        return result;
    }

    getCarrierStateName = (data) => {
        var result = "Desconocido";
        if (!this.validateContent(data)) {
            return result;
        }
        try {
            switch (data.state) {
                case 0:
                    result = "Turno Iniciado";
                    break;
                case 1:
                    result = "Turno Terminado";
                    break;
                case 2:
                    result = "En receso";
                    break;
                case 3:
                    result = "Ausente";
                    break;
                case 4:
                    result = "Ocupado en la solicitud ";
                    break;
                case 5:
                    result = "Respondiendo asignación ";
                    break;
                case 6:
                    result = "Disponible";
                    break;
                default:
                    result = "Desconocido";
                    break;
            }
        } catch (ex) {
            result = "Desconocido";
        }
        return result;
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
        var seconds = date.getSeconds();
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
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        result = +
            year + pSeparator + month + pSeparator + day + " " + hour + ":" + minute + ":" + seconds;
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

    handleChangePage = page => {
        this.props.getInShiftByFilter(
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
        this.props.getInShiftByFilter(
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

    getCompleteDateInactivity = data => {
        var result = "";
        try {
            if (data.lastInactivityDate !== null) {
                if (data.lastInactivityDate !== undefined) {
                    result = this.formatDate(data.lastInactivityDate);
                }
            }
        } catch (except) { }
        return result;
    }

    getCompleteDateUbication = data => {
        var result = "";
        try {
            if (data.dateUbicationLast !== null) {
                if (data.dateUbicationLast !== undefined) {
                    result = this.formatDate(data.dateUbicationLast);
                }
            }
        } catch (except) { }
        return result;
    }

    getCompleteNameUbication = data => {
        var result = "";
        var lastUbication = undefined;
        try {
            lastUbication = data.lastUbication;
            if (lastUbication !== undefined) {
                result += lastUbication.nameUbication;


                if (lastUbication.floorUbication !== undefined) {
                    result += " - " + lastUbication.floorUbication.nameFloor;


                    if (lastUbication.floorUbication.zoneUbication !== undefined) {
                        result += " - " + lastUbication.floorUbication.zoneUbication.nameZone;

                    }
                }
            }
        } catch (except) { }
        return result;
    }

    render = () => {
        const { classes } = this.props;
        const isActivityIndicatorShown = this.state.isActivityIndicatorShown;
        var { apiPagination, listCarrierLocation } = this.props.carrierState.data;
        if (apiPagination === undefined) {
            apiPagination = {};
        }
        if (listCarrierLocation === undefined) {
            listCarrierLocation = [];
        }
        return (
            <>
                {isActivityIndicatorShown ?
                    <WaitDialog text={"Cargando..."} />
                    : null
                }
                {this.state.alertInactive}
                <Card>
                    <CardHeader color="info" icon>
                        <CardIcon color="info">
                            <DirectionsWalk />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>{'El ' + NAME_OPERATOR}</h4>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto" }}>
                        {listCarrierLocation.map((carrier, key) => {
                            return (
                                <div>
                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ fontWeight: "bold", marginLeft: 0, alignContent: "left", display: "inline-flex", alignItems: "left" }}>{` ${carrier.userCarrier.userAccount.nameUser}`}</span>

                                        <InsertInvitation style={{ marginLeft: "auto", }} />
                                        <span style={{ marginLeft: 8 }}>{`Inicio de turno ${this.formatDate(carrier.dateStartsShift)}`}</span>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Última ubicación conocida:</span>
                                        <span style={{ marginLeft: 6 }}>{this.getCompleteNameUbication(carrier)}</span>

                                    </GridItem>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Fecha última ubicación conocida:</span>
                                        <span style={{ marginLeft: 6 }}>{this.getCompleteDateUbication(carrier)}</span>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Lectura móvil:</span>
                                        <span style={{ marginLeft: 6 }}>{carrier.detailProcessBeacon}</span>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Último servicio atendido:</span>
                                        <span style={{ marginLeft: 6 }}>{carrier.lastRequest !== null ? carrier.lastRequest : ""}</span>

                                    </GridItem>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Solicitudes completadas durante el turno:</span>
                                        <span style={{ marginLeft: 6 }}>{carrier.requestsCompleted !== null ? carrier.requestsCompleted : ""}</span>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Solicitudes rechazadas durante el turno:</span>
                                        <span style={{ marginLeft: 6 }}>{carrier.requestsRejected !== null ? carrier.requestsRejected : ""}</span>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Fecha de última inactividad:</span>
                                        <span style={{ marginLeft: 6 }}>{this.getCompleteDateInactivity(carrier)}</span>

                                    </GridItem>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Inactividades durante el turno:</span>
                                        <span style={{ marginLeft: 6 }}>{carrier.totalInactivitesShift !== null ? carrier.totalInactivitesShift : ""}</span>
                                    </GridItem>


                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <span style={{ color: "gray" }}>Estado:</span>
                                        <Badge
                                            color={this.getCarrierStateColor(carrier)}>
                                            {this.getCarrierStateName(carrier)}
                                        </Badge>

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
        carrierState: state.carrierState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getInShiftByFilter: (
            apiPaginationAction,
            apiPaginationCurrentPage,
            apiPaginationDirection,
            apiPaginationLimit,
            apiPaginationOrderColumn,
            apiPaginationMoveToPage,
            apiPaginationFilter
        ) =>
            dispatch(
                getInShiftByFilter(
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
    };
};

export default withStyles(extendedTablesStyle)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DashboardCarrier)
);
