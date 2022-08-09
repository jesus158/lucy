import {
   GET_IN_SHIFT_BY_FILTER
   , GET_IN_SHIFT_BY_FILTER_SUCCESS
   , GET_IN_SHIFT_BY_FILTER_ERROR

   , GET_CARRIER_BY_ID
   , GET_CARRIER_BY_ID_SUCCESS
   , GET_CARRIER_BY_ID_ERROR

   , CARRIER_END_SHIFT
   , CARRIER_END_SHIFT_SUCCESS
   , CARRIER_END_SHIFT_ERROR

   , CARRIER_START_SHIFT
   , CARRIER_START_SHIFT_SUCCESS
   , CARRIER_START_SHIFT_ERROR

   , CARRIER_BREAK_SHIFT
   , CARRIER_BREAK_SHIFT_SUCCESS
   , CARRIER_BREAK_SHIFT_ERROR

   , CARRIER_ABSENCE_SHIFT
   , CARRIER_ABSENCE_SHIFT_SUCCESS
   , CARRIER_ABSENCE_SHIFT_ERROR

   , GET_CARRIER_LIST
   , GET_CARRIER_LIST_SUCCESS
   , GET_CARRIER_LIST_ERROR

} from 'modules/carriers/carrierActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false,
      apiPagination: {},
      listCarrierLocation: [],
      carrierLocation: {},
      listCarrier: [],
   }
};


const carrierReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_IN_SHIFT_BY_FILTER:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_IN_SHIFT_BY_FILTER_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listCarrierLocation: action.listCarrierLocation,
               apiPagination: action.apiPagination,
               isActivityIndicatorShown: false,
            },
         };
      case GET_IN_SHIFT_BY_FILTER_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_CARRIER_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_CARRIER_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               carrierLocation: action.carrierLocation,
               isActivityIndicatorShown: false,
            },
         };
      case GET_CARRIER_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CARRIER_END_SHIFT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CARRIER_END_SHIFT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CARRIER_END_SHIFT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CARRIER_START_SHIFT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CARRIER_START_SHIFT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CARRIER_START_SHIFT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CARRIER_BREAK_SHIFT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CARRIER_BREAK_SHIFT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CARRIER_BREAK_SHIFT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CARRIER_ABSENCE_SHIFT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CARRIER_ABSENCE_SHIFT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CARRIER_ABSENCE_SHIFT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_CARRIER_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_CARRIER_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listCarrier: action.listCarrier,
               isActivityIndicatorShown: false,
            },
         };
      case GET_CARRIER_LIST_ERROR:
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

export default carrierReducer;