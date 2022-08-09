import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import LocalOfferOutlined from "@material-ui/icons/LocalOfferOutlined";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import WifiTethering from "@material-ui/icons/WifiTethering";
import Money from '@material-ui/icons/Money';
// @material-ui/icons
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import Check from "@material-ui/icons/Check";
import SaveIcon from '@material-ui/icons/Save';
import Layers from "@material-ui/icons/Layers";
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
import { configureAsset, getAssetById, setAsset, getListAssetType } from 'modules/assets/AssetActions.js';

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

class AssetAdmin extends React.Component {
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
        this.props.getListAssetType((success) => {

        });
    }

    configureAsset = () => {
        const { asset } = this.props.assetState.data;
       // console.log(asset)
        asset.account.id = sessionStorage["accountId"];
        if (asset.nameAsset === "") {
            this.showAlertInfo("Por favor debe ingresar el nombre del activo");
            return;
        }
    
        this.props.configureAsset(asset, this.props, (success) => {
            //Navegación a la lista

            this.props.history.push('/admin/assets');
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
        var asset = this.props.assetState.data.asset;
        asset[[event.target.name]] = event.target.value;
        this.props.setAsset(asset);
    };

    handleToggle() {
        var asset = this.props.assetState.data.asset;
        if (asset.active) {
            asset.active = 0;
        } else {
            asset.active = 1;
        }
        this.props.setAsset(asset);
    }

    handleStateToggle() {
        var asset = this.props.assetState.data.asset;
        if (asset.state) {
            asset.state = 0;
        } else {
            asset.state = 1
        }
        this.props.setAsset(asset)
    }

    handleAssetTypeInput = event => {
        var asset = this.props.assetState.data.asset;
        var typeAsset = asset.typeAsset;
        typeAsset[[event.target.name]] = event.target.value;
        asset.typeAsset = typeAsset;
        this.props.setAsset(asset);
    }

    getDataForSelectTypeAsset = (listTypeAsset) => {
        var content = [];
        const { classes } = this.props;
        try {
            content.push(
                (<MenuItem
                    classes={{
                        root: classes.selectMenuItem
                    }}
                    value="0">
                    Seleccione un tipo de activo...
                </MenuItem>));
            listTypeAsset.forEach(typeAsset => {
                content.push(<MenuItem value={typeAsset.id}>{typeAsset.name}</MenuItem>);
            })
        } catch (ex) {
            console.log(ex);
        }
        return content;
    }


    render() {
        const { classes } = this.props;
        let isActivityIndicatorShown = this.props.assetState.data.isActivityIndicatorShown;
        const { asset, listTypeAsset } = this.props.assetState.data;

        if (listTypeAsset === undefined) {
            listTypeAsset = [];
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
                            <Layers />
                        </CardIcon>
                        <h4 className={classes.cardIconTitle}>Activo</h4>
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
                                                Codigo activo
                                    </span>
                                        }
                                        id="firstname"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "assetCode",
                                            id: "assetCode",
                                            value: asset.assetCode,
                                            onChange: event => this.handleInputText(event),
                                            startAdornment: (
                                                <InputAdornment
                                                    position="start"
                                                    className={classes.inputAdornment}>
                                                    <Money className={classes.inputAdornmentIcon} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12}>
                                    <CustomInput
                                        labelText={
                                            <span>
                                                Nombre del activo
                                    </span>
                                        }
                                        id="firstname"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "nameAsset",
                                            id: "nameAsset",
                                            value: asset.nameAsset,
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
                                    <FormControl
                                        fullWidth
                                        className={classes.selectFormControl}>
                                        <InputLabel
                                            htmlFor="simple-select"
                                            className={classes.selectLabel}>
                                            Tipo de activo
                                        </InputLabel>
                                        <Select
                                            MenuProps={{
                                                className: classes.selectMenu
                                            }}
                                            classes={{
                                                select: classes.select
                                            }}
                                            value={asset.typeAsset.id}
                                            onChange={(event) => { this.handleAssetTypeInput(event) }}
                                            inputProps={{
                                                name: "id",
                                                id: "typeAsset_id",
                                            }}
                                            startAdornment={(
                                                <InputAdornment
                                                    position="start"
                                                    className={classes.inputAdornment}>
                                                    <LocalOfferOutlined className={classes.inputAdornmentIcon} />
                                                </InputAdornment>
                                            )}>
                                            {this.getDataForSelectTypeAsset(listTypeAsset)}
                                        </Select>
                                    </FormControl>
                                </GridItem>

                                <GridItem xs={12} sm={12}>
                                    <CustomInput
                                        labelText={
                                            <span>
                                                Tag de localización
                                    </span>
                                        }
                                        id="firstname"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            name: "assetZoneTag",
                                            id: "assetZoneTag",
                                            value: asset.assetZoneTag,
                                            onChange: event => this.handleInputText(event),
                                            startAdornment: (
                                                <InputAdornment
                                                    position="start"
                                                    className={classes.inputAdornment}>
                                                    <WifiTethering className={classes.inputAdornmentIcon} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </GridItem>

                                {asset.id > 0 &&
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
                                                    checked={asset.active}
                                                    onClick={() => this.handleToggle()}
                                                    disableRipple
                                                />
                                            }
                                            label={"Activo"}>
                                        </FormControlLabel>
                                    </GridItem>
                                }

                                {asset.id > 0 &&
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
                                                    checked={asset.state}
                                                    onClick={() => this.handleStateToggle()}
                                                    disableRipple
                                                />
                                            }
                                            label={"Disponible"}>
                                        </FormControlLabel>
                                    </GridItem>
                                }
                            </GridItem>

                            <GridItem xs={12} sm={12} className={classes.gridItem}>
                                <Button
                                    onClick={this.configureAsset}
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
        assetState: state.assetState,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        configureAsset: (asset, ownProps, onSuccess) => dispatch(configureAsset(asset, ownProps, onSuccess)),
        setAsset: (asset) => dispatch(setAsset(asset)),
        getAssetById: (id) => dispatch(getAssetById(id)),
        getListAssetType: (onSuccess) => dispatch(getListAssetType(onSuccess))
    };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(AssetAdmin));
