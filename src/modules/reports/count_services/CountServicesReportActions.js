export const GET_SERVICE_ACCOUNT = 'GET_SERVICE_ACCOUNT';
export const GET_SERVICE_ACCOUNT_SUCCESS = 'GET_SERVICE_ACCOUNT_SUCCESS';
export const GET_SERVICE_ACCOUNT_ERROR = 'GET_SERVICE_ACCOUNT_ERROR';

export const GET_SERVICE_ACCOUNT_EXPORT = 'GET_SERVICE_ACCOUNT_EXPORT';
export const GET_SERVICE_ACCOUNT_SUCCESS_EXPORT = 'GET_SERVICE_ACCOUNT_SUCCESS_EXPORT';
export const GET_SERVICE_ACCOUNT_ERROR_EXPORT = 'GET_SERVICE_ACCOUNT_ERROR_EXPORT';


/*********************************
 * Reporte contador de servicios *
 *********************************/

export const getServiceAccount = (onSuccess,
    beginDate,
    endDate,  
    groupBy,
    apiPaginationAction
  , apiPaginationCurrentPage
  , apiPaginationDirection
  , apiPaginationLimit
  , apiPaginationOrderColumn
  , apiPaginationMoveToPage
  , apiPaginationFilter) => (
    {
        type: GET_SERVICE_ACCOUNT,
        onSuccess,
        beginDate,
        endDate,  
        groupBy,
        apiPaginationAction,
        apiPaginationCurrentPage,
        apiPaginationDirection,
        apiPaginationLimit,
        apiPaginationOrderColumn,
        apiPaginationMoveToPage,
        apiPaginationFilter
    }
);

export const getServiceAccountSuccess = (resultCountServices) => (
    {
        type: GET_SERVICE_ACCOUNT_SUCCESS
        , resultCountServices
    }
);

export const getServiceAccountError = (error) => (
    {
        type: GET_SERVICE_ACCOUNT_ERROR
        , error
    }
);


export const getServiceAccountExport = (onSuccess,
    beginDate,
    endDate,  
    groupBy,
    apiPaginationAction
  , apiPaginationCurrentPage
  , apiPaginationDirection
  , apiPaginationLimit
  , apiPaginationOrderColumn
  , apiPaginationMoveToPage
  , apiPaginationFilter) => (
    {
        type: GET_SERVICE_ACCOUNT_EXPORT,
        onSuccess,
        beginDate,
        endDate,  
        groupBy,
        apiPaginationAction,
        apiPaginationCurrentPage,
        apiPaginationDirection,
        apiPaginationLimit,
        apiPaginationOrderColumn,
        apiPaginationMoveToPage,
        apiPaginationFilter
    }
);

export const getServiceAccountExportSuccess = (resultCountServicesExport) => (
    {
        type: GET_SERVICE_ACCOUNT_SUCCESS_EXPORT
        , resultCountServicesExport
    }
);

export const getServiceAccountExportError = (error) => (
    {
        type: GET_SERVICE_ACCOUNT_ERROR_EXPORT
        , error
    }
);
