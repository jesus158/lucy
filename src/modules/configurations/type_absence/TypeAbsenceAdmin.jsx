import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import Check from "@material-ui/icons/Check";
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
import { configureTypeAbsence, getTypeAbsenceById, setTypeAbsence } from 'modules/configurations/type_absence/TypeAbsenceActions.js';
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

class TypeAbsenceAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: [0],
      openAlertInfo: false,
      textAlertInfo: "",
    };

  }

  componentDidMount = () => {
    var urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.has('code')) {
      this.props.getTypeAbsenceById(urlParams.get('code'));
    }
  }


  configureTypeAbsence = () => {
    const { typeAbsence } = this.props.typeAbsenceState.data;

    if (typeAbsence.serviceName === "") {

      this.showAlertInfo("Por favor debe ingresar el nombre del rechazo");
      return;
    }


    this.props.configureTypeAbsence(typeAbsence, this.props, (success) => {
      //Navegación a la lista
      this.props.history.push('/admin/config-type-absence');
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
    var typeAbsence = this.props.typeAbsenceState.data.typeAbsence;
    typeAbsence[[event.target.name]] = event.target.value;
    this.props.setTypeAbsence(typeAbsence);
  };

  handleToggle() {
    var typeAbsence = this.props.typeAbsenceState.data.typeAbsence;
    if (typeAbsence.active) {
      typeAbsence.active = 0;
    } else {
      typeAbsence.active = 1;
    }
    this.props.setTypeAbsence(typeAbsence);
  }

  handlePriorityInput = event => {
    var typeAbsence = this.props.typeAbsenceState.data.typeAbsence;
    typeAbsence[[event.target.name]] = event.target.value;
    this.props.setTypeAbsence(typeAbsence);
  }

  render() {
    const { classes } = this.props;
    let isActivityIndicatorShown = this.props.typeAbsenceState.data.isActivityIndicatorShown;
    const { typeAbsence } = this.props.typeAbsenceState.data;
    return (
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
            <h4 className={classes.cardIconTitle}>Ausencia</h4>
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
                        Nombre de la ausencia
                        </span>
                    }
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "absenceName",
                      id: "absenceName",
                      value: typeAbsence.absenceName,
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



                {typeAbsence.id > 0 &&
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
                          checked={typeAbsence.active}
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
                  onClick={this.configureTypeAbsence}
                  color="success"
                  round><SaveIcon />
                    Guardar
                </Button>


              </GridItem>


            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    );
  }

}

const mapStateToProps = state => {
  return {
    typeAbsenceState: state.typeAbsenceState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    configureTypeAbsence: (typeAbsence, ownProps, onSuccess) => dispatch(configureTypeAbsence(typeAbsence, ownProps, onSuccess)),
    setTypeAbsence: (typeAbsence) => dispatch(setTypeAbsence(typeAbsence)),
    getTypeAbsenceById: (id) => dispatch(getTypeAbsenceById(id)),
  };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(TypeAbsenceAdmin));