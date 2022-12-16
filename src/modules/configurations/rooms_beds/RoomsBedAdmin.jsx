import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import NotesOutlined from "@material-ui/icons/NotesOutlined";
// @material-ui/icons
import ListIcon from '@material-ui/icons/List';
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
import { configureRoomBed, getRoomBedById, setRoomBed } from 'modules/configurations/rooms_beds/RoomsBedActions.js';

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

class RoomsBedAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [0],
            openRoomInfo: false,
            textRoomInfo: "",
            accountEmail: "",
        };

    }

    configureRoomBed = () => {
        const { roomBed } = this.props.roomBedState.data;


        if (roomBed.name === "") {
            this.showRoomInfo("Por favor debe ingresar el nombre de la Habitación o Cama");
            return;
        }

        if (roomBed.description === "") {
            this.showRoomInfo("Por favor debe ingresar la descripción de la Habitación o Cama");
            return;
        }

        if (roomBed.category === "") {
            this.showRoomInfo("Por favor debe ingresar la categoría Habitación o Cama");
            return;
        }


        this.props.configureRoomBed(roomBed, this.props, (success) => {
            //Navegación a la lista
            this.props.history.push('/admin/config-actives');
        });
    }

    showRoomInfo = (text) => {
        this.setState({
            openRoomInfo: true,
            textRoomInfo: text,
        });
    }

    hideRoomInfo = () => {
        this.setState({
            openRoomInfo: false
        });
    }

    handleInputText = event => {
        var roomBed = this.props.roomBedState.data.roomBed;
        roomBed[[event.target.name]] = event.target.value;
        this.props.setRoomBed(roomBed);
    };

    handleToggle() {
        var roomBed = this.props.roomBedState.data.roomBed;
        if (roomBed.active) {
            roomBed.active = 0;
        } else {
            roomBed.active = 1;
        }
        this.props.setRoomBed(roomBed);
    }

    handlePriorityInput = event => {
        var roomBed = this.props.roomBedState.data.roomBed;
        roomBed[[event.target.name]] = event.target.value;
        this.props.setRoomBed(roomBed);
    }

    // debugger;

    render() {
        const { classes } = this.props;
        let isActivityIndicatorShown = this.props.roomBedState.data.isActivityIndicatorShown;
        const { roomBed } = this.props.roomBedState.data;
        return (
            <GridItem xs={12}>
                {isActivityIndicatorShown &&
                    <WaitDialog text={this.state.textRoomInfo} />
                }
                <AlertInfo text={this.state.textRoomInfo} open={this.state.openRoomInfo} onDoneClick={this.hideRoomInfo} />
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
                                            value: roomBed.name,
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
                                            value: roomBed.description,
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
                                    <FormControl
                                        fullWidth
                                        className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}>
                                            Categoria - Habitación/Cama
                                        </InputLabel>
                                        <Select
                                        MenuProps={{
                                            className: classes.selectMenu
                                        }}
                                        classes={{
                                            select: classes.select
                                        }}
                                        value={roomBed.category}
                                        onChange={this.handlePriorityInput}
                                        inputProps={{
                                            name: "category",
                                            id: "category",

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
                                        <MenuItem value="1">Habitación</MenuItem>
                                        <MenuItem value="2">Cama</MenuItem>
                                        </Select>
                                    </FormControl>
                                </GridItem>

                                {roomBed.id > 0 &&
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
                                                    checked={roomBed.active}
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
                                    onClick={this.configureRoomBed}
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
        roomBedState: state.roomBedState,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        configureRoomBed: (roomBed, ownProps, onSuccess) => dispatch(configureRoomBed(roomBed, ownProps, onSuccess)),
        setRoomBed: (roomBed) => dispatch(setRoomBed(roomBed)),
        getRoomBedById: (id) => dispatch(getRoomBedById(id)),
    };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(RoomsBedAdmin));