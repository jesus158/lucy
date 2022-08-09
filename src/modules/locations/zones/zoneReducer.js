import {
   CREATE_UPDATE_ZONE
   , CREATE_UPDATE_ZONE_SUCCESS
   , CREATE_UPDATE_ZONE_ERROR

   , CHANGE_TWO_ZONES
   , CHANGE_TWO_ZONES_SUCCESS
   , CHANGE_TWO_ZONES_ERROR

   , DELETE_ZONE
   , DELETE_ZONE_SUCCESS
   , DELETE_ZONE_ERROR
} from 'modules/locations/zones/zoneActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
   }
};


const zoneReducer = (state = initialState, action) => {
   switch (action.type) {
      case CREATE_UPDATE_ZONE:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CREATE_UPDATE_ZONE_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CREATE_UPDATE_ZONE_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CHANGE_TWO_ZONES:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CHANGE_TWO_ZONES_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CHANGE_TWO_ZONES_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case DELETE_ZONE:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case DELETE_ZONE_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case DELETE_ZONE_ERROR:
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

export default zoneReducer;