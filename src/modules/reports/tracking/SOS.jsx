// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CallIcon from '@material-ui/icons/Call';
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import EnhancedTableHead from "components/EnhancedTableHead/EnhancedTableHead.jsx";
import TablePagination from "components/TablePagination/TablePagination.jsx";
import { addMessage } from 'layouts/MessagesActions';
import Filter from "modules/components/Filter.jsx";
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { trackingStateSOS } from "modules/reports/tracking/TrackingActions.js";
import { MILI_SECONDS_REFRESH_LIST, ROW_GRAY, ROW_WHITE } from "modules/utils/ApiUtil.js";
//import { gettrackingByFilter } from "modules/locations/trackings/trackingActions.js";
import React from 'react';
import { connect } from "react-redux";



const rows = [
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: 'Nombre' },
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: 'Ubicación' },
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: 'Fecha' },
];
var prevNowPlaying = null;
class SOS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openAlertInfo: false,
            textAlertInfo: "",
            filter: {},
            order: 0,
            orderBy: 16,
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
        this.props.trackingStateSOS(
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

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 1;

        if (this.state.orderBy === property && this.state.order === 1) {
            order = 0;
        }

        this.props.trackingStateSOS(
            undefined,
            this.state.page,
            order,
            this.state.rowsPerPage,
            orderBy,
            this.state.page,
            this.state.filter.name
        );
        this.setState({ order, orderBy });
    };

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

    onFilter = filter => {
        this.setState({ filter });
        this.props.trackingStateSOS(
            undefined,
            this.state.page,
            this.state.order,
            this.state.rowsPerPage,
            this.state.orderBy,
            this.state.page,
            filter.name
        );
    };

    handleChangePage = page => {
        this.props.trackingStateSOS(
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
        this.props.trackingStateSOS(
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

    renderContentDate = (content) => {
        var result = "--";
        try {
            var date = this.formatDate(content.tracking.dateUbication);
            result = date + "";
        } catch (ex) { }
        return result;
    }

    renderContentUbication = (content) => {
        var result = "--";
        try {
            result = content.tracking.lastUbication.nameUbication
        } catch (ex) { }
        return result;
    }

    render = () => {
        const { classes } = this.props;
        const isActivityIndicatorShown = this.state.isActivityIndicatorShown;
        var { apiPaginationSOS, listSOS } = this.props.trackingState.data;
        const { order, orderBy } = this.state;

        if (apiPaginationSOS === undefined) {
            apiPaginationSOS = {};
        }
        if (listSOS === undefined) {
            listSOS = [];
        }
        return (
            <>
                {isActivityIndicatorShown ?
                    <WaitDialog text={"Cargando..."} />
                    : null
                }
                {this.state.alertInactive}

                
                <Card key={`CardTracking`} >
                    <CardHeader color="primary" icon >
                        <CardIcon color="info">
                            <CallIcon />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>SOS</h4>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto" }}>
                        <Filter onFilter={this.onFilter} name={true} nameText={"Filtrar"} placeholder={"nombre"} />
                        <Table className={classes.table} aria-labelledby="tableTitle" key={`TableCardTracking`}>
                            <EnhancedTableHead
                                key={`EnhancedTableHead-${Math.random()}`}
                                onRequestSort={this.handleRequestSort}
                                order={order === 0 ? 'asc' : 'desc'}
                                orderBy={orderBy+''}
                                rowCount={20}
                                rows={rows}
                            />
                            <TableBody>
                                {listSOS.map((tracking, key) => {
                                    return (
                                        <TableRow tabIndex={-1} key={`TableRow-${key}`} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>

                                            <TableCell className="text-column">
                                                {tracking.userAccount.nameUser}
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {this.renderContentUbication(tracking)}
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {this.renderContentDate(tracking)}
                                            </TableCell>

                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            pages={apiPaginationSOS.totalPages}
                            rowsPerPage={apiPaginationSOS.limit}
                            page={apiPaginationSOS.currentPage}
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
        trackingState: state.trackingState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        trackingStateSOS: (
            apiPaginationAction,
            apiPaginationCurrentPage,
            apiPaginationDirection,
            apiPaginationLimit,
            apiPaginationOrderColumn,
            apiPaginationMoveToPage,
            apiPaginationFilter
        ) =>
            dispatch(
                trackingStateSOS(
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
    )(SOS)
);
