import {
 
    GET_NUMBER_REQUEST
    , GET_NUMBER_REQUEST_SUCCESS
    , GET_NUMBER_REQUEST_ERROR
  
 } from 'modules/reports/dashboard/DashboardActions.js';
 
 const initialState = {
    data: {
       isActivityIndicatorShown: false,
       numberRequests: {}
    }
 };
 
 
 const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
       case GET_NUMBER_REQUEST:
          return {
             ...state,
             data: {
                ...state.data,
                isActivityIndicatorShown: true,
             },
          };
       case GET_NUMBER_REQUEST_SUCCESS:
          return {
             ...state,
             data: {
                ...state.data,
                numberRequests: action.numberRequests,
                isActivityIndicatorShown: false,
             },
          };
       case GET_NUMBER_REQUEST_ERROR:
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
 
 export default dashboardReducer;