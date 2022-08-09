import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import Check from "@material-ui/icons/Check";
import SaveIcon from '@material-ui/icons/Save';
import SettingsRemote from '@material-ui/icons/SettingsRemote';
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
import { addMessage } from 'layouts/MessagesActions';
import { configureHotspot, getHotspotById, setHotspot } from 'modules/buttons/hotspot/HotspotActions.js';
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
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

class HotspotAdmin extends React.Component {

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
      this.props.getHotspotById(urlParams.get('code'));
    }
  }


  configureHotspot = () => {
    const { hotspot } = this.props.hotspotState.data;
    if (hotspot.hotspot === "") {
      this.props.addMessage({ variant: "error", message: "Ingrese los datos solicitados" });
      //this.showAlertInfo("Por favor debe ingresar el nombre del servicio");
      return;
    }
    if (hotspot.account === undefined) {
      hotspot["account"] = { id: 0 }
    }
    if (hotspot.account === null) {
      hotspot["account"] = { id: 0 }
    }
    hotspot.account.id = sessionStorage["accountId"];

    this.props.configureHotspot(hotspot, this.props, (success) => {
      if (success === "OK") {
        //Navegación a la lista
        this.props.history.push('/admin/hotspots');
      }
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
    var hotspot = this.props.hotspotState.data.hotspot;
    hotspot[[event.target.name]] = event.target.value;
    this.props.setHotspot(hotspot);
  };

  handleToggle() {
    var hotspot = this.props.hotspotState.data.hotspot;
    if (hotspot.active) {
      hotspot.active = 0;
    } else {
      hotspot.active = 1;
    }
    this.props.setHotspot(hotspot);
  }

  handlePriorityInput = event => {
    var hotspot = this.props.hotspotState.data.hotspot;
    hotspot[[event.target.name]] = event.target.value;
    this.props.setHotspot(hotspot);
  }

  render() {
    const { classes } = this.props;
    let isActivityIndicatorShown = this.props.hotspotState.data.isActivityIndicatorShown;
    const { hotspot } = this.props.hotspotState.data;
    if (hotspot === undefined) {
      return (<></>)
    }
    return (
      <GridItem xs={12}>
        {isActivityIndicatorShown &&
          <WaitDialog text={this.state.textAlertInfo} />
        }
        <AlertInfo text={this.state.textAlertInfo} open={this.state.openAlertInfo} onDoneClick={this.hideaAlertInfo} />
        <Card>
          <CardHeader color="info" icon>
            <CardIcon color="info">
              <SettingsRemote />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Receptor</h4>
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
                        Código del receptor
                        </span>
                    }
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "hotspot",
                      id: "hotspot",
                      value: hotspot.hotspot,
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

                {hotspot.id > 0 &&
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
                          checked={hotspot.active}
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
                  onClick={this.configureHotspot}
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
    hotspotState: state.hotspotState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    configureHotspot: (hotspot, ownProps, onSuccess) => dispatch(configureHotspot(hotspot, ownProps, onSuccess)),
    setHotspot: (hotspot) => dispatch(setHotspot(hotspot)),
    getHotspotById: (idHotspotCallButton) => dispatch(getHotspotById(idHotspotCallButton)),
    addMessage: (message) => dispatch(addMessage(message)),
  };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(HotspotAdmin));