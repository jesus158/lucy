import {
   FIND_CALL_BUTTON_LIST
   , FIND_CALL_BUTTON_LIST_SUCCESS
   , FIND_CALL_BUTTON_LIST_ERROR

   , CONFIGURE_CALL_BUTTON
   , CONFIGURE_CALL_BUTTON_SUCCESS
   , CONFIGURE_CALL_BUTTON_ERROR

   , GET_CALL_BUTTON_BY_ID
   , GET_CALL_BUTTON_BY_ID_SUCCESS
   , GET_CALL_BUTTON_BY_ID_ERROR

   , INACTIVE_CALL_BUTTON
   , INACTIVE_CALL_BUTTON_SUCCESS
   , INACTIVE_CALL_BUTTON_ERROR

   , SET_CALL_BUTTON
} from 'modules/buttons/button/ButtonServiceActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
      , listResultSetCallButton: {}
      , callButton: undefined
   }
};


const buttonServiceReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_CALL_BUTTON_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_CALL_BUTTON_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetCallButton: action.listResultSetCallButton,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_CALL_BUTTON_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_CALL_BUTTON:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_CALL_BUTTON_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_CALL_BUTTON_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_CALL_BUTTON_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_CALL_BUTTON_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               callButton: action.callButton,
               isActivityIndicatorShown: false,
            },
         };
      case GET_CALL_BUTTON_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_CALL_BUTTON:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_CALL_BUTTON_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_CALL_BUTTON_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case SET_CALL_BUTTON:
         return {
            ...state,
            data: {
               ...state.data,
               callButton: action.callButton,
            },
         };
      default:
         return state;
   }

};

export default buttonServiceReducer;