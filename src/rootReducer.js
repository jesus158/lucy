/* eslint-disable prettier/prettier */
import { rootEpic } from 'epics';
import messagesReducer from 'layouts/MessagesReducer';
import accountReducer from 'modules/accounts/account/AccountReducer';
import userReducer from 'modules/accounts/user/UserReducer';
import buttonServiceReducer from 'modules/buttons/button/ButtonServiceReducer';
import hotspotReducer from 'modules/buttons/hotspot/HotspotReducer';
import carrierReducer from 'modules/carriers/carrierReducer.js';
import generalParametersReducer from 'modules/configurations/general_parameters/GeneralParametersReducer';
import typeAbsenceReducer from 'modules/configurations/type_absence/TypeAbsenceReducer';
import typeBreakReducer from 'modules/configurations/type_break/TypeBreakReducer';
import typeNewnessReducer from "./modules/configurations/type_newness/TypeNewnessReducer";
import typeCancellationReducer from 'modules/configurations/type_cancellation/TypeCancellationReducer';
import typeRejectReducer from 'modules/configurations/type_reject/TypeRejectReducer';
import typeAssetReducer from 'modules/configurations/type_actives/TypeActivesReducer';
import assetReducer from 'modules/assets/AssetReducer';
import alertReducer from 'modules/alerts/AlertReducer';
import typeServiceReducer from 'modules/configurations/type_services/TypeServicesReducer';
import gatewayReducer from 'modules/gateway/GatewayReducer';
import FloorReducer from 'modules/locations/floors/floorReducer.js';
import mapReducer from 'modules/locations/map/MapReducer.js';
import ubicationReducer from 'modules/locations/ubications/UbicationReducer.js';
import zoneReducer from 'modules/locations/zones/zoneReducer.js';
import trackingReducer from 'modules/reports/tracking/TrackingReducer.js';
import requestReducer from 'modules/requests/RequestReducer.js';
import dashboardReducer from 'modules/reports/dashboard/DashboardReducer';
import carrierBehaviorReportReducer from 'modules/reports/carrier_behavior/CarrierBehaviorReportReducer';
import historyRequestReducer from 'modules/reports/history_request/HistoryRequestReducer.js';
import countServicesReportReducer from 'modules/reports/count_services/CountServicesReportReducer';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
   accountState: accountReducer
   , userState: userReducer
   , messagesState: messagesReducer
   , typeServiceState: typeServiceReducer
   , typeRejectState: typeRejectReducer
   , typeAssetState: typeAssetReducer
   , typeCancellationState: typeCancellationReducer
   , typeAbsenceState: typeAbsenceReducer
   , typeBreakState: typeBreakReducer
   , typeNewnessState: typeNewnessReducer
   , generalParametersState: generalParametersReducer
   , requestState: requestReducer
   , hotspotState: hotspotReducer
   , buttonServiceState: buttonServiceReducer
   , gatewayState: gatewayReducer
   , ubicationState: ubicationReducer
   , carrierState: carrierReducer
   , mapState: mapReducer
   , zoneState: zoneReducer
   , floorState: FloorReducer
   , trackingState: trackingReducer
   , dashboardState: dashboardReducer
   , carrierBehaviorReportState: carrierBehaviorReportReducer
   , historyRequestState: historyRequestReducer
   , countServicesReportState: countServicesReportReducer
   , assetState: assetReducer
   , alertState: alertReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(
   rootReducer,
   composeEnhancers(
      applyMiddleware(epicMiddleware)
   )
);

epicMiddleware.run(rootEpic);

export default store;