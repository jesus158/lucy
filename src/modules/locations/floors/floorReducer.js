import {
   CREATE_UPDATE_FLOOR
   , CREATE_UPDATE_FLOOR_SUCCESS
   , CREATE_UPDATE_FLOOR_ERROR

   , CHANGE_TWO_FLOORS
   , CHANGE_TWO_FLOORS_SUCCESS
   , CHANGE_TWO_FLOORS_ERROR

   , DELETE_FLOOR
   , DELETE_FLOOR_SUCCESS
   , DELETE_FLOOR_ERROR
} from 'modules/locations/floors/floorActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
   }
};


const FloorReducer = (state = initialState, action) => {
   switch (action.type) {
      case CREATE_UPDATE_FLOOR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CREATE_UPDATE_FLOOR_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CREATE_UPDATE_FLOOR_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CHANGE_TWO_FLOORS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CHANGE_TWO_FLOORS_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CHANGE_TWO_FLOORS_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case DELETE_FLOOR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case DELETE_FLOOR_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case DELETE_FLOOR_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         }

      default:
         return state;
   }
};

export default FloorReducer;