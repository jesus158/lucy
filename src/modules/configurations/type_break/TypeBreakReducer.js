import {
   FIND_TYPE_BREAK_LIST
   , FIND_TYPE_BREAK_LIST_SUCCESS
   , FIND_TYPE_BREAK_LIST_ERROR

   , CONFIGURE_TYPE_BREAK
   , CONFIGURE_TYPE_BREAK_SUCCESS
   , CONFIGURE_TYPE_BREAK_ERROR

   , GET_TYPE_BREAK_BY_ID
   , GET_TYPE_BREAK_BY_ID_SUCCESS
   , GET_TYPE_BREAK_BY_ID_ERROR

   , INACTIVE_TYPE_BREAK
   , INACTIVE_TYPE_BREAK_SUCCESS
   , INACTIVE_TYPE_BREAK_ERROR

   , GET_ACTIVE_LIST_TYPE_BREAK
   , GET_ACTIVE_LIST_TYPE_BREAK_SUCCESS
   , GET_ACTIVE_LIST_TYPE_BREAK_ERROR

   , SET_TYPE_BREAK
} from 'modules/configurations/type_break/TypeBreakActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
      , listResultSetTypeBreak: {}
      , listTypeBreak: []
      , typeBreak: {
         id: 0,
         breakName: "",
         active: 1
      }
   }
};


const typeBreakReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_TYPE_BREAK_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_TYPE_BREAK_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetTypeBreak: action.listResultSetTypeBreak,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_TYPE_BREAK_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_TYPE_BREAK:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_TYPE_BREAK_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_TYPE_BREAK_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_BREAK_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_TYPE_BREAK_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               typeBreak: action.typeBreak,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_BREAK_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_BREAK:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_TYPE_BREAK_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_BREAK_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_ACTIVE_LIST_TYPE_BREAK:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_ACTIVE_LIST_TYPE_BREAK_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listTypeBreak: action.listTypeBreak,
               isActivityIndicatorShown: false,
            },
         };
      case GET_ACTIVE_LIST_TYPE_BREAK_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
     
      case SET_TYPE_BREAK:
         return {
            ...state,
            data: {
               ...state.data,
               typeBreak: action.typeBreak,
            },
         };

      default:
         return state;
   }

};

export default typeBreakReducer;