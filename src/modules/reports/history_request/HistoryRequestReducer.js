import {

   GET_HISTORY_REQUEST
   , GET_HISTORY_REQUEST_SUCCESS
   , GET_HISTORY_REQUEST_ERROR
   , GET_HISTORY_REQUEST_EXPORT
   , GET_HISTORY_REQUEST_SUCCESS_EXPORT
   , GET_HISTORY_REQUEST_ERROR_EXPORT

} from 'modules/reports/history_request/HistoryRequestActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false,
      resultHistoryRequest: {},
      resultHistoryRequestExport: {}
   }
};


const historyRequestReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_HISTORY_REQUEST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_HISTORY_REQUEST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               resultHistoryRequest: action.resultHistoryRequest,
               isActivityIndicatorShown: false,
            },
         };
      case GET_HISTORY_REQUEST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };


      case GET_HISTORY_REQUEST_EXPORT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_HISTORY_REQUEST_SUCCESS_EXPORT:
         return {
            ...state,
            data: {
               ...state.data,
               resultHistoryRequestExport: action.resultHistoryRequestExport,
               isActivityIndicatorShown: false,
            },
         };
      case GET_HISTORY_REQUEST_ERROR_EXPORT:
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

export default historyRequestReducer;