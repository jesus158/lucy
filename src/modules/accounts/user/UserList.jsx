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
import EmailIcon from '@material-ui/icons/Email';
// material-ui icons
import People from "@material-ui/icons/People";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import Badge from "components/Badge/Badge.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import EnhancedTableHead from "components/EnhancedTableHead/EnhancedTableHead.jsx";
import TablePagination from "components/TablePagination/TablePagination.jsx";
import { addMessage } from 'layouts/MessagesActions';
import { findUsers, inactiveUser, sendEmailRememberAccess, setUser } from 'modules/accounts/user/UserActions.js';
import Filter from "modules/components/Filter.jsx";
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { ADMIN, ROW_GRAY, ROW_WHITE ,BEACON_NAME} from "modules/utils/ApiUtil.js";
import React from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

const rows = [
  { id: 0, numeric: false, disablePadding: true, isSorted: false, label: '' },
  { id: 20, numeric: false, disablePadding: true, isSorted: true, label: 'Usuario' },
  { id: 18, numeric: false, disablePadding: true, isSorted: true, label: 'Nombre' },
  { id: 28, numeric: false, disablePadding: true, isSorted: true, label: 'Perfil' },
  { id: 17, numeric: false, disablePadding: true, isSorted: true, label: 'Identificación' },
  { id: 19, numeric: false, disablePadding: true, isSorted: true, label: 'Teléfono' },
  { id: 5, numeric: false, disablePadding: true, isSorted: true, label: 'Centro de costo' },
  { id: 7, numeric: false, disablePadding: true, isSorted: false, label: BEACON_NAME },
  { id: 0, numeric: false, disablePadding: true, isSorted: false, label: 'Estado' },

];

class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: {},
      order: 0,
      orderBy: 18,
      page: 0,
      rowsPerPage: 5,
      toAdmin: false,
      accountId: 0,
      alertInactive: null
    };
  }

  componentDidMount = () => {
    if (parseInt(sessionStorage["userAccountProfileId"], 10) === ADMIN || sessionStorage["isSuperManager"] === "1") {
      this.props.findUsers(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
    } else {
      this.handleEdit(sessionStorage["userAccountId"])
    }

  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 1;

    if (this.state.orderBy === property && this.state.order === 1) {
      order = 0;
    }

    this.props.findUsers(undefined, this.state.page, order, this.state.rowsPerPage, orderBy, this.state.page, this.state.filter.name);
    this.setState({ order, orderBy });
  };

  handleEmail = (email) => {
    this.props.sendEmailRememberAccess(email, (success) => {
      this.props.addMessage({ variant: "success", message: 'Datos enviados a ' + email });
    })
  }

  handleEdit = (id) => {
    this.props.setUser(
      {
        id: 0
        , account: { id: 0 }
        , userAccount: {
          id: 0
          , typeIdentification: { id: 0 }
          , numberIdentification: ""
          , nameUser: ""
          , passwordAccess: ""
          , phone: ""
          , email: ""
          , isSuperManager: 0
        }
        , active: 0
        , beaconsTracking: ""
        , canMakeRequest: 0
        , costCenter: ""
        , moreInformation: ""
        , profile: { id: 0 }
      }
    );
    this.setState({
      toAdmin: true
      , accountId: id
    });
  }
  showAlertEmail = (email) => {
    this.setState({
      alertInactive: (
        <Dialog
          open={true}
          onClose={this.hideAlertInactive}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{email}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Desea enviar datos de acceso a la cuenta?
                </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.hideAlertInactive} color="danger">
              Cancelar
                </Button>
            <Button onClick={() => {
              this.hideAlertInactive();
              this.handleEmail(email);
            }} color="info">
              Aceptar
                </Button>
          </DialogActions>
        </Dialog>
      )
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
              ¿Está seguro que quiere inactivar esta Cuenta?
                </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.hideAlertInactive} color="danger">
              Cancelar
                </Button>
            <Button onClick={() => {
              this.hideAlertInactive();
              this.props.inactiveUser(id, success => {
                this.props.findUsers(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
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
    this.props.findUsers(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, filter.name);
  }

  handleChangePage = (page) => {
    this.props.findUsers(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, page, this.state.filter.name);
    this.setState({ page });
  };

  handleChangeRowsPerPage = rowsPerPage => {
    this.props.findUsers(undefined, this.state.page, this.state.order, rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
    this.setState({ rowsPerPage });
  };

  render() {
    const { classes } = this.props;
    const { isActivityIndicatorShown } = this.props.userState.data;
    var { apiPagination, userSystemAccount } = this.props.userState.data.listResultSetUser;

    const { order, orderBy } = this.state;

    if (apiPagination === undefined) {
      apiPagination = {};
    }

    if (userSystemAccount === undefined) {
      userSystemAccount = [];
    }

    if (this.state.toAdmin === true) {
      return <Redirect to={'/admin/admin-user/?code=' + this.state.accountId} />
    }


    return (
      <>
        {isActivityIndicatorShown ?
          <WaitDialog text={"Cargando..."} />
          : null
        }
        {this.state.alertInactive}

        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="info">
              <People />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Usuarios</h4>
          </CardHeader>
          <CardBody style={{ overflow: "auto" }}>
            <Filter onFilter={this.onFilter} name={true} nameText={"Filtrar"} placeholder={"usuario"} />
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                onRequestSort={this.handleRequestSort}
                order={order === 0 ? 'asc' : 'desc'}
                orderBy={orderBy+''}
                rowCount={20}
                rows={rows}
              />
              <TableBody>
                {userSystemAccount.map((user, key) => {
                  return (
                    <TableRow tabIndex={-1} key={key} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                      <TableCell align="right" className="text-column">
                        <div>
                          <Button
                            color="info"
                            simple
                            className={classes.actionButton}
                            key={"email_" + user.id}
                            onClick={this.showAlertEmail.bind(this, user.userAccount.email)}>
                            <EmailIcon className={classes.icon} />
                          </Button>
                          <Button
                            color="success"
                            simple
                            className={classes.actionButton}
                            key={"edit_" + user.id}
                            onClick={() => { this.handleEdit(user.id) }}>
                            <Edit className={classes.icon} />
                          </Button>
                          <Button
                            color="danger"
                            simple
                            className={classes.actionButton}
                            key={"close_" + user.id}
                            onClick={this.showAlertInactive.bind(this, user.userAccount.email, user.id)}>
                            <Block className={classes.icon} />
                          </Button>

                        </div>
                      </TableCell>
                      <TableCell align="left"><Link color="inherit" onClick={() => { this.handleEdit(user.id) }} component="button" size="sm" className={classes.marginRight}>{user.userAccount.email}</Link></TableCell>
                      <TableCell align="left">{user.userAccount.nameUser}</TableCell>
                      <TableCell align="left">{user.profile.nameProfile}</TableCell>
                      <TableCell align="left">{user.userAccount.numberIdentification}</TableCell>
                      <TableCell align="left">{user.userAccount.phone}</TableCell>
                      <TableCell align="left">{user.costCenter}</TableCell>
                      <TableCell align="left">{user.beaconsTracking}</TableCell>
                      <TableCell className="text-column">
                        {user.active === 1 ? (
                          <Badge color="success">Activa</Badge>
                        ) : <Badge color="danger">Inactiva</Badge>}
                      </TableCell>

                    </TableRow>
                  )
                })
                }
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
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    userState: state.userState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findUsers: (apiPaginationAction
      , apiPaginationCurrentPage
      , apiPaginationDirection
      , apiPaginationLimit
      , apiPaginationOrderColumn
      , apiPaginationMoveToPage
      , apiPaginationFilter) => dispatch(findUsers(apiPaginationAction
        , apiPaginationCurrentPage
        , apiPaginationDirection
        , apiPaginationLimit
        , apiPaginationOrderColumn
        , apiPaginationMoveToPage
        , apiPaginationFilter)),
    setUser: (user) => dispatch(setUser(user)),
    inactiveUser: (id, onSuccess) => dispatch(inactiveUser(id, onSuccess)),
    sendEmailRememberAccess: (email, onSuccess) => dispatch(sendEmailRememberAccess(email, onSuccess)),
    addMessage: (message) => dispatch(addMessage(message)),
  };
};

export default withStyles(extendedTablesStyle)(connect(mapStateToProps, mapDispatchToProps)(UserList));