import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import Search from "@material-ui/icons/Search";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import MultiSelect from "components/MultiSelect/MultiSelect.jsx";
import { findTypeService } from 'modules/configurations/type_services/TypeServicesActions.js';
import { getUbicationByFilter } from "modules/locations/ubications/UbicationActions.js";
import PropTypes from "prop-types";
import React from "react";
import Datetime from "react-datetime";
import { connect } from "react-redux";
import { getCarrierList } from '../carriers/carrierActions';
import{NAME_OPERATOR} from 'modules/utils/ApiUtil.js';




const style = {
  gridContainer: {
    padding: "0px 30px 30px 40px"
  }

  , gridItem: {
    margin: "20px 0px 10px 0px"
  }

  , headerGridItem: {
    margin: "30px 0px 0px 0px"
  }
  , ...regularFormsStyle
};

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        startDate: 0
        , endDate: 0
        , name: ""
        , carriers: []
        , listIdCarrier: ""
        , idTypeService: 0
        , stateRequest: -1
        , idCarrier: 0
        , locationBegin: 0
        , locationEnd: 0
        , groupBy: ""
        , initialDateValue: 0
        , endDateValue: 0
      },
    };

  }

  componentDidMount = () => {
    if (this.props.showCarrier || this.props.carrier) {
      this.props.getCarrierList((success) => { });
    }

    if (this.props.showTypeService) {
      this.props.findTypeService();
    }
    if (this.props.showUbicationEnd || this.props.showUbicationStart) {
      this.props.getUbicationByFilter();
    }
  };

  handleStartDate = time => {
    var x = this.state.filter;
    x[["startDate"]] = time;
    this.setState({
      filter: x,
    })
  };

  handleEndDate = time => {
    var x = this.state.filter;
    x[["endDate"]] = time;
    this.setState({
      filter: x,
    })
  };

  handleInput = event => {
    var filter = this.state.filter;
    filter[[event.target.name]] = event.target.value;
    this.setState({
      filter: filter,
    })
  };

  componentWillReceiveProps = (nextProps) => {
    var filter = null;
    if (nextProps.initialDateValue !== this.state.initialDateValue) {
      this.setState({ initialDateValue: nextProps.initialDateValue });
      filter = this.state.filter;
      filter.startDate = nextProps.initialDateValue;
      this.setState({ filter });
    }

    if (nextProps.endDateValue !== this.state.endDateValue) {
      this.setState({ endDateValue: nextProps.endDateValue });
      filter = this.state.filter;
      filter.endDate = nextProps.endDateValue;
      this.setState({ filter });
    }
  }

  handleCarrierInput = items => {
    var carriers = [];
    if (items !== undefined && items !== null) {
      items.forEach(item => {
        carriers.push(item.value);
      });
    }
    var filter = this.state.filter;
    filter.carriers = carriers;
    filter.listIdCarrier = carriers.join(",");
    this.setState({ filter });
  };

  handleTypeServiceInput = event => {
    var idTypeService = event.target.value;
    var local = this.state.filter;
    local['idTypeService'] = idTypeService
    this.setState({ filter: local });
  };

  handleStateRequestInput = event => {
    var stateRequest = event.target.value;
    var local = this.state.filter;
    local['stateRequest'] = stateRequest
    this.setState({ filter: local });
  };

  handleCarrierSelectInput = event => {
    var idCarrier = event.target.value;
    var local = this.state.filter;
    local['idCarrier'] = idCarrier
    this.setState({ filter: local });
  };

  handleUbicationStartInput = event => {
    var locationBegin = event.target.value;
    var local = this.state.filter;
    local['locationBegin'] = locationBegin
    this.setState({ filter: local });
  };

  handleUbicationEndInput = event => {
    var locationEnd = event.target.value;
    var local = this.state.filter;
    local['locationEnd'] = locationEnd
    this.setState({ filter: local });
  };

  handleGroupByInput = event => {
    var groupBy = event.target.value;
    var local = this.state.filter;
    local['groupBy'] = groupBy
    this.setState({ filter: local });
  };

  render() {
    const { classes } = this.props;
    const { initialDate, endDate, name, carrier, borderBottom,
      showTypeService, showStateRequest,
      showCarrier, showUbicationStart,
      showUbicationEnd, grouper ,initialDateValue,endDateValue} = this.props;
    var { listCarrier } = this.props.carrierState.data;
    if(initialDateValue!==0 || endDateValue!==0){
      this.componentWillReceiveProps(this.props);
    }
    
    if (listCarrier === undefined) {
      listCarrier = [];
    }

    const suggestions = listCarrier.map(carrier => ({
      value: carrier.userCarrier.userAccount.id,
      label: carrier.userCarrier.userAccount.nameUser,
    }));

    var { listTypeService } = this.props.typeServiceState.data.listResultSetTypeService;
    if (listTypeService === undefined) {
      listTypeService = [];
    }

    var typeServiceContent = listTypeService.map((typeService, index) => (
      <MenuItem value={typeService.id}>{typeService.serviceName}</MenuItem>
    ));
    typeServiceContent.unshift(<MenuItem value={0}>{'Todos los servicios'}</MenuItem>);

    var stateRequestContent = [
      <MenuItem value={-1}>{'Todos los estados'}</MenuItem>,
      <MenuItem value={0}>{'REGISTRADA'}</MenuItem>,
      <MenuItem value={1}>{'ESPERANDO '+NAME_OPERATOR.toUpperCase()}</MenuItem>,
      <MenuItem value={2}>{'ESPERANDO RESPUESTA'}</MenuItem>,
      <MenuItem value={3}>{'ESPERANDO INICIAR'}</MenuItem>,
      <MenuItem value={4}>{'INICIADA'}</MenuItem>,
      <MenuItem value={5}>{'TERMINADA'}</MenuItem>,
      <MenuItem value={6}>{'CANCELADA'}</MenuItem>
    ]

    var grouperMenuList = [
      <MenuItem value={""}>{'Todos los grupos'}</MenuItem>,
      <MenuItem value={"SOLICITANTE"}>{'SOLICITANTE'}</MenuItem>,
      <MenuItem value={"CENTRO DE COSTO"}>{'CENTRO DE COSTO'}</MenuItem>,
      <MenuItem value={"TIPO SERVICIO"}>{'TIPO SERVICIO'}</MenuItem>,
      <MenuItem value={"UBICACION"}>{'UBICACION'}</MenuItem>
    ]

    var carrierContent = listCarrier.map((carrier, index) => (
      <MenuItem value={carrier.userCarrier.id}>{carrier.userCarrier.userAccount.nameUser}</MenuItem>
    ));
    carrierContent.unshift(<MenuItem value={0}>{'Todos los '+NAME_OPERATOR}</MenuItem>);

    var { listUbication } = this.props.ubicationState.data;
    var ubicationContent = listUbication.map((ubication, index) => (
      <MenuItem value={ubication.id}>{ubication.nameUbication}</MenuItem>
    ));
    ubicationContent.unshift(<MenuItem value={0}>{'Todas las ubicaciones'}</MenuItem>);

    return (
      <GridContainer>

        {initialDate ?
          <GridItem xs={6} sm={6} md={6}>
            <legend style={{ fontSize: 14, fontWeight: "bold", color: "#a9a9a9" }}>Fecha inicio</legend>
            <FormControl fullWidth>
              <Datetime
                value={this.state.filter.startDate}
                onChange={this.handleStartDate}
                inputProps={{
                  placeholder: "Ingrese la fecha inicial...",
                  name: "startDate",
                  id: "filter-startDate"
                }}
              />
            </FormControl>

          </GridItem>
          : null
        }

        {endDate ?
          <GridItem xs={6} sm={6} md={6}>
            <legend style={{ fontSize: 14, fontWeight: "bold", color: "#a9a9a9" }}>Fecha fin</legend>
            <FormControl fullWidth>
              <Datetime
                value={this.state.filter.endDate}
                onChange={this.handleEndDate}
                inputProps={{
                  placeholder: "Ingrese la fecha final...",
                  name: "endDate",
                  id: "filter-endDate"
                }}
              />
            </FormControl>
          </GridItem>
          : null
        }

        {name ?
          <GridItem xs={6} sm={6} md={6} className={classes.gridItem} >
            <legend style={{ fontSize: 14, fontWeight: "bold", color: "#a9a9a9" }}>{this.props.nameText}</legend>
            <FormControl fullWidth style={{ marginTop: 0 }}>
              <TextField
                id="standard-search"
                type="search"
                placeholder={this.props.placeholder}
                className={classes.textField}
                name="name"
                onChange={this.handleInput}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    this.props.onFilter(this.state.filter)
                    ev.preventDefault();
                  }
                }}
              />

            </FormControl>
          </GridItem>
          : null
        }

        {carrier ?
          <GridItem xs={6} sm={6} md={6}>
            <legend style={{ fontSize: 14, fontWeight: "bold", color: "#a9a9a9" }}>{'EL '+NAME_OPERATOR}</legend>
            <MultiSelect suggestions={suggestions} onSelectDone={this.handleCarrierInput} label="   " placeholder={"Seleccione el "+NAME_OPERATOR+"..."} />

          </GridItem>
          : null
        }

        {showTypeService ?
          <GridItem xs={6} sm={6} md={6}>
            <legend style={{ fontSize: 14, fontWeight: "bold", color: "#a9a9a9" }}>Tipo de servicio</legend>
            <FormControl fullWidth style={{ marginTop: 5 }}>
              <Select
                style={{ fontSize: 13 }}
                value={this.state.filter.idTypeService}
                onChange={this.handleTypeServiceInput}
              >
                {typeServiceContent}
              </Select>
            </FormControl>
          </GridItem>
          : null
        }

        {showStateRequest ?
          <GridItem xs={6} sm={6} md={6}>
            <legend style={{ fontSize: 14, fontWeight: "bold", color: "#a9a9a9" }}>Estado solicitud</legend>
            <FormControl fullWidth style={{ marginTop: 5 }}>
              <Select
                style={{ fontSize: 13 }}
                value={this.state.filter.stateRequest}
                onChange={this.handleStateRequestInput}
              >
                {stateRequestContent}
              </Select>
            </FormControl>
          </GridItem>
          : null
        }

        {showCarrier ?
          <GridItem xs={6} sm={6} md={6}>
            <legend style={{ fontSize: 14, fontWeight: "bold", color: "#a9a9a9" }}>{'El '+NAME_OPERATOR}</legend>
            <FormControl fullWidth style={{ marginTop: 5 }}>
              <Select
                style={{ fontSize: 13 }}
                value={this.state.filter.idCarrier}
                onChange={this.handleCarrierSelectInput}
              >
                {carrierContent}
              </Select>
            </FormControl>
          </GridItem>
          : null
        }

        {showUbicationStart ?
          <GridItem xs={6} sm={6} md={6}>
            <legend style={{ fontSize: 14, fontWeight: "bold", color: "#a9a9a9" }}>Ubicación inicial</legend>
            <FormControl fullWidth style={{ marginTop: 5 }}>
              <Select
                style={{ fontSize: 13 }}
                value={this.state.filter.locationBegin}
                onChange={this.handleUbicationStartInput}
              >
                {ubicationContent}
              </Select>
            </FormControl>
          </GridItem>
          : null
        }

        {showUbicationEnd ?
          <GridItem xs={6} sm={6} md={6}>
            <legend style={{ fontSize: 14, fontWeight: "bold", color: "#a9a9a9" }}>Ubicación final</legend>
            <FormControl fullWidth style={{ marginTop: 5 }}>
              <Select
                style={{ fontSize: 13 }}
                value={this.state.filter.locationEnd}
                onChange={this.handleUbicationEndInput}
              >
                {ubicationContent}
              </Select>
            </FormControl>
          </GridItem>
          : null
        }

        {grouper ?
          <GridItem xs={6} sm={6} md={6}>
            <legend style={{ fontSize: 14, fontWeight: "bold", color: "#a9a9a9" }}>Agrupador</legend>
            <FormControl fullWidth style={{ marginTop: 5 }}>
              <Select
                style={{ fontSize: 13 }}
                value={this.state.filter.groupBy}
                onChange={this.handleGroupByInput}>
                {grouperMenuList}
              </Select>
            </FormControl>
          </GridItem>
          : null
        }

        <GridItem xs={6} sm={6} md={6}>
          <Button onClick={() => this.props.onFilter(this.state.filter)} >
            <Search /> Buscar
                    </Button>
        </GridItem>

        {borderBottom ?
          <GridItem xs={12} sm={12} md={12} >
            <div style={{ borderBottom: "1px solid#eee", marginTop: 26 }} />
          </GridItem>
          : null}
      </GridContainer>

    );
  }
}

Filter.defaultProps = {
  name: false,
  initialDate: false,
  endDate: false,
  carrier: false,
  initialDateValue: 0,
  endDateValue: 0,
  idTypeService: 0,
  stateRequest: -1,
  idCarrier: 0,
  locationBegin: 0,
  locationEnd: 0,
  grouper: false
};

Filter.propTypes = {
  name: PropTypes.bool,
  initialDate: PropTypes.bool,
  endDate: PropTypes.bool,
  carrier: PropTypes.bool,
  grouper: PropTypes.bool,
  onFilter: PropTypes.func.isRequired,
  borderBottom: PropTypes.bool,
  initialDateValue: PropTypes.number,
  endDateValue: PropTypes.number,
  idTypeService: PropTypes.number,
  stateRequest: PropTypes.number,
  idCarrier: PropTypes.number,
  locationBegin: PropTypes.number,
  locationEnd: PropTypes.number,
};

const mapStateToProps = state => {
  return {
    carrierState: state.carrierState,
    typeServiceState: state.typeServiceState,
    ubicationState: state.ubicationState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCarrierList: (onSuccess) => dispatch(getCarrierList(onSuccess)),
    findTypeService: () => dispatch(findTypeService(
      0
      , 1
      , 0
      , 10000
      , 2
      , undefined
      , undefined)),
    getUbicationByFilter: (
    ) =>
      dispatch(
        getUbicationByFilter(
          (() => { }),
          0,
          1,
          0,
          10000,
          16,
          undefined,
          undefined
        )
      ),
  };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Filter));