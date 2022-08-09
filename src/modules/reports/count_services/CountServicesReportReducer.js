import { GET_SERVICE_ACCOUNT, GET_SERVICE_ACCOUNT_ERROR, GET_SERVICE_ACCOUNT_ERROR_EXPORT, GET_SERVICE_ACCOUNT_EXPORT, GET_SERVICE_ACCOUNT_SUCCESS, GET_SERVICE_ACCOUNT_SUCCESS_EXPORT } from 'modules/reports/count_services/CountServicesReportActions';

const initialState = {
   data: {
      isActivityIndicatorShown: false,
      resultCountServices: {},
      resultCountServicesExport: {},
   }
};


const countServicesReportReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_SERVICE_ACCOUNT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_SERVICE_ACCOUNT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               resultCountServices: action.resultCountServices,
               isActivityIndicatorShown: false,
            },
         };
      case GET_SERVICE_ACCOUNT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };


      case GET_SERVICE_ACCOUNT_EXPORT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_SERVICE_ACCOUNT_SUCCESS_EXPORT:
         return {
            ...state,
            data: {
               ...state.data,
               resultCountServicesExport: action.resultCountServicesExport,
               isActivityIndicatorShown: false,
            },
         };
      case GET_SERVICE_ACCOUNT_ERROR_EXPORT:
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

export default countServicesReportReducer;