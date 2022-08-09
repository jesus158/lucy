import {
   FIND_TYPE_ASSET_LIST,
   FIND_TYPE_ASSET_LIST_SUCCESS,
   FIND_TYPE_ASSET_LIST_ERROR

   ,
   CONFIGURE_TYPE_ASSET,
   CONFIGURE_TYPE_ASSET_SUCCESS,
   CONFIGURE_TYPE_ASSET_ERROR

   ,
   GET_TYPE_ASSET_BY_ID,
   GET_TYPE_ASSET_BY_ID_SUCCESS,
   GET_TYPE_ASSET_BY_ID_ERROR

   ,
   INACTIVE_TYPE_ASSET,
   INACTIVE_TYPE_ASSET_SUCCESS,
   INACTIVE_TYPE_ASSET_ERROR

   ,
   GET_LIST_ACTIVE_TYPE_ASSET,
   GET_LIST_ACTIVE_TYPE_ASSET_SUCCESS,
   GET_LIST_ACTIVE_TYPE_ASSET_ERROR

   ,
   SET_TYPE_ASSET
} from 'modules/configurations/type_actives/TypeActivesActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false,
      listResultSetTypeAsset: {},
      typeAsset: {
         id: 0,
         name: "",
         description: "",
         active: 1
      },
      listTypeAlert: []
   }
};

const typeAssetReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_TYPE_ASSET_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_TYPE_ASSET_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetTypeAsset: action.listResultSetTypeAsset,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_TYPE_ASSET_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_TYPE_ASSET:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_TYPE_ASSET_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_TYPE_ASSET_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_ASSET_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_TYPE_ASSET_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               typeAsset: action.typeAsset,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_ASSET_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_ASSET:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_TYPE_ASSET_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_ASSET_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case SET_TYPE_ASSET:
         return {
            ...state,
            data: {
               ...state.data,
               typeAsset: action.typeAsset,
            },
         };
      case GET_LIST_ACTIVE_TYPE_ASSET:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_LIST_ACTIVE_TYPE_ASSET_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listTypeAlert: action.listTypeAlert,
               isActivityIndicatorShown: false,
            },
         };
      case GET_LIST_ACTIVE_TYPE_ASSET_ERROR:
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

export default typeAssetReducer;