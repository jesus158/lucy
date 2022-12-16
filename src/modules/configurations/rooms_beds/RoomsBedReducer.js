import {
   FIND_ROOM_BED_LIST,
   FIND_ROOM_BED_LIST_SUCCESS,
   FIND_ROOM_BED_LIST_ERROR

   ,
   CONFIGURE_ROOM_BED,
   CONFIGURE_ROOM_BED_SUCCESS,
   CONFIGURE_ROOM_BED_ERROR

   ,
   GET_ROOM_BED_BY_ID,
   GET_ROOM_BED_BY_ID_SUCCESS,
   GET_ROOM_BED_BY_ID_ERROR

   ,
   INACTIVE_ROOM_BED,
   INACTIVE_ROOM_BED_SUCCESS,
   INACTIVE_ROOM_BED_ERROR

   ,
   GET_LIST_ACTIVE_ROOM_BED,
   GET_LIST_ACTIVE_ROOM_BED_SUCCESS,
   GET_LIST_ACTIVE_ROOM_BED_ERROR

   ,
   SET_ROOM_BED
} from 'modules/configurations/rooms_beds/RoomsBedActions.js';


const initialState = {
   data: {
      isActivityIndicatorShown: false,
      listResultSetTypeAlert: {},
      roomBed: {
         id: 0,
         name: "",
         description: "",
         priority: 0,
         active: 1
      },
      listTypeAlert: []
   }
};

const roomBedReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_ROOM_BED_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_ROOM_BED_LIST_SUCCESS:
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