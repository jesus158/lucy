import {
   GET_LIST_ACTIVE_SHOW
   , GET_LIST_ACTIVE_SHOW_SUCCESS
   , GET_LIST_ACTIVE_SHOW_ERROR

   , GET_UBICATIONS_BY_FILTER
   , GET_UBICATIONS_BY_FILTER_SUCCESS
   , GET_UBICATIONS_BY_FILTER_ERROR
} from 'modules/locations/ubications/UbicationActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
      , listUbication: []
   }
};


const ubicationReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_LIST_ACTIVE_SHOW:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_LIST_ACTIVE_SHOW_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listUbication: action.listUbication,
               isActivityIndicatorShown: false,
            },
         };
      case GET_LIST_ACTIVE_SHOW_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_UBICATIONS_BY_FILTER:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_UBICATIONS_BY_FILTER_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               apiPagination: action.data.apiPagination,
               listUbication: action.data.listUbication,
               isActivityIndicatorShown: false,
            },
         };
      case GET_UBICATIONS_BY_FILTER_ERROR:
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

export default ubicationReducer;