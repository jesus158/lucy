import Icon from "@material-ui/core/Icon";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Edit from "@material-ui/icons/Edit";
import Card from "components/Card/Card.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import { addMessage } from 'layouts/MessagesActions';
import DashboardCarrier from "modules/reports/dashboard/DashboardCarrier.jsx";
import DashboardRequestInProcess from "modules/reports/dashboard/DashboardRequestInProcess.jsx";
import DashboardRequestWaiting from "modules/reports/dashboard/DashboardRequestWaiting.jsx";
import { MILI_SECONDS_REFRESH_LIST } from "modules/utils/ApiUtil.js";
import React from 'react';
import { connect } from "react-redux";
import dashboardStyle from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle.jsx";
import { getNumberRequests } from './DashboardActions';
import DashboardAssets from "./DashboardAssets.jsx";

var prevNowPlaying = null;
class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openAlertInfo: false,
      textAlertInfo: "",
      toAdmin: false,
      accountId: 0,
      isActivityIndicatorShown: false,
      getWaiting: false,
      getInprocess: true,
    };
  }
  /**
   * Se ejecuta al momento que se ha terminado de pintar toda la información 
   * en la interfaz o cuando esta ha cambiado
   */
  componentDidMount = () => {
    this.loadNumberRequests();
    if (prevNowPlaying) {
      clearInterval(prevNowPlaying);
      prevNowPlaying = null;
    }

    prevNowPlaying = setInterval(() => {
      this.loadNumberRequests();
    }, MILI_SECONDS_REFRESH_LIST);
  };

  componentWillUnmount() {
    if (prevNowPlaying) {
      clearInterval(prevNowPlaying);
    }
    prevNowPlaying = null;
  }

  /**
   * Invoca al servicio que entrega el 
   * estado actual de las solicitudes
   * basado en el usuario actual y sus permisos
   */
  loadNumberRequests = () => {
    this.setState({ getWaiting: !this.state.getWaiting, getInprocess: this.state.getWaiting });
    this.props.getNumberRequests((success) => {
    });
  }

  /**
   * Contenido gráfico de la opción.
   */
  render = () => {

    const { classes } = this.props;
    const { numberRequests } = this.props.dashboardState.data;
    const { getWaiting, getInprocess } = this.state;
    return (
      <>
        <GridContainer >

          <GridItem xs={6} sm={4} md={4} lg={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Edit className={classes.icon} />
                </CardIcon>
                <br />
                <h3 className={classes.cardTitle}>
                  {numberRequests.numTotalServices} <small></small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <p className={classes.cardCategory}>Registradas hoy</p>
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={4} lg={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>sms</Icon>
                </CardIcon>
                <br />
                <h3 className={classes.cardTitle}>
                  {numberRequests.numServiceCompleted} <small></small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <p className={classes.cardCategory}>Terminadas hoy</p>
                </div>
              </CardFooter>
            </Card>
          </GridItem>


          <GridItem xs={6} sm={4} md={4} lg={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>cancel</Icon>
                </CardIcon>
                <br />
                <h3 className={classes.cardTitle}>
                  {numberRequests.numServiceCancelled} <small></small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <p className={classes.cardCategory}>Canceladas hoy</p>
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={4} lg={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>chat_bubble_outline</Icon>
                </CardIcon>
                <br />
                <h3 className={classes.cardTitle}>
                  {numberRequests.numServiceInProcess} <small></small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <p className={classes.cardCategory}>En curso</p>
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={6} sm={4} md={4} lg={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>timelapse</Icon>
                </CardIcon>
                <br />
                <h3 className={classes.cardTitle}>
                  {numberRequests.numServicePending} <small></small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <p className={classes.cardCategory}>Pendientes</p>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer >
          <GridItem xs={12} sm={12} md={12} lg={6}>
            <DashboardCarrier />
          </GridItem>

          <GridItem xs={12} sm={12} md={12} lg={6}>
            <DashboardRequestInProcess title="Solicitudes en curso" stateRequest="3,4" multiAction="inprocess" />
          </GridItem>

          <GridItem xs={12} sm={12} md={12} lg={6}>
            <DashboardRequestWaiting title="Solicitudes pendientes" stateRequest="0,1,2" multiAction="waiting" />
          </GridItem>

          <GridItem xs={12} sm={12} md={12} lg={6}>
            <DashboardAssets title="Activos" stateRequest="0,1,2" multiAction="waiting" />
          </GridItem>

        </GridContainer>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    dashboardState: state.dashboardState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: (message) => dispatch(addMessage(message)),
    getNumberRequests: (onSuccess) => dispatch(getNumberRequests(onSuccess)),
  };
};

export default withStyles(dashboardStyle)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
