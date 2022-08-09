import {
    FIND_TYPE_SERVICE_LIST
  , FIND_TYPE_SERVICE_LIST_SUCCESS
  , FIND_TYPE_SERVICE_LIST_ERROR
  
  , CONFIGURE_TYPE_SERVICE
  , CONFIGURE_TYPE_SERVICE_SUCCESS
  , CONFIGURE_TYPE_SERVICE_ERROR
  
  , GET_TYPE_SERVICE_BY_ID
  , GET_TYPE_SERVICE_BY_ID_SUCCESS
  , GET_TYPE_SERVICE_BY_ID_ERROR
  
  , INACTIVE_TYPE_SERVICE
  , INACTIVE_TYPE_SERVICE_SUCCESS
  , INACTIVE_TYPE_SERVICE_ERROR
  
  ,GET_LIST_ACTIVE_TYPE_SERVICE
  ,GET_LIST_ACTIVE_TYPE_SERVICE_SUCCESS
  ,GET_LIST_ACTIVE_TYPE_SERVICE_ERROR

  , SET_TYPE_SERVICE } from 'modules/configurations/type_services/TypeServicesActions.js';
  
  const initialState = {
      data: {
               isActivityIndicatorShown: false
              , listResultSetTypeService: {}
              , typeService: {
                        id: 0,
                        serviceName: "",
                        priority: 0,
                        active: 1
                     }
              , listTypeService:[]      
         }
  };
  
  
  const typeServiceReducer = (state = initialState, action) => {
      switch (action.type) {
          case FIND_TYPE_SERVICE_LIST:
              return {
                 ...state,
                 data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                 },
              };
           case FIND_TYPE_SERVICE_LIST_SUCCESS:
              return {
                 ...state,
                 data: {
                    ...state.data,
                    listResultSetTypeService: action.listResultSetTypeService,
                    isActivityIndicatorShown: false,
                 },
              };
           case FIND_TYPE_SERVICE_LIST_ERROR:
              return {
                 ...state,
                 data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                 },
              };
  
           case CONFIGURE_TYPE_SERVICE:
              return {
                 ...state,
                 data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                 },
              };
           case CONFIGURE_TYPE_SERVICE_SUCCESS:
              return {
                 ...state,
                 data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                 },
              };
           case CONFIGURE_TYPE_SERVICE_ERROR:
              return {
                 ...state,
                 data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                 },
              };
           case GET_TYPE_SERVICE_BY_ID:
                 return {
                    ...state,
                    data: {
                       ...state.data,
                       isActivityIndicatorShown: true,
                    },
                 };
           case GET_TYPE_SERVICE_BY_ID_SUCCESS:
                 return {
                    ...state,
                    data: {
                       ...state.data,
                       typeService: action.typeService,
                       isActivityIndicatorShown: false,
                    },
                 };
           case GET_TYPE_SERVICE_BY_ID_ERROR:
                 return {
                    ...state,
                    data: {
                       ...state.data,
                       isActivityIndicatorShown: false,
                    },
                 };
           case INACTIVE_TYPE_SERVICE:
              return {
                 ...state,
                 data: {
                    ...state.data,
                    isActivityIndicatorShown: true,
                 },
              };
           case INACTIVE_TYPE_SERVICE_SUCCESS:
              return {
                 ...state,
                 data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                 },
              };
           case INACTIVE_TYPE_SERVICE_ERROR:
              return {
                 ...state,
                 data: {
                    ...state.data,
                    isActivityIndicatorShown: false,
                 },
              };
           case SET_TYPE_SERVICE:
                 return {
                    ...state,
                    data: {
                       ...state.data,
                       typeService: action.typeService,
                    },
                 };
           case GET_LIST_ACTIVE_TYPE_SERVICE:
                  return {
                     ...state,
                     data: {
                        ...state.data,
                        isActivityIndicatorShown: true,
                     },
                  };
           case GET_LIST_ACTIVE_TYPE_SERVICE_SUCCESS:
                  return {
                    ...state,
                    data: {
                       ...state.data,
                       listTypeService: action.listTypeService,
                       isActivityIndicatorShown: false,
                    },
                 };
           case GET_LIST_ACTIVE_TYPE_SERVICE_ERROR:
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
    
  export default typeServiceReducer;