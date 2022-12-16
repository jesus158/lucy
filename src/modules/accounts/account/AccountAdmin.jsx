import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Check from "@material-ui/icons/Check";
import FolderOpen from '@material-ui/icons/FolderOpen';
import FolderSharedOutlined from '@material-ui/icons/FolderSharedOutlined';
import NotesOutlined from "@material-ui/icons/NotesOutlined";
import SaveIcon from '@material-ui/icons/Save';
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
import { configureAccount, fetchAllAccount, getAccountById, setAccount } from 'modules/accounts/account/AccountActions.js';
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

class AccountAdmin extends React.Component {

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
      this.props.getAccountById(urlParams.get('code'));
    }
  }


  configureAccount = () => {

    const { account } = this.props.accountState.data;
    /*
    if (this.state.accountEmail === "" && account.id === 0) {

      this.showAlertInfo("Por favor debe ingresar correo electrónico");
      return;
    }
    */

    /*if (account.nameAccount === "") {

      this.showAlertInfo("Por favor debe ingresar el nombre de la cuenta");
      return;
    }*/


    this.props.configureAccount(account, this.props, (success) => {
      if (success === "OK") {
        //Navegación a la lista
        this.props.fetchAllAccount();
        this.props.history.push('/admin/accounts');
      }
      this.props.fetchAllAccount();
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

  handleEmailInputText = event => {
    var state = this.state;
    state[[event.target.name]] = event.target.value;
    this.setState(state);
  };

  handleInputText = event => {
    var account = this.props.accountState.data.account;
    account[[event.target.name]] = event.target.value;
    this.props.setAccount(account);
  };

  handleToggle() {
    var account = this.props.accountState.data.account;
    if (account.active) {
      account.active = 0;
    } else {
      account.active = 1;
    }
    this.props.setAccount(account);
  }

  render() {
    const { classes } = this.props;
    let isActivityIndicatorShown = this.props.accountState.data.isActivityIndicatorShown;
    const { account } = this.props.accountState.data;
    return (
      <GridItem xs={12}>
        {isActivityIndicatorShown &&
          <WaitDialog text={this.state.textAlertInfo} />
        }
        <AlertInfo text={this.state.textAlertInfo} open={this.state.openAlertInfo} onDoneClick={this.hideaAlertInfo} />
        <Card>
          <CardHeader color="info" icon>
            <CardIcon color="info">
              <FolderSharedOutlined />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Cuenta</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12}>
                <GridItem xs={12} sm={12}>
                  <h4 className={classes.infoText}>

                  </h4>
                </GridItem>

                { /* account.id == 0 && 
                    <GridItem xs={12} sm={12}>
                      <CustomInput
                        labelText={
                          <span>
                            Correo electrónico del responsable
                          </span>
                        }
                        id="firstname"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          name: "accountEmail",
                          id: "accountEmail", 
                          value: this.state.accountEmail,
                          onChange: event => this.handleEmailInputText(event),
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.inputAdornment}>
                              <MailOutline className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>
                      */}

                <GridItem xs={12} sm={12}>
                  <CustomInput
                    labelText={
                      <span>
                        Nombre de la cuenta
                        </span>
                    }
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "nameAccount",
                      id: "nameAccount",
                      value: account.nameAccount,
                      onChange: event => this.handleInputText(event),
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          className={classes.inputAdornment}>
                          <FolderOpen className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12}>
                  <CustomInput
                    labelText={
                      <span>
                        Información adicional
                        </span>
                    }
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      name: "moreInformation",
                      id: "moreInformation",
                      value: account.moreInformation,
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

                {account.id > 0 &&
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
                          checked={account.active}
                          onClick={() => this.handleToggle()}
                          disableRipple
                        />
                      }
                      label="Activo">
                    </FormControlLabel>
                  </GridItem>
                }

              </GridItem>


              <GridItem xs={12} sm={12} className={classes.gridItem}>

                <Button
                  onClick={this.configureAccount}
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
    accountState: state.accountState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    configureAccount: (account, ownProps, onSuccess) => dispatch(configureAccount(account, ownProps, onSuccess)),
    setAccount: (account) => dispatch(setAccount(account)),
    getAccountById: (id) => dispatch(getAccountById(id)),
    fetchAllAccount: () => dispatch(fetchAllAccount()),
  };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(AccountAdmin));