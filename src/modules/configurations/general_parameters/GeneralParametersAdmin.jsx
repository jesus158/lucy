import Input from '@material-ui/core/Input';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import Save from "@material-ui/icons/Save";
import ViewList from "@material-ui/icons/ViewList";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle.jsx";
import AlertInfo from "components/AlertInfo/AlertInfo.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
// core components
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// module components
import WaitDialog from "modules/components/WaitDialog.jsx";
import { configureNumberAttentionsHighPriorityWaiting, configureNumberAttentionsLowPriorityWaiting, configureNumberAttentionsMediumPriorityWaiting, configureTimeAlertCarrierInactivity, configureTimeAlertFinalizeRequest, configureTimeAlertServiceWithoutCarrier, getNumberAttentionsHighPriorityWaiting, getNumberAttentionsLowPriorityWaiting, getNumberAttentionsMediumPriorityWaiting, getTimeAlertCarrierInactivity, getTimeAlertFinalizeRequest, getTimeAlertServiceWithoutCarrier, setNumberAttentionsHighPriorityWaiting, setNumberAttentionsLowPriorityWaiting, setNumberAttentionsMediumPriorityWaiting, setTimeAlertCarrierInactivity, setTimeAlertFinalizeRequest, setTimeAlertServiceWithoutCarrier } from 'modules/configurations/general_parameters/GeneralParametersActions.js';
import { ROW_GRAY, ROW_WHITE, NAME_OPERATOR } from "modules/utils/ApiUtil.js";
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

class GeneralParametersAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: [0],
      openAlertInfo: false,
      textAlertInfo: "",
    };

  }

  componentDidMount = () => {
    this.props.getTimeAlertServiceWithoutCarrier();
    this.props.getTimeAlertFinalizeRequest();
    this.props.getTimeAlertCarrierInactivity();
    this.props.getNumberAttentionsHighPriorityWaiting();
    this.props.getNumberAttentionsMediumPriorityWaiting();
    this.props.getNumberAttentionsLowPriorityWaiting();
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

    if (event.target.value === "0") {
      return;
    }

    switch (event.target.name) {
      case 'timeAlertServiceWithoutCarrier':
        var timeAlertServiceWithoutCarrier = this.props.generalParametersState.data.timeAlertServiceWithoutCarrier;
        timeAlertServiceWithoutCarrier.value = event.target.value;
        this.props.setTimeAlertServiceWithoutCarrier(timeAlertServiceWithoutCarrier);
        break;
      case 'timeAlertCarrierInactivity':
        var timeAlertCarrierInactivity = this.props.generalParametersState.data.timeAlertCarrierInactivity;
        timeAlertCarrierInactivity.value = event.target.value;
        this.props.setTimeAlertCarrierInactivity(timeAlertCarrierInactivity);
        break;
      case 'timeAlertFinalizeRequest':
        var timeAlertFinalizeRequest = this.props.generalParametersState.data.timeAlertFinalizeRequest;
        timeAlertFinalizeRequest.value = event.target.value;
        this.props.setTimeAlertFinalizeRequest(timeAlertFinalizeRequest);
        break;
      case 'numberAttentionsHighPriorityWaiting':
        var numberAttentionsHighPriorityWaiting = this.props.generalParametersState.data.numberAttentionsHighPriorityWaiting;
        numberAttentionsHighPriorityWaiting.value = event.target.value;
        this.props.setNumberAttentionsHighPriorityWaiting(numberAttentionsHighPriorityWaiting);
        break;
      case 'numberAttentionsMediumPriorityWaiting':
        var numberAttentionsMediumPriorityWaiting = this.props.generalParametersState.data.numberAttentionsMediumPriorityWaiting;
        numberAttentionsMediumPriorityWaiting.value = event.target.value;
        this.props.setNumberAttentionsMediumPriorityWaiting(numberAttentionsMediumPriorityWaiting);
        break;
      case 'numberAttentionsLowPriorityWaiting':
        var numberAttentionsLowPriorityWaiting = this.props.generalParametersState.data.numberAttentionsLowPriorityWaiting;
        numberAttentionsLowPriorityWaiting.value = event.target.value;
        this.props.setNumberAttentionsLowPriorityWaiting(numberAttentionsLowPriorityWaiting);
        break;
      default:
        break;
    }

  };

  actionAdd = name => {

    switch (name) {
      case 'timeAlertServiceWithoutCarrier':
        var timeAlertServiceWithoutCarrier = this.props.generalParametersState.data.timeAlertServiceWithoutCarrier;

        if (timeAlertServiceWithoutCarrier === undefined || timeAlertServiceWithoutCarrier === null) {
          timeAlertServiceWithoutCarrier = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        let value1 = parseInt(timeAlertServiceWithoutCarrier.value) + 1;
        timeAlertServiceWithoutCarrier.value = "" + value1;
        this.props.setTimeAlertServiceWithoutCarrier(timeAlertServiceWithoutCarrier);
        break;
      case 'timeAlertCarrierInactivity':
        var timeAlertCarrierInactivity = this.props.generalParametersState.data.timeAlertCarrierInactivity;

        if (timeAlertCarrierInactivity === undefined || timeAlertCarrierInactivity === null) {
          timeAlertCarrierInactivity = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        let value2 = parseInt(timeAlertCarrierInactivity.value) + 1;
        timeAlertCarrierInactivity.value = "" + value2;
        this.props.setTimeAlertCarrierInactivity(timeAlertCarrierInactivity);
        break;
      case 'timeAlertFinalizeRequest':
        var timeAlertFinalizeRequest = this.props.generalParametersState.data.timeAlertFinalizeRequest;

        if (timeAlertFinalizeRequest === undefined || timeAlertFinalizeRequest === null) {
          timeAlertFinalizeRequest = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        let value3 = parseInt(timeAlertFinalizeRequest.value) + 1;
        timeAlertFinalizeRequest.value = "" + value3;
        this.props.setTimeAlertFinalizeRequest(timeAlertFinalizeRequest);
        break;
      case 'numberAttentionsHighPriorityWaiting':
        var numberAttentionsHighPriorityWaiting = this.props.generalParametersState.data.numberAttentionsHighPriorityWaiting;

        if (numberAttentionsHighPriorityWaiting === undefined || numberAttentionsHighPriorityWaiting === null) {
          numberAttentionsHighPriorityWaiting = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        let value4 = parseInt(numberAttentionsHighPriorityWaiting.value) + 1;
        numberAttentionsHighPriorityWaiting.value = "" + value4;
        this.props.setNumberAttentionsHighPriorityWaiting(numberAttentionsHighPriorityWaiting);
        break;
      case 'numberAttentionsMediumPriorityWaiting':
        var numberAttentionsMediumPriorityWaiting = this.props.generalParametersState.data.numberAttentionsMediumPriorityWaiting;

        if (numberAttentionsMediumPriorityWaiting === undefined || numberAttentionsMediumPriorityWaiting === null) {
          numberAttentionsMediumPriorityWaiting = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        let value5 = parseInt(numberAttentionsMediumPriorityWaiting.value) + 1;
        numberAttentionsMediumPriorityWaiting.value = "" + value5;
        this.props.setNumberAttentionsMediumPriorityWaiting(numberAttentionsMediumPriorityWaiting);
        break;
      case 'numberAttentionsLowPriorityWaiting':
        var numberAttentionsLowPriorityWaiting = this.props.generalParametersState.data.numberAttentionsLowPriorityWaiting;

        if (numberAttentionsLowPriorityWaiting === undefined || numberAttentionsLowPriorityWaiting === null) {
          numberAttentionsLowPriorityWaiting = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        let value6 = parseInt(numberAttentionsLowPriorityWaiting.value) + 1;
        numberAttentionsLowPriorityWaiting.value = "" + value6;
        this.props.setNumberAttentionsLowPriorityWaiting(numberAttentionsLowPriorityWaiting);
        break;
      default:
        break;
    }
  };

  actionRemove = name => {

    switch (name) {
      case 'timeAlertServiceWithoutCarrier':
        var timeAlertServiceWithoutCarrier = this.props.generalParametersState.data.timeAlertServiceWithoutCarrier;

        if (timeAlertServiceWithoutCarrier === undefined || timeAlertServiceWithoutCarrier === null) {
          timeAlertServiceWithoutCarrier = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        let value1 = parseInt(timeAlertServiceWithoutCarrier.value) - 1;
        if (value1 > 0) {
          timeAlertServiceWithoutCarrier.value = "" + value1;
          this.props.setTimeAlertServiceWithoutCarrier(timeAlertServiceWithoutCarrier);
        }

        break;
      case 'timeAlertCarrierInactivity':
        var timeAlertCarrierInactivity = this.props.generalParametersState.data.timeAlertCarrierInactivity;

        if (timeAlertCarrierInactivity === undefined || timeAlertCarrierInactivity === null) {
          timeAlertCarrierInactivity = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        let value2 = parseInt(timeAlertCarrierInactivity.value) - 1;
        if (value2 > 0) {
          timeAlertCarrierInactivity.value = "" + value2;
          this.props.setTimeAlertCarrierInactivity(timeAlertCarrierInactivity);
        }

        break;
      case 'timeAlertFinalizeRequest':
        var timeAlertFinalizeRequest = this.props.generalParametersState.data.timeAlertFinalizeRequest;

        if (timeAlertFinalizeRequest === undefined || timeAlertFinalizeRequest === null) {
          timeAlertFinalizeRequest = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        let value3 = parseInt(timeAlertFinalizeRequest.value) - 1;
        if (value3 > 0) {
          timeAlertFinalizeRequest.value = "" + value3;
          this.props.setTimeAlertFinalizeRequest(timeAlertFinalizeRequest);
        }

        break;

      case 'numberAttentionsHighPriorityWaiting':
        var numberAttentionsHighPriorityWaiting = this.props.generalParametersState.data.numberAttentionsHighPriorityWaiting;

        if (numberAttentionsHighPriorityWaiting === undefined || numberAttentionsHighPriorityWaiting === null) {
          numberAttentionsHighPriorityWaiting = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        let value4 = parseInt(numberAttentionsHighPriorityWaiting.value) - 1;
        if (value4 > 0) {
          numberAttentionsHighPriorityWaiting.value = "" + value4;
          this.props.setNumberAttentionsHighPriorityWaiting(numberAttentionsHighPriorityWaiting);
        }

        break;
      case 'numberAttentionsMediumPriorityWaiting':
        var numberAttentionsMediumPriorityWaiting = this.props.generalParametersState.data.numberAttentionsMediumPriorityWaiting;

        if (numberAttentionsMediumPriorityWaiting === undefined || numberAttentionsMediumPriorityWaiting === null) {
          numberAttentionsMediumPriorityWaiting = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        let value5 = parseInt(numberAttentionsMediumPriorityWaiting.value) - 1;
        if (value5 > 0) {
          numberAttentionsMediumPriorityWaiting.value = "" + value5;
          this.props.setNumberAttentionsMediumPriorityWaiting(numberAttentionsMediumPriorityWaiting);
        }

        break;
      case 'numberAttentionsLowPriorityWaiting':
        var numberAttentionsLowPriorityWaiting = this.props.generalParametersState.data.numberAttentionsLowPriorityWaiting;

        if (numberAttentionsLowPriorityWaiting === undefined || numberAttentionsLowPriorityWaiting === null) {
          numberAttentionsLowPriorityWaiting = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        let value6 = parseInt(numberAttentionsLowPriorityWaiting.value) - 1;
        if (value6 > 0) {
          numberAttentionsLowPriorityWaiting.value = "" + value6;
          this.props.setNumberAttentionsLowPriorityWaiting(numberAttentionsLowPriorityWaiting);
        }

        break;
      default:
        break;
    }
  };

  save = name => {

    switch (name) {
      case 'timeAlertServiceWithoutCarrier':
        var timeAlertServiceWithoutCarrier = this.props.generalParametersState.data.timeAlertServiceWithoutCarrier;

        if (timeAlertServiceWithoutCarrier === undefined || timeAlertServiceWithoutCarrier === null) {
          timeAlertServiceWithoutCarrier = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        this.props.configureTimeAlertServiceWithoutCarrier(timeAlertServiceWithoutCarrier, this.props, () => {
          this.props.getTimeAlertServiceWithoutCarrier();
        });
        break;
      case 'timeAlertCarrierInactivity':
        var timeAlertCarrierInactivity = this.props.generalParametersState.data.timeAlertCarrierInactivity;

        if (timeAlertCarrierInactivity === undefined || timeAlertCarrierInactivity === null) {
          timeAlertCarrierInactivity = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        this.props.configureTimeAlertCarrierInactivity(timeAlertCarrierInactivity, this.props, () => {
          this.props.getTimeAlertCarrierInactivity();
        });
        break;
      case 'timeAlertFinalizeRequest':
        var timeAlertFinalizeRequest = this.props.generalParametersState.data.timeAlertFinalizeRequest;

        if (timeAlertFinalizeRequest === undefined || timeAlertFinalizeRequest === null) {
          timeAlertFinalizeRequest = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        this.props.configureTimeAlertFinalizeRequest(timeAlertFinalizeRequest, this.props, () => {
          this.props.getTimeAlertFinalizeRequest();
        });
        break;
      case 'numberAttentionsHighPriorityWaiting':
        var numberAttentionsHighPriorityWaiting = this.props.generalParametersState.data.numberAttentionsHighPriorityWaiting;

        if (numberAttentionsHighPriorityWaiting === undefined || numberAttentionsHighPriorityWaiting === null) {
          numberAttentionsHighPriorityWaiting = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        this.props.configureNumberAttentionsHighPriorityWaiting(numberAttentionsHighPriorityWaiting, this.props, () => {
          this.props.getNumberAttentionsHighPriorityWaiting();
        });
        break;
      case 'numberAttentionsMediumPriorityWaiting':
        var numberAttentionsMediumPriorityWaiting = this.props.generalParametersState.data.numberAttentionsMediumPriorityWaiting;

        if (numberAttentionsMediumPriorityWaiting === undefined || numberAttentionsMediumPriorityWaiting === null) {
          numberAttentionsMediumPriorityWaiting = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        this.props.configureNumberAttentionsMediumPriorityWaiting(numberAttentionsMediumPriorityWaiting, this.props, () => {
          this.props.getNumberAttentionsMediumPriorityWaiting();
        });
        break;
      case 'numberAttentionsLowPriorityWaiting':
        var numberAttentionsLowPriorityWaiting = this.props.generalParametersState.data.numberAttentionsLowPriorityWaiting;

        if (numberAttentionsLowPriorityWaiting === undefined || numberAttentionsLowPriorityWaiting === null) {
          numberAttentionsLowPriorityWaiting = {
            id: 0,
            value: "1",
            active: 1
          };
        }

        this.props.configureNumberAttentionsLowPriorityWaiting(numberAttentionsLowPriorityWaiting, this.props, () => {
          this.props.getNumberAttentionsLowPriorityWaiting();
        });
        break;
      default:
        break;
    }
  };


  render() {
    const { classes } = this.props;
    var { isActivityIndicatorShown
      , timeAlertServiceWithoutCarrier
      , timeAlertCarrierInactivity
      , timeAlertFinalizeRequest

      , numberAttentionsHighPriorityWaiting
      , numberAttentionsMediumPriorityWaiting
      , numberAttentionsLowPriorityWaiting } = this.props.generalParametersState.data;

    if (timeAlertServiceWithoutCarrier === undefined || timeAlertServiceWithoutCarrier === null) {
      timeAlertServiceWithoutCarrier = {
        id: 0,
        value: "1",
        active: 1
      };
    }

    if (timeAlertCarrierInactivity === undefined || timeAlertCarrierInactivity === null) {
      timeAlertCarrierInactivity = {
        id: 0,
        value: "1",
        active: 1
      };
    }

    if (timeAlertFinalizeRequest === undefined || timeAlertFinalizeRequest === null) {
      timeAlertFinalizeRequest = {
        id: 0,
        value: "1",
        active: 1
      };
    }

    if (numberAttentionsHighPriorityWaiting === undefined || numberAttentionsHighPriorityWaiting === null) {
      numberAttentionsHighPriorityWaiting = {
        id: 0,
        value: "1",
        active: 1
      };
    }

    if (numberAttentionsMediumPriorityWaiting === undefined || numberAttentionsMediumPriorityWaiting === null) {
      numberAttentionsMediumPriorityWaiting = {
        id: 0,
        value: "1",
        active: 1
      };
    }

    if (numberAttentionsLowPriorityWaiting === undefined || numberAttentionsLowPriorityWaiting === null) {
      numberAttentionsLowPriorityWaiting = {
        id: 0,
        value: "1",
        active: 1
      };
    }

    return (
      <GridItem xs={12}>
        {isActivityIndicatorShown &&
          <WaitDialog text={this.state.textAlertInfo} />
        }
        <AlertInfo text={this.state.textAlertInfo} open={this.state.openAlertInfo} onDoneClick={this.hideaAlertInfo} />
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="info">
              <ViewList />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Variables</h4>
          </CardHeader>
          <CardBody style={{ overflow: "auto" }}>
            <GridContainer>
              <Table>
                <TableBody>
                  <TableRow tabIndex={-1} key={`TableRow-1`} style={{ background: 1 % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                    <TableCell align="left">
                      {/*<span>{`Tiempo de espera antes de alertar por servicio sin ${NAME_OPERATOR} asignado`}</span>*/}
                      <span>{`Tiempo de reasignación de la solicitud al no ser aceptada por un ${NAME_OPERATOR} en servicio` }</span>
                    </TableCell>
                    <TableCell align="left">
                      <Button color="white" round justIcon onClick={() => this.actionRemove("timeAlertServiceWithoutCarrier")}>
                        <Remove />
                      </Button>
                      <Input id="standard-uncontrolled" margin="none" type="number" name="timeAlertServiceWithoutCarrier" value={timeAlertServiceWithoutCarrier.value} onChange={this.handleInputText} inputProps={{ style: { textAlign: "center" } }} style={{ width: 56, textAlign: "right" }} />
                      <Button color="white" round justIcon onClick={() => this.actionAdd("timeAlertServiceWithoutCarrier")}>
                        <Add />
                      </Button>
                      <span> (min)</span>
                    </TableCell>
                    <TableCell align="left">
                      <Button color="success" round justIcon onClick={() => this.save("timeAlertServiceWithoutCarrier")}>
                        <Save />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow tabIndex={-1} key={`TableRow-2`} style={{ background: 2 % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                    <TableCell align="left">
                      <span>{`Tiempo de espera antes de alertar por inactividad de un ${NAME_OPERATOR} en servicio`}</span>
                    </TableCell>
                    <TableCell align="left">
                      <Button color="white" round justIcon onClick={() => this.actionRemove("timeAlertCarrierInactivity")}>
                        <Remove />
                      </Button>
                      <Input id="standard-uncontrolled" margin="none" type="number" name="timeAlertCarrierInactivity" value={timeAlertCarrierInactivity.value} onChange={this.handleInputText} inputProps={{ style: { textAlign: "center" } }} style={{ width: 56 }} />
                      <Button color="white" round justIcon onClick={() => this.actionAdd("timeAlertCarrierInactivity")}>
                        <Add />
                      </Button>
                      <span> (min)</span>
                    </TableCell>
                    <TableCell align="left">
                      <Button color="success" round justIcon onClick={() => this.save("timeAlertCarrierInactivity")}>
                        <Save />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow tabIndex={-1} key={`TableRow-3`} style={{ background: 1 % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                    <TableCell align="left">
                      <span>Tiempo máximo para la terminación de un servicio en proceso</span>
                    </TableCell>
                    <TableCell align="left">
                      <Button color="white" round justIcon onClick={() => this.actionRemove("timeAlertFinalizeRequest")}>
                        <Remove />
                      </Button>
                      <Input id="standard-uncontrolled" margin="none" type="number" name="timeAlertFinalizeRequest" value={timeAlertFinalizeRequest.value} onChange={this.handleInputText} inputProps={{ style: { textAlign: "center" } }} style={{ width: 56 }} />
                      <Button color="white" round justIcon onClick={() => this.actionAdd("timeAlertFinalizeRequest")}>
                        <Add />
                      </Button>
                      <span> (min)</span>
                    </TableCell>
                    <TableCell align="left">
                      <Button color="success" round justIcon onClick={() => this.save("timeAlertFinalizeRequest")}>
                        <Save />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow tabIndex={-1} key={`TableRow-4`} style={{ background: 2 % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                    <TableCell align="left">
                      <span>Número de solicitudes de prioridad alta en periodo de cola</span>
                    </TableCell>
                    <TableCell align="left">
                      <Button color="white" round justIcon onClick={() => this.actionRemove("numberAttentionsHighPriorityWaiting")}>
                        <Remove />
                      </Button>
                      <Input id="standard-uncontrolled" margin="none" type="number" name="numberAttentionsHighPriorityWaiting" value={numberAttentionsHighPriorityWaiting.value} onChange={this.handleInputText} inputProps={{ style: { textAlign: "center" } }} style={{ width: 56 }} />
                      <Button color="white" round justIcon onClick={() => this.actionAdd("numberAttentionsHighPriorityWaiting")}>
                        <Add />
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button color="success" round justIcon onClick={() => this.save("numberAttentionsHighPriorityWaiting")}>
                        <Save />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow tabIndex={-1} key={`TableRow-5`} style={{ background: 1 % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                    <TableCell align="left">
                      <span>Número de solicitudes de prioridad media en periodo de cola</span>
                    </TableCell>
                    <TableCell align="left">
                      <Button color="white" round justIcon onClick={() => this.actionRemove("numberAttentionsMediumPriorityWaiting")}>
                        <Remove />
                      </Button>
                      <Input id="standard-uncontrolled" margin="none" type="number" name="numberAttentionsMediumPriorityWaiting" value={numberAttentionsMediumPriorityWaiting.value} onChange={this.handleInputText} inputProps={{ style: { textAlign: "center" } }} style={{ width: 56 }} />
                      <Button color="white" round justIcon onClick={() => this.actionAdd("numberAttentionsMediumPriorityWaiting")}>
                        <Add />
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button color="success" round justIcon onClick={() => this.save("numberAttentionsMediumPriorityWaiting")}>
                        <Save />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow tabIndex={-1} key={`TableRow-6`} style={{ background: 2 % 2 === 0 ? ROW_GRAY : ROW_WHITE }}>
                    <TableCell align="left">
                      <span>Número de solicitudes de prioridad baja en periodo de cola</span>
                    </TableCell>
                    <TableCell align="left">
                      <Button color="white" round justIcon onClick={() => this.actionRemove("numberAttentionsLowPriorityWaiting")}>
                        <Remove />
                      </Button>
                      <Input id="standard-uncontrolled" margin="none" type="number" name="numberAttentionsLowPriorityWaiting" value={numberAttentionsLowPriorityWaiting.value} onChange={this.handleInputText} inputProps={{ style: { textAlign: "center" } }} style={{ width: 56 }} />
                      <Button color="white" round justIcon onClick={() => this.actionAdd("numberAttentionsLowPriorityWaiting")}>
                        <Add />
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button color="success" round justIcon onClick={() => this.save("numberAttentionsLowPriorityWaiting")}>
                        <Save />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    );
  }

}

const mapStateToProps = state => {
  return {
    generalParametersState: state.generalParametersState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTimeAlertCarrierInactivity: () => dispatch(getTimeAlertCarrierInactivity()),
    getTimeAlertServiceWithoutCarrier: () => dispatch(getTimeAlertServiceWithoutCarrier()),
    getTimeAlertFinalizeRequest: () => dispatch(getTimeAlertFinalizeRequest()),
    getNumberAttentionsHighPriorityWaiting: () => dispatch(getNumberAttentionsHighPriorityWaiting()),
    getNumberAttentionsMediumPriorityWaiting: () => dispatch(getNumberAttentionsMediumPriorityWaiting()),
    getNumberAttentionsLowPriorityWaiting: () => dispatch(getNumberAttentionsLowPriorityWaiting()),
    configureTimeAlertServiceWithoutCarrier: (timeAlertServiceWithoutCarrier, ownProps, onSuccess) => dispatch(configureTimeAlertServiceWithoutCarrier(timeAlertServiceWithoutCarrier, ownProps, onSuccess)),
    configureTimeAlertFinalizeRequest: (timeAlertServiceWithoutCarrier, ownProps, onSuccess) => dispatch(configureTimeAlertFinalizeRequest(timeAlertServiceWithoutCarrier, ownProps, onSuccess)),
    configureTimeAlertCarrierInactivity: (timeAlertServiceWithoutCarrier, ownProps, onSuccess) => dispatch(configureTimeAlertCarrierInactivity(timeAlertServiceWithoutCarrier, ownProps, onSuccess)),
    configureNumberAttentionsHighPriorityWaiting: (numberAttentionsHighPriorityWaiting, ownProps, onSuccess) => dispatch(configureNumberAttentionsHighPriorityWaiting(numberAttentionsHighPriorityWaiting, ownProps, onSuccess)),
    configureNumberAttentionsMediumPriorityWaiting: (numberAttentionsMediumPriorityWaiting, ownProps, onSuccess) => dispatch(configureNumberAttentionsMediumPriorityWaiting(numberAttentionsMediumPriorityWaiting, ownProps, onSuccess)),
    configureNumberAttentionsLowPriorityWaiting: (numberAttentionsLowPriorityWaiting, ownProps, onSuccess) => dispatch(configureNumberAttentionsLowPriorityWaiting(numberAttentionsLowPriorityWaiting, ownProps, onSuccess)),
    setTimeAlertServiceWithoutCarrier: (timeAlertServiceWithoutCarrier) => dispatch(setTimeAlertServiceWithoutCarrier(timeAlertServiceWithoutCarrier)),
    setTimeAlertFinalizeRequest: (timeAlertFinalizeRequest) => dispatch(setTimeAlertFinalizeRequest(timeAlertFinalizeRequest)),
    setTimeAlertCarrierInactivity: (timeAlertCarrierInactivity) => dispatch(setTimeAlertCarrierInactivity(timeAlertCarrierInactivity)),
    setNumberAttentionsHighPriorityWaiting: (numberAttentionsHighPriorityWaiting) => dispatch(setNumberAttentionsHighPriorityWaiting(numberAttentionsHighPriorityWaiting)),
    setNumberAttentionsMediumPriorityWaiting: (numberAttentionsMediumPriorityWaiting) => dispatch(setNumberAttentionsMediumPriorityWaiting(numberAttentionsMediumPriorityWaiting)),
    setNumberAttentionsLowPriorityWaiting: (numberAttentionsLowPriorityWaiting) => dispatch(setNumberAttentionsLowPriorityWaiting(numberAttentionsLowPriorityWaiting)),
  };
};

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(GeneralParametersAdmin));