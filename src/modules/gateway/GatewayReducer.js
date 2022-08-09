import {
   FIND_GATEWAY_LIST
   , FIND_GATEWAY_LIST_SUCCESS
   , FIND_GATEWAY_LIST_ERROR

   , CONFIGURE_GATEWAY
   , CONFIGURE_GATEWAY_SUCCESS
   , CONFIGURE_GATEWAY_ERROR

   , GET_GATEWAY_BY_ID
   , GET_GATEWAY_BY_ID_SUCCESS
   , GET_GATEWAY_BY_ID_ERROR

   , INACTIVE_GATEWAY
   , INACTIVE_GATEWAY_SUCCESS
   , INACTIVE_GATEWAY_ERROR

   , SET_GATEWAY
} from 'modules/gateway/GatewayActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
      , listResultSetGateway: {}
      , typeService: {
         id: 0,
         serviceName: "",
         priority: 0,
         active: 1
      }
   }
};


const gatewayReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_GATEWAY_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_GATEWAY_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetGateway: action.listResultSetGateway,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_GATEWAY_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_GATEWAY:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_GATEWAY_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_GATEWAY_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_GATEWAY_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_GATEWAY_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               typeService: action.typeService,
               isActivityIndicatorShown: false,
            },
         };
      case GET_GATEWAY_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_GATEWAY:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_GATEWAY_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_GATEWAY_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case SET_GATEWAY:
         return {
            ...state,
            data: {
               ...state.data,
               typeService: action.typeService,
            },
         };
      default:
         return state;
   }

};

export default gatewayReducer;