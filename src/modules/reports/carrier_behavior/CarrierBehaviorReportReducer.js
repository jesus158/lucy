import {

   GET_CARRIER_BEHAVIOR
   , GET_CARRIER_BEHAVIOR_SUCCESS
   , GET_CARRIER_BEHAVIOR_ERROR

   , GET_CARRIER_BEHAVIOR_EXPORT
   , GET_CARRIER_BEHAVIOR_SUCCESS_EXPORT
   , GET_CARRIER_BEHAVIOR_ERROR_EXPORT

} from 'modules/reports/carrier_behavior/CarrierBehaviorReportActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false,
      esultCarrierBehavior: {},
      resultCarrierBehaviorExport: {}
   }
};


const carrierBehaviorReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_CARRIER_BEHAVIOR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_CARRIER_BEHAVIOR_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               resultCarrierBehavior: action.resultCarrierBehavior,
               isActivityIndicatorShown: false,
            },
         };
      case GET_CARRIER_BEHAVIOR_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

         case GET_CARRIER_BEHAVIOR_EXPORT:
            return {
               ...state,
               data: {
                  ...state.data,
                  isActivityIndicatorShown: true,
               },
            };
         case GET_CARRIER_BEHAVIOR_SUCCESS_EXPORT:
            return {
               ...state,
               data: {
                  ...state.data,
                  resultCarrierBehaviorExport: action.resultCarrierBehaviorExport,
                  isActivityIndicatorShown: false,
               },
            };
         case GET_CARRIER_BEHAVIOR_ERROR_EXPORT:
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

export default carrierBehaviorReducer;