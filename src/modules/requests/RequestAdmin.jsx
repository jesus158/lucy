// @material-ui/core components
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import NotesOutlined from "@material-ui/icons/NotesOutlined";
import PersonOutline from '@material-ui/icons/PersonOutline';
import Layers from '@material-ui/icons/Layers';
import QueryBuilder from '@material-ui/icons/QueryBuilder';
import SaveIcon from '@material-ui/icons/Save';
import Sms from "@material-ui/icons/Sms";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import AlertInfo from "components/AlertInfo/AlertInfo.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { getInShiftByFilter } from 'modules/carriers/carrierActions.js';
import WaitDialog from "modules/components/WaitDialog.jsx";
import { getListActiveTypeService } from 'modules/configurations/type_services/TypeServicesActions.js';
import { getListActiveShowService } from 'modules/locations/ubications/UbicationActions.js';
import { getListActiveAsset, configureAsset, getListAssetType } from 'modules/assets/AssetActions.js';
import { createRequest, setCarrier, setMoreInformation, setTypeService, setAsset, setUbicationBegin, setUbicationEnd, setNameRequested } from 'modules/requests/RequestActions.js';
import React from "react";
import { connect } from 'react-redux';
import { NAME_OPERATOR } from "modules/utils/ApiUtil.js";
import Check from "@material-ui/icons/Check";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { addMessage } from 'layouts/MessagesActions';




//const ADMIN = 1;

const style = {
  gridContainer: {    padding: "0px 30px 30px 40px"

  },
  operadorOcupado:{
    height: "15px",
    width: "15px",
    backgroundColor: "#d11507",
    borderRadius: "50%",
    display: "inline-block",
    marginLeft: "8px"
},

  operadorLibre: {
    height: "15px",
    width: "15px",
    backgroundColor: "#4caf50",
    borderRadius: "50%",
    display: "inline-block",
    marginLeft: "8px"
},

  gridItem: {
    margin: "20px 0px 10px 0px"
  },

  headerGridItem: {
    margin: "30px 0px 0px 0px"
  },
  ...regularFormsStyle
};

class RequestAdmin extends React.Component {
  constructor(props) {
    super(props);

    props.requestState.saveActive=true;

    this.state = {
      AlertInfo: "",
      requestId: 0,
      typeServiceByDefault: {
        id: 0,
        active: 1,
        serviceName: "Seleccione el tipo de servicio...",
      },
      ubicationByDefault: {
        id: 0,
        nameUbication: "Seleccione la ubicación..."
      },
      carrierByDefault: {
        id: 0,
        userCarrier: {
          userAccount: {
            nameUser: `Seleccione el ${NAME_OPERATOR}...`
          }
        }
      },
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
      },
      typeAssetByDefault: {
        id: 0,
        name: "Seleccione el tipo de activo..."
      },
      checked : {
        isChecked: false, 
        availableCheckbox: true,
        unavailableCheckbox: true,
        setTimeCheckbox: true,
        setTimeInput: false,
        freeAssetByDefault: 0,
        freeAssetTimeByDefault: 0
      },
      
    };
  }

  onGetListActiveTypeServiceSuccess = (result) => {

  }

  componentDidMount = () => {
    var urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has("requesId")) {
      this.setState({ requestId: urlParams.get("requesId") });
    }
    this.props.getListActiveTypeService((resul) => {
    });
    this.props.getListActiveAsset((result) => {
    });
    this.props.getListAssetType((result) => {
    });
    this.props.getListActiveShowService();
    this.props.getInShiftByFilter({ limit: 1000, orderColumn: 12, orderDireccion: 0 });
    this.props.setTypeService(this.state.typeServiceByDefault);
    this.props.setAsset(this.state.assetByDefault);
    this.props.setUbicationBegin(this.state.ubicationByDefault);
    this.props.setUbicationEnd(this.state.ubicationByDefault);
    this.props.setCarrier(this.state.carrierByDefault);
    this.props.setMoreInformation("");
    this.props.setNameRequested("");
  };

  /**
   * Ejecuta las acciones al solicitar guardar
   * desde el botón de la aplicación
   */
  onClickSave = () => {
    // this.props.requestState.saveActive = false;
    //alert("prueba1");
    var idCarrierUserSystemAccount = undefined;
    if (this.props.requestState.data.carrier !== undefined) {
      idCarrierUserSystemAccount = this.props.requestState.data.carrier.userCarrier.id
    }
    var moreInformation = this.props.requestState.data.moreInformation;
    var nameRequested = this.props.requestState.data.nameRequested;
    var message = "El campo Solicitado Por es Obligatorio";

    try {
      if(nameRequested === "" ) {
        throw message;
      }
    } catch (ex) {
      this.props.addMessage({ variant: "warning", message: message });
      return
    }

    this.props.createRequest((success) => {
      console.log("succes ok");
      console.log(typeof(success));
      console.log(success);
      console.log(this.props.requestState);
      if (success === "OK") {
        this.props.history.push('/admin/requests');
      }


    },
      this.props.requestState.data.ubicationBegin.id,
      this.props.requestState.data.ubicationEnd.id,
      this.props.requestState.data.typeService.id,
      this.props.requestState.data.asset.id,
      this.state.checked.freeAssetByDefault,
      this.state.checked.freeAssetTimeByDefault,
      idCarrierUserSystemAccount,
      moreInformation,
      nameRequested,
    );

  }

  /**
   * Alamcena el estado del tipo de servicio que se ha seleccionado
   * para la solicitud
   */
  handleTypeServiceInput = event => {
    var typeService = event.target.value;
    this.props.setTypeService(typeService);
  }

  handleAssetInput = event => {
    var asset = event.target.value
    this.assetByDefault = asset
    this.props.setAsset(asset)
  }

  /**
   * Administra los cambios en la selección
   * de l aubicación de inicio
   */
  handleUbicationBeginInput = event => {
    var ubication = event.target.value;
    this.props.setUbicationBegin(ubication);
  }

  /**
   * Administra los cambios en la 
   * selección de un operador
   */
  handleCarrierInput = event => {
    var carrier = event.target.value;
    this.props.setCarrier(carrier);
  }

  /**
   * Cuando cambia la ubicación seleccionada
   * se procesa la nueva
   */
  handleUbicationEndInput = event => {
    var ubication = event.target.value;
    this.props.setUbicationEnd(ubication);
  }

  /**
   * Administra los cambios en la 
   * información adicional del servicio
   */
  handleMoreInformationInput = event => {
    var moreInformation = event.target.value;
    this.props.setMoreInformation(moreInformation);
  }

  handleNameRequestedInput = event => {
    var nameRequested = event.target.value;
    this.props.setNameRequested(nameRequested);
  }

  handleInputTimeText = event => {
    var input = parseInt(event.target.value)
    this.state.checked.freeAssetTimeByDefault = input
  }

  /**
   * Retorna el contenido para llenar el select que permite
   * seleccionar los tipos de servicios
   */
  getDataForSelectTypeServices = (listTypeServices) => {
    var content = [];
    var typeServiceByDefault = this.state.typeServiceByDefault;
    try {
      content.push(
        <MenuItem
          value={typeServiceByDefault}>
          {typeServiceByDefault.serviceName}
        </MenuItem>);
      listTypeServices.forEach(localTypeService => {
        content.push(<MenuItem value={localTypeService}>{localTypeService.serviceName}</MenuItem>);
      })
    } catch (ex) { }
    return content;
  }

  getDataForSelectAsset = (listAssets) => {
    var content = []
    var assetByDefault = this.state.assetByDefault;
    try {
      content.push(
        <MenuItem
          value={assetByDefault}>
          {assetByDefault.nameAsset}
        </MenuItem>)
      listAssets.forEach(localAsset => {
        if (localAsset.state != 0) {
          content.push(<MenuItem value={localAsset}>{`${localAsset.nameAsset}(${localAsset.typeAsset.name})`}</MenuItem>)
        }
      })
    } catch (ex) { }
    return content;
  }

  getDataForSelectTypeAsset = (data) => {
    var content = []
    var defaultData = this.state.typeAssetByDefault;
    try {
      content.push(
        <MenuItem
          value={defaultData}>
          {defaultData.name}
        </MenuItem>)

      data.forEach(item => {
        if (item.active != 0) {
          content.push(<MenuItem value={item}>{`${item.name}`}</MenuItem>)
        }
      })
    } catch (ex) { }
    return content;
  }

  /**
   * Retorna el contenido de las ubicaciones para
   * llenar el listado
   */
  getDataForSelectUbication = (listUbication) => {
    var content = [];
    var ubicationByDefault = this.state.ubicationByDefault;
    try {
      content.push(
        <MenuItem
          value={ubicationByDefault}>
          {ubicationByDefault.nameUbication}
        </MenuItem>);
      listUbication.forEach(localUbication => {
        content.push(<MenuItem value={localUbication}>{localUbication.nameUbication}</MenuItem>);
      })
    } catch (ex) { }
    return content;
  }

  /**
   * Retorna los datos para llenar el listado de los
   * transportistas
   */
  getDataForSelectCarrier = (listCarrier) => {
    var content = [];
    var carrierByDefault = this.state.carrierByDefault;
    try {
      content.push(
        <MenuItem
          value={carrierByDefault}>
          {carrierByDefault.userCarrier.userAccount.nameUser}
        </MenuItem>);
      listCarrier.forEach(localCarrier => {
        if(localCarrier.state == 6 || localCarrier.state == 4 ||  localCarrier.state == 5 ){
          content.push(<MenuItem value={localCarrier}>{localCarrier.userCarrier.userAccount.nameUser}<span style={localCarrier.state == 4 ||  localCarrier.state == 5  ? style.operadorOcupado : style.operadorLibre}></span></MenuItem>);
        }
      })
    } catch (ex) { }
    return content;
  }

  /**
   * si es un administrador, el sistema le genera el listado
   * de los transportistas disponibles para que sea
   * asignado a la solicitud generada
   */
  renderListCarrierForAdmin = (listCarriers) => {
    /*if (parseInt(sessionStorage["userAccountProfileId"], 10) !== ADMIN) {
      return (<></>);
    }*/
    const { classes } = this.props;
    return (
      <GridItem xs={12} sm={12} className={classes.gridItem}>
        <FormControl
          fullWidth
          className={classes.selectFormControl}>
          <InputLabel
            htmlFor="simple-select"
            className={classes.selectLabel}>
            {'Operador'}
          </InputLabel>
          <Select
            value={this.props.requestState.data.carrier}
            onChange={this.handleCarrierInput}
            startAdornment={(
              <InputAdornment
                position="start"
                className={classes.inputAdornment}>
                <PersonOutline className={classes.inputAdornmentIcon} />
              </InputAdornment>
            )}>
            {this.getDataForSelectCarrier(listCarriers)}
          </Select>
        </FormControl>
      </GridItem>);
  }

  handleAssetToggle = (event) => {
    
    switch (event) {
      case 1:
        if (this.state.checked.isChecked == false){
          this.state.checked.isChecked = true
          this.state.checked.unavailableCheckbox = false
          this.state.checked.setTimeCheckbox = false
          this.state.checked.freeAssetByDefault = event
          this.setState(this.state.checked)

          console.log(this.state.checked.freeAssetByDefault);
        } else {
          this.state.checked.isChecked = false
          this.state.checked.unavailableCheckbox = true
          this.state.checked.setTimeCheckbox = true
          this.state.checked.freeAssetByDefault = 0
          this.setState(this.state.checked)
          
          console.log(this.state.checked.freeAssetByDefault);
        }
        break;

      case 2:
        if (this.state.checked.isChecked == false){
          this.state.checked.isChecked = true
          this.state.checked.availableCheckbox = false
          this.state.checked.setTimeCheckbox = false
          this.state.checked.freeAssetByDefault = event
          this.setState(this.state.checked)
          
          console.log(this.state.checked.freeAssetByDefault);
        } else {
          this.state.checked.isChecked = false
          this.state.checked.availableCheckbox = true
          this.state.checked.setTimeCheckbox = true
          this.state.checked.freeAssetByDefault = 0
          this.setState(this.state.checked)

          console.log(this.state.checked.freeAssetByDefault);
        }
        break;

      case 3:
        if (this.state.checked.isChecked == false){
          this.state.checked.isChecked = true
          this.state.checked.availableCheckbox = false
          this.state.checked.unavailableCheckbox = false
          this.state.checked.setTimeInput = true
          this.state.checked.freeAssetByDefault = event
          this.setState(this.state.checked)
          
          console.log(this.state.checked.freeAssetByDefault)
        } else {
          this.state.checked.isChecked = false
          this.state.checked.availableCheckbox = true
          this.state.checked.unavailableCheckbox = true
          this.state.checked.setTimeInput = false
          this.state.checked.freeAssetByDefault = 0
          this.setState(this.state.checked)
          
          console.log(this.state.checked.freeAssetByDefault);
        }
        break;

      default:
        this.state.checked.isChecked = false
        this.state.checked.availableCheckbox = true
        this.state.checked.unavailableCheckbox = true
        this.state.checked.setTimeCheckbox = true
        this.setState(this.state.checked)
        this.setState(this.state.assetByDefault)
        break;
    }
  }

  handleDisableCheckbox = () => {
    return true
  }

  renderListAssetAdmin = (listTypeAsset) => {
    const { classes } = this.props
    
    return (
      <GridItem xs={12} sm={12} className={classes.gridItem}>
        <FormControl
          fullWidth
          className={classes.selectFormControl}>
          <InputLabel
            htmlFor="simple-select"
            className={classes.selectLabel}>
            Tipo de Activo
          </InputLabel>
          <Select
            value={this.props.requestState.data.asset}
            onChange={this.handleAssetInput}
            startAdornment={(
              <InputAdornment
                position="start"
                className={classes.inputAdornment}>
                <Layers className={classes.inputAdornmentIcon} />
              </InputAdornment>
            )}>
            {this.getDataForSelectTypeAsset(listTypeAsset)}
          </Select>
        </FormControl>

        {this.state.checked.availableCheckbox ? (<FormControlLabel
          control={
            <Checkbox
              checkedIcon={
                <Check className={classes.checkedIcon} />
              }
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{
                checked: classes.checked
              }}
              onChange={() => this.handleAssetToggle(1)}
              disableRipple
            />
          }
          label={"Liberar inmediatamente al finalizar el servicio"}>
        </FormControlLabel>): (<></>)}

        {/*{this.state.checked.unavailableCheckbox ? (<FormControlLabel*/}
        {/*  control={*/}
        {/*    <Checkbox*/}
        {/*      checkedIcon={*/}
        {/*        <Check className={classes.checkedIcon} />*/}
        {/*      }*/}
        {/*      icon={<Check className={classes.uncheckedIcon} />}*/}
        {/*      classes={{*/}
        {/*        checked: classes.checked*/}
        {/*      }}*/}
        {/*      onChange={() => this.handleAssetToggle(2)}*/}
        {/*      disableRipple*/}
        {/*    />*/}
        {/*  }*/}
        {/*  label={"Mantener ocupado al finalizar el servicio"}>*/}
        {/*</FormControlLabel>): (<></>)}*/}

       {this.state.checked.setTimeCheckbox ? (<FormControlLabel 
          control={
            <Checkbox
              checkedIcon={
                <Check className={classes.checkedIcon} />
              }
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{
                checked: classes.checked
              }}
              onChange={() => this.handleAssetToggle(3)}
              disableRipple
            />
          }
          label={`Liberar despues un tiempo deseado al finalizar el servicio`}>
        </FormControlLabel>) : (<></>)}

        {this.state.checked.setTimeInput ? (<CustomInput
          type="number"
          labelText={
            <span>
              Tiempo
            </span>
          }
          id="firstname"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            name: "assetZoneTag",
            id: "assetZoneTag",
            onChange: this.handleInputTimeText,
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.inputAdornment}>
                <QueryBuilder className={classes.inputAdornmentIcon} />
              </InputAdornment>
            )
          }}
        />) : (<></>)}

      </GridItem>
    )
  }

  render() {
    let isActivityIndicatorShown = this.props.requestState.data.isActivityIndicatorShown;

    console.log("imprimiendo props");
    console.log(this.props);


    const { classes } = this.props;
    var listTypeService = [];
    var listUbication = []
    var listCarrierLocation = [];
    var listAsset = []
    var listTypeAsset = []

    try {
      listTypeService = this.props.typeServiceState.data.listTypeService;
    } catch (ex) { }
    if (listTypeService === undefined || listTypeService === null) {
      listTypeService = [];
    }

    try {
      listTypeAsset = this.props.assetState.data.listTypeAsset;
    } catch (ex) { }
    if (listTypeAsset === undefined || listTypeAsset === null) {
      listTypeAsset = []
    }

    try {
      listAsset = this.props.assetState.data.listAsset;
    } catch (ex) { }
    if (listAsset === undefined || listAsset === null) {
      listAsset = []
    }

    try {
      listUbication = this.props.ubicationState.data.listUbication;
    } catch (ex) { }
    if (listUbication === undefined || listUbication === null) {
      listUbication = [];
    }

    try {
      listCarrierLocation = this.props.carrierState.data.listCarrierLocation;
    } catch (ex) { }
    if (listCarrierLocation === undefined || listCarrierLocation === null) {
      listCarrierLocation = [];
    }
    return (
      <>
        <GridItem xs={12}>
          {isActivityIndicatorShown &&
            <WaitDialog text={this.state.textAlertInfo} />
          }
          <AlertInfo text={this.state.textAlertInfo} open={this.state.openAlertInfo} onDoneClick={this.hideaAlertInfo} />
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="info">
                <Sms />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Solicitud</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>

              <GridItem xs={12} sm={12}>
                  <CustomInput
                    labelText={
                      <span>
                        Solicitado Por
                      </span>
                    }
                    id="nameRequested"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "nameRequested",
                      id: "nameRequested",
                      value: this.props.requestState.data.nameRequested,
                      onChange: this.handleNameRequestedInput,
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <NotesOutlined className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} className={classes.gridItem}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}>
                      Tipo de servicio
                    </InputLabel>
                    <Select
                      value={this.props.requestState.data.typeService}
                      onChange={this.handleTypeServiceInput}
                      startAdornment={(
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <BookmarkBorder className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )}>
                      {this.getDataForSelectTypeServices(listTypeService)}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem xs={12} sm={12} className={classes.gridItem}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}>
                      Ubicación inicial
                    </InputLabel>
                    <Select
                      value={this.props.requestState.data.ubicationBegin}
                      onChange={this.handleUbicationBeginInput}
                      startAdornment={(
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <LocationSearchingIcon className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )}>
                      {this.getDataForSelectUbication(listUbication)}
                    </Select>
                  </FormControl>
                </GridItem>

                <GridItem xs={12} sm={12} className={classes.gridItem}>
                  <FormControl
                    fullWidth
                    className={classes.selectFormControl}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}>
                      Ubicación final
                    </InputLabel>
                    <Select
                      value={this.props.requestState.data.ubicationEnd}
                      onChange={this.handleUbicationEndInput}
                      startAdornment={(
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <LocationSearchingIcon className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )}>
                      {this.getDataForSelectUbication(listUbication)}
                    </Select>
                  </FormControl>
                </GridItem>

                {this.renderListCarrierForAdmin(listCarrierLocation)}
                {this.renderListAssetAdmin(listTypeAsset)}

                <GridItem xs={12} sm={12}>
                  <CustomInput
                    labelText={
                      <span>
                        Información
                      </span>
                    }
                    id="moreInformation"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "moreInformation",
                      id: "moreInformation",
                      value: this.props.requestState.data.moreInformation,
                      onChange: this.handleMoreInformationInput,
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <NotesOutlined className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} className={classes.gridItem}>
                  <Button
                    disabled={!this.props.requestState.saveActive}
                    onClick={this.onClickSave}
                    color="success"
                    round><SaveIcon />
                    Guardar
                 </Button>
                </GridItem>

              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    typeServiceState: state.typeServiceState,
    assetState: state.assetState,
    ubicationState: state.ubicationState,
    carrierState: state.carrierState,
    requestState: state.requestState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListActiveTypeService: (onSuccess) => dispatch(getListActiveTypeService(onSuccess)),
    getListActiveAsset: (onSuccess) => dispatch(getListActiveAsset(onSuccess)),
    getListAssetType: (onSuccess) => dispatch(getListAssetType(onSuccess)),
    getListActiveShowService: () => dispatch(getListActiveShowService()),
    addMessage: (message) => dispatch(addMessage(message)),
    getInShiftByFilter: (ApiPaginationFilter) => dispatch(getInShiftByFilter(
      0,
      1,
      1,
      10000,
      12,
      undefined,
      undefined,
    )),
    setTypeService: (typeService) => dispatch(setTypeService(typeService)),
    setAsset: (asset) => dispatch(setAsset(asset)),
    setUbicationBegin: (ubicationBegin) => dispatch(setUbicationBegin(ubicationBegin)),
    setUbicationEnd: (ubicationEnd) => dispatch(setUbicationEnd(ubicationEnd)),
    setCarrier: (carrier) => dispatch(setCarrier(carrier)),
    setMoreInformation: (moreInformation) => dispatch(setMoreInformation(moreInformation)),
    setNameRequested: (nameRequested) => dispatch(setNameRequested(nameRequested)),
    configureAsset: (asset, ownProps, onSuccess) => dispatch(configureAsset(asset, ownProps, onSuccess)),
    createRequest: (
      onSucess,
      idUbicationBegin,
      idUbicationEnd,
      idTypeService,
      idAsset,
      freeAsset,
      freeAssetTime,
      idCarrierUserSystemAccount,
      moreInformation,
      nameRequested) => dispatch(createRequest(
        onSucess,
        idUbicationBegin,
        idUbicationEnd,
        idTypeService,
        idAsset,
        freeAsset,
        freeAssetTime,
        idCarrierUserSystemAccount,
        moreInformation,
        nameRequested))
  };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(RequestAdmin));
