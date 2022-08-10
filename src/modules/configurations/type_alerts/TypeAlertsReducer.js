import {
   FIND_TYPE_ALERT_LIST,
   FIND_TYPE_ALERT_LIST_SUCCESS,
   FIND_TYPE_ALERT_LIST_ERROR

   ,
   CONFIGURE_TYPE_ALERT,
   CONFIGURE_TYPE_ALERT_SUCCESS,
   CONFIGURE_TYPE_ALERT_ERROR

   ,
   GET_TYPE_ALERT_BY_ID,
   GET_TYPE_ALERT_BY_ID_SUCCESS,
   GET_TYPE_ALERT_BY_ID_ERROR

   ,
   INACTIVE_TYPE_ALERT,
   INACTIVE_TYPE_ALERT_SUCCESS,
   INACTIVE_TYPE_ALERT_ERROR

   ,
   GET_LIST_ACTIVE_TYPE_ALERT,
   GET_LIST_ACTIVE_TYPE_ALERT_SUCCESS,
   GET_LIST_ACTIVE_TYPE_ALERT_ERROR

   ,
   SET_TYPE_ALERT
} from 'modules/configurations/type_alerts/TypeAlertsActions.js';


const initialState = {
   data: {
      isActivityIndicatorShown: false,
      listResultSetTypeAlert: {},
      typeAlert: {
         id: 0,
         name: "",
         description: "",
         active: 1
      },
      listTypeAlert: []
   }
};

const typeAlertReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_TYPE_ALERT_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_TYPE_ALERT_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetTypeAlert: action.listResultSetTypeAlert,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_TYPE_ALERT_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_TYPE_ALERT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_TYPE_ALERT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_TYPE_ALERT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_ALERT_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_TYPE_ALERT_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               typeAlert: action.typeAlert,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_ALERT_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_ALERT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_TYPE_ALERT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_ALERT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case SET_TYPE_ALERT:
         return {
            ...state,
            data: {
               ...state.data,
               typeAlert: action.typeAlert,
            },
         };
      case GET_LIST_ACTIVE_TYPE_ALERT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_LIST_ACTIVE_TYPE_ALERT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listTypeAlert: action.listTypeAlert,
               isActivityIndicatorShown: false,
            },
         };
      case GET_LIST_ACTIVE_TYPE_ALERT_ERROR:
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

export default typeAlertReducer;