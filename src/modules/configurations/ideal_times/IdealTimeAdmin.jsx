import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import ListIcon from '@material-ui/icons/List';
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import Check from "@material-ui/icons/Check";
import SaveIcon from '@material-ui/icons/Save';
import ViewList from "@material-ui/icons/ViewList";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import NotesOutlined from "@material-ui/icons/NotesOutlined";

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
import {
    configureIdealTime,
    getListActiveIdealTime,
    getListActiveShowService,
    getListActiveShowSuccess,
    getIdealTimeById,
    setIdealTime
} from './IdealTimeActions';


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

class IdealTimeAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [0],
            openIdealTimeInfo: false,
            textIdealTimeInfo: "",
            accountEmail: "",
        };
    }

    componentDidMount() {
        this.props.getListActiveIdealTime();
        this.props.getListActiveShow()
    }

    configureIdealTime = () => {
        const { idealTime } = this.props.idealTimeState.data;

        const accountId = sessionStorage["accountId"];

        if (idealTime.name === "") {
            this.showIdealTimeInfo("Por favor debe ingresar el nombre de la Habitación o Cama");
            return;
        }

        if (idealTime.description === "") {
            this.showIdealTimeInfo("Por favor debe ingresar la descripción de la Habitación o Cama");
            return;
        }

        if (idealTime.category === "") {
            this.showIdealTimeInfo("Por favor debe ingresar la categoría tiempo ideal");
            return;
        }

        this.props.configureIdealTime({...idealTime, account: { id: Number(accountId)}}, this.props, (success) => {
            //Navegación a la lista
            this.props.history.push('/admin/ideal-times');
        });
    }

    showIdealTimeInfo = (text) => {
        this.setState({
            openIdealTimeInfo: true,
            textIdealTimeInfo: text,
        });
    }

    hideIdealTimeInfo = () => {
        this.setState({
            openIdealTimeInfo: false
        });
    }

    handleInputText = event => {
        var idealTime = this.props.idealTimeState.data.idealTime;
        idealTime[[event.target.name]] = event.target.value;
        this.props.setIdealTime(idealTime);
    };

    handleToggle() {
        var idealTime = this.props.idealTimeState.data.idealTime;
        if (idealTime.active) {
            idealTime.active = 0;
        } else {
            idealTime.active = 1;
        }
        this.props.setIdealTime(idealTime);
    }

    handlePriorityInput = event => {

        if(event.target.name === "typeIdealTime"){
            var idealTime = this.props.idealTimeState.data.idealTime;
            idealTime.typeIdealTime = {
                id: event.target.value
            }
            this.props.setIdealTime(idealTime);
        }else{
            var idealTime = this.props.idealTimeState.data.idealTime;
            idealTime[[event.target.name]] = event.target.value;
            this.props.setIdealTime(idealTime);
        }
    }


    render() {
        const { classes } = this.props;
        let isActivityIndicatorShown = this.props.idealTimeState.data.isActivityIndicatorShown;
        const { idealTime } = this.props.idealTimeState.data;
        return (
            <GridItem xs={12}>
                {isActivityIndicatorShown &&
                    <WaitDialog text={this.state.textIdealTimeInfo} />
                }
                <AlertInfo text={this.state.textIdealTimeInfo} open={this.state.openIdealTimeInfo} onDoneClick={this.hideIdealTimeInfo} />
                <Card>
                    <CardHeader color="info" icon>
                        <CardIcon color="info">
                            <ViewList />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Agregar Habitación/Camas</h4>
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
                                                Nombre
                                            </span>
                                        }
                                        id="name"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "name",
                                            id: "name",
                                            value: idealTime.name,
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
                                        id="description"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "description",
                                            id: "description",
                                            value: idealTime.description,
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

                                <GridItem xs={12} sm={12} className={classes.gridItem}>
                                    <FormControl fullWidth className={classes.selectFormControl}>
                                        
                                        <CustomInput
                                            labelText={
                                                <span>
                                                    Tiempo Ideal
                                                </span>
                                            }
                                            id="time"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                name: "time",
                                                id: "time",
                                                value: idealTime.time,
                                                onChange: event => this.handleInputText(event),
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        className={classes.inputAdornment}>
                                                        <AccessTimeIcon className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                            }}/>
                                    </FormControl>
                                </GridItem>

                                
                                <GridItem xs={12} sm={12} className={classes.gridItem}>
                                    <FormControl
                                        fullWidth
                                        className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}>
                                            Categoria - Tiempos ideales
                                        </InputLabel>
                                        <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        value={idealTime.typeIdealTime?.id}
                                        onChange={this.handlePriorityInput}
                                        inputProps={{
                                            name: "typeIdealTime",
                                            id: "typeIdealTime",
                                        }}
                                        startAdornment={(
                                            <InputAdornment
                                                position="start"
                                                className={classes.inputAdornment}>
                                                <ListIcon className={classes.inputAdornmentIcon} />
                                            </InputAdornment>
                                        )}>
                                        <MenuItem
                                            classes={{
                                            root: classes.selectMenuItem
                                            }}
                                            value="0">
                                            Seleccione la categoría...
                                        </MenuItem>
                                            {this.props.idealTimeState?.data?.listTypeIdealTime?.map((idealTime, index) => {
                                                return (
                                                    <MenuItem
                                                        classes={{
                                                            root: classes.selectMenuItem,
                                                            selected: classes.selectMenuItemSelected
                                                        }}
                                                        value={idealTime.id}
                                                        key={index}>
                                                        {idealTime.name}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </GridItem>



                                {idealTime.id > 0 &&
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
                                                    checked={idealTime.active}
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
                                    onClick={this.configureIdealTime}
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
        idealTimeState: state.idealTimeState,
        accountState: state.accountState,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        configureIdealTime: (idealTime, ownProps, onSuccess) => dispatch(configureIdealTime(idealTime, ownProps, onSuccess)),
        setIdealTime: (idealTime) => dispatch(setIdealTime(idealTime)),
        getIdealTimeById: (id) => dispatch(getIdealTimeById(id)),
        getListActiveIdealTime: () => dispatch(getListActiveIdealTime()),
        getListActiveShow: () => dispatch(getListActiveShowService()),
        getListActiveShowSuccess: () => dispatch(getListActiveShowSuccess()),
    };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(IdealTimeAdmin));