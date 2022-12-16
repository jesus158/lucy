// @material-ui/core components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Warning from '@material-ui/icons/Warning';
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Block from "@material-ui/icons/Block";
import alertaMp3 from "assets/mp3/alerta.mp3"
import EnhancedTableHead from "components/EnhancedTableHead/EnhancedTableHead.jsx";
import TablePagination from "components/TablePagination/TablePagination.jsx";
import { addMessage } from 'layouts/MessagesActions';
import Filter from "modules/components/Filter.jsx";
import Button from "components/CustomButtons/Button.jsx";
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { trackingStateAlerts,closeAlert } from "modules/reports/tracking/TrackingActions.js";
import { MILI_SECONDS_REFRESH_LIST, ROW_GRAY, ROW_WHITE } from "modules/utils/ApiUtil.js";
//import { gettrackingByFilter } from "modules/locations/trackings/trackingActions.js";
import React from 'react';
import { connect } from "react-redux";



const rows = [
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: '' },
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: 'Tipo' },
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: 'Ubicación' },
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: 'Activo' },
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: 'Hora' },
];


const rowsNewAlert = [
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: 'Tipo' },
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: 'Ubicación' },
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: 'Activo' },
    { id: 0, numeric: false, disablePadding: true, isSorted: false, label: 'Hora' },
];
var prevNowPlaying = null;

class Alerts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alertTimer: null,
            openAlertInfo: false,
            newAlert: false,
            newAlerts:[],
            textAlertInfo: "",
            filter: {},
            order: 0,
            orderBy: 16,
            page: 0,
            rowsPerPage: 5,
            toAdmin: false,
            accountId: 0,
            alertInactive: null,
            alertShowWindow: null,
            isActivityIndicatorShown: false,
            cont: 0,
            play: false,


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

        if (this.state.alertTimer) {
            clearInterval(this.state.alertTimer);
            this.state.alertTimer = null;
        }        

    }

    playAudio() {

        if (this.state.alertTimer) {
            clearInterval(this.state.alertTimer);
            this.state.alertTimer = null;
        }
        const audioEl = document.getElementsByClassName("audio-element")[0];
        console.log(document.getElementsByClassName("audio-element")[0]);
        audioEl.play();
        this.state.alertTimer = setInterval(() => {
            this.playAudio();
        }, 3000);
        
    }

    loadContentList = () => {
        //console.log("refrescando desde formulario");
        this.props.trackingStateAlerts(
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


    showAlertInactive = (id) => 
    {
        console.log("ID");
        console.log(id);
        this.setState({
          alertInactive: (
            <Dialog open={true}>
    
              <DialogTitle id="form-dialog-title">Inactivar</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  ¿Está seguro que quiere cerrar esta alerta?
                    </DialogContentText>
              </DialogContent> 
              <DialogActions>
                <Button onClick={this.hideAlertInactive} color="danger">
                  Cancelar
                    </Button>
                    <Button onClick={() => {
                        this.hideAlertInactive();
                        this.props.closeAlert(id, success => {
                            this.props.trackingStateAlerts(undefined, this.state.page, this.state.order, this.state.rowsPerPage, this.state.orderBy, this.state.page, this.state.filter.name);
                        });
                        }} color="info">
                  Aceptar
                    </Button>
              </DialogActions> 
            </Dialog>
          )
        });
      
    }


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 1;

        if (this.state.orderBy === property && this.state.order === 1) {
            order = 0;
        }
        console.log("loadContentList");
        this.props.trackingStateAlerts(
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
            alertInactive : null
        });
    };


    hideAlertShowWindow = () => {
        this.setState({
            newAlert : false
        });

        if (this.state.alertTimer) {
            clearInterval(this.state.alertTimer);
            this.state.alertTimer = null;
        }
    };

    alertShowWindow
    onFilter = filter => {
        this.setState({ filter });
        this.props.trackingStateAlerts(
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
        this.props.trackingStateAlerts(
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
        this.props.trackingStateAlerts(
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
        var { apiPaginationAlerts, listAlerts } = this.props.trackingState.data;
        const { order, orderBy } = this.state;

        if (apiPaginationAlerts === undefined) {
            apiPaginationAlerts = {};
        }
        if (listAlerts === undefined) {
            listAlerts = [];
        }
        //console.log("render");

        //this.state.cont++;
        //console.log(this.state.cont%30);

            
        if (listAlerts.length > 0 && this.state.newAlert === false)  {
            this.state.newAlerts =[];

            var arrayLength = listAlerts.length;
            for (var i = 0; i < arrayLength; i++) {
                let objAlert = listAlerts[i];
                if (objAlert.new=== 1) {
                    this.state.newAlert = true;
                    this.playAudio();
                    objAlert.new= 0;
                    this.state.newAlerts.push(objAlert);
                    console.log("Nueva Alerta");    
        
                } 
            }

          
    
        }            

        //console.log(listAlerts.length);



        return (
            <>
                {isActivityIndicatorShown ?
                    <WaitDialog text={"Cargando..."} />
                    : null
                }
                {this.state.alertInactive}
                {this.state.alertShowWindow}

                <Dialog open={this.state.newAlert}>
    
                    <DialogTitle id="form-dialog-title">Alerta</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Activos detectados:
                        </DialogContentText>
                        <Table className={classes.table} aria-labelledby="tableTitle" key={`TableCardTracking`}>
                            <EnhancedTableHead
                                key={`EnhancedTableHead-${Math.random()}`}
                                onRequestSort={this.handleRequestSort}
                                order={order === 0 ? 'asc' : 'desc'}
                                orderBy={orderBy+''}
                                rowCount={20}
                                rows={rowsNewAlert}
                            />                    
                            <TableBody>
                                {this.state.newAlerts.map((objAlerta, key) => {
                                    return (
                                        <TableRow tabIndex={-1} key={`TableRow-${key}`} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>


                                            <TableCell className="text-column">
                                                {objAlerta.typeAlert.name}
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {objAlerta.ubication}
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {objAlerta.asset}
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {objAlerta.date}
                                            </TableCell>                                            

                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>                       
                    </DialogContent> 
                    <DialogActions>
                    <Button onClick={this.hideAlertShowWindow} color="info">
                        Aceptar
                    </Button>
                    </DialogActions> 
                </Dialog>
                <div>
                  
                    <audio className="audio-element">
                    <source src= {alertaMp3} ></source>
                    </audio>
                </div>
                <Card key={`CardTracking`} >
                    <CardHeader color="primary" icon >
                        <CardIcon color="info">
                            <Warning />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Alertas</h4>
                    </CardHeader>
                    <CardBody style={{ overflow: "auto" }}>
                        <Filter onFilter={this.onFilter} name={true} nameText={"Filtrar"} placeholder={"activo"} />
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
                                {listAlerts.map((tracking, key) => {
                                    return (
                                        <TableRow tabIndex={-1} key={`TableRow-${key}`} style={{ background: key % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>

                                            <TableCell align="right" className="text-column">
                                                <div>

                                                <Button
                                                    color="danger"
                                                    simple
                                                    className={classes.actionButton}
                                                    key={"close_" + tracking.id}
                                                    onClick={this.showAlertInactive.bind(this,tracking.id)}>

                                                    <Block className={classes.icon} />
                                                </Button>

                                                </div>
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {tracking.typeAlert.name}
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {tracking.ubication}
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {tracking.asset}
                                            </TableCell>
                                            <TableCell className="text-column">
                                                {tracking.date}
                                            </TableCell>                                            

                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            pages={apiPaginationAlerts.totalPages}
                            rowsPerPage={apiPaginationAlerts.limit}
                            page={apiPaginationAlerts.currentPage}
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
        trackingStateAlerts: (
            apiPaginationAction,
            apiPaginationCurrentPage,
            apiPaginationDirection,
            apiPaginationLimit,
            apiPaginationOrderColumn,
            apiPaginationMoveToPage,
            apiPaginationFilter
        ) =>
            dispatch(
                trackingStateAlerts(
                    apiPaginationAction,
                    apiPaginationCurrentPage,
                    apiPaginationDirection,
                    apiPaginationLimit,
                    apiPaginationOrderColumn,
                    apiPaginationMoveToPage,
                    apiPaginationFilter
                )
            ),
            closeAlert: (id, onSuccess) => dispatch(closeAlert(id, onSuccess)),
        addMessage: (message) => dispatch(addMessage(message)),
    };

};

export default withStyles(extendedTablesStyle)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Alerts)
);
