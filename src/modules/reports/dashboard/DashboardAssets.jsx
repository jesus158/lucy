
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Layers from "@material-ui/icons/Layers";
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
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { findAsset, inactiveAsset, setAsset } from 'modules/assets/AssetActions.js';
import { getRequestInProcessByUserByFilter } from "modules/requests/RequestActions.js";
import { MILI_SECONDS_REFRESH_LIST, NAME_OPERATOR } from "modules/utils/ApiUtil.js";
import { trackingStateAssets } from "modules/reports/tracking/TrackingActions.js";
import Filter from "modules/components/Filter.jsx";
//import { gettrackingByFilter } from "modules/locations/trackings/trackingActions.js";
import React from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Link from '@material-ui/core/Link';

var prevNowPlaying = null
class DashboardAssets extends React.Component {

    constructor(props) {
        super(props)
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
            assetId: 0
        }
        this.loadContentList()
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
        this.props.findAsset (
            undefined,
            this.state.page,
            this.state.order,
            this.state.rowsPerPage,
            this.state.orderBy,
            this.state.page,
            this.state.filter.name
        )

        this.props.getRequestInProcessByUserByFilter((success) => {
            this.setState({ isActivityIndicatorShown: false });
          },
            undefined,
            undefined,
            this.state.page,
            this.state.order,
            this.state.rowsPerPage,
            this.state.orderBy,
            this.state.page,
            this.state.filter.name
          );
    }

    onFilter = filter => {
        this.setState({ filter });
        this.props.findAsset(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, filter.name);
    }

    loadAssetContentList = () => {

        this.props.trackingStateAssets(
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

    /*
    * Retorna el color que se asocia al estado
    */
    getStateColor = (pData) => {
        switch (pData) {
            case 0:
                return "warning";
            case 1:
                return "success";
            default:
                return "warning";
        }
    }

    /**
    * Covierte en texto el estado
    */
    formatState = (pData) => {
        switch (pData) {
            case 0:
                return "OCUPADO";
            case 1:
                return "DISPONIBLE"
            default:
                return "OCUPADO";
        }
    }
    /*
    * Retorna el color que se asocia a la disponibilidad del activo
    */
    getActiveColor = (pData) => {
        switch (pData) {
            case 0:
                return "danger";
            case 1:
                return "success";
            default:
                return "danger";
        }
    }

    /**
    * Covierte en texto la disponibilidad del activo
    */
    formatActive = (pData) => {
        switch (pData) {
            case 0:
                return "INACTIVO";
            case 1:
                return "ACTIVO"
            default:
                return "INACTIVO";
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

    handleEdit = (asset) => {
        this.props.setAsset({
            id: asset.id,
            assetCode: asset.assetCode,
            nameAsset: asset.nameAsset,
            typeAsset: asset.typeAsset,
            assetZoneTag: asset.assetZoneTag,
            active: asset.active,
            state: asset.state
        });
        this.setState({
            toAdmin: true,
            accountId: asset.id,
        });
    };

    handleAssetService = (asset, listRequests) => {
        var content = []
        try {
            listRequests.forEach(request => {
                if (asset.active == 1) {
                    if (asset.id == request.asset.id) {
                        content.push(
                            <div>
                                <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                    <div>
                                        <span style={{ color: "gray" }}>ID Servicio: </span>
                                        <span style={{ marginLeft: 6 }}>{request.id}</span>
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                    <div>
                                        <span style={{ color: "gray" }}>Tipo de servicio: </span>
                                        <span style={{ marginLeft: 6 }}>{request.typeService.serviceName}</span>
                                    </div>
                                </GridItem>
                            </div>
                        )
                    } else {
                        content.push(
                            <div>
                                <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                    <div>
                                        <span style={{ color: "gray" }}>ID Servicio: </span>
                                        <span style={{ marginLeft: 6 }}>No hay servicio asignado</span>
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                    <div>
                                        <span style={{ color: "gray" }}>Tipo de servicio: </span>
                                        <span style={{ marginLeft: 6 }}>No hay servicio asignado</span>
                                    </div>
                                </GridItem>
                            </div>
                        )
                    }
                } else {
                    content.push(<></>)
                }
            });
        } catch (exception) { }

        return content;
    }

    hideAlertInactive = () => {
        this.setState({
            alertInactive: null
        });
    };

    handleChangePage = (page) => {
        this.props.findAsset(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, page, this.state.filter.name);
        this.setState({ page });
    };

    handleChangeRowsPerPage = rowsPerPage => {
        this.props.findAsset(undefined, this.state.page, this.state.order, rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
        this.setState({ rowsPerPage });
    };

    handleAssetUbication = (asset, listAssets) => {

        if (asset == null || asset == undefined || listAssets == null || asset == undefined) {
            return '---'
        } else {
            for (let assetTacking of listAssets) {
                console.log("Ruta de tracking ",assetTacking);
                if (assetTacking.id == asset.id  && assetTacking.tracking) {
                    return assetTacking.tracking.lastUbication.nameUbication;
                }
            }
            return '---'
        }
      }

    // getCompleteDateUbication = data => {
    //     var result = "";
    //     try {
    //         if (data.dateUbicationLast !== null) {
    //             if (data.dateUbicationLast !== undefined) {
    //                 result = this.formatDate(data.dateUbicationLast);
    //             }
    //         }
    //     } catch (except) { }
    //     return result;
    // }

    // getCompleteNameUbication = data => {
    //     var result = "";
    //     var lastUbication = undefined;
    //     try {
    //         lastUbication = data.lastUbication;
    //         if (lastUbication !== undefined) {
    //             result += lastUbication.nameUbication;
    //             if (lastUbication.floorUbication !== undefined) {
    //                 result += " - " + lastUbication.floorUbication.nameFloor;
    //                 if (lastUbication.floorUbication.zoneUbication !== undefined) {
    //                     result += " - " + lastUbication.floorUbication.zoneUbication.nameZone;
    //                 }
    //             }
    //         }
    //     } catch (except) { }
    //     return result;
    // }

    render = () => {
        const { classes } = this.props;
        const isActivityIndicatorShown = this.state.isActivityIndicatorShown;
        var { apiPagination, listAsset } = this.props.assetState.data.listResultSetAsset;
        var {  listRequests } = this.props.requestState.data;
        var { apiPaginationAsset, listAssets } = this.props.trackingState.data;

        if (apiPagination === undefined) {
            apiPagination = {};
        }

        if (listAsset === undefined) {
            listAsset = [];
        }

        if (listRequests === undefined) {
            listRequests = [];
        }

        if (this.state.toAdmin === true) {
            return <Redirect to={'/admin/admin-asset/?code=' + this.state.accountId} />
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
                            <Layers />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>{'Activos'}</h4>
                    </CardHeader>

                    <CardBody style={{ overflow: "auto" }}>
                    <Filter onFilter={this.onFilter} name={true} nameText={"Filtrar"} placeholder={"activo"} />
                        {listAsset.map((asset, key) => {
                            return (
                                <div>
                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                        {asset.active == 1 ? (
                                            <Badge color={this.getStateColor(asset.state)} >
                                                {this.formatState(asset.state)}
                                            </Badge>
                                        ) : <Badge color={this.getActiveColor(asset.active)} >
                                                {this.formatActive(asset.active)}
                                            </Badge>}
                                    </GridItem>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <Link style={{ fontWeight: "bold", marginLeft: 0, marginTop: 6, marginBottom: 4, alignContent: "left", display: "inline-flex", alignItems: "left" }}
                                            color='inherit' onClick={() => { this.handleEdit(asset) }} component="button">
                                            <span>{` ${asset.nameAsset}`}</span>
                                        </Link>
                                    </GridItem>

                                    <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>
                                        <div>
                                            <span style={{ color: "gray" }}>Estado:</span>
                                            <span style={{ marginLeft: 6 }}>{this.formatActive(asset.active)} </span>
                                        </div>
                                    </GridItem>

                                    {asset.active == 1 ? (
                                        <div>
                                            <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>

                                                <div>
                                                    <span style={{ color: "gray" }}>Tipo de activo: </span>
                                                    <span style={{ marginLeft: 6 }}>{` ${asset.typeAsset.name}`}</span>
                                                </div>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", marginLeft: 6 }}>

                                                <div>
                                                    <span style={{ color: "gray" }}>Ubicación del activo: </span>
                                                    <span style={{ marginLeft: 6 }}>{this.handleAssetUbication(asset, listAssets)}</span>
                                                </div>
                                            </GridItem>
                                        </div>
                                    ) : <></>}

                                    {asset.state == 0 ? (this.handleAssetService(asset, listRequests)) : <></>}

                                    <CardFooter stats>
                                        <div className={classes.stats}>


                                        </div>
                                    </CardFooter>

                                </div>
                            );
                        })}
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
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        assetState: state.assetState,
        requestState: state.requestState,
        trackingState: state.trackingState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        findAsset: (apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter) => dispatch(findAsset(apiPaginationAction
                , apiPaginationCurrentPage
                , apiPaginationDirection
                , apiPaginationLimit
                , apiPaginationOrderColumn
                , apiPaginationMoveToPage
                , apiPaginationFilter)),

        getRequestInProcessByUserByFilter: (
            onSuccess,
            listIdStates,
            apiPaginationAction,
            apiPaginationCurrentPage,
            apiPaginationDirection,
            apiPaginationLimit,
            apiPaginationOrderColumn,
            apiPaginationMoveToPage,
            apiPaginationFilter
        ) =>
            dispatch(
                getRequestInProcessByUserByFilter(
                    onSuccess,
                    listIdStates,
                    apiPaginationAction,
                    apiPaginationCurrentPage,
                    apiPaginationDirection,
                    apiPaginationLimit,
                    apiPaginationOrderColumn,
                    apiPaginationMoveToPage,
                    apiPaginationFilter
                )
            ),

            trackingStateAssets: (
                apiPaginationAction,
                apiPaginationCurrentPage,
                apiPaginationDirection,
                apiPaginationLimit,
                apiPaginationOrderColumn,
                apiPaginationMoveToPage,
                apiPaginationFilter
              ) =>
                dispatch(
                  trackingStateAssets(
                    apiPaginationAction,
                    apiPaginationCurrentPage,
                    apiPaginationDirection,
                    apiPaginationLimit,
                    apiPaginationOrderColumn,
                    apiPaginationMoveToPage,
                    apiPaginationFilter
                  )
                ),

        setAsset: (asset) => dispatch(setAsset(asset)),
        inactiveAsset: (id, onSuccess) => dispatch(inactiveAsset(id, onSuccess)),
    };
};


export default withStyles(extendedTablesStyle)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DashboardAssets)
);
