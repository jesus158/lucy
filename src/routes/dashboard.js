/*!

=========================================================
* Material Dashboard PRO React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import FolderSharedOutlined from '@material-ui/icons/FolderSharedOutlined';
import InsertChart from "@material-ui/icons/InsertChart";
import NearMe from "@material-ui/icons/NearMe";
// @material-ui/icons
import People from "@material-ui/icons/People";
import Warning from "@material-ui/icons/Warning";
import Layers from "@material-ui/icons/Layers";
import SettingsRemote from '@material-ui/icons/SettingsRemote';
import Sms from "@material-ui/icons/Sms";
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ViewList from "@material-ui/icons/ViewList";
import Account from "modules/accounts/account";
import AccountAdmin from "modules/accounts/account/AccountAdmin";
import ChangeAccount from "modules/accounts/changeAccount/index.js";
import User from "modules/accounts/user";
import UserAdmin from "modules/accounts/user/UserAdmin";
import UserSuperManager from "modules/accounts/user/UserSuperManager.jsx";
import ButtonService from "modules/buttons/button";
import ButtonServiceAdmin from "modules/buttons/button/ButtonServiceAdmin.jsx";
import Hotspot from "modules/buttons/hotspot";
import HotspotAdmmin from "modules/buttons/hotspot/HotspotAdmin.jsx";
import Carrier from "modules/carriers";
import GeneralParameters from "modules/configurations/general_parameters";
import TypeAbsence from "modules/configurations/type_absence";
import TypeAbsenceAdmin from "modules/configurations/type_absence/TypeAbsenceAdmin";
import TypeBreak from "modules/configurations/type_break";
import TypeBreakAdmin from "modules/configurations/type_break/TypeBreakAdmin";
import TypeNewness from "modules/configurations/type_newness";
import TypeNewnessAdmin from "modules/configurations/type_newness/TypeNewnessAdmin";
import TypeCancellation from "modules/configurations/type_cancellation";
import TypeCancellationAdmin from "modules/configurations/type_cancellation/TypeCancellationAdmin";
import TypeReject from "modules/configurations/type_reject";
import TypeRejectAdmin from "modules/configurations/type_reject/TypeRejectAdmin";
import TypeServices from "modules/configurations/type_services";
import TypeServicesAdmin from "modules/configurations/type_services/TypeServicesAdmin";
import TypeActivesAdmin from "modules/configurations/type_actives/TypeActivesAdmin";
import Location from "modules/locations";
import locationAdmin from "modules/locations/LocationAdmin.jsx";
import CarrierBehaviorReport from "modules/reports/carrier_behavior/CarrierBehaviorReport";
import Dashboard from "modules/reports/dashboard/Dashboard.jsx";
import HistoryRequest from "modules/reports/history_request/HistoryRequest.jsx";
import TrackingIndex from "modules/reports/tracking/index.js";
import Request from "modules/requests";
import RequestAdmin from "modules/requests/RequestAdmin";
import AssetAdmin from "modules/assets/AssetAdmin"
import CountServicesReport from "modules/reports/count_services/CountServicesReport.jsx";
import { NAME_OPERATOR } from "modules/utils/ApiUtil.js";
import TypeActives from "modules/configurations/type_actives";
import Asset from "modules/assets";
import AlertAdmin from "modules/alerts/AlertAdmin"
import Alert from "modules/alerts";
import TypeAlerts from "modules/configurations/type_alerts";
import TypeAlertAdmin from "modules/configurations/type_alerts/TypeAlertAdmin";

/*ALTAS TEMPRANAS*/
import RoomsBeds from "modules/configurations/rooms_beds"; //Habitaciones y camas
import RoomsBedAdmin from "modules/configurations/rooms_beds/RoomsBedAdmin"; //Administrar habitaciones y camas

/*TIEMPOS IDEALES*/
import IdealTimes from "modules/configurations/ideal_times";
import IdealTimeAdmin from "../modules/configurations/ideal_times/IdealTimeAdmin"; //Tiempos ideales

export const routes = () => {
  return filterByProfile(dashRoutesFilter);
}

var filterByProfile = (content) => {
  var filterContent = [];
  content.forEach(element => {
    if ((element.permition.indexOf(ALL) > -1) || (element.permition.indexOf(sessionStorage["userAccountProfileId"]) > -1)) {
      if (element.views !== undefined) {
        element.views = filterByProfile(element.views);
      }
      filterContent.push(element);
    }
  });
  return filterContent;
}

const ALL = "*", ADMIN = "1", CARRIER = "2", REQUESTED = "3", SUPER_MANAGER = "4";
var dashRoutesFilter = [
  {
    path: "/requests",
    name: "Solicitudes",
    icon: Sms,
    component: Request,
    layout: "/admin",
    permition: [ADMIN, CARRIER, REQUESTED]
  },
  {
    collapse: true,
    name: "Reportes",
    icon: InsertChart,
    state: "componentsCollapse",
    permition: [ADMIN, SUPER_MANAGER, REQUESTED],
    views: [
      {
        path: "/report-dashboard",
        name: "Dashboard",
        mini: "DA",
        component: Dashboard,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER, REQUESTED]
      },
      {
        path: "/report-tracking",
        name: "Tracking",
        mini: "TR",
        component: TrackingIndex,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/report-carrier",
        name: "El " + NAME_OPERATOR,
        mini: "TP",
        component: CarrierBehaviorReport,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/report-request",
        name: "Solicitudes",
        mini: "SO",
        component: HistoryRequest,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/report-count-services",
        name: "Contador de servicios",
        mini: "CS",
        component: CountServicesReport,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      }
    ]
  },
  {
    path: "/locations",
    name: "Ubicaciones",
    icon: NearMe,
    component: Location,
    layout: "/admin",
    permition: [ADMIN, SUPER_MANAGER]
  },
  {
    path: "/shift",
    name: "Turno",
    icon: TrackChangesIcon,
    component: Carrier,
    layout: "/admin",
    permition: [CARRIER]
  },
  {
    collapse: true,
    name: "Configuración",
    icon: ViewList,
    state: "pageCollapse",
    permition: [ADMIN, SUPER_MANAGER],
    views: [
      {
        collapse: true,
        name: "Altas Tempranas",
        icon: AccessAlarmIcon,
        state: "buttonsRequestCollapse",
        permition: [ADMIN, SUPER_MANAGER],
        views: [
          {
            path: "/buttons",
            name: "Gestionar Zonas",
            mini: "BO",
            component: ButtonService,
            layout: "/admin",
            permition: [ADMIN, SUPER_MANAGER]
          },
          {
            path: "/rooms-beds",
            name: "Gestionar Habitación/Camas",
            mini: "AT",
            component: RoomsBeds,
            layout: "/admin",
            permition: [ADMIN, SUPER_MANAGER]
          },
          {
            path: "/admin-rooms-beds",
            name: "Administrar Habitación Camas",
            icon: BookmarkBorder,
            component: RoomsBedAdmin,
            layout: "/admin",
            redirect: true,
            permition: [ADMIN, SUPER_MANAGER]
          },
          {
            path: "/ideal-times",
            name: "Tiempos ideales por áreas",
            mini: "BO",
            component: IdealTimes,
            layout: "/admin",
            permition: [ADMIN, SUPER_MANAGER]
          },
          {
            path: "/admin-ideal-times",
            name: "Administrar tiempos ideales",
            component: IdealTimeAdmin,
            layout: "/admin",
            permition: [ADMIN, SUPER_MANAGER]
          }
        ]
      },
      {
        path: "/config-typeservices",
        name: "Tipos de servicio",
        mini: "TS",
        component: TypeServices,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/config-type-asset",
        name: "Tipos de activos",
        mini: "TA",
        component: TypeActives,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/config-type-alerts",
        name: "Tipos de alertas",
        mini: "TA",
        component: TypeAlerts,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/admin-type-alert",
        name: "Administrar tipo de alerta",
        icon: BookmarkBorder,
        component: TypeAlertAdmin,
        layout: "/admin",
        redirect: true,
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/config-rejection",
        name: "Rechazo",
        mini: "RS",
        component: TypeReject,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/config-type-cancel",
        name: "Cancelación",
        mini: "CN",
        component: TypeCancellation,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/config-type-absence",
        name: "Ausencias",
        mini: "AU",
        component: TypeAbsence,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/config-type-break",
        name: "Recesos",
        mini: "RE",
        component: TypeBreak,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/config-type-newness",
        name: "Novedades",
        mini: "NO",
        component: TypeNewness,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/config-general-parameters",
        name: "Variables",
        mini: "VA",
        component: GeneralParameters,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      }
    ]
  },
  {
    collapse: true,
    name: "Botones de solicitud",
    icon: SettingsRemote,
    state: "buttonsRequestCollapse",
    permition: [ADMIN, SUPER_MANAGER],
    views: [
      {
        path: "/hotspots",
        name: "Receptores",
        mini: "RE",
        component: Hotspot,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },
      {
        path: "/buttons",
        name: "Botones",
        mini: "BO",
        component: ButtonService,
        layout: "/admin",
        permition: [ADMIN, SUPER_MANAGER]
      },]
  },

  {
    path: "/assets",
    name: "Activos",
    icon: Layers,
    component: Asset,
    layout: "/admin",
    permition: [ADMIN, SUPER_MANAGER]
  },
  {
    path: "/alerts",
    name: "Alertas",
    icon: Warning,
    component: Alert,
    layout: "/admin",
    permition: [ADMIN, SUPER_MANAGER]
  },
   {
    path: "/users",
    name: "Usuarios",
    icon: People,
    component: User,
    layout: "/admin",
    permition: [ALL, SUPER_MANAGER]
  },
  {
    path: "/accounts",
    name: "Cuentas",
    icon: FolderSharedOutlined,
    component: Account,
    layout: "/admin",
    permition: [SUPER_MANAGER]
  },

  //Redirets
  {
    path: "/admin-request",
    name: "Nueva solicitud",
    icon: BookmarkBorder,
    component: RequestAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, CARRIER, REQUESTED]
  },
  {
    path: "/admin-account",
    name: "Administrar cuenta",
    icon: FolderSharedOutlined,
    component: AccountAdmin,
    layout: "/admin",
    redirect: true,
    permition: [SUPER_MANAGER]
  },
  {
    path: "/admin-user",
    name: "Administrar usuario",
    icon: People,
    component: UserAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ALL]
  },

  {
    path: "/admin-asset",
    name: "Administrar activo",
    icon: Layers,
    component: AssetAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, SUPER_MANAGER]
  },

  {
    path: "/admin-alert",
    name: "Administrar alerta",
    icon: Warning,
    component: AlertAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, SUPER_MANAGER]
  },

  {
    path: "/admin-type-service",
    name: "Administrar tipo de servicio",
    icon: BookmarkBorder,
    component: TypeServicesAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, SUPER_MANAGER]
  },
  {
    path: "/admin-type-asset",
    name: "Administrar tipo de activo",
    icon: BookmarkBorder,
    component: TypeActivesAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, SUPER_MANAGER]
  },
  {
    path: "/admin-type-rejection",
    name: "Administrar tipo de rechazo",
    icon: BookmarkBorder,
    component: TypeRejectAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, SUPER_MANAGER]
  },
  {
    path: "/admin-type-cancel",
    name: "Administrar tipo de cancelación",
    icon: BookmarkBorder,
    component: TypeCancellationAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, SUPER_MANAGER]
  },
  {
    path: "/admin-type-absence",
    name: "Administrar tipo de ausencia",
    icon: BookmarkBorder,
    component: TypeAbsenceAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, SUPER_MANAGER]
  },
  {
    path: "/admin-type-break",
    name: "Administrar tipo de receso",
    icon: BookmarkBorder,
    component: TypeBreakAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, SUPER_MANAGER]
  },
  {
    path: "/admin-type-newness",
    name: "Administrar tipo de novedades",
    icon: BookmarkBorder,
    component: TypeNewnessAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, SUPER_MANAGER]
  },
  {
    path: "/admin-location",
    name: "Mapa de ubicaciones",
    icon: BookmarkBorder,
    component: locationAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, SUPER_MANAGER]
  },
  {
    path: "/admin-change",
    name: "Cambio de cuenta",
    icon: BookmarkBorder,
    component: ChangeAccount,
    layout: "/admin",
    redirect: true,
    permition: [ALL]
  },
  {
    path: "/admin-hotspot",
    name: "Administrar receptor",
    icon: BookmarkBorder,
    component: HotspotAdmmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, SUPER_MANAGER]
  },
  {
    path: "/admin-call-button",
    name: "Administrar botón",
    icon: BookmarkBorder,
    component: ButtonServiceAdmin,
    layout: "/admin",
    redirect: true,
    permition: [ADMIN, SUPER_MANAGER]
  },
  {
    path: "/admin-super-manager",
    name: "Super manager",
    icon: BookmarkBorder,
    component: UserSuperManager,
    layout: "/admin",
    redirect: true,
    permition: [SUPER_MANAGER]
  }

];