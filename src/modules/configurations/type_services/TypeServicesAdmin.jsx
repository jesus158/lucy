import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import Check from "@material-ui/icons/Check";
import Report from "@material-ui/icons/Report";
import SaveIcon from '@material-ui/icons/Save';
import ViewList from "@material-ui/icons/ViewList";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import AlertInfo from "components/AlertInfo/AlertInfo.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
// core components
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { configureTypeService, getTypeServiceById, setTypeService } from 'modules/configurations/type_services/TypeServicesActions.js';
import React from "react";
import { connect } from 'react-redux';

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

class TypeServiceAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: [0],
      openAlertInfo: false,
      textAlertInfo: "",
      accountEmail: "",
    };

  }

  componentDidMount = () => {
    var urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has('code')) {
      this.props.getTypeServiceById(urlParams.get('code'));
    }
  }


  configureTypeService = () => {
    const { typeService } = this.props.typeServiceState.data;

    if (typeService.serviceName === "") {

      this.showAlertInfo("Por favor debe ingresar el nombre del servicio");
      return;
    }


    this.props.configureTypeService(typeService, this.props, (success) => {
      //Navegación a la lista
      this.props.history.push('/admin/config-typeservices');
    });
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

  handleInputText = event => {
    var typeService = this.props.typeServiceState.data.typeService;
    typeService[[event.target.name]] = event.target.value;
    this.props.setTypeService(typeService);
  };

  handleToggle() {
    var typeService = this.props.typeServiceState.data.typeService;
    if (typeService.active) {
      typeService.active = 0;
    } else {
      typeService.active = 1;
    }
    this.props.setTypeService(typeService);
  }

  handlePriorityInput = event => {
    var typeService = this.props.typeServiceState.data.typeService;
    typeService[[event.target.name]] = event.target.value;
    this.props.setTypeService(typeService);
  }

  render() {
    const { classes } = this.props;
    let isActivityIndicatorShown = this.props.typeServiceState.data.isActivityIndicatorShown;
    const { typeService } = this.props.typeServiceState.data;
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
              <ViewList />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Servicio</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12}>
                <GridItem xs={12} sm={12}>
                  <h4 className={classes.infoText}>

                  </h4>
                </GridItem>

                <GridItem xs={12} sm={12}>
                  <CustomInput
                    labelText={
                      <span>
                        Nombre del servicio
                        </span>
                    }
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "serviceName",
                      id: "serviceName",
                      value: typeService.serviceName,
                      onChange: event => this.handleInputText(event),
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <BookmarkBorder className={classes.inputAdornmentIcon} />
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
                      Prioridad
                        </InputLabel>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      value={typeService.priority}
                      onChange={this.handlePriorityInput}
                      inputProps={{
                        name: "priority",
                        id: "priority",

                      }}
                      startAdornment={(
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <Report className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )}>
                      <MenuItem

                        classes={{
                          root: classes.selectMenuItem
                        }}
                        value="0">
                        Seleccione la prioridad...
                        </MenuItem>
                      <MenuItem value="1">Alta</MenuItem>
                      <MenuItem value="2">Media</MenuItem>
                      <MenuItem value="3">Baja</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>



                {typeService.id > 0 &&
                  <GridItem xs={12} sm={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked
                          }}
                          checked={typeService.active}
                          onClick={() => this.handleToggle()}
                          disableRipple
                        />
                      }
                      label={"Activo"}>
                    </FormControlLabel>
                  </GridItem>
                }

              </GridItem>


              <GridItem xs={12} sm={12} className={classes.gridItem}>

                <Button
                  onClick={this.configureTypeService}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    configureTypeService: (typeService, ownProps, onSuccess) => dispatch(configureTypeService(typeService, ownProps, onSuccess)),
    setTypeService: (typeService) => dispatch(setTypeService(typeService)),
    getTypeServiceById: (id) => dispatch(getTypeServiceById(id)),
  };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(TypeServiceAdmin));