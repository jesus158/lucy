import {
   FIND_TYPE_CANCELLATION_LIST
   , FIND_TYPE_CANCELLATION_LIST_SUCCESS
   , FIND_TYPE_CANCELLATION_LIST_ERROR

   , CONFIGURE_TYPE_CANCELLATION
   , CONFIGURE_TYPE_CANCELLATION_SUCCESS
   , CONFIGURE_TYPE_CANCELLATION_ERROR

   , GET_TYPE_CANCELLATION_BY_ID
   , GET_TYPE_CANCELLATION_BY_ID_SUCCESS
   , GET_TYPE_CANCELLATION_BY_ID_ERROR

   , INACTIVE_TYPE_CANCELLATION
   , INACTIVE_TYPE_CANCELLATION_SUCCESS
   , INACTIVE_TYPE_CANCELLATION_ERROR

   , GET_LIST_ACTIVE_TYPE_CANCELLATION
   , GET_LIST_ACTIVE_TYPE_CANCELLATION_SUCCESS
   , GET_LIST_ACTIVE_TYPE_CANCELLATION_ERROR

   , SET_TYPE_CANCELLATION
} from 'modules/configurations/type_cancellation/TypeCancellationActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
      , listTypeCancellation: []
      , listResultSetTypeCancellation: {}
      , typeCancellation: {
         id: 0,
         cancellationName: "",
         active: 1
      }
   }
};


const typeCancellationReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_TYPE_CANCELLATION_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_TYPE_CANCELLATION_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetTypeCancellation: action.listResultSetTypeCancellation,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_TYPE_CANCELLATION_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_TYPE_CANCELLATION:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_TYPE_CANCELLATION_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_TYPE_CANCELLATION_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_CANCELLATION_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_TYPE_CANCELLATION_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               typeCancellation: action.typeCancellation,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_CANCELLATION_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_CANCELLATION:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_TYPE_CANCELLATION_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_CANCELLATION_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_LIST_ACTIVE_TYPE_CANCELLATION:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_LIST_ACTIVE_TYPE_CANCELLATION_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listTypeCancellation: action.listTypeCancellation,
               isActivityIndicatorShown: false,
            },
         };
      case GET_LIST_ACTIVE_TYPE_CANCELLATION_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case SET_TYPE_CANCELLATION:
         return {
            ...state,
            data: {
               ...state.data,
               typeCancellation: action.typeCancellation,
            },
         };
      default:
         return state;
   }

};

export default typeCancellationReducer;