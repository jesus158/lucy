import {
   FIND_ACCOUNT_LIST
   , FIND_ACCOUNT_LIST_SUCCESS
   , FIND_ACCOUNT_LIST_ERROR

   , FETCH_ALL_ACCOUNT_LIST
   , FETCH_ALL_ACCOUNT_LIST_SUCCESS
   , FETCH_ALL_ACCOUNT_LIST_ERROR

   , CONFIGURE_ACCOUNT
   , CONFIGURE_ACCOUNT_SUCCESS
   , CONFIGURE_ACCOUNT_ERROR

   , GET_ACCOUNT_BY_ID
   , GET_ACCOUNT_BY_ID_SUCCESS
   , GET_ACCOUNT_BY_ID_ERROR

   , INACTIVE_ACCOUNT
   , INACTIVE_ACCOUNT_SUCCESS
   , INACTIVE_ACCOUNT_ERROR

   , GET_LIST_COST_CENTER
   , GET_LIST_COST_CENTER_SUCCESS
   , GET_LIST_COST_CENTER_ERROR

   , SET_ACCOUNT
   , SET_ACCOUNT_CODE
} from 'modules/accounts/account/AccountActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
      , listResultSetAccount: {}
      , account: { id: 0, nameAccount: "", moreInformation: "", active: 1 }
      , accountCode: ""
      , accounts: []
      ,listCostCenter: []
   }
};


const accountReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_ACCOUNT_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_ACCOUNT_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetAccount: action.listResultSetAccount,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_ACCOUNT_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case FETCH_ALL_ACCOUNT_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FETCH_ALL_ACCOUNT_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               accounts: action.accounts,
               isActivityIndicatorShown: false,
            },
         };
      case FETCH_ALL_ACCOUNT_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_ACCOUNT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_ACCOUNT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_ACCOUNT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_ACCOUNT_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_ACCOUNT_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               account: action.account,
               isActivityIndicatorShown: false,
            },
         };
      case GET_ACCOUNT_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_ACCOUNT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_ACCOUNT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_ACCOUNT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case SET_ACCOUNT:
         return {
            ...state,
            data: {
               ...state.data,
               account: action.account,
            },
         };
      case SET_ACCOUNT_CODE:
         return {
            ...state,
            data: {
               ...state.data,
               accountCode: action.accountCode,
            },
         };

      case GET_LIST_COST_CENTER:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_LIST_COST_CENTER_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listCostCenter: action.listCostCenter,
               isActivityIndicatorShown: false,
            },
         };
      case GET_LIST_COST_CENTER_ERROR:
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

export default accountReducer;