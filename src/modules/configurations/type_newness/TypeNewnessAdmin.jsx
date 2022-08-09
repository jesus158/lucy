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
import { configureTypeNewness, getTypeNewnessById, setTypeNewness} from 'modules/configurations/type_newness/TypeNewnessActions';
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

class TypeNewnessAdmin extends React.Component {

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
      this.props.getTypeNewnessById(urlParams.get('code'));
    }
  }


  configureTypeNewness = () => {
    const { typeNewness } = this.props.typeNewnessState.data;

    if (typeNewness.serviceName === "") {

      this.showAlertInfo("Por favor debe ingresar el nombre de la novedad");
      return;
    }


    this.props.configureTypeNewness(typeNewness, this.props, (success) => {
      //Navegación a la lista
      this.props.history.push('/admin/config-type-newness');
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
    var typeNewness = this.props.typeNewnessState.data.typeNewness;
    typeNewness[[event.target.name]] = event.target.value;
    this.props.setTypeNewness(typeNewness);
  };

  handleToggle() {
    var typeNewness = this.props.typeNewnessState.data.typeNewness;
    if (typeNewness.active) {
      typeNewness.active = 0;
    } else {
      typeNewness.active = 1;
    }
    this.props.setTypeNewness(typeNewness);
  }

  handlePriorityInput = event => {
    var typeNewness = this.props.typeNewnessState.data.typeNewness;
    typeNewness[[event.target.name]] = event.target.value;
    this.props.setTypeNewness(typeNewness);
  }

  render() {
    const { classes } = this.props;
    let isActivityIndicatorShown = this.props.typeNewnessState.data.isActivityIndicatorShown;
    const { typeNewness } = this.props.typeNewnessState.data;
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
            <h4 className={classes.cardIconTitle}>Novedad</h4>
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
                        Nombre de la novedad
                        </span>
                    }
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "newnessName",
                      id: "newnessName",
                      value: typeNewness.newnessName,
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

                {typeNewness.id > 0 &&
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
                          checked={typeNewness.active}
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
                  onClick={this.configureTypeNewness}
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
    typeNewnessState: state.typeNewnessState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    configureTypeNewness: (typeNewness, ownProps, onSuccess) => dispatch(configureTypeNewness(typeNewness, ownProps, onSuccess)),
    setTypeNewness: (typeNewness) => dispatch(setTypeNewness(typeNewness)),
    getTypeNewnessById: (id) => dispatch(getTypeNewnessById(id)),
  };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(TypeNewnessAdmin));