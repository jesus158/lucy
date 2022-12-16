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
    findTypeAlert,
    getListActiveTypeAlert,
    inactiveTypeAlert,
    setTypeAlert
} from 'modules/configurations/type_alerts/TypeAlertsActions.js';


const rows = [
    { id: 2, numeric: false, disablePadding: false, isSorted: true, label: 'Nombre' },
    { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Descripción' },
    { id: 0, numeric: false, disablePadding: false, isSorted: false, label: 'Estado' },
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: '' },
];

class TypeAlertsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: {},
            order: 0,
            orderBy: 2,
            page: 0,
            rowsPerPage: 5,
            toAdmin: false,
            accountId: 0,
            alertInactive: null
        };
    }

    componentDidMount = () => {
        this.props.findTypeAlert(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
        this.props.getListActiveTypeAlert()
    }


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 1;

        if (this.state.orderBy === property && this.state.order === 1) {
            order = 0;
        }

        this.props.findTypeAlert(undefined, this.state.page, order, this.state.rowsPerPage, orderBy, this.state.page, this.state.filter.name);
        this.setState({ order, orderBy });
    };

    handleEdit = (typeAlert) => {
        this.props.setTypeAlert({
            id: typeAlert.id,
            name: typeAlert.name,
            description: typeAlert.description,
            active: typeAlert.active
        });
        this.setState({
            toAdmin: true
            , accountId: typeAlert.id
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
                            ¿Está seguro que quiere desactivar este tipo de alerta?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideAlertInactive} color="danger">
                            Cancelar
                    </Button>
                        <Button onClick={() => {
                            this.hideAlertInactive();
                            this.props.inactiveTypeAlert(id, success => {
                                this.props.findTypeAlert(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
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
        this.props.findTypeAlert(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, filter.name);
    }

    handleChangePage = (page) => {
        this.props.findTypeAlert(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, page, this.state.filter.name);
        this.setState({ page });
    };

    handleChangeRowsPerPage = rowsPerPage => {
        this.props.findTypeAlert(undefined, this.state.page, this.state.order, rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
        this.setState({ rowsPerPage });
    };

    render() {
        const { classes } = this.props;

        const { isActivityIndicatorShown } = this.props.typeAlertState?.data;
        var {  listTypeAlert, apiPagination } = this.props.typeAlertState?.data?.listResultSetTypeAlert;

        const { order, orderBy } = this.state;

        if (this.props.typeAlertState?.data?.listResultSetTypeAlert?.apiPagination === undefined) {
            apiPagination = {};
        }

        if (listTypeAlert === undefined) {
            listTypeAlert = [];
        }
        if (this.state.toAdmin === true) {
            return <Redirect to={'/admin/admin-type-alert/?code=' + this.state.accountId} />
        }

        return (
            <GridItem xs={12}>
                {this.props.typeAlertState?.data?.isActivityIndicatorShown ?
                    <WaitDialog text={"Cargando..."} />
                    : null
                }
                {this.state.alertInactive}
                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="info">
                            <ViewList />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Tipo de Alerta</h4>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto" }}>
                        <Filter onFilter={this.onFilter} name={true} nameText={"Filtrar"} placeholder={"alerta"} />
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                onRequestSort={this.handleRequestSort}
                                order={order === 0 ? 'asc' : 'desc'}
                                orderBy={orderBy + ''}
                                rowCount={20}
                                rows={rows}
                            />
                            <TableBody>
                                {listTypeAlert.map((typeAlert, key) => {
                                    return (
                                        <TableRow tabIndex={-1} key={`TableRow-${key}`} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                                            <TableCell align="left"><Link color="inherit" onClick={() => { this.handleEdit(typeAlert) }} component="button" size="sm" className={classes.marginRight}>{typeAlert.name}</Link></TableCell>
                                            <TableCell className="text-column">
                                                {typeAlert.description}
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {typeAlert.active === 1 ? (
                                                    <Badge color="success">Activa</Badge>
                                                ) : <Badge color="danger">Inactiva</Badge>}
                                            </TableCell>
                                            <TableCell align="right" className="text-column">
                                                <div>
                                                    <Button
                                                        color="success"
                                                        simple
                                                        className={classes.actionButton}
                                                        key={"edit_" + typeAlert.id}
                                                        onClick={() => { this.handleEdit(typeAlert) }}>
                                                        <Edit className={classes.icon} />
                                                    </Button>
                                                    <Button
                                                        color="danger"
                                                        simple
                                                        className={classes.actionButton}
                                                        key={"close_" + typeAlert.id}
                                                        onClick={this.showAlertInactive.bind(this, typeAlert.name, typeAlert.id)}>
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
        typeAlertState: state.typeAlertState,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        findTypeAlert: (apiPaginationAction
            , apiPaginationCurrentPage
            , apiPaginationDirection
            , apiPaginationLimit
            , apiPaginationOrderColumn
            , apiPaginationMoveToPage
            , apiPaginationFilter) => dispatch(findTypeAlert(apiPaginationAction
                , apiPaginationCurrentPage
                , apiPaginationDirection
                , apiPaginationLimit
                , apiPaginationOrderColumn
                , apiPaginationMoveToPage
                , apiPaginationFilter)),
        setTypeAlert: (typeAlert) => dispatch(setTypeAlert(typeAlert)),
        inactiveTypeAlert: (id, onSuccess) => dispatch(inactiveTypeAlert(id, onSuccess)),
        getListActiveTypeAlert: (onSuccess) => dispatch(getListActiveTypeAlert(onSuccess))
    };
};

export default withStyles(extendedTablesStyle)(connect(mapStateToProps, mapDispatchToProps)(TypeAlertsList));