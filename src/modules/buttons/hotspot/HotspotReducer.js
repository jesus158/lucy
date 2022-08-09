import {
   FIND_HOTSPOT_LIST
   , FIND_HOTSPOT_LIST_SUCCESS
   , FIND_HOTSPOT_LIST_ERROR

   , CONFIGURE_HOTSPOT
   , CONFIGURE_HOTSPOT_SUCCESS
   , CONFIGURE_HOTSPOT_ERROR

   , GET_HOTSPOT_BY_ID
   , GET_HOTSPOT_BY_ID_SUCCESS
   , GET_HOTSPOT_BY_ID_ERROR

   , INACTIVE_HOTSPOT
   , INACTIVE_HOTSPOT_SUCCESS
   , INACTIVE_HOTSPOT_ERROR

   , GET_HOTSPOT_LIST_ACTIVE
   , GET_HOTSPOT_LIST_ACTIVE_SUCCESS
   , GET_HOTSPOT_LIST_ACTIVE_ERROR

   , SET_HOTSPOT
} from 'modules/buttons/hotspot/HotspotActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
      , listHotspotCallButton: []
      , hotspot: {
         account: {
            active: 1,
            id: 0,
            moreInformation: "",
            nameAccount: "",
            schemaAccount: ""
         },
         id: 0,
         hotspot: "",
         active: 1
      }
   }
};


const hotspotReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_HOTSPOT_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_HOTSPOT_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listHotspotCallButton: action.listHotspotCallButton,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_HOTSPOT_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_HOTSPOT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_HOTSPOT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_HOTSPOT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_HOTSPOT_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_HOTSPOT_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               hotspot: action.hotspot,
               isActivityIndicatorShown: false,
            },
         };
      case GET_HOTSPOT_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_HOTSPOT:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_HOTSPOT_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_HOTSPOT_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };


      case GET_HOTSPOT_LIST_ACTIVE:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_HOTSPOT_LIST_ACTIVE_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listHotspotCallButton: action.listHotspotCallButton,
               isActivityIndicatorShown: false,
            },
         };
      case GET_HOTSPOT_LIST_ACTIVE_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case SET_HOTSPOT:
         return {
            ...state,
            data: {
               ...state.data,
               hotspot: action.hotspot,
            },
         };
      default:
         return state;
   }

};

export default hotspotReducer;