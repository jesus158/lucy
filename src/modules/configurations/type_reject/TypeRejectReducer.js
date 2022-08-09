import {
   FIND_TYPE_REJECT_LIST
   , FIND_TYPE_REJECT_LIST_SUCCESS
   , FIND_TYPE_REJECT_LIST_ERROR

   , CONFIGURE_TYPE_REJECT
   , CONFIGURE_TYPE_REJECT_SUCCESS
   , CONFIGURE_TYPE_REJECT_ERROR

   , GET_TYPE_REJECT_BY_ID
   , GET_TYPE_REJECT_BY_ID_SUCCESS
   , GET_TYPE_REJECT_BY_ID_ERROR

   , INACTIVE_TYPE_REJECT
   , INACTIVE_TYPE_REJECT_SUCCESS
   , INACTIVE_TYPE_REJECT_ERROR

   , GET_LIST_ACTIVE_TYPE_REJECT
   , GET_LIST_ACTIVE_TYPE_REJECT_SUCCESS
   , GET_LIST_ACTIVE_TYPE_REJECT_ERROR

   , SET_TYPE_REJECT
} from 'modules/configurations/type_reject/TypeRejectActions';

const initialState = {
   data: {
      isActivityIndicatorShown: false
      , listTypeReject: []
      , listResultSetTypeReject: {}
      , typeReject: {
         id: 0,
         rejectName: "",
         active: 1
      }
   }
};


const typeRejectReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_TYPE_REJECT_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_TYPE_REJECT_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetTypeReject: action.listResultSetTypeReject,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_TYPE_REJECT_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_TYPE_REJECT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_TYPE_REJECT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_TYPE_REJECT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_REJECT_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_TYPE_REJECT_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               typeReject: action.typeReject,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_REJECT_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_REJECT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_TYPE_REJECT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_REJECT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_LIST_ACTIVE_TYPE_REJECT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_LIST_ACTIVE_TYPE_REJECT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listTypeReject: action.listTypeReject,
               isActivityIndicatorShown: false,
            },
         };
      case GET_LIST_ACTIVE_TYPE_REJECT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case SET_TYPE_REJECT:
         return {
            ...state,
            data: {
               ...state.data,
               typeReject: action.typeReject,
            },
         };
      default:
         return state;
   }

};

export default typeRejectReducer;