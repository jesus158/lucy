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
import ViewList from "@material-ui/icons/ViewList";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import Badge from "components/Badge/Badge.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import EnhancedTableHead from "components/EnhancedTableHead/EnhancedTableHead.jsx";
import { ROW_GRAY, ROW_WHITE } from "modules/utils/ApiUtil.js";
// core components
import WaitDialog from "modules/components/WaitDialog.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import TablePagination from "components/TablePagination/TablePagination.jsx";
import Filter from "modules/components/Filter.jsx";
import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
// module Components
import {
    findIdealTime,
    setIdealTime,
    inactiveIdealTime,
} from './IdealTimeActions';


const rows = [
    { id: 2, numeric: false, disablePadding: false, isSorted: true, label: 'Nombre' },
    { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Descripción' },
    { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Categoría' },
    { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Tiempo' },
    { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Estado' },
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: '' },
];

class IdealTimeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: {},
            order: 0,
            orderBy: 2,
            page: 1,
            rowsPerPage: 5,
            toAdmin: false,
            accountId: 0,
            alertInactive: null
        };
    }

    componentDidMount = () => {
        this.props.findIdealTimeList(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
    }


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 1;

        if (this.state.orderBy === property && this.state.order === 1) {
            order = 0;
        }

        this.props.findIdealTimeList(undefined, this.state.page, order, this.state.rowsPerPage, orderBy, this.state.page, this.state.filter.name);
        this.setState({ order, orderBy });
    };

    handleEdit = (idealTime) => {

        this.props.setIdealTime({
            id: idealTime.id,
            name: idealTime.name,
            description: idealTime.description,
            typeIdealTime: idealTime.typeIdealTime,
            active: idealTime.active,
            ubication: idealTime.ubication,
            time: idealTime.time
        });
        this.setState({
            toAdmin: true
            , accountId: idealTime.id
        });
    }


    showAlertInactive = (nameAccountSelected, id) => {
        this.setState({
            alertInactive: (
                <Dialog
                    open={true}
                    onClose={this.hideIdealTimeInactive}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{nameAccountSelected}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Está seguro que quiere desactivar este tipo de {nameAccountSelected}?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideIdealTimeInactive} color="danger">
                            Cancelar
                    </Button>
                        <Button onClick={() => {
                            this.hideIdealTimeInactive();
                            this.props.inactiveIdealTime(id, success => {
                                this.props.findIdealTimeList(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
                            });
                        }} color="info">
                            Aceptar
                    </Button>
                    </DialogActions>
                </Dialog>
            )
        });
    }

    hideIdealTimeInactive = () => {
        this.setState({
            alertInactive: null
        });
    }

    onFilter = filter => {
        this.setState({ filter });
        this.props.findIdealTimeList(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, filter.name);
    }

    handleChangePage = (page) => {
        this.props.findIdealTimeList(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, page, this.state.filter.name);
        this.setState({ page });
    };

    handleChangeRowsPerPage = rowsPerPage => {
        this.props.findIdealTimeList(undefined, this.state.page, this.state.order, rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
        this.setState({ rowsPerPage });
    };

    render() {
        const { classes } = this.props;

        const { isActivityIndicatorShown } = this.props.idealTimeState?.data;


        let listIdealTime = this.props.idealTimeState?.data?.listResultSetIdealTime?.listIdealTime;
        let apiPagination = this.props.idealTimeState?.data?.listResultSetIdealTime?.apiPagination;
        const { order, orderBy } = this.state;

        if (listIdealTime === undefined || listIdealTime === null) {
            listIdealTime = [];
        }
        if (this.state.toAdmin === true) {
            return <Redirect to={'/admin/admin-ideal-times/?code=' + this.state.accountId} />
        }

        return (
            <GridItem xs={12}>
                {this.props.idealTimeState?.data?.isActivityIndicatorShown ?
                    <WaitDialog text={"Cargando..."} />
                    : null
                }
                {this.state.alertInactive}
                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="info">
                            <ViewList />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Tiempos ideales</h4>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto" }}>
                        <Filter onFilter={this.onFilter} name={true} nameText={"Filtrar"} placeholder={"Tiempo ideal"} />
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                onRequestSort={this.handleRequestSort}
                                order={order === 0 ? 'asc' : 'desc'}
                                orderBy={orderBy + ''}
                                rowCount={20}
                                rows={rows}
                            />
                            <TableBody>
                                {listIdealTime.map((idealTime, key) => {
                                    return (
                                        <TableRow tabIndex={-1} key={`TableRow-${key}`} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                                            <TableCell align="left"><Link color="inherit" onClick={() => { this.handleEdit(idealTime) }} component="button" size="sm" className={classes.marginRight}>{idealTime.name}</Link></TableCell>
                                            <TableCell className="text-column">
                                                {idealTime.description}
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {idealTime.typeIdealTime?.name}
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {idealTime.time}
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {idealTime.active === 1 ? (
                                                    <Badge color="success">Activa</Badge>
                                                ) : <Badge color="danger">Inactiva</Badge>}
                                            </TableCell>
                                            <TableCell align="right" className="text-column">
                                                <div>
                                                    <Button
                                                        color="success"
                                                        simple
                                                        className={classes.actionButton}
                                                        key={"edit_" + idealTime.id}
                                                        onClick={() => { this.handleEdit(idealTime) }}>
                                                        <Edit className={classes.icon} />
                                                    </Button>
                                                    <Button
                                                        color="danger"
                                                        simple
                                                        className={classes.actionButton}
                                                        key={"close_" + idealTime.id}
                                                        onClick={this.showAlertInactive.bind(this, idealTime.name, idealTime.id)}>
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
                            pages={apiPagination?.totalPages}
                            rowsPerPage={apiPagination?.limit}
                            page={apiPagination?.currentPage}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        )
    }
}

const mapStateToProps = state => {
    return {
        idealTimeState: state.idealTimeState,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        findIdealTimeList: (apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter) => dispatch(findIdealTime(apiPaginationAction
                , apiPaginationCurrentPage
                , apiPaginationDirection
                , apiPaginationLimit
                , apiPaginationOrderColumn
                , apiPaginationMoveToPage
                , apiPaginationFilter)),
        setIdealTime: (idealTime) => dispatch(setIdealTime(idealTime)),
        inactiveIdealTime: (id, onSuccess) => dispatch(inactiveIdealTime(id, onSuccess)),
        //getListActiveTypeAlert: (onSuccess) => dispatch(getListActiveTypeAlert(onSuccess))
    };
};

export default withStyles(extendedTablesStyle)(connect(mapStateToProps, mapDispatchToProps)(IdealTimeList));