import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import NotesOutlined from "@material-ui/icons/NotesOutlined";
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
import React from "react";
import { connect } from 'react-redux';
import { configureTypeAlert, getTypeAlertById, setTypeAlert } from 'modules/configurations/type_alerts/TypeAlertsActions.js';

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

class TypeAlertAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [0],
            openAlertInfo: false,
            textAlertInfo: "",
            accountEmail: "",
        };

    }

    configureTypeAlert = () => {
        const { typeAlert } = this.props.typeAlertState.data;


        if (typeAlert.name === "") {

            this.showAlertInfo("Por favor debe ingresar el nombre de la alerta");
            return;
        }


        this.props.configureTypeAlert(typeAlert, this.props, (success) => {
            //Navegación a la lista
            this.props.history.push('/admin/config-actives');
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
        var typeAlert = this.props.typeAlertState.data.typeAlert;
        typeAlert[[event.target.name]] = event.target.value;
        this.props.setTypeAlert(typeAlert);
    };

    handleToggle() {
        var typeAlert = this.props.typeAlertState.data.typeAlert;
        if (typeAlert.active) {
            typeAlert.active = 0;
        } else {
            typeAlert.active = 1;
        }
        this.props.setTypeAlert(typeAlert);
    }

    handlePriorityInput = event => {
        var typeAlert = this.props.typeAlertState.data.typeAlert;
        typeAlert[[event.target.name]] = event.target.value;
        this.props.setTypeAlert(typeAlert);
    }

    render() {
        const { classes } = this.props;
        let isActivityIndicatorShown = this.props.typeAlertState.data.isActivityIndicatorShown;
        const { typeAlert } = this.props.typeAlertState.data;
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
                        <h4 className={classes.cardIconTitle}>Tipo de Alerta</h4>
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
                                                Nombre del tipo de alerta
                                    </span>
                                        }
                                        id="firstname"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "name",
                                            id: "name",
                                            value: typeAlert.name,
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

                                <GridItem xs={12} sm={12}>
                                    <CustomInput
                                        labelText={
                                            <span>
                                                Descripción
                                </span>
                                        }
                                        id="firstname"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "description",
                                            id: "description",
                                            value: typeAlert.description,
                                            onChange: event => this.handleInputText(event),
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

                                {typeAlert.id > 0 &&
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
                                                    checked={typeAlert.active}
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
                                    onClick={this.configureTypeAlert}
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
        typeAlertState: state.typeAlertState,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        configureTypeAlert: (typeAlert, ownProps, onSuccess) => dispatch(configureTypeAlert(typeAlert, ownProps, onSuccess)),
        setTypeAlert: (typeAlert) => dispatch(setTypeAlert(typeAlert)),
        getTypeAlertById: (id) => dispatch(getTypeAlertById(id)),
    };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(TypeAlertAdmin));