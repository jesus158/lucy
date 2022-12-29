import {
   FIND_IDEAL_TIME_LIST,
   FIND_IDEAL_TIME_LIST_SUCCESS,
   FIND_IDEAL_TIME_LIST_ERROR

   ,
   CONFIGURE_IDEAL_TIME,
   CONFIGURE_IDEAL_TIME_SUCCESS,
   CONFIGURE_IDEAL_TIME_ERROR

   ,
   GET_IDEAL_TIME_BY_ID,
   GET_IDEAL_TIME_BY_ID_SUCCESS,
   GET_IDEAL_TIME_BY_ID_ERROR

   ,
   INACTIVE_IDEAL_TIME,
   INACTIVE_IDEAL_TIME_SUCCESS,
   INACTIVE_IDEAL_TIME_ERROR,
   GET_LIST_ACTIVE_IDEAL_TIME,
   GET_LIST_ACTIVE_IDEAL_TIME_SUCCESS,
   GET_LIST_ACTIVE_IDEAL_TIME_ERROR,
   SET_IDEAL_TIME,
   GET_LIST_ACTIVE_SHOW,
   GET_LIST_ACTIVE_SHOW_SUCCESS,
   GET_LIST_ACTIVE_SHOW_ERROR
} from './IdealTimeActions';



const initialState = {
   data: {
      isActivityIndicatorShown: false,
      listResultSetIdealTime: {},
      idealTime: {
         id: 0,
         name: "",
         description: "",
         priority: 0,
         active: 1,
        /* ubication: {
            id: 0,
         }*/
      },
      listIdealTime: [],
      listUbication: [],
   }
};

const idealTimeReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_IDEAL_TIME_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_IDEAL_TIME_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetIdealTime: action.listResultSetIdealTime,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_IDEAL_TIME_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_IDEAL_TIME:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_IDEAL_TIME_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_IDEAL_TIME_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_IDEAL_TIME_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_IDEAL_TIME_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               idealTime: action.idealTime,
               isActivityIndicatorShown: false,
            },
         };
      case GET_IDEAL_TIME_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_IDEAL_TIME:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_IDEAL_TIME_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_IDEAL_TIME_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case SET_IDEAL_TIME:
         return {
            ...state,
            data: {
               ...state.data,
               idealTime: action.idealTime,
            },
         };
      case GET_LIST_ACTIVE_IDEAL_TIME:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_LIST_ACTIVE_IDEAL_TIME_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listTypeIdealTime: action.data.listTypeIdealTime,
               isActivityIndicatorShown: false,
            },
         };
      case GET_LIST_ACTIVE_IDEAL_TIME_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_LIST_ACTIVE_SHOW:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_LIST_ACTIVE_SHOW_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listUbication: action.listUbication,
               isActivityIndicatorShown: false,
            },
         };
      case GET_LIST_ACTIVE_SHOW_ERROR:
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

export default idealTimeReducer;