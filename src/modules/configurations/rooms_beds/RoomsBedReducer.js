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
      listResultSetRoomBed: {},
      roomBed: {
         id: 0,
         name: "",
         description: "",
         priority: 0,
         active: 1
      },
      listRoomBed: []
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
               listResultSetRoomBed: action.listResultSetRoomBed,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_ROOM_BED_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_ROOM_BED:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_ROOM_BED_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_ROOM_BED_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_ROOM_BED_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_ROOM_BED_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               roomBed: action.roomBed,
               isActivityIndicatorShown: false,
            },
         };
      case GET_ROOM_BED_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_ROOM_BED:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_ROOM_BED_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_ROOM_BED_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case SET_ROOM_BED:
         return {
            ...state,
            data: {
               ...state.data,
               roomBed: action.roomBed,
            },
         };
      case GET_LIST_ACTIVE_ROOM_BED:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_LIST_ACTIVE_ROOM_BED_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listRoomBed: action.listRoomBed,
               isActivityIndicatorShown: false,
            },
         };
      case GET_LIST_ACTIVE_ROOM_BED_ERROR:
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

export default roomBedReducer;