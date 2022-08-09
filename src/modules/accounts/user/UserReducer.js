import { CONFIGURE_USER, CONFIGURE_USER_ERROR, CONFIGURE_USER_SUCCESS, FIND_USER_LIST, FIND_USER_LIST_ERROR, FIND_USER_LIST_SUCCESS, GET_TYPE_LIST_IDENTIFICATION, GET_TYPE_LIST_IDENTIFICATION_ERROR, GET_TYPE_LIST_IDENTIFICATION_SUCCESS, GET_TYPE_LIST_PROFILE, GET_TYPE_LIST_PROFILE_ERROR, GET_TYPE_LIST_PROFILE_SUCCESS, GET_USER_BY_EMAIL, GET_USER_BY_EMAIL_ERROR, GET_USER_BY_EMAIL_SUCCESS, GET_USER_BY_ID, GET_USER_BY_ID_ERROR, GET_USER_BY_ID_SUCCESS, INACTIVE_USER, INACTIVE_USER_ERROR, INACTIVE_USER_SUCCESS, LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, SEND_EMAIL_REMEMBER_ACCESS, SEND_EMAIL_REMEMBER_ACCESS_ERROR, SEND_EMAIL_REMEMBER_ACCESS_SUCCESS, SET_MENU_USER, SET_USER } from 'modules/accounts/user/UserActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
      , apiResponse:null
      , menuContent: []
      , listResultSetUser: {}
      , listTypeIdentification: []
      , listUserSystemAccount: []
      , listProfile: []
      , user: {
         id: 0
         , account: { id: 0 }
         , userAccount: {
            id: 0
            , typeIdentification: { id: 0 }
            , numberIdentification: ""
            , nameUser: ""
            , passwordAccess: ""
            , phone: ""
            , email: ""
            , isSuperManager: 0
         }
         , active: 1
         , beaconsTracking: ""
         , canMakeRequest: 0
         , costCenter: ""
         , moreInformation: ""
         , profile: { id: 0 }
      }
   }
};


const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_USER_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_USER_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetUser: action.listResultSetUser,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_USER_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_USER:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_USER_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_USER_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_USER_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_USER_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               user: action.user,
               isActivityIndicatorShown: false,
            },
         };
      case GET_USER_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_USER_BY_EMAIL:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_USER_BY_EMAIL_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listUserSystemAccount: action.user.listUserSystemAccount,
               isActivityIndicatorShown: false,
            },
         };
      case GET_USER_BY_EMAIL_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_USER:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_USER_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_USER_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case LOGIN_USER:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case LOGIN_USER_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               //user: action.user,
               isActivityIndicatorShown: false,
            },
         };
      case LOGIN_USER_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               apiResponse:action.data!==undefined?action.data.data!==undefined?action.data.data.apiResponse:{}:{},
               isActivityIndicatorShown: false,
            },
         };

      case GET_TYPE_LIST_IDENTIFICATION:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_TYPE_LIST_IDENTIFICATION_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listTypeIdentification: action.listTypeIdentification,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_LIST_IDENTIFICATION_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case GET_TYPE_LIST_PROFILE:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_TYPE_LIST_PROFILE_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listProfile: action.listProfile,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_LIST_PROFILE_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case SEND_EMAIL_REMEMBER_ACCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case SEND_EMAIL_REMEMBER_ACCESS_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case SEND_EMAIL_REMEMBER_ACCESS_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };


      case SET_USER:
         return {
            ...state,
            data: {
               ...state.data,
               user: action.user,
            },
         };

      case SET_MENU_USER:
         return {
            ...state,
            data: {
               ...state.data,
               menuContent: action.menuContent,
            },
         };
      default:
         return state;
   }

};

export default userReducer;