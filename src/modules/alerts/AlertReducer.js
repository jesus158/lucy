import {
   FIND_ALERT_LIST
   , FIND_ALERT_LIST_SUCCESS
   , FIND_ALERT_LIST_ERROR

   , GET_AVAILABLE_ASSETS
   , GET_AVAILABLE_ASSETS_SUCCESS
   , GET_AVAILABLE_ASSETS_ERROR
   
   , CONFIGURE_ALERT
   , CONFIGURE_ALERT_SUCCESS
   , CONFIGURE_ALERT_ERROR

   , GET_ALERT_BY_ID
   , GET_ALERT_BY_ID_SUCCESS
   , GET_ALERT_BY_ID_ERROR

   , INACTIVE_ALERT
   , INACTIVE_ALERT_SUCCESS
   , INACTIVE_ALERT_ERROR

   , SET_ALERT
} from 'modules/alerts/AlertActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
      , listResultSetAlert: {}
      , alert: undefined
   }
};


const alertReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_ALERT_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_ALERT_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetAlert: action.listResultSetAlert,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_ALERT_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case GET_AVAILABLE_ASSETS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_AVAILABLE_ASSETS_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetAsset: action.listResultSetAsset,
               isActivityIndicatorShown: false,
            },
         };
      case GET_AVAILABLE_ASSETS_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
         
      case CONFIGURE_ALERT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_ALERT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_ALERT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_ALERT_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_ALERT_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               alert: action.alert,
               isActivityIndicatorShown: false,
            },
         };
      case GET_ALERT_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_ALERT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_ALERT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_ALERT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case SET_ALERT:
         return {
            ...state,
            data: {
               ...state.data,
               alert: action.alert,
            },
         };
      default:
         return state;
   }

};

export default alertReducer;