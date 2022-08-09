import {
   FIND_TYPE_ABSENCE_LIST
   , FIND_TYPE_ABSENCE_LIST_SUCCESS
   , FIND_TYPE_ABSENCE_LIST_ERROR

   , CONFIGURE_TYPE_ABSENCE
   , CONFIGURE_TYPE_ABSENCE_SUCCESS
   , CONFIGURE_TYPE_ABSENCE_ERROR

   , GET_TYPE_ABSENCE_BY_ID
   , GET_TYPE_ABSENCE_BY_ID_SUCCESS
   , GET_TYPE_ABSENCE_BY_ID_ERROR

   , INACTIVE_TYPE_ABSENCE
   , INACTIVE_TYPE_ABSENCE_SUCCESS
   , INACTIVE_TYPE_ABSENCE_ERROR

   , GET_ACTIVE_LIST_TYPE_ABSENCE
   , GET_ACTIVE_LIST_TYPE_ABSENCE_SUCCESS
   , GET_ACTIVE_LIST_TYPE_ABSENCE_ERROR

   , SET_TYPE_ABSENCE
} from 'modules/configurations/type_absence/TypeAbsenceActions.js';

const initialState = {
   data: {
      isActivityIndicatorShown: false
      , listResultSetTypeAbsence: {}
      , typeAbsence: {
         id: 0,
         absenceName: "",
         active: 1
      }
      , listTypeAbsence: []
   }
};


const typeAbsenceReducer = (state = initialState, action) => {
   switch (action.type) {
      case FIND_TYPE_ABSENCE_LIST:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case FIND_TYPE_ABSENCE_LIST_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               listResultSetTypeAbsence: action.listResultSetTypeAbsence,
               isActivityIndicatorShown: false,
            },
         };
      case FIND_TYPE_ABSENCE_LIST_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };

      case CONFIGURE_TYPE_ABSENCE:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case CONFIGURE_TYPE_ABSENCE_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case CONFIGURE_TYPE_ABSENCE_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_ABSENCE_BY_ID:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_TYPE_ABSENCE_BY_ID_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               typeAbsence: action.typeAbsence,
               isActivityIndicatorShown: false,
            },
         };
      case GET_TYPE_ABSENCE_BY_ID_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_ABSENCE:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case INACTIVE_TYPE_ABSENCE_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case INACTIVE_TYPE_ABSENCE_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
            },
         };
      case GET_ACTIVE_LIST_TYPE_ABSENCE:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: true,
            },
         };
      case GET_ACTIVE_LIST_TYPE_ABSENCE_SUCCESS:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false,
               listTypeAbsence: action.listTypeAbsence
            },
         };
      case GET_ACTIVE_LIST_TYPE_ABSENCE_ERROR:
         return {
            ...state,
            data: {
               ...state.data,
               isActivityIndicatorShown: false
            },
         };
      case SET_TYPE_ABSENCE:
         return {
            ...state,
            data: {
               ...state.data,
               typeAbsence: action.typeAbsence,
            },
         };
      default:
         return state;
   }

};

export default typeAbsenceReducer;