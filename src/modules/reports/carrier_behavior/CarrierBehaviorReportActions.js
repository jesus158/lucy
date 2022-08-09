export const GET_CARRIER_BEHAVIOR= 'GET_CARRIER_BEHAVIOR';
export const GET_CARRIER_BEHAVIOR_SUCCESS = 'GET_CARRIER_BEHAVIOR_SUCCESS';
export const GET_CARRIER_BEHAVIOR_ERROR = 'GET_CARRIER_BEHAVIOR_ERROR';

export const GET_CARRIER_BEHAVIOR_EXPORT= 'GET_CARRIER_BEHAVIOR_EXPORT';
export const GET_CARRIER_BEHAVIOR_SUCCESS_EXPORT = 'GET_CARRIER_BEHAVIOR_SUCCESS_EXPORT';
export const GET_CARRIER_BEHAVIOR_ERROR_EXPORT = 'GET_CARRIER_BEHAVIOR_ERROR_EXPORT';



/***************************************
 * Reporte estado de los transportitas *
 ***************************************/

export const getCarrierBehavior = (onSuccess,
    beginDate,
    endDate,  
    listIdStates,
    apiPaginationAction
  , apiPaginationCurrentPage
  , apiPaginationDirection
  , apiPaginationLimit
  , apiPaginationOrderColumn
  , apiPaginationMoveToPage
  , apiPaginationFilter) => (
    {
        type: GET_CARRIER_BEHAVIOR,
        onSuccess,
        beginDate,
        endDate,  
        listIdStates,
        apiPaginationAction,
        apiPaginationCurrentPage,
        apiPaginationDirection,
        apiPaginationLimit,
        apiPaginationOrderColumn,
        apiPaginationMoveToPage,
        apiPaginationFilter
    }
);

export const getCarrierBehaviorSuccess = (resultCarrierBehavior) => (
    {
        type: GET_CARRIER_BEHAVIOR_SUCCESS
        , resultCarrierBehavior
    }
);

export const getCarrierBehaviorError = (error) => (
    {
        type: GET_CARRIER_BEHAVIOR_ERROR
        , error
    }
);

export const getCarrierBehaviorExport = (onSuccess,
    beginDate,
    endDate,  
    listIdStates,
    apiPaginationAction
  , apiPaginationCurrentPage
  , apiPaginationDirection
  , apiPaginationLimit
  , apiPaginationOrderColumn
  , apiPaginationMoveToPage
  , apiPaginationFilter) => (
    {
        type: GET_CARRIER_BEHAVIOR_EXPORT,
        onSuccess,
        beginDate,
        endDate,  
        listIdStates,
        apiPaginationAction,
        apiPaginationCurrentPage,
        apiPaginationDirection,
        apiPaginationLimit,
        apiPaginationOrderColumn,
        apiPaginationMoveToPage,
        apiPaginationFilter
    }
);

export const getCarrierBehaviorExportSuccess = (resultCarrierBehaviorExport) => (
    {
        type: GET_CARRIER_BEHAVIOR_SUCCESS_EXPORT
        , resultCarrierBehaviorExport
    }
);

export const getCarrierBehaviorExportError = (error) => (
    {
        type: GET_CARRIER_BEHAVIOR_ERROR_EXPORT
        , error
    }
);
