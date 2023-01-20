import { configureAccount, fetchAllAccount, findAccount, getAccountById, getListCostCenter, inactiveAccount } from 'modules/accounts/account/AccountEpic.js';
import { configureUser, findUsers, getListTypeIdentification, getListTypeProfile, getUserByEmail, getUserById, inactiveUser, loginUser, sendEmailRememberAccess } from 'modules/accounts/user/UserEpic.js';
import { configureCallButton, findCallButton, getCallButtonById, inactiveCallButton } from 'modules/buttons/button/ButtonServiceEpic.js';
import { configureAlert, findAlert, getAlertById,getAvailableAssets, inactiveAlert } from 'modules/alerts/AlertEpic.js';
import { configureHotspot, findHotspot, getHostspotListActive, getHotspotById, inactiveHotspot } from 'modules/buttons/hotspot/HotspotEpic.js';
import { endCarrierBreakShift,endCarrierAbsenceShift,carrierAbsenceShift, carrierBreakShift, carrierEndShift, carrierStartShift, getCarrierById, getCarrierList, getInShiftByFilter } from 'modules/carriers/carrierEpic.js';
import { configureNumberAttentionsHighPriorityWaiting, configureNumberAttentionsLowPriorityWaiting, configureNumberAttentionsMediumPriorityWaiting, configureTimeAlertCarrierInactivity, configureTimeAlertFinalizeRequest, configureTimeAlertServiceWithoutCarrier, getNumberAttentionsHighPriorityWaiting, getNumberAttentionsLowPriorityWaiting, getNumberAttentionsMediumPriorityWaiting, getTimeAlertCarrierInactivity, getTimeAlertFinalizeRequest, getTimeAlertServiceWithoutCarrier, inactiveNumberAttentionsHighPriorityWaiting, inactiveNumberAttentionsLowPriorityWaiting, inactiveNumberAttentionsMediumPriorityWaiting, inactiveTimeAlertCarrierInactivity, inactiveTimeAlertFinalizeRequest, inactiveTimeAlertServiceWithoutCarrier } from 'modules/configurations/general_parameters/GeneralParametersEpic.js';
import { configureTypeAbsence, findTypeAbsence, getActiveListTypeAbsence, getTypeAbsenceById, inactiveTypeAbsence } from 'modules/configurations/type_absence/TypeAbsenceEpic.js';
import { configureTypeBreak, findTypeBreak, getActiveListTypeBreak, getTypeBreakById, inactiveTypeBreak } from 'modules/configurations/type_break/TypeBreakEpic.js';
import { configureTypeNewness, findTypeNewness, getActiveListTypeNewness, getListRequestTypeNewness, getTypeNewnessById, inactiveTypeNewness , carrierNewnessShift} from 'modules/configurations/type_newness/TypeNewnessEpic.js';
import { configureTypeCancellation, findTypeCancellation, getListActiveTypeCancellation, getTypeCancellationById, inactiveTypeCancellation } from 'modules/configurations/type_cancellation/TypeCancellationEpic.js';
import { configureTypeAsset, findTypeAsset, getListActiveTypeAsset, getTypeAssetById, inactiveTypeAsset } from 'modules/configurations/type_actives/TypeActivesEpic.js';
import { configureAsset, findAsset, getListActiveAsset,getListTypeAsset, getAssetById, inactiveAsset } from 'modules/assets/AssetEpic.js';
import { configureTypeReject, findTypeReject, getListActiveTypeReject, getTypeRejectById, inactiveTypeReject } from 'modules/configurations/type_reject/TypeRejectEpic.js';
import { configureTypeService, findTypeService, getListActiveTypeService, getTypeServiceById, inactiveTypeService } from 'modules/configurations/type_services/TypeServicesEpic.js';
import { configureGateway, findGateway, getGatewayById, inactiveGateway } from 'modules/gateway/GatewayEpic.js';
import { changeTwoFloors, createUpdateFloor, deleteFloor } from 'modules/locations/floors/floorEpic.js';
import { getMap } from 'modules/locations/map/MapEpic.js';
import { changeTwoUbications, createUpdateUbication, deleteUbication, getListActiveShowService, getUbicationByFilter } from 'modules/locations/ubications/UbicationEpic.js';
import { changeTwoZones, createUpdateZone, deleteZone } from 'modules/locations/zones/zoneEpic.js';
import { getCarrierBehavior, getCarrierBehaviorExport } from 'modules/reports/carrier_behavior/CarrierBehaviorReportEpic.js';
import { getServiceAccount, getServiceAccountExport } from 'modules/reports/count_services/CountServicesReportEpic.js';
import { getNumberRequests } from 'modules/reports/dashboard/DashboardEpic.js';
import { getHistoryRequest, getHistoryRequestExport } from 'modules/reports/history_request/HistoryRequestEpic.js';
import { trackingStateSOS,trackingStateAlerts, trackingStateUsers, trackingStateAssets, closeAlert} from 'modules/reports/tracking/TrackingEpic.js';
import { cancelRequest, carrierAcceptsAssignment, carrierRejectsAssignment, createRequest, endRequest, getRequestInProcessByUserByFilter, startRequest, updateRequest } from "modules/requests/RequestEpic.js";
import { combineEpics } from 'redux-observable';
import { configureTypeAlert, findTypeAlert, getListActiveTypeAlert, getTypeAlertById, inactiveTypeAlert } from "../modules/configurations/type_alerts/TypeAlertsEpic";
import {
    activeRoomBed,
    configureRoomBed,
    findRoomBed, getListActiveShow,
    getRoomBedById,
    inactiveRoomBed
} from "../modules/configurations/rooms_beds/RoomsBedEpic";//Habitaciones - camas
import {
    activeIdealTime,
    configureIdealTime,
    findIdealTime,
    getIdealTimeById,
    inactiveIdealTime
} from "../modules/configurations/ideal_times/IdealTimeEpic";//Tiempos Ideales

export const rootEpic = combineEpics(
    findAccount
    , fetchAllAccount
    , configureAccount
    , getAccountById
    , inactiveAccount
    , getListCostCenter

    , findUsers
    , configureUser
    , getUserById
    , inactiveUser
    , loginUser
    , getUserByEmail
    , getListTypeIdentification
    , getListTypeProfile
    , sendEmailRememberAccess

    , findTypeService
    , configureTypeService
    , getTypeServiceById
    , inactiveTypeService
    , getListActiveTypeService

    , findTypeReject
    , configureTypeReject
    , getTypeRejectById
    , inactiveTypeReject
    , getListActiveTypeReject

    , findTypeCancellation
    , configureTypeCancellation
    , getTypeCancellationById
    , inactiveTypeCancellation
    , getListActiveTypeCancellation

    , findTypeAsset
    , findTypeAlert
    , configureTypeAsset
    , getTypeAssetById
    , inactiveTypeAsset
    , getListActiveTypeAsset
    , getListActiveTypeAlert
    , inactiveTypeAlert
    , getTypeAlertById
    , configureTypeAlert
    , findAsset
    , configureAsset
    , getAssetById
    , inactiveAsset
    , getListActiveAsset
    , getListTypeAsset
    , getListActiveShow

    , configureRoomBed
    , findRoomBed
    , getRoomBedById
    , inactiveRoomBed
    , activeRoomBed

    , findTypeAbsence
    , configureTypeAbsence
    , getTypeAbsenceById
    , inactiveTypeAbsence
    , getActiveListTypeAbsence

    , findTypeBreak
    , configureTypeBreak
    , getTypeBreakById
    , inactiveTypeBreak
    , getActiveListTypeBreak

    ,findTypeNewness
    ,configureTypeNewness
    ,getTypeNewnessById
    ,inactiveTypeNewness
    ,getActiveListTypeNewness
    ,getListRequestTypeNewness
    ,carrierNewnessShift

    , getTimeAlertServiceWithoutCarrier
    , configureTimeAlertServiceWithoutCarrier
    , inactiveTimeAlertServiceWithoutCarrier
    , getTimeAlertFinalizeRequest
    , configureTimeAlertFinalizeRequest
    , inactiveTimeAlertFinalizeRequest
    , getTimeAlertCarrierInactivity
    , configureTimeAlertCarrierInactivity
    , inactiveTimeAlertCarrierInactivity
    , getNumberAttentionsHighPriorityWaiting
    , configureNumberAttentionsHighPriorityWaiting
    , inactiveNumberAttentionsHighPriorityWaiting
    , getNumberAttentionsMediumPriorityWaiting
    , configureNumberAttentionsMediumPriorityWaiting
    , inactiveNumberAttentionsMediumPriorityWaiting
    , getNumberAttentionsLowPriorityWaiting
    , configureNumberAttentionsLowPriorityWaiting
    , inactiveNumberAttentionsLowPriorityWaiting

    , getRequestInProcessByUserByFilter

    , findHotspot
    , configureHotspot
    , getHotspotById
    , inactiveHotspot
    , getHostspotListActive

    , findCallButton
    , configureCallButton
    , getCallButtonById
    , inactiveCallButton

    , findAlert
    , configureAlert
    , getAlertById
    , inactiveAlert
    , getAvailableAssets

    , findGateway
    , configureGateway
    , getGatewayById
    , inactiveGateway

    , getListActiveShowService
    , createUpdateUbication
    , changeTwoUbications
    , deleteUbication
    , getUbicationByFilter

    , createRequest
    , updateRequest
    , carrierAcceptsAssignment
    , carrierRejectsAssignment
    , cancelRequest
    , startRequest
    , endRequest

    , getInShiftByFilter
    , getCarrierById
    , carrierEndShift
    , carrierStartShift
    , carrierBreakShift
    , endCarrierBreakShift
    , endCarrierAbsenceShift
    , carrierAbsenceShift

    , getMap

    , createUpdateZone
    , changeTwoZones
    , deleteZone

    , createUpdateFloor
    , changeTwoFloors
    , deleteFloor

    , trackingStateUsers
    , trackingStateAssets
    , trackingStateSOS
    , trackingStateAlerts
    , closeAlert

    , getNumberRequests

    , getCarrierBehavior
    , getCarrierBehaviorExport

    , getCarrierList

    , getHistoryRequest
    , getHistoryRequestExport

    , getServiceAccount
    , getServiceAccountExport

    , findIdealTime
    , configureIdealTime
    , getIdealTimeById
    , inactiveIdealTime
    , activeIdealTime
);
