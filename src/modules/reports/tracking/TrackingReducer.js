import {
   TRACKING_STATE_USERS,
   TRACKING_STATE_USERS_SUCCESS,
   TRACKING_STATE_USERS_ERROR

   ,
   TRACKING_STATE_ASSETS,
   TRACKING_STATE_ASSETS_SUCCESS,
   TRACKING_STATE_ASSETS_ERROR

   ,
   TRACKING_STATE_SOS,
   TRACKING_STATE_SOS_SUCCESS,
   TRACKING_STATE_SOS_ERROR
   ,
   TRACKING_STATE_ALERTS,
   TRACKING_STATE_ALERTS_SUCCESS,
   TRACKING_STATE_ALERTS_ERROR
   , CLOSE_ALERT
   , CLOSE_ALERT_SUCCESS
   , CLOSE_ALERT_ERROR

} from "modules/reports/tracking/TrackingActions.js";

const initialState = {
   data: {
      isActivityIndicatorShown: false,
      listUsers: [],
      listAssets: [],
      listSOS: [],
      listAlerts: [],
      apiPaginationUser: {},
      apiPaginationSOS: {}
   }
};

const trackingReducer = (state = initialState, action) => {
   switch (action.type) {
      case TRACKING_STATE_USERS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case TRACKING_STATE_USERS_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listUsers: action.listUsers,
               apiPaginationUser: action.apiPaginationUser,
               isActivityIndicatorShown: false,
            },
         };
      case TRACKING_STATE_USERS_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case TRACKING_STATE_ASSETS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case TRACKING_STATE_ASSETS_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listAssets: action.listAssets,
               apiPaginationAsset: action.apiPaginationAsset,
               isActivityIndicatorShown: false,
            },
         };
      case TRACKING_STATE_ASSETS_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case TRACKING_STATE_SOS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };

      case TRACKING_STATE_SOS_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listSOS: action.listSOS,
               listAlerts: action.listAlerts,
               apiPaginationSOS: action.apiPaginationSOS,
               isActivityIndicatorShown: false,
            },
         };
      case TRACKING_STATE_SOS_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

         case TRACKING_STATE_ALERTS:
            return {
               ...state,
               data: {
                  ...state.data,
                  isActivityIndicatorShown: true,
               },
            };
   
         case TRACKING_STATE_ALERTS_SUCCESS:
            return {
               ...state,
               data: {
                  ...state.data,
                  listSOS: action.listSOS,
                  listAlerts: action.listAlerts,
                  apiPaginationSOS: action.apiPaginationSOS,
                  isActivityIndicatorShown: false,
               },
            };
         case TRACKING_STATE_ALERTS_ERROR:
            return {
               ...state,
               data: {
                  ...state.data,
                  isActivityIndicatorShown: false,
               },
            };
            case CLOSE_ALERT:
               return {
                  ...state,
                  data: {
                     ...state.data,
                     isActivityIndicatorShown: true,
                  },
               };
            case CLOSE_ALERT_SUCCESS:
               return {
                  ...state,
                  data: {
                     ...state.data,
                     isActivityIndicatorShown: false,
                  },
               };
            case CLOSE_ALERT_ERROR:
               return {
                  ...state,
                  data: {
                     ...state.data,
                     isActivityIndicatorShown: false,
                  },
               };

      default:
         return state;
   }

};

export default trackingReducer;