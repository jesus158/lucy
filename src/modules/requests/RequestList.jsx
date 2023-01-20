import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import Sms from "@material-ui/icons/Sms";
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import AlertInfo from "components/AlertInfo/AlertInfo.jsx";
import Badge from "components/Badge/Badge.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import TablePagination from "components/TablePagination/TablePagination.jsx";
import {addMessage} from 'layouts/MessagesActions';
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import {getListActiveTypeCancellation} from 'modules/configurations/type_cancellation/TypeCancellationActions.js';
import {getListActiveTypeReject} from 'modules/configurations/type_reject/TypeRejectActions.js';
import {
    cancelRequest,
    carrierAcceptsAssignment,
    carrierRejectsAssignment,
    endRequest,
    getRequestInProcessByUserByFilter,
    setRequest,
    startRequest,
    updateRequest
} from "modules/requests/RequestActions.js";
import {configureAsset, getAssetById, setAsset, getListAssetType} from 'modules/assets/AssetActions.js';
import {trackingStateAssets} from "modules/reports/tracking/TrackingActions.js";
import {MILI_SECONDS_REFRESH_LIST, ROW_GRAY, ROW_WHITE, NAME_OPERATOR} from "modules/utils/ApiUtil.js";
import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {TextareaAutosize} from "@material-ui/core";
import {getActiveListTypeNewness, getListRequestTypeNewness} from "../configurations/type_newness/TypeNewnessActions";
import {carrierNewnessShift} from "modules/requests/RequestActions.js";

const WAITING_ANSWER = 2;
const WAITING_FOR_START = 3;
const ADMIN = 1;
const INITIATED = 4;


const typeRejectByDefault = {
    id: 0,
    rejectName: "Seleccione el tipo de rechazo...",
    active: 1
};

const typeCancellationByDefault = {
    id: 0,
    cancellationName: "Seleccione el tipo de cancelación...",
    active: 1
};

const exit = (<></>);
const typeNewnessByDefault = {
    id: 0,
    newnessName: "Seleccione el tipo de novedad...",
    active: 1
}
var prevNowPlaying = null;

class RequestList extends React.Component {
    newInfo = {}
    constructor(props) {
        super(props);
        this.state = {
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
            typeNewness: typeNewnessByDefault,
            typeReject: typeRejectByDefault,
            typeCancellation: typeCancellationByDefault,
            isActivityIndicatorShown: false,
            assetByDefault: {
                id: 0,
                active: 1,
                assetCode: "",
                assetZoneTag: 0,
                nameAsset: "Seleccione el activo...",
                state: 0,
                typeAsset: {
                    id: 0,
                    active: 0,
                    description: "",
                    name: ""
                },
                account: {
                    id: 0
                }
            }
        };
        this.loadContentList();
        this.loadAssetContentList();
        this.props.getListActiveTypeReject((success) => {
        });
        this.props.getListActiveTypeCancellation((success) => {
        });
    }

    /**
     * Se ejecuta al momento que se ha terminado de pintar toda la información
     * en la interfaz o cuando esta ha cambiado
     */
    componentDidMount = () => {
        this.props.getActiveListTypeNewness((success) => {

        })

        // this.props.getListRequestTypeNewness((success, idRequest) => { })

        if (prevNowPlaying) {
            clearInterval(prevNowPlaying);
            prevNowPlaying = null;
        }
        prevNowPlaying = setInterval(() => {
            this.loadContentList();
            this.loadAssetContentList();
        }, MILI_SECONDS_REFRESH_LIST);
    };

    componentWillUnmount() {
        if (prevNowPlaying) {
            clearInterval(prevNowPlaying);
        }
        prevNowPlaying = null;
    }

    /**
     * Invoca al servicio que entrega el
     * estado actual de las solicitudes
     * basado en el usuario actual y sus permisos
     */
    loadContentList = () => {
        this.props.getRequestInProcessByUserByFilter((success) => {
                this.setState({isActivityIndicatorShown: false});
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
                return "DESCCONOCIDO"
        }
    }


    /* Newness
     * Retorna las novedades asociadas a una solicitud
     */

    getNewnwess = (request) => {

        var data = "";

      // console.log(request)
        request.typeNewnessArrayList.forEach(localRequestNewness => {
            data += localRequestNewness.newnessName + "-";
        })

        return data;
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

        this.props.getRequestInProcessByUserByFilter((success) => {
                this.setState({isActivityIndicatorShown: false});
            },
            undefined,
            undefined,
            this.state.page,
            order,
            this.state.rowsPerPage,
            orderBy,
            this.state.page,
            this.state.filter.name
        );
        this.setState({order, orderBy});
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
        this.setState({filter});
        this.props.getRequestInProcessByUserByFilter((success) => {
                this.setState({isActivityIndicatorShown: false});
            },
            undefined,
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
        this.props.getRequestInProcessByUserByFilter((success) => {
                this.setState({isActivityIndicatorShown: false});
            },
            undefined,
            undefined,
            this.state.page,
            this.state.order,
            this.state.rowsPerPage,
            this.state.orderBy,
            page,
            this.state.filter.name
        );
        this.setState({page});
    };

    handleChangeRowsPerPage = rowsPerPage => {
        this.props.getRequestInProcessByUserByFilter((success) => {
                this.setState({isActivityIndicatorShown: false});
            },
            undefined,
            undefined,
            this.state.page,
            this.state.order,
            rowsPerPage,
            this.state.orderBy,
            this.state.page,
            this.state.filter.name
        );
        this.setState({rowsPerPage});
    };

    /**
     * Ejecuta la función de terminar
     * la solicitud
     */
    onClickButtonEnd = (dataRequest) => {
        if (dataRequest.asset !== null) {
            this.props.getAssetById(dataRequest.asset.id)
        }

        this.setState({isActivityIndicatorShown: true}, () => {
            this.props.endRequest((success) => {

                /**
                 * Liberacion del activo (freeAsset)
                 * freeAsset : 1 -> liberacion inmediata
                 * freeAsset : 2 -> mantener ocupado
                 * freeAsset : 3 -> liberacion en determinado tiempo (freeAssetTime)
                 */

                /** 
                 * Esta logica se translada para el backend
                if (dataRequest.asset !== null) {
                    if (this.props.assetState.data.asset !== null || this.props.assetState.asset !== undefined) {
                        var asset = this.props.assetState.data.asset
                        if (dataRequest.freeAsset === 1) {
                            asset.state = 1
                            this.props.configureAsset(asset, this.props, (success) => {
                                console.log("Activo actualizado")
                            });
                        } else if (dataRequest.freeAsset === 3) {
                            asset.state = 1
                            setTimeout(() => {
                                this.props.configureAsset(asset, this.props, (success) => {
                                    console.log(`Activo liberado despues de ${dataRequest.freeAssetTime} minutos `)
                                });
                            }, dataRequest.freeAssetTime * 60000)
                        }
                    }
                }*/

                this.loadContentList();
            }, dataRequest.id);
        })
    }
    /**
     * Genera el contenido gráfico para
     * el botón de terminar solicitud
     */
    renderButtonEnd = (dataRequest, withButton) => {
        if (dataRequest.userCarrier === null) {
            return (<></>);
        }
        if (dataRequest.userCarrier === undefined) {
            return (<></>);
        }
        if (parseInt(dataRequest.userCarrier.id, 10) !== parseInt(sessionStorage["userAccountId"], 10)) {
            return (<></>);
        }
        if (dataRequest.state !== INITIATED) {
            return (<></>);
        }
        return (
            <Button style={{width: withButton}}
                    onClick={event => {
                        this.onClickButtonEnd(dataRequest)
                    }}
                    color="success"
                    round><DoneAllIcon/>
                TERMINAR
            </Button>
        );
    }
    /**
     * Inicia la solicitud
     */
    onClickButtonStart = (dataRequest) => {
        this.setState({isActivityIndicatorShown: true}, () => {
            this.props.startRequest((success) => {
                this.loadContentList();
            }, dataRequest.id);
        });
    }
    /**
     * retorna el contenido gráfico
     * para el botón de inicio de la solicitud
     */
    renderButtonStart = (dataRequest, withButton) => {
        if (dataRequest.userCarrier === null) {
            return (<></>);
        }
        if (dataRequest.userCarrier === undefined) {
            return (<></>);
        }
        if (parseInt(dataRequest.userCarrier.id, 10) !== parseInt(sessionStorage["userAccountId"], 10)) {
            return (<></>);
        }
        if (dataRequest.state !== WAITING_FOR_START) {
            return (<></>);
        }
        return (
            <Button style={{width: withButton}}
                    onClick={(event) => {
                        this.onClickButtonStart(dataRequest)
                    }}
                    color="success"
                    round><PlayCircleFilledWhiteIcon/>
                INICIAR
            </Button>
        );
    }


    //  * retorna el contenido gráfico
    //  * para el botón de registro de la novedad

    renderButtonNewness = (dataRequest, withButton) => {
        if (dataRequest.userCarrier === null) {
            return (<></>);
        }
        if (dataRequest.userCarrier === undefined) {
            return (<></>);
        }
        if (parseInt(dataRequest.userCarrier.id, 10) !== parseInt(sessionStorage["userAccountId"], 10)) {
            return (<></>);
        }
        if (dataRequest.state == WAITING_FOR_START) {
            return (<Button style={{width: withButton}}
                            onClick={(event) => {
                                this.showAlertTypeNewness(dataRequest)
                            }}
                            color="info"
                            style={{fontSize: 12}}
                            round><AddCircleIcon/>
                NOVEDADES
            </Button>);
        }
        if (dataRequest.state == INITIATED) {

            return (
                <Button style={{width: withButton}}
                        onClick={(event) => {
                            this.showAlertTypeNewness(dataRequest)
                        }}
                        color="info"
                        style={{fontSize: 12}}
                        round><AddCircleIcon/>
                    NOVEDADES
                </Button>
            );
        }

    }


    //Newness

    showAlertTypeNewness = (data) => {
        this.setState({
            alertInactive: (
                <React.Fragment>
                    <Dialog
                        open={true}
                        onClose={this.hideAlertInactive}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">
                            {`Registrar una novedad`}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {'¿Está seguro que quiere registrar una Novedad?'}
                                <br/>
                                {this.renderListTypeNewness(data)}
                            </DialogContentText>
                        </DialogContent>
                        <div align="center">
                            <Button
                                style={{width: 120}}
                                onClick={this.hideAlertInactive}
                                color="info"
                                round><CancelIcon/>
                                Cancelar
                            </Button>
                            <Button
                                style={{width: 120}}
                                onClick={(event) => {
                                    this.onConfirmTypeNewness(data);
                                }}
                                color="success"
                                round><SaveIcon/>
                                Aceptar
                            </Button>
                        </div>
                    </Dialog>
                </React.Fragment>
            )
        });
    };

    onConfirmTypeNewness = (data) => {
        var typeNewness = this.state.typeNewness;

        var message = "Por favor seleccione el tipo de novedad";

        if (typeNewness === undefined) {
            this.props.addMessage({variant: "error", message: message});
            return;
        }
        if (typeNewness === null) {
            this.props.addMessage({variant: "error", message: message});
            return;
        }
        if (typeNewness.id < 1) {
            this.props.addMessage({variant: "error", message: message});
            return;
        }

        this.hideAlertInactive();
        this.setState({isActivityIndicatorShown: true}, () => {

            this.props.carrierNewnessShift((success) => {
            }, typeNewness.id, data.id);
        });
    }

    onClickButtonTypeNewness = (data) => {
        this.setState({typeNewness: typeNewnessByDefault}, () => {
            this.showAlertTypeNewness(data);
        })
    }

    handleTypeNewnessInput = (event, data) => {
        var typeNewness = event.target.value;
        this.setState({typeNewness}, () => {
            this.showAlertTypeNewness(data);
        });
    }

    //handleTimeTypeBreakInput ?

    getDataForSelectTypeNewness = (listTypeNewness) => {
        var content = [];
        try {
            content.push(
                <MenuItem
                    value={typeNewnessByDefault}>
                    {typeNewnessByDefault.newnessName}
                </MenuItem>);
            listTypeNewness.forEach(localTypeNewness => {
                content.push(<MenuItem value={localTypeNewness}>{localTypeNewness.newnessName}</MenuItem>);
            })
        } catch (ex) {
        }
        return content;
    }

    renderListTypeNewness = (data) => {

        var listTypeNewness = this.props.typeNewnessState.data.listTypeNewness;
        if (listTypeNewness === undefined) {
            listTypeNewness = [];
        }
        if (listTypeNewness === null) {
            listTypeNewness = [];
        }
        var classes = this.props;
        return (
            <FormControl
                fullWidth
                className={classes.selectFormControl}>
                <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}>
                    Tipo de novedad
                </InputLabel>
                <Select
                    value={this.state.typeNewness}
                    onChange={(event) => {
                        this.handleTypeNewnessInput(event, data)
                    }}
                    startAdornment={(
                        <InputAdornment
                            position="start"
                            className={classes.inputAdornment}>
                            <BookmarkBorder className={classes.inputAdornmentIcon}/>
                        </InputAdornment>
                    )}>
                    {this.getDataForSelectTypeNewness(listTypeNewness)}
                </Select>
            </FormControl>
        );
    }

    //boton NOVEDAD
    renderNewness = (data, withButton) => {
        if (!this.validateContent(data)) {
            return exit;
        }
        switch (data.state) {
            case 1:
            case 2:
            case 3:
            case 4:
                return exit;
            default:
                break;
        }
        return (
            <Button style={{width: withButton}}
                    onClick={(event) => {
                        this.onClickButtonTypeNewness(data)
                    }}
                    color="info"
                    round><AddCircleIcon/>
                NOVEDADES
            </Button>
        );
    }


    // Carga boton novedades
    renderActions = (carrierLocation, withButton) => {
        var contentNewness = this.renderNewness(carrierLocation, withButton);
        if (
            contentNewness === exit
        ) {
            return exit;
        }
        return (
            <>
                {this.renderNewness(carrierLocation, withButton)}
            </>
        )
    }

    //

    /**
     * Genera un dialogo para que se
     * selecccione el tipo de rechazo
     */
    showAlertReject = (dataRequest) => {
        this.setState({
            alertInactive: (
                <React.Fragment>
                    <Dialog
                        open={true}
                        onClose={this.hideAlertInactive}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">
                            {`Rechazar solicitud ${dataRequest.id}`}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {'¿Está seguro que quiere rechazar la solicitud?'}
                                <br/>
                                {this.renderListReject(dataRequest)}
                            </DialogContentText>
                        </DialogContent>
                        <div align="center">
                            <Button
                                style={{width: 120}}
                                onClick={this.hideAlertInactive}
                                color="info"
                                round><CancelIcon/>
                                Cancelar
                            </Button>
                            <Button
                                style={{width: 120}}
                                onClick={() => {
                                    this.onConfirmReject(dataRequest);
                                }}
                                color="success"
                                round><SaveIcon/>
                                Aceptar
                            </Button>
                        </div>
                    </Dialog>
                </React.Fragment>
            )
        });
    };
    /**
     * Cuando en el dialogo dan clic en el
     * botón aceptar se procede a rechazar la
     * solicitud
     */
    onConfirmReject = (dataRequest) => {
        var typeReject = this.state.typeReject;
        var message = "Por favor seleccione el tipo de rechazo";
        if (typeReject === undefined) {
            this.props.addMessage({variant: "error", message: message});
            return;
        }
        if (typeReject === null) {
            this.props.addMessage({variant: "error", message: message});
            return;
        }
        if (typeReject.id < 1) {
            this.props.addMessage({variant: "error", message: message});
            return;
        }
        this.hideAlertInactive();
        this.setState({isActivityIndicatorShown: true}, () => {
            this.props.carrierRejectsAssignment((success) => {
                    this.loadContentList();
                },
                dataRequest.id, dataRequest.userCarrier.id, typeReject.id);
        });
    }
    /**
     * Controla el clic del botón cancelar
     * que se muestra en el listado
     */
    onClickButtonReject = (dataRequest) => {
        this.setState({typeReject: typeRejectByDefault}, () => {
            this.showAlertReject(dataRequest);
        })
    }
    /**
     * Cuando se selecciona un tipo de rechazo del
     * listado se gestiona su almacenamiento temporal
     */
    handleTypeRejectInput = (event, dataRequest) => {
        var typeReject = event.target.value;
        this.setState({typeReject: typeReject}, () => {
            this.showAlertReject(dataRequest);
        })
    }
    /**
     * Retorna el contenido que debe ser visualizado
     * en el listado de los tipos de rechazo
     */
    getDataForSelectTypeReject = (listTypeReject) => {
        var content = [];
        try {
            content.push(
                <MenuItem
                    value={typeRejectByDefault}>
                    {typeRejectByDefault.rejectName}
                </MenuItem>);
            listTypeReject.forEach(localTypereject => {
                content.push(<MenuItem value={localTypereject}>{localTypereject.rejectName}</MenuItem>);
            })
        } catch (ex) {
        }
        return content;
    }
    /**
     * Retorna el contenido gráfico que debe tener la lista
     * de los tipos de rechazo disponibles
     */
    renderListReject = (dataRequest) => {
        if (dataRequest.userCarrier === null) {
            return (<></>);
        }
        if (dataRequest.userCarrier === undefined) {
            return (<></>);
        }
        if (parseInt(dataRequest.userCarrier.id, 10) !== parseInt(sessionStorage["userAccountId"], 10)) {
            return (<></>);
        }
        if (dataRequest.state !== WAITING_ANSWER) {
            return (<></>);
        }
        var {listTypeReject} = this.props.typeRejectState.data;
        if (listTypeReject === undefined) {
            listTypeReject = [];
        }
        var classes = this.props;
        return (
            <FormControl
                fullWidth
                className={classes.selectFormControl}>
                <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}>
                    Tipo de rechazo
                </InputLabel>
                <Select
                    value={this.state.typeReject}
                    onChange={(event) => {
                        this.handleTypeRejectInput(event, dataRequest)
                    }}
                    startAdornment={(
                        <InputAdornment
                            position="start"
                            className={classes.inputAdornment}>
                            <BookmarkBorder className={classes.inputAdornmentIcon}/>
                        </InputAdornment>
                    )}>
                    {this.getDataForSelectTypeReject(listTypeReject)}
                </Select>
            </FormControl>
        );
    }
    /**
     * Retorna el contenido gráfico para
     * mostrar los botones de rechazar asociados
     * a la solicitud
     */
    renderButtonReject = (dataRequest, withButton) => {
        if (dataRequest.userCarrier === null) {
            return (<></>);
        }
        if (dataRequest.userCarrier === undefined) {
            return (<></>);
        }
        if (parseInt(dataRequest.userCarrier.id, 10) !== parseInt(sessionStorage["userAccountId"], 10)) {
            return (<></>);
        }
        if (dataRequest.state !== WAITING_ANSWER) {
            return (<></>);
        }
        return (
            <Button style={{width: withButton}}

                    onClick={(event) => {
                        this.onClickButtonReject(dataRequest)
                    }}
                    color="info"
                    round><ThumbDownIcon/>
                RECHAZAR
            </Button>
        );
    }


    /**
     * Muestra el dialogo con el listado
     * de los tipos de cancelación para
     * ser procesados, y de los cuales se
     * selecciona uno para el proceso.
     */
    showAlertCancellation = (dataRequest) => {
        this.setState({
            alertInactive: (
                <React.Fragment>
                    <Dialog
                        open={true}
                        onClose={this.hideAlertInactive}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">
                            {`Cancelar la solicitud ${dataRequest.id}`}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {'¿Está seguro que quiere cancelar la solicitud?'}
                                <br/>
                                {this.renderListCancellation(dataRequest)}
                            </DialogContentText>
                        </DialogContent>
                        <div align="center">
                            <Button
                                style={{width: 120}}
                                onClick={this.hideAlertInactive}
                                color="info"
                                round><CancelIcon/>
                                Cancelar
                            </Button>
                            <Button
                                style={{width: 120}}
                                onClick={(event) => {
                                    this.onConfirmCancellation(dataRequest);
                                }}
                                color="success"
                                round><SaveIcon/>
                                Aceptar
                            </Button>
                        </div>
                    </Dialog>
                </React.Fragment>
            )
        });
    };
    /**
     * confirma que se desea cancelar una
     * solicitud realizada
     */
    onConfirmCancellation = (dataRequest) => {
        var typeCancellation = this.state.typeCancellation;

        var message = "Por favor seleccione el tipo de cancelación";
        if (typeCancellation === undefined) {
            this.props.addMessage({variant: "error", message: message});
            return;
        }
        if (typeCancellation === null) {
            this.props.addMessage({variant: "error", message: message});
            return;
        }
        if (typeCancellation.id < 1) {
            this.props.addMessage({variant: "error", message: message});
            return;
        }
        this.hideAlertInactive();
        this.setState({isActivityIndicatorShown: true}, () => {
            this.props.cancelRequest((success) => {

                    if (dataRequest.asset !== null) {
                        if (this.props.assetState.data.asset !== null || this.props.assetState.asset !== undefined) {
                            var asset = this.props.assetState.data.asset
                            asset.state = 1
                            this.props.configureAsset(asset, this.props, (success) => {
                                console.log("Activo actualizado")
                            });
                        }
                    }

                    this.loadContentList();

                },
                dataRequest.id, typeCancellation.id);
        });
    }
    /**
     * Gestiona el clic del botón cancelar de
     * la lista de solicitud mostrada
     */
    onClickButtonCancel = (dataRequest) => {

        if (dataRequest.asset !== null) {
            this.props.getAssetById(dataRequest.asset.id)
        }

        this.setState({typeCancellation: typeCancellationByDefault}, () => {
            this.showAlertCancellation(dataRequest);
        })
    }
    /**
     * gestiona, el tipo de cancelación
     * que se ha seleccionado y se almacena
     * para su uso.
     */
    handleTypeCancellationInput = (event, dataRequest) => {
        var typeCancellation = event.target.value;
        this.setState({typeCancellation}, () => {
            this.showAlertCancellation(dataRequest);
        });
    }
    /**
     * retorna el contenido de lista, que mostrará
     * el elemento de selección de tipos de cancelación
     * en la interfáz gráfica
     */
    getDataForSelectTypeCancellation = (listTypeCancellation) => {
        var content = [];
        try {
            content.push(
                <MenuItem
                    value={typeCancellationByDefault}>
                    {typeCancellationByDefault.cancellationName}
                </MenuItem>);
            listTypeCancellation.forEach(localTypeCancellation => {
                content.push(<MenuItem
                    value={localTypeCancellation}>{localTypeCancellation.cancellationName}</MenuItem>);
            })
        } catch (ex) {
        }
        return content;
    }
    /**
     * retorna el contenido gráfico para
     * la creación de una lista de selección con
     * los tipos de cancelación disponibles
     */
    renderListCancellation = (dataRequest) => {
        if (dataRequest.userRequest === null) {
            return (<></>);
        }
        if (dataRequest.userRequest === undefined) {
            return (<></>);
        }
        if (parseInt(dataRequest.userRequest.id, 10) !== parseInt(sessionStorage["userAccountId"], 10)) {
            if (parseInt(sessionStorage["userAccountProfileId"], 10) !== ADMIN) {
                return (<></>);
            }
        }
        var listTypeCancellation = this.props.typeCancellationState.data.listTypeCancellation;
        if (listTypeCancellation === undefined) {
            listTypeCancellation = [];
        }
        if (listTypeCancellation === null) {
            listTypeCancellation = [];
        }
        var classes = this.props;
        return (
            <FormControl
                fullWidth
                className={classes.selectFormControl}>
                <InputLabel
                    htmlFor="simple-select"
                    className={classes.selectLabel}>
                    Tipo de cancelación
                </InputLabel>
                <Select
                    value={this.state.typeCancellation}
                    onChange={(event) => {
                        this.handleTypeCancellationInput(event, dataRequest)
                    }}
                    startAdornment={(
                        <InputAdornment
                            position="start"
                            className={classes.inputAdornment}>
                            <BookmarkBorder className={classes.inputAdornmentIcon}/>
                        </InputAdornment>
                    )}>
                    {this.getDataForSelectTypeCancellation(listTypeCancellation)}
                </Select>
            </FormControl>
        );
    }
    /**
     * retorna el contenido gráfico para
     * colocar el botón cancelar en el listado
     * de las solicitudess
     */
    renderButtonCancel = (dataRequest, withButton) => {

        if (dataRequest.userRequest === null) {
            return (<></>);
        }
        if (dataRequest.userRequest === undefined) {
            return (<></>);
        }
        if (parseInt(dataRequest.userRequest.id, 10) !== parseInt(sessionStorage["userAccountId"], 10)) {
            if (parseInt(sessionStorage["userAccountProfileId"], 10) !== ADMIN) {
                return (<></>);
            }
        }
        var listTypeCancellation = this.props.typeCancellationState.data.listTypeCancellation;
        if (listTypeCancellation === undefined) {
            listTypeCancellation = [];
        }
        if (listTypeCancellation === null) {
            listTypeCancellation = [];
        }

        return (
            <Button style={{width: withButton}}
                    onClick={(event) => {
                        this.onClickButtonCancel(dataRequest)
                    }}
                    color="info"
                    round><CancelIcon/>
                CANCELAR
            </Button>

        );
    }

    /**
     * Creación del botón Editar y ejecución de
     * las acciones que permiten editar o agregar
     * el contenido del campo Información
     */

    renderButtonUpdate = (dataRequest, withButton) => {
        if (dataRequest.userRequest === null) {
            return (<></>);
        }
        if (dataRequest.userRequest === undefined) {
            return (<></>);
        }
        if (parseInt(dataRequest.userRequest.id, 10) !== parseInt(sessionStorage["userAccountId"], 10)) {
            if (parseInt(sessionStorage["userAccountProfileId"], 10) !== ADMIN) {
                return (<></>);
            }
        }
        var listTypeUpdate = this.props.requestState.data.requestState;
        if (listTypeUpdate === undefined) {
            listTypeUpdate = [];
        }
        if (listTypeUpdate === null) {
            listTypeUpdate = [];
        }

        return (

            <Button style={{width: withButton}}
                    onClick={(event) => {
                        console.log(this.newInfo[dataRequest.id])
                        if (this.newInfo[dataRequest.id]) {
            
                            dataRequest.moreInformation = this.newInfo[dataRequest.id];
                        }
                        if (this.newInfo[dataRequest.id] && this.newInfo[dataRequest.id].length >= 180) {
                            return this.showAlertInfo("El mensaje no debe superar 180 caracteres");
                        }

                        this.props.updateRequest((success) => {
                                if (success === "OK") {
                                    this.props.history.push('/admin/requests');
                                }

                                if (this.assetByDefault.id > 0) {
                                    this.assetByDefault.state = 0
                                    this.props.configureAsset(this.assetByDefault, this.props, (success) => {
                                        console.log("Activo actualizado")
                                    });
                                }

                            },
                            dataRequest.id,
                            dataRequest.locationBegin.id,
                            dataRequest.locationEnd.id,
                            dataRequest.typeService.id,
                            dataRequest.asset ? dataRequest.asset.id : 0,
                            dataRequest.freeAsset,
                            dataRequest.freeAssetTime,
                            dataRequest.userCarrier ? dataRequest.userCarrier.id : 0,
                            dataRequest.moreInformation,
                            dataRequest.nameReceived,
                        )

                    }}
                    color="info"
                    style={{fontSize: 12}}
                    round> <CheckCircleIcon/>
                MODIFICAR INFORMACION
            </Button>

        );
    }

    /**
     * Ejecuta las acciones de aceptar la solicitud
     * del operador
     */
    onClickButtonAccept = (dataRequest) => {
        this.setState({isActivityIndicatorShown: true}, () => {
            this.props.carrierAcceptsAssignment((success) => {
                    console.log(this.loadContentList)
                    this.loadContentList();
                },
                dataRequest.id, dataRequest.userCarrier.id)
        });
    }
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
    /**
     * retorna el contenido gráfico para colocar
     * el botón de aceptar una solicitud.
     */
    renderButtonAccept = (dataRequest, withButton) => {
        if (dataRequest.userCarrier === null) {
            return (<></>);
        }
        if (dataRequest.userCarrier === undefined) {
            return (<></>);
        }
        if (parseInt(dataRequest.userCarrier.id, 10) !== parseInt(sessionStorage["userAccountId"], 10)) {
            return (<></>);
        }
        if (dataRequest.state !== WAITING_ANSWER) {
            return (<></>);
        }
        return (
            <Button style={{width: withButton}}

                    onClick={(event) => {
                        console.log(this.onClickButtonAccept);
                        this.onClickButtonAccept(dataRequest)
                    }}
                    color="success"
                    round><CheckCircleIcon/>
                ACEPTAR
            </Button>
        );
    }

    handleAssetData = (asset) => {
        if (asset == null | asset == undefined) {
            return '--'
        } else {
            return (`${asset.nameAsset} (${asset.typeAsset.name})`)
        }
    }

    handleAssetUbication = (asset, listAssets) => {

        if (asset == null || asset == undefined || listAssets == null || asset == undefined) {
            return '---'
        } else {
            for (let assetTacking of listAssets) {
               // console.log("Ubicacion de tracking ", assetTacking);
                if (assetTacking.id == asset.id && assetTacking.tracking) {
                    return assetTacking.tracking.lastUbication.nameUbication;
                }

            }

            return '---'
        }
    }

    /**
     * Actualiza el contenido inicial del
     * campo Información reemplazandolo
     * con el nuevo valor.
     */
    handleChange = (key, request) => (event) => {
        this.setState({value: event.target.value});
        this.newInfo[request.id] = event.target.value;
        console.log(this.newInfo[request.id])
       
        //request.moreInformation = event.target.value;
    }


    /**
     * Contenido gráfico de la opción.
     */
    render = () => {
        const gunnarStyle = {height: "10px", padding: "1px 1px 1px 10px"};
        const gunnarStyle2 = {height: "10px", padding: "1px 1px 1px 3px", width: "100%"};
        const divRounded1 = {backgroundColor: "#F0F0F0", borderRadius: " 10px 10px 10px 10px", width: "100%"};
        const divRounded2 = {borderRadius: " 5px 5px 5px 5px"};
        const {classes} = this.props;
        const isActivityIndicatorShown = this.state.isActivityIndicatorShown;
        var {apiPagination, listRequests} = this.props.requestState.data;
        const withButton = 100;

        var {apiPaginationAsset, listAssets} = this.props.trackingState.data;

        if (apiPagination === undefined) {
            apiPagination = {};
        }
        if (listRequests === undefined) {
            listRequests = [];
        }

        if (this.state.toAdmin === true) {
            return <Redirect to={'/admin/admin-request/?code=' + this.state.accountId}/>
        }
        return (
            <GridItem xs={12}>
                {isActivityIndicatorShown &&
                <WaitDialog text={this.state.textAlertInfo}/>
                }
                <AlertInfo text={this.state.textAlertInfo} open={this.state.openAlertInfo}
                           onDoneClick={this.hideaAlertInfo}/>
                {this.state.alertInactive}

                <Card>
                    <CardHeader color="primary" icon>
                        <CardIcon color="info">
                            <Sms/>
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Solicitudes</h4>
                    </CardHeader>
                    <CardBody style={{overflow: "auto"}}>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            //fixedHeader={false}
                            style={{width: "100%", tableLayout: "auto"}}>
                            <TableBody>
                                {listRequests.map((request, key) => {
                                    return (
                                        <div style={key % 2 === 0 ? divRounded2 : divRounded1}>
                                            <TableRow key={`TableRow1-${key}`} style={{background: ROW_WHITE}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>No:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${request.id}`}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow1-${key}`} style={{background: ROW_WHITE}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Solicitado Por:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${request.nameReceived}`}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow2-${key}`} style={{background: ROW_GRAY}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Prioridad:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {this.getTextOfPriority(request.typeService.priority)}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow3-${key}`} style={{background: ROW_WHITE}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Botón:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${request.callButton !== undefined && request.callButton !== null ? request.callButton.uuid : "--"}`}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow4-${key}`} style={{background: ROW_GRAY}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Fecha:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${this.formatDate(request.dateRequest)}`}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow5-${key}`} style={{background: ROW_WHITE}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Tiempo esperado:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${request.estimatedTime === undefined || request.estimatedTime === null || request.estimatedTime === 0 ? '--' : request.estimatedTime + ' minutos'}`}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow6-${key}`} style={{background: ROW_GRAY}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Estado:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    <Badge
                                                        color={this.getStateColor(request.state)}>
                                                        {this.formatState(request.state)}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow7-${key}`} style={{background: ROW_WHITE}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Tipo:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${request.typeService.serviceName}`}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow8-${key}`} style={{background: ROW_GRAY}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Origen:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${request.locationBegin.nameUbication}`}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow9-${key}`} style={{background: ROW_WHITE}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Destino:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${request.locationEnd.nameUbication}`}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow10-${key}`} style={{background: ROW_GRAY}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Solicitante:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${request.userRequest.userAccount.nameUser}`}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow11-${key}`} style={{background: ROW_WHITE}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Activo Seleccionado:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {this.handleAssetData(request.asset)}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow12-${key}`} style={{background: ROW_WHITE}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Ubicación activo:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {this.handleAssetUbication(request.asset, listAssets)}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow13-${key}`} style={{background: ROW_GRAY}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>{ 'Operador:'}</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {request.userCarrier !== null ? request.userCarrier.userAccount.nameUser : "Sin asignar"}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow14-${key}`} style={{background: ROW_WHITE}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Información:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    <TextareaAutosize
                                                        maxlength="180"
                                                        rowsMax={4}
                                                        aria-label="maximum height"
                                                        value={this.newInfo[request.id] || request.moreInformation}
                                                        onChange={this.handleChange(key, request)}></TextareaAutosize>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow15-${key}`} style={{background: ROW_GRAY}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Desde registro:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${this.getTimeFromInfo(request.dateRequest)}`}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow16-${key}`} style={{background: ROW_WHITE}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Desde asignación:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${this.getTimeFromInfo(request.dateAssign)}`}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow17-${key}`} style={{background: ROW_GRAY}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Desde aceptación:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${this.getTimeFromInfo(request.dateAccept)}`}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={`TableRow18-${key}`} style={{background: ROW_WHITE}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Desde inicio:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {` ${this.getTimeFromInfo(request.dateBegin)}`}
                                                </TableCell>
                                            </TableRow>

                                            <TableRow key={`TableRow19-${key}`} style={{background: ROW_GRAY}}>
                                                <TableCell style={gunnarStyle}>
                                                    <b>Novedades:</b>
                                                </TableCell>
                                                <TableCell style={gunnarStyle2}>
                                                    {this.getNewnwess(request)}
                                                </TableCell>
                                            </TableRow>

                                            <div align="left">
                                                {this.renderButtonCancel(request, withButton)}
                                                {this.renderButtonUpdate(request, withButton)}
                                                {this.renderButtonAccept(request, withButton)}
                                                {this.renderButtonReject(request, withButton)}
                                                {this.renderButtonStart(request, withButton)}
                                                {this.renderButtonEnd(request, withButton)}
                                                {this.renderButtonNewness(request, withButton)}
                                            </div>
                                            <br/>
                                        </div>
                                    );
                                })}
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
            </GridItem>
        );
    }
}

//adicion typeNewnessState
const mapStateToProps = state => {
    return {
        requestState: state.requestState,
        typeRejectState: state.typeRejectState,
        typeCancellationState: state.typeCancellationState,
        assetState: state.assetState,
        trackingState: state.trackingState,
        typeNewnessState: state.typeNewnessState
    };
};

const mapDispatchToProps = dispatch => {
    return {
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

        setRequest: request => dispatch(setRequest(request)),
        carrierAcceptsAssignment: (onSuccess, idRequest, idUserSystemAccount) => dispatch(carrierAcceptsAssignment(onSuccess, idRequest, idUserSystemAccount)),
        carrierRejectsAssignment: (onSuccess, idRequest, idUserSystemAccount, idTypeReject) => dispatch(carrierRejectsAssignment(onSuccess, idRequest, idUserSystemAccount, idTypeReject)),
        getListActiveTypeReject: (onSuccess) => dispatch(getListActiveTypeReject(onSuccess)),
        getListActiveTypeCancellation: (onSuccess) => dispatch(getListActiveTypeCancellation(onSuccess)),
        cancelRequest: (onSuccess, idRequest, idTypeCancellation) => dispatch(cancelRequest(onSuccess, idRequest, idTypeCancellation)),
        startRequest: (onSuccess, idRequest) => dispatch(startRequest(onSuccess, idRequest)),
        endRequest: (onSuccess, idRequest) => dispatch(endRequest(onSuccess, idRequest)),
        addMessage: (message) => dispatch(addMessage(message)),
        getAssetById: (id) => dispatch(getAssetById(id)),
        configureAsset: (asset, ownProps, onSuccess) => dispatch(configureAsset(asset, ownProps, onSuccess)),
        setAsset: (asset) => dispatch(setAsset(asset)),

        //newness
        getActiveListTypeNewness: (onSuccess) => dispatch(getActiveListTypeNewness(onSuccess)),
        getListRequestTypeNewness: (onSuccess, idRequest) => dispatch(getListRequestTypeNewness(onSuccess, idRequest)),
        carrierNewnessShift: (onSuccess, idTypeNewness, idRequest) => dispatch(carrierNewnessShift(onSuccess, idTypeNewness, idRequest)),

        updateRequest: (
            onSucess,
            idRequest,
            idUbicationBegin,
            idUbicationEnd,
            idTypeService,
            idAsset,
            freeAsset,
            freeAssetTime,
            idCarrierUserSystemAccount,
            newInfo) => dispatch(updateRequest(
            onSucess,
            idRequest,
            idUbicationBegin,
            idUbicationEnd,
            idTypeService,
            idAsset,
            freeAsset,
            freeAssetTime,
            idCarrierUserSystemAccount,
            newInfo))
    };
};

export default withStyles(extendedTablesStyle)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(RequestList)
);
