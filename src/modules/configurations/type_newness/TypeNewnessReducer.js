import {
   FIND_TYPE_NEWNESS_LIST
   , FIND_TYPE_NEWNESS_LIST_SUCCESS
   , FIND_TYPE_NEWNESS_LIST_ERROR

   , CONFIGURE_TYPE_NEWNESS
   , CONFIGURE_TYPE_NEWNESS_SUCCESS
   , CONFIGURE_TYPE_NEWNESS_ERROR

   , GET_TYPE_NEWNESS_BY_ID
   , GET_TYPE_NEWNESS_BY_ID_SUCCESS
   , GET_TYPE_NEWNESS_BY_ID_ERROR

   , INACTIVE_TYPE_NEWNESS
   , INACTIVE_TYPE_NEWNESS_SUCCESS
   , INACTIVE_TYPE_NEWNESS_ERROR

   , GET_ACTIVE_LIST_TYPE_NEWNESS
   , GET_ACTIVE_LIST_TYPE_NEWNESS_SUCCESS
   , GET_ACTIVE_LIST_TYPE_NEWNESS_ERROR

   , SET_TYPE_NEWNESS
} from 'modules/configurations/type_newness/TypeNewnessActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
      , listResultSetTypeNewness: {}
      , listTypeNewness: []
      , typeNewness: {
         id: 0,
         newnessName: "",
         active: 1
      }
   }
};


const typeNewnessReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_TYPE_NEWNESS_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_TYPE_NEWNESS_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetTypeNewness: action.listResultSetTypeNewness,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_TYPE_NEWNESS_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_TYPE_NEWNESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_TYPE_NEWNESS_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_TYPE_NEWNESS_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_NEWNESS_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_TYPE_NEWNESS_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               typeNewness: action.typeNewness,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_NEWNESS_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_NEWNESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_TYPE_NEWNESS_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_NEWNESS_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_ACTIVE_LIST_TYPE_NEWNESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_ACTIVE_LIST_TYPE_NEWNESS_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listTypeNewness: action.listTypeNewness,
               isActivityIndicatorShown: false,
            },
         };
      case GET_ACTIVE_LIST_TYPE_NEWNESS_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
     
      case SET_TYPE_NEWNESS:
         return {
            ...state,
            data: {
               ...state.data,
               typeNewness: action.typeNewness,
            },
         };

      default:
         return state;
   }

};

export default typeNewnessReducer;